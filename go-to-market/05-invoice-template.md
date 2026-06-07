# USD Invoice Template (Zoho Books-ready)

For exporting design/dev services from India to foreign clients. Copy into Zoho Books (or any
invoicing tool). Replace `[ ]` fields. Keep currency = **USD**. Issue under your LUT so no IGST is charged.

> You're a CA — treat the GST/FEMA wording below as a fill-in template, not advice. Confirm your
> current LUT/HSN/SAC details.

---

```
                                   INVOICE

Advisory Monks Consulting  (brand: Veska)
[Address line 1], [City], [State] [PIN], India
GSTIN: [your GSTIN]      PAN: [your PAN]
Email: hello@veskadesign.com      Web: veskadesign.com

Invoice No:  VSK-[YYYY]-[001]            Invoice Date: [DD-Mon-YYYY]
Due Date:    [DD-Mon-YYYY]               Currency:     USD

BILL TO
[Client legal name]
[Client address], [City], [Country]
[Client email]

-------------------------------------------------------------------------------
# | Description                                              | Qty |   Amount (USD)
-------------------------------------------------------------------------------
1 | Landing page design & development — [Project name]       |  1  |   4,950.00
  |   (Deposit 50% / Balance 50%)  — this invoice: [Deposit] |     |   2,475.00
-------------------------------------------------------------------------------
                                              Subtotal (USD)  |   2,475.00
                                              IGST            |       0.00
                                              TOTAL DUE (USD) |   2,475.00
-------------------------------------------------------------------------------

Notes
- Export of service. Supply meant for export under LUT — no IGST charged
  (LUT ARN: [your LUT ARN]).  SAC: 998314 (IT design & development services).
- 50% deposit is due to begin work; balance due on delivery. Final files, source
  code, and deploy access are released once full payment is received.
- Please reference Invoice No. VSK-[YYYY]-[001] with your payment.

PAYMENT OPTIONS (pick one)
1) Card / UPI (instant):  [Razorpay payment link]
2) Bank transfer — USD via Wise:
      Account name: [name] | Account/Routing (ACH) or IBAN: [details]
      (UK clients: Sort code + Acc no | EU: IBAN)
3) Payoneer:  [your Payoneer receiving account / request link]
4) PayPal (fees may apply):  [paypal.me link]

On receipt we issue a FIRA/FIRC for your records.
Thank you — Veska, a brand of Advisory Monks Consulting.
```

---

## Milestone variants
- **Standard:** 50% deposit invoice → 50% balance invoice on delivery.
- **Larger project:** 40% start → 30% at design sign-off → 30% on delivery (three invoices).
- **Growth retainer:** monthly invoice in advance; set up **Razorpay subscription (auto-pay)** so it bills automatically.

## Getting-paid checklist (per invoice)
- [ ] Currency USD, LUT note + SAC 998314 included
- [ ] Deposit invoice sent before work starts; work begins only after it clears
- [ ] Balance invoice sent on delivery; **release files/deploy only after it clears**
- [ ] Multiple pay options on the invoice (Razorpay link + Wise + Payoneer)
- [ ] Auto-reminders enabled in Zoho Books
- [ ] Collect **FIRA/FIRC** for each inward payment (Wise/Payoneer/Razorpay issue eFIRA)
