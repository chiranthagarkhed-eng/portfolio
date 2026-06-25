"use client";

/**
 * ScrollProgress — a 2px accent bar pinned to the very top of the viewport that
 * fills left-to-right with reading progress. Driven by Framer Motion's
 * scroll/spring so it glides rather than snaps. Hidden from assistive tech and
 * frozen (still rendered, just not animated) under reduced-motion.
 */
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: reduceMotion ? scrollYProgress : scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent/40 via-accent to-accent/40"
    />
  );
}
