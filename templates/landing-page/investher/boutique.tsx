"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { Photo, Crest } from "./ui";
import { C, IMG, HERO, WHY, PAINS, METHOD, PRINCIPLES, FOUNDERS } from "./strive";

/**
 * Direction 2 — BOUTIQUE. Airy and high-end on their brand: full-bleed founder
 * photography, centered single column, thin serif, vast cream whitespace,
 * hairline dividers, restrained raspberry. Understated luxury.
 */
const Boutique: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  return (
    <div ref={scope} className="font-sans" style={{ backgroundColor: C.cream, color: C.ink }}>
      {/* minimal nav */}
      <nav className="absolute left-0 right-0 z-10 flex items-center justify-between px-8 py-6 text-white">
        <Crest size={38} color="#ffffff" />
        <a href="#apply" className="text-[12px] font-bold uppercase tracking-[0.25em]">Apply</a>
      </nav>

      {/* full-bleed hero */}
      <section className="relative h-screen min-h-[640px]">
        <div className="absolute inset-0"><Photo src={IMG.hero} label="Liz & Andresa" /><div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,40,38,.35), rgba(20,40,38,.55))" }} /></div>
        <div className="relative mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center text-white">
          <p className="t-reveal text-[12px] font-bold uppercase tracking-[0.4em]">{HERO.eyebrow}</p>
          <h1 className="t-reveal mt-6 font-serif text-5xl font-light italic leading-[1.08] sm:text-7xl">{HERO.title}</h1>
          <a href="#apply" className="t-reveal mt-10 border px-10 py-4 text-[12px] font-bold uppercase tracking-[0.3em]" style={{ borderColor: "#ffffff" }}>{HERO.cta}</a>
        </div>
      </section>

      {/* intro statement */}
      <section className="mx-auto max-w-2xl px-6 py-28 text-center">
        <Crest size={52} />
        <p className="t-reveal mt-8 font-serif text-2xl font-light italic leading-relaxed sm:text-3xl" style={{ color: C.teal }}>{METHOD.body}</p>
      </section>

      {/* pains — hairline list */}
      <section className="mx-auto max-w-3xl px-6 pb-28">
        <h2 className="t-reveal text-center font-serif text-4xl font-light sm:text-5xl" style={{ color: C.teal }}>{WHY.title}</h2>
        <div className="mt-14">
          {PAINS.map((p) => (
            <div key={p.t} className="t-reveal border-t py-8 text-center" style={{ borderColor: "#ddd6c2" }}>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>{p.t}</h3>
              <p className="mx-auto mt-3 max-w-xl font-serif text-xl font-light italic" style={{ color: C.teal }}>&ldquo;{p.q}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* method — full-width photo */}
      <section className="relative h-[60vh] min-h-[420px]">
        <div className="absolute inset-0"><Photo src={IMG.method} label="The founders" /><div className="absolute inset-0" style={{ background: "rgba(20,40,38,.45)" }} /></div>
        <div className="relative mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-6 text-center text-white">
          <h2 className="t-reveal font-serif text-4xl font-light sm:text-5xl">{METHOD.title}</h2>
          <a href="#apply" className="t-reveal mt-8 border px-9 py-3.5 text-[12px] font-bold uppercase tracking-[0.3em]" style={{ borderColor: "#fff" }}>Apply here</a>
        </div>
      </section>

      {/* principles — elegant numbered list */}
      <section id="method" className="mx-auto max-w-3xl px-6 py-28">
        <p className="t-reveal text-center text-[12px] font-bold uppercase tracking-[0.4em]" style={{ color: C.rasp }}>The Method</p>
        <h2 className="t-reveal mt-4 text-center font-serif text-4xl font-light sm:text-5xl" style={{ color: C.teal }}>The 5 Principles</h2>
        <div className="mt-16 space-y-16">
          {PRINCIPLES.map((pr, i) => (
            <div key={pr.t} className="t-reveal text-center">
              <div className="font-serif text-5xl font-light" style={{ color: C.blue }}>0{i + 1}</div>
              <h3 className="mt-4 font-serif text-2xl font-light" style={{ color: C.teal }}>{pr.t}</h3>
              <p className="mx-auto mt-3 max-w-xl leading-relaxed" style={{ color: C.ink, opacity: 0.75 }}>{pr.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* founders */}
      <section id="founders" className="relative h-[70vh] min-h-[480px]">
        <div className="absolute inset-0"><Photo src={IMG.founders} label="Liz & Andresa" /><div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,40,38,.2), rgba(20,40,38,.7))" }} /></div>
        <div className="relative mx-auto flex h-full max-w-2xl flex-col items-center justify-end px-6 pb-20 text-center text-white">
          <h2 className="t-reveal font-serif text-4xl font-light">{FOUNDERS.names}</h2>
          <p className="t-reveal mt-4 max-w-xl font-light leading-relaxed" style={{ opacity: 0.9 }}>{FOUNDERS.body}</p>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="px-6 py-28 text-center">
        <h2 className="t-reveal mx-auto max-w-2xl font-serif text-4xl font-light italic sm:text-5xl" style={{ color: C.teal }}>Begin with the right room behind you.</h2>
        <a href="#" className="t-reveal mt-9 inline-block px-12 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</a>
      </section>

      <footer className="px-6 py-8 text-center text-[11px] uppercase tracking-[0.25em]" style={{ color: C.teal, opacity: 0.55 }}>
        The Real Estate InvestHER · STRIVE · Boutique concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Boutique;
