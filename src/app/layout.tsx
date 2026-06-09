import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Founder Research Agents",
  description:
    "Pitch a startup idea and get a multi-agent market research report: competitors, pricing, funding, gaps, positioning, and a launch plan.",
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
