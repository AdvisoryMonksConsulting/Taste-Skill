# Go-live: serve the new site on advisorymonks.com

Everything in the deploy bundle already points to **www.advisorymonks.com**
(canonicals, sitemap, RSS, schema, robots, analytics) and includes the new
**Ink & Brass** design plus the legacy `_redirects` map. Emails
(`@advisorymonks.io`) and the `foundermath.advisorymonks.io` tool are left
untouched on purpose.

Order matters. Do them top to bottom.

## A. Upload the new site files (Cloudflare Pages repo)
1. Unzip `advisorymonks-com-DEPLOY.zip`.
2. In `AdvisoryMonks/advisorymonks-site` (GitHub), upload **all** files,
   replacing existing ones (Add file → Upload files → drag the unzipped
   contents → Commit to `main`). Key changed files: every `.html`,
   `chambers.css`, `_redirects`, `sitemap.xml`, `rss.xml`, `robots.txt`.
3. Cloudflare Pages auto-deploys (~1 min). The `.io` site now shows the new look;
   `.com` not yet attached — that's the next part.

## B. Move advisorymonks.com DNS from GoDaddy to Cloudflare
(Apex domains on Cloudflare Pages need Cloudflare to manage the domain's DNS.)
1. **Cloudflare dashboard → Add a site →** type `advisorymonks.com` → Free plan.
2. Cloudflare scans existing records. It will show two **Cloudflare nameservers**
   (e.g. `xxx.ns.cloudflare.com`). Copy both.
3. **GoDaddy → My Products → advisorymonks.com → DNS → Nameservers → Change →
   "I'll use my own nameservers"** → paste the two Cloudflare nameservers → Save.
4. Wait for Cloudflare to show the domain **Active** (mins–24 h; usually fast).
   _The Webflow site keeps working during this wait; nothing breaks yet._

## C. Attach .com to the Pages project
1. **Cloudflare → Workers & Pages → `advisorymonks-site` → Custom domains →
   Set up a custom domain →** add `www.advisorymonks.com` → follow prompts
   (Cloudflare auto-creates the CNAME since it now controls DNS).
2. Add `advisorymonks.com` (apex) the same way.
3. Wait for both to show **Active / certificate issued**.
   → Now `https://www.advisorymonks.com` serves the new site, and the apex +
   `.io` redirects in `_redirects` take effect.

## D. Decommission the old Webflow redirect
1. **Webflow → Advisory Monks Live → Site settings → Publishing.** Remove
   `advisorymonks.com` + `www` as custom domains (they're served by Cloudflare
   now), and delete any `/* → advisorymonks.io` 301 redirect rule.
   _This kills the old "instant bounce to .io" for good._

## E. Search Console + analytics
1. **Search Console →** add property `https://www.advisorymonks.com` (verify via
   the Cloudflare DNS TXT record). Submit `https://www.advisorymonks.com/sitemap.xml`.
2. Keep the `.io` property; optionally **Settings → Change of Address → .io → .com**.
3. **Plausible →** add site `advisorymonks.com` (the page now reports to that
   domain). Web Analytics in Cloudflare can also be re-pointed to `.com`.

## F. Verify (after C completes)
- `https://www.advisorymonks.com/` → new Ink & Brass site loads.
- `https://advisorymonks.com/` → redirects to `www`.
- `https://www.advisorymonks.io/` → redirects to `.com`.
- `https://www.advisorymonks.com/services/merger-and-acquisitions` →
  301 → `/practices/ma-advisory`. Spot-check a couple more from `_redirects`.
- Hard-refresh (Ctrl/Cmd-Shift-R) to clear cached CSS.

## Rollback
- Revert nameservers at GoDaddy to the previous (Webflow) values, or re-add the
  `.com` custom domains in Webflow. DNS changes propagate back within the TTL.

---
### Legacy redirect map (in `_redirects`)
| Old .com URL | → New |
|---|---|
| /services/corporate-tax-advisory-and-compliance-services | /practices/virtual-cfo |
| /services/corporate-law-and-secretarial-support | /practices/startup-legal |
| /services/fundraising-services | /practices/startup-legal |
| /services/india-entry-strategy-and-transfer-pricing | /practices/india-entry |
| /services/merger-and-acquisitions | /practices/ma-advisory |
| /services/virtual-cfo-services | /practices/virtual-cfo |
| /services | /practices |
| /blog/angel-tax | /insights/income-tax-act-2025 |
| /blog/virtual-cfo-services-startups | /practices/virtual-cfo |
| /blog/* | /insights |
| /about | /team · /contact | /#contact |
| /privacy-policy | /privacy · /terms-and-conditions | /terms |
| /refund-and-cancellation-policy | /terms |
