"use client";

import type { FC, CSSProperties } from "react";
import { useReveal } from "./reveal";

/**
 * Direction 1 — EDITORIAL, modeled faithfully on The Real Estate InvestHER's
 * real brand (the STRIVE site): dusty-blue + cream + deep-teal + raspberry,
 * crest monogram, high-contrast serif headlines with an italic script accent,
 * founder lifestyle photography, and B&W detail strips down the "5 Principles".
 * Copy is taken from their live pages.
 *
 * PHOTOS: drop real image URLs into IMG below and they render live (they load
 * in the visitor's browser, so the locked sandbox can't fetch them but the demo
 * can). Empty values fall back to elegant brand-toned placeholders.
 */

// ⬇️ Paste the client's real image URLs here (right-click → Copy image address).
const IMG = {
  hero: "",        // founders, wide living-room shot (hero background)
  method: "",      // founders on floor cushions (STRIVE Method block)
  founders: "",    // founders portrait (Founders section)
  p1: "", p2: "", p3: "", p4: "", // B&W detail shots flanking the 5 Principles
};

const cream = "#f6f0e1";
const teal = "#1e4d48";
const ink = "#243b39";
const rasp = "#a5113f";
const blue = "#a7c3cd";
const blueSoft = "#c9dde2";

const Photo: FC<{ src?: string; label?: string; bw?: boolean; className?: string; style?: CSSProperties }> = ({ src, label, bw, className, style }) => {
  if (src) return <img src={src} alt={label ?? ""} className={`h-full w-full object-cover ${className ?? ""}`} style={style} />;
  return (
    <div
      className={`flex h-full w-full items-end ${className ?? ""}`}
      style={{ background: bw ? "linear-gradient(150deg,#6f7a79,#2f3a39)" : `linear-gradient(150deg, ${blue}, ${teal})`, ...style }}
    >
      {label && <span className="p-4 font-sans text-[10px] uppercase tracking-[0.25em] text-white/80">{label}</span>}
    </div>
  );
};

// Crest-style monogram (their logo is an ornate oval "S"/InvestHER mark).
const Crest: FC<{ size?: number; color?: string }> = ({ size = 56, color = teal }) => (
  <span className="inline-flex items-center justify-center rounded-full border" style={{ width: size, height: size * 1.25, borderColor: color, borderRadius: "50%" }}>
    <span className="font-serif italic" style={{ color, fontSize: size * 0.5 }}>iH</span>
  </span>
);

const PAINS = [
  { t: "Lack of Visibility", q: "As the portfolio grows, I want a clearer understanding of what is truly happening across each property I own." },
  { t: "Operational Dependency", q: "I want to build a sustainable business that supports the growth of my portfolio without depending on me 24/7." },
  { t: "Decision-Making Process", q: "I want a stronger process for making decisions instead of reacting from urgency, pressure, or fear." },
  { t: "No Room to Think", q: "I’m so deep in the day-to-day that I rarely get to work on the strategy that actually grows the portfolio." },
  { t: "Going It Alone", q: "I don’t have a room of women at my level to pressure-test decisions and keep me accountable." },
];

const PRINCIPLES = [
  { t: "Get a Pulse: Portfolio X-Ray™", d: "A practical framework that helps investors evaluate the financial health of each asset individually, so you can identify what is performing well, what needs attention, and where operational or financial pressure may be limiting sustainable growth." },
  { t: "Make Intentional Decisions: The Red Door Diagnosis™", d: "Designed to identify the root cause of a property, project, partnership, or business issue so the next decision can be made with more clarity and confidence." },
  { t: "Optimize the Business: Strengthening the Foundation", d: "Focus on diagnosing what is not working inside the business and building the operational foundation needed to support long-term growth without everything depending on you to hold it together." },
  { t: "Align the Vision: Strategic Alignment Planner", d: "Create an intentional roadmap for growth that aligns business decisions, priorities, and capacity with the life and lifestyle you actually want to build." },
  { t: "Execute with Support: The InvestHER Community", d: "Put it all into motion alongside a curated room of women investors and coaches — accountability, feedback and momentum, every month." },
];

const Editorial: FC = () => {
  const scope = useReveal<HTMLDivElement>();
  const navLink = "text-[12px] font-bold uppercase tracking-[0.18em]";
  return (
    <div ref={scope} className="font-sans" style={{ backgroundColor: cream, color: ink }}>
      {/* top bar */}
      <header style={{ backgroundColor: blue }}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Crest size={40} />
          <div className="hidden items-center gap-7 md:flex" style={{ color: teal }}>
            <a href="#top" className={navLink}>Home</a>
            <a href="#method" className={navLink}>The Method</a>
            <a href="#founders" className={navLink}>Founders</a>
            <a href="#faq" className={navLink}>FAQ</a>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className={navLink} style={{ color: rasp }}>Login</a>
            <a href="#apply" className="rounded-full px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: rasp }}>Apply here</a>
          </div>
        </nav>
        <div className="h-1" style={{ backgroundColor: "#efe6c6" }} />
      </header>

      {/* hero */}
      <section id="top" className="relative">
        <div className="absolute inset-0">
          <Photo src={IMG.hero} label="Founders — Liz & Andresa" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(20,40,38,.45), rgba(20,40,38,.65))" }} />
        </div>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center text-white sm:py-40">
          <p className="t-reveal text-[13px] font-bold uppercase tracking-[0.3em]">Stop growing your portfolio alone.</p>
          <h1 className="t-reveal mt-5 font-serif text-5xl italic leading-[1.05] sm:text-6xl">Start building wealth with the right community behind you.</h1>
          <p className="t-reveal mx-auto mt-6 max-w-xl text-lg" style={{ opacity: 0.92 }}>
            STRIVE is a strategic framework that helps women real estate investors build
            wealth with more clarity, structure, and support.
          </p>
          <a href="#apply" className="t-reveal mt-9 rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: rasp }}>Apply here</a>
        </div>
      </section>

      {/* why it feels hard */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="t-reveal flex justify-center"><Crest size={56} /></div>
        <h2 className="t-reveal mx-auto mt-7 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl" style={{ color: teal }}>
          Why Growing a{" "}
          <span style={{ backgroundColor: blueSoft, padding: "0 .15em", boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>Portfolio Feels So</span>{" "}
          Hard
        </h2>
        <p className="t-reveal mx-auto mt-7 max-w-2xl text-base font-bold uppercase leading-relaxed tracking-[0.08em]" style={{ color: teal }}>
          You started investing in real estate to take control of your financial future and create more freedom of choice and time.
        </p>
        <p className="t-reveal mx-auto mt-5 max-w-xl" style={{ opacity: 0.7 }}>Here are five common challenges women investors who have built a portfolio are currently facing:</p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PAINS.map((p, i) => (
            <div key={p.t} className="t-reveal t-lift rounded-2xl p-7 text-left" style={{ backgroundColor: blue, ["--t-i" as string]: i % 3 }}>
              <h3 className="font-serif text-xl font-bold" style={{ color: rasp }}>{p.t}</h3>
              <p className="mt-3 italic leading-relaxed" style={{ color: teal }}>&ldquo;{p.q}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* STRIVE method */}
      <section id="method" className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div className="t-reveal t-scale-in aspect-square overflow-hidden rounded-sm"><Photo src={IMG.method} label="The founders" /></div>
        <div className="t-reveal" style={{ ["--t-i" as string]: 1 }}>
          <h2 className="font-serif text-4xl sm:text-5xl" style={{ color: teal }}>The STRIVE Method</h2>
          <p className="mt-5 text-lg leading-relaxed" style={{ color: teal, opacity: 0.85 }}>
            A strategic framework designed for women real estate investors who have already
            built a portfolio and are ready to grow more intentionally by building a stronger
            business behind it.
          </p>
          <a href="#apply" className="mt-7 inline-block rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: rasp }}>Apply here</a>
        </div>
      </section>

      {/* 5 principles — center column flanked by B&W strips */}
      <section className="relative py-20">
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[18%] lg:block"><Photo src={IMG.p1} bw /></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[18%] lg:block"><Photo src={IMG.p2} bw /></div>
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="t-reveal text-center font-serif text-4xl sm:text-5xl" style={{ color: teal }}>The 5 Principles</h2>
          <div className="mt-12 space-y-10">
            {PRINCIPLES.map((pr, i) => (
              <div key={pr.t} className="t-reveal flex gap-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: rasp }}>{i + 1}</span>
                <div>
                  <h3 className="font-serif text-2xl leading-tight" style={{ color: teal }}>{pr.t}</h3>
                  <p className="mt-2 leading-relaxed" style={{ color: ink, opacity: 0.8 }}>{pr.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* founders */}
      <section id="founders" className="py-20" style={{ backgroundColor: blue }}>
        <div className="mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-[1fr_1.1fr]">
          <div className="t-reveal t-scale-in aspect-[4/5] overflow-hidden rounded-sm"><Photo src={IMG.founders} label="Liz & Andresa" /></div>
          <div className="t-reveal" style={{ ["--t-i" as string]: 1 }}>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: rasp }}>The founders</p>
            <h2 className="mt-3 font-serif text-4xl" style={{ color: teal }}>Liz Faircloth &amp; Andresa Guidelli</h2>
            <p className="mt-5 leading-relaxed" style={{ color: teal, opacity: 0.9 }}>
              We built STRIVE — and the InvestHER community of 50,000+ women — from our own
              turning points: realizing that success on paper isn’t the same as a life that
              feels like yours. Every woman has the birthright to become financially free,
              and no one should have to build it alone.
            </p>
            <a href="#apply" className="mt-7 inline-block rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: rasp }}>Apply here</a>
          </div>
        </div>
      </section>

      {/* apply CTA */}
      <section id="apply" className="px-6 py-24 text-center" style={{ backgroundColor: teal, color: cream }}>
        <p className="t-reveal text-[13px] font-bold uppercase tracking-[0.3em]" style={{ color: blue }}>Your next chapter</p>
        <h2 className="t-reveal mx-auto mt-5 max-w-3xl font-serif text-4xl italic leading-tight sm:text-5xl">Stop growing alone. Start building with the right room behind you.</h2>
        <a href="#" className="t-reveal mt-9 inline-block rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: rasp }}>Apply to STRIVE</a>
      </section>

      <footer id="faq" className="px-6 py-8 text-center font-sans text-[11px] uppercase tracking-[0.2em]" style={{ color: teal, opacity: 0.6 }}>
        The Real Estate InvestHER · STRIVE · Editorial concept by Veska — veskadesign.com
      </footer>
    </div>
  );
};

export default Editorial;
