"use client";
import { motion, useInView, useAnimation, AnimationProps } from "framer-motion";
import { useRef, useEffect, RefObject } from "react";

interface SlideProps extends AnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const Slide = ({ children, className, delay }: SlideProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInview = useInView(ref as RefObject<Element>, {
    once: true,
    margin: "0px 0px -80px 0px",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInview) {
      controls.start("stop");
    }
  }, [controls, isInview]);

  return (
    <motion.div
      ref={ref}
      variants={{
        start: { opacity: 0, y: 34, filter: "blur(5px)" },
        stop: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{
        ease: [0.22, 1, 0.36, 1],
        duration: 0.6,
        delay: delay,
      }}
      animate={controls}
      initial="start"
    >
      <div className={className}>{children}</div>
    </motion.div>
  );
};
