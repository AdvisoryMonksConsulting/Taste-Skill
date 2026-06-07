import type { Metadata } from "next";
import { LegalPage } from "@/components/chrome";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy — Veska" };

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 2026"
      intro={`${site.name} (a brand of ${site.legalEntity}) respects your privacy. This explains what we collect and how we use it.`}
      sections={[
        { h: "Information we collect", p: "Contact details you submit (name, email, message, website) when you use our contact form or email us; payment details processed by our payment providers; and basic, anonymous analytics about how the site is used." },
        { h: "How we use it", p: "To respond to your enquiry, deliver services, send invoices, and improve our site. We do not sell your personal data." },
        { h: "Third-party processors", p: "We use trusted providers who process data on our behalf: a form provider (e.g., Formspree) for contact submissions, payment providers (Razorpay, Wise, PayPal) for transactions, an analytics tool, and a hosting/CDN provider. Each handles data under its own privacy terms." },
        { h: "Cookies", p: "We use minimal cookies/local storage required for the site to function and for privacy-friendly analytics. You can block cookies in your browser." },
        { h: "Data retention", p: "We keep enquiry and project records only as long as needed for the relationship and legal/accounting obligations." },
        { h: "Your rights", p: `You may request access to, correction of, or deletion of your personal data by emailing ${site.email}.` },
        { h: "Contact", p: `Questions about privacy? Email ${site.email}.` },
      ]}
    />
  );
}
