"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  ms?: number;
}

/** Ping indicator: latency badge with signal bars. */
export function PingIndicator({ ms = 42, className, ...props }: PingIndicatorProps) {
  const bars = ms < 60 ? 4 : ms < 120 ? 3 : ms < 200 ? 2 : 1;
  const tone = ms < 60 ? "text-emerald-700 dark:text-emerald-400" : ms < 120 ? "text-amber-600 dark:text-amber-400" : "text-destructive";
  return (
    <div role="status" aria-label={`Ping ${ms} milliseconds`} className={cn("inline-flex min-h-11 touch-none select-none items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5", className)} style={{ touchAction: "none" }} {...props}>
      <span className="flex h-5 items-end gap-0.5" aria-hidden="true">
        {[6, 10, 14, 18].map((h, i) => (
          <span key={i} className={cn("w-1 rounded-[1px]", i < bars ? "bg-emerald-500" : "bg-secondary")} style={{ height: `${h}px` }} />
        ))}
      </span>
      <span className={cn("font-mono text-xs font-black tabular-nums", tone)}>{ms} MS</span>
    </div>
  );
}
