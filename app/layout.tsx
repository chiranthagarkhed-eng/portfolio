/**
 * Root layout: loads the design's two faces via next/font (self-hosted, no
 * layout shift) and exposes them as CSS variables the Tailwind config reads.
 * Archivo (up to weight 900) carries every display headline; JetBrains Mono
 * carries body copy, labels, and data — matching the imported Claude Design.
 * Dark-only by design.
 */
import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — Data Science & Economics`,
  description:
    "Portfolio of Chiranth Agarkhed, Data Science & Economics student at Rutgers University. I turn messy, high-dimensional data into models and decisions that hold up in production.",
  authors: [{ name: profile.name }],
  keywords: [
    "Chiranth Agarkhed",
    "Data Science",
    "Economics",
    "Machine Learning",
    "Rutgers University",
    "Portfolio",
  ],
  openGraph: {
    title: `${profile.name} — Data Science & Economics`,
    description:
      "Data Science & Economics student at Rutgers. Turning messy, high-dimensional data into models and decisions that hold up in production.",
    url: "https://chiranthagarkhed.com", // [REPLACE] with the real deployed domain
    siteName: profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Data Science & Economics`,
    description:
      "Data Science & Economics student at Rutgers. Models and decisions that hold up in production.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg font-mono text-ink antialiased">{children}</body>
    </html>
  );
}
