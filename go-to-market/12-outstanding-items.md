# Outstanding Items — close before launch

Status snapshot of every open item with exact steps. Critical path first.

## 🔴 CRITICAL PATH — email deliverability → warmup (do in order)

### 1. Fix SPF on BOTH sending domains (the current −3 on mail-tester)
For `getveskadesign.com` **and** `tryveskadesign.com`, in their DNS (GoDaddy or Cloudflare — wherever the nameservers point):
1. Open DNS records.
2. Find every TXT starting with `v=spf1`. There must be **exactly ONE** per domain.
3. **None?** Add TXT → Name `@` → `v=spf1 include:_spf.google.com ~all`.
4. **Wrong/typo?** Edit it to exactly that value.
5. **Two or more?** Delete the extras (multiple SPF records = automatic fail).
6. Save, TTL 1 hr, wait ~30 min.

### 2. Re-test mail-tester (each domain)
- mail-tester.com → copy its address → from an inbox **on that domain**, send a normal email (real subject + 2–3 sentences) → check score.
- Target **≥ 9/10 with SPF green**. Do it for both domains.

### 3. Connect the last 2 inboxes
- After Google's rate-limit cools off (few hours): reconnect `hello@tryveskadesign.com` + `shamik@tryveskadesign.com` in Instantly (OAuth).
- Tell me → I'll add them to the campaign's sender list (currently 6 → 8).

### 4. Inbox identity (warmup credibility) — all 8
- In Instantly (and Google profile): set **display name** ("Shamik Ukil" / "Akash Ukil") + a **profile photo**.
- Set a **signature**: `Shamik Ukil — Veska, a brand of Advisory Monks Consulting · veskadesign.com`

### 5. Redirect the sending domains → main site
- `getveskadesign.com` and `tryveskadesign.com` → forward root to `https://veskadesign.com` (GoDaddy: Forwarding · Cloudflare: redirect rule). Prevents dead-domain look on link clicks.

### 6. Campaign settings (tell me and I'll set via API)
- **Timezone:** currently US Central default — set to the batch's target region (e.g. US-East for US med spas) so emails land in the prospect's morning.
- **`{{companyName}}` fallback:** in Instantly campaign → variable settings → set fallback "your business" (so a blank never shows).

### 7. Start warmup (ONLY after step 2 is green)
- Instantly → enable **Warmup** on all 8 → start ~20/day, ramp. Let it run **3–4 weeks**. Keep unsubscribe ON.

## 🟡 BRAND EMAIL — `hello@veskadesign.com` (separate from sending domains)
So Formspree replies + real client email work:
1. Google Workspace → add/verify `veskadesign.com` → create `hello@veskadesign.com`.
2. In Cloudflare DNS add: MX `@` → `smtp.google.com` (pri 1) · SPF TXT `@` `v=spf1 include:_spf.google.com ~all` · DKIM (`google._domainkey`, value from Admin) · DMARC TXT `_dmarc` `v=DMARC1; p=none; rua=mailto:dmarc@veskadesign.com`.

## ⏸️ PARKED — external approvals (not blocking; revisit when ready)
- **Wise** USD receiving → when live, send me the link → I wire "Pay with Wise" on `/start`.
- **Razorpay KYC + foreign-currency** → when active, the deposit button collects (USD needs the foreign-currency feature). Meanwhile: invoice / Wise.

## ⏳ HELD BY DESIGN — lead enrichment & import
Do ~1 week before warmup finishes: Apollo search → site-finder (worst PageSpeed) → enrich only those (spend) → import to campaign. Don't enrich now (data ages + premature spend).

## ✅ DONE (reference)
Live site on `veskadesign.com` (About, booking, contact, deposit, legal, 10 designs) · Cal.com + Formspree wired · Razorpay button wired · campaign created & paused (safe `{{firstName}}`/`{{companyName}}` sequence, unsubscribe header on) · 6/8 inboxes connected · Tier-1 lists + allocation + all go-to-market docs.

---

## ✅ Progress update
- **SPF/DMARC fixed → mail-tester 10/10 on both domains.** (Removed GoDaddy duplicate SPF + DMARC.)
- **Campaign:** renamed "Med Spa UK (Batch 1)", timezone Europe/Belgrade (~UK 9–4), copy tuned to "aesthetics clinics" (UK term). Still PAUSED, 6 inboxes.
- **Batch 1 list (queued, no spend):** UK/IE aesthetics on builders — `q_organization_keyword_tags`: med spa, medical aesthetics, aesthetics clinic, skin clinic, cosmetic clinic · titles Owner/Founder/Medical Director/Clinic Director · `currently_using_any` wix/squarespace/wordpress_org · UK+IE. (~139 pure med-spa; broaden keywords for ~200.)
- **Remaining (user toggles):** connect last 2 inboxes → start WARMUP (gate now clear) → identity/signatures → redirect domains. Enrichment+import held until ~1 wk pre-launch.

## ✅ Progress update 2
- **3 campaigns built & PAUSED** (same safe format, 6 inboxes): Med Spa UK (Batch 1) `d8b5e012`, Ad-spenders (Batch 2) `9addd62b`, SaaS (Batch 3) `dc3d9d31`.
- **`hello@veskadesign.com`** email set on veskadesign.com (full Google MX + SPF + DKIM + DMARC). Finish DKIM: Admin → Apps → Gmail → Authenticate email → veskadesign.com → Start authentication.
- **ICP client demos** live: /demos/lumiere (aesthetics), /serene (med spa), /bright-smile (dental). **Sales kit:** `13-sales-kit.md`.
- Remaining: Razorpay KYC · 2 stuck inboxes (Google lockout) · warmup ~3 wks · then enrich+import+launch.
