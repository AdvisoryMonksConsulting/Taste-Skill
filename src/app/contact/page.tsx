import type { Metadata } from "next";
import { SiteNav, SiteFooter } from "@/components/chrome";
import { site } from "@/lib/site";

const NAVY = "text-[#061C33]";
const NAVY_BG = "bg-[#061C33] hover:bg-[#0b2c52]";

export const metadata: Metadata = {
  title: "Contact — Veska",
  description: "Tell us about your project. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <main className="bg-white text-neutral-800">
      <SiteNav />
      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <h1 className={"text-4xl font-semibold tracking-tight " + NAVY}>Let&apos;s talk</h1>
          <p className="mt-4 text-lg text-neutral-600">Tell us about your product and what you need. We reply within one business day — usually with a free spec-demo of your page.</p>
          <div className="mt-8 space-y-3 text-neutral-700">
            <p>Email: <a href={`mailto:${site.email}`} className={"font-medium " + NAVY}>{site.email}</a></p>
            <p>Prefer to talk? <a href={site.calLink} target="_blank" rel="noopener" className={"font-medium " + NAVY}>Book a 15-min call →</a></p>
          </div>
        </div>

        {/* Posts to Formspree once site.formspree is set. action falls back to email otherwise. */}
        <form action={site.formspree} method="POST" className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-stripe">
          <div>
            <label className="block text-sm font-medium text-neutral-700" htmlFor="name">Name</label>
            <input id="name" name="name" required className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#061C33]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#061C33]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700" htmlFor="website">Your current website (optional)</label>
            <input id="website" name="website" className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#061C33]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700" htmlFor="message">What do you need?</label>
            <textarea id="message" name="message" rows={4} required className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#061C33]" />
          </div>
          <button type="submit" className={"w-full rounded-md px-5 py-2.5 text-sm font-medium text-white " + NAVY_BG}>Send message</button>
        </form>
      </section>
      <SiteFooter />
    </main>
  );
}
