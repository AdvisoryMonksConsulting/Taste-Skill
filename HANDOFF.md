# Advisory Monks — Claude Code Session Handoff
_Last updated: 2026-06-06_

## 0) TL;DR — the one decision that matters most
**Domain strategy is unresolved and is the biggest SEO lever.** You own **advisorymonks.com** (old site, live for years, holds all the SEO authority, `/services/…` URLs) and **advisorymonks.io** (the new site we built, ~2 weeks old, barely indexed). `.com` currently 301-redirects to `.io` (set up recently; exact config unknown).
**Open recommendation:** seriously consider **hosting the NEW site on `.com`** (keep the authority) and redirecting `.io → .com`, instead of migrating `.com → .io`. Decide the brand, then execute. Details in §6.

---

## 1) Who / environment
- **Firm:** Advisory Monks Consulting (OPC) Pvt Ltd — independent cross-border tax/legal/financial advisory. Noida, India. Founded 2021.
- **Contact:** shamik@advisorymonks.io · WhatsApp +91 85951 16297 · LinkedIn company page.
- **User is non-technical** → give click-by-click steps; deliver files to upload rather than assuming CLI fluency.
- **Audiences:** NRIs (Pravasi Desk), Indian founders/UHNIs, foreign companies (India entry/GCC), investors (VC). Newsletter focus = **India-connected audience**.

## 2) Hosting & repos
- **Live site:** Cloudflare **Pages** project **`advisorymonks-site`**, auto-deploys from GitHub repo **`AdvisoryMonks/advisorymonks-site`**, branch **`main`**, **files at repo root**. Custom domains: advisorymonks.io + www.
- **Cloudflare account:** Info@advisorymonks.com — **Free plan**.
- **Old/extra Cloudflare Pages projects** exist (`advisorymonksconsulting`, `advisorymonks`, `advisorymonksconsultingio`) from earlier wrangler deploys — superseded; can be cleaned up later.
- **Working/mirror repo (Claude CAN push here):** `AdvisoryMonksConsulting/Taste-Skill`, branch **`claude/elegant-brown-Ke0Qz`**. Holds `/site` (mirror of the site) and `/site-pipeline` (pipeline scripts + SEO scripts + schema snippet).
- ⚠️ **Access reality:** Claude's GitHub scope = **Taste-Skill only**. The **LIVE repo (`AdvisoryMonks/advisorymonks-site`) is NOT writable by Claude** → deliver changed files via `SendUserFile`; user uploads them. User's personal GitHub (`AdvisoryMonks`) is **not** a member of the `AdvisoryMonksConsulting` org.

## 3) The website
- Hand-coded **static** site, **26 pages**: home (`index.html`, ~283KB, lots of inline CSS), **13 practice pages** (`/practices/*.html`), `insights.html` + 4 articles + pillar (Income-tax Act 2025), 3 guides, **NRI-TDS tool**, team/privacy/terms.
- **Chambers theme:** navy/gold, Lora / Instrument Sans / IBM Plex Mono (self-hosted). **Every page links `chambers.css` LAST** → global style changes go there.
- Clean URLs (no `.html`); canonical = `https://www.advisorymonks.io/...`.
- A **`ramp.html`** full-redesign preview exists (Ramp.com aesthetic — cream/lime/black). User asked for a Ramp redesign; iterated twice; left as a **separate preview file**, not adopted.

## 4) SEO — done vs pending
**Done (delivered for user to upload to the live repo — confirm these are uploaded):**
- 13 practice pages: **Breadcrumb + Service + Organization/LocalBusiness** JSON-LD + optimized titles/meta. (FAQPage was added then **removed** — Google deprecated FAQ rich results for non-gov/health sites.) → `practices-seo.zip`.
- **`_redirects`**: `.html → clean` 301s (fixes the 9 GSC "redirect error" URLs which are all `/practices/X.html`).
- **Homepage Organization+WebSite schema** snippet (`homepage-schema.html`) → paste before `</body>` in `index.html`.
- Rich Results Test passes after FAQ removal (Breadcrumb/Service/Org/LocalBusiness valid).

**Pending / open:**
- Upload the 3 items above to `AdvisoryMonks/advisorymonks-site`, then in GSC click **Validate Fix** on the "Redirect error" issue.
- **Block Bytespider** (ByteDance scraper, your #1 crawler, no value): Cloudflare → `advisorymonks.io` → Security → WAF → Custom rules → `User Agent contains Bytespider` → Block. (AI Crawl Control shows Claude/OpenAI/Google allowed, 0 blocked — good; leave those.)
- **GSC state (advisorymonks.io):** ~1 indexed, ~43 not indexed, 9 redirect errors, 5 crawled-not-indexed, 1 stale noindex. Sitemap submitted. (Low indexing largely due to site age + the `.com/.io` split.)

## 5) Notion (workspace: info@advisorymonks.com)
- **Website Insights** DB (created this session) — drives the website blog.
  - `data_source_id`: **`d289b088-73c4-4915-9c68-04f077f5571b`** (database id `1986269a-1a4d-429b-afbd-9d3c8c43d4ea`), under page "AMC Content Queue" (`36d0b1de-8598-8060-b170-ce024c92fbdc`).
  - Props: Title, Status (Draft/Published/Unpublished), Slug, Deck, Tag (Cross-Border/Startup Stack/POV/Compliance Calendar/Regulatory Pulse/US Outsourcing), Publish Date, SEO Description. **Article body = page content.**
  - Contents: 1 example (Published), **11 full articles (Draft)**, 1 outline (PFIC & GILTI, Draft).
- **Posts** DB (pre-existing, social calendar) — `data_source_id`: **`fc1b2bca-54f8-4ae5-86d5-8c2c0ffde26e`** (db `164a0912-08ab-4e16-8e86-cb62a3262510`).
  - Channels: Shamik LinkedIn, AMC LinkedIn, AMC Twitter, Akash LinkedIn, Shamik Twitter.
  - **Large existing backlog (dozens of posts).** Added 11 LinkedIn posts this session (Draft; tentative Jun 8–19; split Shamik=cross-border/NRI, Akash=startup/valuation). Created a view **"By Channel · last/next post"**.
- Other DBs: NRI Engagement Tracker (Pravasi Desk), LinkedIn Outreach (Prospects), Leads (Lead Magnet Signups).
- Notion integration **"Website Sync"** (user-created) is connected to Website Insights; its token is stored as GitHub secret `NOTION_TOKEN` in the live repo.

## 6) Auto-publish pipeline (WORKING ✅)
**Notion (Website Insights, Status=Published) → GitHub Action → Cloudflare auto-deploy.**
- In **live repo** `AdvisoryMonks/advisorymonks-site`:
  - `scripts/sync-insights.mjs` — reads Notion, generates `insights/<slug>.html`, injects cards/links into `insights.html`/`sitemap.xml`/`rss.xml` between `<!-- NOTION:START/END -->` markers. **Hardened**: non-fatal if an insertion point isn't found; per-article try/catch.
  - `.github/workflows/sync-insights.yml` — hourly cron + manual `workflow_dispatch`; **rebase-and-retry push** (avoids race reds).
  - Secret `NOTION_TOKEN`; env `NOTION_DATABASE_ID=1986269a-1a4d-429b-afbd-9d3c8c43d4ea`, `CONTENT_DIR=.`.
- **Verified working** (the December example article published live). Reference copies in `Taste-Skill:/site-pipeline`.
- Workflow: write in Notion → set **Published** → live within the hour (or "Run workflow" for instant).

## 7) Content created this session
- **11 full website articles** (Draft in Website Insights): RNOR · ESOP tax · Foreign-company India setup · Rule 11UA/angel tax · Form 15CA/15CB · GIFT City IFSC · DPIIT/80-IAC · USD 1M repatriation · GCC transfer pricing · Advance tax · SHA vs AoA. Plus PFIC & GILTI (outline only).
- **11 LinkedIn posts** (Draft in Posts DB).
- ⚠️ **ACCURACY FLAG:** the **Rule 11UA / angel-tax** article + LinkedIn post may be **outdated** — Finance Act 2024 reportedly **abolished Section 56(2)(viib)** angel tax. **All drafts need a CA's current-year review before publishing.**
- **Self-regulating `/loop` prompt** was provided to keep the Website Insights draft queue topped up to 8. **Not yet launched.**

## 8) Marketing / channels (current understanding)
- **Inbound:** website/SEO, insights content engine, LinkedIn (Shamik/AMC/Akash), Twitter.
- **Outbound — NEW foreign market only** (run as "Advisory Monks Consulting," not a CA firm): cold email (**Instantly**), **Apollo** prospecting, LinkedIn outreach. User confirms cold email is the only viable entry for that new market — keep it on a **separate sending domain**.
- **Cadence decision:** 3 posts/week each for Shamik + Akash. The 11 new posts were reverted to **Draft** pending **de-confliction** against the existing backlog (user to send a screenshot of the "By Channel" view; then re-space + approve).
- **Newsletter (parked):** Concept = "The Cross-Border Brief," India audience; launch campaign **"The New Act, Decoded"** (Income-tax Act 2025) with the **1961→2025 section-map as a gated lead magnet**. **Source list by OPT-IN only** (warm clients, Leads DB, lead magnet, site form, LinkedIn) — NOT cold/scraped lists; use a real ESP (MailerLite/Kit/Beehiiv), not Instantly.

## 9) Open items — priority order
1. **DOMAIN DECISION (`.com` vs `.io`)** — biggest lever. To proceed need: (a) brand preference (recommend `.com`), (b) where `.com` is hosted / DNS control (possibly Webflow — Webflow MCP was connected), (c) browser test: where does `advisorymonks.com/services/corporate-tax-advisory-and-compliance-services` land? (homepage / matching page / 404), (d) is the redirect 301 or 302? (e) is there a `.com` property in Search Console? Then either **host new site on `.com` + redirect `.io→.com`** (recommended) or **finish `.com→.io`** (301 URL-mapped + GSC "Change of Address").
2. **Upload pending SEO files** to live repo (practice zip, `_redirects`, homepage schema) → GSC **Validate Fix**.
3. **De-conflict + schedule the 11 LinkedIn posts** (need "By Channel" view screenshot).
4. **CA-review & publish** the 11 article drafts; **fix the angel-tax piece**.
5. **Block Bytespider** (WAF rule).
6. **Launch the content loop** (optional).
7. **Newsletter** build (Issue #1 + section-map lead magnet + signup flow) when ready.

## 10) Constraints for the next session
- **No external web access to the sites:** advisorymonks.io is network-blocked; advisorymonks.com returns **403** to WebFetch (bot-protected). **WebSearch works** (US-based — not a substitute for Search Console rankings).
- **Claude can push only to `AdvisoryMonksConsulting/Taste-Skill`.** The live repo is user-controlled → deliver files via `SendUserFile`.
- **Cloudflare MCP** = read-only Workers / create-only D1·KV·R2. No deploy/DNS — **user does dashboard steps**.
- **Notion MCP** = full workspace access. **GitHub MCP** = Taste-Skill only.
- Deploy method the user knows: `npx wrangler pages deploy . --project-name <project>` from a local folder, OR GitHub upload → auto-deploy.

## 11) Quick reference
| Thing | Value |
|---|---|
| Live repo | `AdvisoryMonks/advisorymonks-site` (branch `main`, files at root) |
| Working repo | `AdvisoryMonksConsulting/Taste-Skill` (branch `claude/elegant-brown-Ke0Qz`) |
| CF Pages project (live) | `advisorymonks-site` |
| Notion Website Insights | `d289b088-73c4-4915-9c68-04f077f5571b` |
| Notion Posts (social) | `fc1b2bca-54f8-4ae5-86d5-8c2c0ffde26e` |
| GitHub secret | `NOTION_TOKEN` (in live repo) |
| Domains | advisorymonks.io (new/live), advisorymonks.com (old/authority) |
| Theme | Chambers — navy/gold; `chambers.css` loaded last on all 26 pages |
