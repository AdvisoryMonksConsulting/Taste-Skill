"use client";

import { useState } from "react";
import type { FC } from "react";
import Link from "next/link";
import { Photo, Crest } from "../ui";
import { C, IMG, METHOD, PRINCIPLES } from "../strive";

const Method: FC<{ base?: string }> = ({ base = "/demos/strive" }) => {
  const [active, setActive] = useState(0);
  return (
    <main>
      <section className="px-6 py-16 text-center">
        <div className="flex justify-center"><Crest size={56} /></div>
        <h1 className="mt-6 font-serif text-4xl sm:text-6xl" style={{ color: C.teal }}>{METHOD.title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: C.teal, opacity: 0.85 }}>{METHOD.body}</p>
      </section>

      {/* interactive principle explorer */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="text-center text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>The 5 Principles · tap to explore</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* tabs */}
          <div className="flex flex-col gap-2">
            {PRINCIPLES.map((p, i) => (
              <button key={p.t} onClick={() => setActive(i)} className="flex items-center gap-4 rounded-xl px-5 py-4 text-left transition"
                style={{ backgroundColor: i === active ? C.teal : "#fff", color: i === active ? "#fff" : C.teal, border: `1px solid ${i === active ? C.teal : C.blue}` }}>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: C.rasp, color: "#fff" }}>{i + 1}</span>
                <span className="font-serif text-lg leading-tight">{p.t}</span>
              </button>
            ))}
          </div>
          {/* detail */}
          <div className="rounded-2xl p-8" style={{ backgroundColor: C.blue }}>
            <div className="aspect-[16/9] overflow-hidden rounded-lg"><Photo src={[IMG.p1, IMG.p2, IMG.p3, IMG.p4, IMG.method][active]} bw={active < 4} label="Detail" /></div>
            <h2 className="mt-6 font-serif text-3xl" style={{ color: C.teal }}>{PRINCIPLES[active].t}</h2>
            <p className="mt-3 leading-relaxed" style={{ color: C.teal, opacity: 0.9 }}>{PRINCIPLES[active].d}</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setActive((active + 1) % PRINCIPLES.length)} className="rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white" style={{ backgroundColor: C.rasp }}>Next principle →</button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center" style={{ backgroundColor: C.teal, color: C.cream }}>
        <h2 className="font-serif text-3xl italic sm:text-4xl">Ready to put the method to work?</h2>
        <Link href={`${base}/apply`} className="mt-8 inline-block rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</Link>
      </section>
    </main>
  );
};

export default Method;
