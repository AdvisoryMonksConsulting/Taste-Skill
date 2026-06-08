# Deploy & DNS Runbook

Everything to take `veskadesign.com` live tomorrow. Fill the `[ ]` placeholders after you buy the domain.

## A. Deploy the website → Cloudflare Pages (free, static)
The repo builds a static site (`output: 'export'` → `out/`).
1. Push this repo to GitHub (already on branch `claude/blissful-cray-JDjsG`).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo/branch.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)** (or "None")
   - Build command: `pnpm build`
   - Build output directory: `out`
4. Deploy → you get `veska-xxxx.pages.dev`. Verify it loads.
5. **Custom domain:** Pages → Custom domains → add `veskadesign.com` and `www`. If the domain's nameservers are on Cloudflare, DNS records are created automatically. (Alternative: drag the `out/` folder into Pages "Direct Upload".)

## B. Email DNS for `veskadesign.com` (Google Workspace — your inboxes are Google)
Add these DNS records (Cloudflare DNS):
- **MX:** `@` → `1 smtp.google.com` (Google's single-MX) — proxy OFF.
- **SPF (TXT @):** `v=spf1 include:_spf.google.com ~all`
- **DKIM (TXT):** generate in Google Admin → Apps → Gmail → Authenticate email → copy the `google._domainkey` TXT value → add it.
- **DMARC (TXT `_dmarc`):** `v=DMARC1; p=none; rua=mailto:dmarc@veskadesign.com; adkim=r; aspf=r; pct=100`
  (start `p=none`, monitor 2–4 wks, then move to `p=quarantine`).
- Create inbox: `hello@veskadesign.com`.

## C. Sending domains for cold email (separate — protect the brand domain)
Buy 1–2: e.g. `getveskadesign.com`, `veskadesign.co`. For EACH, on its own DNS:
- **MX / SPF / DKIM:** same pattern as above (Google Workspace or whatever inbox provider).
- **DMARC (TXT `_dmarc`):** `v=DMARC1; p=none; rua=mailto:dmarc@<sendingdomain>` 
- Create **3–4 inboxes** per domain (shamik@, hello@, studio@, design@).
- **Redirect** the sending domain's root to `veskadesign.com` (so clicks resolve to the real site).
- Connect inboxes to **Instantly** → enable **warmup** (start ~20/day, ramp 3–4 weeks) → enable **unsubscribe**.
- Verify deliverability on **mail-tester.com** (target 10/10) and check blacklists on MXToolbox.

## D. Preview infra (for the "pay before handover" SOP)
- Create a wildcard/subdomain like `*.veskademos.com` (or use `client.veskadesign.com`) for client previews.
- Protect previews with **Cloudflare Access** (email-gated) so only the client sees them pre-payment.

## E. Fill site integrations (`src/lib/site.ts`)
- `calLink` (Cal.com), `formspree` (form id), `razorpayButtonId` (pl_xxx), `wiseLink`, `paypalLink`, `email`.

## Go-live checklist
- [ ] Domain bought · handles `@veskastudio` secured
- [ ] Cloudflare Pages deployed · custom domain attached · HTTPS green
- [ ] Google Workspace + MX/SPF/DKIM/DMARC on `veskadesign.com` · `hello@` inbox
- [ ] Sending domain(s) + inboxes + SPF/DKIM/DMARC + Instantly warmup started
- [ ] `site.ts` integrations filled · Razorpay activation submitted
- [ ] Preview infra (Cloudflare Access) ready
