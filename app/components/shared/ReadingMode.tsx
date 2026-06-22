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
  const sentRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Split each paragraph into sentences; give every sentence a global index.
  const paraSentences = useMemo(() => {
    let gi = 0;
    return paragraphs.map((p) => {
      const matches = p.match(/[^.!?]+[.!?]*(\s+|$)/g) || [p];
      return matches
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => ({
          s,
          gi: gi++,
          words: s.split(/\s+/).filter(Boolean).length,
        }));
    });
  }, [paragraphs]);

  const flat = useMemo(() => paraSentences.flat(), [paraSentences]);
  const total = flat.length;
  const progress = total ? Math.round(((index + 1) / total) * 100) : 0;
  const totalWords = useMemo(
    () => flat.reduce((n, s) => n + s.words, 0),
    [flat]
  );
  const minutes = Math.max(1, Math.round(totalWords / 200));

  const openReader = () => {
    setIndex(0);
    setPlaying(false);
    setOpen(true);
    document.documentElement.requestFullscreen?.().catch(() => {});
  };
  const closeReader = () => {
    setOpen(false);
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Advance sentence by sentence, paced by its length and the chosen WPM.
  useEffect(() => {
    if (!open || !playing) return;
    if (index >= total - 1) {
      setPlaying(false);
      return;
    }
    const words = flat[index]?.words || 1;
    const ms = Math.max(450, (words / wpm) * 60000);
    const id = setTimeout(
      () => setIndex((i) => Math.min(i + 1, total - 1)),
      ms
    );
    return () => clearTimeout(id);
  }, [open, playing, index, wpm, total, flat]);

  useEffect(() => {
    if (open) {
      sentRefs.current[index]?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [index, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeReader();
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    const onFs = () => {
      if (!document.fullscreenElement) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={openReader}
        className="flex items-center gap-x-2 dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md px-4 py-2 text-sm font-semibold duration-300"
      >
        <BiBookOpen className="text-base" /> Read mode
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex flex-col dark:bg-zinc-950 bg-white">
          <div
            className="h-1 shrink-0 bg-primary-color duration-200"
            style={{ width: `${progress}%` }}
          />

          <div className="flex shrink-0 items-center justify-between gap-3 px-5 md:px-8 py-4 border-b dark:border-zinc-800 border-zinc-200">
            <div className="min-w-0">
              <p className="truncate font-incognito font-bold tracking-tight">
                {title}
              </p>
              <p className="text-xs dark:text-zinc-500 text-zinc-400">
                {totalWords} words · {minutes} min · {progress}%
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
                  aria-label="Reading speed"
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
                onClick={closeReader}
                aria-label="Close reading mode"
                className="grid place-items-center h-9 w-9 rounded-md dark:bg-primary-bg bg-zinc-100 border dark:border-zinc-800 border-zinc-200"
              >
                <HiX />
              </button>
            </div>
          </div>

          <div className="sm:hidden flex shrink-0 items-center gap-2 px-5 py-3 text-xs dark:text-zinc-400 text-zinc-500 border-b dark:border-zinc-800 border-zinc-200">
            <span className="tabular-nums whitespace-nowrap">{wpm} wpm</span>
            <input
              type="range"
              min={100}
              max={700}
              step={25}
              value={wpm}
              onChange={(e) => setWpm(Number(e.target.value))}
              aria-label="Reading speed"
              className="accent-primary-color w-full"
            />
          </div>

          <div className="flex-1 overflow-y-auto px-5 md:px-8 py-12 md:py-16">
            <article className="max-w-2xl mx-auto">
              {paraSentences.map((sentences, pi) => (
                <p key={pi} className="mb-7 text-lg md:text-2xl leading-loose">
                  {sentences.map(({ s, gi }) => (
                    <span
                      key={gi}
                      ref={(el) => {
                        sentRefs.current[gi] = el;
                      }}
                      onClick={() => setIndex(gi)}
                      className={`cursor-pointer rounded px-1 transition-colors duration-200 ${
                        gi === index
                          ? "bg-primary-color/20 dark:text-white text-zinc-900"
                          : gi < index
                          ? "dark:text-zinc-300 text-zinc-700"
                          : "dark:text-zinc-600 text-zinc-400"
                      }`}
                    >
                      {s}{" "}
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
