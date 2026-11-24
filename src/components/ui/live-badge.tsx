"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LiveBadgeProps {
  viewers?: number;
  variant?: "badge" | "full";
  className?: string;
}

export function LiveBadge({
  viewers,
  variant = "badge",
  className,
  ...props
}: LiveBadgeProps) {
  const motionReduceClass = "motion-reduce:animate-none motion-reduce:transition-none";

  return (
    <div
      className={cn(
        variant === "full"
          ? "flex items-center rounded-lg border border-border bg-card p-2.5 shadow-sm outline-1 outline-dashed outline-offset-[-6px]"
          : "inline-flex items-center rounded-full bg-primary/10 p-1.5",
        className
      )}
      {...props}
    >
      {/* Blinking LIVE dot */}
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full bg-primary animate-[pulse-soft_1s_ease-in-out_infinite]",
          motionReduceClass
        )}
        aria-hidden="true"
      />

      {/* MONO uppercase label */}
      <span className={cn(
        "ms-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground",
        motionReduceClass
      )}>
        LIVE
      </span>

      {/* Optional viewer count that ticks */}
      {viewers !== undefined && viewers > 0 && (
        <span className={cn(
          "ms-2 font-mono text-sm text-foreground",
          motionReduceClass
        )}>
          {viewers}+ viewers
        </span>
      )}
    </div>
  );
}