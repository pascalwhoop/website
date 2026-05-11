"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const JITTER = {
  x: [0, -0.72, 0.62, -0.52, 0.42, -0.32, 0.22, 0],
  y: [0, 0.58, -0.68, 0.52, -0.4, 0.28, 0],
  rotate: [0, -0.32, 0.28, -0.22, 0.16, -0.1, 0],
};

const JITTER_BASE_DURATION = 0.34;
const JITTER_STEP_DURATION = 0.028;
const JITTER_STAGGER = 0.011;

export type AtomicPhraseProps = {
  text: string;
  active: boolean;
  toneClassName: string;
  glowClassName: string;
  className?: string;
};

export function AtomicPhrase({
  text,
  active,
  toneClassName,
  glowClassName,
  className,
}: AtomicPhraseProps) {
  const words = text.split(" ");

  let charIndex = 0;
  const renderChar = (char: string) => {
    const i = charIndex++;
    if (!active) {
      return (
        <span key={i} className="inline-block">
          {char}
        </span>
      );
    }
    return (
      <motion.span
        key={i}
        className="inline-block will-change-transform"
        animate={JITTER}
        transition={{
          duration: JITTER_BASE_DURATION + (i % 5) * JITTER_STEP_DURATION,
          repeat: Infinity,
          ease: "linear",
          delay: i * JITTER_STAGGER,
        }}
      >
        {char}
      </motion.span>
    );
  };

  return (
    <span
      className={cn(
        "align-baseline transition-[text-shadow,color] duration-300 ease-out",
        active ? toneClassName : "text-foreground",
        active && glowClassName,
        className,
      )}
      aria-hidden="true"
    >
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          {wi > 0 && " "}
          <span className="inline-block whitespace-nowrap align-baseline">
            {word.split("").map((char) => renderChar(char))}
          </span>
        </React.Fragment>
      ))}
    </span>
  );
}
