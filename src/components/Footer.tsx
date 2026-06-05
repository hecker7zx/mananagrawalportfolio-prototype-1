export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/8 px-6 py-16">
      {/* Decorative glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[200px] w-[600px]"
        style={{
          background: "radial-gradient(ellipse, oklch(0.82 0.12 280 / 0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div>
          <div
            className="font-display text-7xl font-black leading-none tracking-tighter md:text-[9rem] select-none"
            style={{
              background: "linear-gradient(160deg, oklch(0.08 0.02 270) 0%, oklch(0.30 0.08 280) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            MA
            <span style={{ WebkitTextFillColor: "oklch(0.62 0.22 280)", color: "oklch(0.62 0.22 280)" }}>.</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-foreground/55 leading-relaxed">
            Manan Agrawal — Frontend Developer & Digital Creator.
            <br />Designing the next decade of interfaces.
          </p>
        </div>

        <div className="flex flex-col items-start gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50 md:items-end">
          <span>© {new Date().getFullYear()} Manan Agrawal</span>
          <span>Built with intent · v2035.1</span>
          <a
            href="#top"
            className="flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground"
          >
            Back to top
            <span className="ml-0.5 transition-transform group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
