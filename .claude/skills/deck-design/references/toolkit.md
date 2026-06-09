# Deck & document toolkit — ranked catalog

Vetted resources for building premium decks, slides, and PDF/Office documents.
Star counts approximate as of early 2026 (relative standing, not exact).

---

## 1. Agent skills from git (install & auto-use)

| Skill / repo | ~Stars | What | Install |
|---|---|---|---|
| **anthropics/skills** — official | ~148k | Ready-made `pptx`, `pdf`, `docx`, `xlsx` document skills (Apache-2.0). Generate **editable** Office files, fill PDF forms, build spreadsheets. | `/plugin marketplace add anthropics/skills` → `/plugin install document-skills@anthropic-agent-skills` |
| **travisvn/awesome-claude-skills** | — | Curated index of community Claude Skills | browse repo |
| **ComposioHQ/awesome-claude-skills** | — | Another curated skills index | browse repo |
| **VoltAgent/awesome-agent-skills** | — | 1000+ agent skills (Claude Code, Codex, Gemini CLI, Cursor) | browse repo |

> The `pptx`/`docx` skills are the right call whenever the client needs an
> **editable** PowerPoint/Word file. For pixel-perfect **PDF** with full design
> control, prefer the Chromium + HTML system (section 3).

## 2. Slide presentation frameworks (code-first)

| Tool | ~Stars | Strength | Notes |
|---|---|---|---|
| **reveal.js** | ~68k | The HTML presentation standard — nested slides, Auto-Animate, PDF export, speaker notes, LaTeX, huge plugin ecosystem | Most control; long-lived web decks |
| **impress.js** | ~38k | Prezi-style 3D/zoom canvas presentations | High-impact, non-linear |
| **Slidev** | ~39k | Vue + Vite + Markdown, HMR live reload, exports PDF/PPTX/PNG | Best for technical talks, live code |
| **Spectacle** | ~10k | React/JSX slides | If the team lives in React |
| **Marp** | ~9k | Fastest Markdown → PDF/HTML/PPTX (VS Code) | Internal docs, training decks |

## 3. HTML → PDF engines (designed documents)

| Engine | Role | When |
|---|---|---|
| **Playwright / Puppeteer (Chromium)** | Full browser render — CSS3, gradients, JS charts (Chart.js/D3/Plotly) | **Default for rich designed PDFs** (the Veska deck uses headless Chrome `--print-to-pdf`). Heavier CPU/RAM. |
| **WeasyPrint** (Python) | Pure-Python CSS Paged Media; smallest files; no JS | Invoices, statements, reports in Python stacks |
| **Typst** | Modern typesetting (LaTeX successor), fast, scriptable | Data-heavy reports, academic/typographic precision |
| **Paged.js** | JS polyfill for CSS Paged Media (running headers/footers, page numbers) in any browser | Book/report pagination with web tech |
| **PrinceXML / PDFreactor / Antenna House** | Commercial, top-tier paged output | When budget allows and print fidelity is paramount ($$$) |

## 4. Pitch / sales deck templates & references

| Repo | What |
|---|---|
| **rafaecheve/Awesome-Decks** | Curated list of real pitch-deck slides & examples |
| **SixArm/pitch-deck-template** | Reusable pitch-deck structure |
| **joelparkerhenderson/pitch-deck** | Pitch-deck advice for founders raising VC |

## 5. Taste layer (in this repo)

| Resource | Use |
|---|---|
| `design-md/` | 54 brand design-language specs — pull palette/type/spacing direction per page |
| `references/deck-template.html` | The proven Veska deck system (navy cover + browser-framed mockups), ready to copy |
| `samples/veska-website-samples*.pdf` | 29 worked examples of the system in action |

---

## Quick picks

- **Premium client PDF deck / sample brochure** → Chromium + `deck-template.html` + design-md taste.
- **Editable deck the client will tweak** → Anthropic `pptx` skill.
- **Conference/web talk with live code** → Slidev or reveal.js.
- **Report with live charts** → Chromium (renders JS charts) or Typst.
- **Tiny invoice/statement at scale** → WeasyPrint.
