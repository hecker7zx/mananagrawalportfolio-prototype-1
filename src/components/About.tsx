import { FadeIn, SectionLabel } from "./Section";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { k: 50, suffix: "+", v: "Projects shipped" },
  { k: 5, suffix: "y", v: "Building on the web" },
  { k: 12, suffix: "+", v: "Tools mastered" },
  { k: 99, suffix: "%", v: "Pixels obsessed over" },
];

const roles = ["Frontend Developer", "Web Designer", "WordPress Developer", "Graphic Designer", "Digital Creator"];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 40;
    const step = () => {
      frame++;
      const progress = 1 - Math.pow(1 - frame / total, 3);
      setVal(Math.round(progress * target));
      if (frame < total) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      {/* Glow */}
      <div
        className="pointer-events-none absolute -right-40 top-0 z-0 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(0.68 0.19 280 / 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <SectionLabel index="01">About</SectionLabel>

      <div className="relative z-10 grid gap-16 lg:grid-cols-12">
        {/* Left — pull quote */}
        <FadeIn className="lg:col-span-5">
          <blockquote className="relative">
            <span className="absolute -left-4 -top-6 font-serif text-7xl leading-none text-[rgba(255,255,255,0.06)]">"</span>
            <p className="font-serif text-3xl font-medium leading-snug tracking-tight text-foreground md:text-4xl">
              I believe the web should feel like the{" "}
              <span className="text-gradient-accent italic">future</span>, not the past.
            </p>
          </blockquote>
          <div className="mt-8 gradient-line" />
          <div className="mt-8 space-y-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.4)]">
            <div className="flex justify-between"><span>Name</span><span className="text-foreground">Manan Agrawal</span></div>
            <div className="flex justify-between"><span>Role</span><span className="text-foreground">Frontend Dev</span></div>
            <div className="flex justify-between">
              <span>Status</span>
              <span className="flex items-center gap-1.5 text-[oklch(0.72_0.17_195)]">
                <span className="h-1.5 w-1.5 rounded-full animate-status" style={{ background: "oklch(0.72 0.17 195)" }} />
                Open to work
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Right — content */}
        <div className="lg:col-span-7">
          <FadeIn>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              I design and build digital experiences that feel{" "}
              <span className="text-gradient-accent">a decade ahead</span>.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[rgba(255,255,255,0.5)]">
              I'm Manan — a frontend developer and digital creator obsessed with the
              boundary between engineering and atmosphere. From production-grade
              WordPress builds to motion-rich React interfaces, I treat every pixel,
              every easing curve, every transition as a chance to push the web forward.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-[rgba(255,255,255,0.5)] transition-all duration-300 border-glow"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  {r}
                </span>
              ))}
            </div>
          </FadeIn>

          <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            {stats.map((s, i) => (
              <FadeIn key={s.v} delay={0.1 + i * 0.05}>
                <div className="flex flex-col gap-1 p-6 transition-colors hover:bg-[rgba(255,255,255,0.02)]" style={{ background: "var(--surface)" }}>
                  <span className="font-display text-3xl font-bold tracking-tight text-gradient-accent md:text-4xl">
                    <Counter target={s.k} suffix={s.suffix} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[rgba(255,255,255,0.35)]">{s.v}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
