import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { samples } from "../../templates/landing-page/samples";

const STUDIO = site.name;

export const metadata: Metadata = {
  title: "Veska — Premium landing pages for software brands",
  description:
    "A design studio that ships Stripe-grade landing pages in 5 days. Fixed scope, fixed price. See recent work.",
};

type Tier = { name: string; price: string; sub?: string; time: string; blurb: string; points: string[]; featured?: boolean; ctaLabel?: string; ctaHref?: string };
const tiers: Tier[] = [
  { name: "Launch", price: "$4,950", time: "5 days", blurb: "One high-converting landing page, designed, written, built, and deployed.", points: ["Conversion copywriting", "Custom design system", "Next.js + deployed", "1 revision round"] },
  { name: "Site", price: "$11,500", time: "10 days", blurb: "A full marketing site, custom-built around your brand and product.", points: ["Up to 5 pages", "Bespoke component system", "Light CMS wiring", "2 revision rounds"], featured: true },
  { name: "Growth", price: "$6–9k", sub: "/mo", time: "ongoing", blurb: "Design + CRO on retainer — continuous pages, tests, and iteration.", points: ["2–4 pages / month", "A/B testing & CRO", "48h turnaround", "Auto-pay, cancel anytime"] },
  { name: "Custom", price: "Let's talk", time: "bespoke", blurb: "Bigger or unusual scope — web apps, multi-page builds, ongoing partnerships.", points: ["Scoped to your goals", "Multi-page / web app", "Flexible engagement", "Tailored quote"], ctaLabel: "Discuss pricing", ctaHref: site.calLink },
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

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export default function Home() {
  return (
    <main className="bg-white font-sans text-neutral-800">
      {/* ============ HERO (navy) ============ */}
      <section className="relative overflow-hidden bg-[#061C33] text-white">
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] z-0 h-[680px] w-[680px] rounded-full bg-[radial-gradient(circle,rgba(12,43,74,0.9),transparent_62%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          {/* nav */}
          <nav className="flex items-center justify-between py-6">
            <Link href="/" className="block leading-tight">
              <span className="flex items-center gap-2.5">
                <span className="relative inline-block h-7 w-7 rounded-lg bg-white"><span className="absolute inset-2 rounded-[3px] bg-[#061C33]" /></span>
                <span className="block text-lg font-bold tracking-[0.16em]">{STUDIO.toUpperCase()}</span>
              </span>
              <span className="mt-1 block pl-[38px] text-[10px] tracking-wide text-[#9bb4cf]">by {site.legalEntity}</span>
            </Link>
            <div className="hidden items-center gap-8 text-sm text-[#c4d3e4] md:flex">
              {navLinks.map((l) => (
                <a key={l.label} href={l.href} className="transition-colors hover:text-white">{l.label}</a>
              ))}
            </div>
            <a href={site.calLink} target="_blank" rel="noopener" className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#061C33] transition-colors hover:bg-neutral-100">Book a call</a>
          </nav>

          {/* hero content */}
          <div className="grid items-center gap-12 pb-24 pt-14 lg:grid-cols-[1.06fr_0.94fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9bb4cf]">Productized design studio · 5-day delivery</p>
              <h1 className="mt-5 font-serif text-5xl font-medium leading-[1.04] tracking-[-0.018em] sm:text-6xl">
                Stripe-grade landing pages, shipped in <em className="italic text-[#cfe0f3]">five days.</em>
              </h1>
              <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-[#c4d3e4]">
                {STUDIO} designs, writes, and builds high-converting pages for software and D2C brands — fixed scope, fixed price, no open-ended invoices.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="bg-white px-7 text-[#061C33] hover:bg-neutral-100">
                  <a href={site.calLink} target="_blank" rel="noopener">Book a 15-min call</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  <a href="#work">See our work →</a>
                </Button>
              </div>
              <p className="mt-8 text-sm text-[#8fa8c4]">Fixed price · 5-day delivery · Built in Next.js, yours to keep</p>
            </div>

            {/* browser mockup */}
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
              <div className="flex h-8 items-center gap-1.5 bg-[#10243c] px-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="bg-[#fbfaf7] p-6 text-[#2e2620]">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold tracking-[0.16em]">LUMÉ</span>
                  <span className="rounded-md bg-[#f6e7df] px-2.5 py-1 font-semibold text-[#b76e54]">Book now</span>
                </div>
                <h3 className="mt-5 font-serif text-3xl font-medium leading-tight">Skin, considered.</h3>
                <p className="mt-2.5 max-w-[34ch] text-[11.5px] leading-relaxed text-[#8a7d72]">Clinically-proven botanicals in refillable glass. Built for the brand, never templated.</p>
                <span className="mt-4 inline-block rounded-lg bg-[#b76e54] px-4 py-2 text-[11px] font-semibold text-white">Shop the ritual →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="bg-[#04111f] py-5 text-[#7f99b5]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="text-sm">Trusted by founders across the UK · US · Singapore · Gulf</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 opacity-70">
            {["Acme", "Globex", "Initech", "Umbrella", "Soylent"].map((l) => (
              <span key={l} className="text-[15px] font-bold tracking-wide text-[#b9c8da]">{l}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORK ============ */}
      <section id="work" className="bg-[#f6f8fa] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b08a3e]">Selected work</p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.015em] text-[#0b1726]">Designed for the brand, never templated.</h2>
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

      {/* ============ PROCESS (navy) ============ */}
      <section id="process" className="bg-[#061C33] py-24 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#cfe0f3]">How it works</p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.015em]">From call to live in a week.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="border-t-2 border-white/15 pt-5">
                <div className="font-serif text-4xl text-[#c9a96a]">{s.n}</div>
                <h3 className="mt-3 font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9fb4cf]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="bg-[#f6f8fa] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b08a3e]">Pricing</p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.015em] text-[#0b1726]">Fixed scope. Fixed price.</h2>
            <p className="mt-3 text-neutral-600">Or a tailored quote for anything bigger — see the Custom option.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t) => {
              const href = t.ctaHref ?? "/start";
              const label = t.ctaLabel ?? "Get started";
              return (
                <div key={t.name} className={"relative flex flex-col rounded-2xl border bg-white p-7 shadow-stripe " + (t.featured ? "border-2 border-[#061C33] shadow-[0_18px_40px_rgba(6,28,51,0.12)]" : "border-neutral-200")}>
                  {t.featured && <span className="absolute -top-3 left-6 rounded-full bg-[#061C33] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">Most popular</span>}
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-base font-bold tracking-wide text-[#0b1726]">{t.name}</h3>
                    <span className="text-xs uppercase tracking-wide text-neutral-400">{t.time}</span>
                  </div>
                  <div className="mt-4 font-serif text-4xl text-[#0b1726]">{t.price}{t.sub && <span className="text-base text-neutral-500">{t.sub}</span>}</div>
                  <p className="mt-3 text-sm text-neutral-600">{t.blurb}</p>
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {t.points.map((p) => (
                      <li key={p} className="relative pl-5 text-sm leading-snug text-neutral-600"><span className="absolute left-0 font-bold text-[#c9a96a]">✓</span>{p}</li>
                    ))}
                  </ul>
                  <Button asChild className={"mt-8 w-full " + (t.featured ? "bg-[#061C33] text-white hover:bg-[#0b2c52]" : "")} variant={t.featured ? "default" : "outline"}>
                    {href.startsWith("http") ? <a href={href} target="_blank" rel="noopener">{label}</a> : <Link href={href}>{label}</Link>}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b08a3e]">Teams ship faster with {STUDIO}</p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-[-0.015em] text-[#0b1726]">Premium, on a deadline.</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.quote} className="flex flex-col rounded-2xl border border-neutral-200/70 bg-[#f6f8fa] p-8">
                <span className="font-serif text-5xl leading-[0.5] text-[#c9a96a]">&ldquo;</span>
                <blockquote className="mt-4 font-serif text-lg leading-relaxed text-[#0b1726]">{t.quote}</blockquote>
                <figcaption className="mt-6"><div className="font-semibold text-[#0b1726]">{t.name}</div><div className="text-sm text-neutral-500">{t.role}</div></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="bg-[#f6f8fa] py-24">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <h2 className="font-serif text-4xl font-medium tracking-[-0.015em] text-[#0b1726]">A studio, not an agency.</h2>
          <div className="space-y-4 text-lg leading-relaxed text-neutral-600">
            <p>{STUDIO} is a small, senior design studio. You work directly with the person doing the work — no account managers, no juniors, no hand-offs.</p>
            <p>We pair world-class design taste with a fast, AI-accelerated build process, so you get the quality of a top studio at the speed of a freelancer. A brand of {site.legalEntity}.</p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="bg-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-serif text-4xl font-medium tracking-[-0.015em] text-[#0b1726]">Frequently asked questions</h2>
          <div className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#0b1726]">{f.q}<span className="ml-4 text-[#c9a96a] transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA (navy) ============ */}
      <section id="contact" className="bg-[radial-gradient(120%_130%_at_50%_-20%,#0c2b4a,#061C33_60%)] py-24 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9bb4cf]">A studio, not an agency</p>
          <h2 className="mt-4 font-serif text-5xl font-medium tracking-[-0.02em]">Let&apos;s build yours.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-[#c4d3e4]">Tell us about your product. We&apos;ll send back a spec-demo of your new page — free.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-white px-8 text-[#061C33] hover:bg-neutral-100">
              <a href={site.calLink} target="_blank" rel="noopener">Book a 15-min call</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link href="/start">Start a project</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============ FOOTER (navy) ============ */}
      <footer className="bg-[#04111f] py-12 text-[#8fa8c4]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-6 border-b border-white/10 pb-7 sm:flex-row sm:items-start sm:justify-between">
            <Link href="/" className="block leading-tight">
              <span className="flex items-center gap-2.5">
                <span className="relative inline-block h-6 w-6 rounded-md bg-white"><span className="absolute inset-[6px] rounded-[2px] bg-[#04111f]" /></span>
                <span className="block text-base font-bold tracking-[0.16em] text-white">{STUDIO.toUpperCase()}</span>
              </span>
              <span className="mt-1 block pl-[34px] text-[10px] tracking-wide text-[#5f7790]">by {site.legalEntity}</span>
            </Link>
            <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/start" className="hover:text-white">Start a project</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/refund" className="hover:text-white">Refunds</Link>
            </nav>
          </div>
          <div className="mt-6 flex flex-col gap-2 text-xs text-[#5f7790] sm:flex-row sm:justify-between">
            <span>{site.email} · {site.domain}</span>
            <span>© {new Date().getFullYear()} {STUDIO} — a brand of {site.legalEntity}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
