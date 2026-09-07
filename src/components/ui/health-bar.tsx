"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HealthBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  segments?: number;
}

/** Health bar: segmented vitality meter with low-health pulse and motion-reduce fallback. */
export function HealthBar({ value, max = 100, label = "HP", segments = 10, className, ...props }: HealthBarProps) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100));
  const filled = Math.round((pct / 100) * segments);
  const low = pct <= 25;
  return (
    <div className={cn("w-full min-w-44 select-none", className)} {...props}>
      <style>{`@keyframes hpPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }`}</style>
      <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em]">
        <span className="text-muted-foreground">{label}</span>
        <span
          className={cn("font-bold tabular-nums", low ? "text-destructive animate-[hpPulse_1s_ease-in-out_infinite] motion-reduce:animate-none" : "text-foreground")}
          role="status"
          aria-label={`${label} ${value} of ${max}`}
        >
          {value}/{max}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.max(0, Math.min(max, value))}
        aria-label={label}
        className="flex h-11 items-center gap-0.5 rounded-md border-2 border-foreground bg-card p-1"
      >
        {Array.from({ length: segments }).map((_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={cn(
              "h-full flex-1 rounded-[2px] transition-colors motion-reduce:transition-none",
              i < filled ? (low ? "bg-destructive" : "bg-emerald-500") : "bg-secondary"
            )}
          />
        ))}
      </div>
    </div>
  );
}
