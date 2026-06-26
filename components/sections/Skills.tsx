/**
 * Skills — on the deeper #050506 surface: a heading + intro, then a 3-up grid of
 * skill cards (number, bone square, group title, bordered tag chips). Cards lift
 * on hover (`.skill-card`). Responsive: 1-up → 2-up → 3-up.
 */
import { skillGroups } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function Skills() {
  return (
    <section id="skills" className="border-t border-white/[0.06] bg-bg-deep px-6 py-[130px] text-ink sm:px-10">
      <div className="mx-auto max-w-shell">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Reveal as="div">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#7a7a80]">
              {"// Toolbox"}
            </div>
            <h2 className="m-0 mt-4 font-display text-[clamp(40px,4.8vw,72px)] font-extrabold leading-[0.96] tracking-[-0.03em]">
              The stack I
              <br />
              build with
            </h2>
          </Reveal>
          <Reveal
            as="p"
            className="m-0 max-w-[300px] font-mono text-[13px] leading-[1.7] text-[#8a8a90]"
          >
            A focused toolkit I&apos;d be comfortable using on day one — not an exhaustive list.
          </Reveal>
        </div>

        <div className="mt-[60px] grid gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal
              key={g.title}
              as="div"
              delay={i * 60}
              data-cursor="link"
              className="skill-card border border-white/[0.09] bg-panel p-[30px]"
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#7a7a80]">
                  {g.num}
                </div>
                <div className="h-2 w-2 bg-bone" />
              </div>
              <h3 className="m-0 mb-[22px] mt-[18px] font-display text-2xl font-bold tracking-[-0.01em] text-ink">
                {g.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span
                    key={s}
                    className="border border-white/[0.13] px-[11px] py-1.5 font-mono text-xs text-[#c4c4ca]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
