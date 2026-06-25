/** Tag — pill-shaped monospace label for tech-stack chips. rounded-full. */
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface-raised px-2.5 py-1 font-mono text-xs text-text-muted transition-colors duration-200 hover:border-border-strong hover:text-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
