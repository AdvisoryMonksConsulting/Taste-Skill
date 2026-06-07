import type { Metadata } from "next";
import { LegalPage } from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund & Cancellation Policy — Veska" };

export default function Refund() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      updated="June 2026"
      intro={`This policy explains how deposits, cancellations, and refunds work for ${site.name} (a brand of ${site.legalEntity}).`}
      sections={[
        { h: "Deposits", p: "A 50% deposit reserves your project slot and covers initial discovery and design work. Because we hold time for your project and begin work immediately, deposits are non-refundable once work has started." },
        { h: "Before work starts", p: "If you cancel before any work has begun, you may request a full refund of your deposit, processed to the original payment method." },
        { h: "After delivery", p: "The final 50% is due on delivery and is payable once the agreed deliverables are complete. We will work with you to resolve reasonable issues within the included revision rounds before the balance is due." },
        { h: "Retainers", p: "Monthly retainers can be cancelled with notice as stated in your agreement. Fees for the current paid month are non-refundable; you keep all work delivered in that month." },
        { h: "How refunds are issued", p: "Approved refunds are processed back to the original payment method (Razorpay/Wise/PayPal) and typically settle within 5–10 business days, depending on the provider and your bank." },
        { h: "Contact", p: `To request a cancellation or refund, email ${site.email} with your project details.` },
      ]}
    />
  );
}
