import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/chrome";
import { site } from "@/lib/site";

const NAVY = "text-[#061C33]";
const NAVY_BG = "bg-[#061C33] hover:bg-[#0b2c52]";

export const metadata: Metadata = {
  title: "About — Veska",
  description:
    "Veska is a productized design studio (a brand of Advisory Monks Consulting) that designs, builds, and launches premium websites and landing pages for software and growth brands.",
};

const sections = [
  {
    h: "What we do",
    p: "We design, write, build, and launch high-converting websites and landing pages — strategy and copy through to development and go-live. Every project is bespoke (never templated), built on a modern stack (Next.js), deployed live on your domain, with on-page and technical SEO built in. The code is yours to keep.",
  },
  {
    h: "Who we work with",
    p: "Funded startups, SaaS and D2C brands, and established businesses that want a site worthy of a category leader. We work with clients across the US, UK, EU, Singapore, Australia, Africa, and India.",
  },
  {
    h: "How we work",
    p: "Productized and senior-led — you work directly with the people doing the work, not account managers. Fixed scope, fixed price, no open-ended invoices: book a call → brief & design → build → ship in 5 days. A 50% deposit reserves your slot; the balance is due on delivery, and final files and deploy access are released once payment clears.",
  },
  {
    h: "Why Veska",
    p: "Most businesses quietly lose customers to slow, dated websites. We pair world-class design taste with a fast, AI-accelerated build process — so you get the quality of a top studio at the speed of a freelancer, for a price you know up front.",
  },
];

export default function About() {
  return (
    <main className="bg-white text-neutral-800">
      <SiteNav />

      <section className="mx-auto max-w-3xl px-6 pt-16 pb-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#93a3b6]"><span className="text-[#c4cedb]">—&nbsp;&nbsp;</span>About</p>
        <h1 className="mt-6 font-serif text-4xl font-medium tracking-[-0.022em] text-[#16243a] sm:text-5xl">
          A design studio for brands that want to look like the leader.
        </h1>
        <p className="mt-6 text-lg text-neutral-600">
          {site.name} is a productized design studio — a brand of {site.legalEntity} — that designs, builds,
          and launches premium websites and landing pages for software and growth-focused brands.
          Fixed scope, fixed price, shipped in days.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-8">
        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className={"text-xl font-semibold " + NAVY}>{s.h}</h2>
              <p className="mt-2 text-neutral-600">{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 shadow-stripe">
          <h2 className={"text-lg font-semibold " + NAVY}>Veska + Advisory Monks Consulting</h2>
          <p className="mt-2 text-neutral-600">
            Veska is the design studio brand of {site.legalEntity}, an advisory firm. Engagements are
            contracted and invoiced (in USD) through {site.legalEntity}, giving clients the assurance of an
            established entity behind every project.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={site.calLink} target="_blank" rel="noopener" className={"rounded-md px-6 py-3 text-center text-sm font-medium text-white " + NAVY_BG}>Book a 15-min call</a>
            <Link href="/start" className="rounded-md border border-neutral-300 px-6 py-3 text-center text-sm font-medium hover:bg-white">Start a project</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
