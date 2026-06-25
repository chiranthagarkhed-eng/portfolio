# Chiranth Agarkhed — Portfolio

Single-page portfolio site. Dark-only, built around the **Data Science × Economics** intersection.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v3 · Framer Motion · lucide-react + react-icons · Playfair Display + Inter via `next/font`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

**All copy lives in [`lib/data.ts`](lib/data.ts).** Edit it there — components never hardcode text. Anything still using a stand-in value is marked with a `[REPLACE]` comment. Grep for them:

```bash
grep -rn "REPLACE" lib app
```

Before going live, replace:

- `profile.links` — real LinkedIn / GitHub URLs
- `profile.email` — preferred contact email
- `public/resume.pdf` — your real resume (placeholder is included)
- `components/sections/About.tsx` — swap the "CA" monogram for a real photo at `public/profile.jpg` (the `<Image>` snippet is in a comment there)
- Projects, coursework, activities, and the second experience entry in `lib/data.ts`
- `app/layout.tsx` — the OpenGraph `url` once you have a domain

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com) — zero config. Or `npx vercel`.

## Design system

Color tokens, fonts, and spacing rules live in [`app/globals.css`](app/globals.css) (CSS variables) and [`tailwind.config.ts`](tailwind.config.ts) (utility mappings). The single accent color is `#6C63FF`. Playfair Display is used in exactly one place: the hero name. Reduced-motion is honored globally.
