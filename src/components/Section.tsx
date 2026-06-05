import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionLabel({ children, index }: { children: ReactNode; index: string }) {
  return (
    <div className="mb-12 flex items-end justify-between border-b border-foreground/10 pb-4">
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/60">
        <span>{index}</span>
        <span className="h-px w-10 bg-foreground/20" />
        <span>{children}</span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
        ● Active
      </span>
    </div>
  );
}

export function FadeIn({ children, delay = 0, y = 30 }: { children: ReactNode; delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
