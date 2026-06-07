import type { FC } from "react";

/**
 * 10 genuinely distinct landing-page DESIGNS (not one template recolored).
 * Each is a different layout + aesthetic to show range. Text content comes from
 * the sample; the look is defined by the design itself.
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

/* 1 — Enterprise / Stats (navy, structured, trust-led) */
const EnterpriseStats: FC<P> = ({ d }) => (
  <main className="bg-white text-slate-800">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-semibold tracking-tight text-[#061C33]">{d.name}</span>
      <a href="#" className="rounded-md bg-[#061C33] px-4 py-2 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-[#061C33]/60">{d.industry}</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-[#061C33] sm:text-5xl">
          {d.headline} {d.headlineAccent}
        </h1>
        <p className="mt-5 max-w-md text-lg text-slate-600">{d.sub}</p>
        <div className="mt-8 flex gap-3">
          <a href="#" className="rounded-md bg-[#061C33] px-6 py-3 text-sm font-medium text-white">{d.ctaPrimary}</a>
          {d.ctaSecondary && <a href="#" className="rounded-md border border-slate-300 px-6 py-3 text-sm font-medium">{d.ctaSecondary}</a>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[["99.9%", "uptime SLA"], ["5 min", "to set up"], ["$2B+", "processed"], ["4.9/5", "customer rating"]].map(([n, l]) => (
          <div key={l} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-3xl font-bold text-[#061C33]">{n}</div>
            <div className="mt-1 text-sm text-slate-500">{l}</div>
          </div>
        ))}
      </div>
    </section>
    <section className="border-t border-slate-100 bg-slate-50 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-4">
        {d.features.map((f) => (
          <div key={f.title}><h3 className="font-semibold text-[#061C33]">{f.title}</h3><p className="mt-2 text-sm text-slate-600">{f.description}</p></div>
        ))}
      </div>
    </section>
  </main>
);

/* 2 — Dark split (Linear-style: dark bg + mock app window) */
const DarkSplit: FC<P> = ({ d }) => (
  <main className="bg-[#08090a] text-white">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-semibold tracking-tight">{d.name}</span>
      <a href="#" className="rounded-lg bg-[#5e6ad2] px-4 py-2 text-sm font-medium">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
      <div>
        {d.badge && <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#828fff]">{d.badge}</span>}
        <h1 className="mt-6 text-5xl font-medium leading-[1.05] tracking-tight text-[#f7f8f8]">
          {d.headline} <span className="text-[#828fff]">{d.headlineAccent}</span>
        </h1>
        <p className="mt-5 max-w-md text-lg text-[#8a8f98]">{d.sub}</p>
        <div className="mt-8 flex gap-3">
          <a href="#" className="rounded-lg bg-[#5e6ad2] px-6 py-3 text-sm font-medium">{d.ctaPrimary}</a>
          {d.ctaSecondary && <a href="#" className="rounded-lg border border-white/10 px-6 py-3 text-sm font-medium text-[#d0d6e0]">{d.ctaSecondary}</a>}
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#0f1011] p-3 shadow-2xl">
        <div className="flex gap-1.5 px-2 py-2"><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /><span className="h-2.5 w-2.5 rounded-full bg-white/15" /></div>
        <div className="space-y-3 rounded-lg bg-[#08090a] p-5">
          <div className="h-3 w-1/2 rounded bg-white/10" />
          <div className="h-3 w-3/4 rounded bg-white/10" />
          <div className="h-24 rounded-lg bg-gradient-to-br from-[#5e6ad2]/30 to-transparent" />
          <div className="h-3 w-2/3 rounded bg-white/10" />
        </div>
      </div>
    </section>
  </main>
);

/* 3 — Mono / brutalist (dev tool) */
const Mono: FC<P> = ({ d }) => (
  <main className="bg-white font-mono text-black">
    <nav className="flex items-center justify-between border-b-2 border-black px-6 py-4">
      <span className="font-bold uppercase tracking-tight">{d.name}</span>
      <a href="#" className="border-2 border-black bg-black px-4 py-2 text-sm font-bold text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-5xl px-6 py-24">
      {d.badge && <span className="border-2 border-black px-2 py-1 text-xs font-bold uppercase">{d.badge}</span>}
      <h1 className="mt-6 text-5xl font-bold uppercase leading-[1.02] tracking-tight sm:text-7xl">
        {d.headline} <span className="bg-[#059669] px-2 text-white">{d.headlineAccent}</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg">{d.sub}</p>
      <a href="#" className="mt-8 inline-block border-2 border-black bg-[#059669] px-7 py-3 font-bold text-white shadow-[5px_5px_0_#000]">{d.ctaPrimary} →</a>
    </section>
    <section className="grid border-y-2 border-black md:grid-cols-4">
      {d.features.map((f, i) => (
        <div key={f.title} className={"p-6 " + (i ? "border-t-2 border-black md:border-l-2 md:border-t-0" : "")}>
          <h3 className="font-bold uppercase">{f.title}</h3><p className="mt-2 text-sm">{f.description}</p>
        </div>
      ))}
    </section>
  </main>
);

/* 4 — Soft product / D2C (cream, serif, blob) */
const SoftProduct: FC<P> = ({ d }) => (
  <main className="bg-[#fbf7f4] text-stone-800">
    <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
      <span className="font-serif text-xl text-[#e11d48]">{d.name}</span>
      <a href="#" className="rounded-full bg-[#e11d48] px-5 py-2 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-3xl px-6 pb-20 pt-10 text-center">
      <div className="mx-auto mb-10 h-44 w-44 rounded-full bg-gradient-to-br from-[#fda4af] via-[#e11d48] to-[#9f1239] shadow-xl" />
      {d.badge && <p className="text-sm uppercase tracking-widest text-stone-400">{d.badge}</p>}
      <h1 className="mt-4 font-serif text-5xl leading-tight text-stone-900">{d.headline} <em className="text-[#e11d48]">{d.headlineAccent}</em></h1>
      <p className="mx-auto mt-5 max-w-lg text-lg text-stone-600">{d.sub}</p>
      <a href="#" className="mt-8 inline-block rounded-full bg-[#e11d48] px-8 py-3 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </section>
    <section className="mx-auto grid max-w-4xl gap-6 px-6 pb-20 sm:grid-cols-2">
      {d.features.map((f) => (
        <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm"><h3 className="font-serif text-lg text-stone-900">{f.title}</h3><p className="mt-2 text-sm text-stone-600">{f.description}</p></div>
      ))}
    </section>
  </main>
);

/* 5 — Pastel playful (health) */
const Pastel: FC<P> = ({ d }) => (
  <main className="bg-gradient-to-b from-teal-50 to-sky-50 text-slate-800">
    <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
      <span className="text-xl font-bold text-teal-600">{d.name}</span>
      <a href="#" className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/30">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      {d.badge && <span className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-teal-600 shadow-sm">{d.badge}</span>}
      <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">{d.headline} <span className="text-teal-500">{d.headlineAccent}</span></h1>
      <p className="mx-auto mt-5 max-w-lg text-lg text-slate-600">{d.sub}</p>
      <div className="mt-8 flex justify-center gap-3">
        <a href="#" className="rounded-full bg-teal-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/30">{d.ctaPrimary}</a>
        {d.ctaSecondary && <a href="#" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-teal-700 shadow-sm">{d.ctaSecondary}</a>}
      </div>
    </section>
    <section className="mx-auto grid max-w-4xl gap-5 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
      {d.features.map((f) => (
        <div key={f.title} className="rounded-3xl bg-white/70 p-6 backdrop-blur"><h3 className="font-bold text-slate-900">{f.title}</h3><p className="mt-2 text-sm text-slate-600">{f.description}</p></div>
      ))}
    </section>
  </main>
);

/* 6 — Editorial serif (real estate) */
const Editorial: FC<P> = ({ d }) => (
  <main className="bg-[#faf8f3] text-stone-800">
    <nav className="mx-auto flex max-w-5xl items-center justify-between border-b border-stone-300 px-6 py-5">
      <span className="font-serif text-xl tracking-tight">{d.name}</span>
      <a href="#" className="text-sm font-medium underline decoration-[#d97706] decoration-2 underline-offset-4">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-5xl px-6 py-20">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-[#d97706]">{d.industry}</p>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-stone-900 sm:text-6xl">{d.headline} {d.headlineAccent}</h1>
        <p className="text-lg leading-relaxed text-stone-600">{d.sub}</p>
      </div>
      <a href="#" className="mt-10 inline-block bg-stone-900 px-8 py-3 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </section>
    <section className="mx-auto max-w-5xl border-t border-stone-300 px-6 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        {d.features.map((f, i) => (
          <div key={f.title}><div className="font-serif text-2xl text-[#d97706]">0{i + 1}</div><h3 className="mt-2 font-medium text-stone-900">{f.title}</h3><p className="mt-1 text-sm text-stone-600">{f.description}</p></div>
        ))}
      </div>
    </section>
  </main>
);

/* 7 — Minimal centered (light, clean) */
const MinimalCentered: FC<P> = ({ d }) => (
  <main className="bg-white text-neutral-800">
    <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
      <span className="font-semibold tracking-tight text-neutral-900">{d.name}</span>
      <a href="#" className="rounded-md bg-[#2563eb] px-4 py-2 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      {d.badge && <span className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm text-neutral-600">{d.badge}</span>}
      <h1 className="mt-6 text-5xl font-semibold tracking-tight text-neutral-900 sm:text-6xl">{d.headline} <span className="text-[#2563eb]">{d.headlineAccent}</span></h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-600">{d.sub}</p>
      <div className="mt-9 flex justify-center gap-3">
        <a href="#" className="rounded-md bg-[#2563eb] px-7 py-3 text-sm font-medium text-white">{d.ctaPrimary}</a>
        {d.ctaSecondary && <a href="#" className="rounded-md border border-neutral-300 px-7 py-3 text-sm font-medium">{d.ctaSecondary}</a>}
      </div>
    </section>
    <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
      {d.features.map((f) => (
        <div key={f.title} className="rounded-xl border border-neutral-200 p-6"><h3 className="font-semibold text-neutral-900">{f.title}</h3><p className="mt-2 text-sm text-neutral-600">{f.description}</p></div>
      ))}
    </section>
  </main>
);

/* 8 — Gradient vivid (crypto) */
const Gradient: FC<P> = ({ d }) => (
  <main className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-semibold tracking-tight">{d.name}</span>
      <a href="#" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-700">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-4xl px-6 py-24 text-center">
      {d.badge && <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm backdrop-blur">{d.badge}</span>}
      <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight sm:text-7xl">{d.headline} {d.headlineAccent}</h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-white/80">{d.sub}</p>
      <a href="#" className="mt-9 inline-block rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-purple-700 shadow-xl">{d.ctaPrimary}</a>
    </section>
    <section className="mx-auto grid max-w-5xl gap-5 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
      {d.features.map((f) => (
        <div key={f.title} className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur"><h3 className="font-semibold">{f.title}</h3><p className="mt-2 text-sm text-white/75">{f.description}</p></div>
      ))}
    </section>
  </main>
);

/* 9 — Bold oversized (education) */
const Bold: FC<P> = ({ d }) => (
  <main className="bg-[#fafafa] text-neutral-900">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <span className="text-xl font-black tracking-tight">{d.name}</span>
      <a href="#" className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto max-w-5xl px-6 py-20">
      {d.badge && <span className="text-sm font-bold uppercase tracking-widest text-[#0284c7]">{d.badge}</span>}
      <h1 className="mt-4 text-6xl font-black leading-[0.95] tracking-tighter sm:text-8xl">
        {d.headline} <span className="bg-[#0284c7] px-3 text-white">{d.headlineAccent}</span>
      </h1>
      <p className="mt-8 max-w-xl text-xl text-neutral-600">{d.sub}</p>
      <a href="#" className="mt-9 inline-block rounded-full bg-[#0284c7] px-9 py-4 text-base font-bold text-white">{d.ctaPrimary}</a>
    </section>
    <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-4">
      {d.features.map((f) => (
        <div key={f.title} className="rounded-2xl border-2 border-neutral-900 p-6"><h3 className="text-lg font-black">{f.title}</h3><p className="mt-2 text-sm text-neutral-600">{f.description}</p></div>
      ))}
    </section>
  </main>
);

/* 10 — Split visual (travel; text + large image block) */
const SplitVisual: FC<P> = ({ d }) => (
  <main className="bg-white text-stone-800">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <span className="font-serif text-xl tracking-tight text-[#c2410c]">{d.name}</span>
      <a href="#" className="rounded-md bg-[#c2410c] px-4 py-2 text-sm font-medium text-white">{d.ctaPrimary}</a>
    </nav>
    <section className="mx-auto grid max-w-6xl items-stretch gap-10 px-6 py-16 lg:grid-cols-2">
      <div className="flex flex-col justify-center">
        {d.badge && <p className="text-sm uppercase tracking-widest text-stone-400">{d.badge}</p>}
        <h1 className="mt-3 font-serif text-5xl leading-tight text-stone-900 sm:text-6xl">{d.headline} <span className="text-[#c2410c]">{d.headlineAccent}</span></h1>
        <p className="mt-5 max-w-md text-lg text-stone-600">{d.sub}</p>
        <div className="mt-8 flex gap-3">
          <a href="#" className="rounded-md bg-[#c2410c] px-7 py-3 text-sm font-medium text-white">{d.ctaPrimary}</a>
          {d.ctaSecondary && <a href="#" className="rounded-md border border-stone-300 px-7 py-3 text-sm font-medium">{d.ctaSecondary}</a>}
        </div>
      </div>
      <div className="min-h-[360px] rounded-3xl bg-gradient-to-br from-[#fdba74] via-[#c2410c] to-[#7c2d12] shadow-2xl" />
    </section>
    <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-16 md:grid-cols-4">
      {d.features.map((f) => (
        <div key={f.title}><h3 className="font-serif text-lg text-stone-900">{f.title}</h3><p className="mt-2 text-sm text-stone-600">{f.description}</p></div>
      ))}
    </section>
  </main>
);

export const designBySlug: Record<string, FC<P>> = {
  northwind: EnterpriseStats,
  cortex: DarkSplit,
  forge: Mono,
  lume: SoftProduct,
  pulse: Pastel,
  acre: Editorial,
  signal: MinimalCentered,
  ledger: Gradient,
  scholar: Bold,
  sojourn: SplitVisual,
};

export function getDesign(slug: string): FC<P> {
  return designBySlug[slug] ?? MinimalCentered;
}
