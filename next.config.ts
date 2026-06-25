import type { NextConfig } from "next";

/**
 * Next.js config. Kept minimal and Vercel-ready — the App Router, TypeScript,
 * and next/font all work with zero extra config on Vercel. React strict mode
 * is on to surface effect/animation bugs early.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
