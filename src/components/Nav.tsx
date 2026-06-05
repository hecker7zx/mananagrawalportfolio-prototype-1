import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 60));

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(96%,1100px)]"
      >
        <div
          className="flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500"
          style={{
            background: scrolled ? "rgba(10,10,11,0.85)" : "rgba(10,10,11,0.4)",
            backdropFilter: "blur(24px) saturate(160%)",
            WebkitBackdropFilter: "blur(24px) saturate(160%)",
            border: `1px solid ${scrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
            boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
          }}
        >
          {/* Logo */}
          <a href="#top" className="group flex items-center font-serif text-lg font-bold tracking-tight">
            <span className="text-foreground">MA</span>
            <span style={{ color: "oklch(0.68 0.19 280)" }}>.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[11px] font-medium uppercase tracking-[0.2em] text-[rgba(255,255,255,0.5)] transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full" style={{ background: "oklch(0.68 0.19 280)" }} />
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:inline-flex"
              style={{
                background: "linear-gradient(135deg, oklch(0.68 0.19 280), oklch(0.60 0.22 280))",
                color: "#fff",
                boxShadow: "0 4px 20px oklch(0.68 0.19 280 / 0.25)",
              }}
            >
              Let's talk
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1 md:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="h-px w-5 bg-foreground"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-px w-5 bg-foreground"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="h-px w-5 bg-foreground"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
        style={{ background: "rgba(10,10,11,0.95)", backdropFilter: "blur(20px)" }}
      >
        {links.map((l, i) => (
          <motion.a
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.05 } } : { opacity: 0, y: 20 }}
            className="font-serif text-3xl font-medium tracking-tight text-foreground"
          >
            {l.label}
          </motion.a>
        ))}
        <motion.a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          initial={{ opacity: 0 }}
          animate={menuOpen ? { opacity: 1, transition: { delay: 0.4 } } : { opacity: 0 }}
          className="mt-4 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white"
          style={{
            background: "linear-gradient(135deg, oklch(0.68 0.19 280), oklch(0.60 0.22 280))",
          }}
        >
          Let's talk
        </motion.a>
      </motion.div>
    </>
  );
}
