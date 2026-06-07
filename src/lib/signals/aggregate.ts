import { buildSampleSignals } from "./sample";
import { fetchRedditSignals } from "./sources/reddit";
import type { Signal, SignalFeed, Urgency } from "./types";

const URGENCY_RANK: Record<Urgency, number> = { high: 3, medium: 2, low: 1 };

/** Sort by urgency, then relevance, then recency. */
function rank(a: Signal, b: Signal): number {
  if (URGENCY_RANK[a.urgency] !== URGENCY_RANK[b.urgency]) {
    return URGENCY_RANK[b.urgency] - URGENCY_RANK[a.urgency];
  }
  if (a.relevanceScore !== b.relevanceScore) {
    return b.relevanceScore - a.relevanceScore;
  }
  return b.createdAt - a.createdAt;
}

/**
 * Pull from every source, classify + de-dup, and rank. Falls back to sample
 * data if all live sources fail or return nothing, so the feed is never empty.
 */
export async function getSignals(force = false): Promise<SignalFeed> {
  const reddit = await fetchRedditSignals(force);

  const sources: SignalFeed["sources"] = [
    {
      id: "reddit",
      label: "Reddit (public JSON)",
      ok: reddit.ok,
      count: reddit.signals.length,
    },
  ];

  const live = [...reddit.signals].sort(rank);

  if (live.length === 0) {
    const sample = buildSampleSignals().sort(rank);
    return {
      signals: sample,
      mode: "sample",
      fetchedAt: Date.now(),
      sources,
      notice: reddit.ok
        ? "Live sources returned no matching posts right now — showing sample signals so you can see how the feed works."
        : "Couldn't reach live sources from this environment — showing sample signals. Deploy or run locally with outbound network access for live data.",
    };
  }

  return { signals: live, mode: "live", fetchedAt: Date.now(), sources };
}
