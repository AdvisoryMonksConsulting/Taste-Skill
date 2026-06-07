# Landing Page Starter — your 5-day delivery engine

A config-driven, conversion-built landing page in Next.js + Tailwind + shadcn/ui.
This is the reusable asset behind the **$4,950 / 5-day Launch package** (see `/go-to-market/01-offer-and-pricing.md`).

Built with the `landing-page-generator` + `theme-factory` skills, matched to this repo's stack
(Next 16 · React 19 · Tailwind v4 · shadcn new-york · lucide).

## What's here

```
templates/landing-page/
├── content.ts          ← THE ONLY FILE YOU EDIT PER CLIENT (copy + brand tokens)
├── page.tsx            ← assembles sections + SEO metadata
└── sections/           ← Hero, Logos, Features, Pricing, Testimonials, Faq, Cta, Footer
```

## Per-client workflow (this is the productized pipeline)

1. **Copy the folder** into a route, e.g. `src/app/(landing)/page.tsx` for the client's repo,
   or `src/app/demos/<client>/page.tsx` to host a spec demo.
2. **Edit `content.ts` only.** Replace copy, plans, FAQ, testimonials.
3. **Re-theme in 2 lines** — change `brand.accent` + `brand.accentText` (any Tailwind color).
   Pull exact palettes/type from the brand breakdowns in `/design-md` (Stripe, Linear, Vercel, …).
4. **Add an OG image** at `opengraph-image.(png|tsx)` next to `page.tsx` (1200×630).
5. **Deploy to Vercel** → hand over the live link.

## Copy frameworks (set in `content.ts`)

The sample uses **PAS** (Problem → Agitate → Solution) in `hero.headline` / `hero.sub`. Swap as needed:
- **PAS** — lead with their pain, agitate the cost, present the fix. (default)
- **AIDA** — attention → interest → desire → action.
- **BAB** — "before state → after state", then bridge.

## Spec-demo play (for cold outreach)

To rebuild a prospect's hero for the `cold-email` sequence: copy this folder to
`src/app/demos/<prospect>/`, fill `content.ts` with *their* product, deploy, and drop the
preview URL into the `{{preview_link}}` variable in Instantly. ~2 hours → a personalized,
reply-worthy demo.

## Conventions / dependencies

- Uses existing `@/components/ui/{button,card}` and `lucide-react` — no new deps.
- FAQ uses native `<details>` (zero JS) and emits `FAQPage` JSON-LD for rich results.
- All sections are server components (no `"use client"`), keeping JS minimal for Core Web Vitals.

## SEO / performance checklist (verify before handoff)

- [ ] `content.seo.title` 50–60 chars, includes primary keyword
- [ ] `content.seo.description` 150–160 chars with a benefit + CTA
- [ ] `opengraph-image` present (1200×630)
- [ ] One `<h1>` (the hero) with the primary keyword
- [ ] `content.seo.url` set (canonical)
- [ ] Add `alt` text if you introduce `<Image>` components
- [ ] LCP < 1s (add `priority` to any hero image), CLS < 0.1 (set explicit image dims)
```
