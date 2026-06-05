import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const steps = 100;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      // Ease-out curve for counter
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(progress * 100));
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => setExiting(true), 300);
        setTimeout(() => onComplete(), 1100);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#0a0a0b" }}
        >
          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute"
            style={{
              width: "600px",
              height: "600px",
              background: "radial-gradient(circle, oklch(0.68 0.19 280 / 0.08) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12"
          >
            <span
              className="font-serif text-6xl font-bold tracking-tight md:text-8xl"
              style={{
                background: "linear-gradient(135deg, #f0f0f2 0%, rgba(255,255,255,0.5) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              MA
            </span>
            <span
              className="font-serif text-6xl font-bold md:text-8xl"
              style={{ color: "oklch(0.68 0.19 280)" }}
            >
              .
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="relative w-48">
            <div className="h-px w-full bg-[rgba(255,255,255,0.08)]" />
            <motion.div
              className="absolute left-0 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, oklch(0.68 0.19 280), oklch(0.72 0.17 195))",
                width: `${count}%`,
              }}
              transition={{ duration: 0.05 }}
            />
          </div>

          {/* Counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 font-mono text-xs tracking-[0.4em] text-[rgba(255,255,255,0.3)]"
          >
            {String(count).padStart(3, "0")}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
