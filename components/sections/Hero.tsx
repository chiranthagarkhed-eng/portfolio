/**
 * Hero — full-viewport opener: animated neural-network canvas + a soft radial
 * glow behind a giant two-line Archivo wordmark (second line "hollow"/outlined),
 * an availability pill with a pulsing dot, a mono lede, and an animated scroll
 * hint. Content rises in with staggered reveals.
 */
import { hero } from "@/lib/data";
import { NeuralCanvas } from "@/components/NeuralCanvas";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-bg px-6 pb-16 pt-32 sm:px-10"
    >
      <NeuralCanvas className="absolute inset-0 h-full w-full opacity-[0.85]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 74% 28%, rgba(255,255,255,0.05), transparent 55%)",
        }}
      />

      <div className="relative z-[2] mx-auto w-full max-w-shell">
        <Reveal
          as="div"
          className="inline-flex items-center gap-2.5 rounded-[40px] border border-white/[0.16] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#cfcfd6]"
        >
          <span className="anim-pulse-dot h-[7px] w-[7px] rounded-full bg-bone" />
          {hero.badge}
        </Reveal>

        <Reveal as="h1" delay={80}>
          <span className="block font-display font-black leading-[0.84] tracking-[-0.045em] text-ink [font-size:clamp(58px,12.5vw,205px)]">
            {hero.nameLines[0]}
            <br />
            <span className="text-hollow">{hero.nameLines[1]}</span>
          </span>
        </Reveal>

        <Reveal
          as="div"
          delay={160}
          className="mt-9 flex flex-wrap items-end justify-between gap-6"
        >
          <p className="m-0 max-w-[460px] font-mono text-sm leading-[1.65] tracking-[0.01em] text-[#9a9aa2]">
            {hero.lede.lead}
            <span className="text-ink">{hero.lede.emphasis}</span>
            {hero.lede.tail}
          </p>
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[#6f6f76]">
            <span className="relative inline-block h-[22px] w-[14px] rounded-[8px] border border-[#5a5a60]">
              <span className="anim-scroll-hint absolute left-1/2 top-1 -ml-px h-[5px] w-[2px] bg-bone" />
            </span>
            Scroll
          </div>
        </Reveal>
      </div>
    </section>
  );
}
