"use client";

/**
 * Navbar — fixed, transparent over the hero and fading to a blurred dark bar
 * once scrolled past 40px. Desktop shows the mono link row (underline-wipe on
 * hover) and the bone Résumé button with a hover preview thumbnail of the
 * actual resume. Below md it collapses to a hamburger + slide-down panel for
 * responsiveness/accessibility (the design is desktop-first).
 */
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";

function ResumeThumb() {
  // Miniature of the resume — purely decorative skeleton, hidden from a11y tree.
  const bar = (w: string, o = 0.08) => (
    <div style={{ height: 4, width: w, background: `rgba(0,0,0,${o})`, borderRadius: 1 }} />
  );
  return (
    <div className="resume-thumb" aria-hidden>
      <div className="font-display text-[11px] font-black tracking-[-0.01em] text-[#0b0b0d]">
        CHIRANTH AGARKHED
      </div>
      <div className="mb-2.5 mt-0.5 font-mono text-[8px] tracking-[0.06em] text-[#7a7a80]">
        Data Science &amp; Economics
      </div>
      <div className="mb-2 border-t border-black/10" />
      {["Experience", "Education", "Skills"].map((label, i) => (
        <div key={label}>
          <div className="mb-[5px] font-mono text-[7.5px] font-semibold uppercase tracking-[0.1em] text-[#0b0b0d]">
            {label}
          </div>
          <div className="mb-[9px] flex flex-col gap-[3px]">
            {i === 2 ? (
              <div className="flex flex-wrap gap-[3px]">
                {bar("30%", 0.12)}
                {bar("22%", 0.1)}
                {bar("35%", 0.1)}
                {bar("25%")}
              </div>
            ) : (
              <>
                {bar("90%", 0.12)}
                {bar("70%")}
                {i === 0 && bar("80%")}
              </>
            )}
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 right-3.5 font-mono text-[8px] tracking-[0.06em] text-[#b4b4b8]">
        PDF ↓
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      data-nav
      className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 py-5 transition-[background,border-color,backdrop-filter] duration-300 sm:px-10"
      style={{
        background: scrolled ? "rgba(11,11,13,.82)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,.08)" : "transparent"}`,
      }}
    >
      <a
        href="#top"
        data-cursor="link"
        className="flex items-center gap-[11px] font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink no-underline"
      >
        <span className="inline-block h-[9px] w-[9px] bg-bone" />
        {profile.name}
      </a>

      {/* Desktop nav */}
      <div className="hidden items-center gap-7 font-mono text-xs uppercase tracking-[0.1em] md:flex">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} data-cursor="link" className="nav-link text-[#b6b6bd] no-underline">
            {link.label}
          </a>
        ))}
        <div className="resume-wrapper">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="nav-resume flex items-center gap-2 bg-bone px-[15px] py-[9px] font-semibold text-[#0b0b0d] no-underline"
          >
            Résumé <span className="text-[13px]">↓</span>
          </a>
          <ResumeThumb />
        </div>
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="text-ink md:hidden"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute inset-x-0 top-full border-b border-white/10 bg-[#0b0b0d]/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4 font-mono text-sm uppercase tracking-[0.1em]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[#b6b6bd] no-underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-2 bg-bone px-4 py-2.5 font-semibold normal-case tracking-normal text-[#0b0b0d] no-underline"
            >
              Résumé ↓
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
