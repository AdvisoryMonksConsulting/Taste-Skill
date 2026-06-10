# Domain consolidation — advisorymonks.com vs .io

_Decision: consolidate on **advisorymonks.com** (aged authority) and serve the
new, richer site there. Below: the head-to-head, the URL redirect map (the
critical asset), and the execution steps._

## Current state (verified via Webflow API, June 2026)
- **advisorymonks.com** = live **Webflow** site "Advisory Monks Live" (created
  2021; content published 2023; home re-published 2026-05-27). Apex + www are
  Webflow custom domains. **It currently 301-redirects every visit to `.io`**, so
  its own pages never render — wasting the aged authority.
- **advisorymonks.io** = the new hand-coded static site on Cloudflare Pages
  (project `advisorymonks-site`). Richer/broader content but ~3 weeks old, barely
  indexed.

## .com content inventory (the authority we must preserve)
Core pages: `/` , `/services`, `/about`, `/contact`, `/insights`,
`/privacy-policy`, `/terms-and-conditions`, `/refund-and-cancellation-policy`.

**Services CMS — 6 live pages at `/services/<slug>`:**
`corporate-tax-advisory-and-compliance-services`,
`corporate-law-and-secretarial-support`, `fundraising-services`,
`india-entry-strategy-and-transfer-pricing`, `merger-and-acquisitions`,
`virtual-cfo-services`.

**Blogs CMS — 14 live posts at `/blog/<slug>`** (startup/finance topics, 2023).

## Recommended target
Serve the **new site** (13 practices, insights, guides, tools) on **`.com`**, and
301 every old `.com` URL to its closest new page. Keep `.io` as a permanent
301 → `.com`. Net effect: one canonical authoritative domain, best content,
zero equity lost.

## URL redirect map (301) — old .com → new page
> Confirm the 3 marked `?` choices; rest are direct.

| Old .com URL | New target |
|---|---|
| `/services/corporate-tax-advisory-and-compliance-services` | `/practices/founders-tax-desk` `?` (alt: cross-border-tax / global-accounting) |
| `/services/corporate-law-and-secretarial-support` | `/practices/startup-legal` |
| `/services/fundraising-services` | `/practices/vc-advisory` `?` (alt: incubator) |
| `/services/india-entry-strategy-and-transfer-pricing` | `/practices/india-entry` |
| `/services/merger-and-acquisitions` | `/practices/ma-advisory` |
| `/services/virtual-cfo-services` | `/practices/virtual-cfo` |
| `/services` | `/practices` |
| `/blog/angel-tax` | `/insights/` (angel-tax / Rule 11UA article) `?` |
| `/blog/virtual-cfo-services-startups` | `/practices/virtual-cfo` |
| `/blog/*` (other 12) | `/insights` (hub) |
| `/about` | `/team` |
| `/contact` | `/#contact` |
| `/insights` | `/insights` |
| `/privacy-policy` | `/privacy` |
| `/terms-and-conditions` | `/terms` |
| `/refund-and-cancellation-policy` | `/terms` |

These become 301 rules in the Cloudflare Pages `_redirects` file on the new site.

## Execution steps (high level)
1. **Stop the current `.com → .io` redirect** (it's the bounce killing authority).
2. **Move `.com` to the new site's host:** add `advisorymonks.com` + `www` as
   custom domains on the Cloudflare Pages project `advisorymonks-site`; update DNS
   (apex + www) to point at Cloudflare Pages instead of Webflow.
3. **Swap canonicals/sitemap/schema** on the new site from `.io` → `.com`
   (clean find-replace; delivered as files for review — no content change).
4. **Add the `_redirects` map above** (old `.com` URLs → new) + `.io/* → .com/*`.
5. **Search Console:** add the `.com` property, submit the new sitemap; keep the
   `.io` property and (optionally) file Change of Address `.io → .com`.
6. Decommission/park the Webflow site once `.com` serves the new site cleanly.

## What I need from you to proceed
- **Confirm the 3 `?` mappings** above (or accept defaults).
- **DNS access:** where the `advisorymonks.com` domain's DNS is managed
  (registrar / Cloudflare / Webflow-managed) — needed to repoint apex + www.
- A go-ahead; then I deliver the rewritten canonical/sitemap/schema files and the
  full `_redirects`, plus click-by-click dashboard steps.

## Note on the design refresh
The "Ink & Brass on White" `chambers.css` redesign applies to the new site, so it
ships **with** this consolidation — once `.com` serves the new site, the new look
is live on the authoritative domain in one move.
