import { Card } from "@/components/ui/card";
import type { LandingContent } from "../content";

export function Features({ brand, features }: Pick<LandingContent, "brand" | "features">) {
  return (
    <section id="features" className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className={"text-sm font-semibold uppercase tracking-wide " + brand.accentText}>{features.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{features.heading}</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {features.items.map((f) => (
            <Card key={f.title} className="border-neutral-200 p-8">
              <h3 className="text-lg font-semibold text-neutral-900">{f.title}</h3>
              <p className="mt-2 text-neutral-600">{f.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
