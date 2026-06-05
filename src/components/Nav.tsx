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
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(96%,1100px)]"
    >
      <div
        className="flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.88)"
            : "rgba(255,255,255,0.65)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: scrolled
            ? "1px solid rgba(0,0,0,0.09)"
            : "1px solid rgba(0,0,0,0.06)",
          boxShadow: scrolled
            ? "0 2px 20px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.04)"
            : "0 1px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-1 font-display text-sm font-bold tracking-tight">
          <span>MA</span>
          <span
            className="transition-colors"
            style={{ color: "oklch(0.62 0.22 280)" }}
          >
            .
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#contact"
          className="relative overflow-hidden rounded-full bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-background transition-all hover:scale-[1.04] hover:shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
        >
          Let's talk
        </a>
      </div>
    </motion.header>
  );
}
