"use client";

/**
 * TechMarquee — a slim infinite ticker of the tools/skills under the hero, the
 * signature "kinetic strip" of premium Framer portfolios. Items are derived
 * from the same skill data so there's one source of truth. Quiet by design:
 * mono labels, muted color, hairline-bounded band.
 */
import { skillGroups } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";

// Flatten the icon-bearing skills + key domains into one deduped list.
const seen = new Set<string>();
const items = skillGroups
  .flatMap((g) => g.skills)
  .filter((s) => {
    if (seen.has(s.name)) return false;
    seen.add(s.name);
    return true;
  })
  .map((s) => {
    const Icon = s.icon;
    return (
      <span key={s.name} className="flex items-center gap-2">
        {Icon ? <Icon className="h-4 w-4 text-text-secondary" aria-hidden /> : null}
        {s.name}
      </span>
    );
  });

export function TechMarquee() {
  return (
    <div className="border-y border-border bg-surface/40 py-5">
      <Marquee items={items} durationSec={40} />
    </div>
  );
}
