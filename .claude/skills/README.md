# Veska Skill Suite — the one answer for designing & building premium client websites

This repo is a **self-contained system** for taking a client from nothing to a
launched, premium website (and the decks/assets around it). Every skill below is
**auto-pulled** — Claude invokes it automatically from its `description` when
your request matches; you don't call them by hand.

## The lifecycle (what fires when)

```
   idea / brief
        │
        ▼
  ┌─────────────┐   pick the visual direction from 54 brand specs
  │ design-taste│◄──────────────── design-md/ (the taste corpus)
  └─────────────┘
        │
        ▼
  ┌─────────────┐   palette · type · logo · voice · do/don't
  │  brand-kit  │
        │
        ▼
  ┌──────────────┐   scaffold w/ shadcn + vetted libs + page templates
  │client-website│◄─── lndev-pages (full-page template source)
  └──────────────┘
        │
        ▼
  ┌─────────────┐   conversion headlines · sections · CTAs
  │ landing-copy│
        │
        ▼
  ┌─────────────┐   perf · SEO · OG · a11y · deploy
  │  web-launch │
        │
        ▼
  ┌─────────────┐   sample decks · pitch/sales decks · PDF one-pagers
  │ deck-design │   (built the 49-sector sample library in samples/)
  └─────────────┘
```

## In-repo skills (permanent, committed, auto-pulled)

| Skill | Use it for |
|---|---|
| **design-taste** | Make anything look like Stripe/Linear/Apple/etc. via `design-md/`'s 54 specs |
| **brand-kit** | A client brand system: palette, type, logo direction, voice, do/don't |
| **client-website** | Build the site — shadcn/ui + Tailark/Magic UI/Aceternity/React Bits/Origin UI + lndev pages |
| **lndev-pages** | Full-page templates from lndev (`bk.lndev.me/pages`, Square UI) via shadcn registry |
| **landing-copy** | Conversion copy — headlines, sections, CTAs, objection handling |
| **web-launch** | Ship it — Core Web Vitals, SEO, Open Graph, accessibility, deploy |
| **deck-design** | Premium decks / pitch decks / PDF one-pagers (the navy template + sample library) |
| **site-teardown** | Audit/critique an existing site — UX + CRO teardown (Nielsen 10 + conversion checklist) with prioritized quick wins; the redesign-pitch asset |
| **motion-design** | Tasteful animation — micro-interactions, scroll effects, Motion/GSAP/Lenis recipes, plus an "is this too much?" review mode |

Supporting assets in the repo:
- **`design-md/`** — 54 brand design-language specs (the taste data).
- **`samples/`** — the 69-sector website concept library (Vol I–IV) + the
  reusable deck template behind it.

## External skills — install via the sanctioned channel (don't vendor)

Anthropic's official skills are **excellent and on-topic**, but their skill
folders are **proprietary / source-available** (the repo wrapper is Apache-2.0).
Do **not** copy them into this repo — install them as a Claude Code plugin so
they stay licensed and update cleanly:

```bash
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
```

Highly relevant ones in that marketplace:
- **`pptx` / `docx` / `xlsx`** — native, *editable* Office files (use when the
  client must edit the deliverable; our `deck-design` covers pixel-perfect PDF).
- **`pdf`** — extract/merge/split/fill/OCR PDFs.
- **`frontend-design`** — distinctive, anti-"AI-slop" UI (complements `client-website`).
- **`brand-guidelines` / `theme-factory` / `canvas-design`** — theming & visual art.

### MIT community skills (vendorable, but need your explicit go-ahead)

**UI/UX Pro Max** (`github.com/nextlevelbuilder/ui-ux-pro-max-skill`, ~88k★,
MIT) — the most popular community design skill: 67 UI styles, 161 color
palettes, 57 font pairings, 99 UX guidelines, 25 chart types, searchable via
bundled Python scripts (statically inspected: pure-stdlib local BM25 search, no
network/exec calls). Because it ships **executable scripts that would live in
the auto-invoked `.claude/skills/`**, adding it requires the repo owner's
explicit authorization. To adopt: run its official installer yourself
(`npm i -g uipro-cli && uipro init --ai claude`), or explicitly tell Claude
"vendor ui-ux-pro-max into this repo" in a session.

**awesome-claude-design** (`github.com/rohitg00/awesome-claude-design`, MIT) —
28+ DESIGN.md files organized into 9 aesthetic families (Editorial Minimalism,
Terminal-Core, Warm Editorial, Data-Dense Pro, Cinematic Dark, Playful Color,
Glass/Soft-Futurism, Neon Brutalist, Cult/Indie) plus remix recipes and an
anti-slop kit. Pure Markdown (no code), complements `design-md/`; safe to
vendor on request.

### Final-sweep finds (2026-06-10) — adjacent skills by category

All vetted as relevant; install/vendor only with explicit go-ahead (same
supply-chain rule as above). Pure-Markdown skills are low-risk; anything with
scripts needs review first.

| Category | Best finds |
|---|---|
| **Accessibility audit** | `airowe/claude-a11y-skill` (axe-core + jsx-a11y, WCAG 2.1 AA) · `Community-Access/accessibility-agents` (11 WCAG 2.2 agents) |
| **Design audit** | `Ashutos1997/claude-design-auditor-skill` (19 design rules + a11y score) — overlaps our `site-teardown` |
| **Figma → code** | `nafiurrahmanniloy/figma-skill` (tokens → 7 frameworks) · `albertzhangz10/figma-design-system-to-design-md` (Figma → design.md) · `lifesized/figma-design-sync` |
| **Logo / SVG assets** | `neonwatty/logo-designer-skill` (pure Markdown, no code — safe) · `op7418/logo-generator-skill` |
| **SEO / marketing** | `coreyhaines31/marketingskills` (CRO, copy, SEO, growth) · `aaron-he-zhu/seo-geo-claude-skills` (20 skills) · `AgriciDaniel/claude-seo` (25 sub-skills) · `OpenClaudia/openclaudia-skills` (34) — overlap our `landing-copy`/`web-launch`; useful for depth |
| **Cross-platform curated** | `openai/skills` — Codex catalog incl. `frontend-skill` (art-direction, anti-generic) and `figma-implement-design`; same SKILL.md standard, works here |

Marketplaces / directories (the meta-layer — search these for anything new):
- **claudemarketplaces.com** (20k+ skills directory) · **skillsmp.com** (800k+
  indexed from GitHub) · **claudeskills.info** (658+ curated free) ·
  **smithery.ai/skills** · **skills.sh** · **awesomeskills.dev**
- `github.com/travisvn/awesome-claude-skills`
- `github.com/ComposioHQ/awesome-claude-skills`
- `github.com/VoltAgent/awesome-agent-skills` (1000+)
- `github.com/BehiSecc/awesome-claude-skills`
- `github.com/heilcheng/awesome-agent-skills`

## So you don't look anywhere else

For **design/build/launch of client websites and their decks**, start here:
match your need to the table above and the matching skill fires automatically.
For **editable Office documents**, run the one plugin install above. That's the
whole map.
