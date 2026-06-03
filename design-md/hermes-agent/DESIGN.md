# Design System: Hermes Agent (Nous Research)

## 1. Visual Theme & Atmosphere

Hermes Agent's interface is a terminal reimagined as a polished product — amber-on-black, dense, and unmistakably built for people who live in a shell. Where most AI products chase soft, friendly approachability, Hermes leans into the opposite instinct: a near-black void (`#07070d`) lit almost entirely by a single signature gold (`#FFD700`), as if the whole site were a CRT phosphor glow. The atmosphere is "powerful tool wielded by experts," not "assistant for everyone." The caduceus mark (☤) and the tagline *"the self-improving AI agent"* set the tone — this is software that runs on a $5 VPS or a GPU cluster and talks back through a real TTY.

The defining move is that **dark mode is the primary mode** — it is the default, the canvas the brand was designed for, and light mode is a carefully-derived WCAG-compliant afterthought rather than a co-equal. Against the deep blue-black background, everything is rendered in warm off-white text (`#e8e4dc`) with gold used surgically: gold borders at very low alpha (`rgba(255,215,0,0.06–0.15)`), gold left-rails on active items, gold eyebrows in monospace, and gold accents on every interactive surface. A faint gold dot-grid (`32px × 32px` at 2% opacity) tiles the entire background, evoking graph paper or a terminal's character cells.

What makes Hermes distinctive is the **typographic split-personality**: Inter for clean UI prose, but JetBrains Mono for everything that signals "machine" — eyebrows, stat counters, tags, install commands, category counts, and labels. The monospace is not decoration; it is the brand's voice. Combined with the amber-on-dark palette and box-drawing-safe code blocks tuned to preserve ASCII diagrams, the design says "this is a developer's agent, and it respects your terminal."

**Key Characteristics:**
- Dark-first design — `#07070d` blue-black canvas is the primary mode, not an alternate theme
- Single dominant accent: signature gold `#FFD700`, used at full strength for emphasis and at 5–15% alpha for borders/tints
- Terminal aesthetic — JetBrains Mono carries eyebrows, stats, tags, and commands as a deliberate brand signal
- Faint gold dot-grid background (`radial-gradient` 1px dots, 32px tile) evoking graph paper / character cells
- Gold-tinted, low-alpha borders and hover glows instead of heavy shadows
- 3px gold left-rail to mark active navigation and card accents
- `backdrop-filter: blur()` on navbar and sticky control bars for a layered, glassy depth
- Caduceus (☤) wordmark; warm off-white text (`#e8e4dc`) for warmth against the cold background

## 2. Color Palette & Roles

### Primary
- **Hermes Gold** (`#FFD700`): The core brand color and the single dominant accent — primary links, active states, CTA emphasis, and brand moments in dark mode. A pure, bright gold that reads as terminal-amber against black.
- **Amber Hover** (`#FFBF00`): The link/interactive hover state in dark mode — a deeper, more saturated amber that warms on interaction.
- **Dark Amber** (`#8B6508`): The light-mode primary — a deliberately darkened gold chosen for WCAG AA compliance (pure `#FFD700` is only ~1.4:1 on white; this passes 4.5:1+). The brand color, made readable on light surfaces.

### Gold Scale (Dark Mode)
- **Gold Dark** (`#E6C200`), **Gold Darker** (`#D9B700`), **Gold Darkest** (`#B39600`): Deeper gold steps for pressed/secondary states.
- **Gold Light** (`#FFDD33`), **Gold Lighter** (`#FFE14D`), **Gold Lightest** (`#FFEB80`): Lighter gold tints for hover highlights and de-emphasized accents.

### Gold Scale (Light Mode)
- **Link Amber** (`#7A5800`) → **Hover Amber** (`#5A4100`): Light-mode link and hover, progressively darker for contrast on white.
- **Amber Light/Lighter/Lightest** (`#9E7410`, `#B38319`, `#C89222`): Lighter light-mode steps.

### Surface & Background (Dark)
- **Void Black** (`#07070d`): The primary page background — a near-black with a subtle blue-violet undertone, the emotional foundation of the whole design.
- **Surface** (`#0f0f18`): Elevated containers, code background, search inputs — one step up from the void.
- **Footer Black** (`#050509`): The deepest surface, reserved for the footer.
- **Code Black** (`#0a0a12` / `#0a0a14`): Code blocks and terminal figures — slightly distinct from surface.
- **Card** (`#0c0c16`): Card background on the skills/catalog pages.
- **Emphasis 100** (`#14142a`) / **Emphasis 200** (`#1a1a30`): Raised emphasis surfaces and scrollbar thumbs — the bluest of the dark tones.

### Neutrals & Text
- **Warm White** (`#e8e4dc`): Primary body text on dark — a warm off-white, not pure white, to soften the contrast against the cold background.
- **Hero White** (`#fafaf6`): The brightest text, reserved for hero titles — near-white with a faint warm cast.
- **Warm Gray** (`#9a968e`): Secondary text, captions, footer links, and de-emphasized metadata — a warm, slightly olive gray.

### Semantic & Accent
- **Sky Blue** (`#60a5fa`, typically at 60–90% alpha): The secondary accent — used for documentation links and "platform" pills, providing a cool counterpoint to the dominant gold.
- **Gold Border** (`rgba(255,215,0,0.06–0.15)`): The workhorse border — gold at very low alpha, creating the gentlest possible gold-tinted containment.
- **White Border** (`rgba(255,255,255,0.04–0.07)`): Neutral low-alpha border for cards and dividers where a gold tint would be too warm.

### Gradient System
- **Hero Glow**: `radial-gradient(ellipse, rgba(255,215,0,0.07) 0%, transparent 70%)` — a soft gold halo bleeding from behind hero titles.
- **Hero Banner**: `linear-gradient(135deg, #07070d 0%, #0f0f18 100%)` — a subtle void-to-surface diagonal.
- **Dot Grid**: `radial-gradient(rgba(255,215,0,0.02) 1px, transparent 1px)` tiled at 32px — the signature background texture.
- **User-Stories Text Gradient**: `linear-gradient(120deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)` — a purple→blue→green clipped-text gradient used on the User Stories collage headline (the one place the palette breaks from gold).

## 3. Typography Rules

### Font Family
- **Body / UI**: `Inter`, with fallbacks: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (weights 300–700)
- **Monospace / Brand Voice**: `JetBrains Mono`, with fallbacks: `'Fira Code', 'Cascadia Code', monospace` (weights 400, 500)
- **Marketing Pages**: `DM Sans`, with fallbacks: `-apple-system, BlinkMacSystemFont, sans-serif` (weights 400–700) — used on the custom Skills catalog page
- **ASCII Diagrams**: A box-drawing-safe stack (`JetBrains Mono, 'Cascadia Mono', 'Fira Code', 'SFMono-Regular', 'DejaVu Sans Mono', monospace`) with ligatures **disabled** (`font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0`) to keep terminal diagrams pixel-aligned

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Hero Title | DM Sans / Inter | 48px (3rem) | 700 | 1.10 (tight) | -0.04em | Hero White (`#fafaf6`), tight negative tracking |
| Hero Title (mobile) | DM Sans / Inter | 32px (2rem) | 700 | 1.10 | -0.04em | Scaled down below 900px |
| Section Heading | Inter | ~36px (2.25rem) | 600 | 1.20 | normal | `--ifm-heading-font-weight: 600` |
| Stat Value | JetBrains Mono | 26px (1.6rem) | 700 | 1.00 | normal | Tabular numerals, terminal counter feel |
| Hero Subtitle | Inter / DM Sans | 17px (1.05rem) | 400 | 1.50 | normal | Warm Gray (`#9a968e`) |
| Body | Inter | 16px (1rem) | 400 | 1.5–1.65 | normal | Warm White (`#e8e4dc`) |
| Card Title | Inter | ~15px (0.92rem) | 600 | 1.30 | normal | |
| Card Description | Inter | ~13px (0.82rem) | 400 | 1.55 | normal | Warm Gray, line-clamped |
| Eyebrow / Label | JetBrains Mono | 12px (0.75rem) | 400–500 | normal | 0.15em, UPPERCASE | Gold at 50% — the signature mono eyebrow |
| Stat Label | JetBrains Mono | ~11.5px (0.72rem) | 400 | normal | 0.06em, UPPERCASE | |
| Tag / Count | JetBrains Mono | ~10–11px (0.62–0.68rem) | 500 | normal | normal | Pills, counts, install hints |
| Code | JetBrains Mono | 90% of base | 400 | 1.35 (diagrams) | normal | `--ifm-code-font-size: 90%` |

### Principles
- **Mono is the brand voice**: JetBrains Mono is reserved for anything that signals "machine" — eyebrows, stat counters, tags, category counts, install commands, and labels. Sans-serif (Inter/DM Sans) handles human-readable prose. The split is intentional and consistent.
- **UPPERCASE + wide tracking for eyebrows**: Small monospace labels use `text-transform: uppercase` with generous letter-spacing (0.06–0.15em) — the classic terminal/section-marker treatment.
- **Tight, negative-tracked hero**: Hero titles compress to 1.1 line-height with `-0.04em` letter-spacing for a dense, confident headline.
- **Tabular numerals for stats**: Counters use `font-variant-numeric: tabular-nums` so numbers don't jitter — reinforcing the data/terminal aesthetic.
- **Headings at weight 600, never heavier**: A single heading weight (`600`) keeps hierarchy coming from size and color, not weight escalation.

## 4. Component Stylings

### Buttons
**Gold Outline (Primary CTA)**
- Background: `rgba(255,215,0,0.04)` (barely-there gold wash)
- Text: `rgba(255,215,0,0.8)` → `#FFD700` on hover
- Border: `1px solid rgba(255,215,0,0.2)` → `0.35` on hover
- Radius: 8px
- Padding: ~0.6rem 1.5rem
- The dominant button style — a gold-outlined "ghost" that fills with more gold on hover rather than flipping to a solid fill

**Copy Button (Inline)**
- Background: `rgba(255,215,0,0.06)` → `0.14` on hover
- Text: `rgba(255,215,0,0.85)` → full `#FFD700`
- Border: `1px solid rgba(255,215,0,0.18)`
- Radius: 4px, font: JetBrains Mono ~0.68rem weight 600
- Attached to install-command snippets

**Reset / Ghost**
- Background: transparent, Text: `#FFD700`
- Border: `1px solid rgba(255,215,0,0.25)`
- Hover fills with `rgba(255,215,0,0.08)`

### Cards & Containers
- Background: Card (`#0c0c16`) on dark
- Border: `1px solid rgba(255,255,255,0.05)` (neutral, low-alpha)
- Radius: 10px
- **3px gold left-accent strip** (`.cardAccent`) at 50% opacity → full opacity on hover — the signature card detail
- Hover: gold border (`rgba(255,215,0,0.15)`), lift (`translateY(-1px)`), and layered shadow `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.05)`
- Expanded/active: stronger gold border (`0.2`) and deeper shadow
- Entrance animation: `cardIn` — fade + 8px rise over 0.35s ease

### Inputs & Forms
- Background: `rgba(15,15,24,0.6)` (translucent Surface)
- Border: `1px solid rgba(255,215,0,0.12)`
- Radius: 10px
- Focus: gold border (`rgba(255,215,0,0.4)`) + soft gold ring `box-shadow: 0 0 0 3px rgba(255,215,0,0.06)`
- Placeholder: Warm Gray at 50% opacity
- Search icon and clear button tinted gold

### Navigation
- Navbar: translucent Void Black (`#07070dEE`) with `backdrop-filter: blur(12px)` and a `1px solid rgba(255,215,0,0.08)` bottom border
- Title: weight 600, `letter-spacing: -0.02em`
- Sticky control bars: `backdrop-filter: blur(16px) saturate(1.4)` over `rgba(7,7,13,0.85)`
- Active sidebar link: `rgba(255,215,0,0.08)` background + **3px gold left border** (padding compensated to avoid shift)
- Mobile sidebar: 85vw / max 360px, opaque `#0a0a14`, blurred backdrop

### Pills, Tags & Chips
- **Source pills**: rounded 20px, transparent → gold-tinted when active (`rgba(255,215,0,0.06)` bg, `rgba(255,215,0,0.3)` border, gold text)
- **Category/filter chips**: 3–4px radius, JetBrains Mono, gold-tinted (`rgba(255,215,0,0.04)` bg, gold text)
- **Platform pills**: the blue exception — `rgba(96,165,250,0.06)` bg, `rgba(96,165,250,0.8)` text, blue border
- **Count badges**: JetBrains Mono ~0.68rem on `rgba(255,255,255,0.05)`, pill radius 8px
- **Filter pills (collage)**: fully-rounded `999px`, transparent with emphasis-300 border, fills to inverted (white bg, dark text) when active

### Code & Terminal Figures
- Code blocks: `#0a0a12` background, `1px solid rgba(255,215,0,0.06)` border
- Terminal figures (`.docs-terminal-figure`): `#0a0a12`, 12px radius, gold-tinted border, centered, max 900px, with a Warm-Gray caption beneath
- Highlighted code line: `rgba(255,215,0,0.08)` background tint
- ASCII/text diagrams: ligatures off, `white-space: pre`, box-drawing-safe mono stack

### Distinctive Components
**Hero with Gold Glow** — centered hero (`max-width: 720px`) with a JetBrains Mono uppercase eyebrow (gold 50%, 0.15em tracking), a tight 3rem title in Hero White, a Warm-Gray subtitle, and a radial gold glow bleeding from behind. A `.heroAccent` span highlights numbers in full gold with tabular numerals.

**Stat Row** — horizontal cluster of stats, each a large JetBrains Mono value (1.6rem, weight 700, tabular) over a small uppercase mono label.

**Skills Catalog** — a sticky blurred control bar (search + source pills), a 260px sticky category sidebar with gold-rail active states and mono counts, and a responsive card grid (`minmax(340px, 1fr)`) of gold-accented cards with copy-to-install hints.

**User Stories Collage** — a CSS-columns masonry (4→3→2→1) of tiles with per-category accent strips, a gradient-text headline (purple→blue→green), and hover lift with a colored glow.

## 5. Layout Principles

### Spacing System
- Base: rem-driven, roughly an 8px rhythm (0.2rem, 0.35rem, 0.5rem, 0.75rem, 1rem, 1.25rem, 1.5rem, 2rem, 2.5rem, 4rem)
- Hero padding: `4rem 2rem 2.5rem` (desktop) → `2.5rem 1.25rem 1.75rem` (mobile)
- Card inner padding: ~1rem 1.15rem
- Section spacing: generous, anchored on `1.5rem`–`4rem` blocks

### Grid & Container
- Max content width: 1440px (catalog layout), 1280px (collage), 720px (hero text)
- Catalog: two-column `260px 1fr` grid (sidebar + content) collapsing to single column below 900px
- Card grid: `repeat(auto-fill, minmax(340px, 1fr))` → 300px on mid widths → single column on mobile
- Collage: CSS multi-column masonry (`column-count: 4`), not grid — for an organic, varied-height feel
- Docs: standard Docusaurus sidebar + content + TOC three-pane

### Whitespace Philosophy
- **Dense but breathing**: Content is information-rich (catalogs, stat rows, docs) yet kept legible by generous gaps between cards and sections — the density reads as "powerful," not "cluttered."
- **The dark void is the negative space**: The near-black background does the work of whitespace, letting gold-accented elements float and glow.
- **Sticky scaffolding**: Control bars and sidebars stay pinned, so the dense catalog stays navigable as you scroll.

### Border Radius Scale
- 3px: small mono tags, category buttons, filter chips
- 4–5px: copy buttons, install hints, small pills
- 6px: sidebar category items, mobile toggles
- 8px: primary buttons, count badges, load-more
- 10px: cards, search inputs
- 12px: terminal figures
- 14px: collage tiles, footer block
- 20px–999px: pills (source pills, filter pills)

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | Void Black, dot-grid only | Page background, body content |
| Surface (Level 1) | `#0f0f18`/`#0c0c16` + 1px low-alpha border | Cards, inputs, code blocks |
| Glass (Level 2) | `backdrop-filter: blur()` + translucent bg | Navbar, sticky control bars |
| Raised (Level 3) | Layered shadow `0 4px 24px rgba(0,0,0,0.3)` + gold ring `0 0 0 1px rgba(255,215,0,0.05)` | Card hover |
| Lifted (Level 4) | `0 8px 32px rgba(0,0,0,0.4)` + stronger gold ring + `translateY(-1px)` | Expanded/active cards |

**Shadow Philosophy**: Depth comes from three layered devices working together — (1) **background color steps** (void → surface → card), (2) **gold-tinted hairline borders** that brighten on interaction, and (3) **`backdrop-filter` blur** on floating chrome. True drop-shadows are deep and black (`rgba(0,0,0,0.3–0.4)`) and almost always paired with a faint gold ring (`0 0 0 1px rgba(255,215,0,0.05–0.08)`), so even shadows carry the brand color. On the dark canvas, a **brightening border** reads as elevation more than a shadow would.

## 7. Do's and Don'ts

### Do
- Treat dark mode as the primary canvas — design on Void Black (`#07070d`) first, derive light mode second
- Use Hermes Gold (`#FFD700`) as the single dominant accent; reach for low-alpha gold (`rgba(255,215,0,0.06–0.15)`) for borders and tints
- Use JetBrains Mono for eyebrows, stats, tags, counts, and commands — it is the brand voice, not decoration
- Use Inter for body and UI prose, DM Sans on marketing pages
- Add a 3px gold left-rail to mark active nav items and card accents
- Use UPPERCASE + 0.06–0.15em tracking on small mono labels
- Render hero titles in Hero White (`#fafaf6`) at weight 700 with `-0.04em` tracking and a radial gold glow
- Use `backdrop-filter: blur()` on navbars and sticky bars for glassy layering
- Pair drop-shadows with a faint gold ring so elevation stays on-brand
- Keep the faint gold dot-grid (`32px` tile, 2% opacity) as the background texture
- Use warm off-white (`#e8e4dc`) for body text, never pure white, to soften contrast

### Don't
- Don't use pure black (`#000`) or pure white (`#fff`) for large surfaces — the void is `#07070d` and text is `#e8e4dc`
- Don't use full-strength `#FFD700` for large text on white in light mode — switch to Dark Amber (`#8B6508`) for WCAG AA
- Don't use the gold as a solid fill on big elements — it's an outline/glow/tint color, with solid gold reserved for small accents and emphasis
- Don't introduce new accent hues; the only sanctioned secondary is Sky Blue (`#60a5fa`) for doc links/platform pills, and the purple→blue→green gradient is reserved for the User Stories headline
- Don't enable ligatures in ASCII/terminal diagrams — keep them off so box-drawing stays aligned
- Don't set monospace for body prose, or sans-serif for tags/commands — respect the mono/sans split
- Don't rely on heavy shadows alone for depth — use background steps and brightening gold borders
- Don't escalate heading weights past 600

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <900px | Catalog collapses to single column; sidebar becomes a fixed off-canvas drawer (`#0a0a14`, 280px) with a blurred backdrop and a toggle button; card grid → 1 column; hero title 3rem → 2rem |
| Docs Mobile | <996px | Larger menu touch targets (`0.6rem 0.75rem`); collapsible categories get bottom borders and clearer indentation; mobile sidebar 85vw / max 360px; navbar drops `backdrop-filter` while open (Docusaurus stacking-context fix) |
| Mid | 901–1100px | Card grid uses `minmax(300px, 1fr)` |
| Desktop | >1100px | Full two-column catalog (`260px 1fr`), `minmax(340px, 1fr)` card grid |
| Collage | 1200/850/560px | Masonry columns step 4 → 3 → 2 → 1 |

### Touch Targets
- Mobile menu links expand to `0.6–0.75rem` padding for comfortable tapping
- Pills, copy buttons, and toggles keep generous hit areas
- Off-canvas sidebar widens to 85vw on small screens

### Collapsing Strategy
- **Sidebar**: sticky desktop column → fixed off-canvas drawer with backdrop on mobile, opened via a `.sidebarToggle`
- **Card grid**: auto-fill 340px → 300px → single column
- **Hero**: padding and title size scale down; stat row gaps tighten (2.5rem → 1.5rem) and stat values shrink (1.6rem → 1.25rem)
- **Collage**: CSS column count steps down at each breakpoint
- **Control bar**: padding tightens on mobile while staying sticky

### Image / Texture Behavior
- The dot-grid background tiles infinitely at all sizes
- Terminal figures cap at 900px and center, scaling down fluidly
- Mermaid/SVG diagrams are `max-width: 100%`, height auto

## 9. Agent Prompt Guide

### Quick Color Reference
- Page Background (dark): "Void Black (#07070d)"
- Elevated Surface: "Surface (#0f0f18)" / "Card (#0c0c16)"
- Footer: "Footer Black (#050509)"
- Primary Accent: "Hermes Gold (#FFD700)"
- Accent Hover: "Amber Hover (#FFBF00)"
- Light-mode Accent: "Dark Amber (#8B6508)"
- Body Text: "Warm White (#e8e4dc)"
- Hero Text: "Hero White (#fafaf6)"
- Secondary Text: "Warm Gray (#9a968e)"
- Secondary Accent: "Sky Blue (#60a5fa)"
- Borders: "gold at low alpha — rgba(255,215,0,0.08)"
- Background Texture: "gold dot-grid — radial-gradient(rgba(255,215,0,0.02) 1px), 32px tile"

### Example Component Prompts
- "Create a hero on Void Black (#07070d) with a JetBrains Mono uppercase eyebrow (gold at 50%, letter-spacing 0.15em), a 3rem title in Hero White (#fafaf6) at weight 700 and -0.04em tracking, and a Warm Gray (#9a968e) subtitle. Add a soft radial gold glow `rgba(255,215,0,0.07)` bleeding from behind the title."
- "Design a catalog card: background #0c0c16, 1px solid rgba(255,255,255,0.05) border, 10px radius, with a 3px gold left-accent strip at 50% opacity. On hover, raise opacity to full, lift translateY(-1px), set border to rgba(255,215,0,0.15), and add shadow `0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,215,0,0.05)`."
- "Build a primary button as a gold ghost: background rgba(255,215,0,0.04), border 1px solid rgba(255,215,0,0.2), text rgba(255,215,0,0.8), 8px radius. On hover, deepen background to rgba(255,215,0,0.08), border to 0.35, and text to full #FFD700."
- "Create a search input: translucent Surface background rgba(15,15,24,0.6), 1px solid rgba(255,215,0,0.12) border, 10px radius. On focus, set border to rgba(255,215,0,0.4) and add a soft gold ring `box-shadow: 0 0 0 3px rgba(255,215,0,0.06)`."
- "Design a navbar: translucent Void Black (#07070dEE) with backdrop-filter blur(12px) and a 1px solid rgba(255,215,0,0.08) bottom border. Mark the active sidebar link with an rgba(255,215,0,0.08) background and a 3px gold (#FFD700) left border."
- "Build a stat row: each stat is a JetBrains Mono value at 1.6rem weight 700 with tabular-nums, above a JetBrains Mono uppercase label at 0.72rem with 0.06em tracking in Warm Gray (#9a968e)."
- "Tile the page background with a faint gold dot-grid: `background-image: radial-gradient(rgba(255,215,0,0.02) 1px, transparent 1px); background-size: 32px 32px;`"

### Iteration Guide
1. Start dark: build on Void Black (#07070d) with Warm White (#e8e4dc) text, then derive light mode using Dark Amber (#8B6508) for accents
2. Use gold deliberately — full `#FFD700` only for small accents/emphasis; everything structural is gold at 5–15% alpha
3. Keep the mono/sans split: JetBrains Mono for eyebrows, stats, tags, counts, commands; Inter (or DM Sans on marketing pages) for prose
4. Reach for borders + background steps + blur before shadows; when you do use a shadow, pair it with a faint gold ring
5. Add the 3px gold left-rail to signal "active" or "accented"
6. If a non-gold color is tempting, the only sanctioned options are Sky Blue (#60a5fa) for doc/platform links and the purple→blue→green gradient on the User Stories headline
