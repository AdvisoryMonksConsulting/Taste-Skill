# HANDOFF — Veska (read this first, top to bottom)

Complete onboarding for a new Claude Code session. Everything needed to continue with no gaps:
state, accounts, infra, IDs, environment quirks, exact next steps, and guardrails.
_Last updated: 2026-06-09._

---

## 1. What this is
**Veska** — a productized web-design studio, a brand of **Advisory Monks Consulting** (an India-based CA/advisory firm; founder **Shamik Ukil**). We design/build/**launch** premium landing pages & websites for global clients — fixed price, 5-day delivery, client owns the code.
This repo = **(a)** the live Veska marketing site (Next.js static) + **(b)** a full go-to-market engine (`go-to-market/`, `tools/`).

- **Brand:** navy `#061C33` (Pantone 296 C, from the AdvisoryMonks brand PDF). Studio name **Veska**.
- **Live site:** https://veskadesign.com (Cloudflare Pages, **manual zip upload** deploy).
- **Repo branch:** `claude/blissful-cray-JDjsG` — develop & push here. **Do NOT push to main. Don't open a PR unless asked.**

## 2. Accounts (where things live — no passwords here)
| Service | Account / detail |
|---|---|
| Domain registrar | **GoDaddy** — veskadesign.com, getveskadesign.com, tryveskadesign.com |
| DNS + hosting | **Cloudflare** (login `info@advisorymonks.com`) — DNS for veskadesign.com; site on Cloudflare Pages project **`veskadesign`** (Worker `veska-site`). Sending domains' DNS is at **GoDaddy**. |
| Email | **Google Workspace** (Shamik = admin) — hello@veskadesign.com + 8 sending inboxes |
| Cold email | **Instantly** — org id `02d6afd0-4cac-4a4e-aba9-f1939f0fa019` |
| Leads | **Apollo** — user Shamik Ukil (`shamik@uaaca.in`), ~1,813 lead credits |
| Booking | **Cal.com** — `cal.com/shamik` |
| Contact form | **Formspree** — form `xykawwpr` |
| Payments | **Razorpay** (button `pl_Sz5Rm27yGXHHh8`, INR, KYC pending) · **Wise** USD (in progress) · Zoho Books (invoicing) |

## 3. Repo map
- `src/app/` — routes: `/` home · `/about` · `/start` (deposit) · `/contact` · `/terms` `/privacy` `/refund` · `/work/[slug]` (10 portfolio designs) · `/demos/sample` · **`/demos/[slug]`** (client demos: lumiere/serene/bright-smile).
- `src/lib/site.ts` — **single config** for all integrations (cal/formspree/razorpay/email/wise/paypal). Edit here.
- `src/components/chrome.tsx` — shared `SiteNav`/`SiteFooter`/`Logo` ("Powered by Advisory Monks Consulting") + `LegalPage`.
- `src/components/razorpay-button.tsx` — renders the Razorpay Payment Button from `site.razorpayButtonId`.
- `templates/landing-page/` — `designs.tsx` (10 portfolio designs) · `samples.ts` (sample data) · `clinic.tsx` (**client-demo** design + configs) · `content.ts`+`sections/` (reusable template) · `opengraph-image.tsx`.
- `tools/site-finder/` — Python (stdlib) PageSpeed lead-ranker (`find_stale_sites.py`).
- `go-to-market/01`–`13` — see index in §11. **`12-outstanding-items.md` = the live checklist.**

## 4. Build / deploy (quirks)
- Stack: **Next 16, React 19, Tailwind v4, pnpm**, `output: 'export'` → static in `out/`.
- **pnpm build-script gate already fixed** via `pnpm approve-builds --all` (sharp, unrs-resolver). If a fresh clone errors on `pnpm install`, run that.
- Commands: `pnpm build` · `npx tsc --noEmit`.
- **Deploy = MANUAL:** `pnpm build` → zip `out/` → Cloudflare → Workers & Pages → `veskadesign` → **Upload assets** → drag the unzipped folder. (User declined GitHub auto-deploy.) After any site change, build → zip → send the user the zip.

## 5. Environment quirks (sandbox)
- **Network is restricted:** can't fetch external sites (HTTP 403 / "Host not in allowlist"); **whois & DNS lookups are blocked**. **WebSearch works.** Apollo/Instantly/Cloudflare/GitHub MCP work.
- **Playwright** browser pre-installed at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` (downloads blocked — always launch with that `executablePath`). **poppler-utils** installed (pdftoppm/pdfunite/pdftotext).
- To preview the build: serve `out/` with `python3 -m http.server <port>` (NOT `next start` — incompatible with `output:'export'`). URLs are `.html` (e.g. `/work/forge.html`, `/demos/lumiere.html`).

## 6. Integrations — live values (`src/lib/site.ts`)
- `calLink`: `https://cal.com/shamik/cal.com-shamik-15min` ✅ (Cal availability set to ~IST-friendly hours, Asia/Kolkata)
- `formspree`: `https://formspree.io/f/xykawwpr` ✅
- `razorpayButtonId`: `pl_Sz5Rm27yGXHHh8` (renders, **shows INR**; KYC + foreign-currency pending for USD)
- `wiseLink` / `paypalLink`: **placeholders** (hidden on `/start` until real; Wise approval in progress)
- `email`: `hello@veskadesign.com` (Google Workspace; **finish DKIM** — see §8)
- `/start` page: leads with **"Request a USD invoice"**; Razorpay = card; Wise/PayPal auto-hidden while placeholders.

## 7. Cold-outreach infrastructure
- **Sending domains** (separate from brand domain): `getveskadesign.com`, `tryveskadesign.com` (GoDaddy DNS). **mail-tester 10/10 on both** (fixed by deleting GoDaddy's duplicate SPF + DMARC; kept `v=spf1 include:_spf.google.com ~all` + `p=none` DMARC). Roots **redirect → veskadesign.com**.
- **8 inboxes** (Google Workspace): `hello@ shamik@ akash@ design@` on each domain. Names: shamik/hello/design = **Shamik Ukil**; akash = **Akash Ukil**. **Signatures set manually** ("Co-founder, Veska by Advisory Monks Consulting · veskadesign.com") — signatures are per-inbox (apply to all campaigns); **the Instantly API has NO signature field**, so they're UI-only.
- **Instantly:** **6 of 8 inboxes connected + WARMUP STARTED** (warmup running, score climbing from 0; wait ~3–4 wks → 90+). Connected: all 4 `@getveskadesign.com` + `design@`/`akash@tryveskadesign.com`. **NOT connected (2):** `hello@` + `shamik@tryveskadesign.com` — blocked by Google "too many failed attempts" lockout. Reconnect later via **App Password** (not OAuth); the agent can add them via the Instantly `create_account` tool (IMAP `imap.gmail.com:993`, SMTP `smtp.gmail.com:587`, provider 2) if the user supplies the app passwords.

## 8. Instantly campaigns — ALL 3 PAUSED (status 0)
Common to all: 6 sender inboxes, **safe sequence using only `{{firstName}}` + `{{companyName}}`** (no custom fields = no broken-variable risk), **link-free** (the demo link goes in the *reply* when a lead says yes — best for deliverability), unsubscribe in every body, `insert_unsubscribe_header` on (Batch 1), stop-on-reply, no open/click tracking, daily_limit 30, email_gap 12 min, 4 steps × ~4-day gaps, Mon–Fri 09:00–16:00.

| Campaign | ID | Timezone | Notes |
|---|---|---|---|
| **Med Spa UK (Batch 1)** | `d8b5e012-ca81-496c-ae25-5941565e1740` | Europe/Belgrade (~UK) | Copy = UK "aesthetics clinics". Subjects: ideas for {{companyName}}'s site / one new patient / first impressions / closing the loop |
| **Ad-spenders (Batch 2)** | `9addd62b-34c6-46ec-8460-a11fe7793945` | America/Chicago (set per target before launch) | Subjects: ideas for {{companyName}}'s page / your ad spend / the leak / closing the loop |
| **SaaS (Batch 3)** | `dc3d9d31-6a2a-422e-8425-9eeb19d8108d` | America/Chicago | Subjects: ideas for {{companyName}}'s site / looks like the category leader / what it does in 5 words / closing the loop |

Before any launch: add the 2 missing inboxes to `email_list`, set the right timezone, set a `{{companyName}}` fallback (UI), import leads, then launch (explicit user go-ahead).

## 9. Leads / ICP / targeting
- **ICP:** owner-led businesses on **website-builder stacks** (Wix/Squarespace/WordPress/GoDaddy). Segments: **ad-spenders** (Meta pixel + builder), **high-LTV local** (med spa/dental/law/real estate), **SaaS founders**. Decision-maker = Founder/Owner/CEO/Medical Director.
- **Geos (timezone-friendly from India):** UK/IE, US-East (evening IST), Singapore/SEA, Gulf, Africa (funded), EU-English. **Skip US-West, Australia, Canada (CASL).**
- **Target plan:** `11-target-allocation.md` — first **1,000 prospects** weighted by conversion probability, with the exact Apollo recipe per geo. Batch 1 list = UK/IE aesthetics on builders (~139 pure med-spa; broaden keywords for ~200).
- **Apollo:** searches are free; **enrichment spends lead credits** (tool requires a mandatory confirmation message). **ENRICHMENT IS HELD** until ~1 week before warmup matures (avoid stale data + premature spend).

## 10. ▶️ NEXT ACTIONS (in order)
1. **User:** finish DKIM for veskadesign.com → Admin → Apps → Gmail → **Authenticate email → veskadesign.com → Start authentication**.
2. **User:** **Razorpay KYC** (dashboard → Account & Settings → Complete Activation) to enable live collection; optionally request **International + foreign-currency** for USD, then tell agent → confirm `/start`.
3. **User:** when Google lockout clears → connect the **2 inboxes** via App Password → **agent** adds them to all 3 campaigns' `email_list` + user sets their signatures.
4. **⏳ Warmup ~3 weeks** — watch score → **90+**. Do NOT send/enrich yet.
5. **~1 week before warmup matures:** agent runs Apollo (Batch-1 UK aesthetics recipe) → export domains → `site-finder` (worst PageSpeed) → **enrich only those (SPEND — confirm)** → import to Med Spa UK campaign → **launch** (explicit user go-ahead).
6. **Parallel/parked:** Wise USD link → agent wires `/start`; real testimonials to replace the anonymized samples; LinkedIn outreach (user declined for now).

## 11. go-to-market doc index
`01` offer & pricing · `02` cold-email seq (original) · `03` campaigns (tier-ordered, unsubscribe) · `04` go-live runbook · `05` USD invoice template (LUT/FIRA) · `06` market intelligence (regions, uniform-USD verdict, skip Canada, India-SMB phase-2) · `07` scope & services (we launch it; ongoing SEO = retainer/partner) · `08` getting-paid SOP (payment-before-handover) · `09` deploy & DNS · `10` launch playbook · `11` target allocation (1,000) · `12` outstanding-items (**live checklist**) · `13` sales kit (call script, objections, proposal/SOW). Plus `tools/site-finder`.

## 12. Guardrails / decisions (preserve these)
- **Never launch/send a campaign or enrich Apollo (spend) without explicit user go-ahead.** Sending is gated on warmup (90+) and a clean imported list. `reply_to_email` and campaign launch send REAL email.
- **Payment-before-handover** is the model (preview on our infra → final payment → release domain+code). `08-getting-paid.md`.
- **Uniform USD pricing** ($4,950 Launch / $11,500 Site / $6–9k retainer / Custom). **Skip Canada.** **India SMBs = Phase 2 under a separate sub-brand** (don't dilute premium Veska).
- **Honesty:** testimonials are anonymized **samples** (not fabricated named people) — replace with real ones. **Don't copy other studios' designs** into the portfolio (IP).
- **Compliance:** unsubscribe link + physical address in every cold email.
- **Don't rebrand from Veska** (live + invested; domains warming). Don't change model identity in commits/PRs.

## 13. Client-demo workflow (the "yes, send it" asset)
Live demos: `/demos/lumiere` (aesthetics), `/demos/serene` (med spa), `/demos/bright-smile` (dental) — from `templates/landing-page/clinic.tsx` (config-driven, accent via inline styles). **To make a per-prospect demo:** add a config to the `clinics` array (slug/name/vertical/tagline/services/accent) → `pnpm build` → it's live at `/demos/<slug>` → send that link in the reply. The agent generates the content from a one-line brief (can't see the prospect's real site — network-blocked).

## 14. MCP tools
Apollo (`apollo_mixed_people_api_search` free; `apollo_organizations_bulk_enrich` = credits + mandatory confirm), Instantly (`create_campaign` is 2-step: discover senders → assign `email_list`; `update_campaign`; `update_account` has **no signature field**; `reply_to_email` SENDS real email — confirm first), Cloudflare, GitHub. Load deferred tools via **ToolSearch** before calling.
