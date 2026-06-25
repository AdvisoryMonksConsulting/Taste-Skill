import type { Metadata } from "next";
import Link from "next/link";
import { DESIGNS } from "../../../../templates/landing-page/investher/content";

export const metadata: Metadata = {
  title: "The Real Estate InvestHER — 5 design directions by Veska",
  description: "Five genuinely different homepage directions — layout, type and color. Pick a favorite.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0e1320] px-6 py-16 text-white font-sans">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.3em] text-white/50">A concept for The Real Estate InvestHER</p>
        <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Five directions. Not five colors — five designs.</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">
          Each is a different take on layout, typography, structure and color for a
          higher-converting InvestHER homepage. Open the full concepts and tell us which
          feels most like you — we’ll refine the winner.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {DESIGNS.map((d, i) => (
            <Link
              key={d.slug}
              href={`/demos/investher/${d.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition hover:-translate-y-1 hover:border-white/25"
            >
              <div className="flex h-32 items-end p-5" style={{ background: `linear-gradient(135deg, ${d.grad[0]}, ${d.grad[1]})` }}>
                <div className="flex gap-2">
                  {d.swatch.map((sw) => (
                    <span key={sw} className="h-6 w-6 rounded-full ring-1 ring-white/30" style={{ backgroundColor: sw }} />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-serif text-2xl">{d.name}</h2>
                  <span className="text-sm text-white/40">0{i + 1}</span>
                </div>
                <p className="mt-2 text-sm text-white/65">{d.approach}</p>
                <span className="mt-4 inline-block text-sm font-medium text-white/80 group-hover:text-white">View full concept →</span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-14 text-center text-sm text-white/40">Concepts by Veska — a brand of Advisory Monks Consulting · veskadesign.com</p>
      </div>
    </main>
  );
}
