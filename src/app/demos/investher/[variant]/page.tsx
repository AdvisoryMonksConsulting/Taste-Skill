import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { themes, getTheme } from "../../../../../templates/landing-page/investher-themes";
import { InvestHerDemo } from "../../../../../templates/landing-page/investher";

export function generateStaticParams() {
  return themes.map((t) => ({ variant: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant } = await params;
  const t = getTheme(variant);
  if (!t) return {};
  return { title: `InvestHER — ${t.name} concept by Veska`, description: t.vibe };
}

export default async function Page({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const t = getTheme(variant);
  if (!t) notFound();
  return <InvestHerDemo t={t} />;
}
