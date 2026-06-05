import { motion } from "framer-motion";
import { HeroScene } from "./HeroScene";
import { Magnetic } from "./Magnetic";

const charReveal = {
  hidden: { y: "100%", opacity: 0 },
  show: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 + i * 0.025 },
  }),
};

function SplitText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span className="block overflow-hidden" aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={charReveal}
          initial="hidden"
          animate="show"
          className={`inline-block ${className ?? ""}`}
          style={style}
          aria-hidden
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative h-[100svh] w-full overflow-hidden">
      {/* ── Ambient glows ── */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          top: "-20%", left: "30%",
          width: "800px", height: "800px",
          background: "radial-gradient(circle, oklch(0.68 0.19 280 / 0.10) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute z-0"
        style={{
          bottom: "0%", right: "0%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, oklch(0.72 0.17 195 / 0.07) 0%, transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 grid-lines opacity-60 z-0" />

      {/* 3D Scene — behind text */}
      <div className="absolute inset-0 z-[1]">
        <HeroScene />
      </div>

      {/* ── Content ── */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-10 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full animate-status" style={{ background: "oklch(0.72 0.17 195)" }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[rgba(255,255,255,0.45)]">
            Available for projects
          </span>
        </motion.div>

        {/* Name — mixed typography */}
        <h1 className="relative" style={{ lineHeight: 0.92 }}>
          {/* Line 1: serif */}
          <SplitText
            text="MANAN"
            className="font-serif font-bold tracking-[-0.02em]"
            style={{ fontSize: "clamp(3.5rem, 13vw, 12rem)", color: "#f0f0f2" }}
          />
          {/* Line 2: sans display */}
          <SplitText
            text="AGRAWAL"
            className="font-display font-bold tracking-[-0.05em]"
            style={{
              fontSize: "clamp(3rem, 11vw, 10rem)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.4) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          />
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9 }}
          className="mt-8 max-w-md text-sm leading-relaxed text-[rgba(255,255,255,0.45)] md:text-base"
        >
          Frontend developer & digital creator crafting
          <br className="hidden sm:block" />
          premium interfaces for the next decade.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          className="pointer-events-auto mt-10 flex items-center gap-4"
        >
          <Magnetic>
            <a
              href="#work"
              className="shine group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, oklch(0.68 0.19 280), oklch(0.58 0.22 280))",
                boxShadow: "0 4px 24px oklch(0.68 0.19 280 / 0.3)",
              }}
            >
              View Work
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.7)] transition-all duration-300 hover:text-white border-glow"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              Contact
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[rgba(255,255,255,0.25)]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }}
        />
      </motion.div>

      {/* Bottom gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 z-20 h-px origin-left"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.68 0.19 280 / 0.5), oklch(0.72 0.17 195 / 0.5), transparent)",
        }}
      />
    </section>
  );
}
