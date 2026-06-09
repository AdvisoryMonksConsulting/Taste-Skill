---
name: client-website
description: >-
  Build premium client websites and landing/marketing pages with a vetted,
  high-taste stack. USE THIS whenever the user asks to "build a client website",
  "build a website for a client", "make a landing page", "design a marketing
  site", "redesign a site", scaffold a new web page, or anything similar. Pairs
  the design-language references in design-md/ (the "taste" layer) with the
  highest-rated open-source UI libraries — shadcn/ui, Tailark, Magic UI,
  Aceternity, React Bits, Origin UI — and the lndev page templates, all on
  Next.js + Tailwind + shadcn/ui. See references/stack.md for the ranked catalog
  and exact install commands.
---

# Build a client website

When the user asks to build a client website (or a landing/marketing page, app
screen, or site redesign), follow this workflow. Default stack: **Next.js (App
Router) + TypeScript + Tailwind + shadcn/ui** — it matches this repo and every
resource below.

## The system at a glance

Three layers, used in order:

1. **Taste / design direction** → `design-md/` (54 brand design-language specs:
   Stripe, Linear, Vercel, Apple, Notion…). Pick the closest reference to the
   client's desired feel and pull its palette, type scale, spacing, and motion
   cues. This is what makes the result look *designed*, not generic.
2. **Structure / sections** → page templates + blocks (Tailark, lndev pages,
   shadcn blocks). Don't build hero/pricing/FAQ/footer from a blank file —
   install a vetted block and adapt it.
3. **Polish / motion** → animated components (Magic UI, Aceternity, React Bits)
   + animation engines (Motion, GSAP, Lenis) for the premium, studio feel.

Full ranked catalog with stars and exact commands: **`references/stack.md`** —
read it before installing anything.

## Workflow

1. **Brief → direction.** Get the client's vertical, vibe, and 1–2 reference
   brands. Map the vibe to a `design-md/<brand>/DESIGN.md` and lift its tokens
   into the Tailwind theme (colors, fonts, radius, shadows).
2. **Confirm the base.** Ensure shadcn/ui + Tailwind are set up
   (`components.json` present; this repo already has them). If not:
   `npx shadcn@latest init`.
3. **Scaffold sections from blocks.** Install page sections rather than writing
   them cold — prefer **Tailark** (conversion-focused marketing blocks) and the
   **lndev pages** collection (see the `lndev-pages` skill). Always
   `--dry-run` first.
4. **Layer in motion selectively.** Add 1–3 standout moments (animated hero,
   bento, text reveal) from **Magic UI** / **Aceternity** / **React Bits**.
   Don't over-animate — premium = restraint. Use **Lenis** for smooth scroll
   and **Motion**/**GSAP** for bespoke transitions.
5. **Reconcile + finish.** Replace placeholder copy/images with the client's
   real content, unify all installed pieces against the chosen design tokens so
   nothing looks bolted-on, check responsive + dark mode, run the build.

## Safety & licensing

- These are **community registries** — review code on install (inspect the
  `--dry-run` output before committing). Once installed, the code lives in the
  repo: treat it as owned project code.
- Keep license attribution where a library requires it. Most are MIT/free;
  confirm per library in `references/stack.md`.
- Don't copy another studio's *finished site* design wholesale (IP) — use these
  primitives/blocks as building blocks and apply the client's own brand.
