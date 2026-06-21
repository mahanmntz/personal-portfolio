"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/app/data/nav";

// Drag/swipe left-right to move between pages. Uses Pointer Events so it works
// with both touch (mobile) and mouse/trackpad (desktop).
export default function SwipeNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/studio")) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
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

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || startsInScrollableX(e.target)) {
        tracking = false;
        return;
      }
      startX = e.clientX;
      startY = e.clientY;
      pointerType = e.pointerType;
      tracking = true;
    };

    const onUp = (e: PointerEvent) => {
      if (!tracking) return;
      tracking = false;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const threshold = pointerType === "mouse" ? 130 : 80;

      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 2) return;
      // Don't navigate if the mouse drag was actually a text selection.
      if (
        pointerType === "mouse" &&
        (window.getSelection()?.toString().length ?? 0) > 0
      )
        return;

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

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [pathname, router]);

  return null;
}
