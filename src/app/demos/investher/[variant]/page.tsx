import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DESIGNS, getDesign } from "../../../../../templates/landing-page/investher/content";
import Editorial from "../../../../../templates/landing-page/investher/editorial";
import Boutique from "../../../../../templates/landing-page/investher/boutique";
import Community from "../../../../../templates/landing-page/investher/community";
import Bold from "../../../../../templates/landing-page/investher/bold";
import Heritage from "../../../../../templates/landing-page/investher/heritage";

const REGISTRY: Record<string, React.ComponentType> = {
  editorial: Editorial,
  boutique: Boutique,
  community: Community,
  bold: Bold,
  heritage: Heritage,
};

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ variant: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ variant: string }> }): Promise<Metadata> {
  const { variant } = await params;
  const d = getDesign(variant);
  if (!d) return {};
  return { title: `InvestHER — ${d.name} concept by Veska`, description: d.approach };
}

export default async function Page({ params }: { params: Promise<{ variant: string }> }) {
  const { variant } = await params;
  const Design = REGISTRY[variant];
  if (!Design) notFound();
  return <Design />;
}
