/**
 * Experience & Involvement — titled to read well with few entries. Each entry
 * is a left-bordered timeline item with impact-statement bullets (result first,
 * not task lists). Closes with an outlined "View Full Resume" CTA.
 */
import { FileText } from "lucide-react";
import { experience, profile } from "@/lib/data";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Experience" title="Experience & involvement">
        Measured by what changed, not what was assigned.
      </SectionHeading>

      <Reveal stagger className="relative space-y-10 border-l border-border pl-6 sm:pl-8">
        {experience.map((item, i) => (
          <RevealItem key={i}>
            <div className="relative">
              {/* Timeline node */}
              <span className="absolute -left-[1.85rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background sm:-left-[2.35rem]" />

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-lg font-semibold text-text-primary">{item.role}</h3>
                <span className="font-mono text-sm text-text-muted">{item.dates}</span>
              </div>
              <p className="text-sm text-text-secondary">{item.org}</p>

              <ul className="mt-3 space-y-2">
                {item.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-text-secondary"
                  >
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </Reveal>

      <Reveal className="mt-12">
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-accent/60 px-6 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:border-accent hover:bg-accent/10"
        >
          <FileText size={16} />
          View Full Resume
        </a>
      </Reveal>
    </Section>
  );
}
