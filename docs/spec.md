# Valuation Platform — Product & Architecture Spec

## Why

Analysts and founders need a fast, multi-user, browser-based way to value a business or startup using a defensible DCF, without wrestling with Excel files emailed back and forth. v1 nails one method (DCF) end-to-end so the next iterations can add Comps, Precedent Transactions, and startup frameworks on top of a working platform.

## Target users

- **Corporate / M&A analysts** building DCF models on operating companies.
- **Startup founders & VCs** valuing pre/early-revenue companies — same DCF engine, different default assumptions, optional capital structure inputs.
- **Advisors** who want to share models with clients via a link instead of email attachments.

## v1 scope

| Capability | In v1 |
|---|---|
| DCF (Discounted Cash Flow) | yes |
| Trading Comps | no (placeholder card) |
| Precedent Transactions | no (placeholder card) |
| Berkus / Scorecard / VC method | no (placeholder cards) |
| Auth (email/password) | yes |
| Auth (Google OAuth) | wired, optional |
| Multi-tenant orgs + RLS | yes |
| Saved models | yes |
| Sensitivity analysis | yes (WACC × terminal growth) |
| Football-field chart | yes |
| Excel `.xlsx` export | yes |
| `.csv` export | yes |
| Excel `.xlsx` / `.csv` import | yes |
| Sharing (per-model + org) | yes |
| Real-time co-editing | no (save & reload only) |
| Financial-data APIs | no |
| PDF reports | no |

## Stack

- **Frontend**: React + Vite + TypeScript + Tailwind + shadcn/ui (Lovable `classic` stack).
- **Grid**: Handsontable CE (with HyperFormula). Fallback: `react-spreadsheet`.
- **State**: Zustand store per active model.
- **Charts**: Recharts.
- **Backend**: Supabase — auth + Postgres + RLS.
- **File I/O**: SheetJS (`xlsx`).
- **Numerics**: pure-TS DCF engine in `src/lib/dcf/`, Vitest unit tests.

## Routes

| Path | Description |
|---|---|
| `/` | Marketing landing — hero, three feature bullets, CTA to sign up. |
| `/login`, `/signup` | Supabase auth UI. |
| `/app` | Authenticated shell. Left sidebar = user's models. Top bar = brand + user menu. |
| `/app/models/new` | Picker — DCF card enabled, others marked "Coming soon". |
| `/app/models/:id` | DCF workspace (the core screen). |
| `/app/settings` | Profile + sharing stub. |

## DCF workspace

Three linked spreadsheet panels + a results panel.

**Assumptions (editable)** — two columns (Label, Value):
- Base year revenue
- Revenue growth Y1..Y5
- EBIT margin
- Tax rate
- D&A %
- Capex %
- ΔNWC %
- WACC
- Terminal growth
- Net debt
- Shares outstanding

**Projections (read-only, derived)** — columns Year 1..Year 5:
- Revenue
- EBIT
- NOPAT
- + D&A
- – Capex
- – ΔNWC
- FCF
- Discount factor
- PV of FCF

**Output panel**:
- Enterprise Value
- – Net Debt
- = Equity Value
- ÷ Shares Outstanding
- = Implied Share Price

Below the output: **Sensitivity heatmap** (5×5, WACC × terminal-growth) and a **Football-field chart** showing the implied share price range.

Toolbar: `Save`, `Import .xlsx/.csv`, `Export .xlsx`, `Export .csv`, inline-editable model name.

### Default seed assumptions

- Base revenue 100
- Growth Y1..Y5: 15 %, 12 %, 10 %, 8 %, 6 %
- EBIT margin 20 %, Tax 25 %
- D&A 5 %, Capex 6 %, ΔNWC 2 %
- WACC 10 %, Terminal growth 2.5 %
- Net debt 10, Shares 10

## DCF engine API

`src/lib/dcf/engine.ts` (pure TS, no React imports):

- `project(assumptions): Projection[]` — builds the yearly FCF schedule.
- `discount(projections, wacc): { pvFcf: number[]; sumPvFcf: number }`
- `terminalValue(lastFcf, wacc, g): { tv: number; pvTv: number }`
- `value(assumptions): DcfResult` — returns EV, equity, implied share price.
- `sensitivity(assumptions, waccGrid, gGrid): number[][]`

Formulas: see `docs/dcf-math.md`.

Tests in `src/lib/dcf/engine.test.ts` (Vitest):
- Textbook known-answer DCF case.
- Zero-growth edge case.
- Terminal growth ≥ WACC must throw.
- Negative FCF year.

## Excel / CSV I/O

`src/lib/io/xlsx.ts`:
- `exportModel(model): Blob` — workbook with sheets `Assumptions`, `Projections`, `Output`, `Sensitivity`.
- `importModel(file): Promise<ModelInput>` — reads the same shape leniently; surfaces typed validation errors for the UI.

## Data model (Supabase)

| Table | Columns |
|---|---|
| `profiles` | `id` (auth.uid PK), `display_name`, `default_org_id` |
| `organizations` | `id` PK, `name`, `owner_id` |
| `org_members` | `org_id`, `user_id`, `role` ∈ {`owner`,`editor`,`viewer`}, PK (org_id, user_id) |
| `valuation_models` | `id` PK, `org_id`, `owner_id`, `name`, `type` (default `dcf`), `assumptions` jsonb, `projections` jsonb, `result` jsonb, `updated_at` |
| `model_shares` | `model_id`, `user_id`, `permission` ∈ {`view`,`edit`}, PK (model_id, user_id) |

### RLS policies on `valuation_models`

- **SELECT**: `auth.uid() = owner_id` OR exists in `org_members` for that `org_id` OR exists in `model_shares` for that model.
- **INSERT**: requires `owner_id = auth.uid()`.
- **UPDATE / DELETE**: owner, or org `owner`/`editor`.

On first sign-in: a personal organization is auto-created with the user as owner, and `profiles.default_org_id` is set.

## Verification

1. **Engine math**: `npm test` passes — textbook DCF, zero-growth, terminal-growth guard, negative FCF.
2. **Auth + RLS**: Sign up as User A, create a model, sign in as User B → User A's models are not visible until shared.
3. **Workspace live recompute**: Edit Assumptions → Projections + Output update.
4. **Persistence**: Save model → reload page → values restored.
5. **Excel round-trip**: Export → reopen in Excel/LibreOffice → import into a fresh model → identical result.
6. **Sensitivity**: Monotonicity holds — higher WACC ⇒ lower value, higher g ⇒ higher value.

## Out of scope for v1 (explicitly deferred)

- Trading Comps, Precedent Transactions, Berkus, Scorecard, VC method (UI placeholders only).
- Financial-data APIs (yfinance / Polygon).
- PDF report generation.
- Real-time multi-cursor co-editing (Google-Docs style). v1 ships "save & reload".
