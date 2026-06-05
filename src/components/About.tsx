import { FadeIn, SectionLabel } from "./Section";
import { motion } from "framer-motion";

const stats = [
  { k: "50+", v: "Projects shipped" },
  { k: "5y", v: "Building on the web" },
  { k: "12+", v: "Tools mastered" },
  { k: "∞", v: "Pixels obsessed over" },
];

const roles = ["Frontend Developer", "Web Designer", "WordPress Developer", "Graphic Designer", "Digital Creator"];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute -top-32 right-0 z-0 h-[500px] w-[500px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, oklch(0.82 0.12 280 / 0.22) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <SectionLabel index="01 / About">Profile</SectionLabel>

      <div className="relative z-10 grid gap-16 md:grid-cols-12">
        {/* Left column — card */}
        <FadeIn delay={0.05} className="md:col-span-5">
          <div className="glass relative aspect-[3/4] overflow-hidden rounded-3xl p-6 shadow-[var(--shadow-glow)]">
            {/* Gradient backdrop inside card */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.96_0.04_280),oklch(0.97_0_0))]" />
            {/* Animated noise grain */}
            <div className="noise absolute inset-0 z-[1]" />

            <div className="relative z-[2] flex h-full flex-col justify-between">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                <span>ID · MA-2035</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-status" />
                  LIVE
                </span>
              </div>

              <div className="relative grid place-items-center py-8">
                {/* Outer decorative ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  className="absolute h-52 w-52 rounded-full border border-dashed border-foreground/12"
                />
                {/* Inner slow reverse ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  className="absolute h-40 w-40 rounded-full border border-dotted border-foreground/8"
                />

                <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-white via-[oklch(0.96_0.04_280)] to-[oklch(0.88_0.06_260)] shadow-[0_8px_40px_oklch(0.62_0.22_280/0.18)]">
                  <span className="font-display text-5xl font-semibold tracking-tight bg-gradient-to-br from-[oklch(0.08_0.02_270)] to-[oklch(0.28_0.08_280)] bg-clip-text text-transparent select-none">
                    MA
                  </span>
                </div>
              </div>

              <div className="space-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                <div className="flex justify-between border-b border-foreground/8 pb-2">
                  <span>Name</span><span className="text-foreground">Manan Agrawal</span>
                </div>
                <div className="flex justify-between border-b border-foreground/8 pb-2">
                  <span>Role</span><span className="text-foreground">Frontend Dev</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="flex items-center gap-1.5 text-emerald-600">
                    <span className="h-1 w-1 rounded-full bg-emerald-500 animate-status" />
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Right column — text */}
        <div className="md:col-span-7">
          <FadeIn>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
              I design and build digital experiences that feel{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.55 0.22 340))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                a decade ahead
              </span>
              .
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-foreground/70">
              I'm Manan — a frontend developer and digital creator obsessed with the
              boundary between engineering and atmosphere. From production-grade
              WordPress builds to motion-rich React interfaces, I treat every pixel,
              every easing curve, every transition as a chance to make the web feel
              like the future.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full border border-foreground/12 bg-white/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/65 backdrop-blur-sm transition-colors hover:border-[oklch(0.62_0.22_280/0.3)] hover:bg-[oklch(0.94_0.04_280/0.4)] hover:text-foreground"
                >
                  {r}
                </span>
              ))}
            </div>
          </FadeIn>

          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/8 md:grid-cols-4">
            {stats.map((s, i) => (
              <FadeIn key={s.v} delay={0.1 + i * 0.05}>
                <div className="group flex flex-col gap-1 bg-background p-6 transition-colors hover:bg-[oklch(0.97_0.03_280/0.5)]">
                  <span
                    className="font-display text-3xl font-semibold tracking-tight md:text-4xl"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.08 0.02 270), oklch(0.32 0.08 280))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.k}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">{s.v}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
