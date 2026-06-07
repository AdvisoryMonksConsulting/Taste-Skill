import { Button } from "@/components/ui/button";
import type { LandingContent } from "../content";

export function Hero({ brand, hero, nav }: Pick<LandingContent, "brand" | "hero" | "nav">) {
  return (
    <header className="relative overflow-hidden border-b border-neutral-200 bg-white">
      {/* nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className={"text-lg font-semibold tracking-tight " + brand.heading}>{brand.name}</span>
        <div className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-neutral-600 transition-colors hover:text-neutral-900">
              {n.label}
            </a>
          ))}
        </div>
        <Button asChild className={brand.accent + " text-white"}>
          <a href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</a>
        </Button>
      </nav>

      {/* hero */}
      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-20 text-center sm:pt-28">
        <div className={"pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl " + brand.gradientFrom} />
        {hero.badge && (
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm text-neutral-600">
            <span className={"h-1.5 w-1.5 rounded-full " + brand.accent.split(" ")[0]} />
            {hero.badge}
          </div>
        )}
        <h1 className={"mx-auto max-w-3xl text-balance text-4xl font-light tracking-[-0.02em] sm:text-6xl " + brand.heading}>
          {hero.headline}{" "}
          {hero.headlineAccent && <span className={brand.accentText}>{hero.headlineAccent}</span>}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-neutral-600">{hero.sub}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className={brand.accent + " px-8 text-white"}>
            <a href={hero.ctaPrimary.href}>{hero.ctaPrimary.label}</a>
          </Button>
          {hero.ctaSecondary && (
            <Button asChild size="lg" variant="outline">
              <a href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</a>
            </Button>
          )}
        </div>
        {hero.trustLine && <p className="mt-4 text-sm text-neutral-500">{hero.trustLine}</p>}
      </div>
    </header>
  );
}
