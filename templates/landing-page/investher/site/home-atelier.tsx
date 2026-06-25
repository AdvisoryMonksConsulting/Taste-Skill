"use client";

import type { FC } from "react";
import Link from "next/link";
import { Photo, Crest } from "../ui";
import { C, IMG, HERO, METHOD, PRINCIPLES, FOUNDERS, TESTIMONIALS } from "../strive";
import { Reveal, Carousel, Xray } from "./widgets";

/** ATELIER home — minimal luxury: full-screen hero, a manifesto line, the 5
 * Principles as alternating full-width image/text panels, a single rotating
 * quote, full-bleed founders. Vast whitespace, large serif. */
const Atelier: FC<{ base?: string }> = ({ base = "/demos/strive-atelier" }) => (
  <Reveal>
    {/* hero */}
    <section className="relative h-screen min-h-[640px]">
      <div className="absolute inset-0"><Photo src={IMG.hero} label="Liz & Andresa" /><div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(20,40,38,.3),rgba(20,40,38,.6))" }} /></div>
      <div className="relative mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center text-white">
        <p className="t-reveal text-[12px] font-bold uppercase tracking-[0.45em]">{HERO.eyebrow}</p>
        <h1 className="t-reveal mt-7 font-serif text-5xl font-light italic leading-[1.08] sm:text-7xl">{HERO.title}</h1>
        <Link href={`${base}/apply`} className="t-reveal mt-10 border px-10 py-4 text-[12px] font-bold uppercase tracking-[0.3em]" style={{ borderColor: "#fff" }}>{HERO.cta}</Link>
      </div>
    </section>

    {/* manifesto */}
    <section className="mx-auto max-w-3xl px-6 py-32 text-center">
      <Crest size={52} />
      <p className="t-reveal mt-8 font-serif text-2xl font-light italic leading-relaxed sm:text-4xl" style={{ color: C.teal }}>{METHOD.body}</p>
    </section>

    {/* principles as alternating full-width panels */}
    {PRINCIPLES.map((p, i) => (
      <section key={p.t} className="grid items-stretch md:grid-cols-2" style={{ backgroundColor: i % 2 ? C.blue : C.cream }}>
        <div className={`relative min-h-[340px] ${i % 2 ? "md:order-2" : ""}`}><Photo src={[IMG.p1, IMG.p2, IMG.p3, IMG.p4, IMG.method][i]} bw={i < 4} label={`0${i + 1}`} /></div>
        <div className="flex flex-col justify-center px-8 py-16 md:px-16">
          <div className="t-reveal">
            <span className="font-serif text-6xl font-light" style={{ color: i % 2 ? C.cream : C.blue }}>0{i + 1}</span>
            <h2 className="mt-4 font-serif text-3xl font-light sm:text-4xl" style={{ color: C.teal }}>{p.t}</h2>
            <p className="mt-4 max-w-md leading-relaxed" style={{ color: C.ink, opacity: 0.8 }}>{p.d}</p>
          </div>
        </div>
      </section>
    ))}

    {/* single rotating quote */}
    <section className="px-6 py-28" style={{ backgroundColor: C.cream2 }}><Carousel items={TESTIMONIALS} /></section>

    {/* interactive xray */}
    <section className="mx-auto max-w-3xl px-6 pb-28 text-center">
      <h2 className="t-reveal font-serif text-4xl font-light sm:text-5xl" style={{ color: C.teal }}>Where do you stand?</h2>
      <div className="t-reveal mt-10"><Xray applyHref={`${base}/apply`} /></div>
    </section>

    {/* founders full-bleed */}
    <section className="relative h-[80vh] min-h-[520px]">
      <div className="absolute inset-0"><Photo src={IMG.founders} label="Liz & Andresa" /><div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(20,40,38,.2),rgba(20,40,38,.75))" }} /></div>
      <div className="relative mx-auto flex h-full max-w-2xl flex-col items-center justify-end px-6 pb-20 text-center text-white">
        <h2 className="t-reveal font-serif text-4xl font-light">{FOUNDERS.names}</h2>
        <p className="t-reveal mt-4 max-w-xl font-light leading-relaxed" style={{ opacity: 0.9 }}>{FOUNDERS.body}</p>
        <Link href={`${base}/founders`} className="t-reveal mt-7 border px-8 py-3 text-[12px] font-bold uppercase tracking-[0.3em]" style={{ borderColor: "#fff" }}>Their story</Link>
      </div>
    </section>

    {/* CTA */}
    <section className="px-6 py-28 text-center">
      <h2 className="t-reveal mx-auto max-w-2xl font-serif text-4xl font-light italic sm:text-5xl" style={{ color: C.teal }}>Begin with the right room behind you.</h2>
      <Link href={`${base}/apply`} className="t-reveal mt-9 inline-block px-12 py-4 text-[12px] font-bold uppercase tracking-[0.3em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</Link>
    </section>
  </Reveal>
);

export default Atelier;
