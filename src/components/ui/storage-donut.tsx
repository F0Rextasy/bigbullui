"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StorageDonutProps extends React.HTMLAttributes<HTMLDivElement> {
  used?: number;
  total?: number;
  unit?: string;
}

/** Storage donut stub: SVG ring with center usage readout. */
export function StorageDonut({ used = 62, total = 100, unit = "GB", className, ...props }: StorageDonutProps) {
  const pct = Math.min(100, Math.round((used / Math.max(1, total)) * 100));
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("flex w-full max-w-xs items-center gap-3 rounded-lg border border-border bg-card p-4", className)} {...props}>
      <div className="relative size-24 shrink-0" role="img" aria-label={`Storage ${pct} percent used`}>
        <svg viewBox="0 0 84 84" className="size-full -rotate-90">
          <circle cx="42" cy="42" r={r} fill="none" strokeWidth="10" className="stroke-border" strokeDasharray="4 3" />
          <circle cx="42" cy="42" r={r} fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-accent transition-all duration-700 motion-reduce:transition-none" strokeDasharray={c} strokeDashoffset={c - (c * pct) / 100} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold tabular-nums text-foreground">{pct}%</span>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Storage</p>
        <p className="font-mono text-xs tabular-nums text-foreground">{used} / {total} {unit}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{total - used} {unit} free</p>
      </div>
    </div>
  );
}
