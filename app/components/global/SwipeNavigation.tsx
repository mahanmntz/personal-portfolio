"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/app/data/nav";

// Drag/swipe left-right to move between pages. Uses Pointer Events (touch +
// mouse) and detects the swipe *during* the move so mobile browsers don't
// cancel it first.
export default function SwipeNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/studio")) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let fired = false;
    let pointerType = "touch";

    const startsInScrollableX = (target: EventTarget | null) => {
      let el = target as HTMLElement | null;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        if (
          el.scrollWidth > el.clientWidth + 4 &&
          /(auto|scroll)/.test(style.overflowX)
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const go = (dx: number) => {
      const index = navLinks.findIndex((l) =>
        l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
      );
      if (index === -1) return;
      if (dx < 0 && index < navLinks.length - 1) {
        router.push(navLinks[index + 1].href);
      } else if (dx > 0 && index > 0) {
        router.push(navLinks[index - 1].href);
      }
    };

    const onDown = (e: PointerEvent) => {
      fired = false;
      if (e.button !== 0 || startsInScrollableX(e.target)) {
        tracking = false;
        return;
      }
      startX = e.clientX;
      startY = e.clientY;
      pointerType = e.pointerType;
      tracking = true;
    };

    const onMove = (e: PointerEvent) => {
      if (!tracking || fired) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Vertical scroll wins — stop tracking this gesture.
      if (Math.abs(dy) > 70 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        tracking = false;
        return;
      }
      const threshold = pointerType === "mouse" ? 140 : 55;
      if (Math.abs(dx) >= threshold && Math.abs(dx) > Math.abs(dy) * 1.2) {
        if (
          pointerType === "mouse" &&
          (window.getSelection()?.toString().length ?? 0) > 0
        )
          return;
        fired = true;
        tracking = false;
        go(dx);
      }
    };

    const onEnd = () => {
      tracking = false;
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onEnd, { passive: true });
    window.addEventListener("pointercancel", onEnd, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onEnd);
      window.removeEventListener("pointercancel", onEnd);
    };
  }, [pathname, router]);

  return null;
}
