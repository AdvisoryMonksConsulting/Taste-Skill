"use client";

import { useEffect, useRef } from "react";
import type { FC, CSSProperties } from "react";
import { type Palette } from "./investher-themes";

export { themes, getTheme, type Palette } from "./investher-themes";

/**
 * Client-demo redesign for The Real Estate InvestHER (first campaign reply).
 * One layout, five color/gradient directions (see investher-themes.ts) so the
 * client can pick a palette. Proof-led hero, ONE primary CTA (join free),
 * organized around their three brand pillars (Investing · Business · Self-Care).
 *
 * Motion is inspired by transitions.dev: scroll-reveals (t-reveal/t-in) plus
 * hover lift/press (t-lift/t-press), driven by the motion tokens in globals.css
 * and an IntersectionObserver below. Respects prefers-reduced-motion.
 *
 * Colors via inline styles (avoids Tailwind dynamic-class scanning issues).
 * Pure presentational — no client data, no live integrations.
 */

/** Adds `.t-in` to every `.t-reveal` inside the scope as it scrolls into view. */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    // Mark JS active so the hidden initial state applies only now (progressive
    // enhancement: no JS / pre-hydration → content is fully visible).
    document.documentElement.classList.add("t-js");
    const els = Array.from(root.querySelectorAll<HTMLElement>(".t-reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("t-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("t-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const fallback = window.setTimeout(() => els.forEach((el) => el.classList.add("t-in")), 3000);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
  return ref;
}

const stagger = (i: number): CSSProperties => ({ ["--t-i" as string]: i } as CSSProperties);

const pillars = [
  { k: "Real Estate Investing", d: "Buy, flip, hold and scale a portfolio with women who’ve already done it — strategies you can act on, not just listen to." },
  { k: "Business", d: "Build the team, systems and processes that turn your investing into a real business that runs without burning you out." },
  { k: "Self-Care", d: "Grow wealth and a life that feels aligned. The only community built on the truth that balance is part of the strategy." },
];

const ladder = [
  { step: "Start free", t: "Free Membership & Podcast", d: "Curated trainings and the top-ranked InvestHER podcast — your foundation, no cost." },
  { step: "Get guided", t: "InvestHER PODs", d: "A 4-month mentor-led program: knowledge, action, and accountability every step." },
  { step: "Scale", t: "STRIVE", d: "A 12-month room of established women investors scaling team, systems and returns." },
  { step: "Gather", t: "InvestHER CON", d: "Two transformational days in person — investing, business and self-care, on one stage." },
];

export const InvestHerDemo: FC<{ t: Palette }> = ({ t }) => {
  const onPrimary: CSSProperties = { backgroundColor: t.primary, color: "#fff" };
  const onAccent: CSSProperties = { backgroundColor: t.accent, color: "#fff" };
  const scope = useReveal();
  return (
    <main ref={scope} className="font-sans" style={{ backgroundColor: t.bg, color: t.ink }}>
      {/* nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-serif text-xl tracking-tight" style={{ color: t.primary }}>
          The Real Estate <span style={{ color: t.accent }}>InvestHER</span>
        </span>
        <div className="hidden items-center gap-8 text-sm sm:flex" style={{ opacity: 0.8 }}>
          <a href="#pillars">Community</a>
          <a href="#grow">Ways to grow</a>
          <a href="#podcast">Podcast</a>
          <a href="#con">InvestHER CON</a>
        </div>
        <a href="#join" className="t-press rounded-full px-5 py-2.5 text-sm font-medium" style={onPrimary}>Join free</a>
      </nav>

      {/* hero */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${t.grad[0]} 0%, ${t.grad[1]} 60%, ${t.grad[2]} 100%)` }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
          <div className="t-reveal text-white">
            <p className="text-sm uppercase tracking-[0.28em]" style={{ color: t.gold }}>
              A community of 17,000+ women investors
            </p>
            <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.04] sm:text-6xl">
              Build wealth in real estate — <span style={{ color: t.gold }}>on your own terms.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg" style={{ opacity: 0.85 }}>
              The InvestHER community gives women the strategies, the network, and the
              support to invest, scale a business, and build a life that actually feels
              balanced. Start free today.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#join" className="t-press rounded-full px-8 py-4 text-center text-base font-semibold shadow-lg" style={onAccent}>
                Join the free community →
              </a>
              <a href="#podcast" className="t-press rounded-full border px-8 py-4 text-center text-base font-medium text-white" style={{ borderColor: "rgba(255,255,255,0.4)" }}>
                Listen to the podcast
              </a>
            </div>
            <p className="mt-5 text-sm" style={{ opacity: 0.7 }}>
              Free to join · ~100 women join every week · No credit card
            </p>
          </div>

          {/* hero proof card */}
          <div className="t-reveal t-scale-in rounded-3xl bg-white/95 p-8 shadow-2xl" style={stagger(1)}>
            <p className="font-serif text-2xl" style={{ color: t.primary }}>You’re in good company.</p>
            <div className="mt-6 grid grid-cols-2 gap-6">
              {[["17,000+", "Members"], ["50+", "Local meetups"], ["11,000", "In the group"], ["#1", "Women’s RE podcast"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="font-serif text-3xl sm:text-4xl" style={{ color: t.primary }}>{n}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em]" style={{ opacity: 0.6 }}>{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl p-5" style={{ backgroundColor: t.bg }}>
              <p className="text-sm italic" style={{ color: t.ink }}>
                “I found my people and doubled my portfolio in a year. This community
                changed how I invest — and how I live.”
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em]" style={{ opacity: 0.6 }}>— InvestHER member</p>
            </div>
          </div>
        </div>
      </section>

      {/* pillars */}
      <section id="pillars" className="mx-auto max-w-6xl px-6 py-20">
        <div className="t-reveal text-center">
          <p className="text-sm uppercase tracking-[0.24em]" style={{ color: t.accent }}>What we’re built on</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl" style={{ color: t.primary }}>Three pillars. One financially-free life.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div key={p.k} className="t-reveal t-lift rounded-2xl border bg-white p-8" style={{ borderColor: t.line, ...stagger(i) }}>
              <div className="font-serif text-2xl" style={{ color: t.gold }}>0{i + 1}</div>
              <h3 className="mt-3 font-serif text-xl" style={{ color: t.primary }}>{p.k}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ opacity: 0.75 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ways to grow ladder */}
      <section id="grow" className="py-20" style={{ backgroundColor: "#fff" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="t-reveal max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: t.accent }}>Ways to grow</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl" style={{ color: t.primary }}>Wherever you are, there’s a next step.</h2>
            <p className="mt-4 text-base" style={{ opacity: 0.7 }}>Most women start free and grow from there. One path, at your pace.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {ladder.map((l, i) => (
              <div key={l.t} className="t-reveal t-lift flex flex-col rounded-2xl p-7" style={{ backgroundColor: t.bg, ...stagger(i) }}>
                <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: t.accent }}>{l.step}</span>
                <h3 className="mt-3 font-serif text-lg" style={{ color: t.primary }}>{l.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ opacity: 0.72 }}>{l.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* podcast strip */}
      <section id="podcast" className="mx-auto max-w-6xl px-6 py-20">
        <div className="t-reveal grid items-center gap-10 rounded-3xl p-10 md:grid-cols-2" style={{ backgroundColor: t.primaryDark, color: "#fff" }}>
          <div>
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: t.gold }}>The InvestHER Podcast</p>
            <h2 className="mt-3 font-serif text-3xl">Real women. Real numbers. Every week.</h2>
            <p className="mt-4 text-base" style={{ opacity: 0.82 }}>
              Practical tools for growing rentals, flipping houses, and the mindset to run
              it all without losing yourself. Start with the favorites.
            </p>
            <a href="#" className="t-press mt-7 inline-block rounded-full px-7 py-3 text-sm font-semibold" style={onAccent}>Listen now</a>
          </div>
          <div className="space-y-3">
            {["Scaling to 100 doors as a mom of three", "The systems that bought back my time", "Self-care isn’t soft — it’s strategy"].map((track) => (
              <div key={track} className="t-lift flex items-center gap-4 rounded-xl bg-white/10 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={onAccent}>▶</span>
                <span className="text-sm">{track}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* founders */}
      <section className="py-20" style={{ backgroundColor: "#fff" }}>
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[0.8fr_1.2fr]">
          <div className="t-reveal t-scale-in aspect-square rounded-3xl" style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.primary})` }} />
          <div className="t-reveal" style={stagger(1)}>
            <p className="text-sm uppercase tracking-[0.24em]" style={{ color: t.accent }}>Founded by women who invest</p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl" style={{ color: t.primary }}>Liz Faircloth & Andresa Guidelli</h2>
            <p className="mt-4 text-base leading-relaxed" style={{ opacity: 0.78 }}>
              What started in 2018 as one virtual mastermind is now a global movement built
              on a single belief: every woman has the birthright to become financially free.
              We built the community we wished we’d had — and 17,000 women have made it theirs.
            </p>
            <a href="#join" className="t-press mt-7 inline-block rounded-full px-7 py-3 text-sm font-semibold" style={onPrimary}>Join us free</a>
          </div>
        </div>
      </section>

      {/* CON band */}
      <section id="con" className="mx-auto max-w-6xl px-6 py-20">
        <div className="t-reveal t-scale-in rounded-3xl border-2 border-dashed p-10 text-center" style={{ borderColor: t.gold }}>
          <p className="text-sm uppercase tracking-[0.24em]" style={{ color: t.accent }}>InvestHER CON · New Orleans</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl" style={{ color: t.primary }}>Two days that change how you invest.</h2>
          <p className="mx-auto mt-4 max-w-xl text-base" style={{ opacity: 0.72 }}>
            The room where women investors meet face to face — investing, business strategy,
            and self-care on one stage.
          </p>
          <a href="#" className="t-press mt-7 inline-block rounded-full px-8 py-3.5 text-sm font-semibold" style={onAccent}>See conference details</a>
        </div>
      </section>

      {/* final CTA */}
      <section id="join" className="py-24 text-center text-white" style={{ background: `linear-gradient(160deg, ${t.primary}, ${t.primaryDark})` }}>
        <div className="t-reveal mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-4xl sm:text-5xl">Your financial freedom starts with one step.</h2>
          <p className="mx-auto mt-5 max-w-md text-lg" style={{ opacity: 0.85 }}>
            Join 17,000+ women building wealth on their own terms. It’s free to start.
          </p>
          <a href="#" className="t-press mt-9 inline-block rounded-full px-10 py-4 text-base font-semibold shadow-lg" style={onAccent}>
            Join the free community →
          </a>
          <p className="mt-4 text-sm" style={{ opacity: 0.65 }}>No credit card · ~100 women join every week</p>
        </div>
      </section>

      <footer className="px-6 py-10 text-center text-sm" style={{ opacity: 0.55 }}>
        The Real Estate InvestHER · {t.name} concept by Veska — veskadesign.com
      </footer>
    </main>
  );
};
