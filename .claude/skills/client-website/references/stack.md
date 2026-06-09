# Client-website stack — ranked catalog

The vetted, highest-rated open-source resources for building premium client
websites, grouped by role. Star counts are approximate as of early 2026 and
indicate relative standing, not exact figures. All target the
**Next.js + Tailwind + shadcn/ui** stack and install via the **shadcn CLI**
(`npx shadcn@latest add <url>`) or copy-paste unless noted.

> Registry URLs change as libraries evolve. The canonical install command is
> always shown on each library's own site / component page — confirm there
> rather than trusting a hardcoded URL. Always `--dry-run` first.

---

## 0. Taste layer (in this repo)

| Resource | What | Use |
|---|---|---|
| `design-md/` | 54 brand design-language specs (Stripe, Linear, Vercel, Apple, Notion, Figma, Supabase…) | Pick the closest to the client's desired feel; lift palette/type/spacing/motion into the Tailwind theme |
| `lndev-pages` skill | Full-page templates by Leonel Ngoya (`bk.lndev.me/pages`, `square.lndev.me`) | Whole-page starting layouts; see that skill |

---

## 1. Foundation

| Library | ~Stars | Role | Install |
|---|---|---|---|
| **shadcn/ui** | ~100k | The base: accessible Radix + Tailwind components via registry/CLI (not an npm package) | `npx shadcn@latest init` then `add` |
| **shadcn/ui blocks** (official) | (part of shadcn) | Pre-built marketing sections, dashboards, auth screens | `npx shadcn@latest add <block>` |
| **Tailwind CSS** | ~84k | Styling engine (already in this repo, v4) | already configured |
| **Lucide** | ~14k | Default icon set (already a dep: `lucide-react`) | `npm i lucide-react` |

## 2. Page sections / blocks (structure — the big accelerators)

| Library | Focus | Notes |
|---|---|---|
| **Tailark** | 300+ landing-page conversion blocks (hero, features, pricing, testimonials, FAQ, CTA, footer) on shadcn | Best first stop for marketing pages — `tailark.com` |
| **lndev pages / Square UI** | Full-page layouts & app screens | via `lndev-pages` skill |
| **shadcnblocks / shadcn.io** | Large free + pro block marketplaces (hundreds of blocks) | `shadcnblocks.com`, `shadcn.io` |
| **Creative Tim UI** | Production-ready shadcn blocks, AI/MCP-ready | open-source registry |

## 3. Animated components (premium "wow" — use sparingly)

| Library | ~Stars | Strength | Install |
|---|---|---|---|
| **React Bits** | ~26–37k (#2 JS Rising Stars 2025) | Large animated set; no forced Framer Motion (CSS + GSAP/Three only where needed) | own CLI (`jsrepo`) / copy-paste — `reactbits.dev` |
| **Aceternity UI** | ~28k | Bold visual effects: 3D cards, beams, particles, text reveal, glare — landing-page pop | shadcn `add` from `ui.aceternity.com` |
| **Magic UI** | ~21–30k | Polished marketing micro-interactions: animated beams, retro grids, marquees (Tailwind + Framer Motion) | `npx shadcn@latest add "https://magicui.design/r/<name>.json"` |
| **Cult UI** | ~4k | 75+ animated components + AI SDK patterns | shadcn `add` from `cult-ui.com` |

## 4. Advanced primitives / forms

| Library | Role |
|---|---|
| **Origin UI** | Advanced inputs, complex components for app-heavy areas — `originui.com` |

## 5. Animation engines (bespoke motion)

| Library | ~Stars | Role | Install |
|---|---|---|---|
| **Three.js** | ~101k | 3D / WebGL when a project needs it | `npm i three` |
| **Motion** (ex–Framer Motion) | ~31k (3.6M weekly dl) | React animation standard — page/element transitions | `npm i motion` |
| **GSAP** | ~24k | Pro-grade timeline animation, scroll-trigger | `npm i gsap` |
| **Lenis** | ~9k | Buttery smooth/inertia scroll — instant "studio site" feel | `npm i lenis` |
| **Anime.js** | ~66k | Lightweight all-purpose JS animation | `npm i animejs` |

## 6. Discovery / meta

| Resource | What |
|---|---|
| **awesome-shadcn-ui** (bytefer / birobirobiro) | Curated index of every shadcn registry, block lib, and tool — start here to find the newest options |
| **registry.directory** | Explorer for shadcn/ui community registries |

---

## Picking guidance

- **Marketing / landing site** → design-md taste + Tailark blocks + 1–2 Magic UI
  or Aceternity moments + Lenis smooth scroll.
- **Web app / dashboard** → shadcn/ui + Origin UI + lndev/Square UI layouts;
  minimal motion.
- **High-impact "agency showcase"** → Aceternity / React Bits hero + GSAP +
  Three.js accents — but keep it tasteful; restraint reads as premium.

Always: install → `--dry-run` → review → adapt to the client's brand tokens →
unify → build.
