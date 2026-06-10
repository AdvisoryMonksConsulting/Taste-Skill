import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/chrome";
import { RazorpayButton } from "@/components/razorpay-button";
import { site } from "@/lib/site";

const NAVY = "text-[#061C33]";
const NAVY_BG = "bg-[#061C33] hover:bg-[#0b2c52]";

export const metadata: Metadata = {
  title: "Start a project — Veska",
  description: "Book your slot, pay a 50% deposit, and we start building. Card via Razorpay, or Wise/PayPal for international clients.",
};

export default function StartPage() {
  return (
    <main className="bg-white text-neutral-800">
      <SiteNav />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-4xl font-medium tracking-[-0.018em] text-[#061C33] sm:text-5xl">Start a project</h1>
        <p className="mt-4 text-lg text-neutral-600">Two steps and we&apos;re building. Most projects start the same week.</p>

        <ol className="mt-10 space-y-8">
          <li className="flex gap-4">
            <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white " + NAVY_BG.split(" ")[0]}>1</span>
            <div>
              <h2 className={"text-lg font-semibold " + NAVY}>Book a 15-minute call</h2>
              <p className="mt-1 text-neutral-600">We&apos;ll confirm scope, timeline, and which package fits.</p>
              <a href={site.calLink} target="_blank" rel="noopener" className={"mt-3 inline-block rounded-md px-5 py-2.5 text-sm font-medium text-white " + NAVY_BG}>Pick a time →</a>
            </div>
          </li>
          <li className="flex gap-4">
            <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white " + NAVY_BG.split(" ")[0]}>2</span>
            <div className="w-full">
              <h2 className={"text-lg font-semibold " + NAVY}>Pay your 50% deposit</h2>
              <p className="mt-1 text-neutral-600">A 50% deposit locks your slot; the balance is due on delivery (and only once you&apos;re happy).</p>

              <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-stripe">
                <div className="text-sm font-medium text-neutral-500">Pay by card</div>
                {/* Renders once site.razorpayButtonId is set to a real pl_xxx */}
                <div className="mt-2"><RazorpayButton buttonId={site.razorpayButtonId} /></div>
                <p className="mt-2 text-xs text-neutral-400">International clients are invoiced in USD with secure card &amp; bank-transfer options — just request an invoice below.</p>

                <div className="mt-6 border-t border-neutral-200 pt-6">
                  <div className="text-sm font-medium text-neutral-500">Other ways to pay</div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a href={`mailto:${site.email}?subject=Deposit%20invoice%20request`} className={"rounded-md px-5 py-2.5 text-sm font-medium text-white " + NAVY_BG}>Request a USD invoice</a>
                    {!site.wiseLink.includes("REPLACE") && <a href={site.wiseLink} target="_blank" rel="noopener" className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:bg-white">Pay with Wise</a>}
                    {!site.paypalLink.includes("REPLACE") && <a href={site.paypalLink} target="_blank" rel="noopener" className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:bg-white">Pay with PayPal</a>}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ol>

        <div className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className={"text-lg font-semibold " + NAVY}>How billing works</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-600">
            <li>• <strong>Landing page / Site:</strong> 50% to start, 50% on delivery.</li>
            <li>• <strong>Larger projects:</strong> split into milestones — 40% to start, 30% at design sign-off, 30% on delivery.</li>
            <li>• <strong>Growth retainer:</strong> billed monthly in advance via Razorpay subscription (auto-pay) — cancel anytime with notice.</li>
            <li>• <strong>Final files &amp; deploy access are released once the final payment clears.</strong> You preview everything live before then.</li>
            <li>• Pay by card (Razorpay) or bank transfer (Wise / Payoneer). USD invoices issued from {site.legalEntity}.</li>
          </ul>
        </div>

        <p className="mt-10 text-sm text-neutral-500">
          Not ready to pay yet? <Link href="/contact" className={"font-medium " + NAVY}>Send us a message</Link> and we&apos;ll reply within a day.
        </p>
      </section>
      <SiteFooter />
    </main>
  );
}
