import { motion } from "framer-motion";
import { useState } from "react";
import { FadeIn, SectionLabel } from "./Section";
import { Magnetic } from "./Magnetic";

const socials = [
  { label: "Email", href: "mailto:hello@mananagrawal.com", display: "hello@mananagrawal.com" },
  { label: "Instagram", href: "https://instagram.com", display: "@manan.codes" },
  { label: "LinkedIn", href: "https://linkedin.com", display: "/in/manan-agrawal" },
  { label: "GitHub", href: "https://github.com", display: "@mananagrawal" },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-32 md:py-44">
      {/* Full-width glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, oklch(0.68 0.19 280 / 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Gradient line top */}
      <div className="gradient-line mx-auto max-w-7xl mb-32" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <SectionLabel index="05">Contact</SectionLabel>

        <FadeIn>
          <h2 className="font-serif text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            Let's work{" "}
            <span className="text-gradient-accent italic">together</span>.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-8 max-w-md text-base leading-relaxed text-[rgba(255,255,255,0.4)]">
            Open to freelance projects, collaborations, and full-time roles.
            I respond within 24 hours.
          </p>
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.15}>
          <motion.form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mx-auto mt-14 max-w-lg text-left"
          >
            <div className="space-y-8">
              {[
                { label: "Name", placeholder: "Your full name", type: "text" },
                { label: "Email", placeholder: "you@studio.com", type: "email" },
              ].map((f) => (
                <label key={f.label} className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[rgba(255,255,255,0.3)]">{f.label}</span>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="mt-2 w-full border-0 border-b bg-transparent py-3 font-display text-lg tracking-tight text-foreground placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none transition-colors duration-300"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.68 0.19 280)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </label>
              ))}
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[rgba(255,255,255,0.3)]">Message</span>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project…"
                  className="mt-2 w-full resize-none border-0 border-b bg-transparent py-3 font-display text-lg tracking-tight text-foreground placeholder:text-[rgba(255,255,255,0.2)] focus:outline-none transition-colors duration-300"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.68 0.19 280)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </label>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.3)]">
                {sent
                  ? <span className="flex items-center gap-1.5" style={{ color: "oklch(0.72 0.17 195)" }}>
                      <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "oklch(0.72 0.17 195)" }} />
                      Message sent
                    </span>
                  : "○ Awaiting your message"}
              </span>
              <Magnetic>
                <button
                  type="submit"
                  className="shine inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.68 0.19 280), oklch(0.58 0.22 280))",
                    boxShadow: "0 4px 24px oklch(0.68 0.19 280 / 0.3)",
                  }}
                >
                  {sent ? "Sent ✓" : "Send Message"}
                  {!sent && <span>→</span>}
                </button>
              </Magnetic>
            </div>
          </motion.form>
        </FadeIn>

        {/* Social links */}
        <FadeIn delay={0.2}>
          <div className="mt-20 flex flex-wrap justify-center gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="group flex items-center gap-3 rounded-full px-5 py-2.5 transition-all duration-300 border-glow"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.3)] group-hover:text-[rgba(255,255,255,0.6)]">
                  {s.label}
                </span>
                <span className="text-[11px] text-[rgba(255,255,255,0.5)] transition-colors group-hover:text-foreground">
                  {s.display}
                </span>
              </motion.a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
