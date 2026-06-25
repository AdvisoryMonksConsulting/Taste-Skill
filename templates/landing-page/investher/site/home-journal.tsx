"use client";

import type { FC } from "react";
import Link from "next/link";
import { Photo } from "../ui";
import { C, IMG, HERO, METHOD, PRINCIPLES, FOUNDERS, TESTIMONIALS, PAINS } from "../strive";
import { Reveal, Carousel } from "./widgets";

/** JOURNAL home — editorial magazine: a cover-story hero, a multi-column article
 * grid (principles as features), a pull-quote, a "from the podcast" rail, an
 * interview-style founders block. Serif throughout, columns, masthead nav. */
const Journal: FC<{ base?: string }> = ({ base = "/demos/strive-journal" }) => (
  <Reveal>
    {/* cover story */}
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="t-reveal order-2 lg:order-1 flex flex-col justify-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>Cover story · The Method</p>
          <h1 className="mt-4 font-serif text-5xl leading-[1.04] sm:text-6xl" style={{ color: C.teal }}>{HERO.title}</h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed" style={{ opacity: 0.78 }}>{HERO.sub}</p>
          <div className="mt-6 flex items-center gap-4 text-sm" style={{ color: C.teal }}>
            <Link href={`${base}/apply`} className="rounded-full px-6 py-3 font-bold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: C.rasp }}>Apply</Link>
            <Link href={`${base}/method`} className="font-bold uppercase tracking-[0.12em] underline">Read the method</Link>
          </div>
        </div>
        <div className="t-reveal t-scale-in order-1 overflow-hidden lg:order-2"><div className="aspect-[4/5]"><Photo src={IMG.hero} label="Liz & Andresa" /></div></div>
      </div>
    </section>

    <div className="mx-auto max-w-6xl px-6"><div className="h-px" style={{ backgroundColor: `${C.teal}22` }} /></div>

    {/* article grid — principles as features */}
    <section className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex items-end justify-between">
        <h2 className="t-reveal font-serif text-3xl sm:text-4xl" style={{ color: C.teal }}>In this issue</h2>
        <span className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.rasp }}>The 5 Principles</span>
      </div>
      <div className="mt-8 grid gap-x-10 gap-y-10 md:grid-cols-3">
        {PRINCIPLES.map((p, i) => (
          <article key={p.t} className="t-reveal" style={{ ["--t-i" as string]: i % 3 }}>
            <div className="mb-4 overflow-hidden"><div className="aspect-[16/10]"><Photo src={[IMG.p1, IMG.p2, IMG.p3, IMG.p4, IMG.method][i]} bw={i < 4} label={`Fig. ${i + 1}`} /></div></div>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: C.rasp }}>Principle {i + 1}</span>
            <h3 className="mt-2 font-serif text-2xl leading-tight" style={{ color: C.teal }}>{p.t}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ opacity: 0.78 }}>{p.d}</p>
          </article>
        ))}
      </div>
    </section>

    {/* pull quote */}
    <section className="py-16" style={{ backgroundColor: C.blue }}>
      <figure className="t-reveal mx-auto max-w-3xl px-6 text-center">
        <blockquote className="font-serif text-3xl italic leading-snug sm:text-4xl" style={{ color: C.teal }}>&ldquo;{METHOD.body}&rdquo;</blockquote>
        <figcaption className="mt-5 text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rasp }}>The STRIVE Method</figcaption>
      </figure>
    </section>

    {/* two-column: pains feature + podcast rail */}
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.4fr_0.6fr]">
      <div>
        <h2 className="t-reveal font-serif text-3xl" style={{ color: C.teal }}>Why growing feels so hard</h2>
        <div className="mt-6 columns-1 gap-8 sm:columns-2 [&>*]:mb-6">
          {PAINS.map((p) => (
            <div key={p.t} className="t-reveal break-inside-avoid border-l-2 pl-4" style={{ borderColor: C.rasp }}>
              <h3 className="font-serif text-lg" style={{ color: C.teal }}>{p.t}</h3>
              <p className="mt-1 text-sm italic" style={{ opacity: 0.78 }}>&ldquo;{p.q}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
      <aside className="t-reveal">
        <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rasp }}>From the podcast</p>
        <div className="mt-4 space-y-4">
          {["Scaling to 100 doors as a mom of three", "The systems that bought back my time", "Self-care isn’t soft — it’s strategy"].map((t, i) => (
            <Link key={t} href={`${base}/podcast`} className="block border-b pb-4" style={{ borderColor: `${C.teal}22` }}>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: C.rasp }}>Ep. {412 - i}</span>
              <p className="font-serif text-lg leading-tight" style={{ color: C.teal }}>{t}</p>
            </Link>
          ))}
        </div>
      </aside>
    </section>

    {/* testimonials */}
    <section className="px-6 py-16" style={{ backgroundColor: C.cream2 }}><Carousel items={TESTIMONIALS} /></section>

    {/* founders interview */}
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="t-reveal t-scale-in overflow-hidden"><div className="aspect-[4/5]"><Photo src={IMG.founders} label="Liz & Andresa" /></div></div>
        <div className="t-reveal">
          <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rasp }}>The interview · Founders</p>
          <h2 className="mt-2 font-serif text-4xl" style={{ color: C.teal }}>{FOUNDERS.names}</h2>
          <p className="mt-4 leading-relaxed" style={{ opacity: 0.82 }}>{FOUNDERS.body}</p>
          <Link href={`${base}/founders`} className="mt-6 inline-block font-bold uppercase tracking-[0.12em] underline" style={{ color: C.rasp }}>Read the full story →</Link>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="px-6 py-20 text-center" style={{ backgroundColor: C.teal, color: C.cream }}>
      <h2 className="t-reveal mx-auto max-w-2xl font-serif text-4xl italic sm:text-5xl">Your next chapter starts with one step.</h2>
      <Link href={`${base}/apply`} className="t-reveal mt-8 inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</Link>
    </section>
  </Reveal>
);

export default Journal;
