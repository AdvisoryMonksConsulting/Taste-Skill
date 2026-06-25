"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { PILLARS, LADDER, STATS, TESTIMONIALS, FOUNDERS_BLURB } from "./content";

/**
 * Direction 5 — LUXE MINIMAL. Boutique and understated: centered single column,
 * thin serif type, vast negative space, gold hairlines, slow blur-in reveals.
 * Palette: emerald & gold on warm paper.
 */
const paper = "#f3f3ec";
const ink = "#16241d";
const emerald = "#1f5142";
const dark = "#143329";
const gold = "#a98a3e";

const Rule = () => <span className="mx-auto block h-px w-16" style={{ backgroundColor: gold }} />;

const Luxe: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  return (
    <div ref={scope} className="font-serif" style={{ backgroundColor: paper, color: ink }}>
      {/* nav */}
      <nav className="mx-auto flex max-w-4xl items-center justify-center px-6 py-7">
        <span className="font-sans text-[11px] uppercase tracking-[0.5em]" style={{ color: emerald }}>InvestHER</span>
      </nav>

      {/* hero */}
      <section className="mx-auto max-w-3xl px-6 pb-20 pt-14 text-center">
        <p className="t-reveal t-fade font-sans text-[11px] uppercase tracking-[0.45em]" style={{ color: gold }}>For women who invest</p>
        <h1 className="t-reveal t-blur-in mt-8 text-[2.7rem] font-light leading-[1.12] tracking-tight sm:text-[4rem]">
          Wealth, built quietly<br />and on your own terms.
        </h1>
        <div className="t-reveal mt-9"><Rule /></div>
        <p className="t-reveal mx-auto mt-9 max-w-lg font-sans text-[15px] leading-relaxed" style={{ opacity: 0.65 }}>
          A considered community of women real estate investors — strategy, network and
          balance, without the noise.
        </p>
        <a href="#join" className="t-reveal mt-10 inline-block border px-9 py-3.5 font-sans text-[12px] uppercase tracking-[0.3em]" style={{ borderColor: emerald, color: emerald }}>
          Request access
        </a>
      </section>

      {/* statement band */}
      <section className="px-6 py-24 text-center text-white" style={{ backgroundColor: emerald }}>
        <p className="t-reveal t-blur-in mx-auto max-w-3xl text-2xl font-light italic leading-relaxed sm:text-4xl">
          “Every woman has the birthright to become financially free.”
        </p>
      </section>

      {/* pillars — spacious centered sequence */}
      <section className="mx-auto max-w-2xl px-6 py-10">
        {PILLARS.map((p, i) => (
          <div key={p.k} className="t-reveal border-b py-16 text-center last:border-0" style={{ borderColor: "#dcdccf" }}>
            <span className="font-sans text-[12px] uppercase tracking-[0.4em]" style={{ color: gold }}>0{i + 1}</span>
            <h2 className="mt-5 text-3xl font-light sm:text-4xl" style={{ color: emerald }}>{p.k}</h2>
            <p className="mx-auto mt-4 max-w-md font-sans text-[15px] leading-relaxed" style={{ opacity: 0.7 }}>{p.d}</p>
          </div>
        ))}
      </section>

      {/* stats — thin numerals */}
      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-y-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="t-reveal text-center">
              <div className="text-4xl font-light sm:text-5xl" style={{ color: emerald }}>{s.n}</div>
              <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.25em]" style={{ opacity: 0.5 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* quote */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <Rule />
        <blockquote className="t-reveal t-blur-in mt-8 text-2xl font-light italic leading-relaxed sm:text-3xl">“{TESTIMONIALS[3].q}”</blockquote>
        <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.3em]" style={{ color: gold }}>{TESTIMONIALS[3].who}</p>
      </section>

      {/* the path — minimal list */}
      <section className="mx-auto max-w-xl px-6 pb-24 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.4em]" style={{ color: gold }}>The path</p>
        <div className="mt-8 space-y-px">
          {LADDER.map((l) => (
            <div key={l.t} className="t-reveal flex items-center justify-between border-b py-5 text-left" style={{ borderColor: "#dcdccf" }}>
              <span className="text-lg font-light">{l.t}</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.25em]" style={{ color: emerald }}>{l.step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* founders */}
      <section className="px-6 pb-24">
        <div className="t-reveal mx-auto max-w-2xl text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.4em]" style={{ color: gold }}>The founders</p>
          <p className="mt-6 text-xl font-light italic leading-relaxed">{FOUNDERS_BLURB}</p>
          <p className="mt-6 font-sans text-[12px] uppercase tracking-[0.25em]" style={{ color: emerald }}>Liz Faircloth &amp; Andresa Guidelli</p>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="px-6 py-28 text-center text-white" style={{ backgroundColor: dark }}>
        <p className="t-reveal font-sans text-[11px] uppercase tracking-[0.45em]" style={{ color: gold }}>By invitation to every woman</p>
        <h2 className="t-reveal t-blur-in mx-auto mt-6 max-w-2xl text-3xl font-light leading-tight sm:text-5xl">Begin, free, today.</h2>
        <a href="#" className="t-reveal mt-10 inline-block border px-10 py-4 font-sans text-[12px] uppercase tracking-[0.3em]" style={{ borderColor: gold, color: gold }}>
          Request access
        </a>
      </section>

      <footer className="px-6 py-8 text-center font-sans text-[10px] uppercase tracking-[0.3em]" style={{ opacity: 0.45 }}>
        The Real Estate InvestHER · Luxe concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Luxe;
