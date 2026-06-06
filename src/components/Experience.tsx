import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FadeIn, SectionLabel } from "./Section";

/* ─── Data ──────────────────────────────────── */
const items = [
  {
    year: "2025",
    label: "Now",
    role: "Freelance Frontend Developer",
    org: "Independent",
    body: "Designing and shipping immersive websites, interactive interfaces, and brand-grade digital systems for startups and studios.",
    tags: ["React", "Three.js", "Framer Motion", "GSAP"],
    accent: "oklch(0.68 0.19 280)",
    accentRgb: "139, 92, 246",
  },
  {
    year: "2024",
    label: "",
    role: "WordPress Developer",
    org: "Client Projects",
    body: "Built bespoke WordPress and WooCommerce experiences with custom themes, performance budgets, and editorial flows.",
    tags: ["WordPress", "WooCommerce", "PHP", "ACF"],
    accent: "oklch(0.72 0.17 195)",
    accentRgb: "34, 211, 238",
  },
  {
    year: "2023",
    label: "",
    role: "Web & Graphic Designer",
    org: "Creative Studio",
    body: "Crafted brand identities, marketing sites, and content systems blending design craft with frontend execution.",
    tags: ["Figma", "Illustrator", "CSS", "Branding"],
    accent: "oklch(0.75 0.14 65)",
    accentRgb: "251, 191, 36",
  },
  {
    year: "2022",
    label: "",
    role: "Digital Creator",
    org: "Self-initiated",
    body: "Started a creative practice exploring motion, type, and interaction across platforms — the foundation of this portfolio.",
    tags: ["Motion", "Typography", "Exploration"],
    accent: "oklch(0.68 0.19 280)",
    accentRgb: "139, 92, 246",
  },
];

/* ─── Animated counter ──────────────────────── */
function AnimatedNumber({ value }: { value: string }) {
  return (
    <span className="inline-flex overflow-hidden">
      {value.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Floating particle field behind the section ── */
function ParticleField() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    dur: 12 + Math.random() * 20,
    delay: Math.random() * -20,
    opacity: 0.08 + Math.random() * 0.12,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "oklch(0.68 0.19 280)",
            opacity: p.opacity,
          }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Timeline card ─────────────────────────── */
function TimelineCard({
  item,
  index,
  total,
}: {
  item: (typeof items)[0];
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <FadeIn delay={index * 0.1} className="relative">
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative overflow-hidden rounded-2xl"
        whileHover={{ y: -6, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      >
        {/* ── Animated gradient border ── */}
        <div
          className="absolute inset-0 rounded-2xl p-px"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${item.accent}, transparent 60%)`
              : "rgba(255,255,255,0.06)",
            transition: "background 0.5s ease",
          }}
        >
          <div className="h-full w-full rounded-[calc(1rem-1px)] bg-[#0e0e10]" />
        </div>

        {/* ── Mouse-tracking glow overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-500"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(${item.accentRgb}, 0.07), transparent 50%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        {/* ── Card content ── */}
        <div className="relative z-20 p-6 md:p-8">
          {/* Top row: index + year */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* Pulsing indicator */}
              <span className="relative flex h-3 w-3 items-center justify-center">
                <motion.span
                  className="absolute h-full w-full rounded-full"
                  style={{ background: item.accent }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <span
                  className="relative h-2 w-2 rounded-full"
                  style={{
                    background: item.accent,
                    boxShadow: `0 0 12px ${item.accent}`,
                  }}
                />
              </span>

              <span
                className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: item.accent }}
              >
                {item.label ? `${item.year} — ${item.label}` : item.year}
              </span>
            </div>

            {/* Card index counter */}
            <span className="font-mono text-5xl font-bold leading-none" style={{ color: "rgba(255,255,255,0.04)" }}>
              <AnimatedNumber value={String(index + 1).padStart(2, "0")} />
            </span>
          </div>

          {/* Role + org */}
          <h3 className="font-display text-xl font-semibold tracking-tight text-white md:text-2xl">
            {item.role}
          </h3>
          <p className="mt-1 text-sm font-medium" style={{ color: item.accent }}>
            {item.org}
          </p>

          {/* Horizontal accent line */}
          <motion.div
            className="my-5 h-px w-full"
            style={{
              background: `linear-gradient(90deg, ${item.accent}, transparent)`,
              opacity: 0.25,
            }}
            whileInView={{ scaleX: [0, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Description */}
          <p className="max-w-md text-sm leading-relaxed text-[rgba(255,255,255,0.5)]">
            {item.body}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider"
                style={{
                  background: `rgba(${item.accentRgb}, 0.08)`,
                  color: item.accent,
                  border: `1px solid rgba(${item.accentRgb}, 0.15)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom connector arrow (except last) */}
          {index < total - 1 && (
            <div className="absolute -bottom-1 left-1/2 z-30 hidden -translate-x-1/2 md:block">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          )}
        </div>
      </motion.div>
    </FadeIn>
  );
}

/* ─── Main export ────────────────────────────── */
export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  // Animated progress line
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative mx-auto max-w-7xl overflow-hidden px-6 py-32 md:py-44"
    >
      {/* Background ambient effects */}
      <ParticleField />

      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -left-40 top-1/4 h-80 w-80 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, oklch(0.68 0.19 280), transparent 70%)" }}
        />
        <div
          className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, oklch(0.72 0.17 195), transparent 70%)" }}
        />
      </div>

      <SectionLabel index="04">Experience</SectionLabel>

      <FadeIn>
        <h2 className="relative z-10 mb-6 max-w-4xl font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          A timeline of building on the{" "}
          <span className="text-gradient-accent">open web</span>.
        </h2>
        <p className="relative z-10 mb-20 max-w-xl text-base leading-relaxed text-[rgba(255,255,255,0.4)]">
          From first pixels to full-stack experiences — each chapter sharpened my craft.
        </p>
      </FadeIn>

      {/* ── Horizontal progress track (desktop) ── */}
      <div className="relative z-10 mb-14 hidden md:block">
        <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.04)" }} />
        <motion.div
          className="absolute left-0 top-0 h-px"
          style={{
            width: lineWidth,
            background: "linear-gradient(90deg, oklch(0.68 0.19 280), oklch(0.72 0.17 195), oklch(0.75 0.14 65))",
          }}
        />
        {/* Year markers */}
        <div className="mt-3 flex justify-between">
          {items.map((item, i) => (
            <motion.div
              key={item.year}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <span
                className="mb-1 h-2 w-2 rounded-full"
                style={{
                  background: item.accent,
                  boxShadow: `0 0 10px ${item.accent}`,
                }}
              />
              <span className="font-mono text-[10px] font-medium tracking-wider text-[rgba(255,255,255,0.3)]">
                {item.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="relative z-10 grid gap-5 md:grid-cols-2">
        {items.map((item, i) => (
          <TimelineCard key={item.year} item={item} index={i} total={items.length} />
        ))}
      </div>

      {/* Bottom decorative line */}
      <FadeIn delay={0.5}>
        <div className="gradient-line mt-20" />
      </FadeIn>
    </section>
  );
}
