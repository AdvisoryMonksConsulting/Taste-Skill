#!/usr/bin/env python3
"""
find_stale_sites.py — Rank prospect websites by how badly they need a redesign.

Feed it a list of prospect URLs. It calls the free Google PageSpeed Insights API,
pulls mobile performance / SEO / accessibility / best-practices scores plus LCP and
CLS, then ranks WORST-FIRST — because a slow, dated site = a hot lead for a redesign
studio. Outputs a CSV you can drop straight into Instantly, with a ready-to-send
cold-email opener referencing the site's actual numbers.

Pairs with: go-to-market/02-cold-email-sequence.md (the spec-demo play) + Apollo (emails).

Usage:
    python3 find_stale_sites.py --input urls.txt --output leads.csv
    python3 find_stale_sites.py --input urls.txt --output leads.csv --key $PSI_API_KEY

Input file: one URL per line, OR "Company Name,https://url" per line. Blank lines and
lines starting with # are ignored.

Notes:
  * Stdlib only — no pip installs.
  * A PSI API key is optional but recommended (avoids tight rate limits). Get one free:
    https://developers.google.com/speed/docs/insights/v5/get-started  (or set PSI_API_KEY)
  * This calls googleapis.com — run it on your own machine (some sandboxes block it).
"""
import argparse
import csv
import json
import os
import sys
import time
import urllib.parse
import urllib.request

PSI = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"


def parse_input(path):
    rows = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "," in line:
                name, url = line.split(",", 1)
                name, url = name.strip(), url.strip()
            else:
                url = line
                name = urllib.parse.urlparse(url if "://" in url else "http://" + url).netloc or url
            if "://" not in url:
                url = "https://" + url
            rows.append((name, url))
    return rows


def run_psi(url, key, strategy, timeout):
    params = [("url", url), ("strategy", strategy)]
    for cat in ("performance", "seo", "accessibility", "best-practices"):
        params.append(("category", cat))
    if key:
        params.append(("key", key))
    full = PSI + "?" + urllib.parse.urlencode(params)
    with urllib.request.urlopen(full, timeout=timeout) as resp:
        return json.load(resp)


def pct(score):
    return None if score is None else round(score * 100)


def analyze(data):
    lh = data.get("lighthouseResult", {})
    cats = lh.get("categories", {})
    audits = lh.get("audits", {})

    def cat_score(name):
        c = cats.get(name)
        return pct(c.get("score")) if c else None

    lcp_ms = audits.get("largest-contentful-paint", {}).get("numericValue")
    cls = audits.get("cumulative-layout-shift", {}).get("numericValue")
    return {
        "perf": cat_score("performance"),
        "seo": cat_score("seo"),
        "a11y": cat_score("accessibility"),
        "best_practices": cat_score("best-practices"),
        "lcp_s": round(lcp_ms / 1000, 1) if lcp_ms is not None else None,
        "cls": round(cls, 3) if cls is not None else None,
    }


def lead_tier(perf):
    if perf is None:
        return "UNKNOWN"
    if perf < 40:
        return "HOT"      # slow/dated — best redesign lead
    if perf < 60:
        return "WARM"
    return "COLD"         # already decent — deprioritize


def opener(name, m):
    perf, lcp = m["perf"], m["lcp_s"]
    bits = []
    if perf is not None:
        bits.append(f"scores {perf}/100 on mobile")
    if lcp is not None:
        bits.append(f"takes {lcp}s to load")
    detail = " and ".join(bits) if bits else "has some speed issues"
    return (f"Your site {detail} on mobile — that's costing you signups. "
            f"I rebuilt your hero to show what a faster version looks like: [link]")


def main():
    ap = argparse.ArgumentParser(description="Rank prospect sites by redesign-need (worst first).")
    ap.add_argument("--input", required=True, help="URLs file (one per line, or 'Name,url').")
    ap.add_argument("--output", default="leads.csv", help="Output CSV path.")
    ap.add_argument("--key", default=os.environ.get("PSI_API_KEY", ""), help="PageSpeed API key (or PSI_API_KEY env).")
    ap.add_argument("--strategy", default="mobile", choices=["mobile", "desktop"])
    ap.add_argument("--sleep", type=float, default=1.0, help="Seconds between calls (rate-limit friendliness).")
    ap.add_argument("--timeout", type=float, default=60.0)
    ap.add_argument("--limit", type=int, default=0, help="Max URLs to process (0 = all).")
    args = ap.parse_args()

    rows = parse_input(args.input)
    if args.limit:
        rows = rows[: args.limit]
    if not rows:
        print("No URLs found in input.", file=sys.stderr)
        sys.exit(1)

    results = []
    for i, (name, url) in enumerate(rows, 1):
        print(f"[{i}/{len(rows)}] {url} ...", file=sys.stderr)
        try:
            data = run_psi(url, args.key, args.strategy, args.timeout)
            m = analyze(data)
            results.append({"name": name, "url": url, "tier": lead_tier(m["perf"]), "opener": opener(name, m), **m})
        except Exception as e:  # noqa: BLE001 - keep going on any single-URL failure
            print(f"    ! {type(e).__name__}: {e}", file=sys.stderr)
            results.append({"name": name, "url": url, "perf": None, "seo": None, "a11y": None,
                            "best_practices": None, "lcp_s": None, "cls": None, "tier": "ERROR", "opener": ""})
        time.sleep(args.sleep)

    # Worst performance first (best leads on top); errors/unknowns last.
    results.sort(key=lambda r: (r["perf"] is None, r["perf"] if r["perf"] is not None else 999))

    cols = ["name", "url", "perf", "lcp_s", "cls", "seo", "a11y", "best_practices", "tier", "opener"]
    with open(args.output, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=cols)
        w.writeheader()
        for r in results:
            w.writerow({k: r.get(k, "") for k in cols})

    hot = sum(1 for r in results if r["tier"] == "HOT")
    warm = sum(1 for r in results if r["tier"] == "WARM")
    print(f"\nDone → {args.output}  |  HOT: {hot}  WARM: {warm}  total: {len(results)}", file=sys.stderr)


if __name__ == "__main__":
    main()
