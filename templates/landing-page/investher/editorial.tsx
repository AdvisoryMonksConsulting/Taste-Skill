"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { Photo, Crest } from "./ui";
import { C, IMG, HERO, WHY, PAINS, METHOD, PRINCIPLES, FOUNDERS } from "./strive";

/**
 * Direction 1 — EDITORIAL. Magazine take on their real brand: dusty-blue +
 * cream + deep-teal + raspberry, crest monogram, serif + italic script,
 * pain-point cards, the 5 Principles flanked by B&W detail strips.
 */
const Editorial: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  const navLink = "text-[12px] font-bold uppercase tracking-[0.18em]";
  return (
    <div ref={scope} className="font-sans" style={{ backgroundColor: C.cream, color: C.ink }}>
      <header style={{ backgroundColor: C.blue }}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Crest size={40} />
          <div className="hidden items-center gap-7 md:flex" style={{ color: C.teal }}>
            <a href="#top" className={navLink}>Home</a>
            <a href="#method" className={navLink}>The Method</a>
            <a href="#founders" className={navLink}>Founders</a>
            <a href="#faq" className={navLink}>FAQ</a>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className={navLink} style={{ color: C.rasp }}>Login</a>
            <a href="#apply" className="rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply here</a>
          </div>
        </nav>
        <div className="h-1" style={{ backgroundColor: C.line }} />
      </header>

      {/* hero */}
      <section id="top" className="relative">
        <div className="absolute inset-0">
          <Photo src={IMG.hero} label="Founders — Liz & Andresa" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,40,38,.45), rgba(20,40,38,.65))" }} />
        </div>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center text-white sm:py-40">
          <p className="t-reveal text-[13px] font-bold uppercase tracking-[0.3em]">{HERO.eyebrow}</p>
          <h1 className="t-reveal mt-5 font-serif text-5xl italic leading-[1.05] sm:text-6xl">{HERO.title}</h1>
          <p className="t-reveal mx-auto mt-6 max-w-xl text-lg" style={{ opacity: 0.92 }}>{HERO.sub}</p>
          <a href="#apply" className="t-reveal mt-9 rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>{HERO.cta}</a>
        </div>
      </section>

      {/* why it feels hard */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="t-reveal flex justify-center"><Crest size={56} /></div>
        <h2 className="t-reveal mx-auto mt-7 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl" style={{ color: C.teal }}>
          {WHY.title.split(WHY.highlight)[0]}
          <span style={{ backgroundColor: C.blueSoft, padding: "0 .15em", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{WHY.highlight}</span>
          {WHY.title.split(WHY.highlight)[1]}
        </h2>
        <p className="t-reveal mx-auto mt-7 max-w-2xl text-base font-bold uppercase leading-relaxed tracking-[0.08em]" style={{ color: C.teal }}>{WHY.subhead}</p>
        <p className="t-reveal mx-auto mt-5 max-w-xl" style={{ opacity: 0.7 }}>{WHY.intro}</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <div key={p.t} className="t-reveal t-lift rounded-2xl p-7 text-left" style={{ backgroundColor: C.blue, ["--t-i" as string]: i % 3 }}>
              <h3 className="font-serif text-xl font-bold" style={{ color: C.rasp }}>{p.t}</h3>
              <p className="mt-3 italic leading-relaxed" style={{ color: C.teal }}>&ldquo;{p.q}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* method */}
      <section id="method" className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div className="t-reveal t-scale-in aspect-square overflow-hidden rounded-sm"><Photo src={IMG.method} label="The founders" /></div>
        <div className="t-reveal" style={{ ["--t-i" as string]: 1 }}>
          <h2 className="font-serif text-4xl sm:text-5xl" style={{ color: C.teal }}>{METHOD.title}</h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: C.teal, opacity: 0.85 }}>{METHOD.body}</p>
          <a href="#apply" className="mt-7 inline-block rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply here</a>
        </div>
      </section>

      {/* 5 principles */}
      <section className="relative py-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[18%] lg:block"><Photo src={IMG.p1} bw /></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[18%] lg:block"><Photo src={IMG.p2} bw /></div>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="t-reveal text-center font-serif text-4xl sm:text-5xl" style={{ color: C.teal }}>The 5 Principles</h2>
          <div className="mt-12 space-y-10">
            {PRINCIPLES.map((pr, i) => (
              <div key={pr.t} className="t-reveal flex gap-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: C.rasp }}>{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl leading-tight" style={{ color: C.teal }}>{pr.t}</h3>
                  <p className="mt-2 leading-relaxed" style={{ color: C.ink, opacity: 0.8 }}>{pr.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* founders */}
      <section id="founders" className="py-20" style={{ backgroundColor: C.blue }}>
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-[1fr_1.1fr]">
          <div className="t-reveal t-scale-in aspect-[4/5] overflow-hidden rounded-sm"><Photo src={IMG.founders} label="Liz & Andresa" /></div>
          <div className="t-reveal" style={{ ["--t-i" as string]: 1 }}>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rasp }}>The founders</p>
            <h2 className="mt-3 font-serif text-4xl" style={{ color: C.teal }}>{FOUNDERS.names}</h2>
            <p className="mt-5 leading-relaxed" style={{ color: C.teal, opacity: 0.9 }}>{FOUNDERS.body}</p>
            <a href="#apply" className="mt-7 inline-block rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply here</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="px-6 py-24 text-center" style={{ backgroundColor: C.teal, color: C.cream }}>
        <p className="t-reveal text-[13px] font-bold uppercase tracking-[0.3em]" style={{ color: C.blue }}>Your next chapter</p>
        <h2 className="t-reveal mx-auto mt-5 max-w-3xl font-serif text-4xl italic leading-tight sm:text-5xl">Stop growing alone. Start building with the right room behind you.</h2>
        <a href="#" className="t-reveal mt-9 inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</a>
      </section>

      <footer id="faq" className="px-6 py-8 text-center font-sans text-[11px] uppercase tracking-[0.2em]" style={{ color: C.teal, opacity: 0.6 }}>
        The Real Estate InvestHER · STRIVE · Editorial concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Editorial;
