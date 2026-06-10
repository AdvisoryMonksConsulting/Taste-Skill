# DeskFill — Deploy to Cloudflare Pages

## What's in this folder
| File | Purpose |
|---|---|
| `index.html` | **Main site** — light edition (white + bluish light) |
| `deck.html` | Dark navy edition (sales deck) → yoursite.com/deck |
| `dashboard-preview.html` | Client dashboard demo → /dashboard-preview |
| `dashboard.png` | Dashboard product shot used on slide 4 |
| `_headers` | Cache headers for Cloudflare Pages |
| `BRAND.md` | Brand guide (not served as a page) |

## Deploy (2 minutes, no build step)
**Option A — drag & drop:**
1. Go to https://dash.cloudflare.com → Workers & Pages → Create → Pages → "Upload assets"
2. Drag this whole `deskfill-site` folder in → Deploy
3. You get `<project>.pages.dev` instantly

**Option B — connect the repo:**
1. Pages → Create → "Connect to Git" → select this repo & branch
2. Build settings: framework **None**, build command **(empty)**, output directory **`deskfill-site`**
3. Every push auto-deploys

**Custom domain:** Pages project → Custom domains → add `deskfill.com` (or subdomain).

## Before you go live — fill these in `index.html`
- [ ] Cal.com / Calendly link (slide 10 CTA, marked in yellow)
- [ ] Legal entity + physical mailing address (footer — CAN-SPAM requirement)
- [ ] Contact email (footer)
- [ ] Add `/privacy` and `/terms` pages (footer links point there)
