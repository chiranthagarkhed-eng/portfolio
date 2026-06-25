"use client";

/**
 * Navbar — fixed to top, transparent over the hero and fading to a blurred
 * dark bar with a hairline border once the user scrolls past ~80px. Desktop
 * links use an animated underline that stays lit on the active section
 * (scroll-spy via useActiveSection). The logo is a monospace monogram (no
 * image). Below md it collapses to a hamburger + slide-down panel.
 */
import { useEffect, useState } from "react";
import { Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navLinks, profile } from "@/lib/data";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-6 sm:px-8">
        <a
          href="#hero"
          className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight text-text-primary"
          aria-label={`${profile.name} — home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-accent transition-colors group-hover:border-accent/60">
            {profile.initials}
          </span>
          <span className="hidden text-text-secondary transition-colors group-hover:text-text-primary sm:inline">
            {profile.name.split(" ")[0]}
            <span className="text-text-muted">.dev</span>
          </span>
        </a>

        {/* Desktop links with scroll-spy underline */}
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-active={isActive}
                  className={cn(
                    "nav-underline text-[13px] font-medium tracking-wide transition-colors",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-2 rounded-md border border-accent/50 bg-accent/5 px-4 py-2 text-sm font-medium text-text-primary transition-all hover:border-accent hover:bg-accent/15 md:inline-flex"
          >
            <FileText size={15} className="text-accent" />
            Resume
            <ArrowUpRight
              size={14}
              className="text-text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary transition-colors hover:bg-surface md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link, i) => {
                const id = link.href.replace("#", "");
                const isActive = active === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-2 py-3 text-base transition-colors",
                        isActive
                          ? "text-text-primary"
                          : "text-text-secondary hover:bg-surface hover:text-text-primary",
                      )}
                    >
                      <span className="font-mono text-xs text-text-muted">
                        0{i + 1}
                      </span>
                      {link.label}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center gap-2 rounded-md border border-accent/60 px-2 py-3 text-base font-medium text-text-primary"
                >
                  <FileText size={16} className="text-accent" />
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
