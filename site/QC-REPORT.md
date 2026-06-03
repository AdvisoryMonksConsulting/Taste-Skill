# Advisory Monks — QC Report

**Scope:** 22 pages × 2 design versions (Chambers primary + Brand identity).
**Result: 22/22 pages pass — 0 issues.**

## Automated checks (headless Chromium, every page)
- Single `<h1>`, `<title>`, one `<link rel=canonical>`, `<meta viewport>`, `lang="en"` — all pass.
- All `<img>` have `alt`; no empty/unlabelled links.
- 0 console errors, 0 failed network requests.
- 0 broken internal links (full crawl).
- 0 horizontal overflow at 1440px desktop and 390px mobile.
- Mobile hamburger menu functional on all sub-pages.

## Fixes made in this pass
1. **Duplicate `<h1>`** on the homepage (hidden 404-view heading) → demoted to `<h2>`.
2. **Removed render-blocking Google Fonts** `<link>`/preconnects on all pages — fonts are now fully self-hosted (`/fonts/*.ttf`). Faster first paint, no third-party dependency, no cookies to Google, eliminates the cert/console errors.
3. **Practice pages reformatted** — the "What we do" wall of full-width text now reads as an article: serif lead paragraph, ~70ch measure, ruled topic blocks, comfortable line-height.
4. **AI-slop removed** (prior pass, verified): fabricated testimonials + unverified "5.0 rating" gone; replaced with factual partner-led principles. No placeholders, fake logos, gradients, or gimmicks remain.

## Cloudflare Pages readiness
- **`_headers`** added: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, plus long-lived immutable caching for `/fonts/*` and sensible caching for CSS/images.
- **Clean URLs** (`/practices/cross-border-tax`) work natively on Cloudflare Pages — it serves `.html` at extensionless paths and 301s the `.html` form automatically. The in-site links and `sitemap.xml` already use the clean form.
- **Analytics:** Plausible is wired in `<head>`. For Cloudflare Web Analytics, enable it from the Cloudflare dashboard (zero-config beacon injection when the zone/Pages project is proxied) — no token in code, so nothing to leak or break. (The earlier broken `YOUR_TOKEN_HERE` beacon was removed.)
- **Deploy:** drag-and-drop the unzipped folder into Pages, or `npx wrangler pages deploy .` — it's static, no build step.

## Still requires you (content, not code)
- Real, client-approved testimonials (the honest "principles" block stands in for now).
- Optional: build `/api` and `/security` pages if you want them (their links were removed, so nothing 404s).
