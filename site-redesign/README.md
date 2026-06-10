# Advisory Monks — "Ink & Brass on White" redesign

A **drop-in replacement** for the live site's `chambers.css`. The site loads
`chambers.css` LAST on all 24 pages, so this single file restyles the entire
site. **No HTML, URL, sitemap, title, meta, canonical, or JSON-LD changes** →
zero indexing/SEO impact.

## What it does
- **Palette:** navy ink `#16223A` + brass accent `#8C6D33` on a **clean white**
  canvas with cool-neutral grays. No warm parchment, no grain texture.
- **Typography:** editorial **serif headlines** (Lora) + **sans body**
  (Instrument Sans). Accent reserved for kickers/hairlines/marks only.
- **Hero:** navy hero band on a white body; footer + CTA bands also navy.
- **Components:** hairline-bordered white cards (4–6px radius), ink buttons
  (no pills), serif tabular numerals, dark featured pricing tier.
- **Motion (subtle, interaction-based only):** hover lift on cards, nav underline
  grow, button arrow nudge, a soft one-time hero fade. No scroll-reveal
  animations. Respects `prefers-reduced-motion`.

## How it's built
`chambers.css` = the original live `chambers.css` + four appended layers
(craft → white tokens → dark hero → subtle motion). Everything is additive and
clearly commented, so it is easy to review or revert.

## Deploy
1. Replace `chambers.css` at the **root** of `AdvisoryMonks/advisorymonks-site`
   with this file.
2. Cloudflare Pages auto-deploys (~1 min).
3. Hard-refresh (Ctrl/Cmd-Shift-R) to bypass the cached old CSS.

## Rollback
Restore the previous `chambers.css` (one-file revert).
