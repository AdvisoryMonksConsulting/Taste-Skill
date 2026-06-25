"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { PILLARS, LADDER, STATS, TESTIMONIALS, FOUNDERS_BLURB } from "./content";

/**
 * Direction 1 — EDITORIAL. Magazine aesthetic: large serif display, asymmetric
 * two-column entries, hairline rules, "masthead" stat row, generous whitespace.
 * Palette: noir & champagne on warm off-white.
 */
const ink = "#1a1a1d";
const paper = "#f5f3ef";
const gold = "#a9863a";
const dark = "#121214";

const Editorial: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  return (
    <div ref={scope} className="font-serif" style={{ backgroundColor: paper, color: ink }}>
      {/* masthead nav */}
      <header className="border-b" style={{ borderColor: ink }}>
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 text-[11px] uppercase tracking-[0.25em]">
          <span style={{ opacity: 0.6 }}>Est. 2018</span>
          <span className="font-sans text-sm font-semibold tracking-[0.2em]">THE REAL ESTATE INVESTHER</span>
          <a href="#join" className="hidden sm:inline" style={{ opacity: 0.6 }}>Join free</a>
        </nav>
      </header>

      {/* hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-10 text-center">
        <p className="t-reveal font-sans text-[11px] uppercase tracking-[0.4em]" style={{ color: gold }}>
          A quarterly state of mind for women who invest
        </p>
        <h1 className="t-reveal mx-auto mt-6 max-w-4xl text-[2.7rem] leading-[1.05] sm:text-[4.2rem]">
          Build wealth in real estate, <span className="italic" style={{ color: gold }}>on your own terms.</span>
        </h1>
        <p className="t-reveal mx-auto mt-7 max-w-xl font-sans text-[15px] leading-relaxed" style={{ opacity: 0.7 }}>
          The InvestHER community gives women the strategies, the network and the support
          to invest, build a business, and live a life that actually feels balanced.
        </p>
      </section>

      {/* cover band + masthead stats */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="t-reveal relative flex h-72 items-end overflow-hidden sm:h-96" style={{ backgroundColor: dark }}>
          <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(120% 120% at 80% 0%, ${gold}55, transparent 60%)` }} />
          <p className="relative px-6 pb-5 font-sans text-[11px] uppercase tracking-[0.3em] text-white/70">
            Vol. VII — On ownership, systems & the long game
          </p>
        </div>
        <div className="t-reveal grid grid-cols-2 divide-x border-x border-b sm:grid-cols-4" style={{ borderColor: ink }}>
          {STATS.map((s) => (
            <div key={s.l} className="px-4 py-6 text-center" style={{ borderColor: ink }}>
              <div className="text-3xl">{s.n}</div>
              <div className="mt-1 font-sans text-[10px] uppercase tracking-[0.22em]" style={{ opacity: 0.55 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* contents — numbered editorial entries */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="font-sans text-[11px] uppercase tracking-[0.35em]" style={{ color: gold }}>In this issue</p>
        <div className="mt-8 divide-y" style={{ borderColor: ink }}>
          {PILLARS.map((p, i) => (
            <article key={p.k} className="t-reveal grid gap-4 py-9 sm:grid-cols-[auto_1fr] sm:gap-12" style={{ borderColor: ink }}>
              <div className="flex items-baseline gap-5 sm:flex-col sm:gap-1">
                <span className="text-5xl" style={{ color: gold }}>0{i + 1}</span>
                <h2 className="text-2xl sm:mt-2 sm:max-w-[10ch]">{p.k}</h2>
              </div>
              <p className="self-center font-sans text-[15px] leading-relaxed" style={{ opacity: 0.78 }}>{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* pull quote */}
      <section className="border-y py-20" style={{ borderColor: ink, backgroundColor: "#efe9e0" }}>
        <figure className="t-reveal mx-auto max-w-3xl px-6 text-center">
          <blockquote className="text-balance text-2xl italic leading-snug sm:text-4xl">
            “{TESTIMONIALS[2].q}”
          </blockquote>
          <figcaption className="mt-6 font-sans text-[11px] uppercase tracking-[0.25em]" style={{ opacity: 0.55 }}>{TESTIMONIALS[2].who}</figcaption>
        </figure>
      </section>

      {/* the path — editorial leader list */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="font-sans text-[11px] uppercase tracking-[0.35em]" style={{ color: gold }}>Where to begin</p>
        <ul className="mt-8">
          {LADDER.map((l) => (
            <li key={l.t} className="t-reveal flex items-baseline gap-3 border-b py-5" style={{ borderColor: "#d8d1c4" }}>
              <span className="text-lg">{l.t}</span>
              <span className="mx-2 flex-1 translate-y-[-3px] border-b border-dotted" style={{ borderColor: "#c4bcab" }} />
              <span className="font-sans text-[12px] uppercase tracking-[0.18em]" style={{ color: gold }}>{l.step}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-sans text-sm" style={{ opacity: 0.6 }}>Most readers begin free, and grow from there.</p>
      </section>

      {/* editor's note — founders */}
      <section className="border-t py-20" style={{ borderColor: ink }}>
        <div className="t-reveal mx-auto max-w-2xl px-6 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.35em]" style={{ color: gold }}>From the founders</p>
          <p className="mt-6 text-xl italic leading-relaxed">{FOUNDERS_BLURB}</p>
          <p className="mt-6 text-lg">— Liz Faircloth &amp; Andresa Guidelli</p>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="px-6 py-24 text-center text-white" style={{ backgroundColor: dark }}>
        <h2 className="t-reveal mx-auto max-w-2xl text-3xl leading-tight sm:text-5xl">Your financial freedom starts with one step.</h2>
        <a href="#" className="t-reveal mt-9 inline-block border px-10 py-4 font-sans text-[13px] uppercase tracking-[0.25em]" style={{ borderColor: gold, color: gold }}>
          Join the free community
        </a>
      </section>

      <footer className="px-6 py-8 text-center font-sans text-[11px] uppercase tracking-[0.2em]" style={{ opacity: 0.5 }}>
        The Real Estate InvestHER · Editorial concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Editorial;
