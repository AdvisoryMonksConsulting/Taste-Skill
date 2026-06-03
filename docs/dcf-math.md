# DCF math reference

The formulas implemented by `src/lib/dcf/engine.ts`. Notation: lowercase symbols are scalars, uppercase are series indexed by year `t ∈ {1..N}` (default N = 5).

## Inputs (Assumptions)

| Symbol | Meaning |
|---|---|
| `r₀` | Base year revenue |
| `gₜ` | Revenue growth rate in year `t` |
| `m_ebit` | EBIT margin |
| `τ` | Tax rate |
| `δ_da` | D&A as % of revenue |
| `δ_cx` | Capex as % of revenue |
| `δ_nwc` | ΔNWC as % of revenue |
| `wacc` | Weighted-average cost of capital |
| `g_term` | Terminal growth rate |
| `D` | Net debt |
| `S` | Shares outstanding |

## Projections (per year `t`)

```
Revenueₜ   = Revenueₜ₋₁ × (1 + gₜ)
EBITₜ      = Revenueₜ × m_ebit
NOPATₜ     = EBITₜ × (1 − τ)
D&Aₜ       = Revenueₜ × δ_da
Capexₜ     = Revenueₜ × δ_cx
ΔNWCₜ      = Revenueₜ × δ_nwc
FCFₜ       = NOPATₜ + D&Aₜ − Capexₜ − ΔNWCₜ
DiscFactₜ  = 1 / (1 + wacc)^t
PV(FCFₜ)   = FCFₜ × DiscFactₜ
```

## Terminal value (Gordon growth)

Computed at the end of year `N` using `FCF_{N+1} = FCF_N × (1 + g_term)`.

```
TV       = FCF_N × (1 + g_term) / (wacc − g_term)
PV(TV)   = TV / (1 + wacc)^N
```

**Guard**: `g_term ≥ wacc` is undefined for the Gordon formula. The engine throws if violated.

## Enterprise value, equity, share price

```
EV               = Σ PV(FCFₜ) + PV(TV)
EquityValue      = EV − D
ImpliedShare     = EquityValue / S
```

## Sensitivity

The sensitivity grid is a 2-D table of implied share prices over a `wacc × g_term` grid (default 5×5, centered on the model's wacc and g_term). Each cell re-runs the `value()` function with the cell's `(wacc, g_term)` substituted; everything else is held constant.

```
sensitivity[i][j] = value({...assumptions, wacc: waccGrid[i], gTerm: gGrid[j]}).impliedShare
```

Cells where `g_term ≥ wacc` are returned as `null` (the UI renders them as blanks).

## Football-field chart

Inputs: the flattened, sorted sensitivity grid. The chart shows:
- Min implied share price (low end of the bar)
- Max implied share price (high end of the bar)
- Median (vertical tick)
- Current `value()` (highlighted marker)

This gives a quick "range of reasonable outcomes" view.

## Worked example (used by the engine test)

Inputs: `r₀ = 100`, `g = [0.15, 0.12, 0.10, 0.08, 0.06]`, `m_ebit = 0.20`, `τ = 0.25`, `δ_da = 0.05`, `δ_cx = 0.06`, `δ_nwc = 0.02`, `wacc = 0.10`, `g_term = 0.025`, `D = 10`, `S = 10`.

Expected outputs (rounded):

| Year | Revenue | EBIT | NOPAT | FCF |
|---|---|---|---|---|
| 1 | 115.00 | 23.00 | 17.25 | 14.95 |
| 2 | 128.80 | 25.76 | 19.32 | 16.74 |
| 3 | 141.68 | 28.34 | 21.25 | 18.42 |
| 4 | 153.01 | 30.60 | 22.95 | 19.89 |
| 5 | 162.19 | 32.44 | 24.33 | 21.08 |

`Σ PV(FCF) ≈ 67.85`, `TV ≈ 287.94`, `PV(TV) ≈ 178.79`, `EV ≈ 246.64`, Equity ≈ 236.64, Implied share ≈ 23.66.

(Exact figures fall out of the engine — the test asserts to within rounding tolerance.)
