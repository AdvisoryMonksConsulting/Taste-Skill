"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { PILLARS, LADDER, STATS } from "./content";

/**
 * Direction 4 — PLATFORM / SAAS. Structured and trustworthy: product-style hero
 * card, trust strip, feature grid, a tiered pricing-style table, native FAQ.
 * Palette: sapphire navy + electric blue + coral on cool grey.
 */
const bg = "#f2f4f9";
const ink = "#161d2e";
const navy = "#1e3a64";
const blue = "#3f8efc";
const coral = "#e08a6b";
const line = "#dde2ec";

const faqs = [
  { q: "Is it really free to join?", a: "Yes. The free membership and the podcast are your foundation — no card required. You grow into PODs, STRIVE or CON when you’re ready." },
  { q: "I’m a total beginner. Is this for me?", a: "Absolutely. Most members start at the very beginning. You’ll find women one step ahead of you and a clear path to your first deal." },
  { q: "I already have a portfolio.", a: "STRIVE is built for established investors scaling team and systems — a 12-month room of women playing at your level." },
];

const Platform: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  const tiers = LADDER.slice(0, 3);
  return (
    <div ref={scope} className="font-sans" style={{ backgroundColor: bg, color: ink }}>
      {/* nav */}
      <nav className="border-b bg-white" style={{ borderColor: line }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight" style={{ color: navy }}>InvestHER</span>
          <div className="hidden items-center gap-7 text-sm font-medium md:flex" style={{ opacity: 0.75 }}>
            <a href="#features">Community</a><a href="#pricing">Membership</a><a href="#faq">FAQ</a>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <a href="#" style={{ color: navy }}>Log in</a>
            <a href="#join" className="t-press rounded-lg px-4 py-2 text-white" style={{ backgroundColor: navy }}>Join free</a>
          </div>
        </div>
      </nav>

      {/* hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div className="t-reveal">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: line, color: navy }}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: blue }} /> 17,000+ women investing together
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: navy }}>
            The operating system for women real estate investors.
          </h1>
          <p className="mt-5 max-w-md text-lg" style={{ opacity: 0.7 }}>
            Strategy, network and accountability in one place — so you invest with
            confidence, build a real business, and keep your life in balance.
          </p>
          <div className="mt-7 flex gap-3">
            <a href="#join" className="t-press rounded-lg px-6 py-3 text-base font-semibold text-white" style={{ backgroundColor: navy }}>Get started free</a>
            <a href="#pricing" className="t-press rounded-lg border px-6 py-3 text-base font-semibold" style={{ borderColor: line, color: navy }}>See membership</a>
          </div>
        </div>

        {/* product card */}
        <div className="t-reveal t-scale-in rounded-2xl border bg-white p-5 shadow-xl" style={{ borderColor: line, ["--t-i" as string]: 1 }}>
          <div className="flex gap-2 border-b pb-3 text-xs font-semibold" style={{ borderColor: line }}>
            {["Community", "Podcast", "Events"].map((t, i) => (
              <span key={t} className="rounded-md px-3 py-1.5" style={i === 0 ? { backgroundColor: navy, color: "#fff" } : { color: ink, opacity: 0.55 }}>{t}</span>
            ))}
          </div>
          <div className="mt-4 rounded-xl p-4" style={{ backgroundColor: bg }}>
            <div className="flex items-center justify-between text-sm font-semibold" style={{ color: navy }}>
              <span>Your path to deal #1</span><span style={{ color: blue }}>68%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: line }}>
              <div className="h-full rounded-full" style={{ width: "68%", backgroundColor: blue }} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {STATS.slice(0, 2).map((s) => (
              <div key={s.l} className="rounded-xl border p-4" style={{ borderColor: line }}>
                <div className="text-2xl font-bold" style={{ color: navy }}>{s.n}</div>
                <div className="text-xs" style={{ opacity: 0.55 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* trust strip */}
      <section className="border-y bg-white py-6" style={{ borderColor: line }}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-sm font-semibold" style={{ opacity: 0.45 }}>
          <span>As heard on the BiggerPockets Network</span><span>·</span><span>17,000+ members</span><span>·</span><span>50+ U.S. & Canada meetups</span>
        </div>
      </section>

      {/* feature grid */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="t-reveal text-center text-3xl font-bold tracking-tight" style={{ color: navy }}>Everything you need to grow.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.k} className="t-reveal rounded-2xl border bg-white p-7" style={{ borderColor: line, ["--t-i" as string]: i }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: i === 1 ? coral : blue }}>
                <span className="h-3 w-3 rounded-sm bg-white" />
              </span>
              <h3 className="mt-4 text-lg font-bold" style={{ color: navy }}>{p.k}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ opacity: 0.7 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* pricing table */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="t-reveal text-center text-3xl font-bold tracking-tight" style={{ color: navy }}>Start free. Scale when you’re ready.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => {
            const featured = i === 1;
            return (
              <div key={tier.t} className="t-reveal t-lift flex flex-col rounded-2xl border bg-white p-7" style={{ borderColor: featured ? navy : line, borderWidth: featured ? 2 : 1, ["--t-i" as string]: i }}>
                {featured && <span className="mb-3 inline-block w-max rounded-full px-3 py-1 text-xs font-bold text-white" style={{ backgroundColor: navy }}>Most popular</span>}
                <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: blue }}>{tier.step}</span>
                <h3 className="mt-2 text-2xl font-bold" style={{ color: navy }}>{tier.t}</h3>
                <p className="mt-2 text-sm" style={{ opacity: 0.7 }}>{tier.d}</p>
                <a href="#join" className="t-press mt-6 rounded-lg px-5 py-3 text-center text-sm font-semibold" style={featured ? { backgroundColor: navy, color: "#fff" } : { border: `1px solid ${line}`, color: navy }}>
                  {i === 0 ? "Join free" : "Learn more"}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* stats band */}
      <section className="py-16 text-white" style={{ backgroundColor: navy }}>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="t-reveal text-center">
              <div className="text-4xl font-bold">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wide" style={{ opacity: 0.7 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — native disclosure */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="t-reveal text-center text-3xl font-bold tracking-tight" style={{ color: navy }}>Questions, answered.</h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="t-reveal group rounded-xl border bg-white p-5" style={{ borderColor: line }}>
              <summary className="flex cursor-pointer items-center justify-between font-semibold" style={{ color: navy }}>
                {f.q}<span className="ml-4 transition group-open:rotate-45" style={{ color: blue }}>+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed" style={{ opacity: 0.72 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="px-6 pb-24">
        <div className="t-reveal mx-auto max-w-4xl rounded-2xl px-8 py-14 text-center text-white" style={{ background: `linear-gradient(135deg, ${navy}, #2d5286)` }}>
          <h2 className="text-3xl font-bold sm:text-4xl">Start building today — free.</h2>
          <p className="mx-auto mt-3 max-w-md" style={{ opacity: 0.85 }}>Join 17,000+ women investing on their own terms.</p>
          <a href="#" className="t-press mt-7 inline-block rounded-lg bg-white px-8 py-3.5 text-base font-semibold" style={{ color: navy }}>Create your free account →</a>
        </div>
      </section>

      <footer className="border-t px-6 py-8 text-center text-sm" style={{ borderColor: line, opacity: 0.5 }}>
        The Real Estate InvestHER · Platform concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Platform;
