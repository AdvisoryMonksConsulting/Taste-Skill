"use client";

import type { FC } from "react";
import Link from "next/link";
import { C, FAQS } from "../strive";
import { Accordion } from "./widgets";

const Faq: FC<{ base?: string }> = ({ base = "/demos/strive" }) => (
  <main className="mx-auto max-w-3xl px-6 py-16">
    <p className="text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>FAQ</p>
    <h1 className="mt-3 font-serif text-4xl sm:text-6xl" style={{ color: C.teal }}>Questions, answered.</h1>
    <p className="mt-4 max-w-xl" style={{ opacity: 0.72 }}>Everything you might want to know before applying. Still curious? The application is the fastest way to a real conversation.</p>
    <div className="mt-10"><Accordion items={FAQS} /></div>
    <div className="mt-12 rounded-2xl p-8 text-center" style={{ backgroundColor: C.blue }}>
      <h2 className="font-serif text-2xl" style={{ color: C.teal }}>Still deciding?</h2>
      <p className="mt-2" style={{ color: C.teal, opacity: 0.85 }}>Take the 60-second Portfolio X-Ray or start your application.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href={base} className="rounded-full border px-7 py-3 text-sm font-bold uppercase tracking-[0.15em]" style={{ borderColor: C.teal, color: C.teal }}>Take the X-Ray</Link>
        <Link href={`${base}/apply`} className="rounded-full px-7 py-3 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply now</Link>
      </div>
    </div>
  </main>
);

export default Faq;
