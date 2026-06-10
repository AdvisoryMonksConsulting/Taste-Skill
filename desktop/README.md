# Founder Research — Desktop App

A double-click desktop app (Windows, macOS, Linux) where you type a startup
idea and six AI agents automatically research the market for you:

1. **Competitor Research** — who's already in the space
2. **Pricing Intelligence** — what they actually charge
3. **Funding Landscape** — who raised, how much, from whom
4. **Market Gap Analysis** — the openings the incumbents miss
5. **Positioning Strategy** — how to stand out, against named rivals
6. **Launch Strategy** — a concrete 90-day go-to-market plan

Roughly 3–4 hours of founder desk research from a single prompt, with live
web search and cited sources.

---

## For users (no technical knowledge needed)

### First time setup — one thing, once

The app uses **Claude**, an AI service by Anthropic, to do the research. It
needs your personal access key:

1. Open the app. It shows a welcome screen.
2. Click the link to **console.anthropic.com**, sign in (or create an
   account), and click **Create Key**.
3. Copy the key, paste it into the app, press **Save**.

The app checks the key on the spot and tells you if something's wrong. The
key is stored **encrypted on your computer only** — it is never sent
anywhere except to Anthropic itself.

### Daily use

- Type your idea, click **Research this idea**, and watch the six agents
  work. A full run takes a few minutes.
- Every finished run is **saved automatically** in the Library on the left.
- Open any saved report and **export it as PDF, web page, or Markdown** to
  share with cofounders or investors.
- **Stop** any time — whatever was finished is saved as a partial report.

### What works offline

| | Internet needed? |
|---|---|
| Running new research | **Yes** — the agents search the live web |
| Reading saved reports | No |
| Exporting saved reports (PDF/HTML/Markdown) | No |

If you're offline the app says so and keeps the Library fully usable.

### Where your data lives

Everything stays on your machine — there is no cloud account, no telemetry,
no data collection. Reports are plain files you own:

- Windows: `%APPDATA%\founder-research-desktop\reports`
- macOS: `~/Library/Application Support/founder-research-desktop/reports`
- Linux: `~/.config/founder-research-desktop/reports`

### Costs

Each research run calls the Anthropic API on your key. The **Research
quality** setting controls the tradeoff:

- **Best quality** (Claude Opus) — deepest research, costs the most per run
- **Balanced** (Claude Sonnet) — great quality at a fraction of the cost
- **Fastest** (Claude Haiku) — quick first pass, cheapest

---

## For whoever builds/sells the installers

### Easiest way: let GitHub build all three platforms

This repo has a workflow at `.github/workflows/desktop-release.yml`. Push a
version tag and GitHub builds the Windows `.exe`, macOS `.dmg`, and Linux
`.AppImage`/`.deb` for you:

```bash
git tag v1.0.0
git push origin v1.0.0
```

Then download the installers from the run's **Artifacts** on the GitHub
Actions tab. (You can also trigger it manually from that tab — no tag
needed.)

### Building locally

```bash
pnpm install          # from the repo root (pnpm workspace)
cd desktop
pnpm dev              # run the app in development mode
pnpm typecheck        # type-check main + preload + renderer
pnpm dist:linux       # .AppImage + .deb   (build on Linux)
pnpm dist:win         # .exe one-click installer  (build on Windows)
pnpm dist:mac         # .dmg               (build on macOS)
```

Installers land in `desktop/release/`. Each platform's installer must be
built on that platform (or via the CI workflow above).

### Things to know before selling it

- **Code signing.** Unsigned apps show OS warnings on Windows
  (SmartScreen) and macOS (Gatekeeper). For a polished customer experience,
  buy a code-signing certificate (Windows) / join the Apple Developer
  Program (macOS) and configure
  [electron-builder code signing](https://www.electron.build/code-signing).
  The CI workflow runs unsigned by default.
- **Each customer needs their own Anthropic API key** (the app walks them
  through it), or you can resell access another way — that's a business
  decision, not a technical one.
- **App icon.** Drop `icon.png` (512×512+), `icon.ico`, and `icon.icns`
  into `desktop/build/` and electron-builder picks them up automatically.
  Without them the default Electron icon is used.
- **"Offline system" honesty:** reading and exporting saved reports is
  fully offline. Running *new* research can never be offline — the agents
  do live web search through the Anthropic API. Market the offline part as
  the report library.

### Architecture (for developers)

```
desktop/
├─ src/shared/        agent prompts + event/report types (single source)
├─ src/main/          Electron main process
│  ├─ research.ts     6-agent pipeline (Anthropic SDK, web_search/web_fetch)
│  ├─ storage.ts      encrypted API key (safeStorage) + report library (JSON)
│  ├─ export.ts       Markdown / self-contained HTML / PDF (printToPDF)
│  └─ index.ts        window + IPC wiring
├─ src/preload/       typed contextBridge API (window.founder)
└─ src/renderer/      React + Tailwind UI (onboarding, live run, library)
```

The pipeline streams events (`agent_start` / `search` / `delta` /
`agent_done` / `saved` / `error`) from main to renderer over IPC — the same
event design as the web app's `/api/research` NDJSON stream. All
dependencies are bundled into `out/` at build time, so packaged apps ship
without `node_modules`.
