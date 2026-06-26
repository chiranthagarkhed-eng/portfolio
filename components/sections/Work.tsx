/**
 * Work — "Selected Work": a full-bleed section header, then one ~90vh panel per
 * case study. Each panel is a two-column split (copy + bespoke data-viz) that
 * stacks on mobile, led by an oversized outlined index numeral. Reveals fire as
 * each panel scrolls in.
 */
import { projects, type Project } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { Viz } from "@/components/work/Viz";

function ProjectPanel({ project, last }: { project: Project; last: boolean }) {
  return (
    <Reveal
      as="div"
      duration={600}
      className={`flex min-h-[90vh] items-center px-6 pb-[100px] pt-20 sm:px-10 ${
        last ? "" : "border-b border-white/[0.09]"
      }`}
    >
      <div className="mx-auto grid w-full max-w-shell items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Copy */}
        <div>
          <div
            className="mb-7 select-none font-display font-black leading-[0.75] text-transparent [font-size:clamp(120px,18vw,260px)]"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,.15)" }}
            aria-hidden
          >
            {project.num}
          </div>
          <div className="mb-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5a60]">
            {project.meta}
          </div>
          <h3 className="m-0 mb-7 font-display font-black leading-[0.9] tracking-[-0.03em] [font-size:clamp(38px,5.5vw,78px)]">
            {project.titleLines[0]}
            <br />
            {project.titleLines[1]}
          </h3>
          <p className="m-0 mb-[30px] max-w-[460px] font-mono text-[13px] leading-[1.8] text-[#8a8a90]">
            {project.description}
          </p>
          <div className="mb-[30px] flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="border border-white/[0.15] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.06em] text-[#b4b4ba]"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex max-w-[460px] items-center justify-between border-t border-white/10 pt-6">
            <span className="font-mono text-[13px] text-bone">{project.metric}</span>
            <a
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              data-cursor="link"
              className="border-b border-white/40 pb-0.5 font-mono text-xs uppercase tracking-[0.08em] text-ink no-underline"
            >
              {project.linkLabel}
            </a>
          </div>
        </div>

        {/* Viz */}
        <Viz viz={project.viz} />
      </div>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="bg-bg text-ink">
      <div className="border-b border-white/[0.09] px-6 pb-20 pt-[120px] sm:px-10">
        <div className="mx-auto max-w-shell">
          <div className="mb-11 flex items-center gap-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#5a5a60]">
            <span>02</span>
            <span className="text-[#3a3a40]">—</span>
            <span>Selected Work / 2024–2026</span>
          </div>
          <Reveal
            as="h2"
            className="m-0 font-display font-black leading-[0.84] tracking-[-0.045em] [font-size:clamp(72px,14vw,210px)]"
          >
            SELECTED
            <br />
            WORK
          </Reveal>
        </div>
      </div>

      {projects.map((p, i) => (
        <ProjectPanel key={p.num} project={p} last={i === projects.length - 1} />
      ))}
    </section>
  );
}
