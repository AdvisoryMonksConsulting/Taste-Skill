import { classify, isRelevant } from "../classify";
import type { Signal } from "../types";

/**
 * Reddit exposes public, read-only JSON for any listing by appending `.json`.
 * This is documented and does not require auth for reading public content.
 * We still send a descriptive User-Agent (Reddit asks for one) and cache.
 *
 * Compliance note: this reads PUBLIC posts only. Outreach should follow each
 * subreddit's rules and Reddit's content policy — engage helpfully in-thread,
 * don't mass-DM or spam.
 */

const USER_AGENT =
  "web:advisorymonks-nri-signal-radar:1.0 (NRI tax lead signal monitor)";

/** Subreddits where NRIs discuss India tax/finance problems. */
const SUBREDDITS = [
  "nri",
  "IndiaInvestments",
  "personalfinanceindia",
  "india",
  "ABCDesis",
  "USCIS", // occasional cross-border tax threads; cheap to include
];

/** Broad searches across all of Reddit for high-intent phrases. */
const SEARCH_QUERIES = [
  "NRI tax",
  "NRI capital gains property",
  "DTAA double taxation India",
  "NRO NRE repatriation",
  "lower deduction certificate NRI",
];

type RedditChild = {
  kind: string;
  data: {
    id: string;
    name: string; // fullname, e.g. t3_abc
    subreddit: string;
    author: string;
    title: string;
    selftext?: string;
    permalink: string;
    created_utc: number;
    over_18?: boolean;
    stickied?: boolean;
  };
};

type RedditListing = {
  data?: { children?: RedditChild[] };
};

async function fetchJson(
  url: string,
  force: boolean,
): Promise<RedditListing | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
      signal: controller.signal,
      // Cache for 15 minutes unless a manual refresh forces a fresh pull.
      ...(force ? { cache: "no-store" as const } : { next: { revalidate: 900 } }),
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return (await res.json()) as RedditListing;
  } catch {
    return null;
  }
}

function toSignal(child: RedditChild): Signal | null {
  const d = child.data;
  if (!d || d.stickied || d.over_18) return null;

  const title = d.title ?? "";
  const body = d.selftext ?? "";
  const c = classify(title, body);
  if (!isRelevant(c, title, body)) return null;

  const excerptSource = body.trim() || title;
  const excerpt =
    excerptSource.length > 280
      ? `${excerptSource.slice(0, 277).trim()}…`
      : excerptSource;

  return {
    id: `reddit_${d.name || d.id}`,
    source: "reddit",
    sourceLabel: `r/${d.subreddit}`,
    author: `u/${d.author}`,
    title,
    excerpt,
    url: `https://www.reddit.com${d.permalink}`,
    createdAt: (d.created_utc ?? 0) * 1000,
    category: c.category,
    categoryLabel: c.categoryLabel,
    urgency: c.urgency,
    relevanceScore: c.relevanceScore,
    matchedTerms: c.matchedTerms,
    outreachAngle: c.outreachAngle,
  };
}

export async function fetchRedditSignals(
  force = false,
): Promise<{ ok: boolean; signals: Signal[] }> {
  const urls = [
    ...SUBREDDITS.map(
      (s) => `https://www.reddit.com/r/${s}/new.json?limit=50&raw_json=1`,
    ),
    ...SEARCH_QUERIES.map(
      (q) =>
        `https://www.reddit.com/search.json?q=${encodeURIComponent(
          q,
        )}&sort=new&t=month&limit=50&raw_json=1`,
    ),
  ];

  const results = await Promise.allSettled(urls.map((u) => fetchJson(u, force)));

  let anyOk = false;
  const byId = new Map<string, Signal>();

  for (const r of results) {
    if (r.status !== "fulfilled" || !r.value) continue;
    anyOk = true;
    for (const child of r.value.data?.children ?? []) {
      const signal = toSignal(child);
      if (!signal) continue;
      // Keep the highest-relevance copy if a post appears in multiple queries.
      const existing = byId.get(signal.id);
      if (!existing || signal.relevanceScore > existing.relevanceScore) {
        byId.set(signal.id, signal);
      }
    }
  }

  return { ok: anyOk, signals: Array.from(byId.values()) };
}
