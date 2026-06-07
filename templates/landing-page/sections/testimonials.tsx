import { Card } from "@/components/ui/card";
import type { LandingContent } from "../content";

export function Testimonials({
  brand,
  testimonials,
}: {
  brand: LandingContent["brand"];
  testimonials: NonNullable<LandingContent["testimonials"]>;
}) {
  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className={"mx-auto max-w-2xl text-center text-3xl font-medium tracking-[-0.01em] sm:text-4xl " + brand.heading}>
          {testimonials.heading}
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t) => (
            <Card key={t.name} className={"flex flex-col justify-between border-neutral-200/70 p-8 " + brand.shadow}>
              <p className="text-pretty text-neutral-800">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6">
                <p className={"font-semibold " + brand.heading}>{t.name}</p>
                <p className="text-sm text-neutral-500">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
