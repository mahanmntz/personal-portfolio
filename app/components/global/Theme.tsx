"use client";
import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import SunIcon from "../../assets/icons/SunIcon";
import MoonIcon from "../../assets/icons/MoonIcon";

export default function Theme() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => setHasMounted(true), []);

  async function toggleTheme() {
    const next = currentTheme === "light" ? "dark" : "light";

    // Fallback for browsers without the View Transitions API / reduced motion.
    if (
      !buttonRef.current ||
      typeof (document as any).startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(next);
      return;
    }

    // The reveal grows from the center of the toggle button to the farthest corner.
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const endRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    );

    const transition = (document as any).startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    try {
      await transition.ready;
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch {
      // Transition interrupted — theme is already applied, nothing else to do.
    }
  }

  if (!hasMounted)
    return (
      <span className="animate-pulse min-w-[28px] min-h-[28px] p-2 rounded-full dark:bg-zinc-800 bg-zinc-200 border dark:border-zinc-700 border-zinc-300"></span>
    );

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={`dark:bg-primary-bg bg-zinc-100 dark:text-primary-color text-zinc-500 border dark:border-zinc-800 border-zinc-200 rounded-full p-2 duration-300 transition-transform ${
        currentTheme === "light" ? "-rotate-180" : "rotate-0"
      }`}
      aria-label="Toggle Theme"
    >
      {currentTheme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
