"use client";

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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Markdown } from "@/components/research/markdown";
import type { AgentDef } from "@/lib/research/agents";
import type { AgentState } from "@/lib/research/use-research";

const ICONS: Record<AgentDef["id"], LucideIcon> = {
  competitors: Users,
  pricing: DollarSign,
  funding: TrendingUp,
  gaps: Target,
  positioning: Compass,
  launch: Rocket,
};

function StatusBadge({ status }: { status: AgentState["status"] }) {
  switch (status) {
    case "running":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Loader2 className="size-3.5 animate-spin" /> Researching
        </span>
      );
    case "done":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <Check className="size-3.5" /> Done
        </span>
      );
    case "error":
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
          <AlertCircle className="size-3.5" /> Failed
        </span>
      );
    default:
      return <span className="text-xs font-medium text-muted-foreground">Queued</span>;
  }
}

export function AgentCard({
  agent,
  state,
}: {
  agent: AgentDef;
  state: AgentState;
}) {
  const Icon = ICONS[agent.id];
  const idle = state.status === "pending";

  return (
    <Card className={idle ? "opacity-60 transition-opacity" : "transition-opacity"}>
      <CardHeader className="flex-row items-start justify-between space-y-0 gap-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-md border bg-muted/40 p-2">
            <Icon className={`size-4 ${agent.accent}`} />
          </div>
          <div className="space-y-0.5">
            <div className="font-semibold leading-none">{agent.title}</div>
            <div className="text-sm text-muted-foreground">{agent.blurb}</div>
          </div>
        </div>
        <StatusBadge status={state.status} />
      </CardHeader>

      {(state.searches.length > 0 || state.text) && (
        <CardContent className="space-y-3">
          {state.searches.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {state.searches.map((q, i) => (
                <span
                  key={`${q}-${i}`}
                  className="inline-flex items-center gap-1 rounded-full border bg-muted/40 px-2 py-0.5 text-xs text-muted-foreground"
                  title={q}
                >
                  <Search className="size-3" />
                  <span className="max-w-[14rem] truncate">{q}</span>
                </span>
              ))}
            </div>
          )}
          {state.text && <Markdown>{state.text}</Markdown>}
          {state.status === "running" && !state.text && (
            <p className="text-sm text-muted-foreground">Searching the web…</p>
          )}
        </CardContent>
      )}
    </Card>
  );
}
