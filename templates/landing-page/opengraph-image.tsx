import { ImageResponse } from "next/og";
import { content } from "./content";

// Dynamic OG image (1200x630) generated from content.ts brand + headline.
// Next picks this up automatically when the file sits next to a route's page.tsx.
export const alt = content.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #02080f 0%, #061C33 100%)",
          padding: "80px",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 600, opacity: 0.7 }}>{content.brand.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
            {`${content.hero.headline} ${content.hero.headlineAccent ?? ""}`}
          </div>
          <div style={{ fontSize: 30, opacity: 0.75, maxWidth: 820 }}>{content.seo.description}</div>
        </div>
      </div>
    ),
    size
  );
}
