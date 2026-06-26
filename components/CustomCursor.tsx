"use client";

/**
 * CustomCursor — a 7px dot that tracks the pointer 1:1 plus a 34px ring that
 * lerps behind it, both using mix-blend-mode:difference so they invert over any
 * background. The ring grows when hovering anything marked `data-cursor`. Real
 * pointer devices only (CSS hides it on touch); it never mounts under reduced
 * motion or on coarse pointers, so the native cursor stays.
 */
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduce || !dot || !ring) return;

    let mx = innerWidth / 2,
      my = innerHeight / 2,
      rx = mx,
      ry = my,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const setBig = (big: boolean) => {
      ring.style.width = big ? "56px" : "34px";
      ring.style.height = big ? "56px" : "34px";
      ring.style.borderColor = big ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.55)";
      ring.style.background = big ? "rgba(255,255,255,.12)" : "transparent";
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("[data-cursor],a,button,input,textarea")) setBig(true);
    };
    const out = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.("[data-cursor],a,button,input,textarea")) setBig(false);
    };
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        data-cursor-dot
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[7px] w-[7px] rounded-full bg-white mix-blend-difference"
        style={{ transform: "translate(-100px,-100px)" }}
      />
      <div
        ref={ringRef}
        data-cursor-ring
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[34px] w-[34px] rounded-full border border-white/55 mix-blend-difference"
        style={{
          transform: "translate(-100px,-100px)",
          transition: "width .25s,height .25s,border-color .25s,background .25s",
        }}
      />
    </>
  );
}
