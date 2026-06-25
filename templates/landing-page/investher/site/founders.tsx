"use client";

import type { FC } from "react";
import Link from "next/link";
import { Photo } from "../ui";
import { C, IMG } from "../strive";
import { Reveal } from "./widgets";

const BIOS = [
  { name: "Liz Faircloth", role: "Co-founder", img: IMG.founders, bio: "Liz built a multi-million-dollar real estate portfolio alongside her husband — and still found herself craving something more purposeful: a place of her own in the business, and a way to help other women find theirs. She co-founded InvestHER to build the community she wished she’d had." },
  { name: "Andresa Guidelli", role: "Co-founder", img: IMG.method, bio: "Andresa came to real estate as an immigrant and entrepreneur, then through a divorce that, in her words, cost her her voice and her spark. Rebuilding both taught her that success on paper means little without a life that feels like yours — the belief at the heart of STRIVE." },
];

const Founders: FC<{ base?: string }> = ({ base = "/demos/strive" }) => (
  <Reveal>
    <section className="px-6 py-16 text-center">
      <p className="t-reveal text-[12px] font-bold uppercase tracking-[0.3em]" style={{ color: C.rasp }}>The founders</p>
      <h1 className="t-reveal mt-3 font-serif text-4xl sm:text-6xl" style={{ color: C.teal }}>Built by women who invest.</h1>
      <p className="t-reveal mx-auto mt-5 max-w-2xl text-lg" style={{ color: C.teal, opacity: 0.8 }}>What started in 2018 as one virtual mastermind is now a global movement of 50,000+ women — built on a single belief: every woman has the birthright to become financially free.</p>
    </section>

    {BIOS.map((b, i) => (
      <section key={b.name} className="py-12" style={{ backgroundColor: i % 2 ? C.blue : C.cream }}>
        <div className={`mx-auto grid max-w-5xl items-center gap-12 px-6 md:grid-cols-[1fr_1.2fr] ${i % 2 ? "md:[direction:rtl]" : ""}`}>
          <div className="t-reveal t-scale-in aspect-[4/5] overflow-hidden rounded-sm [direction:ltr]"><Photo src={b.img} label={b.name} /></div>
          <div className="t-reveal [direction:ltr]">
            <p className="text-[12px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rasp }}>{b.role}</p>
            <h2 className="mt-2 font-serif text-4xl" style={{ color: C.teal }}>{b.name}</h2>
            <p className="mt-5 leading-relaxed" style={{ color: C.teal, opacity: 0.9 }}>{b.bio}</p>
          </div>
        </div>
      </section>
    ))}

    <section className="px-6 py-20 text-center" style={{ backgroundColor: C.teal, color: C.cream }}>
      <h2 className="t-reveal font-serif text-3xl italic sm:text-4xl">Come build with us.</h2>
      <Link href={`${base}/apply`} className="t-reveal mt-8 inline-block rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white" style={{ backgroundColor: C.rasp }}>Apply to STRIVE</Link>
    </section>
  </Reveal>
);

export default Founders;
