# Outreach Campaigns — ready to launch

Two tailored cold-email campaigns for the validated ICPs, built with the `cold-email` skill.
**Status:** drafts — do not load/send until your new sending domains are warmed (see setup below).

> Honesty rule: only claim "I rebuilt your hero / your site loads slowly" when it's true for that lead.
> Use the `tools/site-finder` PageSpeed score per lead, and only the spec-demo play on leads you actually rebuilt.

---

## Sending setup (do this first — your current blocker)
Run this outreach on **separate domains**, never your primary or your AdvisoryMonks warmed set.
1. Buy 1–2 sending domains (e.g. `getveska.com`, `veska-studio.com`) — keep your brand domain for real email.
2. Create **3–4 inboxes per domain** (e.g. shamik@, hello@, studio@, design@).
3. DNS on each: **SPF + DKIM + DMARC** (verify on mail-tester.com → aim 10/10).
4. **Warm up 3–4 weeks** in Instantly (start ~20/day, ramp).
5. Then load leads, cap ~30/day/inbox, send 9am–4pm in the prospect's timezone.

---

## Campaign A — "Ad-spenders leaking spend" (ICP #1, ~3,019)
**Who:** Founders/owners (1–50 staff) running Meta ads **and** on Wix/Squarespace/WordPress.
**Edge:** they pay for traffic that hits a slow page → direct ROI argument.
**Merge vars:** `{{firstName}}`, `{{companyName}}`, `{{pagespeed}}` (from site-finder), `{{preview_link}}` (your rebuilt hero).
**Cadence:** 4 emails, ~4 days apart · stop-on-reply · no open/click tracking.

**1 · subject:** `{{companyName}}'s ad spend`
```
Hi {{firstName}},

You're running paid ads to {{companyName}}'s site — but it's on a builder
template that scores {{pagespeed}}/100 on mobile. Every slow second drops the
conversion you already paid for.

I rebuilt your hero as a faster version so you can see the difference:
{{preview_link}}

Worth sending the full rebuild?
```

**2 · subject:** `re: ad spend`
```
{{firstName}} — quick math: a 1% lift in conversion makes every ad dollar go
further. We build fast, conversion-focused landing pages in 5 days, flat fee,
and you own the code. Want the rebuilt version of your page?
```

**3 · subject:** `the leak`
```
A page that loads slow still loses the click you paid for. The rebuild I did for
{{companyName}} targets one thing — turning paid traffic into signups. Want a look?
```

**4 · subject:** `closing the loop`
```
I'll stop here, {{firstName}}. If improving the page moves up your list, reply and
I'll send the rebuild. If someone else runs growth at {{companyName}}, a name would
help. Either way — good luck.
```

---

## Campaign B — "High-LTV local" (ICP #3: med spa / dental / law / real estate)
**Who:** Owner/principal of a high-LTV local business on a builder site.
**Edge:** one new client repays the page many times over; owner is the decision-maker.
**Per-vertical noun** `{{client}}`: med spa/dental → "patient" · law → "client" · real estate → "buyer".
**Merge vars:** `{{firstName}}`, `{{companyName}}`, `{{client}}`, `{{vertical}}`, `{{preview_link}}`.

**1 · subject:** `{{companyName}}'s website`
```
Hi {{firstName}},

Your website is where a new {{client}} decides whether to reach out — and right
now it's on a template that doesn't match the quality of your work.

I redesigned your homepage hero (free) so you can see a more premium first
impression: {{preview_link}}

Want the full version?
```

**2 · subject:** `one new {{client}}`
```
{{firstName}} — one new {{client}} likely covers a new site many times over.
We build premium, conversion-focused sites in 5 days for a flat fee. Happy to
send the free mockup of your hero — just say the word.
```

**3 · subject:** `first impressions`
```
For {{vertical}}, the website is the first impression — and a dated one quietly
sends people to a competitor. The redesign I did for {{companyName}} fixes exactly
that. Want to see it?
```

**4 · subject:** `closing the loop`
```
I'll stop cluttering your inbox, {{firstName}}. If a refreshed site ever climbs the
list, reply and I'll pick it up. Either way, wishing {{companyName}} a great quarter.
```

---

## Apollo filter recipes (save these in the Apollo UI)
- **#1 Ad-spenders:** titles Founder/Owner/CEO · size 1–50 · US · `currently_using_all`: `facebook_pixel` · `currently_using_any`: `wix, squarespace, wordpress_org, weebly, godaddy_website_builder`
- **#3 High-LTV local:** titles Owner/Founder/(Dentist|Managing Partner|Broker) · size 1–50 · US · `currently_using_any`: `wix, squarespace, wordpress_org` · `q_organization_keyword_tags`: per vertical (`dental` · `law firm, attorney` · `real estate, realty` · `med spa, aesthetics`)
- Optional exclude already-modern: `currently_not_using_any`: `react, next_js, webflow`

## Launch checklist
- [ ] New sending domains warmed (3–4 wks)
- [ ] Refine Apollo search → run `find_stale_sites.py` on domains → keep worst scores
- [ ] Enrich only the worst (lead credits) → emails
- [ ] Spec-demo the hottest → set `{{preview_link}}`
- [ ] Load into Instantly campaign, assign new inboxes, activate
