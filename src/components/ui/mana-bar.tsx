"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ManaBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
}

/** Mana bar: smooth arcane energy meter with shimmer sweep and motion-reduce fallback. */
export function ManaBar({ value, max = 100, label = "MP", className, ...props }: ManaBarProps) {
  const pct = Math.max(0, Math.min(100, (value / Math.max(1, max)) * 100));
  return (
    <div className={cn("w-full min-w-44 select-none", className)} {...props}>
      <style>{`@keyframes mpShimmer { from { transform: translateX(-100%); } to { transform: translateX(220%); } }`}</style>
      <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold tabular-nums text-foreground" role="status" aria-label={`${label} ${value} of ${max}`}>
          {value}/{max}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={Math.max(0, Math.min(max, value))}
        aria-label={label}
        className="h-11 overflow-hidden rounded-md border-2 border-foreground bg-card p-1"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[3px] bg-secondary">
          <div
            className="h-full rounded-[3px] bg-info transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
          <span aria-hidden="true" className="absolute inset-y-0 w-1/3 bg-white/25 blur-[2px] animate-[mpShimmer_2.2s_ease-in-out_infinite] motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}
