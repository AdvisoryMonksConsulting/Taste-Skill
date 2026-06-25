"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { Photo, Crest } from "./ui";
import { C, IMG, HERO, WHY, PAINS, METHOD, PRINCIPLES, FOUNDERS, STATS } from "./strive";

/**
 * Direction 4 — MODERN BOLD. Contemporary take on their brand: oversized type,
 * strong teal/cream/blue color blocks, a framed founder photo, the 5 Principles
 * as a big numbered grid. High-contrast and confident, still on-palette.
 */
const Bold: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  return (
    <div ref={scope} className="font-sans" style={{ backgroundColor: C.cream, color: C.ink }}>
      {/* nav */}
      <nav className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: C.teal }}>
        <span className="flex items-center gap-3"><Crest size={34} color="#fff" /><span className="font-serif text-lg text-white">STRIVE</span></span>
        <a href="#apply" className="rounded-md px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white" style={{ backgroundColor: C.rasp }}>Apply here</a>
      </nav>

      {/* hero — color block + framed photo */}
      <section className="px-6 py-16 text-white sm:py-20" style={{ backgroundColor: C.teal }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="t-reveal">
            <p className="text-sm font-bold uppercase tracking-[0.3em]" style={{ color: C.blue }}>{HERO.eyebrow}</p>
            <h1 className="mt-5 font-serif text-5xl leading-[0.98] sm:text-7xl">Start building wealth with the <span className="italic" style={{ color: C.blue }}>right community.</span></h1>
            <p className="mt-6 max-w-lg text-lg" style={{ opacity: 0.85 }}>{HERO.sub}</p>
            <a href="#apply" className="mt-8 inline-block rounded-md px-8 py-4 text-base font-bold uppercase tracking-wide text-white" style={{ backgroundColor: C.rasp }}>Apply here →</a>
          </div>
          <div className="t-reveal t-scale-in aspect-[3/4] overflow-hidden rounded-lg border-4" style={{ borderColor: C.blue, ["--t-i" as string]: 1 }}><Photo src={IMG.hero} label="Liz & Andresa" /></div>
        </div>
      </section>

      {/* stats band */}
      <section className="px-6 py-10" style={{ backgroundColor: C.blue }}>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="t-reveal text-center">
              <div className="font-serif text-4xl sm:text-5xl" style={{ color: C.teal }}>{s.n}</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wide" style={{ color: C.teal, opacity: 0.75 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* why — big heading + pain grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="t-reveal max-w-3xl font-serif text-4xl leading-tight sm:text-6xl" style={{ color: C.teal }}>{WHY.title}</h2>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <div key={p.t} className="t-reveal t-lift rounded-lg p-7" style={{ backgroundColor: i % 2 ? C.teal : C.blue, color: i % 2 ? "#fff" : C.teal, ["--t-i" as string]: i % 3 }}>
              <h3 className="font-serif text-2xl" style={{ color: i % 2 ? C.blue : C.rasp }}>{p.t}</h3>
              <p className="mt-3 italic leading-relaxed" style={{ opacity: 0.9 }}>&ldquo;{p.q}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* method */}
      <section id="method" className="px-6 py-16" style={{ backgroundColor: C.cream2 }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="t-reveal">
            <h2 className="font-serif text-4xl sm:text-6xl" style={{ color: C.teal }}>{METHOD.title}</h2>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: C.teal, opacity: 0.85 }}>{METHOD.body}</p>
            <a href="#apply" className="mt-7 inline-block rounded-md px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white" style={{ backgroundColor: C.rasp }}>Apply here</a>
          </div>
          <div className="t-reveal t-scale-in aspect-square overflow-hidden rounded-lg" style={{ ["--t-i" as string]: 1 }}><Photo src={IMG.method} label="The founders" /></div>
        </div>
      </section>

      {/* principles big numbered grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="t-reveal text-center font-serif text-4xl sm:text-6xl" style={{ color: C.teal }}>The 5 Principles</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {PRINCIPLES.map((pr, i) => (
            <div key={pr.t} className="t-reveal flex gap-6 border-t pt-7" style={{ borderColor: C.blue, ["--t-i" as string]: i % 2 }}>
              <span className="font-serif text-6xl leading-none" style={{ color: C.rasp }}>{i + 1}</span>
              <div>
                <h3 className="font-serif text-2xl leading-tight" style={{ color: C.teal }}>{pr.t}</h3>
                <p className="mt-2 leading-relaxed" style={{ opacity: 0.78 }}>{pr.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* founders */}
      <section id="founders" className="px-6 py-16" style={{ backgroundColor: C.teal }}>
        <div className="mx-auto grid max-w-5xl items-center gap-12 text-white md:grid-cols-[1fr_1.1fr]">
          <div className="t-reveal t-scale-in aspect-[4/5] overflow-hidden rounded-lg border-4" style={{ borderColor: C.blue }}><Photo src={IMG.founders} label="Liz & Andresa" /></div>
          <div className="t-reveal" style={{ ["--t-i" as string]: 1 }}>
            <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: C.blue }}>The founders</p>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl">{FOUNDERS.names}</h2>
            <p className="mt-5 text-lg leading-relaxed" style={{ opacity: 0.88 }}>{FOUNDERS.body}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="px-6 py-24 text-center" style={{ backgroundColor: C.rasp, color: "#fff" }}>
        <h2 className="t-reveal mx-auto max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">Stop growing alone. Start today.</h2>
        <a href="#" className="t-reveal mt-9 inline-block rounded-md px-10 py-4 text-base font-bold uppercase tracking-wide" style={{ backgroundColor: "#fff", color: C.rasp }}>Apply to STRIVE</a>
      </section>

      <footer className="px-6 py-8 text-center text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.teal, opacity: 0.55 }}>
        The Real Estate InvestHER · STRIVE · Bold concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Bold;
