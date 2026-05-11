"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { AtomicPhrase } from "@/components/hero/atomic-phrase";
import { StoryDialog } from "@/components/hero/story-dialog";
import {
  type MatterSegment,
  SEGMENTS,
} from "@/components/hero/stories";

export type { MatterSegment };

export type SweepOrigin = {
  x: number;
  y: number;
  radius: number;
};

type PotentialPhraseProps = {
  segment: MatterSegment;
  onOpen: (segment: MatterSegment, origin: SweepOrigin) => void;
  isOpen: boolean;
};

function useVerifiedHover(
  ref: React.RefObject<HTMLElement | null>,
  disabled: boolean,
) {
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    if (!hovered) return;
    const clear = () => setHovered(false);
    window.addEventListener("blur", clear);
    const onVis = () => {
      if (document.visibilityState === "hidden") clear();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [hovered]);

  React.useEffect(() => {
    if (!hovered || disabled) return;
    let raf = 0;
    const verify = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const root = ref.current;
        if (!root) return;
        if (document.activeElement === root) return;

        let hit = document.elementFromPoint(e.clientX, e.clientY);
        if (hit && hit.nodeType !== Node.ELEMENT_NODE) {
          hit = hit.parentElement;
        }

        if (!hit || !root.contains(hit)) {
          setHovered(false);
        }
      });
    };
    document.addEventListener("mousemove", verify, { capture: true });
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", verify, { capture: true });
    };
  }, [hovered, disabled, ref]);

  return {
    hovered,
    setHovered,
  };
}

function PotentialPhrase({ segment, onOpen, isOpen }: PotentialPhraseProps) {
  const cfg = SEGMENTS[segment];
  const reduced = Boolean(useReducedMotion());
  const ref = React.useRef<HTMLSpanElement>(null);
  const { hovered, setHovered } = useVerifiedHover(ref, isOpen);

  const open = (clientX?: number, clientY?: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    onOpen(segment, {
      x: clientX ?? r.left + r.width / 2,
      y: clientY ?? r.top + r.height / 2,
      radius: Math.max(10, r.height * 0.55),
    });
  };

  return (
    <motion.span
      ref={ref}
      layoutId={`matter-word-${segment}`}
      data-segment={segment}
      role="button"
      aria-label={`Open stories about ${cfg.text}`}
      aria-expanded={isOpen}
      tabIndex={0}
      onClick={(e) => open(e.clientX, e.clientY)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={cn(
        "inline cursor-pointer rounded-sm align-baseline outline-none",
        "focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isOpen && "invisible",
      )}
    >
      <AtomicPhrase
        text={cfg.text}
        active={hovered && !reduced && !isOpen}
        toneClassName={cfg.tone}
        glowClassName={cfg.glow}
      />
    </motion.span>
  );
}

export function MatterHeading({ className }: { className?: string }) {
  const [openSegment, setOpenSegment] = React.useState<MatterSegment | null>(
    null,
  );
  const [origin, setOrigin] = React.useState<SweepOrigin | null>(null);

  const handleOpen = (segment: MatterSegment, o: SweepOrigin) => {
    setOrigin(o);
    setOpenSegment(segment);
  };

  const handleClose = () => {
    setOpenSegment(null);
  };

  const seg = (s: MatterSegment) => (
    <PotentialPhrase
      segment={s}
      onOpen={handleOpen}
      isOpen={openSegment === s}
    />
  );

  return (
    <>
      <h1
        className={cn(
          "text-pretty text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl",
          "leading-[1.12]",
          className,
        )}
      >
        I {seg("love")} {seg("building-systems")} by{" "}
        {seg("leading-extraordinary-teams")} solving {seg("problems")} for{" "}
        {seg("humans")}{" "}
        <span
          className="whitespace-nowrap text-[0.65em] font-semibold text-foreground/55"
          data-scale-aside
        >
          [at scale]
        </span>
      </h1>

      <StoryDialog
        segment={openSegment}
        origin={origin}
        onClose={handleClose}
      />
    </>
  );
}
