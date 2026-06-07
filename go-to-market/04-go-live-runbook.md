# 🚀 Go-Live Runbook — Veska

> ## ⏰ TOMORROW — DO FIRST
> **BUY THE DOMAIN: `veskadesign.com`** (Namecheap / Cloudflare Registrar / Porkbun)
> Then grab matching handles `@veskastudio` (since `@veskadesign` is taken) and add an inbox `hello@veskadesign.com`.
> _(No scheduler available in this tool — set a phone reminder too.)_

Brand: **Veska** · domain **veskadesign.com** · billing entity **Advisory Monks Consulting**.
The domain is already baked into the codebase (`src/lib/site.ts`, sample SEO URLs).

---

## Step 1 — Domain & brand (tomorrow)
- [ ] Buy `veskadesign.com`
- [ ] Confirm trademark is clear for "Veska" in design classes (IP India / USPTO)
- [ ] Secure social handles: `@veskastudio` (Instagram/X/LinkedIn) — check on namecheckr.com
- [ ] Create real inbox: `hello@veskadesign.com` (Google Workspace)

## Step 2 — Deploy the site (Cloudflare Pages — free, static)
The repo already builds a static site (`output: 'export'` → `out/`).
- [ ] Push repo to GitHub (this branch) or connect repo in Cloudflare
- [ ] Cloudflare → Pages → Create project → connect repo
      - Build command: `pnpm build` · Output dir: `out`
- [ ] Add custom domain `veskadesign.com` in Pages → DNS auto-configured
- [ ] (Alt: drag the `out/` folder into Cloudflare Pages "Direct Upload")

## Step 3 — Fill the live integrations (`src/lib/site.ts`)
- [ ] `calLink` → your Cal.com event link
- [ ] `formspree` → your Formspree form id (contact form)
- [ ] `razorpayButtonId` → Razorpay Dashboard → Payment Button (`pl_xxx`)
- [ ] `wiseLink` / `paypalLink` → optional global payment options
- [ ] Replace placeholder testimonials with real ones as you land clients

## Step 4 — Razorpay activation
- [ ] Submit site for Razorpay activation (Terms/Privacy/Refund/Contact pages are already live — required)

## Step 5 — Cold-email infrastructure (separate from brand domain)
- [ ] Buy 1–2 **sending** domains (e.g. `getveskadesign.com`, `veskadesign.co`) — never send from `veskadesign.com` itself
- [ ] 3–4 inboxes per sending domain; set SPF + DKIM + DMARC
- [ ] Verify on mail-tester.com (aim 10/10)
- [ ] Warm up 3–4 weeks in Instantly (start ~20/day)

## Step 6 — Launch outreach (after warmup)
- [ ] Pick a vertical (recommend: med spa / dental beachhead — see `03-outreach-campaigns.md`)
- [ ] Apollo search → run `tools/site-finder` on domains → keep worst PageSpeed
- [ ] Enrich only the worst (lead credits) → emails
- [ ] Spec-demo the hottest → set `{{preview_link}}`
- [ ] Load into Instantly, assign sending inboxes, activate

---

### Status snapshot
- ✅ Website built (homepage, 10 designs, /start payments, /contact, legal pages) — Stripe-grade, navy `#061C33`
- ✅ Outreach campaigns drafted (`03-outreach-campaigns.md`)
- ✅ Apollo ICPs validated (ad-spenders 3k; dental 16k; law 78k; real estate 120k)
- ✅ site-finder lead tool (`tools/site-finder`)
- ⏳ Waiting on: domain purchase → deploy → email warmup → launch
