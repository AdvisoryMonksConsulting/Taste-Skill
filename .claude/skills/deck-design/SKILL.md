---
name: deck-design
description: >-
  Produce premium, design-to-taste decks, slide presentations, sales/pitch
  decks, one-pagers, and print-quality PDF reports. USE THIS whenever the user
  asks to "make a deck", "build a presentation", "create slides", "a pitch
  deck", "a sample deck", "a one-pager", "a PDF report/brochure", or to redo a
  document so it looks designed. Reproduces the Veska deck system (navy cover +
  browser-framed mockups, see references/deck-template.html), chooses the right
  engine (Chromium print-to-PDF, reveal.js/Slidev/Marp, WeasyPrint/Typst), and
  can pull Anthropic's official pptx/pdf/docx/xlsx skills for native Office
  output. Full toolkit + install commands in references/toolkit.md.
---

# Deck & document design

When the user wants a polished deck, slide presentation, pitch/sales deck,
one-pager, or PDF report, follow this. Goal: output that looks *designed* —
typographic hierarchy, a real palette, generous spacing — not template-default.

## Decide the output format first

| Need | Use | Why |
|---|---|---|
| **Designed PDF deck / report / one-pager** (full visual control, in this repo) | **Chromium print-to-PDF** + the Veska HTML template | Proven here; full CSS3, gradients, charts. See workflow below. |
| **Editable PowerPoint (.pptx) / Word (.docx) / Excel** | **Anthropic official skills** (`pptx`/`docx`/`xlsx`) | Native Office files the client can edit. Install via plugin — see references/toolkit.md. |
| **Slide presentation, code-first / web-hosted / speaker notes** | **reveal.js** (max control) or **Slidev** (Vue+Markdown) | Web decks, live, exportable to PDF/PPTX. |
| **Fastest Markdown → PDF/PPTX** | **Marp** | Internal decks, docs, training. |
| **Lightweight invoices/statements, no Chromium** | **WeasyPrint** (Python) or **Typst** | Tiny files, excellent CSS paged media. |

## Primary workflow — the Veska designed-PDF system

This is the system behind the sample deck in `samples/`. Reuse it for premium,
fully-controlled PDFs.

1. **Start from the template:** `references/deck-template.html` — a self-contained
   A4-landscape system with the navy gradient cover, sector chips, and the
   browser-framed mockup component. Copy it, swap content, add pages.
2. **Apply taste:** pull palette/type direction from a `design-md/<brand>/DESIGN.md`
   reference so each page has intent. Keep one type system and a tight palette.
3. **Keep assets local** (network is often sandboxed): pure-CSS gradients/shapes
   instead of remote images; system font stacks (Georgia serif / system sans).
4. **Render with Chromium:**
   ```bash
   CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome   # or any chrome
   "$CHROME" --headless --no-sandbox --no-pdf-header-footer \
     --print-to-pdf=out.pdf "file://$PWD/deck.html"
   ```
   Page size/orientation come from the HTML's `@page { size: A4 landscape }`.
5. **QA without poppler:** screenshot the HTML at exact page px
   (A4 landscape ≈ `--window-size=1123,794`) and inspect, then deliver the PDF.

## Pulling the Anthropic document skills (native pptx/pdf/docx/xlsx)

For editable Office output, install the official skills (148k★, Apache-2.0):

```bash
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
```

Then: *"use the pptx skill to build a 10-slide deck…"*. These are the
recommended path whenever the deliverable must be an editable .pptx/.docx, not a
PDF. (Offer to run these commands; they modify the user's Claude Code plugins.)

## Principles

- **Restraint reads as premium.** One or two standout moments per page, not ten.
- **Real hierarchy:** an eyebrow, a confident headline, a calm sub, one clear CTA.
- **Every page earns its place** — a reason, a palette, a focal element.
- **Original, not lifted** — build with primitives; don't clone a real brand's
  finished deck (IP). Use fictional names for samples.

See `references/toolkit.md` for the full ranked catalog, stars, and links.
