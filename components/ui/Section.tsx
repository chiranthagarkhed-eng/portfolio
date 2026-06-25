/**
 * Section — consistent section shell: anchor id, uniform vertical rhythm,
 * a max-width centered container, and an optional hairline top divider (never a
 * decorative SVG wave). SectionHeading renders a restrained Linear-style
 * eyebrow (sentence-case, subtle, no number) + a tightly-tracked headline.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function Section({
  id,
  children,
  className,
  divider = true,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 px-6 py-28 sm:px-8",
        divider && "border-t border-border",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-content">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string; // short taxonomy label, sentence case
  title: string;
  children?: ReactNode; // optional supporting line
}) {
  return (
    <Reveal className="mb-16 max-w-3xl">
      <div className="mb-4 flex items-center gap-2.5 text-[13px] font-medium tracking-[0.01em] text-accent">
        <span className="h-1 w-1 rounded-full bg-accent" />
        {eyebrow}
      </div>
      <TextReveal
        as="h2"
        className="text-3xl font-semibold tracking-tightest text-text-primary sm:text-4xl md:text-[2.75rem]"
        segments={[{ text: title }]}
      />
      {children && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {children}
        </p>
      )}
    </Reveal>
  );
}
