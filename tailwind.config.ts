import type { Config } from "tailwindcss";

/**
 * Tailwind config. Custom color tokens mirror the CSS variables defined in
 * globals.css so utilities like `bg-background` / `text-secondary` resolve to
 * the single source of truth. Fonts are wired to the next/font CSS variables.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        "surface-3": "var(--surface-3)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-faint": "var(--text-faint)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-glow": "var(--accent-glow)",
      },
      fontFamily: {
        // One sans voice from display to body (Linear's documented Inter
        // substitute); mono for the technical layer only.
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        // Reserved for the primary CTA only — dark surfaces use the surface
        // ladder + hairlines for depth, not drop shadows.
        "accent-glow": "0 8px 30px -10px rgba(108,99,255,0.5)",
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
      maxWidth: {
        content: "72rem", // 1152px — consistent section container width
      },
    },
  },
  plugins: [],
};

export default config;
