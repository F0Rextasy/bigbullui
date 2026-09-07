"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface XpBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  level?: number;
}

/** XP bar: slim experience track with level badge and animated fill. */
export function XpBar({ value, max = 100, level = 1, className, ...props }: XpBarProps) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100));
  return (
    <div className={cn("flex min-h-11 w-full min-w-44 select-none items-center gap-2", className)} {...props}>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-md border-2 border-accent bg-accent/10 font-mono text-xs font-black text-accent" aria-label={`Level ${level}`}>
        {level}
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em]">
          <span className="text-muted-foreground">XP</span>
          <span className="font-bold tabular-nums text-foreground" role="status" aria-label={`Experience ${value} of ${max}`}>
            {value}/{max}
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={Math.max(0, Math.min(max, value))}
          aria-label="Experience"
          className="h-3 overflow-hidden rounded-full border border-border bg-secondary"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
