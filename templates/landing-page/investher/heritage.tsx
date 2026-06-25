"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { Photo, Crest } from "./ui";
import { C, IMG, HERO, WHY, PAINS, METHOD, PRINCIPLES, FOUNDERS } from "./strive";

/**
 * Direction 5 — HERITAGE. Classic, old-money take on their brand: symmetrical and
 * centered, serif throughout, ornate crest dividers, framed photography with thin
 * double borders, restrained raspberry. Timeless and elegant.
 */
const Divider: FC = () => (
  <div className="my-4 flex items-center justify-center gap-4">
    <span className="h-px w-16" style={{ backgroundColor: C.rasp, opacity: 0.5 }} />
    <Crest size={34} />
    <span className="h-px w-16" style={{ backgroundColor: C.rasp, opacity: 0.5 }} />
  </div>
);

const Frame: FC<{ src?: string; label?: string; className?: string }> = ({ src, label, className }) => (
  <div className={`p-2 ${className ?? ""}`} style={{ border: `1px solid ${C.teal}` }}>
    <div className="h-full w-full overflow-hidden" style={{ border: `1px solid ${C.blue}` }}><Photo src={src} label={label} /></div>
  </div>
);

const Heritage: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  return (
    <div ref={scope} className="font-serif" style={{ backgroundColor: C.cream, color: C.ink }}>
      {/* nav */}
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: C.teal }}>The Real Estate InvestHER</span>
        <a href="#apply" className="font-sans text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: C.rasp }}>Apply</a>
      </nav>
      <div className="h-px w-full" style={{ backgroundColor: C.teal, opacity: 0.2 }} />

      {/* hero — centered, framed photo below */}
      <section className="mx-auto max-w-3xl px-6 pt-16 text-center">
        <Crest size={64} />
        <p className="t-reveal mt-6 font-sans text-[12px] font-bold uppercase tracking-[0.35em]" style={{ color: C.rasp }}>{HERO.eyebrow}</p>
        <h1 className="t-reveal mt-5 text-5xl italic leading-[1.08] sm:text-6xl" style={{ color: C.teal }}>{HERO.title}</h1>
        <p className="t-reveal mx-auto mt-6 max-w-xl font-sans text-lg" style={{ opacity: 0.72 }}>{HERO.sub}</p>
        <a href="#apply" className="t-reveal mt-8 inline-block px-9 py-3.5 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-white" style={{ backgroundColor: C.rasp }}>{HERO.cta}</a>
      </section>
      <section className="mx-auto max-w-4xl px-6 pt-12"><Frame src={IMG.hero} label="Liz & Andresa" className="t-reveal aspect-[16/7]" /></section>

      {/* why */}
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Divider />
        <h2 className="t-reveal mt-4 text-4xl sm:text-5xl" style={{ color: C.teal }}>{WHY.title}</h2>
        <p className="t-reveal mx-auto mt-6 max-w-2xl font-sans text-sm font-bold uppercase leading-relaxed tracking-[0.1em]" style={{ color: C.teal }}>{WHY.subhead}</p>
        <div className="mt-12 grid gap-px overflow-hidden sm:grid-cols-2" style={{ backgroundColor: C.teal, border: `1px solid ${C.teal}` }}>
          {PAINS.map((p) => (
            <div key={p.t} className="t-reveal p-8 text-left" style={{ backgroundColor: C.cream }}>
              <h3 className="text-xl" style={{ color: C.rasp }}>{p.t}</h3>
              <p className="mt-2 font-sans text-sm italic leading-relaxed" style={{ color: C.teal, opacity: 0.85 }}>&ldquo;{p.q}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* method */}
      <section id="method" className="py-16" style={{ backgroundColor: C.blue }}>
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-2">
          <Frame src={IMG.method} label="The founders" className="t-reveal aspect-square" />
          <div className="t-reveal text-center md:text-left" style={{ ["--t-i" as string]: 1 }}>
            <Crest size={48} />
            <h2 className="mt-5 text-4xl sm:text-5xl" style={{ color: C.teal }}>{METHOD.title}</h2>
            <p className="mt-4 font-sans text-lg leading-relaxed" style={{ color: C.teal, opacity: 0.85 }}>{METHOD.body}</p>
          </div>
        </div>
      </section>

      {/* principles — refined numbered list */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <Divider />
        <h2 className="t-reveal mt-4 text-4xl sm:text-5xl" style={{ color: C.teal }}>The Five Principles</h2>
        <div className="mt-12 divide-y" style={{ borderColor: "#ddd6c2" }}>
          {PRINCIPLES.map((pr, i) => (
            <div key={pr.t} className="t-reveal py-8" style={{ borderColor: "#ddd6c2" }}>
              <div className="font-sans text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>Principle {["One", "Two", "Three", "Four", "Five"][i]}</div>
              <h3 className="mt-3 text-2xl" style={{ color: C.teal }}>{pr.t}</h3>
              <p className="mx-auto mt-2 max-w-xl font-sans leading-relaxed" style={{ color: C.ink, opacity: 0.78 }}>{pr.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* founders */}
      <section id="founders" className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <Frame src={IMG.founders} label="Liz & Andresa" className="t-reveal aspect-[4/5]" />
          <div className="t-reveal text-center md:text-left" style={{ ["--t-i" as string]: 1 }}>
            <p className="font-sans text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rasp }}>The founders</p>
            <h2 className="mt-3 text-4xl" style={{ color: C.teal }}>{FOUNDERS.names}</h2>
            <p className="mt-5 font-sans leading-relaxed" style={{ color: C.teal, opacity: 0.88 }}>{FOUNDERS.body}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="px-6 py-24 text-center" style={{ backgroundColor: C.teal, color: C.cream }}>
        <Crest size={52} color={C.cream} />
        <h2 className="t-reveal mx-auto mt-6 max-w-2xl text-4xl italic sm:text-5xl">Stop growing alone. Build with the right room behind you.</h2>
        <a href="#" className="t-reveal mt-9 inline-block px-10 py-4 font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</a>
      </section>

      <footer className="px-6 py-8 text-center font-sans text-[11px] uppercase tracking-[0.25em]" style={{ color: C.teal, opacity: 0.55 }}>
        The Real Estate InvestHER · STRIVE · Heritage concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Heritage;
