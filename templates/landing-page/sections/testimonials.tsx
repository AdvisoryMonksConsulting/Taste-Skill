import { Card } from "@/components/ui/card";
import type { LandingContent } from "../content";

export function Testimonials({ testimonials }: { testimonials: NonNullable<LandingContent["testimonials"]> }) {
  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          {testimonials.heading}
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.items.map((t) => (
            <Card key={t.name} className="flex flex-col justify-between border-neutral-200 p-8">
              <p className="text-pretty text-neutral-800">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="font-semibold text-neutral-900">{t.name}</p>
                <p className="text-sm text-neutral-500">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
