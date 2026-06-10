import Anthropic from "@anthropic-ai/sdk";
import { AGENTS, SYSTEM_PROMPT, type AgentDef } from "../shared/agents";
import type { AgentId, Report, ResearchEvent } from "../shared/types";
import { getApiKey, getSettings, saveReport } from "./storage";

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
  model: string,
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
        model,
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

let activeAbort: AbortController | null = null;

export function stopResearch(): void {
  activeAbort?.abort();
  activeAbort = null;
}

export function isResearchRunning(): boolean {
  return activeAbort !== null;
}

/**
 * Run the full 6-agent pipeline. Emits events to the renderer via `send` and
 * auto-saves the result (including partial results on failure/stop, so the
 * user never loses completed sections).
 */
export async function startResearch(
  idea: string,
  send: (event: ResearchEvent) => void,
): Promise<void> {
  if (activeAbort) {
    send({ type: "error", message: "A research run is already in progress." });
    return;
  }

  const apiKey = await getApiKey();
  if (!apiKey) {
    send({
      type: "error",
      message: "No API key set. Open Settings and paste your Anthropic API key.",
    });
    return;
  }

  const { model } = await getSettings();
  const client = new Anthropic({ apiKey });
  const controller = new AbortController();
  activeAbort = controller;

  const sections: Report["sections"] = {};
  let failedAgent: AgentId | undefined;

  try {
    send({ type: "start", idea });

    // Findings accumulate and feed forward so later agents (gaps,
    // positioning, launch) reason over the earlier research.
    const findings: string[] = [];

    for (const agent of AGENTS) {
      send({ type: "agent_start", id: agent.id });
      failedAgent = agent.id;

      const text = await runAgent(
        client,
        model,
        agent,
        idea,
        findings.join("\n\n"),
        controller.signal,
        (query) => send({ type: "search", id: agent.id, query }),
        (delta) => send({ type: "delta", id: agent.id, text: delta }),
      );

      sections[agent.id] = text;
      findings.push(`## ${agent.title}\n\n${text}`);
      send({ type: "agent_done", id: agent.id });
    }

    failedAgent = undefined;
    send({ type: "done" });
  } catch (err) {
    if (!controller.signal.aborted) {
      const message =
        err instanceof Anthropic.APIError
          ? friendlyApiError(err)
          : err instanceof Error
            ? err.message
            : "Something went wrong during research.";
      send({ type: "error", id: failedAgent, message });
    }
  } finally {
    activeAbort = null;
    // Persist whatever completed so a stopped/failed run isn't lost.
    const completedCount = Object.keys(sections).length;
    if (completedCount > 0) {
      try {
        const report = await saveReport({
          idea,
          model,
          sections,
          complete: completedCount === AGENTS.length,
        });
        send({ type: "saved", reportId: report.id });
      } catch {
        send({ type: "error", message: "Research finished but saving the report failed." });
      }
    }
  }
}

/** Translate API errors into plain language a non-technical user can act on. */
function friendlyApiError(err: InstanceType<typeof Anthropic.APIError>): string {
  if (err instanceof Anthropic.AuthenticationError) {
    return "Your API key was rejected. Open Settings and check that the key is correct.";
  }
  if (err instanceof Anthropic.PermissionDeniedError) {
    return "Your API key doesn't have permission for this model. Check your Anthropic account plan.";
  }
  if (err instanceof Anthropic.RateLimitError) {
    return "The AI service is rate-limiting requests right now. Wait a minute and try again.";
  }
  if (err instanceof Anthropic.APIConnectionError) {
    return "Couldn't reach the AI service. Check your internet connection and try again.";
  }
  if (err.status && err.status >= 500) {
    return "The AI service is having temporary trouble. Try again in a few minutes.";
  }
  return `The AI service returned an error: ${err.message}`;
}

/**
 * Cheap key validation: list models (a free metadata endpoint). Returns null
 * on success or a human-readable problem description.
 */
export async function validateApiKey(key: string): Promise<string | null> {
  try {
    const client = new Anthropic({ apiKey: key.trim() });
    await client.models.list({ limit: 1 });
    return null;
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return "That key was rejected. Double-check you copied the whole key.";
    }
    if (err instanceof Anthropic.APIConnectionError) {
      return "Couldn't reach the AI service to check the key. Are you online?";
    }
    return err instanceof Error ? err.message : "Could not validate the key.";
  }
}
