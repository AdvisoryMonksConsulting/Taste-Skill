import type { Metadata } from "next";
import { SiteShell } from "../../../../templates/landing-page/investher/site/shell";

export const metadata: Metadata = {
  title: "STRIVE — The Real Estate InvestHER (concept by Veska)",
  description: "An interactive concept site for STRIVE, modeled on The Real Estate InvestHER's brand.",
};

export default function StriveLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
