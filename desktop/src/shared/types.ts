// Shared contract between the Electron main process (research pipeline) and
// the renderer UI. Events flow over IPC as plain JSON.

export type AgentId =
  | "competitors"
  | "pricing"
  | "funding"
  | "gaps"
  | "positioning"
  | "launch";

export type ResearchEvent =
  | { type: "start"; idea: string }
  | { type: "agent_start"; id: AgentId }
  | { type: "search"; id: AgentId; query: string }
  | { type: "delta"; id: AgentId; text: string }
  | { type: "agent_done"; id: AgentId }
  | { type: "done" }
  | { type: "saved"; reportId: string }
  | { type: "error"; id?: AgentId; message: string };

export type AgentStatus = "pending" | "running" | "done" | "error";

/** A saved research report, persisted as JSON in the user's data folder. */
export interface Report {
  id: string;
  idea: string;
  createdAt: string; // ISO 8601
  model: string;
  /** Markdown produced by each agent. Missing keys = agent never completed. */
  sections: Partial<Record<AgentId, string>>;
  complete: boolean;
}

/** Lightweight listing entry (no section bodies). */
export interface ReportMeta {
  id: string;
  idea: string;
  createdAt: string;
  complete: boolean;
}

export type ModelChoice = "claude-opus-4-8" | "claude-sonnet-4-6" | "claude-haiku-4-5";

export interface Settings {
  hasKey: boolean;
  /** True when the key is stored encrypted via the OS keychain. */
  keyEncrypted: boolean;
  model: ModelChoice;
}

export const MODEL_OPTIONS: { id: ModelChoice; label: string; hint: string }[] = [
  {
    id: "claude-opus-4-8",
    label: "Best quality",
    hint: "Deepest research. Slower and costs more per run.",
  },
  {
    id: "claude-sonnet-4-6",
    label: "Balanced",
    hint: "Great quality at a lower cost. Good default for frequent use.",
  },
  {
    id: "claude-haiku-4-5",
    label: "Fastest",
    hint: "Quick first-pass research at the lowest cost.",
  },
];
