/**
 * Skills — icon+label grid, grouped into four buckets. No progress bars, no
 * percentages. The grouping is the point: "Data & ML" and "Economics &
 * Quantitative Methods" are split into separate columns to show both sides of
 * the intersection. Skills without a brand icon fall back to a monogram tile.
 */
import { skillGroups, type Skill } from "@/lib/data";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

function SkillTile({ skill }: { skill: Skill }) {
  const Icon = skill.icon;
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 rounded-lg border border-border bg-surface p-4 text-center transition-colors duration-200 hover:border-border-strong hover:bg-surface-raised">
      {Icon ? (
        <Icon className="h-7 w-7 text-text-secondary" aria-hidden />
      ) : (
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10 font-mono text-xs font-semibold text-accent">
          {skill.name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-xs leading-tight text-text-secondary">{skill.name}</span>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Skills" title="Two disciplines, one toolkit.">
        Split on purpose — the data-science stack on one side, the economics and quantitative methods on the other.
      </SectionHeading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {skillGroups.map((group) => (
          <Reveal key={group.title}>
            <Card className="h-full p-6">
              <h3 className="mb-5 text-sm font-medium text-text-primary">
                {group.title}
              </h3>
              <Reveal
                stagger
                className="grid grid-cols-3 gap-3 sm:grid-cols-4"
              >
                {group.skills.map((skill) => (
                  <RevealItem key={skill.name}>
                    <SkillTile skill={skill} />
                  </RevealItem>
                ))}
              </Reveal>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
