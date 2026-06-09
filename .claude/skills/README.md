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

Supporting assets in the repo:
- **`design-md/`** — 54 brand design-language specs (the taste data).
- **`samples/`** — the 49-sector website concept library (Vol I–III) + the
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

Discovery / more skills (community indexes):
- `github.com/travisvn/awesome-claude-skills`
- `github.com/ComposioHQ/awesome-claude-skills`
- `github.com/VoltAgent/awesome-agent-skills` (1000+)

## So you don't look anywhere else

For **design/build/launch of client websites and their decks**, start here:
match your need to the table above and the matching skill fires automatically.
For **editable Office documents**, run the one plugin install above. That's the
whole map.
