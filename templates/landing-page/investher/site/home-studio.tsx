"use client";

import type { FC } from "react";
import Link from "next/link";
import { Photo } from "../ui";
import { C, IMG, HERO, PAINS, METHOD, PRINCIPLES, FOUNDERS, TESTIMONIALS } from "../strive";
import { Reveal, Counter, Carousel, Xray } from "./widgets";

/** STUDIO home — modern agency/product: structured grid, a quick-facts hero card,
 * a metrics row, the X-Ray as a hero card, principles as a modular 2-col grid.
 * Sans-forward, lots of cards. Designed to sit beside the fixed sidebar nav. */
const Studio: FC<{ base?: string }> = ({ base = "/demos/strive-studio" }) => (
  <Reveal>
    {/* hero */}
    <section className="mx-auto max-w-6xl px-6 pt-14 pb-10 sm:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="t-reveal">
          <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ backgroundColor: C.blueSoft, color: C.teal }}><span className="h-2 w-2 rounded-full" style={{ backgroundColor: C.rasp }} /> Application open</span>
          <h1 className="mt-5 font-serif text-5xl leading-[1.05] sm:text-6xl" style={{ color: C.teal }}>The operating system for women who invest.</h1>
          <p className="mt-5 max-w-md text-lg" style={{ opacity: 0.75 }}>{HERO.sub}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={`${base}/apply`} className="rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: C.rasp }}>Apply now</Link>
            <Link href={`${base}/method`} className="rounded-lg border px-6 py-3 text-sm font-bold uppercase tracking-[0.12em]" style={{ borderColor: C.teal, color: C.teal }}>The method</Link>
          </div>
        </div>
        <div className="t-reveal t-scale-in overflow-hidden rounded-2xl" style={{ ["--t-i" as string]: 1 }}><div className="aspect-[4/3]"><Photo src={IMG.hero} label="Liz & Andresa" /></div></div>
      </div>
    </section>

    {/* metrics row */}
    <section className="mx-auto max-w-6xl px-6 py-6">
      <div className="grid gap-4 sm:grid-cols-4">
        {[{ k: "Members", v: <Counter to={50000} suffix="+" /> }, { k: "Meetups", v: <Counter to={50} suffix="+" /> }, { k: "Podcast", v: "#1" }, { k: "Since", v: "2018" }].map((s, i) => (
          <div key={s.k} className="t-reveal rounded-2xl bg-white p-6" style={{ border: `1px solid ${C.blue}`, ["--t-i" as string]: i }}>
            <div className="font-serif text-4xl" style={{ color: C.teal }}>{s.v}</div>
            <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: C.teal, opacity: 0.6 }}>{s.k}</div>
          </div>
        ))}
      </div>
    </section>

    {/* X-Ray as feature card */}
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid items-center gap-8 rounded-3xl p-8 md:grid-cols-2" style={{ backgroundColor: C.blue }}>
        <div className="t-reveal">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.rasp }}>Interactive tool</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl" style={{ color: C.teal }}>Run your Portfolio X-Ray™</h2>
          <p className="mt-3 max-w-sm" style={{ color: C.teal, opacity: 0.85 }}>Four questions for an honest read on where your portfolio and business stand today.</p>
        </div>
        <div className="t-reveal"><Xray applyHref={`${base}/apply`} /></div>
      </div>
    </section>

    {/* principles modular grid */}
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="t-reveal font-serif text-3xl sm:text-4xl" style={{ color: C.teal }}>{METHOD.title}</h2>
      <p className="t-reveal mt-2 max-w-xl" style={{ opacity: 0.72 }}>{METHOD.body}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {PRINCIPLES.map((p, i) => (
          <Link key={p.t} href={`${base}/method`} className="t-reveal t-lift block rounded-2xl bg-white p-7" style={{ border: `1px solid ${C.blue}`, ["--t-i" as string]: i % 2 }}>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white" style={{ backgroundColor: C.rasp }}>{i + 1}</span>
            <h3 className="mt-4 font-serif text-xl" style={{ color: C.teal }}>{p.t}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ opacity: 0.72 }}>{p.d}</p>
          </Link>
        ))}
      </div>
    </section>

    {/* pains compact */}
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-3xl p-8" style={{ backgroundColor: C.cream2 }}>
        <h2 className="t-reveal font-serif text-2xl sm:text-3xl" style={{ color: C.teal }}>Sound familiar?</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.slice(0, 3).map((p, i) => (
            <div key={p.t} className="t-reveal rounded-xl bg-white p-5" style={{ border: `1px solid ${C.blue}`, ["--t-i" as string]: i }}>
              <h3 className="font-serif text-lg" style={{ color: C.rasp }}>{p.t}</h3>
              <p className="mt-2 text-sm italic" style={{ color: C.teal, opacity: 0.8 }}>&ldquo;{p.q}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* testimonials */}
    <section className="px-6 py-16" style={{ backgroundColor: C.blue }}><Carousel items={TESTIMONIALS} /></section>

    {/* founders + CTA */}
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
        <div className="t-reveal t-scale-in overflow-hidden rounded-2xl"><div className="aspect-[4/5]"><Photo src={IMG.founders} label="Liz & Andresa" /></div></div>
        <div className="t-reveal">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.rasp }}>The founders</p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl" style={{ color: C.teal }}>{FOUNDERS.names}</h2>
          <p className="mt-4 leading-relaxed" style={{ color: C.teal, opacity: 0.88 }}>{FOUNDERS.body}</p>
          <Link href={`${base}/apply`} className="mt-6 inline-block rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</Link>
        </div>
      </div>
    </section>
  </Reveal>
);

export default Studio;
