# Target Allocation — first 1,000 prospects (timezone-friendly)

Weighted by conversion probability **and** India-friendly call hours. Source via Apollo (search-only),
rank with `tools/site-finder`, enrich the worst, then load to Instantly.

## Call-hours rule (the enabler)
Set **Cal.com availability to ~11:00 am – 9:30 pm IST**. It then only offers slots that suit you — so you can
target these regions and never take an odd-hour call. Excluded: **US West/Central, Australia, Canada.**

| Region | Their morning = IST | Fit |
|---|---|---|
| Singapore/SEA · UAE/Gulf | ~late morning–early afternoon IST | ⭐ perfect |
| Africa (NG/KE/ZA) · EU-English · UK/IE | early–late afternoon IST | ✅ great |
| US **East** (mornings only) | 7:30–10:30 pm IST | ✅ evening, workable |

## The 1,000 — allocation + validated pool size
| Geo | Prospects | Segment focus | Apollo pool (validated) |
|---|---|---|---|
| **UK + Ireland** | 220 | High-LTV local (dental/aesthetics/law) + SaaS | 1,737 |
| **US East Coast** | 200 | Ad-spenders + SaaS | 3,064 (US-wide → filter East-coast states) |
| **Singapore + SEA** | 160 | SaaS + ad-spenders | 4,626 |
| **Africa (NG/KE/ZA)** | 150 | Owner-led / funded on builders | 29,882 |
| **EU-English (NL/SE/DE/DK)** | 140 | SaaS + ad-spenders | 24,974 |
| **UAE / Gulf** | 130 | High-LTV clinics + SMB | 616 |
| **Total** | **1,000** | ~35% ad-spenders · 35% high-LTV · 30% SaaS | |

Every pool comfortably exceeds its allocation (smallest, UAE/Gulf 616, easily covers 130 — broaden keywords if needed).

## Apollo recipes per geo (reproduce, then enrich the shortlist)
All: `organization_num_employees_ranges` = `1,10 / 11,20 / 21,50`; exclude already-modern with `currently_not_using_any` = `react, next_js, webflow`.

- **UK+IE — high-LTV:** titles `Owner, Founder, Managing Partner, Medical Director` · `currently_using_any` `wix, squarespace, wordpress_org` · keywords `med spa, aesthetics, dental, law firm` · locations `United Kingdom, Ireland`
- **US East — ad-spenders:** titles `Founder, Owner, CEO` · `currently_using_all` `facebook_pixel` + any builder · location `United States` (then narrow to East-coast states: NY, NJ, MA, PA, FL, GA, NC, VA, CT…)
- **Singapore+SEA — SaaS:** titles `Founder, Co-Founder, CEO, Head of Growth` · any builder · keywords `SaaS, software` · locations `Singapore, Malaysia, Indonesia, Philippines`
- **Africa — owner-led:** titles `Founder, Owner, CEO, Co-Founder` · any builder · locations `Nigeria, Kenya, South Africa`
- **EU-English — SaaS:** titles `Founder, Co-Founder, CEO, Head of Growth` · any builder · keywords `SaaS, software` · locations `Netherlands, Sweden, Germany, Denmark`
- **UAE/Gulf — clinics/SMB:** titles `Owner, Founder, Managing Director, CEO` · any builder · keywords `clinic, aesthetics, med spa, dental` · locations `United Arab Emirates, Saudi Arabia`

## Rollout
- 1,000 ≈ one disciplined first batch. At 8 inboxes × ~30/day, that's ~4–5 sending days; spread over 2 weeks with new-contact pacing.
- Sequence per geo so calls land in your window. Start sends mid-morning IST (covers SG/Gulf/Africa/EU/UK same-day; US-East lands their morning).
- Pipeline unchanged: Apollo (this slice) → site-finder (worst PageSpeed) → enrich only those → spec-demo → Instantly.
