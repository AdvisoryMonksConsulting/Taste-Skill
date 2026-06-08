# Cold Email Sequence — for Apollo + Instantly

> Built with the `cold-email` skill. Plain text only. One ask per email. Each follow-up has a new angle.
> **ICP:** Founders / Heads of Growth at funded B2B SaaS startups (seed–Series A) with a weak or dated landing page.
> **Trigger to personalize on:** recent funding, hiring for growth/marketing, or a visibly underperforming page.
> **Goal of email 1:** a one-word reply ("yes"/"send it"), *not* a 30-min meeting.

---

## The "spec demo" play (do this first)
Before sending, **rebuild their current landing page hero** (2–3 hrs with `/templates/landing-page`). Deploy it to a Vercel preview link. The email then offers something real, not a pitch. Reply rates on "I already did the work" outreach are dramatically higher.

---

## Deliverability checklist (set up once, in Instantly)
- [ ] Send from a **secondary domain** (e.g. `mail.yourstudio.com`), not your primary.
- [ ] SPF + DKIM + DMARC passing (verify on mail-tester.com).
- [ ] 4–6 week domain warmup; start ~20/day, ramp slowly.
- [ ] Cap ~30–50/day per inbox; verify the list to keep bounce < 5%.
- [ ] Plain text, real signature, simple opt-out line.
- [ ] **Unsubscribe link in EVERY email** — enable Instantly unsubscribe + `{{unsubscribeLink}}`. Append to every email:
  `— Not relevant? Unsubscribe: {{unsubscribeLink}} (or reply "stop").` Include a physical mailing address in the footer.

> Note: this is the original generic sequence. The current, tailored, tier-ordered campaigns (with unsubscribe baked into every email) live in `03-outreach-campaigns.md` — use those.

---

## Cadence

| Email | Day | Angle |
|---|---|---|
| 1 | Day 1 | The spec demo (lead with their world) |
| 2 | Day 4 | Speed + price (remove the agency objection) |
| 3 | Day 9 | Proof / mini case study |
| 4 | Day 16 | A different pain (conversion, not looks) |
| 5 | Day 25 | Reverse ask (referral to right person) |
| 6 | Day 35 | Breakup |

---

## Email 1 — Day 1 · the spec demo
**Subject variants:** `your landing page` · `quick one re: {{company}}` · `redid your hero`

```
Hi {{first_name}},

Saw {{company}} raised your seed round — congrats. Went to the site and
the hero wasn't doing the product justice, so I rebuilt it:

{{preview_link}}

I run a tiny studio that ships Stripe-grade landing pages in 5 days, flat price.
Worth me sending the full Figma + a live version of the whole page?

{{your_name}}
```
*Why it works: opener is about them + a real trigger; the value (a rebuilt hero) is already delivered; one low-friction ask.*

---

## Email 2 — Day 4 · speed + price
**Subject:** `re: your landing page`

```
{{first_name}} — one thing that usually matters to founders:

Most agencies quote 3–4 weeks and an open-ended invoice for a landing page.
I do it in 5 business days for a flat $4,950, and you own the Next.js repo.

Want the live rebuild of your page? Just say "send it."
```

---

## Email 3 — Day 9 · proof
**Subject:** `the {{company}} version`

```
Quick proof point, {{first_name}}:

Last page I shipped took a seed-stage SaaS from a bounce-heavy template to a
custom, conversion-built page in a week — they used it for their launch.

I've got the same kind of rebuild ready for {{company}}. Want to see it?
```
*(Swap in your first real result once you have one. Until then, keep it about the process/outcome, not a fake metric.)*

---

## Email 4 — Day 16 · different pain
**Subject:** `not just looks`

```
{{first_name}} — landing pages aren't really a design problem, they're a
conversion problem. Pretty pages that don't sell are expensive.

The rebuild I did for {{company}} is built around one job: turn visitors
into signups. Happy to walk you through the thinking — want the link?
```

---

## Email 5 — Day 25 · reverse ask
**Subject:** `wrong person?`

```
{{first_name}}, I might be aiming this at the wrong inbox.

Who owns the website / growth at {{company}}? If it's not you, a name would
save us both time and I'll take it off your plate.
```

---

## Email 6 — Day 35 · breakup
**Subject:** `closing the loop`

```
I'll stop cluttering your inbox after this one, {{first_name}}.

If the landing page ever moves up the priority list, just reply here and
I'll pick it up — the rebuild link stays live either way.

Either way, good luck with the launch.
{{your_name}}
```

---

## Apollo → Instantly workflow
1. **Apollo:** build a list — Title (Founder, CEO, Head of Growth/Marketing), Industry (Software), Headcount 11–200, recently funded. Export verified emails.
2. **Instantly:** load the list, paste this sequence, map `{{first_name}}`, `{{company}}`, `{{preview_link}}`, `{{your_name}}`.
3. Add `{{preview_link}}` as a custom variable per lead (the spec-demo Vercel URL). Tier-1 prospects get a real rebuild; broader segments can point to a generic portfolio link.
4. Start at ~30/day, watch reply + bounce, scale the winners.

> Tip: the spec-demo column is the whole game. Even 10 personalized rebuilds/week will outperform 500 generic sends.
