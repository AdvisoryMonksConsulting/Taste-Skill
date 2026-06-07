import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static HTML/CSS/JS in ./out — host anywhere (Cloudflare Pages, etc.)
  images: { unoptimized: true },
};

export default nextConfig;
