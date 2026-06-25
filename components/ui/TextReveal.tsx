"use client";

/**
 * TextReveal — the signature typographic choreography: each word rides up from
 * behind a clipping mask, staggered, when the heading scrolls into view. This
 * is a crafted reveal (mask + translate), deliberately NOT the generic
 * fade-and-rise-on-every-section that impeccable flags as an AI tell — so it's
 * reserved for headlines, not body copy. Honors prefers-reduced-motion.
 *
 * Accepts ordered `segments` so a single word can carry the accent color while
 * still participating in the same stagger.
 */
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { createElement, Fragment } from "react";

export type RevealSegment = { text: string; className?: string };

const word: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    // ease-out-quint — confident, no bounce.
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextReveal({
  segments,
  as = "h2",
  className,
  delay = 0,
}: {
  segments: RevealSegment[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  // Reduced motion: render the styled text statically, no animation.
  if (reduceMotion) {
    return createElement(
      as,
      { className },
      segments.map((seg, i) => (
        <span key={i} className={seg.className}>
          {seg.text}
          {i < segments.length - 1 ? " " : ""}
        </span>
      )),
    );
  }

  // Flatten every segment into words, preserving each word's segment styling.
  const words = segments.flatMap((seg, si) =>
    seg.text.split(" ").map((w, wi) => ({
      text: w,
      className: seg.className,
      key: `${si}-${wi}`,
    })),
  );

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045, delayChildren: delay } },
  };

  return createElement(
    as,
    { className },
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      style={{ display: "inline" }}
    >
      {words.map((w) => (
        <Fragment key={w.key}>
          {/* Clip mask: overflow-hidden wrapper with vertical breathing room so
              descenders (g, y, p) aren't clipped. The space sits OUTSIDE the
              wrapper so adjacent words stay separated. */}
          <span
            className="inline-block overflow-hidden pb-[0.14em]"
            style={{ marginBottom: "-0.14em" }}
          >
            <motion.span
              variants={word}
              className={`inline-block ${w.className ?? ""}`}
            >
              {w.text}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </motion.span>,
  );
}
