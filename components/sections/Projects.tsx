/**
 * Projects — the most important section. Full-width, two-column case-study
 * cards (NOT a grid of identical thumbnails). Each card leads with a big index
 * numeral and the problem, then the build, then the economic/domain insight
 * (the DS×Econ thesis), then stack tags, an outcome metric, links, and a
 * representative code snippet rendered in a windowed editor panel with a line
 * gutter. In-development work is labeled honestly.
 */
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

function StatusBadge({ status }: { status: Project["status"] }) {
  const shipped = status === "shipped";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider ${
        shipped
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
          : "border-border bg-surface-raised text-text-secondary"
      }`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {shipped && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
            shipped ? "bg-emerald-400" : "bg-text-muted"
          }`}
        />
      </span>
      {shipped ? "Shipped" : "In Development"}
    </span>
  );
}

function CodePanel({ snippet }: { snippet: Project["snippet"] }) {
  const lines = snippet.code.split("\n");
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#0b0b0c] transition-transform duration-500 ease-out group-hover:scale-[1.015]">
      <div className="flex items-center gap-2 border-b border-border bg-white/[0.015] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]/70" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]/70" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]/70" />
        <span className="ml-2 font-mono text-xs text-text-muted">
          {snippet.language}
        </span>
      </div>
      <div className="flex overflow-x-auto">
        {/* Line gutter */}
        <div
          aria-hidden
          className="select-none border-r border-border px-3 py-4 text-right font-mono text-[12.5px] leading-relaxed text-text-muted"
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="flex-1 px-4 py-4 font-mono text-[12.5px] leading-relaxed text-text-secondary">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Alternate which column the code panel sits in for visual rhythm on desktop.
  const codeFirst = index % 2 === 1;

  return (
    <Reveal>
      <Card interactive className="group p-6 sm:p-9">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className={codeFirst ? "lg:order-2" : ""}>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-tight text-text-primary sm:text-[1.7rem]">
                {project.name}
              </h3>
              <StatusBadge status={project.status} />
            </div>

            <p className="text-base font-medium leading-relaxed text-text-primary">
              {project.problem}
            </p>

            <p className="mt-4 text-sm leading-[1.75] text-text-secondary">
              {project.build}
            </p>

            {/* The economic / domain angle — set off by a hairline rule + label,
                not a nested card and not a colored side-stripe. */}
            <div className="mt-5 border-t border-border pt-4">
              <p className="font-mono text-[11px] tracking-[0.04em] text-accent">
                The insight
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                {project.insight}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            {project.outcome && (
              <p className="mt-5 font-mono text-sm text-text-muted">
                <span className="text-accent">→ </span>
                {project.outcome}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  View live
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-border-strong hover:bg-surface-raised"
                >
                  <Github size={15} className="text-text-muted group-hover:text-text-secondary" />
                  Source
                </a>
              )}
            </div>
          </div>

          <div className={codeFirst ? "lg:order-1" : ""}>
            <CodePanel snippet={project.snippet} />
          </div>
        </div>
      </Card>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading eyebrow="Selected work" title="Things I've built, problem first.">

        Fewer projects, told properly — what each one solves, how it works, and why the
        result is trustworthy.
      </SectionHeading>

      <div className="flex flex-col gap-6 lg:gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
