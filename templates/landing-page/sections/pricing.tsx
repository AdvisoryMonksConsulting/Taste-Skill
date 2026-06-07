import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LandingContent } from "../content";

export function Pricing({ brand, pricing }: Pick<LandingContent, "brand" | "pricing">) {
  return (
    <section id="pricing" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className={"text-sm font-semibold uppercase tracking-wide " + brand.accentText}>{pricing.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{pricing.heading}</h2>
        </div>
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {pricing.plans.map((p) => (
            <div
              key={p.name}
              className={
                "flex flex-col rounded-2xl border p-8 " +
                (p.highlighted
                  ? `${brand.accentSoftBorder} ${brand.accentSoftBg} shadow-lg ring-1 ${brand.accentRing}`
                  : "border-neutral-200 bg-white")
              }
            >
              <h3 className="text-lg font-semibold text-neutral-900">{p.name}</h3>
              <p className="mt-1 text-sm text-neutral-500">{p.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-neutral-900">{p.price}</span>
                {p.cadence && <span className="text-neutral-500">{p.cadence}</span>}
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-neutral-700">
                    <Check className={"mt-0.5 h-4 w-4 shrink-0 " + brand.accentText} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={"mt-8 w-full " + (p.highlighted ? brand.accent + " text-white" : "")}
                variant={p.highlighted ? "default" : "outline"}
              >
                <a href="#cta">{p.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
