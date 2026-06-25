/**
 * Contact — minimal close. One headline, one subtext, two large icon-link
 * cards (LinkedIn + GitHub), and a styled mailto text button. No contact form,
 * no map, no calendar widget. Followed by a plain factual footer (no
 * "Made with ❤️" line).
 */
import { Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

const channels = [
  {
    label: "LinkedIn",
    handle: "Connect professionally",
    href: profile.links.linkedin,
    Icon: Linkedin,
  },
  {
    label: "GitHub",
    handle: "See the code",
    href: profile.links.github,
    Icon: Github,
  },
];

export function Contact() {
  return (
    <Section id="contact">
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="mb-5 flex items-center justify-center gap-2.5 text-[13px] font-medium text-accent">
          <span className="h-1 w-1 rounded-full bg-accent" />
          Contact
        </div>
        <h2 className="text-balance text-4xl font-semibold tracking-tightest text-text-primary sm:text-5xl md:text-[3.25rem]">
          Let&apos;s build something
          <br className="hidden sm:block" /> worth measuring.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base text-text-secondary sm:text-lg">
          Open to internships, collaborations, and interesting problems.
        </p>

        <div className="mt-8 flex justify-center">
          <Magnetic>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white shadow-accent-glow transition-colors hover:bg-accent-hover"
            >
              <Mail size={16} />
              {profile.email}
            </a>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal
        stagger
        className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {channels.map(({ label, handle, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="panel panel-interactive group flex items-center gap-4 rounded-xl p-5"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-border bg-surface-3 text-text-secondary transition-colors group-hover:border-border-strong group-hover:text-accent">

              <Icon size={20} />
            </span>
            <span className="flex-1 text-left">
              <span className="block font-medium text-text-primary">{label}</span>
              <span className="block text-sm text-text-secondary">{handle}</span>
            </span>
            <ArrowUpRight
              size={18}
              className="text-text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </a>
        ))}
      </Reveal>

      {/* Footer — factual, with a quiet back-to-top, no decorative tagline. */}
      <footer className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
        <p className="font-mono text-xs text-text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs text-text-muted">
          Built with Next.js &amp; Tailwind CSS
        </p>
        <a
          href="#hero"
          className="font-mono text-xs text-text-secondary transition-colors hover:text-accent"
        >
          Back to top ↑
        </a>
      </footer>
    </Section>
  );
}
