/**
 * About — a large statement headline (with an underlined keyword) beside a
 * two-column body paragraph and a 2x2 facts grid built from hairline-gapped
 * tiles. Mirrors the imported design's About block.
 */
import { about } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="border-t border-white/[0.06] bg-bg px-6 py-[130px] text-ink sm:px-10">
      <div className="mx-auto max-w-shell">
        <Reveal as="div" className="mb-[34px] font-mono text-xs uppercase tracking-[0.14em] text-[#7a7a80]">
          {"// About"}
        </Reveal>
        <Reveal
          as="h2"
          className="m-0 max-w-[1100px] font-display text-[clamp(30px,4.2vw,62px)] font-bold leading-[1.05] tracking-[-0.025em]"
        >
          {about.heading.lead}
          <span className="underline decoration-[#9a9aa2] decoration-2 underline-offset-[8px]">
            {about.heading.emphasis}
          </span>
          {about.heading.tail}
        </Reveal>

        <div className="mt-16 grid items-start gap-[60px] lg:grid-cols-[1.3fr_1fr]">
          <Reveal
            as="p"
            className="m-0 max-w-[560px] font-mono text-sm leading-[1.85] text-[#a7a7ad]"
          >
            {about.paragraph.lead}
            <span className="text-ink">{about.paragraph.emphasis}</span>
            {about.paragraph.tail}
          </Reveal>

          <Reveal
            as="div"
            className="grid grid-cols-2 gap-px border border-white/[0.08] bg-white/[0.08]"
          >
            {about.facts.map((f) => (
              <div key={f.label} className="bg-bg p-[22px]">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6f6f76]">
                  {f.label}
                </div>
                <div
                  className={`mt-2 font-display text-lg ${f.accent ? "text-bone" : "text-ink"}`}
                >
                  {f.value}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
