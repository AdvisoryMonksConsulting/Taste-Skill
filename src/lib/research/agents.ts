import type { AgentId } from "./types";

export interface AgentDef {
  id: AgentId;
  /** Short label shown in the UI. */
  title: string;
  /** One-line description of what this agent does. */
  blurb: string;
  /** Tailwind text color class for the agent's accent. */
  accent: string;
  /** Builds the task instruction for this agent. */
  task: (idea: string) => string;
}

export const SYSTEM_PROMPT = `You are an elite startup research analyst working as one specialist in an automated, multi-agent founder-research team. Each agent owns one slice of the research; together you replace several hours of a founder's desk research.

Operating rules:
- Use web search to find real, current, verifiable information. Prefer primary sources (company sites, pricing pages, funding announcements, filings) and reputable coverage.
- Be concrete: name real companies, real prices, real funding rounds with amounts, stages, lead investors, and dates. Never invent facts. If something can't be verified, say so plainly rather than guessing.
- Cite sources inline as markdown links, e.g. [Acme pricing](https://example.com), placed next to the claim they support.
- Write clean, scannable markdown: tight sections, bullet points, and tables where they add clarity. Bold the key takeaways.
- Start directly with the substance. No preambles like "Here is" or "Sure". No restating the prompt.
- Earlier agents' findings (when provided) are trustworthy team context — build on them, don't repeat them wholesale.`;

export const AGENTS: AgentDef[] = [
  {
    id: "competitors",
    title: "Competitor Research",
    blurb: "Maps the direct and indirect players in the space.",
    accent: "text-sky-600 dark:text-sky-400",
    task: (idea) =>
      `Identify the competitive landscape for this startup idea:\n\n"${idea}"\n\nFind 5–8 direct and indirect competitors. For each, give: the company name (as a link to its site), a one-line description, and how it positions itself. Then add a short **Competitive landscape summary** noting how crowded the space is and where the obvious clusters are.`,
  },
  {
    id: "pricing",
    title: "Pricing Intelligence",
    blurb: "Pulls real pricing and monetization models from the market.",
    accent: "text-emerald-600 dark:text-emerald-400",
    task: (idea) =>
      `Research how competitors and comparable products are priced for this idea:\n\n"${idea}"\n\nProduce a markdown table with columns: Company | Plan/Tier | Price | What's included. Cover the main players and at least one budget and one premium option where they exist. Below the table, summarize the dominant **monetization models** (per-seat, usage-based, freemium, flat, enterprise) and the typical price range a new entrant would be benchmarked against. Cite every price with a source link.`,
  },
  {
    id: "funding",
    title: "Funding Landscape",
    blurb: "Tracks who raised, how much, and investor appetite.",
    accent: "text-violet-600 dark:text-violet-400",
    task: (idea) =>
      `Research the funding landscape relevant to this idea:\n\n"${idea}"\n\nProduce a markdown table: Company | Stage | Amount | Date | Lead investor(s) | Source. Focus on the most relevant and most recent rounds. Then summarize **investor appetite**: is capital flowing into this space, which theses are hot or cooling, and which investors are most active. Cite each round.`,
  },
  {
    id: "gaps",
    title: "Market Gap Analysis",
    blurb: "Finds underserved segments and whitespace.",
    accent: "text-amber-600 dark:text-amber-500",
    task: (idea) =>
      `Using the competitor, pricing, and funding research the team has already gathered (above), identify the real market gaps for this idea:\n\n"${idea}"\n\nBe specific and evidence-based. Cover: (1) what customers are actually complaining about — search reviews, forums, and discussions and cite them; (2) underserved segments or use cases the incumbents ignore; (3) concrete whitespace where a new entrant could win. Avoid generic platitudes — tie each gap to evidence.`,
  },
  {
    id: "positioning",
    title: "Positioning Strategy",
    blurb: "Crafts sharp positioning against named rivals.",
    accent: "text-rose-600 dark:text-rose-400",
    task: (idea) =>
      `Using all of the team's research above, craft a sharp positioning for THIS idea:\n\n"${idea}"\n\nInclude, as clearly labelled sections: **Positioning statement** (one sentence), **Ideal customer profile** (who it's for, specifically), **Differentiators** (3, each contrasted against a named competitor from the research), **Messaging pillars** (3), and **Pricing approach** (a concrete recommendation with rationale grounded in the pricing research).`,
  },
  {
    id: "launch",
    title: "Launch Strategy",
    blurb: "Lays out a concrete 90-day go-to-market plan.",
    accent: "text-indigo-600 dark:text-indigo-400",
    task: (idea) =>
      `Using all of the team's research above, propose a concrete 90-day go-to-market launch plan for this idea:\n\n"${idea}"\n\nInclude: **Beachhead** (the single segment to win first, and why), **Channels** (ranked, with rationale), **Timeline** (a week-by-week or phase-by-phase sequence across the 90 days), **First 3 experiments** (each with a hypothesis and a success metric), and **Biggest risk + mitigation**. Keep it actionable enough that a founder could start Monday.`,
  },
];
