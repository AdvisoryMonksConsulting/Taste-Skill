---
name: site-teardown
description: >-
  Audit and critique an existing website — a structured UX/conversion teardown
  with prioritized quick wins. USE THIS when the user asks to review, audit,
  critique, or tear down a site or landing page, find "quick wins", explain why
  a page isn't converting, prep a redesign pitch for a prospect, or compare a
  client's site against best practice. Produces the before/after argument that
  client-website then fixes.
---

# Site teardown (UX + conversion audit)

A fast, structured critique of an existing site that ends in **prioritized,
specific fixes** — the asset behind "a few quick wins jumped out" outreach and
every redesign pitch.

## Inputs
A URL, screenshots, or a description of the page. (If the sandbox can't fetch
the live site, ask for screenshots or work from what's described — and say so
in the output rather than inventing details you can't see.)

## Audit framework — score each area, note specifics

**1. First impression (5-second test)**
Can a stranger say *what it is, who it's for, why care* in 5 seconds? Is the
hero headline an outcome or a slogan? Is there one obvious primary CTA above
the fold?

**2. Conversion path (CRO)**
- One primary action per page; CTA verbs specific ("Book a consult", not "Submit").
- Friction: form length, steps to convert, surprise costs, dead ends.
- Proof near the ask: reviews, numbers, accreditations, guarantees.
- Objections answered (price, risk, switching effort) before the final CTA.

**3. Usability (Nielsen's 10, applied lightly)**
Visibility of status · match to the user's language · user control · consistency
· error prevention · recognition over recall · efficiency · aesthetic & minimal
· good error recovery · findable help. Flag the 2–3 worst violations only.

**4. Visual design & taste**
Hierarchy (is the most important thing the most prominent?), palette discipline,
type system consistency, spacing rhythm, image quality. Compare against the
nearest `design-md/` reference for what "good" looks like in this vertical.

**5. Performance & mobile**
Slow LCP, layout shift, unsized images, render-blocking fonts; thumb-reach,
tap targets, text size at 360px. (Use PageSpeed data when available.)

**6. Trust & basics**
HTTPS, contact details, legal pages, working links, recency signals
(a "2019 blog" reads as abandoned).

## Output format

1. **Verdict** — 2 sentences: the single biggest reason this page underperforms.
2. **Scorecard** — the 6 areas above, each ✅/⚠️/❌ with a one-line reason.
3. **Top 5 quick wins** — ordered by impact/effort, each concrete enough to
   implement ("Move the booking button into the hero and make it the only
   orange element on the page").
4. **The redesign case** (when pitching) — 2–3 sentences a non-designer owner
   would feel: what the current site costs them and what better looks like.

## Guardrails
- Critique the **work, not the person** — prospects read these; keep it
  respectful and factual.
- Only claim what you actually observed; label assumptions as assumptions.
- Don't fabricate metrics ("your bounce rate is…") — frame as risk, not fact.
