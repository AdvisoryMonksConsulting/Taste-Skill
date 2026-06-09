# HANDOFF — Veska (read this first)

Onboarding doc for a new Claude Code session. Read this top-to-bottom; it captures the project,
current state, environment quirks, and the exact next actions.

---

## 1. What this is
**Veska** — a productized web-design studio (brand of **Advisory Monks Consulting**, an India CA/advisory firm).
We design/build/launch premium landing pages & websites for global clients (fixed price, 5-day delivery).
This repo holds **(a)** the live Veska marketing site (Next.js static) and **(b)** a full go-to-market engine
(cold-outreach campaigns, lead tooling, market intel) under `go-to-market/`.

- **Brand color:** navy `#061C33` (from the AdvisoryMonks brand PDF, Pantone 296 C).
- **Live site:** `https://veskadesign.com` (deployed on **Cloudflare Pages**, manual upload).
- **Repo branch:** `claude/blissful-cray-JDjsG` (develop + push here; do NOT push to main).

## 2. Repo map
- `src/app/` — site routes: `/` (home), `/about`, `/start` (deposit), `/contact`, `/terms` `/privacy` `/refund`, `/work/[slug]` (10 design samples), `/demos/sample`.
- `src/lib/site.ts` — **single config** for all integrations (Cal/Formspree/Razorpay/email).
- `src/components/chrome.tsx` — shared nav/footer + `Logo` ("Powered by Advisory Monks Consulting").
- `templates/landing-page/` — `designs.tsx` (10 portfolio designs), `samples.ts` (sample data), `content.ts` + `sections/` (the reusable template), `opengraph-image.tsx`.
- `tools/site-finder/` — Python (stdlib) PageSpeed lead-ranker.
- `go-to-market/01`–`12` — offer/pricing, cold-email seq, campaigns, go-live runbook, invoice template, market intel, scope, getting-paid SOP, deploy+DNS, launch playbook, target allocation, **outstanding-items (current TODO)**.

## 3. Build / deploy (important quirks)
- Stack: **Next 16, React 19, Tailwind v4, pnpm**, `output: 'export'` → static site in `out/`.
- **pnpm build-script gate:** already fixed via `pnpm approve-builds --all` (sharp/unrs-resolver). If a fresh clone errors on `pnpm install`, run that.
- Build: `pnpm build`. Typecheck: `npx tsc --noEmit`.
- **Deploy = manual:** zip `out/` → Cloudflare → Workers & Pages → `veskadesign` → **Upload assets** → drag unzipped folder. (User declined GitHub auto-deploy for now.)
- After any site change: `pnpm build` → zip `out/` → send user the zip to upload.

## 4. Environment quirks (sandbox)
- **Network is restricted:** can't fetch external sites (403 / "Host not in allowlist") and **whois/DNS lookups are blocked**. **WebSearch works**; Apollo/Instantly/GitHub MCP work.
- **Screenshots/PDF:** Playwright browser pre-installed at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (browser download is blocked — always launch with that `executablePath`). `poppler-utils` installed (pdftoppm/pdfunite/pdftotext).
- To preview the built site: serve `out/` with `python3 -m http.server <port>` (NOT `next start` — incompatible with `output: 'export'`). URLs are `.html` (e.g. `/work/forge.html`).

## 5. Integrations (live values in `src/lib/site.ts`)
- `calLink`: `https://cal.com/shamik/cal.com-shamik-15min` (works)
- `formspree`: `https://formspree.io/f/xykawwpr` (works)
- `razorpayButtonId`: `pl_Sz5Rm27yGXHHh8` (renders; **shows INR** — Razorpay KYC + foreign-currency pending for USD)
- `wiseLink` / `paypalLink`: still placeholders (Wise USD approval in progress)
- `email`: `hello@veskadesign.com` — **inbox not created yet**

## 6. Cold-outreach infrastructure
- **Sending domains (separate from brand domain):** `getveskadesign.com`, `tryveskadesign.com` (GoDaddy reg, GoDaddy DNS). Each has Google Workspace inboxes: `hello@ shamik@ akash@ design@`.
- **Instantly:** **6 of 8** inboxes connected (all 4 getveskadesign + design@/akash@ tryveskadesign). The 2 left: `hello@` + `shamik@tryveskadesign.com` (Google rate-limited — reconnect later, then add to campaign).
- **Instantly campaign (PAUSED):** id `d8b5e012-ca81-496c-ae25-5941565e1740` — "Veska — Med Spa (Batch 1)". 4-step **safe** sequence (only `{{firstName}}`/`{{companyName}}`, no custom fields = no broken-variable risk), **link-free** (link goes in the reply), **unsubscribe header on**, stop-on-reply, no open/click tracking, Mon–Fri 09:00–16:00. **Timezone still America/Chicago — needs setting to the batch's target region.**
- **mail-tester:** last score 7/10 — failing **only SPF** because each sending domain has **duplicate SPF + duplicate DMARC** records (GoDaddy auto-added its own). Fix in `go-to-market/12-outstanding-items.md` (delete the `*_spfm*` SPF and the `onsecureserver.net` DMARC on both domains; keep the `_spf.google.com` SPF + the `p=none` DMARC). Re-test → expect ~9–10.

## 7. Apollo (lead data)
- Account: Shamik Ukil, ~**1,813 lead credits**. **Searches are free; enrichment spends credits.**
- Validated ICP = owner-led businesses on website-builder stacks (Wix/Squarespace/WordPress). Segments: ad-spenders, high-LTV local (med spa/dental/law/RE), SaaS founders. Pools confirmed (thousands+ each).
- **Target plan:** `go-to-market/11-target-allocation.md` — 1,000 prospects, timezone-friendly geos (UK/IE, US-East, SG/SEA, Africa, EU-English, Gulf; **skip US-West/Australia/Canada**), weighted by conversion probability.
- **Enrichment + import is HELD** (spend) until ~1 week before warmup completes.

## 8. ▶️ NEXT ACTIONS (in order) — the live thread
1. **User:** fix SPF/DMARC duplicates on both sending domains (see `12-outstanding-items.md`) → re-test mail-tester to **≥9** on each.
2. **User:** reconnect the 2 remaining inboxes → tell agent → **agent** adds them to campaign `email_list` (→ 8).
3. **User:** inbox identity (display name/photo/signature) + **redirect** sending domains → `veskadesign.com`.
4. **Agent (on request):** set campaign **timezone** (ask user: batch 1 = US or UK med spas) + set `{{companyName}}` fallback.
5. **User:** start **warmup** on all 8 (only after step 1 green) → run 3–4 weeks.
6. **Then:** Apollo search → `site-finder` → enrich worst (spend, confirm) → import → set per-lead nothing-needed → **launch** campaign.
7. **Parallel/parked:** create `hello@veskadesign.com` + DNS; Wise USD link; Razorpay KYC.

## 9. Guardrails / decisions to preserve
- **Never launch/send** the campaign or **enrich** (spend) without explicit user go-ahead; gated on warmup.
- **Payment-before-handover** is the model (preview on our infra → final payment → release domain+code). See `08-getting-paid.md`.
- **Uniform USD pricing** ($4,950 / $11,500 / retainer / Custom). **Skip Canada** (CASL). **India SMBs = Phase 2, separate sub-brand** (don't dilute premium Veska).
- **Honesty:** testimonials are anonymized *samples* (not fake named people); don't copy other studios' designs into the portfolio (IP).
- **Compliance:** unsubscribe + physical address in every cold email.
- Don't rebrand from Veska (live + invested; sending domains warming).

## 10. MCP tools available
Apollo (`apollo_*` — search free, `apollo_organizations_bulk_enrich` costs credits + needs confirmation), Instantly (`*` — `create_campaign` is 2-step: discover senders, then assign; campaign creation may be safety-gated), GitHub, Cloudflare, others. Load deferred tools via ToolSearch.
