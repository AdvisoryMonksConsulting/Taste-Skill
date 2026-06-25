/**
 * Palette data for the InvestHER demo, kept in a plain (non-"use client") module
 * so server components (route generateStaticParams/metadata) can import the real
 * values. The client component in investher.tsx imports these too.
 */
export type Palette = {
  slug: string;
  name: string; // human label for the color direction
  vibe: string; // one-line description for the chooser
  bg: string;
  ink: string;
  primary: string;
  primaryDark: string;
  accent: string;
  gold: string;
  line: string;
  grad: [string, string, string]; // hero gradient stops
};

export const themes: Palette[] = [
  {
    slug: "aubergine",
    name: "Aubergine & Rose",
    vibe: "Warm, feminine-premium — plum, terracotta rose and soft gold on cream.",
    bg: "#f7f1ea", ink: "#2c1a29", primary: "#5b2a4e", primaryDark: "#3d1c34",
    accent: "#c2766a", gold: "#c19a4b", line: "#e7dccf",
    grad: ["#3d1c34", "#5b2a4e", "#6e3a5e"],
  },
  {
    slug: "emerald",
    name: "Emerald & Gold",
    vibe: "Wealth and growth — deep emerald with warm amber and antique gold.",
    bg: "#f3f3ec", ink: "#16241d", primary: "#1f5142", primaryDark: "#143329",
    accent: "#c98a4b", gold: "#caa64e", line: "#e0e2d6",
    grad: ["#143329", "#1f5142", "#2c6b56"],
  },
  {
    slug: "sapphire",
    name: "Sapphire & Coral",
    vibe: "Trustworthy and modern — deep navy with a confident coral accent.",
    bg: "#f2f4f9", ink: "#161d2e", primary: "#1e3a64", primaryDark: "#122444",
    accent: "#e08a6b", gold: "#c9a24b", line: "#dde2ec",
    grad: ["#122444", "#1e3a64", "#2d5286"],
  },
  {
    slug: "sunset",
    name: "Sunset Terracotta",
    vibe: "Bold and energetic — terracotta, warm coral and amber.",
    bg: "#fbf2ea", ink: "#2e1a14", primary: "#b5462f", primaryDark: "#7e2d1d",
    accent: "#e8884f", gold: "#d9a441", line: "#f0ddcf",
    grad: ["#7e2d1d", "#b5462f", "#d56b3a"],
  },
  {
    slug: "noir",
    name: "Noir & Champagne",
    vibe: "Editorial, ultra-premium — charcoal with champagne gold and rose-bronze.",
    bg: "#f5f3ef", ink: "#1a1a1d", primary: "#232227", primaryDark: "#121214",
    accent: "#c98b6a", gold: "#c9a24b", line: "#e4e0d8",
    grad: ["#121214", "#232227", "#34313a"],
  },
];

export const getTheme = (slug: string): Palette | undefined => themes.find((t) => t.slug === slug);
