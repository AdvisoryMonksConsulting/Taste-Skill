# Iteration 4 — Trading Comparables + landing workspace mock

Paste the body below into the Lovable chat at
https://lovable.dev/projects/46baf6dc-2d64-4d6c-a5d9-d6c70de7d303

---

Iteration 4 — add **Trading Comparables** ("Comps") as the second valuation method, and replace the workspace screenshot placeholder on the landing with a credible inline mock.

Before changes: skim iter 3 (Share dialog, org switcher, marketing landing, "Shared with me" sidebar). Don't regress any of it.

## 1) Trading Comparables — new method

### Model definition

Add a second model type `comps` alongside the existing `dcf`. Reuse the `valuation_models` table; the `type` column already supports this.

Shape stored in `assumptions` jsonb for a comps model:

```ts
type CompsAssumptions = {
  // Target company financials (LTM)
  target: {
    revenue: number;
    ebitda: number;
    ebit: number;
    netIncome: number;
    netDebt: number;
    shares: number;
  };
  // Peer set — publicly traded comparables
  peers: Array<{
    ticker: string;
    name: string;
    marketCap: number;
    enterpriseValue: number;
    revenue: number;     // LTM
    ebitda: number;      // LTM
    ebit: number;        // LTM
    netIncome: number;   // LTM
    include: boolean;    // toggle to exclude an outlier without deleting
  }>;
};
```

Seed defaults: target = `{ revenue: 250, ebitda: 50, ebit: 35, netIncome: 22, netDebt: 30, shares: 20 }`, and 5 peers with plausible-looking values (use placeholder tickers like `PEERA..PEERE`).

### Engine

`src/lib/comps/engine.ts` (pure TS, no React imports). Export:

- `peerMultiples(peer): { evRevenue: number | null; evEbitda: number | null; evEbit: number | null; pe: number | null }` — `null` when denominator ≤ 0.
- `summarize(included: PeerMultiples[], stat: 'median' | 'mean'): MultipleSummary` — returns the stat per multiple over included peers, ignoring nulls.
- `value(assumptions): CompsResult` — uses median multiples by default. Returns implied EV and equity for each of the four multiples (EV/Revenue, EV/EBITDA, EV/EBIT, P/E), plus a per-method implied share price. Build `range = { low: min over methods, high: max, median: median }`.

Add Vitest tests in `src/lib/comps/engine.test.ts`:
- `peerMultiples` handles zero/negative EBITDA → null.
- `summarize` median correct on odd/even counts.
- `value` matches a hand-computed expected on a 3-peer fixture.
- Including/excluding a peer changes the result.

### Workspace UI — `/app/models/:id?type=comps`

Three panels stacked, similar feel to the DCF workspace:

1. **Peers grid** (editable). Columns: `Include` (checkbox), `Ticker`, `Name`, `Market Cap`, `EV`, `Revenue (LTM)`, `EBITDA (LTM)`, `EBIT (LTM)`, `Net Income (LTM)`. `Add peer` button below the grid. Per-row delete (X icon).
2. **Multiples grid** (computed, read-only). Columns: `Ticker`, `EV/Revenue`, `EV/EBITDA`, `EV/EBIT`, `P/E`. Two summary rows at the bottom: **Median (included)** and **Mean (included)**, both bolded.
3. **Target & Output panel**. Left half: editable target inputs (Revenue, EBITDA, EBIT, Net Income, Net Debt, Shares). Right half: implied valuation table — for each multiple (EV/Revenue, EV/EBITDA, EV/EBIT, P/E) show: applied multiple (median), implied EV, implied equity, implied share price. Below the table, an emerald **headline range** band: "Implied share price: $X – $Y (median $Z)".

A small **Football-field** chart underneath summarizes the per-method ranges as horizontal bars (one bar per method, plus the overall range).

Reuse the existing toolbar pattern: model name, Save, Import .xlsx/.csv, Export .xlsx, Export .csv, Share, "Last saved Xs ago".

### Picker

In `/app/models/new`, enable the **Trading Comps** card. The other placeholders (Precedent Transactions, Berkus, Scorecard, VC method) stay disabled with "Coming soon".

### Excel I/O for comps

Extend `src/lib/io/xlsx.ts` (or split into `src/lib/io/xlsx-dcf.ts` + `src/lib/io/xlsx-comps.ts`, your call):

- Export workbook sheets for a comps model: `Target`, `Peers`, `Multiples`, `Output`.
- Import reads `Target` + `Peers` leniently.
- Round-trip Vitest test.

### Sidebar

Show a small icon/label badge per model row indicating type (`DCF` or `Comps`) so the user can tell them apart at a glance.

## 2) Inline landing mock (replaces the workspace screenshot placeholder)

On `/`, replace the empty placeholder div with a credible **inline mock** of the DCF workspace built from divs + Tailwind (no real screenshot needed). It should evoke the actual product:

- A faux toolbar at the top (`Untitled DCF · Saved 2s ago · Save · Import · Export .xlsx · Share`).
- An **Assumptions** mini-grid (5–6 visible rows: Base revenue 100, Growth Y1 15%, EBIT margin 20%, WACC 10%, Terminal growth 2.5%).
- A **Projections** mini-grid (3 rows × 5 year columns: Revenue, FCF, PV of FCF — use the actual numbers from the seed DCF).
- An **Output** card to the right showing "Implied Share Price $23.66" in a big tabular figure.
- A 3×3 mini sensitivity heatmap with cool→warm cells.

Wrap the whole thing in a `rounded-xl border bg-card shadow-sm` container with a subtle browser-like top bar (three small dots). Make it responsive: on `< md` collapse to a stacked single-column version.

Keep the actual `/public/landing/workspace.png` path available; if that file later exists (size > 0), prefer rendering the image over the inline mock. Use a simple `useEffect` `fetch(..., { method: 'HEAD' })` to detect it once on mount.

## 3) Small polish

- On the sidebar empty state, show "Create your first model" + the picker entry point.
- DCF and Comps model rows in the sidebar both show last-updated relative time.
- Sort sidebar by `updated_at desc` (most recently edited first).

## Acceptance

- Create a Comps model from the picker → land on workspace → edit a peer's EBITDA → multiples and implied share price update live.
- Toggle `Include` off on one peer → median multiples shift; implied valuation updates.
- Export `.xlsx` for a comps model, re-import into a fresh model → identical assumptions.
- `npm test` (Vitest) — all engine tests (DCF + Comps + xlsx round-trip) pass.
- The landing inline workspace mock renders cleanly on desktop and mobile; no overflow, no console errors.
- Sidebar shows a `DCF` / `Comps` type badge on each model row.
