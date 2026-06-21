"use client";
import { useEffect, useRef, useState, RefObject } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

// Decodes `text` with a robotic scramble effect when it scrolls into view.
export default function ScrambleText({
  text,
  className,
  duration = 850,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as RefObject<Element>, {
    once: true,
    margin: "-10% 0px",
  });
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return;
    const totalFrames = Math.max(1, Math.round(duration / 30));
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / totalFrames) * text.length);
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            char === " " || i < revealed
              ? char
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          )
          .join("")
      );
      if (frame >= totalFrames) {
        setDisplay(text);
        clearInterval(id);
      }
    }, 30);
    return () => clearInterval(id);
  }, [inView, text, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
