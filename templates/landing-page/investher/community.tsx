"use client";

import type { FC } from "react";
import { useReveal } from "./reveal";
import { PILLARS, LADDER, TESTIMONIALS, STATS } from "./content";

/**
 * Direction 3 — WARM COMMUNITY. Friendly and social: rounded cards, an
 * overlapping member collage, a testimonial wall, soft shadows, blob accents.
 * Palette: aubergine + terracotta rose on cream.
 */
const cream = "#f7f1ea";
const ink = "#2c1a29";
const plum = "#5b2a4e";
const rose = "#c2766a";
const blush = "#efcbbf";

const avatars = ["#c2766a", "#5b2a4e", "#d9a98c", "#7a4566", "#e7b6a6", "#94506f"];

const Community: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  return (
    <div ref={scope} className="font-sans" style={{ backgroundColor: cream, color: ink }}>
      {/* nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-xl font-bold tracking-tight" style={{ color: plum }}>InvestHER<span style={{ color: rose }}>.</span></span>
        <a href="#join" className="t-press rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md" style={{ backgroundColor: plum }}>Join the community</a>
      </nav>

      {/* hero — split with member collage */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full blur-3xl" style={{ backgroundColor: blush, opacity: 0.55 }} />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <div className="t-reveal">
            <span className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold" style={{ backgroundColor: blush, color: plum }}>
              ❤ 17,000+ women and counting
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-6xl" style={{ color: plum }}>
              Find your people.<br />Build your wealth.
            </h1>
            <p className="mt-5 max-w-md text-lg" style={{ opacity: 0.72 }}>
              The warmest community of women real estate investors — real support, real
              numbers, and a life that stays balanced while you grow. Free to join.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#join" className="t-press rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg" style={{ backgroundColor: rose }}>Join free →</a>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {avatars.slice(0, 4).map((a) => <span key={a} className="h-9 w-9 rounded-full ring-2 ring-white" style={{ backgroundColor: a }} />)}
                </div>
                <span className="text-sm font-medium" style={{ opacity: 0.7 }}>~100 join every week</span>
              </div>
            </div>
          </div>

          {/* collage */}
          <div className="t-reveal t-scale-in relative h-[24rem]" style={{ ["--t-i" as string]: 1 }}>
            <div className="absolute left-4 top-4 grid grid-cols-3 gap-3">
              {avatars.map((a, i) => (
                <span key={i} className="h-24 w-24 rounded-3xl shadow-sm" style={{ background: `linear-gradient(135deg, ${a}, ${plum})` }} />
              ))}
            </div>
            <div className="absolute -bottom-2 right-0 max-w-[15rem] rounded-3xl bg-white p-5 shadow-xl">
              <p className="text-sm leading-relaxed" style={{ color: ink }}>“{TESTIMONIALS[0].q}”</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide" style={{ color: rose }}>{TESTIMONIALS[0].who}</p>
            </div>
          </div>
        </div>
      </section>

      {/* stats ribbon */}
      <section className="mx-auto max-w-5xl px-6 py-6">
        <div className="t-reveal grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-sm sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl font-bold" style={{ color: plum }}>{s.n}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wide" style={{ opacity: 0.55 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* pillars — soft cards with circle icons */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <h2 className="t-reveal text-3xl font-bold sm:text-4xl" style={{ color: plum }}>A community, not a course.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div key={p.k} className="t-reveal t-lift rounded-[1.75rem] bg-white p-8 text-left shadow-sm" style={{ ["--t-i" as string]: i }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white" style={{ backgroundColor: i === 1 ? plum : rose }}>{i + 1}</span>
              <h3 className="mt-5 text-xl font-bold" style={{ color: plum }}>{p.k}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ opacity: 0.72 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* testimonial wall */}
      <section className="py-16" style={{ backgroundColor: "#f1e4dc" }}>
        <div className="mx-auto max-w-6xl px-6">
          <p className="t-reveal text-center text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: rose }}>Loved by members</p>
          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-2 [&>*]:mb-6">
            {TESTIMONIALS.map((tt, i) => (
              <figure key={tt.who} className="t-reveal break-inside-avoid rounded-3xl bg-white p-7 shadow-sm" style={{ ["--t-i" as string]: i % 2 }}>
                <blockquote className="text-lg leading-relaxed" style={{ color: ink }}>“{tt.q}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full" style={{ backgroundColor: avatars[i] }} />
                  <span className="text-sm font-semibold" style={{ color: plum }}>{tt.who}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ladder — soft steps */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="t-reveal text-center text-3xl font-bold" style={{ color: plum }}>Wherever you are, there’s a next step.</h2>
        <div className="mt-10 space-y-3">
          {LADDER.map((l, i) => (
            <div key={l.t} className="t-reveal t-lift flex items-center gap-5 rounded-2xl bg-white p-5 shadow-sm" style={{ ["--t-i" as string]: i }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: rose }}>{i + 1}</span>
              <div>
                <h3 className="font-bold" style={{ color: plum }}>{l.t} <span className="ml-1 text-xs font-semibold uppercase tracking-wide" style={{ color: rose }}>· {l.step}</span></h3>
                <p className="text-sm" style={{ opacity: 0.7 }}>{l.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="join" className="px-6 py-20">
        <div className="t-reveal mx-auto max-w-4xl rounded-[2.5rem] px-8 py-16 text-center text-white shadow-xl" style={{ background: `linear-gradient(135deg, ${plum}, ${rose})` }}>
          <h2 className="text-3xl font-bold sm:text-5xl">Come build with us.</h2>
          <p className="mx-auto mt-4 max-w-md text-lg" style={{ opacity: 0.9 }}>17,000 women, one birthright: to become financially free. It’s free to start.</p>
          <a href="#" className="t-press mt-8 inline-block rounded-full bg-white px-9 py-4 text-base font-bold" style={{ color: plum }}>Join the free community →</a>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-sm" style={{ opacity: 0.5 }}>
        The Real Estate InvestHER · Community concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Community;
