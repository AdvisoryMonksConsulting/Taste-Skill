# Git-based hosting (auto-deploy on push) — setup + diagnosis

Goal: stop manually zipping `out/` and uploading. Instead, **push to git → Cloudflare
builds and deploys automatically.**

## Diagnosis of the current setup (as of 2026-06-25)
| Thing | State | Implication |
|---|---|---|
| Hosting | Cloudflare Pages project **`veskadesign`**, **Direct Upload** (manual zip) | A Direct-Upload project **cannot be converted** to Git. We create a **new** Git-connected Pages project and move the domain to it. |
| Repo | `AdvisoryMonksConsulting/Taste-Skill` on GitHub | Ready to connect. |
| Default branch | **No `main`/`master`** — every branch is `claude/*` | Need a stable **production branch**. Recommend creating `main`. |
| Build config | `next.config.ts` → `output: "export"`, `images.unoptimized: true` | Static export to `out/`. **sharp NOT needed at build** (images unoptimized) → no native-build gate in CI. ✅ |
| Package manager | `pnpm` (lockfile present); now pinned via `"packageManager": "pnpm@11.5.2"` | Cloudflare uses corepack to match this exact pnpm. Reproducible builds. |
| CI files | none (`.github/` absent) | Not needed — Cloudflare builds it. (GitHub Actions is an alternative, below.) |
| `out/` | git-ignored | Correct: CI builds it; we don't commit build output. |

## Recommended path — Cloudflare Pages + Git (least work, keeps current stack)

### Step 0 — establish a production branch (one-time)
Cloudflare deploys one **production branch** on push (everything else = preview URLs).
Create `main` from the current good branch:
```
git checkout claude/blissful-cray-JDjsG
git pull
git checkout -b main
git push -u origin main
```
Then on GitHub: **Settings → General → Default branch → `main`** (optional but tidy).

### Step 1 — create the Git-connected Pages project
Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** →
authorize GitHub → pick **AdvisoryMonksConsulting/Taste-Skill**.

### Step 2 — build settings
| Field | Value |
|---|---|
| Production branch | `main` |
| Framework preset | **Next.js (Static HTML Export)** — or "None", the commands below are what matter |
| Build command | `npx next build` |
| Build output directory | `out` |
| Root directory | `/` (leave blank) |

### Step 3 — environment variables (Settings → Environment variables → Production)
| Name | Value | Why |
|---|---|---|
| `NODE_VERSION` | `22` | Match local Node 22. |
| `PNPM_VERSION` | `11.5.2` | Belt-and-suspenders with the pinned `packageManager`. |

(No `sharp`/build-script vars needed — images are unoptimized, so nothing native compiles.)

### Step 4 — first deploy + verify
Save → Cloudflare runs `pnpm install` (auto from lockfile) then `npx next build`.
When it goes green, open the `*.pages.dev` URL and check `/demos/investher`.

### Step 5 — move the custom domain
The domain `veskadesign.com` currently points at the **old** Direct-Upload project. Move it:
1. New project → **Custom domains → Set up a custom domain → `veskadesign.com`** (+ `www`).
2. Cloudflare updates the DNS CNAMEs automatically (DNS is already on Cloudflare).
3. Once the new project serves the domain, delete/retire the old `veskadesign` project to avoid confusion.

> Tiny gap during the switch is possible. Do it at a low-traffic time. The old project keeps serving until you move the domain, so there's no outage before Step 5.

### Day-to-day after this
- **Push to `main`** → production build → live on `veskadesign.com`.
- **Push any other branch / open a PR** → Cloudflare posts a **preview URL** — great for sharing client demos before they go to the main domain.
- No more `pnpm build` + zip + upload.

## Alternative — keep Direct Upload but automate it with GitHub Actions
If you'd rather not move the domain, add a workflow that builds and uploads to the
**existing** project with Wrangler on every push to `main`:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages
on:
  push: { branches: [main] }
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: npx next build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy out --project-name=veskadesign
```
Requires two GitHub repo secrets: `CLOUDFLARE_API_TOKEN` (Pages:Edit) and
`CLOUDFLARE_ACCOUNT_ID`. This keeps the same project + domain (no Step 5), at the
cost of maintaining a token. **The Pages-Git path (above) is simpler and is the recommendation.**

## Recommendation
Go with **Cloudflare Pages + Git** (Steps 0–5). It's the least moving parts, gives free
preview URLs per branch (useful for client concepts like InvestHER), and removes the
manual zip step entirely. The only one-time cost is moving the domain to the new project.
