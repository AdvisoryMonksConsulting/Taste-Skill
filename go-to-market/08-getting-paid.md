# Getting Paid — SOP (no legal recourse needed)

For international clients where courts/collections aren't practical. The principle: **never hand over the asset before payment.** You hold the live site + code as leverage.

## The golden rule
Build and preview on **your** infrastructure. Release to the client's domain + repo **only after final payment clears.**

## Standard flow
1. **Deposit (50%)** before any work — qualifies the client, filters flakes.
2. Build on a **password-protected preview** (`client.veskademos.com` behind Cloudflare Access). Never on their domain.
3. Client approves on the preview (or via Loom walkthrough).
4. **Final payment clears** → then, and only then:
   - point the site to the client's domain,
   - transfer the repo,
   - grant deploy access.

## Risk controls
- **Tier the deposit by trust/corridor:** new or higher-risk client / first project → 70–100% upfront. Repeat clients → 50/50.
- **Milestones for large jobs:** 40% start / 30% design sign-off / 30% delivery — exposure is never the full amount.
- **Gate the preview:** Cloudflare Access password or Loom-only; don't share a public, copy-able URL pre-payment.
- **Prefer bank rails (Wise/Payoneer) for big sums** — no chargebacks. Cards can be reversed; if used, keep signed scope + delivery proof and wait for **cleared**, not pending.
- **Escrow** (Escrow.com / Upwork) for cautious first or large engagements.

## Remove excuses not to pay
- Invoice carries **multiple instant rails** (Razorpay link + Wise + PayPal).
- **Auto-reminders** in Zoho Books.
- **Retainers auto-charge** (saved card / Razorpay subscription).

## Contract (clarity, not litigation)
Terms already state: deliverables, source, and deploy access transfer on **full payment**. That's the anchor + chargeback evidence — no court required.
