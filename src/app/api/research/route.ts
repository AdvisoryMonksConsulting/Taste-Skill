import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";
import { AGENTS, SYSTEM_PROMPT, type AgentDef } from "@/lib/research/agents";
import type { ResearchEvent } from "@/lib/research/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// The pipeline runs six sequential web-search agents — give it room.
export const maxDuration = 800;

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-opus-4-8";

/**
 * Run one agent to completion, streaming text deltas and surfacing web-search
 * queries via callbacks. Returns the agent's final markdown so it can be fed
 * forward as context to later agents.
 *
 * Server-side web search runs an internal loop that can stop with
 * `pause_turn` when it hits its iteration cap; we re-send the assistant turn
 * to let it resume until the model reaches `end_turn`.
 */
async function runAgent(
  client: Anthropic,
  agent: AgentDef,
  idea: string,
  priorFindings: string,
  signal: AbortSignal,
  onSearch: (query: string) => void,
  onDelta: (text: string) => void,
): Promise<string> {
  const userContent = priorFindings
    ? `${agent.task(idea)}\n\n---\nTeam research gathered so far:\n\n${priorFindings}`
    : agent.task(idea);

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userContent },
  ];

  let answer = "";

  for (let i = 0; i < 8; i++) {
    const stream = client.messages.stream(
      {
        model: MODEL,
        max_tokens: 16000,
        thinking: { type: "adaptive" },
        output_config: { effort: "high" },
        system: SYSTEM_PROMPT,
        messages,
        tools: [
          { type: "web_search_20260209", name: "web_search", max_uses: 6 },
          { type: "web_fetch_20260209", name: "web_fetch", max_uses: 5 },
        ],
      },
      { signal },
    );

    // Accumulate streamed tool inputs so we can surface real search queries.
    const toolName = new Map<number, string>();
    const toolJson = new Map<number, string>();

    for await (const ev of stream) {
      if (ev.type === "content_block_start") {
        const block = ev.content_block;
        if (block.type === "server_tool_use") {
          toolName.set(ev.index, block.name);
          toolJson.set(ev.index, "");
        }
      } else if (ev.type === "content_block_delta") {
        if (ev.delta.type === "text_delta") {
          answer += ev.delta.text;
          onDelta(ev.delta.text);
        } else if (ev.delta.type === "input_json_delta") {
          const cur = toolJson.get(ev.index);
          if (cur !== undefined) toolJson.set(ev.index, cur + ev.delta.partial_json);
        }
      } else if (ev.type === "content_block_stop") {
        if (toolName.get(ev.index) === "web_search") {
          try {
            const query = JSON.parse(toolJson.get(ev.index) || "{}").query;
            if (typeof query === "string" && query) onSearch(query);
          } catch {
            // partial/unparseable tool input — skip the live indicator
          }
        }
      }
    }

    const final = await stream.finalMessage();

    if (final.stop_reason === "pause_turn") {
      // Server tool loop paused; resume by echoing the assistant turn back.
      messages.push({ role: "assistant", content: final.content });
      continue;
    }
    break;
  }

  return answer;
}

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY is not set on the server." },
      { status: 500 },
    );
  }

  let idea = "";
  try {
    const body = await request.json();
    idea = typeof body?.idea === "string" ? body.idea.trim() : "";
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!idea) {
    return Response.json({ error: "Missing 'idea'." }, { status: 400 });
  }
  if (idea.length > 2000) {
    return Response.json(
      { error: "Idea is too long (max 2000 characters)." },
      { status: 400 },
    );
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: ResearchEvent) => {
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));
      };

      try {
        send({ type: "start", idea });

        // Findings accumulate and feed forward so later agents (gaps,
        // positioning, launch) reason over the earlier research.
        const findings: string[] = [];

        for (const agent of AGENTS) {
          send({ type: "agent_start", id: agent.id });

          const text = await runAgent(
            client,
            agent,
            idea,
            findings.join("\n\n"),
            request.signal,
            (query) => send({ type: "search", id: agent.id, query }),
            (delta) => send({ type: "delta", id: agent.id, text: delta }),
          );

          findings.push(`## ${agent.title}\n\n${text}`);
          send({ type: "agent_done", id: agent.id });
        }

        send({ type: "done" });
      } catch (err) {
        if (request.signal.aborted) {
          // Client navigated away / cancelled — nothing more to send.
          controller.close();
          return;
        }
        const message =
          err instanceof Anthropic.APIError
            ? `Claude API error (${err.status ?? "?"}): ${err.message}`
            : err instanceof Error
              ? err.message
              : "Unknown error during research.";
        send({ type: "error", message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
