# Site Finder — rank prospects by redesign-need

Finds the **hottest redesign leads** in a list of websites: it scores each site's mobile
PageSpeed (performance, SEO, accessibility, best-practices) plus LCP and CLS, then ranks
**worst-first**. A slow, dated site = a business with budget that visibly needs you.

Outputs a CSV ready for Instantly, including a **cold-email opener** that quotes the site's
actual numbers — the highest-reply hook there is ("your site scores 28/100 on mobile…").

## Quick start

```bash
# optional but recommended — free key avoids rate limits:
export PSI_API_KEY="your_key"   # https://developers.google.com/speed/docs/insights/v5/get-started

python3 find_stale_sites.py --input urls.txt --output leads.csv
```

Input (`urls.txt`): one per line — `https://site.com` or `Company Name,https://site.com`.

Output (`leads.csv`) columns:
`name, url, perf, lcp_s, cls, seo, a11y, best_practices, tier, opener`
- **tier**: `HOT` (perf < 40), `WARM` (40–59), `COLD` (≥60), sorted worst-first.
- **opener**: paste into your Instantly Email 1 (the spec-demo play in
  `go-to-market/02-cold-email-sequence.md`).

## Where this fits the pipeline

1. **Source** prospects (Google dorks for stale `© 2017` footers, BuiltWith old-stack
   filters by industry + country TLD, niche+city searches).
2. **Score** them → `find_stale_sites.py` → ranked `leads.csv`.
3. **Rebuild** the HOT ones' hero with `/templates/landing-page` (2 hrs) → Vercel/CF link.
4. **Find emails** (Apollo) and load into **Instantly** with the `opener` + demo link.
5. Send (warmed domain). Worst sites + a real demo = best replies.

## Notes
- Stdlib only — no installs. Python 3.8+.
- Calls `googleapis.com`; run on your own machine (some sandboxes block it).
- Flags: `--strategy desktop`, `--limit N`, `--sleep 1.0`, `--timeout 60`.
