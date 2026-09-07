"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RadialBarProps extends React.HTMLAttributes<HTMLDivElement> {
  series?: { label: string; value: number }[];
}

/** Radial bar stub: concentric SVG rings per series value. */
export function RadialBar({ series = [{ label: "VIP", value: 82 }, { label: "GA", value: 54 }, { label: "Balcony", value: 31 }], className, ...props }: RadialBarProps) {
  const size = 120;
  const center = size / 2;
  const tones = ["stroke-accent", "stroke-primary", "stroke-muted-foreground"];
  return (
    <div className={cn("w-full max-w-xs rounded-lg border border-border bg-card p-4", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Radial bars</span>
      <div className="mt-1 flex items-center gap-3">
        <svg viewBox={`0 0 ${size} ${size}`} className="size-28 shrink-0 -rotate-90" role="img" aria-label="Radial bar chart">
          {series.map((s, i) => {
            const r = center - 8 - i * 14;
            const c = 2 * Math.PI * r;
            const v = Math.min(100, Math.max(0, s.value));
            return (
              <g key={s.label}>
                <circle cx={center} cy={center} r={r} fill="none" strokeWidth="8" className="stroke-border/50" />
                <circle cx={center} cy={center} r={r} fill="none" strokeWidth="8" strokeLinecap="round" className={cn(tones[i % tones.length], "transition-all duration-700 motion-reduce:transition-none")} strokeDasharray={c} strokeDashoffset={c - (c * v) / 100} />
              </g>
            );
          })}
        </svg>
        <ul className="space-y-1">
          {series.map((s) => (
            <li key={s.label} className="font-mono text-[11px] text-foreground">{s.label} <span className="tabular-nums text-muted-foreground">{s.value}%</span></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
