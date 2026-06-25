"use client";

import { useState } from "react";
import type { FC } from "react";
import Link from "next/link";
import { C } from "../strive";

const STEPS = ["About you", "Your portfolio", "Your goals", "Review"];

type Data = { name: string; email: string; units: string; years: string; goal: string };
const EMPTY: Data = { name: "", email: "", units: "", years: "", goal: "" };

const field = "w-full rounded-xl border px-4 py-3 outline-none transition";

const Apply: FC = () => {
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Data>(EMPTY);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const set = (k: keyof Data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setD({ ...d, [k]: e.target.value });

  const validate = () => {
    if (step === 0) {
      if (!d.name.trim()) return "Please tell us your name.";
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)) return "Please enter a valid email.";
    }
    if (step === 1 && !d.units) return "Pick the size of your portfolio.";
    if (step === 2 && d.goal.trim().length < 4) return "A sentence on your goal helps us prep.";
    return "";
  };
  const next = () => { const e = validate(); if (e) { setErr(e); return; } setErr(""); setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => { setErr(""); setStep((s) => Math.max(s - 1, 0)); };
  const submit = () => setDone(true);

  if (done) return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white" style={{ backgroundColor: C.rasp }}>✓</div>
      <h1 className="mt-6 font-serif text-4xl" style={{ color: C.teal }}>Application received, {d.name.split(" ")[0] || "there"}.</h1>
      <p className="mt-4 leading-relaxed" style={{ color: C.ink, opacity: 0.8 }}>Thank you. The STRIVE team will review your application and reach out at <b>{d.email}</b> about fit and next steps. In the meantime, explore the Method or listen to the podcast.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/demos/strive/method" className="rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>The 5 principles</Link>
        <Link href="/demos/strive" className="rounded-full border px-7 py-3 text-sm font-bold uppercase tracking-[0.15em]" style={{ borderColor: C.teal, color: C.teal }}>Back home</Link>
      </div>
    </main>
  );

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>Apply to STRIVE</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl" style={{ color: C.teal }}>A few minutes to start.</h1>

      {/* progress */}
      <div className="mt-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex-1">
            <div className="h-1.5 rounded-full transition-all" style={{ backgroundColor: i <= step ? C.rasp : C.blue }} />
            <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: i <= step ? C.teal : "#9aa", opacity: i <= step ? 1 : 0.6 }}>{s}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm" style={{ border: `1px solid ${C.blue}` }}>
        {step === 0 && (
          <div className="space-y-5">
            <label className="block"><span className="text-sm font-semibold" style={{ color: C.teal }}>Your name</span>
              <input value={d.name} onChange={set("name")} className={field} style={{ borderColor: C.blue }} placeholder="Jane Investor" /></label>
            <label className="block"><span className="text-sm font-semibold" style={{ color: C.teal }}>Email</span>
              <input value={d.email} onChange={set("email")} className={field} style={{ borderColor: C.blue }} placeholder="jane@email.com" /></label>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-5">
            <label className="block"><span className="text-sm font-semibold" style={{ color: C.teal }}>How many units do you own?</span>
              <select value={d.units} onChange={set("units")} className={field} style={{ borderColor: C.blue }}>
                <option value="">Select…</option><option>1–4 units</option><option>5–10 units</option><option>11–25 units</option><option>25+ units</option>
              </select></label>
            <label className="block"><span className="text-sm font-semibold" style={{ color: C.teal }}>Years investing</span>
              <select value={d.years} onChange={set("years")} className={field} style={{ borderColor: C.blue }}>
                <option value="">Select…</option><option>Under 2</option><option>2–5</option><option>5–10</option><option>10+</option>
              </select></label>
          </div>
        )}
        {step === 2 && (
          <label className="block"><span className="text-sm font-semibold" style={{ color: C.teal }}>What would you most like to change in the next 12 months?</span>
            <textarea value={d.goal} onChange={set("goal")} rows={5} className={field} style={{ borderColor: C.blue }} placeholder="e.g. Build systems so the portfolio doesn’t depend on me…" /></label>
        )}
        {step === 3 && (
          <div className="space-y-3 text-sm" style={{ color: C.ink }}>
            <h3 className="font-serif text-xl" style={{ color: C.teal }}>Review your application</h3>
            {[["Name", d.name], ["Email", d.email], ["Portfolio", d.units || "—"], ["Years investing", d.years || "—"], ["Goal", d.goal || "—"]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b pb-2" style={{ borderColor: C.line }}><span className="font-semibold" style={{ color: C.teal }}>{k}</span><span className="text-right" style={{ opacity: 0.8 }}>{v}</span></div>
            ))}
          </div>
        )}
        {err && <p className="mt-4 text-sm font-semibold" style={{ color: C.rasp }}>{err}</p>}

        <div className="mt-8 flex items-center justify-between">
          <button onClick={back} disabled={step === 0} className="text-sm font-bold uppercase tracking-[0.15em] disabled:opacity-30" style={{ color: C.teal }}>← Back</button>
          {step < STEPS.length - 1
            ? <button onClick={next} className="rounded-full px-8 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Continue</button>
            : <button onClick={submit} className="rounded-full px-8 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Submit application</button>}
        </div>
      </div>
      <p className="mt-4 text-center text-xs" style={{ opacity: 0.55 }}>Demo form — no data is sent or stored.</p>
    </main>
  );
};

export default Apply;
