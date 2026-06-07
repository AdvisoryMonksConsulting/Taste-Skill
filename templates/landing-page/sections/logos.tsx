import type { LandingContent } from "../content";

export function Logos({ logos }: { logos: NonNullable<LandingContent["logos"]> }) {
  return (
    <section className="border-b border-neutral-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">{logos.caption}</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logos.names.map((n) => (
            <span key={n} className="text-xl font-semibold text-neutral-300">{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
