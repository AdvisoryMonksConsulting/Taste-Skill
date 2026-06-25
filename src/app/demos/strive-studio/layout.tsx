import type { Metadata } from "next";
import { SiteShell } from "../../../../templates/landing-page/investher/site/shell";
export const metadata: Metadata = { title: "Studio — STRIVE concept by Veska" };
export default function L({ children }: { children: React.ReactNode }) {
  return <SiteShell base="/demos/strive-studio" variant="sidebar">{children}</SiteShell>;
}
