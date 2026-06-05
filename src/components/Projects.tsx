import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { FadeIn, SectionLabel } from "./Section";

type Project = {
  title: string;
  category: string;
  description: string;
  tech: string[];
  year: string;
  accent: string;
};

const projects: Project[] = [
  {
    title: "Aurora OS",
    category: "Interactive Web Experience",
    description: "A spatial operating-system concept site with real-time WebGL scenes and choreographed scroll narratives.",
    tech: ["React", "Three.js", "GSAP"],
    year: "2025",
    accent: "oklch(0.62 0.22 280)",
  },
  {
    title: "Helix Studio",
    category: "Agency Website",
    description: "Editorial portfolio for a design studio. Custom type system, magnetic interactions, and CMS-driven content.",
    tech: ["Next.js", "Framer Motion", "Sanity"],
    year: "2024",
    accent: "oklch(0.58 0.20 340)",
  },
  {
    title: "Nimbus Commerce",
    category: "WordPress / WooCommerce",
    description: "A luxury fashion storefront with bespoke product configurators and premium checkout flows.",
    tech: ["WordPress", "WooCommerce", "PHP"],
    year: "2024",
    accent: "oklch(0.55 0.18 200)",
  },
  {
    title: "Monolith Brand",
    category: "Identity & Web",
    description: "Visual identity, brand guidelines, and a sculptural launch site for a stealth tech startup.",
    tech: ["Illustrator", "Photoshop", "HTML/CSS"],
    year: "2023",
    accent: "oklch(0.60 0.16 60)",
  },
];

function Card({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <FadeIn delay={i * 0.07}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className="group relative h-full overflow-hidden rounded-3xl border border-foreground/10 bg-gradient-to-br from-white to-[oklch(0.97_0_0)] p-8 shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:border-foreground/15"
      >
        {/* Accent spotlight that follows card color */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${p.accent} 0%, transparent 70%)`,
            filter: "blur(40px)",
            opacity: "0",
          }}
        />
        {/* Always-on subtle tint top-right */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl transition-opacity"
          style={{
            background: `radial-gradient(circle, ${p.accent} 0%, transparent 70%)`,
            opacity: "0.08",
          }}
        />

        <div className="relative flex h-full flex-col">
          {/* Header row */}
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/55">
            <span>{p.category}</span>
            <span>{p.year}</span>
          </div>

          {/* Preview canvas */}
          <div className="relative my-8 aspect-[16/10] overflow-hidden rounded-2xl border border-foreground/8 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0),oklch(0.93_0_0))]">
            <div className="absolute inset-0 grid-lines opacity-50" />
            {/* Animated accent band */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px]"
              style={{ background: p.accent, opacity: 0.6 }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 + 0.3 }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.88, opacity: 0.6 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="font-display text-8xl font-black tracking-tighter select-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: `1px ${p.accent}`,
                  opacity: 0.35,
                }}
              >
                {p.title.slice(0, 2).toUpperCase()}
              </div>
            </motion.div>
            <div className="absolute inset-x-5 bottom-4 flex items-end justify-between">
              <span className="rounded-full bg-background/80 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] backdrop-blur-md border border-foreground/8">
                Preview
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/45">
                / 0{i + 1}
              </span>
            </div>
          </div>

          <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/65">{p.description}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-foreground/12 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/60 transition-colors hover:border-foreground/25"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-foreground/8 pt-5">
            <a
              href="#"
              className="group/btn inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] transition-colors hover:text-[var(--accent-violet)]"
            >
              Live Demo
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50 transition-colors hover:text-foreground"
            >
              Source ↗
            </a>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 h-[300px] w-[800px]"
        style={{
          background: "radial-gradient(ellipse, oklch(0.82 0.12 280 / 0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <SectionLabel index="03 / Work">Selected Projects</SectionLabel>

      <FadeIn>
        <h2 className="relative z-10 mb-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-6xl">
          Builds that feel like{" "}
          <span
            style={{
              background: "linear-gradient(135deg, oklch(0.62 0.22 280), oklch(0.55 0.22 340))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            product launches
          </span>
          .
        </h2>
        <p className="relative z-10 mb-16 max-w-lg text-sm text-foreground/55">
          A curated selection of projects spanning interactive experiences, storefronts, and brand identities.
        </p>
      </FadeIn>

      <div className="relative z-10 grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => <Card key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
}
