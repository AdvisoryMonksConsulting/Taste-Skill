/**
 * Shared facts for every InvestHER concept (plain module — safe to import from
 * server route files). Each of the five designs presents this content in a
 * completely different layout/typography/structure; only the underlying facts
 * are shared.
 */

export const STATS = [
  { n: "17,000+", l: "Members" },
  { n: "50+", l: "Local meetups" },
  { n: "11,000", l: "In the group" },
  { n: "#1", l: "Women’s RE podcast" },
];

export const PILLARS = [
  { k: "Real Estate Investing", d: "Buy, flip, hold and scale a portfolio with women who’ve already done it — strategies you can act on, not just listen to." },
  { k: "Business", d: "Build the team, systems and processes that turn your investing into a real business that runs without burning you out." },
  { k: "Self-Care", d: "Grow wealth and a life that feels aligned. The only community built on the truth that balance is part of the strategy." },
];

export const LADDER = [
  { step: "Start free", t: "Free Membership & Podcast", d: "Curated trainings and the top-ranked InvestHER podcast — your foundation, no cost." },
  { step: "Get guided", t: "InvestHER PODs", d: "A 4-month mentor-led program: knowledge, action, and accountability every step." },
  { step: "Scale", t: "STRIVE", d: "A 12-month room of established women investors scaling team, systems and returns." },
  { step: "Gather", t: "InvestHER CON", d: "Two transformational days in person — investing, business and self-care, on one stage." },
];

export const TESTIMONIALS = [
  { q: "I found my people and doubled my portfolio in a year. This community changed how I invest — and how I live.", who: "Member · 14 doors" },
  { q: "The systems I built here bought back my time. I run a real business now, not a second job.", who: "Member · STRIVE" },
  { q: "I went from listening to the podcast to closing my first multifamily deal in eight months.", who: "Member · first deal" },
  { q: "Self-care isn’t soft — it’s the reason I haven’t burned out while scaling. No one else teaches that.", who: "Member · 3 years" },
];

export const FOUNDERS_BLURB =
  "What started in 2018 as one virtual mastermind is now a global movement built on a single belief: every woman has the birthright to become financially free. We built the community we wished we’d had — and 17,000 women have made it theirs.";

export type DesignMeta = {
  slug: string;
  name: string; // design-direction name
  approach: string; // what makes this direction different (not just color)
  swatch: [string, string, string, string]; // preview swatches
  grad: [string, string]; // preview gradient
};

/** The directions — all modeled on the real InvestHER/STRIVE brand. Order = display order. */
export const DESIGNS: DesignMeta[] = [
  {
    slug: "editorial",
    name: "Editorial",
    approach: "Magazine layout — serif + italic script, pain-point cards, the 5 Principles flanked by B&W detail strips. Dense and premium.",
    swatch: ["#1e4d48", "#a5113f", "#a7c3cd", "#f6f0e1"],
    grad: ["#1e4d48", "#a7c3cd"],
  },
  {
    slug: "boutique",
    name: "Boutique",
    approach: "Airy and high-end — full-bleed founder photography, centered single column, thin serif, vast cream whitespace, hairline dividers.",
    swatch: ["#163a36", "#a5113f", "#c9dde2", "#f6f0e1"],
    grad: ["#163a36", "#1e4d48"],
  },
  {
    slug: "community",
    name: "Warm Community",
    approach: "Friendly and social — split hero, rounded dusty-blue cards, a stats ribbon, the 50,000-women community front and centre.",
    swatch: ["#a7c3cd", "#1e4d48", "#a5113f", "#f6f0e1"],
    grad: ["#1e4d48", "#a7c3cd"],
  },
  {
    slug: "bold",
    name: "Modern Bold",
    approach: "Contemporary — oversized type, strong teal/blue colour blocks, framed founder photo, the 5 Principles as a big numbered grid.",
    swatch: ["#1e4d48", "#a5113f", "#a7c3cd", "#fbf7ec"],
    grad: ["#1e4d48", "#163a36"],
  },
  {
    slug: "heritage",
    name: "Heritage",
    approach: "Classic and timeless — symmetrical, serif throughout, ornate crest dividers, framed photography with thin double borders.",
    swatch: ["#1e4d48", "#a5113f", "#a7c3cd", "#f6f0e1"],
    grad: ["#a7c3cd", "#1e4d48"],
  },
];

export const getDesign = (slug: string): DesignMeta | undefined => DESIGNS.find((d) => d.slug === slug);
