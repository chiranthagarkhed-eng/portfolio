/**
 * Footer — quiet mono strip on the deeper surface: copyright, affiliation, and a
 * back-to-top link. Matches the imported design.
 */
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3.5 border-t border-white/[0.06] bg-bg-deep px-6 py-[30px] font-mono text-[11px] uppercase tracking-[0.08em] text-[#6f6f76] sm:px-10">
      <div>© {new Date().getFullYear()} {profile.name}</div>
      <div>Data Science &amp; Economics · Rutgers University</div>
      <a href="#top" data-cursor="link" className="text-[#b6b6bd] no-underline">
        Back to top ↑
      </a>
    </footer>
  );
}
