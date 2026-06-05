import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionLabel({ children, index }: { children: ReactNode; index: string }) {
  return (
    <div className="mb-16 flex items-center gap-4">
      <span
        className="font-mono text-sm font-medium tracking-wider"
        style={{
          background: "linear-gradient(135deg, oklch(0.68 0.19 280), oklch(0.72 0.17 195))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {index}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-[rgba(255,255,255,0.08)] to-transparent" />
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[rgba(255,255,255,0.3)]">
        {children}
      </span>
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 40,
  className = "",
  scale,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  scale?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, ...(scale ? { scale: 0.96 } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
