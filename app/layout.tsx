/**
 * Root layout: loads fonts via next/font (self-hosted, no layout shift),
 * exposes them as CSS variables consumed by the Tailwind config, sets global
 * metadata/OpenGraph, and locks the page to the dark theme. A single sans voice
 * (Inter — the documented open-source substitute for Linear's display/text cut)
 * carries display through body; JetBrains Mono carries the technical layer
 * (labels, tags, code) only.
 */
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — Data Science & Economics`,
  description:
    "Portfolio of Chiranth Agarkhed, Data Science & Economics student at Rutgers University. Building data-driven applications and analytical tools at the intersection of code and economics.",
  authors: [{ name: profile.name }],
  keywords: [
    "Chiranth Agarkhed",
    "Data Science",
    "Economics",
    "Rutgers University",
    "Data Analyst",
    "Machine Learning",
    "Portfolio",
  ],
  openGraph: {
    title: `${profile.name} — Data Science Portfolio`,
    description:
      "Data Science & Economics student at Rutgers building applications and analytical tools at the intersection of code and economics.",
    url: "https://chiranthagarkhed.com", // [REPLACE] with the real deployed domain
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Data Science Portfolio`,
    description:
      "Data Science & Economics student at Rutgers building applications and analytical tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="relative min-h-screen bg-background font-sans text-text-secondary antialiased">
        {/* Page-wide film grain — fixed, behind everything, very low opacity. */}
        <div className="page-grain pointer-events-none fixed inset-0 z-[1]" aria-hidden />
        <div className="relative z-[2]">{children}</div>
      </body>
    </html>
  );
}
