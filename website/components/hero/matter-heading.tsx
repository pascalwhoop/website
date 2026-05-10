"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function UnderlineMark({
  children,
  segment,
  className,
}: {
  children: React.ReactNode;
  segment: string;
  className?: string;
}) {
  return (
    <span
      data-segment={segment}
      className={cn(
        "relative inline cursor-pointer underline decoration-2 underline-offset-[0.3em]",
        "decoration-neutral-500/55 dark:decoration-neutral-400/55",
        "transition-[text-decoration-thickness,underline-offset,opacity,decoration-color] duration-200 ease-out",
        "hover:decoration-foreground hover:underline-offset-[0.2em]",
        "hover:decoration-[3px] focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function MatterHeading({ className }: { className?: string }) {
  return (
    <h1
      className={cn(
        "text-pretty text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl",
        "leading-[1.12]",
        className,
      )}
    >
      I <UnderlineMark segment="love">love</UnderlineMark>{" "}
      <UnderlineMark segment="leading-teams">leading teams</UnderlineMark> that{" "}
      <UnderlineMark segment="build-systems">
        build extraordinary systems
      </UnderlineMark>{" "}
      for{" "}
      <UnderlineMark segment="problems">problems that matter</UnderlineMark> to{" "}
      <UnderlineMark segment="humans">humans that matter</UnderlineMark>{" "}
      <span
        className="whitespace-nowrap text-[0.65em] font-semibold text-foreground/55"
        data-scale-aside
      >
        [at scale]
      </span>
    </h1>
  );
}
