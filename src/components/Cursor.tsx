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
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
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
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: hovering ? 64 : 36,
          height: hovering ? 64 : 36,
          borderRadius: 999,
          border: "1px solid rgba(0,0,0,0.5)",
          mixBlendMode: "difference",
          transition: "width .25s ease, height .25s ease, background .25s ease",
          background: hovering ? "rgba(255,255,255,0.06)" : "transparent",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: 6, height: 6, borderRadius: 999, background: "white", mixBlendMode: "difference",
        }}
      />
    </>
  );
}
