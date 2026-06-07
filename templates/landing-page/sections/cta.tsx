import { Button } from "@/components/ui/button";
import type { LandingContent } from "../content";

export function Cta({ brand, cta }: Pick<LandingContent, "brand" | "cta">) {
  return (
    <section id="cta" className="bg-neutral-950 py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{cta.heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-400">{cta.sub}</p>
        <Button asChild size="lg" className={"mt-10 px-8 " + brand.accent + " text-white"}>
          <a href={cta.button.href}>{cta.button.label}</a>
        </Button>
      </div>
    </section>
  );
}
