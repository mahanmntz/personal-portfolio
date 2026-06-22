"use client";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [playing, setPlaying] = useState(false);
  const [wpm, setWpm] = useState(300);
  const [index, setIndex] = useState(0);

  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Flatten words (grouped by paragraph) and give each a global index.
  const paraWords = useMemo(() => {
    let gi = 0;
    return paragraphs.map((p) =>
      p
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => ({ w, gi: gi++ }))
    );
  }, [paragraphs]);

  const total = useMemo(
    () => paraWords.reduce((n, ws) => n + ws.length, 0),
    [paraWords]
  );

  const progress = total ? Math.round(((index + 1) / total) * 100) : 0;
  const minutes = Math.max(1, Math.round(total / 200));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Word-by-word advance, paced by words-per-minute.
  useEffect(() => {
    if (!open || !playing) return;
    if (index >= total - 1) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(
      () => setIndex((i) => Math.min(i + 1, total - 1)),
      60000 / wpm
    );
    return () => clearTimeout(id);
  }, [open, playing, index, wpm, total]);

  // Keep the current word centered.
  useEffect(() => {
    if (!open) return;
    wordRefs.current[index]?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  }, [index, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
          setPlaying(false);
          setIndex(0);
        }}
        className="flex items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md px-4 py-2 text-sm font-semibold duration-300"
      >
        <BiBookOpen className="text-base" /> Read mode
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] dark:bg-zinc-950/95 bg-white/95 backdrop-blur-md">
          <div
            className="absolute top-0 left-0 h-1 bg-primary-color duration-200"
            style={{ width: `${progress}%` }}
          />

          <div className="flex items-center justify-between gap-3 px-5 md:px-8 py-4 border-b dark:border-zinc-800 border-zinc-200">
            <div className="min-w-0">
              <p className="truncate font-incognito font-bold tracking-tight">
                {title}
              </p>
              <p className="text-xs dark:text-zinc-500 text-zinc-400">
                {total} words · {minutes} min · {progress}%
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="hidden sm:flex items-center gap-2 text-xs dark:text-zinc-400 text-zinc-500">
                <span className="tabular-nums">{wpm} wpm</span>
                <input
                  type="range"
                  min={100}
                  max={700}
                  step={25}
                  value={wpm}
                  onChange={(e) => setWpm(Number(e.target.value))}
                  aria-label="Reading speed (words per minute)"
                  className="accent-primary-color w-28"
                />
              </label>
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="grid place-items-center h-9 w-9 rounded-md dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200 dark:text-primary-color text-tertiary-color"
              >
                {playing ? <HiPause /> : <HiPlay />}
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

          {/* mobile speed slider */}
          <div className="sm:hidden flex items-center gap-2 px-5 py-3 text-xs dark:text-zinc-400 text-zinc-500 border-b dark:border-zinc-800 border-zinc-200">
            <span className="tabular-nums whitespace-nowrap">{wpm} wpm</span>
            <input
              type="range"
              min={100}
              max={700}
              step={25}
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              aria-label="Reading speed (words per minute)"
              className="accent-primary-color w-full"
            />
          </div>

          <div className="h-[calc(100vh-73px)] sm:h-[calc(100vh-73px)] overflow-y-auto px-5 md:px-8 py-12 md:py-16">
            <article className="max-w-2xl mx-auto">
              {paraWords.map((ws, pi) => (
                <p
                  key={pi}
                  className="mb-7 text-lg md:text-2xl leading-loose"
                >
                  {ws.map(({ w, gi }) => (
                    <span
                      key={gi}
                      ref={(el) => {
                        wordRefs.current[gi] = el;
                      }}
                      onClick={() => setIndex(gi)}
                      className={`cursor-pointer rounded px-0.5 transition-colors duration-150 ${
                        gi === index
                          ? "bg-primary-color text-zinc-900"
                          : gi < index
                          ? "dark:text-zinc-300 text-zinc-700"
                          : "dark:text-zinc-600 text-zinc-400"
                      }`}
                    >
                      {w}{" "}
                    </span>
                  ))}
                </p>
              ))}
            </article>
          </div>
        </div>
      )}
    </>
  );
}
