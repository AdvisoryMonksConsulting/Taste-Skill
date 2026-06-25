"use client";

import { useState } from "react";
import type { FC } from "react";
import Link from "next/link";
import { C } from "../strive";

const EPISODES = [
  { n: 412, t: "Scaling to 100 doors as a mom of three", len: "38 min" },
  { n: 411, t: "The systems that bought back my time", len: "44 min" },
  { n: 410, t: "Self-care isn’t soft — it’s strategy", len: "31 min" },
  { n: 409, t: "Reading a deal when the numbers are messy", len: "52 min" },
  { n: 408, t: "From first rental to a real business", len: "40 min" },
];

const Podcast: FC = () => {
  const [playing, setPlaying] = useState<number | null>(null);
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>The InvestHER Podcast</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-6xl" style={{ color: C.teal }}>Real women. Real numbers. Every week.</h1>
      <p className="mt-4 max-w-xl" style={{ opacity: 0.72 }}>Practical tools for growing rentals, flipping houses and building a business — and the mindset to run it all without losing yourself.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {["Apple Podcasts", "Spotify", "YouTube"].map((p) => (
          <span key={p} className="rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ backgroundColor: C.blue, color: C.teal }}>{p}</span>
        ))}
      </div>

      <div className="mt-10 space-y-3">
        {EPISODES.map((e) => {
          const isOn = playing === e.n;
          return (
            <div key={e.n} className="rounded-xl bg-white p-4" style={{ border: `1px solid ${C.blue}` }}>
              <div className="flex items-center gap-4">
                <button onClick={() => setPlaying(isOn ? null : e.n)} aria-label={isOn ? "Pause" : "Play"} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: C.rasp }}>{isOn ? "❚❚" : "▶"}</button>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-[0.15em]" style={{ color: C.rasp }}>Episode {e.n} · {e.len}</div>
                  <h3 className="truncate font-serif text-lg" style={{ color: C.teal }}>{e.t}</h3>
                </div>
              </div>
              {isOn && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: C.blueSoft }}>
                    <div className="h-full rounded-full" style={{ width: "36%", backgroundColor: C.rasp }} />
                  </div>
                  <span className="text-xs" style={{ color: C.teal, opacity: 0.7 }}>13:42 / {e.len}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl p-8 text-center" style={{ backgroundColor: C.teal, color: C.cream }}>
        <h2 className="font-serif text-2xl italic">Loved an episode? Take the next step.</h2>
        <Link href="/demos/strive/apply" className="mt-6 inline-block rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</Link>
      </div>
    </main>
  );
};

export default Podcast;
