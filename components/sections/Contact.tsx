"use client";

/**
 * Contact — giant outlined "LET'S BUILD / SOMETHING" headline, then a two-column
 * layout: a working contact form and a stack of channel rows.
 *
 * The form POSTs to FormSubmit (https://formsubmit.co) — a free, no-backend
 * relay that forwards submissions to Chiranth's inbox. We use its AJAX endpoint
 * so the page keeps the design's in-place "Message sent." confirmation instead
 * of redirecting. Override the endpoint with NEXT_PUBLIC_FORM_ENDPOINT to swap
 * in Web3Forms/Resend/etc. without touching this component.
 *
 * NOTE: FormSubmit requires a one-time activation — the very first submission
 * triggers a confirmation email to the inbox; click its link once and every
 * later submission is delivered.
 */
import { useState, type FormEvent } from "react";
import { contact, profile } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_FORM_ENDPOINT ||
  `https://formsubmit.co/ajax/${profile.email}`;

type Status = "idle" | "sending" | "sent" | "error";

const fieldLabel = "font-mono text-[11px] uppercase tracking-[0.1em] text-[#7a7a80]";
const fieldInput =
  "border-0 border-b border-white/20 bg-transparent py-2 text-lg text-ink outline-none placeholder:text-[#5a5a60] focus:border-white/50";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-white/[0.06] bg-bg px-6 pb-20 pt-[130px] text-ink sm:px-10">
      <div className="mx-auto max-w-shell">
        <Reveal as="div" className="mb-[26px] font-mono text-xs uppercase tracking-[0.14em] text-[#7a7a80]">
          {"// Contact"}
        </Reveal>
        <Reveal
          as="h2"
          className="m-0 font-display font-black leading-[0.86] tracking-[-0.045em] [font-size:clamp(54px,10vw,150px)]"
        >
          {contact.headingLines[0]}
          <br />
          <span className="text-hollow">{contact.headingLines[1]}</span>
        </Reveal>

        <div className="mt-[72px] grid items-start gap-16 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <Reveal as="div">
            {status === "sent" ? (
              <div className="border border-bone/35 bg-white/5 p-10">
                <div className="font-display text-3xl font-bold text-bone">Message sent.</div>
                <p className="m-0 mt-3.5 font-mono text-sm leading-[1.7] text-[#a7a7ad]">
                  Thanks for reaching out — I&apos;ll get back to you within a day or two.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-[26px]">
                {/* Honeypot — bots fill this; humans never see it. */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                />
                {/* FormSubmit config (no redirect, table email, custom subject). */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_subject"
                  value="New message from your portfolio"
                />

                <label className="flex flex-col gap-2">
                  <span className={fieldLabel}>Name</span>
                  <input data-cursor="link" name="name" type="text" required placeholder="Your name" className={fieldInput} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={fieldLabel}>Email</span>
                  <input data-cursor="link" name="email" type="email" required placeholder="you@company.com" className={fieldInput} />
                </label>
                <label className="flex flex-col gap-2">
                  <span className={fieldLabel}>Message</span>
                  <textarea
                    data-cursor="link"
                    name="message"
                    required
                    rows={3}
                    placeholder="Tell me about the role or project..."
                    className={`${fieldInput} resize-none`}
                  />
                </label>

                {status === "error" && (
                  <p role="alert" className="m-0 font-mono text-xs text-[#e89a9a]">
                    Something went wrong sending that. Email me directly at{" "}
                    <a href={`mailto:${profile.email}`} className="underline">
                      {profile.email}
                    </a>
                    .
                  </p>
                )}

                <button
                  data-cursor="link"
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 self-start bg-bone px-[30px] py-[15px] font-mono text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0b0b0d] transition-colors hover:bg-bone-hover disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message →"}
                </button>
              </form>
            )}
          </Reveal>

          {/* Channels */}
          <Reveal as="div" className="flex flex-col gap-px border border-white/[0.08] bg-white/[0.08]">
            {contact.channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                data-cursor="link"
                className="contact-link flex items-center justify-between bg-bg p-6 no-underline"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[#6f6f76]">
                    {c.label}
                  </span>
                  <span className="font-display text-lg text-ink">{c.value}</span>
                </span>
                <span className="contact-arrow text-bone">↗</span>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
