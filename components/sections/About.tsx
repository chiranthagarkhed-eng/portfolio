/**
 * About — three direct, first-person paragraphs (the data-science × economics
 * intersection stated explicitly). The "stats" are presented as a spec-sheet:
 * hairline-divided label/value rows, not glowing metric tiles (the hero-metric
 * template is an impeccable absolute ban). Photo placeholder: drop
 * /public/profile.jpg and swap the monogram.
 */
import { about } from "@/lib/data";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal, RevealItem } from "@/components/ui/Reveal";

export function About() {
  return (
    <Section id="about" divider={false}>
      <SectionHeading
        eyebrow="About"
        title="Quantitative rigor, with a reason behind it."
      >
        I work where the numbers meet the decision.
      </SectionHeading>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-16">
        <Reveal className="space-y-5" stagger>
          {about.paragraphs.map((p, i) => (
            <RevealItem key={i}>
              <p className="text-base leading-[1.85] text-text-secondary sm:text-[1.0625rem] [&:first-child]:text-text-primary">
                {p}
              </p>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal className="flex flex-col items-start gap-8">
          {/* Photo placeholder — circular, hairline ring. */}
          <div
            className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-border-strong bg-surface-raised text-2xl font-semibold tracking-tight text-text-muted"
            role="img"
            aria-label={about.photoAlt}
          >
            {/* [REPLACE] swap this monogram for:
                <Image src="/profile.jpg" alt={about.photoAlt} fill className="object-cover" /> */}
            CA
          </div>

          {/* Spec sheet — label/value rows divided by hairlines. */}
          <dl className="w-full divide-y divide-border border-y border-border">
            {about.stats.map((s) => (
              <div
                key={s.label}
                className="flex items-baseline justify-between gap-4 py-3"
              >
                <dt className="text-sm text-text-muted">{s.label}</dt>
                <dd className="text-right font-mono text-sm text-text-primary">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
