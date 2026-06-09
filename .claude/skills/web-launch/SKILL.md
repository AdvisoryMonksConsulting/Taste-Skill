---
name: web-launch
description: >-
  Make a built website production-ready and ship it — performance (Core Web
  Vitals), SEO meta, Open Graph / social share images, accessibility, responsive
  & dark-mode QA, then deploy. USE THIS when launching or shipping a site,
  improving PageSpeed / Lighthouse, adding meta or OG images, fixing
  accessibility, or running a pre-launch checklist. Final step after
  client-website.
---

# Web launch

The pre-flight checklist that turns a good-looking build into a fast,
findable, accessible, live site.

## 1. Performance (Core Web Vitals)
- **Images:** right format (AVIF/WebP), sized, lazy-loaded below the fold,
  explicit width/height to avoid layout shift (CLS).
- **Fonts:** `font-display: swap`, preload the hero font, subset if possible.
- **JS:** ship less; defer non-critical; avoid heavy libs for small effects.
- Target good **LCP** (<2.5s), **CLS** (<0.1), **INP** (<200ms). Verify with
  Lighthouse / PageSpeed Insights.

## 2. SEO
- Unique `<title>` + meta description per page; one `<h1>`.
- `sitemap.xml`, `robots.txt`, canonical URLs.
- Structured data (JSON-LD) for the org / local business / product where it fits.

## 3. Social / Open Graph
- `og:title`, `og:description`, `og:image` (1200×630) + Twitter card tags.
- Generate a branded **OG image** (can reuse the deck-design navy system or a
  Next.js `opengraph-image`).

## 4. Accessibility
- Colour contrast ≥ 4.5:1 for text; visible focus states.
- Real alt text; semantic landmarks (`nav`/`main`/`footer`); labelled inputs.
- Keyboard-navigable; respects `prefers-reduced-motion`.

## 5. QA
- Responsive at 360 / 768 / 1280+; dark mode if used; 404 page; forms tested;
  links not dead; favicon + app icons present.

## 6. Deploy
- Static export where possible (`output: 'export'` for Next + static host) or
  the project's normal build. Confirm the live URL, then re-run PageSpeed.

> The Veska model: preview on our infra → client pays → release domain + code.
> Don't hand over production access before payment.
