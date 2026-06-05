import { motion } from "framer-motion";
import { useState } from "react";
import { FadeIn, SectionLabel } from "./Section";
import { Magnetic } from "./Magnetic";

const channels = [
  { label: "Email", value: "hello@mananagrawal.com", href: "mailto:hello@mananagrawal.com", icon: "✉" },
  { label: "Instagram", value: "@manan.codes", href: "https://instagram.com", icon: "◈" },
  { label: "LinkedIn", value: "/in/manan-agrawal", href: "https://linkedin.com", icon: "⬡" },
  { label: "GitHub", value: "@mananagrawal", href: "https://github.com", icon: "◉" },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      {/* Glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 z-0 h-[500px] w-[500px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, oklch(0.62 0.22 280 / 0.3) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <SectionLabel index="05 / Transmit">Contact Terminal</SectionLabel>

      <div className="relative z-10 grid gap-12 md:grid-cols-12">
        <FadeIn>
          <div className="md:col-span-5">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Let's build something{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.55 0.22 340))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                unforgettable
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-foreground/65 leading-relaxed">
              Open to freelance projects, collaborations, and full-time roles. Drop
              a transmission below — I respond within 24 hours.
            </p>

            <div className="mt-10 space-y-2.5">
              {channels.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  className="group flex items-center justify-between rounded-2xl border border-foreground/10 bg-background/70 px-5 py-4 backdrop-blur-sm transition-all hover:border-[oklch(0.62_0.22_280/0.35)] hover:bg-[oklch(0.97_0.04_280/0.5)] hover:shadow-[0_4px_24px_oklch(0.62_0.22_280/0.10)]"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors group-hover:bg-[oklch(0.62_0.22_280)] group-hover:text-white"
                      style={{ background: "oklch(0.94 0.03 280 / 0.5)" }}
                    >
                      {c.icon}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/55 group-hover:text-foreground/70">
                      {c.label}
                    </span>
                  </div>
                  <span className="font-display text-sm tracking-tight transition-colors group-hover:text-[oklch(0.44_0.22_280)]">
                    {c.value}
                  </span>
                  <span className="text-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-[oklch(0.62_0.22_280)]">
                    ↗
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="md:col-span-7">
            <motion.form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-white/70 p-8 shadow-[var(--shadow-glow)] backdrop-blur-md"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, oklch(0.97 0.03 280 / 0.5) 100%)",
              }}
            >
              {/* Terminal title bar */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-foreground/8 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400/70" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                </span>
                <span>secure-channel://manan.agrawal</span>
                <span>2035</span>
              </div>

              <div className="mt-10 space-y-7">
                {[
                  { label: "Identifier", placeholder: "Your full name", type: "text" },
                  { label: "Return address", placeholder: "you@studio.com", type: "email" },
                ].map((f) => (
                  <label key={f.label} className="block">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">{f.label}</span>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      className="mt-2 w-full border-0 border-b border-foreground/12 bg-transparent py-3 font-display text-lg tracking-tight placeholder:text-foreground/25 focus:border-[oklch(0.62_0.22_280)] focus:outline-none transition-colors"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">Transmission</span>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project, vision, timeline…"
                    className="mt-2 w-full resize-none border-0 border-b border-foreground/12 bg-transparent py-3 font-display text-lg tracking-tight placeholder:text-foreground/25 focus:border-[oklch(0.62_0.22_280)] focus:outline-none transition-colors"
                  />
                </label>
              </div>

              <div className="mt-10 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/45">
                  {sent
                    ? <span className="flex items-center gap-1.5 text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Transmission received</span>
                    : "○ Awaiting input"}
                </span>
                <Magnetic>
                  <button
                    type="submit"
                    className="shine inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-background shadow-md transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
                  >
                    {sent ? "Sent ✓" : "Transmit"}
                    {!sent && <span aria-hidden>↗</span>}
                  </button>
                </Magnetic>
              </div>
            </motion.form>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
