import type { FC } from "react";

/**
 * 10 premium, cinematic landing-page DESIGNS — Awwwards "Site of the Day" feel,
 * built entirely with CSS (glowing orbs, aurora/mesh gradients, glass, gradient
 * "photo" heroes, dashboard/app mockups, bento grids). No external images.
 * Complex gradients use inline styles (Tailwind v4 drops comma'd arbitrary values).
 */
export type DesignContent = {
  name: string;
  industry: string;
  badge?: string;
  headline: string;
  headlineAccent?: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary?: string;
  features: { title: string; description: string }[];
};
type P = { d: DesignContent };

const BARS = [42, 68, 55, 88, 63, 79, 48, 92, 58, 74];

/* 1 — Northwind · dark analytics dashboard (fintech) */
const DarkDashboard: FC<P> = ({ d }) => (
  <main className="relative overflow-hidden bg-[#0a0b0f] text-white">
    <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
    <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-semibold tracking-tight">{d.name}</span>
      <a href="#" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-[#0a0b0f]">{d.ctaPrimary}</a>
    </nav>
    <section className="relative mx-auto max-w-6xl px-6 pt-16 text-center">
      {d.badge && <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-indigo-300">{d.badge}</span>}
      <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">{d.headline} <span className="bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent">{d.headlineAccent}</span></h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">{d.sub}</p>
      {/* dashboard mockup */}
      <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left shadow-2xl backdrop-blur">
        <div className="grid gap-4 sm:grid-cols-3">
          {["Reconciled", "Open items", "Cash position"].map((k, i) => (
            <div key={k} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs text-white/40">{k}</div>
              <div className="mt-1 text-2xl font-semibold">{["$2.4M", "12", "$840K"][i]}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-40 items-end gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          {BARS.map((h, i) => (<div key={i} className="flex-1 rounded-t bg-gradient-to-t from-indigo-500/40 to-violet-400" style={{ height: `${h}%` }} />))}
        </div>
      </div>
    </section>
    <section className="relative mx-auto grid max-w-5xl gap-6 px-6 py-20 sm:grid-cols-2 lg:grid-cols-4">
      {d.features.map((f) => (<div key={f.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5"><h3 className="font-semibold">{f.title}</h3><p className="mt-2 text-sm text-white/50">{f.description}</p></div>))}
    </section>
  </main>
);

/* 2 — Cortex · aurora glow + glass ask-bar (AI) */
const Aurora: FC<P> = ({ d }) => (
  <main className="relative min-h-screen overflow-hidden bg-black text-white">
    <div className="pointer-events-none absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-violet-600/40 blur-[120px]" />
    <div className="pointer-events-none absolute right-0 top-20 h-[420px] w-[420px] rounded-full bg-cyan-500/30 blur-[120px]" />
    <div className="pointer-events-none absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-fuchsia-600/25 blur-[120px]" />
    <nav className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-semibold tracking-tight">{d.name}</span>
      <a href="#" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm backdrop-blur">{d.ctaPrimary}</a>
    </nav>
    <section className="relative mx-auto max-w-4xl px-6 pt-24 text-center">
      {d.badge && <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 backdrop-blur">{d.badge}</span>}
      <h1 className="mx-auto mt-6 max-w-3xl text-6xl font-medium leading-[1.05] tracking-tight sm:text-7xl">{d.headline} <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">{d.headlineAccent}</span></h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">{d.sub}</p>
      <div className="mx-auto mt-10 flex max-w-xl items-center gap-3 rounded-2xl border border-white/15 bg-white/5 p-2 pl-5 backdrop-blur-xl">
        <span className="text-white/40">Ask anything…</span>
        <span className="ml-auto rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black">{d.ctaPrimary}</span>
      </div>
    </section>
    <section className="relative mx-auto grid max-w-5xl gap-5 px-6 py-24 sm:grid-cols-2 lg:grid-cols-4">
      {d.features.map((f) => (<div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"><h3 className="font-semibold">{f.title}</h3><p className="mt-2 text-sm text-white/55">{f.description}</p></div>))}
    </section>
  </main>
);

/* 3 — Forge · minimal dev (ElevenLabs-style: clean, monochrome, refined code card) */
const DevCode: FC<P> = ({ d }) => (
  <main className="bg-white text-neutral-900">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-semibold tracking-tight">{d.name}</span>
      <a href="#" className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
      <div>
        {d.badge && <span className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-500">{d.badge}</span>}
        <h1 className="mt-6 text-5xl font-medium leading-[1.05] tracking-tight text-neutral-900">{d.headline} <span className="text-neutral-400">{d.headlineAccent}</span></h1>
        <p className="mt-5 max-w-md text-lg text-neutral-500">{d.sub}</p>
        <div className="mt-8 flex gap-3">
          <a href="#" className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white">{d.ctaPrimary}</a>
          <a href="#" className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-medium text-neutral-700">Read the docs</a>
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-2 shadow-sm">
        <div className="flex gap-1.5 px-3 py-2"><span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /><span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /><span className="h-2.5 w-2.5 rounded-full bg-neutral-300" /></div>
        <pre className="overflow-hidden rounded-xl border border-neutral-100 bg-white p-5 font-mono text-[13px] leading-6 text-neutral-600"><span className="text-neutral-400">$ forge deploy</span>{"\n"}✓ building…{"\n"}✓ preview ready{"\n"}→ app.forge.dev{"\n"}✓ live in 1.2s</pre>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-4">
        {d.features.map((f) => (<div key={f.title} className="bg-white p-6"><h3 className="font-medium text-neutral-900">{f.title}</h3><p className="mt-2 text-sm text-neutral-500">{f.description}</p></div>))}
      </div>
    </section>
  </main>
);

/* 4 — Lumé · glossy product orb (D2C) */
const ProductOrb: FC<P> = ({ d }) => (
  <main className="relative overflow-hidden bg-[#1a1012] text-white">
    <div className="pointer-events-none absolute left-1/2 top-24 h-[460px] w-[460px] -translate-x-1/2 rounded-full blur-[40px]" style={{ background: "radial-gradient(circle at 35% 30%, #fda4af, #e11d48 45%, #4c0519 80%)" }} />
    <nav className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
      <span className="font-serif text-xl">{d.name}</span>
      <a href="#" className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[#1a1012]">{d.ctaPrimary}</a>
    </nav>
    <section className="relative mx-auto max-w-3xl px-6 pb-24 pt-72 text-center">
      {d.badge && <p className="font-serif text-sm uppercase tracking-[0.3em] text-white/50">{d.badge}</p>}
      <h1 className="mt-4 font-serif text-6xl leading-[1.05]">{d.headline} <em className="text-rose-300">{d.headlineAccent}</em></h1>
      <p className="mx-auto mt-5 max-w-md text-lg text-white/60">{d.sub}</p>
      <a href="#" className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-[#1a1012]">{d.ctaPrimary}</a>
    </section>
    <section className="relative mx-auto grid max-w-4xl gap-5 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
      {d.features.map((f) => (<div key={f.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur"><h3 className="font-serif text-lg">{f.title}</h3><p className="mt-2 text-sm text-white/55">{f.description}</p></div>))}
    </section>
  </main>
);

/* 5 — Pulse · soft gradient + phone mockup (health) */
const PhoneApp: FC<P> = ({ d }) => (
  <main className="relative overflow-hidden" style={{ background: "linear-gradient(160deg,#ecfeff,#f0fdfa 40%,#eff6ff)" }}>
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-slate-800">
      <span className="text-xl font-bold text-teal-600">{d.name}</span>
      <a href="#" className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 text-slate-800 lg:grid-cols-2">
      <div>
        {d.badge && <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-teal-600 shadow-sm">{d.badge}</span>}
        <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">{d.headline} <span className="text-teal-500">{d.headlineAccent}</span></h1>
        <p className="mt-5 max-w-md text-lg text-slate-600">{d.sub}</p>
        <a href="#" className="mt-8 inline-block rounded-full bg-teal-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30">{d.ctaPrimary}</a>
      </div>
      <div className="mx-auto w-[260px] rounded-[2.5rem] border-[10px] border-slate-900 bg-white p-4 shadow-2xl">
        <div className="mb-4 h-2 w-16 rounded-full bg-slate-200" />
        <div className="rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 p-4 text-white"><div className="text-xs opacity-80">Next appointment</div><div className="mt-1 font-semibold">Dr. Rao · 4:30pm</div></div>
        <div className="mt-3 space-y-2">{[0, 1, 2].map((i) => (<div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"><div className="h-8 w-8 rounded-full bg-teal-100" /><div className="h-2 flex-1 rounded bg-slate-100" /></div>))}</div>
      </div>
    </section>
    <section className="mx-auto grid max-w-5xl gap-5 px-6 pb-20 text-slate-800 sm:grid-cols-2 lg:grid-cols-4">
      {d.features.map((f) => (<div key={f.title} className="rounded-3xl bg-white/70 p-6 backdrop-blur"><h3 className="font-bold text-slate-900">{f.title}</h3><p className="mt-2 text-sm text-slate-600">{f.description}</p></div>))}
    </section>
  </main>
);

/* 6 — Acre · cinematic landscape (real estate) */
const Cinematic: FC<P> = ({ d }) => (
  <main className="text-white">
    <section className="relative flex min-h-[600px] flex-col" style={{ background: "linear-gradient(180deg,#1e293b 0%,#7c3aed20 30%,#d97706 80%,#fbbf24 100%)" }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.1) 50%,rgba(0,0,0,0.5))" }} />
      <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-serif text-xl">{d.name}</span>
        <a href="#" className="rounded-md bg-white px-4 py-2 text-sm font-medium text-stone-900">{d.ctaPrimary}</a>
      </nav>
      <div className="relative mx-auto mt-auto w-full max-w-6xl px-6 pb-16">
        {d.badge && <p className="text-sm uppercase tracking-[0.3em] text-white/70">{d.badge}</p>}
        <h1 className="mt-3 max-w-2xl font-serif text-6xl leading-[1.02] sm:text-7xl">{d.headline} {d.headlineAccent}</h1>
        <p className="mt-5 max-w-md text-lg text-white/80">{d.sub}</p>
        <a href="#" className="mt-7 inline-block bg-white px-8 py-3 text-sm font-medium text-stone-900">{d.ctaPrimary}</a>
      </div>
    </section>
    <section className="mx-auto grid max-w-6xl gap-8 bg-stone-900 px-6 py-16 md:grid-cols-4">
      {d.features.map((f, i) => (<div key={f.title}><div className="font-serif text-2xl text-amber-400">0{i + 1}</div><h3 className="mt-2 font-medium">{f.title}</h3><p className="mt-1 text-sm text-white/60">{f.description}</p></div>))}
    </section>
  </main>
);

/* 7 — Signal · light bento dashboard (analytics) */
const Bento: FC<P> = ({ d }) => (
  <main className="bg-neutral-50 text-neutral-800">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <span className="font-semibold tracking-tight text-neutral-900">{d.name}</span>
      <a href="#" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-3xl px-6 pt-16 text-center">
      {d.badge && <span className="rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-600">{d.badge}</span>}
      <h1 className="mt-6 text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">{d.headline} <span className="text-blue-600">{d.headlineAccent}</span></h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-600">{d.sub}</p>
      <a href="#" className="mt-8 inline-block rounded-md bg-blue-600 px-7 py-3 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </section>
    <section className="mx-auto grid max-w-5xl auto-rows-[150px] grid-cols-2 gap-4 px-6 py-16 lg:grid-cols-4">
      <div className="col-span-2 row-span-2 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="text-sm text-neutral-500">Active users</div>
        <div className="mt-1 text-3xl font-bold text-neutral-900">48,210</div>
        <div className="mt-6 flex h-28 items-end gap-1.5">{BARS.map((h, i) => (<div key={i} className="flex-1 rounded-t bg-blue-500/80" style={{ height: `${h}%` }} />))}</div>
      </div>
      {d.features.slice(0, 4).map((f) => (<div key={f.title} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"><h3 className="text-sm font-semibold text-neutral-900">{f.title}</h3><p className="mt-1 text-xs text-neutral-500 line-clamp-3">{f.description}</p></div>))}
    </section>
  </main>
);

/* 8 — Ledger · minimal product (ElevenLabs-style: clean, soft single-gradient panel) */
const Crystal: FC<P> = ({ d }) => (
  <main className="bg-white text-neutral-900">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-semibold tracking-tight">{d.name}</span>
      <a href="#" className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-3xl px-6 pt-16 text-center">
      {d.badge && <span className="inline-block rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm text-neutral-500">{d.badge}</span>}
      <h1 className="mx-auto mt-6 max-w-2xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl">{d.headline} <span className="text-neutral-400">{d.headlineAccent}</span></h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-neutral-500">{d.sub}</p>
      <div className="mt-8 flex justify-center gap-3">
        <a href="#" className="rounded-full bg-neutral-900 px-7 py-3 text-sm font-medium text-white">{d.ctaPrimary}</a>
        {d.ctaSecondary && <a href="#" className="rounded-full border border-neutral-200 px-7 py-3 text-sm font-medium text-neutral-700">{d.ctaSecondary}</a>}
      </div>
    </section>
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex h-64 items-center justify-center rounded-3xl border border-neutral-200" style={{ background: "linear-gradient(135deg,#f5f3ff,#eef2ff 55%,#ffffff)" }}>
        <div className="h-24 w-24 rotate-45 rounded-2xl" style={{ background: "linear-gradient(135deg,#c7d2fe,#818cf8)" }} />
      </div>
    </section>
    <section className="mx-auto max-w-5xl px-6 pb-20">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {d.features.map((f) => (<div key={f.title}><h3 className="font-medium text-neutral-900">{f.title}</h3><p className="mt-2 text-sm text-neutral-500">{f.description}</p></div>))}
      </div>
    </section>
  </main>
);

/* 9 — Scholar · minimal editorial (ElevenLabs-style: clean, airy, left-aligned) */
const VividBold: FC<P> = ({ d }) => (
  <main className="bg-[#fafafa] text-neutral-900">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-semibold tracking-tight">{d.name}</span>
      <a href="#" className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-5xl px-6 py-24">
      {d.badge && <span className="text-sm font-medium text-neutral-400">{d.badge}</span>}
      <h1 className="mt-4 max-w-3xl text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">{d.headline} <span className="text-neutral-400">{d.headlineAccent}</span></h1>
      <p className="mt-6 max-w-xl text-xl text-neutral-500">{d.sub}</p>
      <a href="#" className="mt-9 inline-block rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </section>
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {d.features.map((f, i) => (<div key={f.title} className="flex gap-6 py-6"><span className="text-sm text-neutral-300">0{i + 1}</span><div><h3 className="font-medium text-neutral-900">{f.title}</h3><p className="mt-1 text-sm text-neutral-500">{f.description}</p></div></div>))}
      </div>
    </section>
  </main>
);

/* 10 — Sojourn · sunset cinematic + gallery bento (travel) */
const Sunset: FC<P> = ({ d }) => (
  <main className="text-white">
    <section className="relative flex min-h-[560px] flex-col" style={{ background: "linear-gradient(180deg,#312e81,#9333ea 40%,#f97316 80%,#fbbf24)" }}>
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(0,0,0,0.4),transparent 40%,rgba(0,0,0,0.45))" }} />
      <nav className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-serif text-xl">{d.name}</span>
        <a href="#" className="rounded-full bg-white px-5 py-2 text-sm font-medium text-stone-900">{d.ctaPrimary}</a>
      </nav>
      <div className="relative mx-auto mt-auto w-full max-w-4xl px-6 pb-16 text-center">
        {d.badge && <p className="text-sm uppercase tracking-[0.3em] text-white/80">{d.badge}</p>}
        <h1 className="mt-3 font-serif text-6xl leading-[1.02] sm:text-7xl">{d.headline} {d.headlineAccent}</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-white/85">{d.sub}</p>
        <a href="#" className="mt-7 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-stone-900">{d.ctaPrimary}</a>
      </div>
    </section>
    <section className="bg-stone-950 px-6 py-12">
      <div className="mx-auto grid max-w-6xl auto-rows-[120px] grid-cols-2 gap-3 lg:grid-cols-4">
        {["linear-gradient(135deg,#f97316,#be185d)", "linear-gradient(135deg,#0ea5e9,#312e81)", "linear-gradient(135deg,#10b981,#064e3b)", "linear-gradient(135deg,#a855f7,#6b21a8)", "linear-gradient(135deg,#fbbf24,#b45309)", "linear-gradient(135deg,#f43f5e,#7f1d1d)"].map((g, i) => (
          <div key={i} className={"rounded-2xl " + (i === 0 ? "col-span-2 row-span-2" : "")} style={{ background: g }} />
        ))}
      </div>
    </section>
  </main>
);

export const designBySlug: Record<string, FC<P>> = {
  northwind: DarkDashboard,
  cortex: Aurora,
  forge: DevCode,
  lume: ProductOrb,
  pulse: PhoneApp,
  acre: Cinematic,
  signal: Bento,
  ledger: Crystal,
  scholar: VividBold,
  sojourn: Sunset,
};

export function getDesign(slug: string): FC<P> {
  return designBySlug[slug] ?? Bento;
}
