"use client";

import { useMemo, useState } from "react";
import { Inbox, RefreshCw, Search, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { timeAgo } from "@/lib/format";
import { SignalCard } from "@/components/signal-card";
import type { CategoryId, SignalFeed, Urgency } from "@/lib/signals/types";

type UrgencyFilter = Urgency | "all";

const URGENCY_FILTERS: { id: UrgencyFilter; label: string }[] = [
  { id: "all", label: "All urgency" },
  { id: "high", label: "Act now" },
  { id: "medium", label: "Warm" },
  { id: "low", label: "Nurture" },
];

function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-semibold tabular-nums">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function SignalFeedView({ initial }: { initial: SignalFeed }) {
  const [feed, setFeed] = useState<SignalFeed>(initial);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [urgency, setUrgency] = useState<UrgencyFilter>("all");
  const [category, setCategory] = useState<CategoryId | "all">("all");

  const refresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/signals?refresh=1", { cache: "no-store" });
      if (res.ok) setFeed((await res.json()) as SignalFeed);
    } catch {
      /* keep existing feed on failure */
    } finally {
      setRefreshing(false);
    }
  };

  const categories = useMemo(() => {
    const map = new Map<CategoryId, { label: string; count: number }>();
    for (const s of feed.signals) {
      const cur = map.get(s.category);
      if (cur) cur.count += 1;
      else map.set(s.category, { label: s.categoryLabel, count: 1 });
    }
    return Array.from(map.entries()).sort((a, b) => b[1].count - a[1].count);
  }, [feed.signals]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return feed.signals.filter((s) => {
      if (urgency !== "all" && s.urgency !== urgency) return false;
      if (category !== "all" && s.category !== category) return false;
      if (q) {
        const hay =
          `${s.title} ${s.excerpt} ${s.sourceLabel} ${s.author} ${s.matchedTerms.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [feed.signals, query, urgency, category]);

  const highCount = feed.signals.filter((s) => s.urgency === "high").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Stats + refresh */}
      <div className="flex flex-wrap items-center gap-6 rounded-xl border bg-card p-5">
        <Stat value={feed.signals.length} label="Signals found" />
        <div className="h-10 w-px bg-border" />
        <Stat value={highCount} label="Act-now leads" />
        <div className="h-10 w-px bg-border" />
        <Stat value={categories.length} label="Problem types" />
        <div className="ml-auto flex items-center gap-3">
          <div className="flex flex-col items-end">
            <Badge variant={feed.mode === "live" ? "default" : "secondary"}>
              {feed.mode === "live" ? "Live data" : "Sample data"}
            </Badge>
            <span className="mt-1 text-xs text-muted-foreground">
              Updated {timeAgo(feed.fetchedAt)}
            </span>
          </div>
          <Button onClick={refresh} disabled={refreshing} variant="outline">
            <RefreshCw className={cn("size-4", refreshing && "animate-spin")} />
            {refreshing ? "Refreshing" : "Refresh"}
          </Button>
        </div>
      </div>

      {feed.notice && (
        <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <p>{feed.notice}</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search signals — e.g. property, DTAA, notice, Dubai…"
            className="pl-9"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {URGENCY_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setUrgency(f.id)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                urgency === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background hover:bg-accent",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors",
              category === "all"
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background hover:bg-accent",
            )}
          >
            All types
          </button>
          {categories.map(([id, info]) => (
            <button
              key={id}
              onClick={() => setCategory(id)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                category === id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-background hover:bg-accent",
              )}
            >
              {info.label}
              <span className="ml-1.5 text-xs opacity-70">{info.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="text-sm text-muted-foreground">
        Showing {filtered.length} of {feed.signals.length} signals
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          <Inbox className="size-8" />
          <p>No signals match these filters.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((s) => (
            <SignalCard key={s.id} signal={s} />
          ))}
        </div>
      )}
    </div>
  );
}
