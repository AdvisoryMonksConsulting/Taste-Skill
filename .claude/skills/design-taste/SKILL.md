---
name: design-taste
description: >-
  Apply a specific brand's design language to any website, app, component, or
  deck using the 54 reference specs in design-md/. USE THIS when the user wants
  something to "look like Stripe / Linear / Apple / Notion / Vercel / etc.",
  asks for a visual direction, palette, or type system, or wants a design to
  feel intentional and high-taste instead of generic. This is the "taste" layer
  that the client-website, brand-kit, and deck-design skills draw on.
---

# Design taste (using design-md/)

`design-md/` holds **54 brand design-language specs** — each a ~300-line
`DESIGN.md` reverse-engineered from a top product site (Stripe, Linear, Apple,
Claude, Notion, Vercel, Figma, Supabase, Raycast, Resend, Wise, Airbnb…). Use
them to give any build a real point of view.

## Workflow

1. **Pick the closest reference.** Map the client's desired feel to a brand:
   `design-md/<brand>/DESIGN.md` (e.g. warm/editorial → `claude` or `apple`;
   crisp SaaS → `stripe`/`linear`; bold → `framer`). Browse the 54 folders.
2. **Extract the tokens.** From the spec, pull: the full **palette with roles**
   (background, surface, text tiers, accent, borders), the **type system**
   (families, weights, sizes, line-heights, letter-spacing), **spacing/radius/
   shadow** scale, and **motion** cues.
3. **Translate to the target.** Render as Tailwind theme tokens / CSS variables.
   Keep one type system and a tight palette — consistency is what reads as taste.
4. **Apply with restraint.** One or two signature moves per page (a serif
   headline, a warm neutral canvas, a ring-shadow system) — not all at once.

## Available references (54)

airbnb · airtable · apple · bmw · cal · claude · clay · clickhouse · cohere ·
coinbase · composio · cursor · elevenlabs · expo · figma · framer · hashicorp ·
ibm · intercom · kraken · linear.app · lovable · minimax · mintlify · miro ·
mistral.ai · mongodb · notion · nvidia · ollama · opencode.ai · pinterest ·
posthog · raycast · replicate · resend · revolut · runwayml · sanity · sentry ·
spacex · spotify · stripe · supabase · superhuman · together.ai · uber · vercel ·
voltagent · warp · webflow · wise · x.ai · zapier

## Guardrail

These are references to **learn the design language from** — extract the
*system* (how they use color, type, space, motion). Do **not** clone a brand's
finished pages or logo 1:1 into client work (trademark/IP). The client's own
brand always wins; the reference only informs the craft.
