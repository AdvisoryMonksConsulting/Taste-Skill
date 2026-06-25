import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static HTML/CSS/JS in ./out — host anywhere (Cloudflare Pages, etc.)
  trailingSlash: true, // emit each route as <route>/index.html — avoids file-vs-folder clashes on static hosts
  images: { unoptimized: true },
};

export default nextConfig;
