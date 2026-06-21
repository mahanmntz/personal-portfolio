"use client";
import { useEffect, useRef, useState } from "react";
import { BiBookOpen } from "react-icons/bi";
import { HiPlay, HiPause, HiX } from "react-icons/hi";

export default function ReadingMode({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  const [open, setOpen] = useState(false);
  const [auto, setAuto] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const paraRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const wordCount = paragraphs
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    if (!open || !auto) return;
    let raf = 0;
    const step = () => {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollTop += 0.6 * speed;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
        setAuto(false);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [open, auto, speed]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const pct = el.scrollTop / (el.scrollHeight - el.clientHeight || 1);
    setProgress(Math.min(100, Math.max(0, pct * 100)));

    const center = el.scrollTop + el.clientHeight / 2;
    let best = 0;
    let bestDist = Infinity;
    paraRefs.current.forEach((p, i) => {
      if (!p) return;
      const mid = p.offsetTop + p.offsetHeight / 2;
      const dist = Math.abs(mid - center);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md px-4 py-2 text-sm font-semibold duration-300"
      >
        <BiBookOpen className="text-base" /> Read mode
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] dark:bg-zinc-950/95 bg-white/95 backdrop-blur-md">
          <div
            className="absolute top-0 left-0 h-1 bg-primary-color duration-150"
            style={{ width: `${progress}%` }}
          />

          <div className="flex items-center justify-between gap-4 px-5 md:px-8 py-4 border-b dark:border-zinc-800 border-zinc-200">
            <div className="min-w-0">
              <p className="truncate font-incognito font-bold tracking-tight">
                {title}
              </p>
              <p className="text-xs dark:text-zinc-500 text-zinc-400">
                {wordCount} words · {minutes} min read · {Math.round(progress)}%
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                aria-label="Auto-scroll speed"
                className="dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 rounded-md text-xs px-2 py-1.5 outline-none"
              >
                <option value={0.5}>0.5x</option>
                <option value={1}>1x</option>
                <option value={1.5}>1.5x</option>
                <option value={2}>2x</option>
              </select>
              <button
                onClick={() => setAuto((a) => !a)}
                aria-label="Toggle auto-scroll"
                className="grid place-items-center h-9 w-9 rounded-md dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 dark:text-primary-color text-tertiary-color"
              >
                {auto ? <HiPause /> : <HiPlay />}
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close reading mode"
                className="grid place-items-center h-9 w-9 rounded-md dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200"
              >
                <HiX />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="h-[calc(100vh-73px)] overflow-y-auto px-5 md:px-8 py-12 md:py-16"
          >
            <article className="max-w-2xl mx-auto">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  ref={(el) => {
                    paraRefs.current[i] = el;
                  }}
                  className={`mb-7 text-lg md:text-xl leading-loose transition-colors duration-300 ${
                    i === active
                      ? "dark:text-white text-zinc-900"
                      : "dark:text-zinc-600 text-zinc-400"
                  }`}
                >
                  {p}
                </p>
              ))}
            </article>
          </div>
        </div>
      )}
    </>
  );
}
