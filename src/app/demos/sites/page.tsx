import type { Metadata } from "next";
import Link from "next/link";
import { C } from "../../../../templates/landing-page/investher/strive";

export const metadata: Metadata = {
  title: "STRIVE — 5 website concepts by Veska",
  description: "Five complete, interactive website directions for The Real Estate InvestHER's STRIVE. Browse them all.",
};

const SITES = [
  { href: "/demos/strive", name: "Editorial", nav: "Top navigation", blurb: "Magazine-dense — serif + italic script, pain-point cards, the 5 Principles flanked by B&W detail strips.", grad: ["#1e4d48", "#a7c3cd"] },
  { href: "/demos/strive-atelier", name: "Atelier", nav: "Minimal · transparent over hero", blurb: "Minimal luxury — full-screen hero and the 5 Principles as alternating full-bleed image panels. Vast whitespace.", grad: ["#163a36", "#1e4d48"] },
  { href: "/demos/strive-studio", name: "Studio", nav: "Fixed left sidebar", blurb: "Agency / product — sidebar nav, metric cards, the X-Ray as a feature card, a modular principle grid.", grad: ["#1e4d48", "#a5113f"] },
  { href: "/demos/strive-journal", name: "Journal", nav: "Editorial masthead", blurb: "Magazine — cover-story hero, an article grid, a pull-quote and a 'from the podcast' rail. Columns and serif.", grad: ["#a7c3cd", "#1e4d48"] },
  { href: "/demos/strive-momentum", name: "Momentum", nav: "Dark · bold", blurb: "Bold & dynamic — dark hero, a scrolling marquee, big animated counters and high-contrast blocks.", grad: ["#163a36", "#a5113f"] },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0e1320] px-6 py-16 text-white font-sans">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">The Real Estate InvestHER · STRIVE</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Five complete websites. One brand.</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">
          Each is a fully interactive, multi-page site — different navigation, layout and
          structure, built on the same brand and content. Open any one and click around;
          every page works. Tell us which direction feels right and we’ll take it all the way.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SITES.map((s, i) => (
            <Link key={s.href} href={s.href} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-white/25">
              <div className="flex h-32 items-end justify-between p-5" style={{ background: `linear-gradient(135deg, ${s.grad[0]}, ${s.grad[1]})` }}>
                <span className="font-serif text-2xl">{s.name}</span>
                <span className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ backgroundColor: "rgba(255,255,255,.15)" }}>{s.nav}</span>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <span className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/50">Site 0{i + 1}</span>
                  <span className="text-sm font-medium text-white/80 group-hover:text-white">Open site →</span>
                </div>
                <p className="mt-3 text-sm text-white/65">{s.blurb}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 p-6 text-sm text-white/55">
          Each site includes Home · The Method · Founders · Podcast · FAQ · Apply · Login — with a working
          mobile menu, animated counters, an interactive Portfolio X-Ray, a testimonials carousel, a tabbed
          method explorer, an FAQ accordion and a multi-step application form.
        </div>

        <p className="mt-10 text-center text-sm text-white/40">Concepts by Veska — a brand of Advisory Monks Consulting · veskadesign.com</p>
      </div>
    </main>
  );
}
