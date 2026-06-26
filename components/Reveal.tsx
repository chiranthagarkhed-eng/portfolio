"use client";

/**
 * Reveal — scroll-triggered entrance used throughout the design: fade in +
 * rise 30px, eased, firing once when the element crosses into view (Intersection
 * Observer, threshold 0.12). `delay` staggers siblings; `duration` overrides the
 * default. Under reduced motion it renders visible immediately with no movement.
 */
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

const EASE = "cubic-bezier(.2,.8,.2,1)";

export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  duration = 900,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  duration?: number;
  [key: `data-${string}`]: string | undefined;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = reduce
    ? undefined
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(30px)",
        transition: `opacity ${duration}ms ${EASE}, transform ${duration}ms ${EASE}`,
        transitionDelay: `${delay}ms`,
      };

  return (
    <Tag ref={ref} className={className} style={style} {...rest}>
      {children}
    </Tag>
  );
}
