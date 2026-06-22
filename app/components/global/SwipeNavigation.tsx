"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/app/data/nav";

// Swipe left/right (touch) or click-drag (mouse) to move between pages.
export default function SwipeNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/studio")) return;

    let startX = 0;
    let startY = 0;
    let startT = 0;
    let active = false;

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

    const begin = (x: number, y: number, target: EventTarget | null) => {
      if (startsInScrollableX(target)) {
        active = false;
        return;
      }
      startX = x;
      startY = y;
      startT = Date.now();
      active = true;
    };

    const finish = (x: number, y: number) => {
      if (!active) return;
      active = false;
      const dx = x - startX;
      const dy = y - startY;
      const dt = Date.now() - startT;

      if (Math.abs(dx) < 55) return; // not far enough
      if (Math.abs(dx) < Math.abs(dy) * 1.2) return; // not horizontal enough
      if (dt > 1000) return; // too slow to be a swipe

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

    // Touch (mobile)
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) {
        active = false;
        return;
      }
      begin(e.touches[0].clientX, e.touches[0].clientY, e.target);
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (t) finish(t.clientX, t.clientY);
    };

    // Mouse drag (desktop)
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      begin(e.clientX, e.clientY, e.target);
    };
    const onMouseUp = (e: MouseEvent) => {
      if (active && (window.getSelection()?.toString().length ?? 0) > 0) {
        active = false;
        return;
      }
      finish(e.clientX, e.clientY);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseup", onMouseUp, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [pathname, router]);

  return null;
}
