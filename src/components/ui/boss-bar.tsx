"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BossBarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  value: number;
  max?: number;
  phases?: number;
}

/** Boss bar: wide encounter header with phase ticks and draining health track. */
export function BossBar({ name, value, max = 1000, phases = 3, className, ...props }: BossBarProps) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100));
  return (
    <div className={cn("w-full select-none", className)} {...props}>
      <style>{`@keyframes bossSweep { from { opacity: 0.2; } to { opacity: 1; } }`}</style>
      <p className="text-center font-mono text-xs font-black uppercase tracking-[0.25em] text-foreground">
        {name}
      </p>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.max(0, Math.min(max, value))}
        aria-label={`${name} health`}
        className="relative mt-1.5 h-11 overflow-hidden rounded-md border-2 border-destructive/70 bg-card p-1"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[3px] bg-secondary">
          <div
            className="h-full bg-destructive transition-[width] duration-300 animate-[bossSweep_0.4s_ease-out] motion-reduce:animate-none motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
          {phases > 1 &&
            Array.from({ length: phases - 1 }).map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute inset-y-0 w-0.5 bg-card"
                style={{ left: `${((i + 1) / phases) * 100}%` }}
              />
            ))}
        </div>
      </div>
      <p className="mt-1 text-center font-mono text-[10px] tabular-nums text-muted-foreground" role="status">
        {Math.max(0, value)} / {max}
      </p>
    </div>
  );
}
