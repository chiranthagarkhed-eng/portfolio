"use client";

/**
 * useActiveSection — returns the id of the section currently dominating the
 * viewport, for the navbar's scroll-spy active state. Uses one
 * IntersectionObserver across all section ids with a rootMargin that biases
 * toward the upper-middle of the screen so the highlight changes at a natural
 * reading point rather than the moment a section's top edge appears.
 */
import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top that is currently intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Activate a section when it crosses the upper third of the viewport.
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
