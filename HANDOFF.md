# Advisory Monks — Website Build · Session Handoff

_Last updated: this session. Use this to continue in a new chat without losing context._

## 1. What this is
A complete **static marketing website** for **Advisory Monks Consulting** (independent, ex‑Big‑4 cross‑border tax / legal / advisory firm, Noida, India). Built as hand‑coded HTML/CSS/JS (no framework, no build step). The repo also contains an unrelated Next.js scaffold — **ignore it**; the real deliverable lives in **`/site`**.

There are **two visual versions** of the same site:
- **Chambers** (the chosen/primary one, committed to `/site`): warm navy `#16243C` + brass‑gold `#A9863F`, fonts **Lora + Instrument Sans + IBM Plex Mono**.
- **Brand** (alt, per the client's 2023 brand book): deep navy `#061C33` + champagne gold `#E0C782`, fonts **Georgia + Inter**, with peak/dot‑grid motifs.

Both are identical HTML; only the theme stylesheet differs.

## 2. Repo / branch / where things live
- Repo: `advisorymonksconsulting/taste-skill`; **work branch: `claude/inspiring-edison-jwcPk`** (push here, never elsewhere).
- **Deployable site:** `/home/user/Taste-Skill/site/` (committed). This is the **Chambers** build.
- **Working source (Chambers):** `/tmp/qc/` — edit here, then sync to `site/`.
- **Brand build:** `/tmp/brandsite/` — regenerated from `/tmp/qc` (copy + swap `chambers.css`→`brand.css`, delete `chambers.css`).
- Git identity used: `user.name="Advisory Monks" user.email="caservices491@gmail.com"`. Commit trailer required: `https://claude.ai/code/session_01HJC6u6KPAzc7psvXjUQPhK`. **Run git from `/home/user/Taste-Skill`** (cwd resets between tool calls).
- Do **not** open a PR unless asked.

## 3. Site structure (26 pages)
```
site/
  index.html                  # homepage (large, self-contained inline <style> + JS)
  practices/practice.css      # base CSS for all sub-pages (header/footer/sections)
  sections.css                # page-view + insights/team/legal styles
  chambers.css                # THEME (loaded last) — tokens + overrides   [Chambers]
  brand.css                   # THEME (alt)                                 [Brand]
  logo.svg / logo-light.svg   # navy logo (light headers) / white logo (dark footers)
  og.png                      # social share image (generated)
  rss.xml sitemap.xml robots.txt humans.txt llms.txt  _headers
  fonts/                      # 8 self-hosted .ttf (Lora x3, InstrumentSans x3, IBMPlexMono x2)
  practices/<13 pages>.html   # india-entry, startup-legal, vc-advisory, cross-border-tax,
                              #   virtual-cfo, ma-advisory, gcc-india, valuation-advisory,
                              #   flip-structuring, founders-tax-desk, pravasi-desk,
                              #   incubator, global-accounting
  insights.html + insights/<4 articles>.html  # incl. pillar: income-tax-act-2025
  guides/<3>.html             # nri-selling-property-in-india, india-entry-for-foreign-companies,
                              #   india-us-cross-border-tax  (SEO corridor landing pages)
  tools/nri-property-tds.html # interactive NRI TDS / Form 13 estimator (inline JS)
  team.html  privacy.html  terms.html
  (mockups/ exists in /tmp/qc only — design explorations, NEVER ship)
```
Client Portal was **removed** (page, nav, footer, sitemap).

## 4. How the theming works (important)
Every page links `practices/practice.css`, (most also `sections.css`), then **`chambers.css` LAST**. `chambers.css` redefines all CSS **custom properties** (`--paper`, `--ink`, `--text-strong`, `--gold`, `--display`, `--body`, `--mono`, etc.) and adds component overrides. So re‑skinning = change the theme file only. Brand = same approach with `brand.css`.
- Fonts are `@font-face` from `fonts/…` (relative). Google Fonts are NOT used (blocked in sandbox + privacy/perf).
- `brand.css` aliases Georgia→`AMSerif`(Lora) and Inter→`AMSans`(Instrument) so it looks right offline; real Georgia is a system font in production.

## 5. Build / regenerate / deploy
**Regenerate Brand from Chambers source:**
```bash
rm -rf /tmp/brandsite && cp -r /tmp/qc /tmp/brandsite
cd /tmp/brandsite && rm -rf mockups chambers.css
python3 -c "import glob
for p in glob.glob('**/*.html',recursive=True):
    t=open(p).read()
    if 'chambers.css' in t: open(p,'w').write(t.replace('chambers.css','brand.css'))"
```
**Sync source → deployable `site/` and commit (run from repo root):**
```bash
cd /home/user/Taste-Skill && rm -rf site && mkdir site
rsync -a --exclude mockups --exclude brand.css /tmp/qc/ site/
git add site/ && git -c user.name="Advisory Monks" -c user.email="caservices491@gmail.com" commit -m "...
https://claude.ai/code/session_01HJC6u6KPAzc7psvXjUQPhK"
git push origin claude/inspiring-edison-jwcPk
```
**Deploy:** Cloudflare Pages, **root directory = `site`**, no build command (static). `_headers` sets security + caching. Clean URLs work automatically on CF Pages.

## 6. The two ZIPs you've been sending the user
- **Production zip** = just zip `site/` (clean external CSS). For deploy.
- **"openable test" zip** (`AdvisoryMonks-TEST-openable.zip`) = a **portable** copy where each page has its CSS **inlined** and logos inlined as SVG, so a single page renders even if opened alone. Built from `site/` with this snippet (inlines linked CSS, fixes font url depth, inlines `logo.svg`/`logo-light.svg`):
  see `/tmp/portable` build step in chat history (python inliner). **Only for local testing; never deploy the inlined one.**
- **Windows gotcha:** the user repeatedly opened files *from inside the zip* (URL shows `…zip.aXX/…`), which extracts one file without siblings → unstyled. Always tell them **Extract All first, then open `index.html`**.

## 7. Local testing / QC (Playwright)
- Playwright module: `/opt/node22/lib/node_modules/playwright`; browsers at `/opt/pw-browsers` → `export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Import via `createRequire('/tmp/x.js')`.
- Serve with `python3 -m http.server <port>` (run_in_background; foreground instances die between tool calls — restart as needed). Git/`pkill` can kill bg servers.
- **QC after EVERY change (user insists):** load all 26 pages, **scroll fully**, and assert per page:
  - no element is invisible/zero‑size that should show — check **opacity AND display AND visibility AND boundingRect height** (NOT opacity alone),
  - `scrollWidth <= clientWidth+2` (no horizontal overflow),
  - exactly one `<h1>`, no console errors, no failed requests,
  - render **full‑size** screenshots and eyeball.
  Test **without** `reducedMotion` (reduced motion masks reveal bugs).
- Fonts only render via the local `@font-face`; for Brand previews inject Georgia→Lora/Inter→InstrumentSans at render time if needed.

## 8. Gotchas that bit us (don't repeat)
- **Scroll‑reveal hid content:** `.reveal{opacity:0}` + JS `.in` on scroll left cards invisible if user stopped scrolling. **Fixed** by forcing `.reveal{opacity:1;transform:none}` at source (index.html ~line 2156) AND `!important` override in themes. If "nothing appears" recurs, check for other `opacity:0` animation rules (e.g., `.cta-row`) or a `display:none` filter (`.prac-card.dim`).
- **Hero "engagement briefs" carousel:** rebuilt as a **transform slider** (`.brief-rail` translateX), NOT native scroll (native scrollLeft was unreliable here). Cards `.brief-card{flex-basis:76%}` (peek). 12 cards, prev/next disable at ends.
- **Alignment:** use **px** max‑width for a consistent reading column (ch scales with font‑size → lead ended wider than body). Long‑form text is `text-align:justify; hyphens:auto`.
- **Footer navy:** unify `.footer` and `footer.foot` to `var(--ink)` (they used different tokens).

## 9. Status — DONE
Design (Chambers chosen), 13 practice pages (rewritten concise/SEO copy + Income‑tax Act 2025 references + scannable lists), insights hub + 4 articles incl. **Income‑tax Act 2025 pillar**, 3 SEO corridor guides, interactive NRI‑TDS tool, team (text bios + LinkedIn, no photos), privacy/terms. SEO: per‑page canonical/OG, **Service+FAQ+Breadcrumb on all practices**, Article on insights, sitemap/rss/llms. **Real client testimonials** (homepage 6 + one per practice, sourced from the client's LinkedIn). Representative‑outcomes + credentials strip. Floating WhatsApp button. Global Accounting surfaced as its own **"The Global Desk"** group. Mobile nav, relative paths (offline‑openable), `_headers`. Footer navy unified, spacing tightened, justified long‑form. QC: 26/26 pages clean.

## 10. Status — PENDING (need the client's input)
- **Calendly link**: `#contact` "Book a consult" still points to `https://calendly.com/REPLACE-WITH-YOUR-LINK` — replace with the real link.
- **Contact form endpoint**: `FORM_ENDPOINT` is empty (graceful `mailto:` fallback). Add a Formspree/HubSpot URL (one line) to capture submissions.
- **Fee bands**: homepage has ₹25k / ₹75k / ₹1.5L retainer tiers; practice pages are qualitative ("indicative fee within five working days"). Replace with real numbers if desired.
- **Credentials**: strip states categories (CAs/CSs/advocates, IBBI‑registered valuers); add real membership/registration numbers when available.
- **Final version choice**: confirm **Chambers** (deployed) vs **Brand** (official 2023 book). Brand build is ready in `/tmp/brandsite`.

## 11. Recent commit log (this branch)
```
b68fd54 Neutralise scroll-reveal at source (content always visible)
a37e65a Fix content disappearing behind scroll-reveal; full QC pass
c57d07e Tighten inter-section spacing site-wide
8f6a1fc Justify all long-form prose (scenarios, FAQ, team bios)
e36f2a5 Justify long-form body paragraphs (auto-hyphenation)
e74157c Long-form pages: consistent aligned reading column
70a22b8 Tighten contact + legal spacing; Global Accounting → own group
f1359c1 Fix carousel (transform slider); unify footer navy
8459651 Add Advisory Monks static website (Chambers design)
```

---

## 12. LATEST STATE — deployment in progress (read first)
**Date:** this session continues from above.

**Where things stand:**
- The Chambers site is **deployed to Cloudflare as a Worker (Static Assets)** via dashboard "Upload and deploy" (not Pages — that's Cloudflare's current default and is fine; confirmed `_headers`, `_redirects`, and clean URLs all work natively on Workers Static Assets).
- Worker name is the auto-generated **`soft-morning-ab65`** (user may rename to `advisory-monks`). It's live on its `*.workers.dev` URL.
- **`advisorymonks.io` is already an ACTIVE zone in this Cloudflare account (Free plan)** — DNS is managed by Cloudflare, so **no nameserver change is needed**.
- **PENDING NEXT STEP (the site is not yet on the real domain):** attach the custom domain to the Worker:
  Dashboard → **Compute → Workers & Pages → `soft-morning-ab65` → Settings → Domains & Routes → Add → Custom domain** → add `advisorymonks.io`, then `www.advisorymonks.io`. Cloudflare auto-creates the DNS record + SSL. This **replaces the current/old site** at the apex, so check the `workers.dev` preview first. Verify existing **MX/email records** still present in DNS (zone already active, so they should be).
- Canonical host = **www** (`_redirects` 301s apex→www). Can flip to bare domain on request.

**Latest deploy bundle:** `AdvisoryMonks-site-DEPLOY.zip` = contents of `/site` (production). Latest commit: **818c573**.

**Fixes since section 11:**
- Logo wordmark was clipping on the user's machine (live SVG `<text>` in Georgia renders wider than sandbox serif → overflowed viewBox). Fixed by widening `logo.svg` + `logo-light.svg` viewBox `344→392`.
- Removed the **Founder Math** callout from `practices/ma-advisory.html` (linked to non-live `foundermath.advisorymonks.io`).
- Dropped `QC-REPORT.md` from the public `/site`.

**Still pending (needs user input):**
1. Attach custom domain (above) to finish go-live.
2. Old→new **`_redirects`** map — need the OLD site's URL list/sitemap to preserve SEO (old site platform unknown; possibly Wix).
3. Google Search Console: resubmit `https://www.advisorymonks.io/sitemap.xml`; request indexing for new pages (3 guides, NRI tool, income-tax-act-2025). Unchanged URLs just re-crawl.
4. Calendly link placeholder in `#contact`; contact-form endpoint; real fee numbers; Chambers vs Brand final choice.

**Environment limits for the assistant:** cannot reach external sites (network allowlist — `advisorymonks.io` returns "Host not in allowlist"); the Cloudflare MCP that connects is **read-only** for Workers + create-only for D1/KV/R2 (no Pages deploy, no DNS, no custom-domain) — so the assistant **cannot deploy or attach the domain directly**; the user does it in the dashboard.
