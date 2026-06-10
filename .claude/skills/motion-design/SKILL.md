---
name: motion-design
description: >-
  Add tasteful motion to websites — micro-interactions, scroll effects, page
  transitions, hero animations — using Motion (Framer Motion), GSAP, Lenis, and
  CSS. USE THIS when the user asks to animate something, add scroll effects or
  smooth scrolling, make a site feel "alive"/"premium"/"less static", build a
  hero animation, or review whether existing animation is too much. Implements
  the polish layer for client-website.
---

# Motion design

Motion is seasoning: the difference between premium and gimmicky is **restraint
and purpose**. Every animation needs a job — guiding attention, confirming an
action, or expressing the brand once.

## The taste rules

1. **1–3 signature moments per page**, not ten. One hero entrance, one scroll
   reveal pattern reused consistently, one delight detail.
2. **Fast and subtle wins.** UI micro-interactions: 150–300ms; entrances:
   400–700ms; easing `ease-out` for entrances, `ease-in-out` for moves. Nothing
   bounces unless the brand is playful.
3. **Animate cheap properties** — `transform` and `opacity` only (compositor),
   never `width/height/top/left` (layout thrash).
4. **Motion follows hierarchy.** The most important element moves first/most;
   stagger children ~50–80ms.
5. **Respect `prefers-reduced-motion`** — always provide a reduced variant.
6. **Scroll effects clarify, not hijack.** Parallax subtle (≤10–15%); never
   scroll-jack; content readable mid-animation.

## Tool selection

| Need | Use | Note |
|---|---|---|
| React component animation, presence, layout | **Motion** (`npm i motion`) | The React default; `AnimatePresence`, `layout`, `whileInView` |
| Smooth/inertia scrolling | **Lenis** (`npm i lenis`) | Instant "studio site" feel; pair with reveals |
| Scroll-triggered timelines, pinning | **GSAP + ScrollTrigger** (`npm i gsap`) | The pro tool for narrative scroll |
| Simple reveals/hovers | **CSS** (`transition`, `@keyframes`, view timeline) | Zero JS — prefer when enough |
| Pre-built animated components | **Magic UI / Aceternity / React Bits** | Via `client-website` skill; adapt tokens to brand |
| 3D moments | **Three.js / R3F** | Only when the project justifies the weight |

## Standard recipes

- **Hero entrance:** fade+rise (`opacity 0→1`, `y 24→0`, 600ms ease-out),
  children staggered; once per visit.
- **Scroll reveal:** `whileInView` fade+rise at `once: true`, threshold ~0.3 —
  one consistent pattern site-wide.
- **Hover (cards/buttons):** scale 1.02 + shadow lift, 180ms ease-out.
- **Page transition:** 200–300ms cross-fade; skip elaborate route choreography
  on marketing sites.
- **Marquee/logos:** slow (≥30s loop), pause on hover.

## Review mode
When asked "is this too much?": count the moving elements per viewport (>3
simultaneous = too much), check durations against the ranges above, verify
reduced-motion, and confirm each animation can name its job. Cut anything that
can't.
