import { FadeIn, SectionLabel } from "./Section";

const skills = [
  { name: "HTML / CSS", level: 98, icon: "◆", accent: "oklch(0.68 0.19 280)" },
  { name: "JavaScript", level: 92, icon: "◇", accent: "oklch(0.75 0.14 65)" },
  { name: "React", level: 90, icon: "◈", accent: "oklch(0.72 0.17 195)" },
  { name: "TypeScript", level: 85, icon: "⬡", accent: "oklch(0.68 0.19 280)" },
  { name: "Three.js", level: 78, icon: "△", accent: "oklch(0.72 0.17 195)" },
  { name: "WordPress", level: 95, icon: "◉", accent: "oklch(0.75 0.14 65)" },
  { name: "Photoshop", level: 85, icon: "◎", accent: "oklch(0.68 0.19 280)" },
  { name: "Illustrator", level: 80, icon: "◐", accent: "oklch(0.72 0.17 195)" },
];

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-32 md:py-44">
      {/* Glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 -translate-x-1/2 h-[400px] w-[600px]"
        style={{
          background: "radial-gradient(ellipse, oklch(0.72 0.17 195 / 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <SectionLabel index="02">Skills</SectionLabel>

      <FadeIn>
        <h2 className="relative z-10 mb-6 max-w-2xl font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          Tools I use to build the{" "}
          <span className="text-gradient-accent">impossible</span>.
        </h2>
        <p className="relative z-10 mb-16 max-w-lg text-sm text-[rgba(255,255,255,0.4)]">
          A curated set of technologies and design tools honed over years of building for the modern web.
        </p>
      </FadeIn>

      <div className="relative z-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, i) => (
          <FadeIn key={s.name} delay={i * 0.05} scale>
            <div
              className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-400 border-glow"
              style={{ background: "var(--surface)" }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${s.accent} 0%, transparent 70%)`,
                  filter: "blur(30px)",
                }}
              />

              <div className="relative">
                {/* Icon */}
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                  style={{ background: `color-mix(in oklch, ${s.accent} 15%, transparent)`, color: s.accent }}
                >
                  {s.icon}
                </div>

                {/* Name */}
                <h3 className="font-display text-base font-semibold tracking-tight text-foreground">{s.name}</h3>

                {/* Level bar */}
                <div className="mt-4 h-1 w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out group-hover:shadow-[0_0_12px_currentColor]"
                    style={{
                      width: `${s.level}%`,
                      background: `linear-gradient(90deg, ${s.accent}, color-mix(in oklch, ${s.accent} 60%, white))`,
                    }}
                  />
                </div>

                {/* Level text */}
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.3)]">Proficiency</span>
                  <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: s.accent }}>{s.level}%</span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
