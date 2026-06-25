"use client";

import { useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { useReveal } from "../reveal";
import { C } from "../strive";

/** Wrap page content so its `.t-reveal` children animate in on scroll (re-runs per client navigation). */
export const Reveal: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const r = useReveal<HTMLDivElement>();
  return <div ref={r} className={className}>{children}</div>;
};

/** Count-up number that animates once it scrolls into view. */
export const Counter: FC<{ to: number; suffix?: string; prefix?: string; className?: string; style?: React.CSSProperties }> = ({ to, suffix = "", prefix = "", className, style }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const dur = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { run(); io.disconnect(); } }), { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref} className={className} style={style}>{prefix}{n.toLocaleString()}{suffix}</span>;
};

/** Auto-advancing testimonial carousel with controls + dots. */
export const Carousel: FC<{ items: { q: string; who: string }[] }> = ({ items }) => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [paused, items.length]);
  return (
    <div className="relative mx-auto max-w-3xl text-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="min-h-[180px]">
        <blockquote className="font-serif text-2xl italic leading-relaxed sm:text-3xl" style={{ color: C.teal }}>&ldquo;{items[i].q}&rdquo;</blockquote>
        <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rasp }}>{items[i].who}</p>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button onClick={() => setI((x) => (x - 1 + items.length) % items.length)} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:text-white" style={{ borderColor: C.teal, color: C.teal }}>‹</button>
        <div className="flex gap-2">
          {items.map((_, x) => (
            <button key={x} aria-label={`Go to ${x + 1}`} onClick={() => setI(x)} className="h-2.5 w-2.5 rounded-full transition" style={{ backgroundColor: x === i ? C.rasp : C.blue }} />
          ))}
        </div>
        <button onClick={() => setI((x) => (x + 1) % items.length)} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:text-white" style={{ borderColor: C.teal, color: C.teal }}>›</button>
      </div>
    </div>
  );
};

/** Interactive "Portfolio X-Ray" self-assessment — 4 questions → a tailored result. */
const XRAY_Q = [
  { q: "How clear is your view of each property’s real numbers?", a: ["Crystal clear", "Roughly", "Honestly, foggy"] },
  { q: "Could your business run for a month without you?", a: ["Easily", "Sort of", "No chance"] },
  { q: "How do most decisions get made?", a: ["A clear process", "Gut + urgency", "Whatever’s on fire"] },
  { q: "Do you have a room of peers at your level?", a: ["Yes", "A few", "I’m solo"] },
];
export const Xray: FC<{ applyHref: string }> = ({ applyHref }) => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const done = step >= XRAY_Q.length;
  const choose = (idx: number) => { setScore((s) => s + idx); setStep((x) => x + 1); };
  const reset = () => { setStep(0); setScore(0); };
  const max = XRAY_Q.length * 2;
  const band = score <= max * 0.33 ? { t: "Strong foundation", d: "You’re running a tight ship — STRIVE helps you compound it with a room of peers at your level." }
    : score <= max * 0.66 ? { t: "Ready to systemize", d: "You’ve built real momentum. The STRIVE Method turns it into a business that doesn’t depend on you." }
    : { t: "Time to get support", d: "You’re carrying too much alone. STRIVE gives you the structure, clarity and community to grow without burning out." };
  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow-lg" style={{ border: `1px solid ${C.blue}` }}>
      {!done ? (
        <>
          <div className="flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: C.rasp }}>
            <span>Portfolio X-Ray™</span><span>{step + 1} / {XRAY_Q.length}</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: C.blueSoft }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${(step / XRAY_Q.length) * 100}%`, backgroundColor: C.rasp }} />
          </div>
          <h3 className="mt-6 font-serif text-2xl" style={{ color: C.teal }}>{XRAY_Q[step].q}</h3>
          <div className="mt-5 space-y-3">
            {XRAY_Q[step].a.map((opt, idx) => (
              <button key={opt} onClick={() => choose(idx)} className="w-full rounded-xl border px-5 py-3.5 text-left font-medium transition hover:text-white" style={{ borderColor: C.blue, color: C.teal }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.teal)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                {opt}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rasp }}>Your result</p>
          <h3 className="mt-3 font-serif text-3xl" style={{ color: C.teal }}>{band.t}</h3>
          <p className="mt-3 leading-relaxed" style={{ color: C.ink, opacity: 0.8 }}>{band.d}</p>
          <a href={applyHref} className="mt-7 inline-block rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>See if STRIVE is a fit</a>
          <button onClick={reset} className="mt-4 block w-full text-sm underline" style={{ color: C.teal, opacity: 0.7 }}>Retake</button>
        </div>
      )}
    </div>
  );
};

/** Animated FAQ accordion. */
export const Accordion: FC<{ items: { q: string; a: string }[] }> = ({ items }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="overflow-hidden rounded-xl bg-white" style={{ border: `1px solid ${C.blue}` }}>
            <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left font-serif text-lg" style={{ color: C.teal }}>
              {f.q}<span className="ml-4 text-xl transition-transform" style={{ color: C.rasp, transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            <div className="grid transition-all duration-300" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 leading-relaxed" style={{ color: C.ink, opacity: 0.8 }}>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Floating back-to-top button. */
export const BackToTop: FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition"
      style={{ backgroundColor: C.rasp, opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none", transform: show ? "translateY(0)" : "translateY(12px)" }}>↑</button>
  );
};
