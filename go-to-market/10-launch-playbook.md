# Launch Playbook — cold outreach

The operational runbook for going from warmed inboxes → booked calls → deposits. Everything here is
prepped and reversible; the **irreversible/gated steps are flagged at the bottom**.

## ✅ Go / No-Go criteria (all must be true before sending a single campaign email)
- **mail-tester ≥ 8/10** on each sending domain (SPF + DKIM pass; DMARC `p=none` is fine).
- **8 inboxes connected to Instantly**, **warmup running ≥ 3 weeks**, warmup score ~90+.
- **Unsubscribe enabled** in Instantly; sending domains **redirect → veskadesign.com**.
- Lead list **cleaned via `tools/site-finder`**; spec-demos built for the hottest leads.

## Ramp schedule (per inbox)
| Phase | Days | Per inbox/day |
|---|---|---|
| Warmup only (no campaigns) | Weeks 0–3 | warmup 20 → 40 |
| Campaign start | Week 4 | 10–15 |
| Ramp | +1 week each | +5/week → 30–40 |
- 8 inboxes × ~30/day = **~240 sends/day** at steady state.
- **Guardrails:** keep bounce < 3% (pause a domain if > 5%), spam complaints < 0.1%. Send Tue–Thu, 9am–4pm prospect timezone, stop-on-reply ON.

## Lead pipeline (repeat weekly)
Apollo (Tier-1 recipe) → export company domains → **`site-finder`** (rank worst PageSpeed) →
**enrich only the worst** in Apollo (lead credits) → **spec-demo** the hottest → set `{{preview_link}}` →
load into Instantly → send the tailored sequence (`03-outreach-campaigns.md`).

## Tier-1 lists — queued (search-only; counts at launch)
| List | Geo | Reachable count |
|---|---|---|
| Ad-spenders on builder sites (Meta pixel + Wix/Squarespace/WP) | US · UK · SG · IE · NL | **3,994** |
| Med spas / aesthetics on builders | US · UK | **974** |
| SaaS founders on builders | US · UK · SG | **74,374** |

Filter recipes are in `03-outreach-campaigns.md`. Start with **med spas (sharp ROI, owner-reachable)** and **ad-spenders** (the page-speed hook is undeniable), then scale into SaaS.

## Reply handling (templates)
- **"Send it / yes"** → reply with the spec-demo link + Cal.com booking link.
- **Books a call** → run the call → send proposal + **deposit invoice** → deposit clears → start.
- **Objection (price/timing/owner)** → short, honest reply; offer the free hero rebuild as a no-risk next step.
- **"Stop"/unsubscribe** → remove immediately (Instantly auto-handles `{{unsubscribeLink}}`).

## Booking → cash (per `08-getting-paid.md`)
Call → proposal + 50% deposit invoice (Razorpay/Wise/invoice) → **deposit clears → build on password-gated preview** → client approves → **balance clears → release domain + code.** No payment, no handover.

---

## ⏸️ ON HOLD — irreversible or gated (do NOT do early)
- **Sending campaign emails** — gated on warmup (3–4 wks) + mail-tester 8+. *Irreversible:* can't unsend; premature sends burn the domains and the leads.
- **Apollo enrichment** — spends lead credits; do **only on the cleaned, site-finder-ranked shortlist**, right before sending.
- **Tightening DMARC to `p=quarantine`/`reject`** — only after 2–4 weeks monitoring `rua` reports.
- **USD payment rails (Wise/Razorpay foreign currency)** — external approval in progress; parked.
- **Starting Instantly warmup** — flip ON only after mail-tester ≥ 8 on both domains.

## Everything else is done ✅
Site live (About, booking, contact, deposit, legal, 10 designs) · campaigns + sequences drafted with unsubscribe · ICPs validated · site-finder tool · invoice template · getting-paid SOP · market intelligence · Tier-1 lists queued.
