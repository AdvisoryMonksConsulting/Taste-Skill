---
name: lndev-pages
description: >-
  Browse and install full-page UI templates from lndev's pages collection at
  bk.lndev.me/pages — production-ready Next.js + shadcn/ui + Tailwind layouts by
  Leonel Ngoya (LN). Use when scaffolding a new page, dashboard, app screen, or
  landing/marketing page and you want a high-taste, copy-pasteable starting
  layout via the shadcn registry instead of building from a blank file. Also the
  entry point to LN's wider ecosystem (square-ui layouts, lndev/ui components,
  animated icons), which all install the same way.
---

# lndev pages (bk.lndev.me/pages)

A curated collection of **full-page UI templates** by **Leonel Ngoya** ("LN",
GitHub `ln-dev7`, org `lndev-ui`, handles `@ln_dev7` / `@lndevui`). The pages are
built to be **copied or installed** into a project and used as a high-quality
starting layout, in the same spirit as shadcn/ui's official `blocks`.

This skill tells you what the collection is, when to reach for it, and the exact
workflow to pull a page into the current project.

## What it is

- **Source:** `https://bk.lndev.me/pages` — a gallery of complete page layouts.
- **Author:** Leonel Ngoya (LN), a frontend developer / Awwwards Young Jury from
  Cameroon. Known for taste-forward, clean shadcn/ui work.
- **Tech stack (must match the target project):**
  - **Next.js** (App Router) + **React** + **TypeScript**
  - **Tailwind CSS** for styling
  - **shadcn/ui** primitives (Radix under the hood)
  - Some layouts use **Framer Motion** for interactions/animations
- **Model:** mostly **open-source / free**; LN also ships a paid tier
  (`pro.lndevui.com` / Square UI Pro). Treat anything you install as a
  **community registry** — review the code before adding it (see Safety).

### Sibling resources (same author, same install model)
- `square.lndev.me` — **Square UI**: 22+ app layouts (dashboards, task
  management, chat, emails, calendar, files, maps…). Registry items historically
  at `https://square.lndev.me/registry/{name}.json`.
- `ui.lndev.me` — **lndev/ui**: small, well-coded React components
  (animations, micro-interactions).
- `icons.lndev.me` — animated icon registry.

## When to use this skill

Reach for it when the user wants to **build or scaffold a page** and would
benefit from a polished, opinionated layout rather than assembling sections by
hand — e.g. "make me a dashboard," "I need a landing page," "scaffold a settings
screen." It is a **build accelerator**, not a runtime dependency.

Do **not** use it when the project isn't a Tailwind + shadcn/ui codebase, or when
the user explicitly wants a from-scratch / framework-specific implementation.

## How to use it

### 1. Confirm compatibility first
The pages assume **shadcn/ui + Tailwind**. Verify the target repo has them
(`components.json` present, Tailwind configured). If not, set shadcn up first
(`npx shadcn@latest init`) or fall back to building manually.

### 2. Browse the collection
Open `https://bk.lndev.me/pages` and pick a page. Each item in an lndev gallery
exposes a **copyable install command** and/or a registry JSON URL — use whatever
the page shows; that is the source of truth.

> Note: the exact registry base URL for `bk` is not hardcoded here on purpose —
> confirm it from the page itself. Based on LN's other projects it will be one of:
> - `npx shadcn@latest add https://bk.lndev.me/r/{name}.json`  (current shadcn `/r/` convention), or
> - `npx shadcn@latest add https://bk.lndev.me/registry/{name}.json`  (the pattern Square UI used).

### 3. Install via the shadcn registry
Always dry-run first to see what lands, then install:

```bash
# preview without writing files
npx shadcn@latest add <exact-registry-url-from-the-page> --dry-run

# install
npx shadcn@latest add <exact-registry-url-from-the-page>
```

This pulls the page's components, dependencies, and any required files into the
project following the repo's `components.json` aliases.

### 4. Integrate
Wire the installed page into a route (e.g. an App Router `page.tsx`), replace
placeholder copy/data with the project's real content, and reconcile design
tokens (colors, fonts, radius) with the project's Tailwind theme so it matches
the surrounding app.

## Safety & attribution

- **Review before installing.** Community registries run/import third-party code.
  Inspect the dry-run output and the fetched files before committing.
- **Pin what you add.** Registry contents can change upstream; once installed,
  the code lives in the repo — treat it as owned project code from then on.
- **Credit the author** where appropriate. LN's open-source work is generously
  shared; keep license headers and attribute when a layout is used substantially.

## Verification note (read me)

The exact **page list** and **registry URL** in this skill were **not fetched
directly** — `bk.lndev.me` (and the whole `lndev.me` zone) blocks automated
clients with HTTP 403, and the `/pages` collection is not yet search-indexed or
in a public GitHub repo. Everything above about the author, stack, and install
model is verified from LN's other live projects (`square-ui`, `ui.lndev.me`,
GitHub `ln-dev7` / `lndev-ui`). **Before acting, open `bk.lndev.me/pages` in a
real browser to read the current page names and the exact install command shown
on each item**, then follow the workflow above.
