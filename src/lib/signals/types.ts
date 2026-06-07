export type CategoryId =
  | "residential_status"
  | "capital_gains"
  | "dtaa"
  | "accounts_repatriation"
  | "fema"
  | "tds"
  | "inheritance"
  | "business_gst"
  | "tax_notice"
  | "general";

export type Urgency = "high" | "medium" | "low";

export type SourceId = "reddit";

export type Signal = {
  /** Stable, de-dup-able id, e.g. "reddit_t3_abc123" */
  id: string;
  source: SourceId;
  /** Human label for the origin, e.g. "r/nri" */
  sourceLabel: string;
  /** Public handle of the person, e.g. "u/someone" */
  author: string;
  title: string;
  excerpt: string;
  /** Canonical public URL of the post */
  url: string;
  /** Unix ms */
  createdAt: number;
  category: CategoryId;
  categoryLabel: string;
  urgency: Urgency;
  /** Higher = more clearly an NRI tax/CA buying signal */
  relevanceScore: number;
  /** The keywords that triggered the match (for transparency) */
  matchedTerms: string[];
  /** A suggested, helpful, compliant first-contact angle */
  outreachAngle: string;
};

export type FeedMode = "live" | "sample";

export type SignalFeed = {
  signals: Signal[];
  mode: FeedMode;
  fetchedAt: number;
  /** Sources that were queried and whether they returned anything */
  sources: { id: SourceId; label: string; ok: boolean; count: number }[];
  /** Present when live fetching failed and sample data is shown */
  notice?: string;
};
