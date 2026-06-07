import type { Metadata } from "next";
import { LegalPage } from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service — Veska" };

export default function Terms() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 2026"
      intro={`These terms govern design and development services provided by ${site.name}, a brand of ${site.legalEntity} ("we", "us"). By engaging us or paying a deposit, you agree to them.`}
      sections={[
        { h: "1. Services", p: "We provide design and front-end development services as described in the package or proposal agreed with you. Scope, deliverables, and timeline are confirmed in writing before work begins." },
        { h: "2. Payment", p: "Projects require a 50% deposit to reserve a slot and begin work. The remaining 50% is due on delivery. Retainers are billed monthly in advance. All prices are exclusive of applicable taxes. Payments are accepted via Razorpay, Wise, or PayPal." },
        { h: "3. Timelines", p: "Stated timelines (e.g., 5 business days for a Launch page) begin once we receive your deposit and the assets/brief needed to start. Delays in your feedback or materials extend the timeline accordingly." },
        { h: "4. Revisions", p: "Each package includes the number of revision rounds stated for it. Additional revisions or scope changes are quoted separately." },
        { h: "5. Intellectual property", p: "On receipt of full payment, ownership of the final deliverables transfers to you. Until then, all work remains our property. We may display non-confidential work in our portfolio unless you ask us not to." },
        { h: "6. Client responsibilities", p: "You are responsible for providing accurate content, timely feedback, and confirming you have rights to any materials you supply to us." },
        { h: "7. Cancellation", p: "Either party may cancel in writing. See our Refund & Cancellation policy for how deposits and work completed are handled." },
        { h: "8. Liability", p: "Our total liability for any claim is limited to the fees paid for the project in question. We are not liable for indirect or consequential losses." },
        { h: "9. Governing law", p: `These terms are governed by the laws of India. Questions? Email ${site.email}.` },
      ]}
    />
  );
}
