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

/** The five directions — order = display order in the chooser. */
export const DESIGNS: DesignMeta[] = [
  {
    slug: "editorial",
    name: "Editorial",
    approach: "Magazine layout — large serif type, asymmetric columns, numbered sections, generous whitespace. Noir & champagne.",
    swatch: ["#1a1a1d", "#c9a24b", "#c98b6a", "#f5f3ef"],
    grad: ["#121214", "#34313a"],
  },
  {
    slug: "bold",
    name: "Bold Modern",
    approach: "Oversized uppercase sans, high-contrast color blocks, a scrolling marquee, bento grid. Energetic terracotta.",
    swatch: ["#b5462f", "#e8884f", "#1c0f0a", "#fbf2ea"],
    grad: ["#7e2d1d", "#d56b3a"],
  },
  {
    slug: "community",
    name: "Warm Community",
    approach: "Friendly and social — rounded cards, overlapping member collage, a testimonial wall. Aubergine & rose.",
    swatch: ["#5b2a4e", "#c2766a", "#e7b6a6", "#f7f1ea"],
    grad: ["#3d1c34", "#6e3a5e"],
  },
  {
    slug: "platform",
    name: "Platform / SaaS",
    approach: "Structured and trustworthy — product-style hero card, trust strip, tiered pricing table, FAQ. Sapphire navy.",
    swatch: ["#1e3a64", "#3f8efc", "#e08a6b", "#f2f4f9"],
    grad: ["#122444", "#2d5286"],
  },
  {
    slug: "luxe",
    name: "Luxe Minimal",
    approach: "Boutique and understated — centered single column, thin type, huge negative space, slow blur reveals. Emerald & gold.",
    swatch: ["#1f5142", "#caa64e", "#9bb7a8", "#f3f3ec"],
    grad: ["#143329", "#2c6b56"],
  },
];

export const getDesign = (slug: string): DesignMeta | undefined => DESIGNS.find((d) => d.slug === slug);
