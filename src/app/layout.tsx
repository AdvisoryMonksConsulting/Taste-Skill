import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NRI Signal Radar · AdvisoryMonks",
  description:
    "A live feed of public posts where NRIs ask for tax & CA help — classified by problem type and urgency, with suggested outreach angles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
