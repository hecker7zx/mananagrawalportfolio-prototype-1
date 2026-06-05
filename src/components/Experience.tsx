import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeIn, SectionLabel } from "./Section";

const items = [
  {
    year: "2025 — Now",
    role: "Freelance Frontend Developer",
    org: "Independent",
    body: "Designing and shipping immersive websites, interactive interfaces, and brand-grade digital systems for startups and studios.",
    accent: "oklch(0.62 0.22 280)",
  },
  {
    year: "2024",
    role: "WordPress Developer",
    org: "Client Projects",
    body: "Built bespoke WordPress and WooCommerce experiences with custom themes, performance budgets, and editorial flows.",
    accent: "oklch(0.55 0.22 340)",
  },
  {
    year: "2023",
    role: "Web & Graphic Designer",
    org: "Creative Studio",
    body: "Crafted brand identities, marketing sites, and content systems blending design craft with frontend execution.",
    accent: "oklch(0.55 0.18 200)",
  },
  {
    year: "2022",
    role: "Digital Creator",
    org: "Self-initiated",
    body: "Started a creative practice exploring motion, type, and interaction across platforms — the foundation of this portfolio.",
    accent: "oklch(0.60 0.16 60)",
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.15"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      {/* Glow accent */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 z-0 h-[400px] w-[400px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, oklch(0.62 0.22 280 / 0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <SectionLabel index="04 / Trajectory">Experience</SectionLabel>

      <FadeIn>
        <h2 className="relative z-10 mb-20 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
          A timeline of building on the{" "}
          <span
            style={{
              background: "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.55 0.22 340))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            open web
          </span>
          .
        </h2>
      </FadeIn>

      <div ref={ref} className="relative z-10 pl-8 md:pl-16">
        {/* Timeline track */}
        <div className="absolute left-1.5 top-0 h-full w-px bg-foreground/8 md:left-4" />
        {/* Animated fill */}
        <motion.div
          style={{ scaleY: lineScale, transformOrigin: "top" }}
          className="absolute left-1.5 top-0 h-full w-px md:left-4"
        >
          <div
            className="h-full w-full"
            style={{
              background: "linear-gradient(to bottom, oklch(0.62 0.22 280), oklch(0.55 0.22 340))",
            }}
          />
        </motion.div>

        <ul className="space-y-16">
          {items.map((it, i) => (
            <FadeIn key={it.year} delay={i * 0.06}>
              <li className="group relative">
                {/* Timeline dot */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 + 0.2 }}
                  className="absolute -left-[30px] top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background md:-left-[60px]"
                  style={{ background: it.accent, boxShadow: `0 0 12px ${it.accent}` }}
                />

                <div className="grid gap-4 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.3em]"
                      style={{ color: it.accent }}
                    >
                      {it.year}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                      {it.role}{" "}
                      <span className="text-foreground/35">· {it.org}</span>
                    </h3>
                    <p className="mt-3 max-w-2xl text-foreground/65 leading-relaxed">{it.body}</p>
                  </div>
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
