import type { Metadata } from "next";
import { InvestHerDemo } from "../../../../templates/landing-page/investher";

export const metadata: Metadata = {
  title: "The Real Estate InvestHER — concept by Veska",
  description: "A higher-converting homepage concept for The Real Estate InvestHER.",
};

export default function Page() {
  return <InvestHerDemo />;
}
