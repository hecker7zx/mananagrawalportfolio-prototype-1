import { motion } from "framer-motion";
import { HeroScene } from "./HeroScene";
import { Magnetic } from "./Magnetic";

const revealWord = {
  hidden: { y: "110%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.35 + i * 0.1 },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden bg-[oklch(0.97_0_0)]">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-lines opacity-40 z-0" />

      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, oklch(0.82 0.12 270 / 0.18) 0%, oklch(0.75 0.15 200 / 0.10) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute z-0"
        style={{
          bottom: "10%",
          right: "-5%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.14 340 / 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* 3D Canvas — sits BEHIND text (z-index 1) */}
      <div className="absolute inset-0 z-[1]">
        <HeroScene />
      </div>

      {/* Top meta strip */}
      <div className="pointer-events-none absolute left-0 right-0 top-24 z-20 mx-auto flex max-w-7xl items-center justify-between px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50">
        <span>N 28.6139°  E 77.2090°</span>
        <span>Portfolio / v2035.1</span>
        <span className="hidden md:flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Available for projects
        </span>
      </div>

      {/* ── HERO CONTENT — z-20 so it always sits above the 3D scene ── */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-4 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-white/70 px-4 py-1.5 backdrop-blur-md shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-[0.38em] text-foreground/60">
            Frontend Developer · Digital Creator
          </span>
        </motion.div>

        {/* ── NAME — the fix: solid foreground color + strong backdrop so it's always legible ── */}
        <h1
          className="relative font-display font-black leading-[0.88] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3.5rem, 14vw, 13rem)" }}
        >
          {/* Backdrop blur pill that sits behind the letters */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-[-8%] inset-y-[-4%] rounded-3xl"
            style={{
              background: "rgba(255,255,255,0.35)",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
          />

          {["MANAN", "AGRAWAL"].map((word, wi) => (
            <span key={word} className="relative block overflow-hidden">
              <motion.span
                custom={wi}
                variants={revealWord}
                initial="hidden"
                animate="show"
                className="inline-block select-none"
                style={{
                  /* Deep navy-black with a subtle purple tint — always readable on white bg */
                  background: "linear-gradient(160deg, oklch(0.08 0.02 270) 0%, oklch(0.22 0.04 260) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  /* Painted-on outline so it reads on ANY background */
                  WebkitTextStroke: "1.5px oklch(0.08 0.02 270 / 0.15)",
                  paintOrder: "stroke fill",
                  filter: "drop-shadow(0 4px 32px oklch(0.08 0.04 270 / 0.18))",
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Tagline + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex max-w-xl flex-col items-center gap-6 text-balance"
        >
          <p className="text-sm leading-relaxed text-foreground/65 md:text-base backdrop-blur-sm rounded-xl px-2 py-1 bg-white/30">
            Crafting next-generation interfaces where engineering meets atmosphere.
            Premium frontends, immersive websites, and brand-grade digital systems.
          </p>
          <div className="pointer-events-auto flex items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="shine inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-background shadow-lg transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)]"
              >
                View Work
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white/60 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] backdrop-blur-md transition-all hover:bg-white/90"
              >
                Contact
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="pointer-events-none absolute bottom-20 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-foreground/40">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-px bg-gradient-to-b from-foreground/40 to-transparent"
        />
      </motion.div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden border-y border-foreground/8 bg-white/50 py-3 backdrop-blur-md">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-[11px] uppercase tracking-[0.3em] text-foreground/55">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-12">
              {["React", "Three.js", "Next-Gen UI", "Motion Design", "WordPress", "Design Systems", "Creative Code", "Web Design", "TypeScript", "GSAP"].map((t) => (
                <span key={`${i}-${t}`} className="flex items-center gap-12">
                  {t} <span className="text-foreground/25">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
