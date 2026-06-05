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
    description: "A spatial operating-system concept site with real-time WebGL scenes and choreographed scroll narratives. Built for maximum immersion.",
    tech: ["React", "Three.js", "GSAP"],
    year: "2025",
    accent: "oklch(0.68 0.19 280)",
  },
  {
    title: "Helix Studio",
    category: "Agency Website",
    description: "Editorial portfolio for a design studio. Custom type system, magnetic interactions, and CMS-driven content architecture.",
    tech: ["Next.js", "Framer Motion", "Sanity"],
    year: "2024",
    accent: "oklch(0.72 0.17 195)",
  },
  {
    title: "Nimbus Commerce",
    category: "WordPress / WooCommerce",
    description: "A luxury fashion storefront with bespoke product configurators and premium checkout flows that convert.",
    tech: ["WordPress", "WooCommerce", "PHP"],
    year: "2024",
    accent: "oklch(0.75 0.14 65)",
  },
  {
    title: "Monolith Brand",
    category: "Identity & Web",
    description: "Visual identity, brand guidelines, and a sculptural launch site for a stealth tech startup.",
    tech: ["Illustrator", "Photoshop", "HTML/CSS"],
    year: "2023",
    accent: "oklch(0.68 0.19 280)",
  },
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <FadeIn delay={i * 0.08}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className="group relative overflow-hidden rounded-3xl transition-all duration-500 border-glow"
      >
        <div style={{ background: "var(--surface)" }} className="p-1">
          {/* Preview area */}
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-2xl"
            style={{
              background: `radial-gradient(circle at 30% 40%, color-mix(in oklch, ${p.accent} 8%, var(--surface)), var(--surface))`,
            }}
          >
            <div className="absolute inset-0 grid-lines opacity-30" />

            {/* Big monogram */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-serif text-[8rem] font-bold leading-none tracking-tighter select-none opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.12] md:text-[12rem]"
                style={{ color: p.accent }}
              >
                {p.title.slice(0, 2)}
              </span>
            </div>

            {/* Corner badges */}
            <div className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.3)]">
              {p.category}
            </div>
            <div className="absolute right-5 top-5 font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.25)]">
              {p.year}
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: `linear-gradient(to top, var(--surface), transparent)` }} />
          </div>

          {/* Content */}
          <div className="px-6 pb-6 pt-4 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{p.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[rgba(255,255,255,0.45)]">{p.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 md:justify-end">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.4)]"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <a
                href="#"
                className="group/btn inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.6)] transition-colors hover:text-foreground"
              >
                View Project
                <span className="transition-transform group-hover/btn:translate-x-1">→</span>
              </a>
              <a
                href="#"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.3)] transition-colors hover:text-foreground"
              >
                Source ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)`, scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
        />
      </motion.div>
    </FadeIn>
  );
}

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      <SectionLabel index="03">Work</SectionLabel>

      <FadeIn>
        <h2 className="relative z-10 mb-4 max-w-3xl font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Selected <span className="text-gradient-accent">projects</span>.
        </h2>
        <p className="relative z-10 mb-16 max-w-lg text-sm text-[rgba(255,255,255,0.4)]">
          Each one built with intention, precision, and an obsession for detail.
        </p>
      </FadeIn>

      <div className="relative z-10 grid gap-8">
        {projects.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
      </div>
    </section>
  );
}
