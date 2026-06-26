import type { Config } from "tailwindcss";

/**
 * Tailwind config for the brutalist-editorial dark portfolio. Core palette is a
 * bone-on-near-black monochrome (no chromatic accent — `bone` #e9e7e1 is the
 * single highlight). One-off greys/borders use Tailwind arbitrary values in the
 * components to stay pixel-faithful to the imported design.
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
        bg: "#0b0b0d", // page background
        "bg-deep": "#050506", // Skills + footer
        panel: "#0e0e11", // viz panels, skill cards
        "panel-hover": "#101014",
        ink: "#f4f3ef", // primary text
        bone: "#e9e7e1", // the single accent (squares, dot, button)
        "bone-hover": "#d8d6d0",
        muted: "#8a8a90", // body grey
        "muted-2": "#5a5a60", // labels / faint
      },
      fontFamily: {
        display: ["var(--font-archivo)", "Archivo", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      maxWidth: {
        shell: "1360px", // the design's content container
      },
    },
  },
  plugins: [],
};

export default config;
