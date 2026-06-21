"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Ripple = { id: number; x: number; y: number };

export default function CursorEffects() {
  const pathname = usePathname();
  const glowRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const onStudio = pathname.startsWith("/studio");

  useEffect(() => {
    if (onStudio) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    setFinePointer(fine);

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      });
    };

    const onClick = (e: MouseEvent) => {
      const id = Date.now() + Math.random();
      setRipples((r) => [...r, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(
        () => setRipples((r) => r.filter((p) => p.id !== id)),
        650
      );
    };

    if (fine) window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
    };
  }, [onStudio]);

  if (onStudio) return null;

  return (
    <>
      {finePointer && (
        <div
          ref={glowRef}
          aria-hidden="true"
          className="cursor-glow pointer-events-none fixed left-0 top-0 z-[9998] h-[22rem] w-[22rem] rounded-full opacity-50 blur-[90px] will-change-transform"
          style={{ marginLeft: "-11rem", marginTop: "-11rem" }}
        />
      )}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="cursor-ripple pointer-events-none fixed z-[9999]"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </>
  );
}
