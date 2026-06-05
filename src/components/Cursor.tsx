import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let rx = x, ry = y;

    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("a, button, [data-cursor='hover']"));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let raf = 0;
    const loop = () => {
      rx += (x - rx) * 0.12;
      ry += (y - ry) * 0.12;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Outer ring — slower follow */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: hovering ? 60 : 32,
          height: hovering ? 60 : 32,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.25)",
          transition: "width .3s cubic-bezier(0.22,1,0.36,1), height .3s cubic-bezier(0.22,1,0.36,1), border-color .3s ease",
          borderColor: hovering ? "oklch(0.68 0.19 280 / 0.6)" : "rgba(255,255,255,0.25)",
          background: hovering ? "oklch(0.68 0.19 280 / 0.06)" : "transparent",
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: 5,
          height: 5,
          borderRadius: 999,
          background: hovering ? "oklch(0.68 0.19 280)" : "rgba(255,255,255,0.8)",
          transition: "background .2s ease",
        }}
      />
    </>
  );
}
