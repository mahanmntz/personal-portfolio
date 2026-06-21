"use client";
import { useEffect, useState } from "react";

// Types out `text` character by character. Lower `speed` = faster.
export default function Typewriter({
  text,
  speed = 32,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (done) return;
    const id = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(id);
  }, [count, done, speed]);

  return (
    <span className={className} aria-label={text}>
      {text.slice(0, count)}
      <span
        aria-hidden="true"
        className={`inline-block w-[3px] h-[0.85em] translate-y-[0.05em] ml-1 bg-current ${
          done ? "animate-pulse" : ""
        }`}
      />
    </span>
  );
}
