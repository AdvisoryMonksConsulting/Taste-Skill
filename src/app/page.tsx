import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { samples } from "../../templates/landing-page/samples";

const STUDIO = "Veska";
const NAVY = "text-[#061C33]";
const NAVY_BG = "bg-[#061C33] hover:bg-[#0b2c52]";

export const metadata: Metadata = {
  title: "Veska — Premium landing pages for software brands",
  description:
    "A design studio that ships Stripe-grade landing pages in 5 days. Fixed scope, fixed price. See recent work.",
};

const tiers = [
  { name: "Launch", price: "$4,950", time: "5 days", blurb: "One high-converting landing page, designed, written, built, and deployed.", points: ["Conversion copywriting", "Custom design system", "Next.js + deployed", "1 revision round"] },
  { name: "Site", price: "$11,500", time: "10 days", blurb: "A full marketing site with a reusable component system your team can extend.", points: ["Up to 5 pages", "Reusable components", "Light CMS wiring", "2 revision rounds"], featured: true },
  { name: "Growth", price: "$6–9k/mo", time: "ongoing", blurb: "Design + CRO on retainer — continuous pages, tests, and iteration.", points: ["2–4 pages / month", "A/B testing & CRO", "48h turnaround", "Monthly review"] },
];

export default function Home() {
  return (
    <main className="bg-white text-neutral-800">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className={"text-lg font-semibold tracking-tight " + NAVY}>{STUDIO}</span>
        <div className="hidden items-center gap-8 md:flex">
          <a href="#work" className="text-sm text-neutral-600 hover:text-neutral-900">Work</a>
          <a href="#pricing" className="text-sm text-neutral-600 hover:text-neutral-900">Pricing</a>
        </div>
        <Button asChild className={NAVY_BG + " text-white"}>
          <a href="#contact">Book a call</a>
        </Button>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-neutral-200">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#061C33]/8 to-transparent blur-3xl" />
        <div className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center sm:pt-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm text-neutral-600">
            <span className="h-1.5 w-1.5 rounded-full bg-[#061C33]" />
            Productized design studio
          </div>
          <h1 className={"mx-auto max-w-3xl text-balance text-4xl font-light tracking-[-0.02em] sm:text-6xl " + NAVY}>
            Stripe-grade landing pages, shipped in 5 days.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-neutral-600">
            {STUDIO} designs, writes, and builds high-converting pages for software and D2C brands —
            fixed scope, fixed price, no open-ended invoices.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className={NAVY_BG + " px-8 text-white"}>
              <a href="#contact">Book a 15-min call</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#work">See our work ↓</a>
            </Button>
          </div>
          <p className="mt-4 text-sm text-neutral-500">Fixed price · 5-day delivery · Built in Next.js, yours to keep</p>
        </div>
      </section>

      {/* Work grid — 10 samples */}
      <section id="work" className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 max-w-2xl">
            <p className={"text-sm font-semibold uppercase tracking-wide " + NAVY}>Recent work</p>
            <h2 className={"mt-3 text-3xl font-medium tracking-[-0.01em] sm:text-4xl " + NAVY}>
              Ten things we can build for you
            </h2>
            <p className="mt-3 text-neutral-600">Every one is a live page built on our 5-day production system. Click any to explore.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {samples.map((s) => (
              <Link
                key={s.slug}
                href={`/work/${s.slug}`}
                className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-stripe transition-transform hover:-translate-y-1"
              >
                {/* faux browser */}
                <div className="flex items-center gap-1.5 border-b border-neutral-100 bg-neutral-50 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                </div>
                <div className={"h-1.5 " + s.brand.accent.split(" ")[0]} />
                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">{s.label}</h3>
                    <span className={"text-sm font-medium " + s.brand.accentText}>View live →</span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">{s.industry}</p>
                  <p className="mt-4 line-clamp-2 text-pretty text-neutral-700">
                    {s.headline} {s.headlineAccent}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className={"text-sm font-semibold uppercase tracking-wide " + NAVY}>Pricing</p>
            <h2 className={"mt-3 text-3xl font-medium tracking-[-0.01em] sm:text-4xl " + NAVY}>Fixed scope. Fixed price.</h2>
          </div>
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={
                  "flex flex-col rounded-2xl border p-8 shadow-stripe " +
                  (t.featured ? "border-[#061C33]/25 bg-[#061C33]/[0.03] ring-1 ring-[#061C33]/15" : "border-neutral-200 bg-white")
                }
              >
                <div className="flex items-baseline justify-between">
                  <h3 className={"text-lg font-semibold " + NAVY}>{t.name}</h3>
                  <span className="text-xs uppercase tracking-wide text-neutral-400">{t.time}</span>
                </div>
                <div className={"mt-4 text-3xl font-semibold tracking-[-0.01em] " + NAVY}>{t.price}</div>
                <p className="mt-3 text-sm text-neutral-600">{t.blurb}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-neutral-700">
                  {t.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
                <Button asChild className={"mt-8 w-full " + (t.featured ? NAVY_BG + " text-white" : "")} variant={t.featured ? "default" : "outline"}>
                  <a href="#contact">Get started</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-[#061C33] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-light tracking-[-0.01em] text-white sm:text-4xl">Let's build yours.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-300">
            Tell us about your product. We'll send back a spec-demo of your new page — free.
          </p>
          <Button asChild size="lg" className="mt-10 bg-white px-8 text-[#061C33] hover:bg-neutral-100">
            <a href="mailto:hello@veska.studio">Start the conversation →</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-neutral-500 sm:flex-row">
          <span className={"font-semibold " + NAVY}>{STUDIO}</span>
          <span>A brand of Advisory Monks Consulting · © {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
