/**
 * Viz — the data panel beside each case study, one per project "kind". Pure
 * presentational chrome driven by the project's `viz` data in lib/data.ts:
 *  - draft:   DraftLab's real shrinkage formula + role-interaction matrix
 *  - scanner: a price line with a flagged pattern + the real detection rule
 * Decorative, so marked aria-hidden.
 */
import type { DraftViz, ScannerViz, ProjectViz } from "@/lib/data";

const panel = "border border-white/[0.08] bg-panel p-7 font-mono text-ink";
const label = "mb-5 text-[10px] uppercase tracking-[0.14em] text-[#5a5a60]";

function Draft({ viz }: { viz: DraftViz }) {
  return (
    <div className={panel} aria-hidden>
      <div className={label}>{viz.header}</div>

      {/* Real shrinkage formula */}
      <div className="mb-7 border border-white/[0.08] bg-black/30 p-4">
        <div className="mb-2 text-[10px] uppercase tracking-[0.12em] text-[#5a5a60]">
          {viz.formulaCaption}
        </div>
        <code className="text-[12.5px] leading-relaxed text-[#c4c4ca]">{viz.formula}</code>
      </div>

      {/* Role-interaction matrix heatmap */}
      <div className="mb-3 text-[10px] uppercase tracking-[0.12em] text-[#5a5a60]">
        {viz.matrixLabel}
      </div>
      <div className="inline-grid" style={{ gridTemplateColumns: `34px repeat(${viz.roles.length}, 1fr)` }}>
        <div />
        {viz.roles.map((r) => (
          <div key={`h-${r}`} className="pb-1.5 text-center text-[9px] text-[#7a7a80]">
            {r}
          </div>
        ))}
        {viz.matrix.map((row, i) => (
          <div key={`row-${i}`} className="contents">
            <div className="flex items-center pr-1.5 text-right text-[9px] text-[#7a7a80]">
              {viz.roles[i]}
            </div>
            {row.map((w, j) => (
              <div
                key={`c-${i}-${j}`}
                className="m-[1px] flex aspect-square items-center justify-center text-[8px] text-[#0b0b0d]"
                style={{
                  background: w === 1 ? "#e9e7e1" : `rgba(255,255,255,${0.08 + w * 0.32})`,
                  color: w >= 0.8 ? "#0b0b0d" : "rgba(255,255,255,.55)",
                }}
              >
                {w.toFixed(1)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between border-t border-white/[0.07] pt-4 text-[11px] text-[#5a5a60]">
        <span>{viz.footer.left}</span>
        <span>{viz.footer.right}</span>
      </div>
    </div>
  );
}

function Scanner({ viz }: { viz: ScannerViz }) {
  return (
    <div className={panel} aria-hidden>
      <div className={label}>{viz.header}</div>
      <div className="mb-2 text-[11px] text-[#5a5a60]">{viz.caption}</div>

      {/* Price line with the flagged-pattern marker */}
      <div className="relative mb-5 h-20 border-b border-white/10">
        <svg
          width="100%"
          height="80"
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="absolute inset-0"
        >
          <polyline points={`${viz.points} 400,80 0,80`} fill="rgba(255,255,255,0.04)" stroke="none" />
          <polyline points={viz.points} fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
          <circle cx={viz.marker.x} cy={viz.marker.y} r="3.2" fill="#e9e7e1" />
        </svg>
      </div>

      {/* Real detection rule */}
      <div className="mb-5 border border-white/[0.08] bg-black/30 p-4">
        <code className="text-[11.5px] leading-relaxed text-[#c4c4ca]">{viz.rule}</code>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-white/[0.07] pt-4">
        <div className="mb-1 text-[10px] uppercase tracking-[0.12em] text-[#5a5a60]">
          {viz.matchesLabel}
        </div>
        {viz.matches.map((m) => (
          <div key={m.ticker} className="flex justify-between text-[11px]">
            <span className="text-ink">{m.ticker}</span>
            <span className="text-[#7a7a80]">
              {m.pattern} <span className="text-bone">▲</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between border-t border-white/[0.07] pt-4 text-[11px] text-[#5a5a60]">
        <span>{viz.footer.left}</span>
        <span>{viz.footer.right}</span>
      </div>
    </div>
  );
}

export function Viz({ viz }: { viz: ProjectViz }) {
  return viz.kind === "draft" ? <Draft viz={viz} /> : <Scanner viz={viz} />;
}
