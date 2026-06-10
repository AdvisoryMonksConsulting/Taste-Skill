import {
  AlertCircle,
  Check,
  Compass,
  DollarSign,
  Loader2,
  Rocket,
  Search,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { AgentDef } from "../../../shared/agents";
import type { AgentStatus } from "../../../shared/types";
import { Markdown } from "./Markdown";

export interface AgentCardState {
  status: AgentStatus;
  text: string;
  searches: string[];
}

const ICONS: Record<AgentDef["id"], LucideIcon> = {
  competitors: Users,
  pricing: DollarSign,
  funding: TrendingUp,
  gaps: Target,
  positioning: Compass,
  launch: Rocket,
};

const ACCENTS: Record<AgentDef["id"], string> = {
  competitors: "text-sky-600",
  pricing: "text-emerald-600",
  funding: "text-violet-600",
  gaps: "text-amber-600",
  positioning: "text-rose-600",
  launch: "text-indigo-600",
};

function StatusBadge({ status }: { status: AgentStatus }) {
  switch (status) {
    case "running":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
          <Loader2 className="size-3.5 animate-spin" /> Researching
        </span>
      );
    case "done":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <Check className="size-3.5" /> Done
        </span>
      );
    case "error":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600">
          <AlertCircle className="size-3.5" /> Failed
        </span>
      );
    default:
      return <span className="text-xs font-medium text-neutral-400">Queued</span>;
  }
}

export function AgentCard({
  agent,
  state,
  showStatus = true,
}: {
  agent: AgentDef;
  state: AgentCardState;
  showStatus?: boolean;
}) {
  const Icon = ICONS[agent.id];
  const idle = state.status === "pending";

  return (
    <div
      className={`rounded-lg border border-neutral-200 bg-white shadow-sm transition-opacity ${
        idle ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-md border border-neutral-200 bg-neutral-50 p-2">
            <Icon className={`size-4 ${ACCENTS[agent.id]}`} />
          </div>
          <div className="space-y-0.5">
            <div className="leading-none font-semibold">{agent.title}</div>
            <div className="text-sm text-neutral-500">{agent.blurb}</div>
          </div>
        </div>
        {showStatus && <StatusBadge status={state.status} />}
      </div>

      {(state.searches.length > 0 || state.text || state.status === "running") && (
        <div className="space-y-3 px-5 pb-5">
          {state.searches.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {state.searches.map((q, i) => (
                <span
                  key={`${q}-${i}`}
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-xs text-neutral-500"
                  title={q}
                >
                  <Search className="size-3" />
                  <span className="max-w-56 truncate">{q}</span>
                </span>
              ))}
            </div>
          )}
          {state.text && <Markdown>{state.text}</Markdown>}
          {state.status === "running" && !state.text && (
            <p className="text-sm text-neutral-500">Searching the web…</p>
          )}
        </div>
      )}
    </div>
  );
}
