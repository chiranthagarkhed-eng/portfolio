"use client";

/**
 * Reveal — the site's one and only entrance animation primitive.
 *
 * Wraps children in a Framer Motion `fadeInUp` (y: 16 → 0, opacity 0 → 1) that
 * fires once when the element scrolls into view. Children passed as a list are
 * staggered by 0.08s. If the user prefers reduced motion, animation is skipped
 * entirely and content renders immediately. Nothing else animates on entry.
 */
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** When true, treat direct children as staggered items. */
  stagger?: boolean;
  as?: "div" | "section" | "ul" | "li";
};

export function Reveal({
  children,
  className,
  stagger = false,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      variants={stagger ? container : item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

/** A single staggered child. Use inside <Reveal stagger>. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag className={className} variants={item}>
      {children}
    </MotionTag>
  );
}
