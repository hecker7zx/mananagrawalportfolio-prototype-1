import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-20">
      {/* Top gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-0 h-px origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, oklch(0.68 0.19 280 / 0.4), oklch(0.72 0.17 195 / 0.4), transparent)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 md:flex-row md:items-end md:justify-between">
        {/* Monogram */}
        <div>
          <a href="#top" className="group">
            <span
              className="font-serif text-7xl font-bold tracking-tighter md:text-[9rem] select-none leading-none"
              style={{
                background: "linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              MA
            </span>
            <span className="font-serif text-7xl font-bold md:text-[9rem]" style={{ color: "oklch(0.68 0.19 280 / 0.3)" }}>.</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[rgba(255,255,255,0.3)]">
            Designing the next decade of interfaces.
          </p>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.25)] md:items-end">
          <span>© {new Date().getFullYear()} Manan Agrawal</span>
          <span>Built with intent</span>
          <a
            href="#top"
            className="flex items-center gap-1 text-[rgba(255,255,255,0.35)] transition-colors hover:text-foreground"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
