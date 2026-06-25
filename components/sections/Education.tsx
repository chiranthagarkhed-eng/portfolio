/**
 * Education — a single, factual timeline card. University, degree, expected
 * graduation, relevant coursework, and activities. No diploma/mortarboard
 * decoration. The university mark is a monogram tile, not a fetched logo.
 */
import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading eyebrow="Education" title="Where the foundation comes from." />

      <Reveal>
        <Card interactive className="p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg border border-border bg-surface-raised font-mono text-sm font-semibold text-accent">
              RU
            </div>

            <div className="flex-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-bold text-text-primary">{education.school}</h3>
                <span className="flex items-center gap-1.5 font-mono text-sm text-text-muted">
                  <GraduationCap size={15} />
                  {education.graduation}
                </span>
              </div>
              <p className="mt-1 text-base text-text-secondary">{education.degree}</p>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-[13px] font-medium text-text-muted">
                    Relevant Coursework
                  </h4>
                  <ul className="space-y-2">
                    {education.coursework.map((course) => (
                      <li
                        key={course}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 text-[13px] font-medium text-text-muted">
                    Activities
                  </h4>
                  <ul className="space-y-2">
                    {education.activities.map((activity) => (
                      <li
                        key={activity}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
