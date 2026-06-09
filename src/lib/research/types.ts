// Shared contract between the streaming API route and the client UI.
// The route emits these as newline-delimited JSON (NDJSON); the client parses
// each line back into one of these events.

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
  | { type: "error"; id?: AgentId; message: string };

export type AgentStatus = "pending" | "running" | "done" | "error";
