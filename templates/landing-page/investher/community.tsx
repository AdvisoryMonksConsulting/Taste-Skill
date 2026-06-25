"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { Photo, Crest } from "./ui";
import { C, IMG, HERO, PAINS, METHOD, PRINCIPLES, FOUNDERS, STATS } from "./strive";

/**
 * Direction 3 — WARM COMMUNITY. Friendly take on their brand: split hero with a
 * founder photo, rounded dusty-blue cards, a stats ribbon, the 50,000-women
 * community front and center. Soft, approachable, social-proof forward.
 */
const Community: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  return (
    <div ref={scope} className="font-sans" style={{ backgroundColor: C.cream, color: C.ink }}>
      {/* nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="flex items-center gap-3"><Crest size={36} /><span className="font-serif text-lg" style={{ color: C.teal }}>InvestHER · STRIVE</span></span>
        <a href="#apply" className="rounded-full px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: C.rasp }}>Apply here</a>
      </nav>

      {/* split hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-2">
        <div className="t-reveal">
          <span className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold" style={{ backgroundColor: C.blueSoft, color: C.teal }}>❤ 50,000+ women investors</span>
          <h1 className="mt-6 font-serif text-4xl leading-[1.1] sm:text-6xl" style={{ color: C.teal }}>Stop growing your portfolio <span className="italic">alone.</span></h1>
          <p className="mt-5 max-w-md text-lg" style={{ opacity: 0.75 }}>{HERO.sub}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#apply" className="rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-md" style={{ backgroundColor: C.rasp }}>Apply here →</a>
            <a href="#method" className="rounded-full border px-7 py-3.5 text-base font-semibold" style={{ borderColor: C.teal, color: C.teal }}>The method</a>
          </div>
        </div>
        <div className="t-reveal t-scale-in aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lg" style={{ ["--t-i" as string]: 1 }}><Photo src={IMG.hero} label="Liz & Andresa" /></div>
      </section>

      {/* stats ribbon */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="t-reveal grid grid-cols-2 gap-4 rounded-[2rem] p-6 sm:grid-cols-4" style={{ backgroundColor: C.blue }}>
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-serif text-3xl" style={{ color: C.teal }}>{s.n}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide" style={{ color: C.teal, opacity: 0.7 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* pains as soft cards */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="t-reveal font-serif text-3xl sm:text-4xl" style={{ color: C.teal }}>Sound familiar?</h2>
        <p className="t-reveal mx-auto mt-3 max-w-xl" style={{ opacity: 0.7 }}>The challenges women investors tell us about most:</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PAINS.slice(0, 3).map((p, i) => (
            <div key={p.t} className="t-reveal t-lift rounded-[1.75rem] bg-white p-8 text-left shadow-sm" style={{ ["--t-i" as string]: i }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ backgroundColor: C.rasp }}>{i + 1}</span>
              <h3 className="mt-5 font-serif text-xl" style={{ color: C.teal }}>{p.t}</h3>
              <p className="mt-2 italic leading-relaxed" style={{ opacity: 0.72 }}>&ldquo;{p.q}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* method split */}
      <section id="method" className="py-16" style={{ backgroundColor: C.blue }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
          <div className="t-reveal t-scale-in aspect-square overflow-hidden rounded-[2rem] shadow-md"><Photo src={IMG.method} label="The founders" /></div>
          <div className="t-reveal" style={{ ["--t-i" as string]: 1 }}>
            <h2 className="font-serif text-4xl" style={{ color: C.teal }}>{METHOD.title}</h2>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: C.teal, opacity: 0.88 }}>{METHOD.body}</p>
          </div>
        </div>
      </section>

      {/* principles friendly grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="t-reveal text-center font-serif text-3xl sm:text-4xl" style={{ color: C.teal }}>The 5 Principles</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((pr, i) => (
            <div key={pr.t} className="t-reveal t-lift rounded-[1.5rem] bg-white p-7 shadow-sm" style={{ ["--t-i" as string]: i % 3 }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full font-bold text-white" style={{ backgroundColor: C.rasp }}>{i + 1}</span>
              <h3 className="mt-4 font-serif text-lg" style={{ color: C.teal }}>{pr.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ opacity: 0.72 }}>{pr.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* founders */}
      <section id="founders" className="mx-auto max-w-5xl px-6 py-16">
        <div className="t-reveal grid items-center gap-10 rounded-[2.5rem] p-8 md:grid-cols-[1fr_1.2fr]" style={{ backgroundColor: C.blueSoft }}>
          <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-md"><Photo src={IMG.founders} label="Liz & Andresa" /></div>
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.rasp }}>The founders</p>
            <h2 className="mt-2 font-serif text-3xl" style={{ color: C.teal }}>{FOUNDERS.names}</h2>
            <p className="mt-4 leading-relaxed" style={{ color: C.teal, opacity: 0.88 }}>{FOUNDERS.body}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="px-6 py-20">
        <div className="t-reveal mx-auto max-w-4xl rounded-[2.5rem] px-8 py-16 text-center text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})` }}>
          <h2 className="font-serif text-3xl sm:text-5xl">Build with the right women behind you.</h2>
          <p className="mx-auto mt-4 max-w-md text-lg" style={{ opacity: 0.9 }}>Join a curated room of women investors growing on their own terms.</p>
          <a href="#" className="mt-8 inline-block rounded-full px-9 py-4 text-base font-bold text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE →</a>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-sm" style={{ color: C.teal, opacity: 0.55 }}>
        The Real Estate InvestHER · STRIVE · Community concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Community;
