"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { PILLARS, LADDER, STATS, TESTIMONIALS } from "./content";

/**
 * Direction 2 — BOLD MODERN. Oversized uppercase sans, high-contrast color
 * blocks, a scrolling marquee, a bento pillar grid, thick borders, sharp edges.
 * Palette: terracotta / amber / near-black on warm sand.
 */
const sand = "#fbf2ea";
const ink = "#1c0f0a";
const brand = "#b5462f";
const amber = "#e8884f";
const dark = "#7e2d1d";

const Bold: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  const marquee = ["INVEST", "SCALE", "OWN IT", "BALANCE", "BUILD WEALTH"];
  return (
    <div ref={scope} className="font-sans" style={{ backgroundColor: sand, color: ink }}>
      {/* nav */}
      <nav className="flex items-center justify-between px-6 py-4 text-white" style={{ backgroundColor: brand }}>
        <span className="text-lg font-black uppercase tracking-tight">InvestHER</span>
        <a href="#join" className="t-press rounded-md bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide" style={{ color: brand }}>Join free</a>
      </nav>

      {/* hero */}
      <section className="px-6 py-16 text-white sm:py-24" style={{ backgroundColor: brand }}>
        <div className="mx-auto max-w-6xl">
          <p className="t-reveal text-sm font-bold uppercase tracking-[0.3em]" style={{ color: "#ffe2cf" }}>17,000+ women · 50+ cities</p>
          <h1 className="t-reveal mt-5 text-[3.2rem] font-black uppercase leading-[0.92] tracking-tight sm:text-[6.5rem]">
            Build wealth<br />on your<br /><span style={{ color: amber }}>own terms.</span>
          </h1>
          <div className="t-reveal mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#join" className="t-press rounded-md px-8 py-4 text-center text-base font-bold uppercase tracking-wide" style={{ backgroundColor: ink, color: "#fff" }}>Join the free community →</a>
            <a href="#podcast" className="t-press rounded-md border-2 px-8 py-4 text-center text-base font-bold uppercase tracking-wide text-white" style={{ borderColor: "#ffffff66" }}>The podcast</a>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="overflow-hidden border-y-4 py-4" style={{ borderColor: ink, backgroundColor: amber }}>
        <div className="inv-marquee flex w-max gap-8 whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((w, i) => (
            <span key={i} className="text-3xl font-black uppercase tracking-tight sm:text-5xl" style={{ color: i % 2 ? ink : "#fff", WebkitTextStroke: i % 2 ? "0" : `1px ${ink}` }}>
              {w} ✦
            </span>
          ))}
        </div>
      </div>

      {/* stats */}
      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 py-16 sm:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.l} className="t-reveal t-lift rounded-md border-2 p-6" style={{ borderColor: ink }}>
            <div className="text-4xl font-black sm:text-5xl" style={{ color: brand }}>{s.n}</div>
            <div className="mt-2 text-xs font-bold uppercase tracking-[0.15em]" style={{ opacity: 0.6 }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* bento pillars */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="t-reveal text-3xl font-black uppercase sm:text-5xl">Three pillars.<br />One free life.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div
              key={p.k}
              className="t-reveal t-lift flex flex-col rounded-md border-2 p-7"
              style={{ borderColor: ink, backgroundColor: i === 0 ? brand : i === 1 ? ink : amber, color: i === 1 ? "#fff" : i === 2 ? ink : "#fff" }}
            >
              <span className="text-5xl font-black">0{i + 1}</span>
              <h3 className="mt-4 text-2xl font-black uppercase leading-tight">{p.k}</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed" style={{ opacity: 0.9 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ladder — stepped blocks */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LADDER.map((l, i) => (
            <div key={l.t} className="t-reveal rounded-md border-2 p-6" style={{ borderColor: ink, ["--t-i" as string]: i }}>
              <span className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: brand }}>{l.step}</span>
              <h3 className="mt-2 text-xl font-black uppercase leading-tight">{l.t}</h3>
              <p className="mt-2 text-sm font-medium" style={{ opacity: 0.7 }}>{l.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* testimonial */}
      <section id="podcast" className="px-6 py-20 text-white" style={{ backgroundColor: ink }}>
        <div className="t-reveal mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em]" style={{ color: amber }}>From a member</p>
          <blockquote className="mt-6 text-3xl font-black uppercase leading-tight sm:text-5xl">“{TESTIMONIALS[0].q}”</blockquote>
          <p className="mt-6 text-sm font-bold uppercase tracking-wide" style={{ opacity: 0.6 }}>{TESTIMONIALS[0].who}</p>
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="px-6 py-24 text-center" style={{ backgroundColor: amber, color: ink }}>
        <h2 className="t-reveal text-4xl font-black uppercase leading-none sm:text-7xl">Join free.<br />Start today.</h2>
        <a href="#" className="t-press mt-9 inline-block rounded-md px-12 py-5 text-lg font-black uppercase tracking-wide text-white" style={{ backgroundColor: ink }}>Join the community →</a>
        <p className="mt-4 text-sm font-bold uppercase tracking-wide" style={{ opacity: 0.6 }}>No credit card · ~100 join every week</p>
      </section>

      <footer className="px-6 py-8 text-center text-xs font-bold uppercase tracking-[0.2em]" style={{ opacity: 0.5 }}>
        The Real Estate InvestHER · Bold concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Bold;
