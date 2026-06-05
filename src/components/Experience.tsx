import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FadeIn, SectionLabel } from "./Section";

const items = [
  {
    year: "2025 — Now",
    role: "Freelance Frontend Developer",
    org: "Independent",
    body: "Designing and shipping immersive websites, interactive interfaces, and brand-grade digital systems for startups and studios.",
    accent: "oklch(0.68 0.19 280)",
  },
  {
    year: "2024",
    role: "WordPress Developer",
    org: "Client Projects",
    body: "Built bespoke WordPress and WooCommerce experiences with custom themes, performance budgets, and editorial flows.",
    accent: "oklch(0.72 0.17 195)",
  },
  {
    year: "2023",
    role: "Web & Graphic Designer",
    org: "Creative Studio",
    body: "Crafted brand identities, marketing sites, and content systems blending design craft with frontend execution.",
    accent: "oklch(0.75 0.14 65)",
  },
  {
    year: "2022",
    role: "Digital Creator",
    org: "Self-initiated",
    body: "Started a creative practice exploring motion, type, and interaction across platforms — the foundation of this portfolio.",
    accent: "oklch(0.68 0.19 280)",
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.15"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      <SectionLabel index="04">Experience</SectionLabel>

      <FadeIn>
        <h2 className="relative z-10 mb-20 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          A timeline of building on the{" "}
          <span className="text-gradient-accent">open web</span>.
        </h2>
      </FadeIn>

      <div ref={ref} className="relative z-10 pl-10 md:pl-20">
        {/* Track */}
        <div className="absolute left-2 top-0 h-full w-px md:left-5" style={{ background: "rgba(255,255,255,0.06)" }} />
        {/* Animated gradient fill */}
        <motion.div
          style={{ scaleY: lineScale, transformOrigin: "top" }}
          className="absolute left-2 top-0 h-full w-px md:left-5"
        >
          <div
            className="h-full w-full"
            style={{ background: "linear-gradient(to bottom, oklch(0.68 0.19 280), oklch(0.72 0.17 195))" }}
          />
        </motion.div>

        <ul className="space-y-16">
          {items.map((it, i) => (
            <FadeIn key={it.year} delay={i * 0.06}>
              <li className="group relative">
                {/* Dot with pulse ring */}
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 + 0.2 }}
                  className="absolute -left-[34px] top-1.5 md:-left-[66px]"
                >
                  <span
                    className="relative flex h-4 w-4 items-center justify-center"
                  >
                    {/* Pulse ring */}
                    <span
                      className="absolute h-full w-full rounded-full animate-ping opacity-20"
                      style={{ background: it.accent, animationDuration: "3s" }}
                    />
                    <span
                      className="relative h-3 w-3 rounded-full border-2"
                      style={{
                        background: it.accent,
                        borderColor: "var(--background)",
                        boxShadow: `0 0 16px ${it.accent}`,
                      }}
                    />
                  </span>
                </motion.span>

                <div className="grid gap-3 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <span className="font-serif text-lg font-medium italic" style={{ color: it.accent }}>
                      {it.year}
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                      {it.role}
                      <span className="text-[rgba(255,255,255,0.25)]"> · {it.org}</span>
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[rgba(255,255,255,0.45)]">{it.body}</p>
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
