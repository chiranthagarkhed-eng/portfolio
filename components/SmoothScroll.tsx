"use client";

/**
 * SmoothScroll — Lenis-powered inertial scrolling, the single biggest reason
 * premium Framer/Linear sites "feel" different from a default page. Runs only
 * when the user hasn't requested reduced motion; otherwise native scroll is
 * left untouched. `anchors` lets Lenis smooth-scroll the in-page nav links;
 * the eased curve is exponential (no bounce).
 */
import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

export function SmoothScroll() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      // ease-out-expo — confident, decisive deceleration.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -80 }, // clear the fixed navbar on anchor jumps
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
