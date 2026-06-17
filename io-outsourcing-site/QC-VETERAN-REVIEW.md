# Advisory Monks (.io) — Veteran QC Review
_Reviewed as a 50-year US tax/accounting-outsourcing practitioner. Findings only; no site files changed. Compliance items are flags, not legal advice — have a US tax attorney/CPA confirm them._

## Verdict
The site presents as a 500-client, SOC-2-audited firm but is a two-person, new US practice. Headline stats, testimonials, the security section, blog authors, and several capability claims are fabricated or legally impermissible for a non-credentialed offshore preparer. Most fixes are deletions and honest reframing.

## P0 — Fix before promoting
### Legal (confirm with US counsel)
- **IRC §7216 / SSNs offshore:** no signed taxpayer consent for India processing; unmasked SSNs may not be sent offshore. Build a signed §7216 consent + SSN masking. Criminal (§7216) + civil (§6713) exposure.
- **Paid-preparer / e-file overreach:** "we e-file your return with the IRS" (services/tax-preparation), "IRS e-filing" (index, metas). Requires PTIN + EFIN (EFIN generally not issued to foreign-address firms). Reword to "prepare for review/signature by your licensed US preparer / e-file partner"; name the EFIN holder.
- **IRS representation / audit defense:** terms.html §7, faq.html, pricing "Audit defense (coming soon)", meta "audit support included." Only CPA/EA/attorney may represent (Circular 230 §10.3/§10.7). Remove entirely (even "coming soon"); reword to "help organize documents and work alongside your licensed representative." Strip "audit support included" from metas.
- **Unauthorized practice of law:** services/entity-formation "legally sound Operating Agreements/Bylaws drafted to protect your interests" + entity-selection advice by non-attorneys. Limit to ministerial filing or partner with an attorney; add "not a law firm; not legal advice."
- **No "not a CPA/law firm" disclaimer anywhere:** add standing disclaimer (footer + about + each service page): no US-licensed CPAs/EAs/attorneys on staff; lead with offshore-delivery disclosure.

### Credibility (mostly deletions)
- **Fabricated metrics** (index, pricing, services/tax-preparation, start, free-consultation): `$2.4M+ saved`, `99.8% filing accuracy`, `500+ US businesses`, `48hr`, `4.9★`. Remove all; replace with provable, non-numeric statements.
- **Fake testimonials** (index "Client Stories" — 10 named US execs w/ $ figures; James Rodriguez & Sarah Kim reused with DIFFERENT quotes on start/free-consultation). Remove until real & consented.
- **False security/compliance claims** in visible copy AND FAQ_SCHEMA JSON-LD on every page: "SOC 2 compliant," "256-bit AES on AWS S3," "bank-grade," "QuickBooks ProAdvisor / Xero Certified," portal "AES-256." Remove unless held (name auditor/report).
- **Fake blog authors** (resources/* + ARTICLE_META + BlogPosting schema): "Priya Nair," "Arjun Mehta," "Vikram Shah" — not real. Re-attribute to Shamik/Akash Ukil or "Advisory Monks Team."
- **Credential overreach that survived earlier cleanup:** "US tax-certified professionals," "US-certified accountants" (about/index), "US tax specialists" (faq), "Big-4 Quality / trained at top-tier firms" (index). Reword to "experienced in US GAAP and US federal/state tax."
- **Pricing 3–5x too high for offshore:** Foundations $2,500 / Command $5,000 / Enterprise $10,000 /mo — above the Bench/Pilot ($299–$699) comps cited on the same page; the offshore COST advantage (the whole wedge) is priced away. Re-anchor materially lower or justify with real credentials.
- **"vs Local CPA Firm" comparison table (pricing.html):** firm has no CPAs; equivalence/superiority claim is misleading + risky. Delete the CPA column or reframe vs in-house / DIY software / freelancers.

## P1 — Important
- **Who prepares/signs returns + PTIN model:** state it (white-label for a CPA who signs, or name the PTIN signer).
- **E&O / professional liability insurance:** unmentioned; table stakes — state carrier/coverage or obtain it.
- **Replace guarantees:** "accuracy guarantee," "guaranteed accuracy," "4-business-hour response Guarantee," plan SLAs — define remedy or downgrade to targets ("we aim to reply within one business day").
- **Real data-security facts:** tie to the actual Zoho stack; drop the AWS/AES fiction; document FTC Safeguards Rule (WISP/MFA) and IRS Pub. 4557 plan.
- **Positioning / ICP:** generic "warmth" hero; lead with the genuine edge — India–US corridor (foreign founders running US C-corps; FBAR/FATCA/5471/5472/DTAA) where offshore is an advantage.
- **Buyer-objection handling:** dedicated section on data security, who signs, IRS exposure, US-hours coverage.
- **Internal contradictions:** EST (free-consultation) vs IST (contact) hours; "SC" avatar on Akash's card; testimonial crediting founder Akash; Calendly-vs-cal.com leftover scaffolding; 48hr vs 3–5 day onboarding; "50+ states" (only 50+DC); "0 late payroll runs in 3 years" vs "new US practice"; areaServed claims UK/CA/AU/SG/EU.

## P2 — Polish
- Replace "warmth, transparency, precision" boilerplate with checkable facts.
- Add 1–2 anonymized case studies + one sample deliverable (redacted P&L / board deck).
- Ship real team photos (currently initials fallback).
- Update the outdated pre-2014 Circular 230 footer legend.

## Note
No fake client-logo bar or invented awards are actually rendered (CSS exists, markup not populated) — nothing to remove there.
