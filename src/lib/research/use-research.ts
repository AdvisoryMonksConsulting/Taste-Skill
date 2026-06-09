"use client";

import { useCallback, useRef, useState } from "react";
import { AGENTS } from "./agents";
import type { AgentId, AgentStatus, ResearchEvent } from "./types";

export interface AgentState {
  status: AgentStatus;
  text: string;
  searches: string[];
}

type AgentMap = Record<AgentId, AgentState>;

function initialAgents(): AgentMap {
  const map = {} as AgentMap;
  for (const a of AGENTS) {
    map[a.id] = { status: "pending", text: "", searches: [] };
  }
  return map;
}

export function useResearch() {
  const [agents, setAgents] = useState<AgentMap>(initialAgents);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIdea, setActiveIdea] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const patch = useCallback((id: AgentId, fn: (s: AgentState) => AgentState) => {
    setAgents((prev) => ({ ...prev, [id]: fn(prev[id]) }));
  }, []);

  const handle = useCallback(
    (event: ResearchEvent) => {
      switch (event.type) {
        case "agent_start":
          patch(event.id, (s) => ({ ...s, status: "running" }));
          break;
        case "search":
          patch(event.id, (s) => ({ ...s, searches: [...s.searches, event.query] }));
          break;
        case "delta":
          patch(event.id, (s) => ({ ...s, text: s.text + event.text }));
          break;
        case "agent_done":
          patch(event.id, (s) => ({ ...s, status: "done" }));
          break;
        case "error":
          setError(event.message);
          if (event.id) patch(event.id, (s) => ({ ...s, status: "error" }));
          break;
        default:
          break;
      }
    },
    [patch],
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setRunning(false);
  }, []);

  const start = useCallback(
    async (idea: string) => {
      const trimmed = idea.trim();
      if (!trimmed || running) return;

      const controller = new AbortController();
      abortRef.current = controller;
      setAgents(initialAgents());
      setError(null);
      setActiveIdea(trimmed);
      setRunning(true);

      try {
        const res = await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea: trimmed }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const detail = await res.json().catch(() => null);
          throw new Error(detail?.error ?? `Request failed (${res.status}).`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let nl: number;
          while ((nl = buffer.indexOf("\n")) !== -1) {
            const line = buffer.slice(0, nl).trim();
            buffer = buffer.slice(nl + 1);
            if (!line) continue;
            try {
              handle(JSON.parse(line) as ResearchEvent);
            } catch {
              // ignore malformed line
            }
          }
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Something went wrong.");
        }
      } finally {
        abortRef.current = null;
        setRunning(false);
      }
    },
    [running, handle],
  );

  return { agents, running, error, activeIdea, start, stop };
}
