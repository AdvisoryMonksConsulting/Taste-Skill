---
name: brand-kit
description: >-
  Create a lightweight brand system for a client before building — color
  palette with roles, type pairing, logo/wordmark direction, tone of voice, and
  do/don'ts. USE THIS when starting a new client, when the user asks for a
  "brand", "identity", "style guide", "brand kit", or "visual direction", or
  before building a site so everything stays consistent. Feeds client-website,
  landing-copy, and deck-design.
---

# Brand kit

Produce a one-page brand system a client can sign off on, then reuse everywhere.

## Inputs (ask if missing)
- **Vertical & audience** (who buys, what they value)
- **Vibe** in 2–3 words (e.g. "warm, premium, calm" / "bold, fast, modern")
- **1–2 reference brands** they admire → map to a `design-md/<brand>` spec via
  the `design-taste` skill

## Outputs (the brand sheet)
1. **Color system with roles** — background, surface, ink (3 tiers), primary
   accent, secondary, success/error, borders. Give hex + the job of each.
2. **Typography** — a heading + body pairing. Prefer robust system stacks
   (Georgia serif / system sans) or name 1–2 Google Fonts; define scale,
   weights, line-heights.
3. **Logo / wordmark direction** — a simple, buildable mark (monogram,
   wordmark with letter-spacing, or geometric glyph) + clear-space rule.
4. **Tone of voice** — 3 adjectives, a "we sound like / never like" pair, and 2
   sample lines.
5. **Do / don't** — 3 of each (e.g. "do: generous whitespace; don't: drop
   shadows everywhere").

## Deliver it
Hand back as Markdown, or render a polished one-pager via the **deck-design**
skill (navy template) so the client sees it designed, not described.

## Guardrails
- Keep it **buildable in code** — palettes, fonts, and marks that translate
  straight into Tailwind/CSS, not Photoshop-only concepts.
- Original work — don't reproduce an existing company's identity; use
  `design-md/` to learn the craft, not to copy a brand.
