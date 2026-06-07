"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Lightbulb,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/format";
import type { Signal, Urgency } from "@/lib/signals/types";

const URGENCY_STYLES: Record<Urgency, string> = {
  high: "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300",
  medium:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300",
  low: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300",
};

const URGENCY_LABEL: Record<Urgency, string> = {
  high: "Act now",
  medium: "Warm",
  low: "Nurture",
};

export function SignalCard({ signal }: { signal: Signal }) {
  const [copied, setCopied] = useState(false);

  const copyNote = async () => {
    const note = `Source: ${signal.sourceLabel} — ${signal.author}\nTopic: ${signal.categoryLabel}\nPost: ${signal.title}\nLink: ${signal.url}\n\nSuggested angle: ${signal.outreachAngle}`;
    try {
      await navigator.clipboard.writeText(note);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <Card className="flex flex-col gap-3 p-5 transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <MessageSquare className="size-3.5" />
        <span className="font-medium text-foreground">{signal.sourceLabel}</span>
        <span aria-hidden>·</span>
        <span>{signal.author}</span>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          {timeAgo(signal.createdAt)}
        </span>
        <span
          className={cn(
            "ml-auto rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
            URGENCY_STYLES[signal.urgency],
          )}
        >
          {URGENCY_LABEL[signal.urgency]}
        </span>
      </div>

      <a
        href={signal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <h3 className="text-base font-semibold leading-snug group-hover:text-primary">
          {signal.title}
        </h3>
      </a>

      <p className="text-sm text-muted-foreground">{signal.excerpt}</p>

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="secondary">{signal.categoryLabel}</Badge>
        {signal.matchedTerms.slice(0, 4).map((t) => (
          <Badge key={t} variant="outline" className="font-normal text-muted-foreground">
            {t}
          </Badge>
        ))}
      </div>

      <div className="flex items-start gap-2 rounded-md bg-accent/60 p-3 text-sm text-accent-foreground">
        <Lightbulb className="mt-0.5 size-4 shrink-0" />
        <p>{signal.outreachAngle}</p>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <Button asChild size="sm">
          <a href={signal.url} target="_blank" rel="noopener noreferrer">
            Open post <ArrowUpRight className="size-4" />
          </a>
        </Button>
        <Button size="sm" variant="outline" onClick={copyNote}>
          {copied ? (
            <>
              <Check className="size-4" /> Copied
            </>
          ) : (
            <>
              <Copy className="size-4" /> Copy outreach note
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
