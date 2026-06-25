"use client";

/**
 * Marquee — an infinite, seamless horizontal ticker (a hallmark of premium
 * Framer portfolios). The track is rendered twice and translated -50% on a
 * linear loop, so the seam is invisible. Pauses on hover; reduced-motion users
 * get a static, scrollable row. Pure CSS transform — cheap and 60fps.
 */
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Marquee({
  items,
  durationSec = 32,
  reverse = false,
}: {
  items: ReactNode[];
  durationSec?: number;
  reverse?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const Row = ({ "aria-hidden": ariaHidden }: { "aria-hidden"?: boolean }) => (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={ariaHidden}
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-center gap-2.5 whitespace-nowrap font-mono text-sm text-text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );

  if (reduceMotion) {
    return (
      <div className="flex gap-10 overflow-x-auto">
        <Row />
      </div>
    );
  }

  return (
    <div className="group/marquee relative flex overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex min-w-full shrink-0 [animation:marquee_var(--dur)_linear_infinite] group-hover/marquee:[animation-play-state:paused]"
        style={
          {
            "--dur": `${durationSec}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        <Row />
        <Row aria-hidden />
      </div>
    </div>
  );
}
