"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ComposedChartProps extends React.HTMLAttributes<HTMLDivElement> {
  bars?: number[];
  line?: number[];
}

/** Composed chart stub: bars plus polyline overlay in one SVG. */
export function ComposedChart({ bars = [30, 55, 42, 70, 58, 84, 66], line = [22, 40, 50, 48, 62, 70, 78], className, ...props }: ComposedChartProps) {
  const w = 280;
  const h = 120;
  const max = Math.max(...bars, ...line, 1);
  const bw = w / bars.length;
  const px = (i: number) => (i / Math.max(1, line.length - 1)) * w;
  const py = (v: number) => h - (v / max) * (h - 8) - 2;
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Composed chart</span>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full" role="img" aria-label="Bar and line chart">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={w} y1={h * f} y2={h * f} strokeWidth="1" strokeDasharray="3 3" className="stroke-border" />
        ))}
        {bars.map((b, i) => (
          <rect key={i} x={i * bw + 3} y={py(b)} width={bw - 6} height={h - py(b)} rx="1.5" className="fill-secondary stroke-border" />
        ))}
        <polyline points={line.map((v, i) => `${px(i)},${py(v)}`).join(" ")} fill="none" strokeWidth="2" className="stroke-accent" />
        {line.map((v, i) => (
          <circle key={i} cx={px(i)} cy={py(v)} r="2.5" className="fill-accent" />
        ))}
      </svg>
      <div className="mt-1 flex gap-3 font-mono text-[10px] uppercase text-muted-foreground">
        <span><span className="mr-1 inline-block size-2 bg-secondary" aria-hidden="true" />Bars</span>
        <span><span className="mr-1 inline-block size-2 rounded-full bg-accent" aria-hidden="true" />Line</span>
      </div>
    </div>
  );
}
