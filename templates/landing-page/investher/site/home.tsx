"use client";

import type { FC } from "react";
import Link from "next/link";
import { Photo, Crest } from "../ui";
import { C, IMG, HERO, WHY, PAINS, METHOD, FOUNDERS, TESTIMONIALS } from "../strive";
import { Reveal, Counter, Carousel, Xray } from "./widgets";

const APPLY = "/demos/strive/apply";

const Home: FC = () => (
  <Reveal>
    {/* hero */}
    <section className="relative">
      <div className="absolute inset-0"><Photo src={IMG.hero} label="Founders — Liz & Andresa" /><div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,40,38,.45), rgba(20,40,38,.65))" }} /></div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center text-white sm:py-40">
        <p className="t-reveal text-[13px] font-bold uppercase tracking-[0.3em]">{HERO.eyebrow}</p>
        <h1 className="t-reveal mt-5 font-serif text-5xl italic leading-[1.05] sm:text-6xl">{HERO.title}</h1>
        <p className="t-reveal mx-auto mt-6 max-w-xl text-lg" style={{ opacity: 0.92 }}>{HERO.sub}</p>
        <div className="t-reveal mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href={APPLY} className="rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply here</Link>
          <Link href="/demos/strive/method" className="rounded-full border px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ borderColor: "rgba(255,255,255,.5)" }}>The method</Link>
        </div>
      </div>
    </section>

    {/* animated stats */}
    <section className="px-6 py-14" style={{ backgroundColor: C.blue }}>
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
        <div className="t-reveal"><Counter to={50000} suffix="+" className="font-serif text-4xl sm:text-5xl" style={{ color: C.teal }} /><div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal, opacity: 0.75 }}>Women in the community</div></div>
      <div className="t-reveal"><Counter to={50} suffix="+" className="font-serif text-4xl sm:text-5xl" style={{ color: C.teal }} /><div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal, opacity: 0.75 }}>Local meetups</div></div>
        <div className="t-reveal"><span className="font-serif text-4xl sm:text-5xl" style={{ color: C.teal }}>#1</span><div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal, opacity: 0.75 }}>Women’s RE podcast</div></div>
        <div className="t-reveal"><span className="font-serif text-4xl sm:text-5xl" style={{ color: C.teal }}>2018</span><div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: C.teal, opacity: 0.75 }}>Building together since</div></div>
      </div>
    </section>

    {/* why it feels hard */}
    <section className="mx-auto max-w-6xl px-6 py-20 text-center">
      <div className="t-reveal flex justify-center"><Crest size={56} /></div>
      <h2 className="t-reveal mx-auto mt-7 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl" style={{ color: C.teal }}>
        {WHY.title.split(WHY.highlight)[0]}<span style={{ backgroundColor: C.blueSoft, padding: "0 .15em", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{WHY.highlight}</span>{WHY.title.split(WHY.highlight)[1]}
      </h2>
      <p className="t-reveal mx-auto mt-7 max-w-2xl text-base font-bold uppercase leading-relaxed tracking-[0.08em]" style={{ color: C.teal }}>{WHY.subhead}</p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PAINS.map((p, i) => (
          <div key={p.t} className="t-reveal t-lift rounded-2xl p-7 text-left" style={{ backgroundColor: C.blue, ["--t-i" as string]: i % 3 }}>
            <h3 className="font-serif text-xl font-bold" style={{ color: C.rasp }}>{p.t}</h3>
            <p className="mt-3 italic leading-relaxed" style={{ color: C.teal }}>&ldquo;{p.q}&rdquo;</p>
          </div>
        ))}
      </div>
    </section>

    {/* interactive Portfolio X-Ray */}
    <section className="px-6 py-20" style={{ backgroundColor: C.cream2 }}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="t-reveal text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>Interactive · 60 seconds</p>
        <h2 className="t-reveal mt-3 font-serif text-4xl sm:text-5xl" style={{ color: C.teal }}>Take the Portfolio X-Ray™</h2>
        <p className="t-reveal mx-auto mt-4 max-w-xl" style={{ opacity: 0.72 }}>Four quick questions for an honest read on where your portfolio — and your business — stands today.</p>
      </div>
      <div className="t-reveal mt-10"><Xray applyHref={APPLY} /></div>
    </section>

    {/* method teaser */}
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
      <div className="t-reveal t-scale-in aspect-square overflow-hidden rounded-sm"><Photo src={IMG.method} label="The founders" /></div>
      <div className="t-reveal" style={{ ["--t-i" as string]: 1 }}>
        <h2 className="font-serif text-4xl sm:text-5xl" style={{ color: C.teal }}>{METHOD.title}</h2>
        <p className="mt-5 text-lg leading-relaxed" style={{ color: C.teal, opacity: 0.85 }}>{METHOD.body}</p>
        <Link href="/demos/strive/method" className="mt-7 inline-block rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Explore the 5 principles</Link>
      </div>
    </section>

    {/* testimonials carousel */}
    <section className="px-6 py-20" style={{ backgroundColor: C.blue }}>
      <p className="t-reveal text-center text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>From our members</p>
      <div className="t-reveal mt-10"><Carousel items={TESTIMONIALS} /></div>
    </section>

    {/* founders teaser */}
    <section className="mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 md:grid-cols-[1fr_1.1fr]">
      <div className="t-reveal t-scale-in aspect-[4/5] overflow-hidden rounded-sm"><Photo src={IMG.founders} label="Liz & Andresa" /></div>
      <div className="t-reveal" style={{ ["--t-i" as string]: 1 }}>
        <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rasp }}>The founders</p>
        <h2 className="mt-3 font-serif text-4xl" style={{ color: C.teal }}>{FOUNDERS.names}</h2>
        <p className="mt-5 leading-relaxed" style={{ color: C.teal, opacity: 0.9 }}>{FOUNDERS.body}</p>
        <Link href="/demos/strive/founders" className="mt-7 inline-block rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Meet Liz & Andresa</Link>
      </div>
    </section>

    {/* CTA */}
    <section className="px-6 py-24 text-center" style={{ backgroundColor: C.teal, color: C.cream }}>
      <h2 className="t-reveal mx-auto max-w-3xl font-serif text-4xl italic leading-tight sm:text-5xl">Stop growing alone. Start building with the right room behind you.</h2>
      <Link href={APPLY} className="t-reveal mt-9 inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</Link>
    </section>
  </Reveal>
);

export default Home;
