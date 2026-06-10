import type { Metadata } from "next";
import Link from "next/link";
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
  { name: "Launch", price: "$4,950", time: "5 days", blurb: "One high-converting landing page — designed, written, built, and deployed.", points: ["Conversion copywriting", "Custom design system", "Next.js + deployed", "1 revision round"] },
  { name: "Site", price: "$11,500", time: "10 days", blurb: "A full marketing site, custom-built around your brand and product.", points: ["Up to 5 pages", "Bespoke component system", "Light CMS wiring", "2 revision rounds"], featured: true },
  { name: "Growth", price: "$6–9k", sub: "/mo", time: "ongoing", blurb: "Design and CRO on retainer — continuous pages, tests, iteration.", points: ["2–4 pages / month", "A/B testing & CRO", "48h turnaround", "Auto-pay, cancel anytime"] },
  { name: "Custom", price: "Let's talk", time: "bespoke", blurb: "Bigger or unusual scope — web apps, multi-page builds, partnerships.", points: ["Scoped to your goals", "Multi-page / web app", "Flexible engagement", "Tailored quote"], ctaLabel: "Discuss pricing", ctaHref: site.calLink },
];

const steps = [
  { n: "01", t: "Book a call", d: "A fifteen-minute call to understand your product, audience, and goal." },
  { n: "02", t: "Brief & design", d: "We write the copy and craft a custom design system for your brand." },
  { n: "03", t: "Build in Next.js", d: "Developed clean and deployed to a live preview you review." },
  { n: "04", t: "Ship in 5 days", d: "Launched and handed over — the code is yours to keep." },
];

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
];

/** Fine uppercase micro-label with an em-dash, in the editorial register. */
function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={"text-[11px] font-medium uppercase tracking-[0.32em] text-[#93a3b6] " + className}>
      <span className="text-[#c4cedb]">—&nbsp;&nbsp;</span>{children}
    </p>
  );
}

export default function Home() {
  return (
    <main className="bg-white font-sans text-[#54657a] antialiased">
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[radial-gradient(130%_90%_at_50%_-8%,#e7eef7_0%,#f4f7fb_42%,#ffffff_78%)]">
        {/* top bar */}
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-7">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative inline-block h-6 w-6 rounded-[7px] border border-[#16243a]/25">
              <span className="absolute inset-[6px] rounded-[2px] bg-[#16243a]" />
            </span>
            <span className="text-[15px] font-semibold tracking-[0.22em] text-[#16243a]">{STUDIO.toUpperCase()}</span>
          </Link>
          <div className="hidden items-center gap-9 text-[13px] text-[#54657a] md:flex">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} className="transition-colors hover:text-[#16243a]">{l.label}</a>
            ))}
          </div>
          <div className="text-right text-[10px] uppercase leading-relaxed tracking-[0.28em] text-[#9aa8ba]">
            Studio<br /><span className="text-[#b6c1ce]">{site.domain}</span>
          </div>
        </div>

        {/* centered hero */}
        <div className="mx-auto max-w-3xl px-8 pb-28 pt-16 text-center sm:pt-20">
          <Kicker className="justify-center">Productized design studio</Kicker>
          <h1 className="mx-auto mt-8 max-w-[18ch] font-serif text-5xl font-medium leading-[1.05] tracking-[-0.022em] text-[#16243a] sm:text-[68px]">
            Stripe-grade landing pages, <em className="font-normal italic text-[#5f7b9c]">built in five days.</em>
          </h1>
          <p className="mx-auto mt-8 max-w-[52ch] text-[17px] leading-relaxed text-[#5a6b7e]">
            {STUDIO} designs, writes, and builds high-converting pages for software and D2C brands.
            Fixed scope, fixed price — no open-ended invoices.
          </p>

          {/* single focal CTA card */}
          <div className="mx-auto mt-12 max-w-sm">
            <a
              href={site.calLink}
              target="_blank"
              rel="noopener"
              className="group block rounded-2xl bg-[#0b1f33] px-8 py-7 text-center shadow-[0_24px_60px_-20px_rgba(11,31,51,0.55)] transition-transform hover:-translate-y-0.5"
            >
              <span className="text-[15px] font-medium tracking-wide text-white">
                Book a 15-min call <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            </a>
            <p className="mt-4 text-[13px] leading-relaxed text-[#8595a8]">
              Fifteen minutes. We&apos;ll send back a free spec-demo of your new page —
              the design and the words.
            </p>
          </div>
        </div>

        {/* baseline rule */}
        <div className="mx-auto flex max-w-6xl items-end justify-between border-t border-[#e6ebf1] px-8 py-5 text-[10px] uppercase tracking-[0.26em] text-[#9aa8ba]">
          <span>Powered by {site.legalEntity}</span>
          <span className="text-[#b6c1ce]">Fixed price · 5-day delivery</span>
        </div>
      </section>

      {/* ============ WORK ============ */}
      <section id="work" className="bg-white py-28">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mb-16 text-center">
            <Kicker className="justify-center">Selected work</Kicker>
            <h2 className="mx-auto mt-6 max-w-[20ch] font-serif text-4xl font-medium tracking-[-0.02em] text-[#16243a] sm:text-5xl">
              Designed for the brand, <em className="font-normal italic text-[#5f7b9c]">never templated.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#5a6b7e]">
              A glimpse of the range — every project is built bespoke, from a blank canvas.
            </p>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {samples.map((s) => (
              <Link key={s.slug} href={`/work/${s.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl border border-[#e9edf2] bg-white transition-all duration-300 group-hover:border-[#d4deea] group-hover:shadow-[0_20px_40px_-24px_rgba(11,31,51,0.3)]">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f7fb]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/work/${s.slug}.png`} alt={`${s.label} — ${s.industry} landing page design`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                  </div>
                </div>
                <div className="mt-4 flex items-baseline justify-between px-1">
                  <div>
                    <h3 className="font-serif text-lg text-[#16243a]">{s.label}</h3>
                    <p className="mt-0.5 text-[12px] uppercase tracking-[0.16em] text-[#9aa8ba]">{s.industry}</p>
                  </div>
                  <span className="text-[13px] text-[#5f7b9c] opacity-0 transition-opacity group-hover:opacity-100">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="process" className="bg-[#f6f8fb] py-28">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mb-16 text-center">
            <Kicker className="justify-center">How it works</Kicker>
            <h2 className="mx-auto mt-6 max-w-[20ch] font-serif text-4xl font-medium tracking-[-0.02em] text-[#16243a] sm:text-5xl">
              From call to live <em className="font-normal italic text-[#5f7b9c]">in a week.</em>
            </h2>
          </div>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-[#dde4ee] pt-6">
                <div className="font-serif text-3xl text-[#5f7b9c]">{s.n}</div>
                <h3 className="mt-4 text-[15px] font-semibold text-[#16243a]">{s.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#5a6b7e]">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="bg-white py-28">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mb-16 text-center">
            <Kicker className="justify-center">Pricing</Kicker>
            <h2 className="mx-auto mt-6 font-serif text-4xl font-medium tracking-[-0.02em] text-[#16243a] sm:text-5xl">
              Fixed scope. <em className="font-normal italic text-[#5f7b9c]">Fixed price.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-[#5a6b7e]">Or a tailored quote for anything bigger — see the Custom option.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiers.map((t) => {
              const href = t.ctaHref ?? "/start";
              const label = t.ctaLabel ?? "Get started";
              const cta = "mt-8 block rounded-lg px-5 py-3 text-center text-[13px] font-medium transition-colors " + (t.featured ? "bg-[#0b1f33] text-white hover:bg-[#13304d]" : "border border-[#d8e0ea] text-[#16243a] hover:bg-[#f6f8fb]");
              return (
                <div key={t.name} className={"relative flex flex-col rounded-2xl p-8 " + (t.featured ? "bg-[#0b1f33]" : "border border-[#e9edf2] bg-white")}>
                  {t.featured && <span className="absolute -top-2.5 left-8 rounded-full bg-[#5f7b9c] px-3 py-1 text-[9.5px] font-medium uppercase tracking-[0.2em] text-white">Most chosen</span>}
                  <div className="flex items-baseline justify-between">
                    <h3 className={"text-[13px] font-semibold uppercase tracking-[0.14em] " + (t.featured ? "text-white" : "text-[#16243a]")}>{t.name}</h3>
                    <span className={"text-[11px] uppercase tracking-[0.14em] " + (t.featured ? "text-[#8ea3bd]" : "text-[#9aa8ba]")}>{t.time}</span>
                  </div>
                  <div className={"mt-5 font-serif text-4xl tracking-[-0.01em] " + (t.featured ? "text-white" : "text-[#16243a]")}>{t.price}{t.sub && <span className={"text-base " + (t.featured ? "text-[#8ea3bd]" : "text-[#9aa8ba]")}>{t.sub}</span>}</div>
                  <p className={"mt-4 text-[13.5px] leading-relaxed " + (t.featured ? "text-[#b8c6d6]" : "text-[#5a6b7e]")}>{t.blurb}</p>
                  <ul className={"mt-6 flex-1 space-y-2.5 text-[13px] " + (t.featured ? "text-[#cdd8e4]" : "text-[#5a6b7e]")}>
                    {t.points.map((p) => (
                      <li key={p} className="relative pl-4 leading-snug"><span className={"absolute left-0 " + (t.featured ? "text-[#5f7b9c]" : "text-[#c4cedb]")}>·</span>{p}</li>
                    ))}
                  </ul>
                  {href.startsWith("http") ? <a href={href} target="_blank" rel="noopener" className={cta}>{label}</a> : <Link href={href} className={cta}>{label}</Link>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-[#f6f8fb] py-28">
        <div className="mx-auto max-w-6xl px-8">
          <div className="mb-16 text-center">
            <Kicker className="justify-center">In their words</Kicker>
            <h2 className="mx-auto mt-6 font-serif text-4xl font-medium tracking-[-0.02em] text-[#16243a] sm:text-5xl">
              Premium, <em className="font-normal italic text-[#5f7b9c]">on a deadline.</em>
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.quote} className="flex flex-col">
                <blockquote className="font-serif text-[19px] leading-[1.5] text-[#2a3a4f]">{t.quote}</blockquote>
                <figcaption className="mt-6 border-t border-[#dde4ee] pt-4">
                  <div className="text-[13px] font-semibold text-[#16243a]">{t.name}</div>
                  <div className="text-[12px] uppercase tracking-[0.14em] text-[#9aa8ba]">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="bg-white py-28">
        <div className="mx-auto grid max-w-5xl gap-12 px-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
          <div>
            <Kicker>The studio</Kicker>
            <h2 className="mt-6 font-serif text-4xl font-medium tracking-[-0.02em] text-[#16243a]">A studio, not an agency.</h2>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-[#5a6b7e]">
            <p>{STUDIO} is a small, senior design studio. You work directly with the person doing the work — no account managers, no juniors, no hand-offs.</p>
            <p>We pair world-class design taste with a fast, modern build process, so you get the quality of a top studio at the speed of a freelancer. A brand of {site.legalEntity}.</p>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="bg-[#f6f8fb] py-28">
        <div className="mx-auto max-w-3xl px-8">
          <div className="mb-12 text-center">
            <Kicker className="justify-center">Questions</Kicker>
            <h2 className="mt-6 font-serif text-4xl font-medium tracking-[-0.02em] text-[#16243a]">Good to know.</h2>
          </div>
          <div className="divide-y divide-[#dde4ee] border-y border-[#dde4ee]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[15px] font-medium text-[#16243a]">{f.q}<span className="ml-4 text-[#9aa8ba] transition-transform group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#5a6b7e]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section id="contact" className="bg-white py-28">
        <div className="mx-auto max-w-2xl px-8 text-center">
          <Kicker className="justify-center">Start</Kicker>
          <h2 className="mx-auto mt-8 max-w-[16ch] font-serif text-5xl font-medium leading-[1.06] tracking-[-0.022em] text-[#16243a] sm:text-6xl">
            Ready to look like <em className="font-normal italic text-[#5f7b9c]">the leader?</em>
          </h2>
          <p className="mx-auto mt-7 max-w-md text-[16px] leading-relaxed text-[#5a6b7e]">
            Tell us about your product. We&apos;ll send back a clear idea of your new page — free.
          </p>
          <div className="mx-auto mt-11 flex max-w-md flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <a href={site.calLink} target="_blank" rel="noopener" className="rounded-xl bg-[#0b1f33] px-8 py-4 text-[14px] font-medium text-white shadow-[0_24px_60px_-22px_rgba(11,31,51,0.55)] transition-transform hover:-translate-y-0.5">Book a 15-min call →</a>
            <Link href="/start" className="rounded-xl border border-[#d8e0ea] px-8 py-4 text-[14px] font-medium text-[#16243a] transition-colors hover:bg-[#f6f8fb]">Start a project</Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[#e6ebf1] bg-white py-14">
        <div className="mx-auto max-w-6xl px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="relative inline-block h-6 w-6 rounded-[7px] border border-[#16243a]/25"><span className="absolute inset-[6px] rounded-[2px] bg-[#16243a]" /></span>
              <span className="text-[14px] font-semibold tracking-[0.22em] text-[#16243a]">{STUDIO.toUpperCase()}</span>
            </Link>
            <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[#5a6b7e]">
              <Link href="/about" className="hover:text-[#16243a]">About</Link>
              <Link href="/start" className="hover:text-[#16243a]">Start a project</Link>
              <Link href="/contact" className="hover:text-[#16243a]">Contact</Link>
              <Link href="/terms" className="hover:text-[#16243a]">Terms</Link>
              <Link href="/privacy" className="hover:text-[#16243a]">Privacy</Link>
              <Link href="/refund" className="hover:text-[#16243a]">Refunds</Link>
            </nav>
          </div>
          <div className="mt-10 flex flex-col gap-2 text-[10px] uppercase tracking-[0.26em] text-[#9aa8ba] sm:flex-row sm:justify-between">
            <span>Powered by {site.legalEntity}</span>
            <span className="text-[#b6c1ce]">{site.email} · © {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
