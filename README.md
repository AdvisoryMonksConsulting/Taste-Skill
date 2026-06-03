# Valuation Platform

A multi-tenant web app for **business** and **startup** valuation. v1 ships **DCF (Discounted Cash Flow)** with a spreadsheet-style workspace, sensitivity analysis, and Excel/CSV import/export.

The web app is built and hosted on **Lovable** (React + Vite + TypeScript + Tailwind + shadcn/ui, with Supabase for auth and database). This repo holds the product spec, math docs, and a pointer to the live Lovable project.

## Links

- **Lovable editor**: https://lovable.dev/projects/46baf6dc-2d64-4d6c-a5d9-d6c70de7d303
- **Live preview**: https://id-preview--46baf6dc-2d64-4d6c-a5d9-d6c70de7d303.lovable.app
- **Lovable project name**: Valuation Studio

## What's in v1

- **Auth + multi-tenant**: Supabase email/password (Google OAuth wired but optional). Each user is auto-assigned a personal organization on first sign-in. Models are scoped by organization with row-level security.
- **DCF workspace**: three linked spreadsheet panels (Assumptions, Projections, Output) that recompute live.
- **Saved models**: each model persists assumptions, projections, and results to Supabase Postgres.
- **Sensitivity**: 5×5 WACC × terminal-growth heatmap and a "football-field" range chart.
- **Excel / CSV I/O**: round-trip export and import via SheetJS.
- **Sharing**: invite teammates within an org; explicit per-model shares.

## What's deferred

See `docs/spec.md` § "Out of scope for v1". Short list: Trading Comps, Precedent Transactions, Berkus / Scorecard / VC method, financial-data APIs, PDF reports, real-time multi-cursor collab.

## Docs

- `docs/spec.md` — full product + architecture spec.
- `docs/dcf-math.md` — the DCF formulas the engine implements, for analyst reference.

## Development

All code lives in the Lovable project (linked above). To iterate:

1. Open the Lovable editor URL.
2. Use chat to describe changes ("Add an Export PDF button to the workspace toolbar…").
3. The preview at the live URL rebuilds automatically.

To run the app locally instead, clone the Lovable project's Git repo (Lovable → Settings → GitHub), then:

```bash
npm install
cp .env.example .env  # paste Supabase URL + anon key
npm run dev
npm test              # runs the DCF engine unit tests
```
