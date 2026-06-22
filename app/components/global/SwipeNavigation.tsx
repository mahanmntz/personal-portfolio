"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/app/data/nav";

// Swipe left/right between pages. Touch fires *during* the move (snappy and
// reliable on mobile); mouse drag fires on release.
export default function SwipeNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/studio")) return;

    let startX = 0;
    let startY = 0;
    let active = false;
    let fired = false;

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

    const navigate = (dx: number) => {
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

    // ---- Touch (mobile): detect during move ----
    const onTouchStart = (e: TouchEvent) => {
      fired = false;
      if (e.touches.length !== 1 || startsInScrollableX(e.target)) {
        active = false;
        return;
      }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      active = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!active || fired) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx)) {
        active = false; // it's a vertical scroll
        return;
      }
      if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        fired = true;
        active = false;
        navigate(dx);
      }
    };
    const onTouchEnd = () => {
      active = false;
    };

    // ---- Mouse drag (desktop): on release ----
    let mStartX = 0;
    let mStartY = 0;
    let mDown = false;
    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0 || startsInScrollableX(e.target)) {
        mDown = false;
        return;
      }
      mStartX = e.clientX;
      mStartY = e.clientY;
      mDown = true;
    };
    const onMouseUp = (e: MouseEvent) => {
      if (!mDown) return;
      mDown = false;
      const dx = e.clientX - mStartX;
      const dy = e.clientY - mStartY;
      if (Math.abs(dx) < 120 || Math.abs(dx) < Math.abs(dy) * 1.2) return;
      if ((window.getSelection()?.toString().length ?? 0) > 0) return;
      navigate(dx);
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("mousedown", onMouseDown, { passive: true });
    document.addEventListener("mouseup", onMouseUp, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [pathname, router]);

  return null;
}
