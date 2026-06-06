#!/usr/bin/env python3
"""Add SEO schema (Breadcrumb + Service/ProfessionalService + FAQPage) and
optimize titles/meta on the 13 practice pages. Idempotent (marker-guarded)."""
import re, json, glob, os, html

SITE = "https://www.advisorymonks.io"
MARK = "AMC-SEO-SCHEMA"

# Optimized title + meta description per practice slug
SEO = {
 "cross-border-tax": ("Cross-Border Tax & Structuring · DTAA, FEMA, 15CA/CB | Advisory Monks",
   "Cross-border tax for founders, NRIs & foreign companies — DTAA across 90+ treaties, Form 15CA/15CB, ODI, PFIC & GILTI and Section 195 TDS. Partner-led."),
 "flip-structuring": ("Flip Structuring · Delaware, Singapore, GIFT City, UAE | Advisory Monks",
   "Take your Indian startup offshore the right way — jurisdiction selection, FEMA/ODI, IP migration and post-flip transition in a post-GAAR world."),
 "founders-tax-desk": ("Founders Tax Desk · ESOP, Capital Gains, Trusts | Advisory Monks",
   "Personal tax for founders & UHNIs — ESOP/RSU exercise planning, exit capital gains, HUF & private trusts, cross-border holdings and estate planning."),
 "gcc-india": ("GCC India Advisory · Set Up & Run a Capability Centre | Advisory Monks",
   "End-to-end GCC setup in India — entity, transfer pricing, FEMA, payroll & ESOPs, multi-state GST, Virtual CFO and audit coordination."),
 "global-accounting": ("Global Accounting & Tax Preparation · US, UK, UAE | Advisory Monks",
   "Monthly close, management reporting and partner-signed tax prep for businesses worldwide — US, UK, Singapore, UAE and DTAA jurisdictions."),
 "incubator": ("Incubator Desk · Section 8, Grants, SHA Templates | Advisory Monks",
   "For institutional incubators — Section 8 equity frameworks, grant utilisation certification, SHA/investment templates and embedded counsel."),
 "india-entry": ("India Entry for Foreign Companies · Subsidiary, FDI, GST | Advisory Monks",
   "Set up in India end-to-end — entity setup, FDI/FEMA, GST, transfer pricing, MCA filings and labour law for foreign companies."),
 "ma-advisory": ("M&A Advisory · Due Diligence, Rule 11UA Valuation, NCLT | Advisory Monks",
   "Buy- and sell-side M&A — due diligence, Rule 11UA valuation, SPA drafting, NCLT schemes, CCI clearance and FC-TRS across deal types."),
 "pravasi-desk": ("Pravasi Desk for NRIs · Form 13, TDS, Repatriation | Advisory Monks",
   "For NRIs & the diaspora — Form 13 lower-deduction certificates on property sales, RNOR optimisation, USD 1M repatriation, DTAA/FTC and NRI returns."),
 "startup-legal": ("Startup Legal & Fundraising · DPIIT, ESOP, SHA, 11UA | Advisory Monks",
   "For founders raising their first round — incorporation, DPIIT & 80-IAC, ESOP design, cap tables, SHA drafting and Rule 11UA valuations."),
 "valuation-advisory": ("Valuation Advisory · Rule 11UA, DCF, IBBI Reports | Advisory Monks",
   "Credentialed valuations — Rule 11UA/11UAA, ESOP Black-Scholes, DCF, IBC/NCLT, Ind AS 113, fairness opinions and PPA by IBBI Registered Valuers."),
 "vc-advisory": ("VC & Investor Advisory · Diligence, Agreements, Exits | Advisory Monks",
   "For VCs, family offices & institutional investors — legal/financial due diligence, investor-side agreements, CP/CS tracking and exit documentation."),
 "virtual-cfo": ("Virtual CFO Services · MIS, Cash Flow, Board Packs | Advisory Monks",
   "Fractional senior finance — MIS, 13-week cash flow, compliance calendar, financial modelling, board packs and investor-ready financials."),
}

ORG = {
  "@type": "ProfessionalService",
  "name": "Advisory Monks Consulting",
  "url": SITE + "/",
  "image": SITE + "/logo.png",
  "logo": SITE + "/logo.png",
  "telephone": "+91-85951-16297",
  "email": "shamik@advisorymonks.io",
  "priceRange": "₹₹₹",
  "address": {"@type": "PostalAddress", "addressLocality": "Noida",
              "addressRegion": "Uttar Pradesh", "addressCountry": "IN"},
  "areaServed": ["IN", "US", "GB", "SG", "AE"],
  "sameAs": ["https://www.linkedin.com/company/advisory-monks-consulting/"],
}

def strip_tags(s):
    return html.unescape(re.sub(r"<[^>]+>", "", s)).strip()

def process(path):
    slug = os.path.basename(path)[:-5]
    src = open(path, encoding="utf-8").read()
    if MARK in src:
        # already processed — refresh title/meta only
        pass
    seo = SEO.get(slug)
    h1 = strip_tags((re.search(r"<h1[^>]*>(.*?)</h1>", src, re.S) or [None, slug])[1])
    canon = (re.search(r'<link rel="canonical" href="([^"]+)"', src) or [None, f"{SITE}/practices/{slug}"])[1]

    # 1) title + meta
    if seo:
        title, desc = seo
        src = re.sub(r"<title>.*?</title>", f"<title>{html.escape(title)}</title>", src, count=1, flags=re.S)
        src = re.sub(r'(<meta name="description" content=")[^"]*(">)', lambda m: m.group(1)+html.escape(desc)+m.group(2), src, count=1)
        src = re.sub(r'(<meta property="og:title" content=")[^"]*(">)', lambda m: m.group(1)+html.escape(title)+m.group(2), src, count=1)
        src = re.sub(r'(<meta property="og:description" content=")[^"]*(">)', lambda m: m.group(1)+html.escape(desc)+m.group(2), src, count=1)
        src = re.sub(r'(<meta name="twitter:title" content=")[^"]*(">)', lambda m: m.group(1)+html.escape(title)+m.group(2), src, count=1)
        src = re.sub(r'(<meta name="twitter:description" content=")[^"]*(">)', lambda m: m.group(1)+html.escape(desc)+m.group(2), src, count=1)

    # remove any previously-injected schema block so this script is re-runnable
    src = re.sub(r'<script type="application/ld\+json">/\*' + MARK + r'\*/.*?</script>\n?', '', src, flags=re.S)

    # Schema: BreadcrumbList + Service (with ProfessionalService provider).
    # NOTE: FAQPage intentionally omitted — Google restricted FAQ rich results to
    # gov/health sites (Aug 2023), so it adds no value and flags as invalid.
    name = strip_tags(h1).rstrip(".")
    graph = [
        {"@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
            {"@type": "ListItem", "position": 2, "name": "Practices", "item": SITE + "/#practices"},
            {"@type": "ListItem", "position": 3, "name": name, "item": canon},
        ]},
        {"@type": "Service", "name": name,
         "serviceType": name, "provider": ORG,
         "areaServed": ORG["areaServed"], "url": canon},
    ]

    ld = {"@context": "https://schema.org", "@graph": graph}
    block = f'<script type="application/ld+json">/*{MARK}*/\n{json.dumps(ld, ensure_ascii=False, indent=0)}\n</script>\n'
    src = src.replace("</head>", block + "</head>", 1)
    open(path, "w", encoding="utf-8").write(src)
    return "schema+meta (Breadcrumb+Service)"

for f in sorted(glob.glob("practices/*.html")):
    print(f"{os.path.basename(f):28} -> {process(f)}")
