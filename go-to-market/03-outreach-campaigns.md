# Outreach Campaigns — ready to launch

Tailored cold-email campaigns for the validated ICPs (built with the `cold-email` skill).
**Status:** drafts — do not load/send until your new sending domains are warmed.

> Honesty rule: only claim "I rebuilt your hero / your site is slow" when it's true for that lead
> (use `tools/site-finder` per lead, and the spec-demo play only on leads you actually rebuilt).

## Launch order (Tier 1 → Tier 3)
1. **Tier 1 (start here):** US · UK · Singapore · EU-English — high WTP + cold-email-friendly.
2. **Tier 2:** Australia · Africa (funded/exporters only).
3. **Tier 3:** India (funded startups & GCCs).
- **Skip: Canada** (CASL opt-in, $10M fines) — pursue via LinkedIn/referrals only.
- **India SMBs:** Phase 2, separate sub-brand/lane — keep off the premium Veska funnel.

## Compliance — unsubscribe in EVERY email (required)
Enable Instantly's unsubscribe and use the `{{unsubscribeLink}}` merge tag. Every email below ends with:
```
—
Not relevant? Unsubscribe: {{unsubscribeLink}}  (or just reply "stop").
```
Plus: real sender identity, a physical mailing address in the footer, honest subject lines.

## Sending setup (do first)
Run outreach on **separate** domains (e.g. `getveskadesign.com`), never `veskadesign.com` or your AdvisoryMonks set.
3–4 inboxes/domain · SPF + DKIM + DMARC · mail-tester 10/10 · 3–4 week warmup · ~30/day/inbox · 9am–4pm prospect time.

---

## Campaign A — "Ad-spenders leaking spend" (ICP #1, ~3,019)
**Who:** Founders/owners (1–50) running Meta ads **and** on Wix/Squarespace/WordPress.
**Vars:** `{{firstName}}`, `{{companyName}}`, `{{pagespeed}}` (site-finder), `{{preview_link}}`.
Cadence: 4 emails, ~4 days apart · stop-on-reply · no open/click tracking.

**1 · `{{companyName}}'s ad spend`**
```
Hi {{firstName}},

You're running paid ads to {{companyName}}'s site — but it's on a builder template
that scores {{pagespeed}}/100 on mobile. Every slow second drops the conversion you
already paid for. I rebuilt your hero faster: {{preview_link}}

Worth sending the full rebuild?
—
Not relevant? Unsubscribe: {{unsubscribeLink}}  (or just reply "stop").
```

**2 · `re: ad spend`**
```
{{firstName}} — quick math: a 1% lift in conversion makes every ad dollar go further.
We build fast, conversion-focused landing pages in 5 days, flat fee, you own the code.
Want the rebuilt version of your page?
—
Not relevant? Unsubscribe: {{unsubscribeLink}}  (or just reply "stop").
```

**3 · `the leak`**
```
A page that loads slow still loses the click you paid for. The rebuild I did for
{{companyName}} targets one thing — turning paid traffic into signups. Want a look?
—
Not relevant? Unsubscribe: {{unsubscribeLink}}  (or just reply "stop").
```

**4 · `closing the loop`**
```
I'll stop here, {{firstName}}. If improving the page moves up your list, reply and I'll
send the rebuild. If someone else runs growth at {{companyName}}, a name would help.
—
Not relevant? Unsubscribe: {{unsubscribeLink}}  (or just reply "stop").
```

---

## Campaign B — "High-LTV local" (ICP #3: med spa / dental / law / real estate)
**Who:** Owner/principal of a high-LTV local business on a builder site.
**Per-vertical noun** `{{client}}`: med spa/dental → "patient" · law → "client" · real estate → "buyer".
**Vars:** `{{firstName}}`, `{{companyName}}`, `{{client}}`, `{{vertical}}`, `{{preview_link}}`.

**1 · `{{companyName}}'s website`**
```
Hi {{firstName}},

Your website is where a new {{client}} decides whether to reach out — and right now it's
on a template that doesn't match the quality of your work. I redesigned your homepage hero
(free) so you can see a more premium first impression: {{preview_link}}

Want the full version?
—
Not relevant? Unsubscribe: {{unsubscribeLink}}  (or just reply "stop").
```

**2 · `one new {{client}}`**
```
{{firstName}} — one new {{client}} likely covers a new site many times over. We build
premium, conversion-focused sites in 5 days for a flat fee. Happy to send the free mockup
of your hero — just say the word.
—
Not relevant? Unsubscribe: {{unsubscribeLink}}  (or just reply "stop").
```

**3 · `first impressions`**
```
For {{vertical}}, the website is the first impression — and a dated one quietly sends people
to a competitor. The redesign I did for {{companyName}} fixes exactly that. Want to see it?
—
Not relevant? Unsubscribe: {{unsubscribeLink}}  (or just reply "stop").
```

**4 · `closing the loop`**
```
I'll stop cluttering your inbox, {{firstName}}. If a refreshed site ever climbs the list,
reply and I'll pick it up. Either way, wishing {{companyName}} a great quarter.
—
Not relevant? Unsubscribe: {{unsubscribeLink}}  (or just reply "stop").
```

---

## Apollo filter recipes (save in the Apollo UI)
- **#1 Ad-spenders:** Founder/Owner/CEO · 1–50 · target geo · `currently_using_all`: `facebook_pixel` · `currently_using_any`: `wix, squarespace, wordpress_org, weebly, godaddy_website_builder`
- **#3 High-LTV local:** Owner/Founder/(Dentist|Managing Partner|Broker) · 1–50 · `currently_using_any`: `wix, squarespace, wordpress_org` · `q_organization_keyword_tags` per vertical (`dental` · `law firm, attorney` · `real estate, realty` · `med spa, aesthetics`)
- Geo by tier: Tier 1 `United States, United Kingdom, Singapore, Ireland, Netherlands` → Tier 2 `Australia` + African hubs → Tier 3 `India` (funded).
- Exclude already-modern: `currently_not_using_any`: `react, next_js, webflow`.

## Launch checklist
- [ ] Sending domains warmed (3–4 wks) · unsubscribe enabled in Instantly
- [ ] Apollo search (Tier 1 first) → `find_stale_sites.py` → keep worst scores
- [ ] Enrich only the worst → emails · spec-demo the hottest → set `{{preview_link}}`
- [ ] Load into Instantly, assign inboxes, activate
