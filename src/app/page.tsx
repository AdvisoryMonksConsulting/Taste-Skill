import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo, SiteFooter } from "@/components/chrome";
import { site } from "@/lib/site";
import { samples } from "../../templates/landing-page/samples";

const STUDIO = site.name;
const NAVY = "text-[#061C33]";
const NAVY_BG = "bg-[#061C33] hover:bg-[#0b2c52]";

export const metadata: Metadata = {
  title: "Veska — Premium landing pages for software brands",
  description:
    "A design studio that ships Stripe-grade landing pages in 5 days. Fixed scope, fixed price. See recent work.",
};

type Tier = { name: string; price: string; time: string; blurb: string; points: string[]; featured?: boolean; ctaLabel?: string; ctaHref?: string };
const tiers: Tier[] = [
  { name: "Launch", price: "$4,950", time: "5 days", blurb: "One high-converting landing page, designed, written, built, and deployed.", points: ["Conversion copywriting", "Custom design system", "Next.js + deployed", "1 revision round"] },
  { name: "Site", price: "$11,500", time: "10 days", blurb: "A full marketing site, custom-built around your brand and product.", points: ["Up to 5 pages", "Bespoke component system", "Light CMS wiring", "2 revision rounds"], featured: true },
  { name: "Growth", price: "$6–9k/mo", time: "ongoing", blurb: "Design + CRO on retainer — continuous pages, tests, and iteration. Auto-pay monthly via Razorpay.", points: ["2–4 pages / month", "A/B testing & CRO", "48h turnaround", "Auto-pay, cancel anytime"] },
  { name: "Custom", price: "Let's talk", time: "bespoke", blurb: "Bigger or unusual scope — web apps, multi-page builds, ongoing partnerships. Priced to your exact project.", points: ["Scoped to your goals", "Multi-page / web app", "Flexible engagement", "Tailored quote"], ctaLabel: "Discuss pricing", ctaHref: site.calLink },
];

const steps = [
  { n: "01", t: "Book a call", d: "A 15-minute call to understand your product, audience, and goal." },
  { n: "02", t: "Brief & design", d: "We write the copy and craft a custom design system for your brand." },
  { n: "03", t: "Build in Next.js", d: "Developed clean, deployed to a live preview you review." },
  { n: "04", t: "Ship in 5 days", d: "Launched and handed over — the code is yours to keep." },
];

// Sample testimonials — anonymised by industry. Swap in real, named quotes as you collect them.
const testimonials = [
  { quote: "The new page lifted our demo sign-ups noticeably in the first month — it finally feels premium.", name: "Founder", role: "B2B SaaS · seed-stage" },
  { quote: "Fastest turnaround I've had from any studio, and the quality was genuinely elite.", name: "Head of Growth", role: "Fintech" },
  { quote: "It finally looks like the category leader we're trying to become.", name: "Founder", role: "D2C skincare" },
];

const faqs = [
  { q: "How fast is delivery, really?", a: "A Launch landing page ships in 5 business days. Larger sites take 10. You'll see a live preview before final handoff." },
  { q: "Why fixed price instead of hourly?", a: "Scope is defined up front, so the price is too. No open-ended meters, no surprise invoices." },
  { q: "Do I own the code?", a: "Completely. We hand over a clean Next.js repo on delivery — it's yours forever." },
  { q: "Do you launch it, or just hand over files?", a: "We launch it. We deploy your site live and connect your domain — you get a working website, not a zip of HTML. On-page and technical SEO foundations (speed, meta, schema, sitemap, mobile) are built in." },
  { q: "Do you handle ongoing SEO?", a: "On-page SEO is included at build. Ongoing SEO (content, keywords, backlinks) and paid ads aren't part of the one-off — we offer them via a retainer or a trusted partner so you have one point of contact." },
  { q: "What about revisions?", a: "Launch includes one revision round; Site includes two. Need ongoing changes? The Growth retainer covers that." },
  { q: "How do payments work?", a: "50% deposit to book your slot, 50% on delivery. Pay by card via Razorpay, or by Wise/PayPal for international clients." },
  { q: "What if I'm not happy?", a: "The final 50% is only due once you're happy with the work. We'd rather fix it than bill it." },
];

export default function Home() {
  return (
    <main className="bg-white text-neutral-800">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          <a href="#work" className="text-sm text-neutral-600 hover:text-neutral-900">Work</a>
          <a href="#process" className="text-sm text-neutral-600 hover:text-neutral-900">Process</a>
          <a href="#pricing" className="text-sm text-neutral-600 hover:text-neutral-900">Pricing</a>
          <a href="#faq" className="text-sm text-neutral-600 hover:text-neutral-900">FAQ</a>
        </div>
        <a href={site.calLink} target="_blank" rel="noopener" className={"rounded-md px-4 py-2 text-sm font-medium text-white " + NAVY_BG}>Book a call</a>
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
              <a href={site.calLink} target="_blank" rel="noopener">Book a 15-min call</a>
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
            <p className={"text-sm font-semibold uppercase tracking-wide " + NAVY}>Selected work</p>
            <h2 className={"mt-3 text-3xl font-medium tracking-[-0.01em] sm:text-4xl " + NAVY}>Designed for the brand, never templated</h2>
            <p className="mt-3 text-neutral-600">A glimpse of the range we design — every project is built bespoke, from a blank canvas. Tap any to explore.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {samples.map((s) => (
              <Link key={s.slug} href={`/work/${s.slug}`} className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-stripe transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-1.5 border-b border-neutral-100 bg-neutral-50 px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /><span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /><span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/work/${s.slug}.png`} alt={`${s.label} — ${s.industry} landing page design`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <div className="flex items-baseline justify-between p-5">
                  <div><h3 className="text-base font-semibold text-neutral-900">{s.label}</h3><p className="mt-0.5 text-sm text-neutral-500">{s.industry}</p></div>
                  <span className={"text-sm font-medium " + s.brand.accentText}>View live →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className={"text-sm font-semibold uppercase tracking-wide " + NAVY}>How it works</p>
            <h2 className={"mt-3 text-3xl font-medium tracking-[-0.01em] sm:text-4xl " + NAVY}>From call to live in a week</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n}>
                <div className={"text-2xl font-semibold " + NAVY}>{s.n}</div>
                <h3 className="mt-3 font-semibold text-neutral-900">{s.t}</h3>
                <p className="mt-2 text-sm text-neutral-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials + logos */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={"mx-auto max-w-2xl text-center text-3xl font-medium tracking-[-0.01em] sm:text-4xl " + NAVY}>Teams ship faster with {STUDIO}</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.quote} className="flex flex-col justify-between rounded-2xl border border-neutral-200/70 bg-white p-8 shadow-stripe">
                <blockquote className="text-pretty text-neutral-800">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6"><div className={"font-semibold " + NAVY}>{t.name}</div><div className="text-sm text-neutral-500">{t.role}</div></figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
            {["Acme", "Globex", "Initech", "Umbrella", "Soylent"].map((l) => (
              <span key={l} className="text-lg font-semibold text-neutral-400">{l}</span>
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
            <p className="mt-3 text-neutral-600">Or a tailored quote for anything bigger — see the Custom option.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t) => {
              const href = t.ctaHref ?? "/start";
              const label = t.ctaLabel ?? "Get started";
              return (
                <div key={t.name} className={"flex flex-col rounded-2xl border p-7 shadow-stripe " + (t.featured ? "border-[#061C33]/25 bg-[#061C33]/[0.03] ring-1 ring-[#061C33]/15" : "border-neutral-200 bg-white")}>
                  <div className="flex items-baseline justify-between">
                    <h3 className={"text-lg font-semibold " + NAVY}>{t.name}</h3>
                    <span className="text-xs uppercase tracking-wide text-neutral-400">{t.time}</span>
                  </div>
                  <div className={"mt-4 text-3xl font-semibold tracking-[-0.01em] " + NAVY}>{t.price}</div>
                  <p className="mt-3 text-sm text-neutral-600">{t.blurb}</p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-neutral-700">{t.points.map((p) => (<li key={p}>• {p}</li>))}</ul>
                  <Button asChild className={"mt-8 w-full " + (t.featured ? NAVY_BG + " text-white" : "")} variant={t.featured ? "default" : "outline"}>
                    {href.startsWith("http") ? <a href={href} target="_blank" rel="noopener">{label}</a> : <Link href={href}>{label}</Link>}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-neutral-50 py-24">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <h2 className={"text-3xl font-medium tracking-[-0.01em] sm:text-4xl " + NAVY}>A studio, not an agency</h2>
          <div className="space-y-4 text-lg text-neutral-600">
            <p>{STUDIO} is a small, senior design studio. You work directly with the person doing the work — no account managers, no juniors, no hand-offs.</p>
            <p>We pair world-class design taste with a fast, AI-accelerated build process, so you get the quality of a top studio at the speed of a freelancer. A brand of {site.legalEntity}.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className={"text-center text-3xl font-medium tracking-[-0.01em] sm:text-4xl " + NAVY}>Frequently asked questions</h2>
          <div className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className={"flex cursor-pointer list-none items-center justify-between font-medium " + NAVY}>{f.q}<span className="ml-4 text-neutral-400 transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-[#061C33] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-light tracking-[-0.01em] text-white sm:text-4xl">Let&apos;s build yours.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-300">Tell us about your product. We&apos;ll send back a spec-demo of your new page — free.</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white px-8 text-[#061C33] hover:bg-neutral-100">
              <a href={site.calLink} target="_blank" rel="noopener">Book a 15-min call</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/start">Start a project</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
