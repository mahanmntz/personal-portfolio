"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/app/data/nav";

// Lets you swipe left/right (touch) to move to the next/previous page.
export default function SwipeNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.startsWith("/studio")) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;

      // Don't hijack swipes that begin inside a horizontally scrollable element
      // (e.g. the contribution graph, code blocks, tables).
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        if (
          el.scrollWidth > el.clientWidth + 4 &&
          /(auto|scroll)/.test(style.overflowX)
        ) {
          tracking = false;
          return;
        }
        el = el.parentElement;
      }

      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      tracking = true;
    };

    const onEnd = (e: TouchEvent) => {
      if (!tracking) return;
      tracking = false;

      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;

      // Require a clear, mostly-horizontal swipe.
      if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 2) return;

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

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [pathname, router]);

  return null;
}
