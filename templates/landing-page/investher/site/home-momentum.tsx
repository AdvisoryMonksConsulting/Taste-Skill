"use client";

import type { FC } from "react";
import Link from "next/link";
import { Photo } from "../ui";
import { C, IMG, HERO, PAINS, METHOD, PRINCIPLES, FOUNDERS, TESTIMONIALS } from "../strive";
import { Reveal, Counter, Carousel, Xray } from "./widgets";

/** MOMENTUM home — bold & dynamic: dark teal hero with oversized type, a scrolling
 * marquee, big counters, high-contrast alternating blocks, principles as big
 * numbered rows. Energetic, designed to pair with the dark nav. */
const marquee = ["INVEST", "SCALE", "OWN IT", "BUILD WEALTH", "TOGETHER"];

const Momentum: FC<{ base?: string }> = ({ base = "/demos/strive-momentum" }) => (
  <Reveal>
    {/* hero */}
    <section className="relative overflow-hidden px-6 py-20 text-white sm:py-28" style={{ backgroundColor: C.tealDark }}>
      <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: C.rasp, opacity: 0.25 }} />
      <div className="relative mx-auto max-w-6xl">
        <p className="t-reveal text-sm font-bold uppercase tracking-[0.3em]" style={{ color: C.blue }}>{HERO.eyebrow}</p>
        <h1 className="t-reveal mt-5 font-serif text-6xl leading-[0.95] sm:text-8xl">Build wealth.<br /><span className="italic" style={{ color: C.blue }}>Not alone.</span></h1>
        <p className="t-reveal mt-6 max-w-lg text-lg" style={{ opacity: 0.85 }}>{HERO.sub}</p>
        <div className="t-reveal mt-9 flex flex-wrap gap-3">
          <Link href={`${base}/apply`} className="rounded-md px-8 py-4 text-base font-bold uppercase tracking-wide text-white" style={{ backgroundColor: C.rasp }}>Apply now →</Link>
          <Link href={`${base}/method`} className="rounded-md border px-8 py-4 text-base font-bold uppercase tracking-wide" style={{ borderColor: "rgba(255,255,255,.4)" }}>The method</Link>
        </div>
      </div>
    </section>

    {/* marquee */}
    <div className="overflow-hidden border-y-4 py-4" style={{ borderColor: C.tealDark, backgroundColor: C.rasp }}>
      <div className="inv-marquee flex w-max gap-8 whitespace-nowrap">
        {[...marquee, ...marquee, ...marquee, ...marquee].map((w, i) => (
          <span key={i} className="font-serif text-3xl font-bold uppercase tracking-tight text-white sm:text-5xl">{w} ✦</span>
        ))}
      </div>
    </div>

    {/* counters */}
    <section className="px-6 py-16" style={{ backgroundColor: C.blue }}>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
        <div className="t-reveal"><Counter to={50000} suffix="+" className="font-serif text-5xl sm:text-6xl" style={{ color: C.teal }} /><div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal, opacity: 0.75 }}>Members</div></div>
        <div className="t-reveal"><Counter to={50} suffix="+" className="font-serif text-5xl sm:text-6xl" style={{ color: C.teal }} /><div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal, opacity: 0.75 }}>Meetups</div></div>
        <div className="t-reveal"><span className="font-serif text-5xl sm:text-6xl" style={{ color: C.teal }}>#1</span><div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal, opacity: 0.75 }}>Podcast</div></div>
        <div className="t-reveal"><span className="font-serif text-5xl sm:text-6xl" style={{ color: C.teal }}>2018</span><div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal, opacity: 0.75 }}>Since</div></div>
      </div>
    </section>

    {/* pains big blocks */}
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="t-reveal max-w-3xl font-serif text-4xl leading-tight sm:text-6xl" style={{ color: C.teal }}>Why growing a portfolio feels so hard.</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PAINS.map((p, i) => (
          <div key={p.t} className="t-reveal t-lift rounded-lg p-7" style={{ backgroundColor: i % 2 ? C.teal : C.blue, color: i % 2 ? "#fff" : C.teal, ["--t-i" as string]: i % 3 }}>
            <h3 className="font-serif text-2xl" style={{ color: i % 2 ? C.blue : C.rasp }}>{p.t}</h3>
            <p className="mt-3 italic leading-relaxed" style={{ opacity: 0.9 }}>&ldquo;{p.q}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>

    {/* X-Ray on dark */}
    <section className="px-6 py-20" style={{ backgroundColor: C.tealDark }}>
      <div className="mx-auto max-w-3xl text-center text-white">
        <p className="t-reveal text-sm font-bold uppercase tracking-[0.3em]" style={{ color: C.blue }}>60-second tool</p>
        <h2 className="t-reveal mt-3 font-serif text-4xl sm:text-5xl">Take the Portfolio X-Ray™</h2>
      </div>
      <div className="t-reveal mt-10"><Xray applyHref={`${base}/apply`} /></div>
    </section>

    {/* principles big rows */}
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="t-reveal text-center font-serif text-4xl sm:text-6xl" style={{ color: C.teal }}>{METHOD.title}</h2>
      <div className="mt-12 space-y-6">
        {PRINCIPLES.map((p, i) => (
          <Link key={p.t} href={`${base}/method`} className="t-reveal t-lift flex items-center gap-6 rounded-lg p-6" style={{ backgroundColor: C.cream2, border: `1px solid ${C.blue}`, ["--t-i" as string]: i % 2 }}>
            <span className="font-serif text-6xl leading-none" style={{ color: C.rasp }}>{i + 1}</span>
            <div><h3 className="font-serif text-2xl" style={{ color: C.teal }}>{p.t}</h3><p className="mt-1 text-sm leading-relaxed" style={{ opacity: 0.78 }}>{p.d}</p></div>
          </Link>
        ))}
      </div>
    </section>

    {/* testimonials */}
    <section className="px-6 py-16" style={{ backgroundColor: C.blue }}><Carousel items={TESTIMONIALS} /></section>

    {/* founders */}
    <section className="px-6 py-16" style={{ backgroundColor: C.teal }}>
      <div className="mx-auto grid max-w-5xl items-center gap-12 text-white md:grid-cols-[1fr_1.1fr]">
        <div className="t-reveal t-scale-in overflow-hidden rounded-lg border-4" style={{ borderColor: C.blue }}><div className="aspect-[4/5]"><Photo src={IMG.founders} label="Liz & Andresa" /></div></div>
        <div className="t-reveal">
          <p className="text-sm font-bold uppercase tracking-[0.25em]" style={{ color: C.blue }}>The founders</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">{FOUNDERS.names}</h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ opacity: 0.88 }}>{FOUNDERS.body}</p>
          <Link href={`${base}/founders`} className="mt-6 inline-block rounded-md px-7 py-3 text-sm font-bold uppercase tracking-wide" style={{ backgroundColor: C.blue, color: C.teal }}>Their story</Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="px-6 py-24 text-center" style={{ backgroundColor: C.rasp, color: "#fff" }}>
      <h2 className="t-reveal mx-auto max-w-3xl font-serif text-5xl leading-tight sm:text-7xl">Stop growing alone.</h2>
      <Link href={`${base}/apply`} className="t-reveal mt-9 inline-block rounded-md px-10 py-4 text-base font-bold uppercase tracking-wide" style={{ backgroundColor: "#fff", color: C.rasp }}>Apply to STRIVE</Link>
    </section>
  </Reveal>
);

export default Momentum;
