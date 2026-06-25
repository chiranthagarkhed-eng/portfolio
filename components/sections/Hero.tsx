"use client";

/**
 * Hero — a thesis, not a greeting. An availability pill sets context; the
 * headline makes one specific claim with a single accent-colored word for
 * emphasis (solid color, never gradient text). One sans voice, aggressively
 * negative display tracking (Linear). Background is a restrained dark room:
 * faint engineered grid + low-opacity grain + one quiet accent glow — no
 * spotlight, no atmospheric mesh. Motion is one staggered load-in, disabled
 * under prefers-reduced-motion.
 */
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { hero, profile } from "@/lib/data";
import { TextReveal } from "@/components/ui/TextReveal";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.04 },
    },
  };
  const item: Variants = reduceMotion
    ? { hidden: {}, show: {} }
    : {
        hidden: { opacity: 0, y: 16 },
        // ease-out-quint — calm exponential deceleration, no bounce.
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 sm:px-8"
    >
      <div className="hero-grid pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="hero-glow pointer-events-none absolute inset-0 z-0" aria-hidden />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-content py-28"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Availability pill */}
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-xs text-text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {hero.availability}
          </span>
        </motion.div>

        <motion.p
          variants={item}
          className="mt-8 font-mono text-[13px] tracking-[0.04em] text-text-muted"
        >
          {profile.role}
        </motion.p>

        {/* Signature moment — words rise from behind a mask, one accent word. */}
        <TextReveal
          as="h1"
          delay={0.15}
          className="mt-4 max-w-4xl text-[2.6rem] font-semibold leading-[1.04] tracking-tightest text-text-primary sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          segments={[
            { text: hero.headline.lead.trim() },
            { text: hero.headline.accent, className: "text-accent" },
            { text: hero.headline.tail.trim() },
          ]}
        />

        <motion.p
          variants={item}
          className="mt-7 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white shadow-accent-glow transition-colors duration-200 hover:bg-accent-hover"
            >
              View my work
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-6 py-3 text-sm font-medium text-text-primary transition-colors duration-200 hover:border-border-strong hover:bg-surface-raised"
            >
              <FileText size={16} className="text-text-muted" />
              Download resume
            </a>
          </Magnetic>
        </motion.div>

        {/* Signature line — name in the sans, no serif moment. */}
        <motion.p
          variants={item}
          className="mt-12 flex items-center gap-3 text-sm text-text-muted"
        >
          <span className="h-px w-8 bg-border" aria-hidden />
          {profile.name}
        </motion.p>
      </motion.div>

      {/* Calm scroll cue — gentle opacity pulse, no bounce. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden justify-center sm:flex">
        <span className="font-mono text-[11px] tracking-[0.2em] text-text-faint motion-safe:animate-pulse">
          SCROLL
        </span>
      </div>
    </section>
  );
}
