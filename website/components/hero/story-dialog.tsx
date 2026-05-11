"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  type MatterSegment,
  SEGMENTS,
} from "./stories";
import type { SweepOrigin } from "./matter-heading";

export type StoryDialogProps = {
  segment: MatterSegment | null;
  origin: SweepOrigin | null;
  onClose: () => void;
};

export function StoryDialog({ segment, origin, onClose }: StoryDialogProps) {
  const reduced = Boolean(useReducedMotion());
  const open = segment !== null && origin !== null;

  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && segment && origin && (
        <SweepDialog
          key={segment}
          segment={segment}
          origin={origin}
          onClose={onClose}
          reduced={reduced}
        />
      )}
    </AnimatePresence>
  );
}

function SweepDialog({
  segment,
  origin,
  onClose,
  reduced,
}: {
  segment: MatterSegment;
  origin: SweepOrigin;
  onClose: () => void;
  reduced: boolean;
}) {
  const cfg = SEGMENTS[segment];
  const cards = cfg.stories;

  const [vw, vh] = useViewport();
  const dx = Math.max(origin.x, vw - origin.x);
  const dy = Math.max(origin.y, vh - origin.y);
  const targetR = Math.hypot(dx, dy) + 64;

  const sweepDur = reduced ? 0.01 : 0.55;
  const contentDelay = reduced ? 0 : 0.4;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={cfg.label}
      className="fixed inset-0 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {/* sweep: inverted-theme disk, hand-off from peephole */}
      <motion.div
        aria-hidden
        data-inverted-theme
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--background)" }}
        initial={{ clipPath: `circle(${origin.radius}px at ${origin.x}px ${origin.y}px)` }}
        animate={{ clipPath: `circle(${targetR}px at ${origin.x}px ${origin.y}px)` }}
        exit={{ clipPath: `circle(${origin.radius}px at ${origin.x}px ${origin.y}px)` }}
        transition={{ duration: sweepDur, ease: [0.2, 0.7, 0.2, 1] }}
      />

      {/* once the sweep covers the screen, fade it to normal page bg */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--background)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: reduced ? 0 : 0.45,
          duration: reduced ? 0.01 : 0.25,
          ease: "easeOut",
        }}
      />

      {/* backdrop click target */}
      <button
        type="button"
        aria-label="Close dialog"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      {/* content */}
      <motion.div
        className="pointer-events-none relative z-10 flex h-full w-full flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: contentDelay,
          duration: reduced ? 0.01 : 0.3,
        }}
      >
        <header className="pointer-events-auto flex items-center justify-between px-6 pt-6">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="rounded-md border border-foreground/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/70 transition-colors hover:border-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          >
            esc
          </button>
          <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
            stories
          </span>
        </header>

        <div className="pointer-events-auto flex flex-1 flex-col items-center gap-10 overflow-y-auto px-6 pb-16 pt-10 sm:gap-14 sm:pt-16">
          <motion.h2
            layoutId={`matter-word-${segment}`}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={cn(
              "text-pretty text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl",
              cfg.tone,
              cfg.glow,
            )}
          >
            {cfg.label}
          </motion.h2>

          <div className="grid w-full max-w-6xl auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, i) => (
              <motion.article
                key={c.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: contentDelay + 0.08 + i * 0.06,
                  duration: 0.36,
                  ease: [0.2, 0.7, 0.2, 1],
                }}
                className={cn(
                  "rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5 sm:p-6",
                  c.span === "lg" && "lg:col-span-2 lg:row-span-2",
                  c.span === "md" && "lg:row-span-2",
                )}
              >
                {c.eyebrow && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/45">
                    {c.eyebrow}
                  </p>
                )}
                <h3 className="mt-1 text-base font-semibold text-foreground sm:text-lg">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {c.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function useViewport() {
  const [size, setSize] = React.useState<[number, number]>(() => {
    if (typeof window === "undefined") return [1024, 768];
    return [window.innerWidth, window.innerHeight];
  });
  React.useEffect(() => {
    const onResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}
