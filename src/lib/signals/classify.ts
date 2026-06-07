import {
  CATEGORIES,
  CATEGORY_BY_ID,
  NRI_CONTEXT_TERMS,
  TAX_CONTEXT_TERMS,
  URGENCY_TERMS_HIGH,
  URGENCY_TERMS_MEDIUM,
} from "./taxonomy";
import type { CategoryId, Urgency } from "./types";

export type Classification = {
  category: CategoryId;
  categoryLabel: string;
  urgency: Urgency;
  /** 0+ ; we keep only signals that clear a relevance threshold */
  relevanceScore: number;
  matchedTerms: string[];
  outreachAngle: string;
};

/** Minimum relevance for a post to count as a real NRI tax signal. */
export const RELEVANCE_THRESHOLD = 3;

function countHits(haystack: string, terms: string[]): string[] {
  const hits: string[] = [];
  for (const term of terms) {
    if (haystack.includes(term)) hits.push(term);
  }
  return hits;
}

/**
 * Classify a piece of public text (title + body) into the NRI tax taxonomy,
 * scoring how strong a buying signal it is and how urgent.
 */
export function classify(title: string, body: string): Classification {
  const text = `${title}\n${body}`.toLowerCase();

  // --- Context: is this actually NRI + tax? ---
  const nriHits = countHits(text, NRI_CONTEXT_TERMS);
  const taxHits = countHits(text, TAX_CONTEXT_TERMS);

  // --- Category: pick the best-scoring bucket. ---
  let bestCategory: CategoryId = "general";
  let bestHits: string[] = [];
  for (const cat of CATEGORIES) {
    if (cat.keywords.length === 0) continue;
    const hits = countHits(text, cat.keywords);
    if (hits.length > bestHits.length) {
      bestHits = hits;
      bestCategory = cat.id;
    }
  }

  // --- Urgency ---
  const highHits = countHits(text, URGENCY_TERMS_HIGH);
  const medHits = countHits(text, URGENCY_TERMS_MEDIUM);
  let urgency: Urgency = "low";
  if (highHits.length > 0) urgency = "high";
  else if (medHits.length > 0) urgency = "medium";

  // --- Relevance score ---
  // Weight: NRI context and category specificity matter most; tax context
  // and explicit urgency add a little. A question (someone asking for help)
  // gets a small bump.
  const isQuestion =
    text.includes("?") ||
    medHits.length > 0 ||
    text.includes("looking for") ||
    text.includes("need help");

  const relevanceScore =
    nriHits.length * 2 +
    taxHits.length +
    bestHits.length * 2 +
    (urgency === "high" ? 2 : urgency === "medium" ? 1 : 0) +
    (isQuestion ? 1 : 0);

  const matchedTerms = Array.from(
    new Set([...nriHits, ...taxHits, ...bestHits]),
  ).slice(0, 8);

  return {
    category: bestCategory,
    categoryLabel: CATEGORY_BY_ID[bestCategory].label,
    urgency,
    relevanceScore,
    matchedTerms,
    outreachAngle: CATEGORY_BY_ID[bestCategory].outreachAngle,
  };
}

/** A signal counts only if it has NRI context AND tax context AND enough score. */
export function isRelevant(c: Classification, title: string, body: string): boolean {
  const text = `${title}\n${body}`.toLowerCase();
  const hasNri = NRI_CONTEXT_TERMS.some((t) => text.includes(t));
  const hasTax = TAX_CONTEXT_TERMS.some((t) => text.includes(t));
  return hasNri && hasTax && c.relevanceScore >= RELEVANCE_THRESHOLD;
}
