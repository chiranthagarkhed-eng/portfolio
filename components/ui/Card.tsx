/**
 * Card — lifted panel. Depth comes from the surface ladder (surface-1 → -2 on
 * hover) + hairline (→ hairline-strong) + a faint top edge highlight, the
 * Linear way — no drop shadow on dark. `interactive` adds the hover lift.
 * rounded-xl (12px) per the design system.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "panel rounded-xl",
        interactive && "panel-interactive",
        className,
      )}
    >
      {children}
    </div>
  );
}
