"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface QqPlotProps extends React.HTMLAttributes<HTMLDivElement> {
  sampleA: number[];
  sampleB: number[];
  height?: number;
  labelA?: string;
  labelB?: string;
}

export function QqPlot({
  sampleA,
  sampleB,
  height = 240,
  labelA = "A",
  labelB = "B",
  className,
  ...props
}: QqPlotProps) {
  const a = sampleA.slice().sort((x, y) => x - y);
  const b = sampleB.slice().sort((x, y) => x - y);
  const n = Math.min(a.length, b.length);
  if (n === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }
  const lo = Math.min(a[0], b[0]);
  const hi = Math.max(a[n - 1], b[n - 1]);
  const span = hi - lo || 1;
  const px = (v: number) => 10 + ((v - lo) / span) * 80;
  const py = (v: number) => 88 - ((v - lo) / span) * 76;

  return (
    <div className={cn("w-full", className)} style={{ height: `${height}px` }} {...props}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" role="img" aria-label={`Q-Q plot ${labelA} versus ${labelB}`}>
        <line x1={10} y1={88} x2={90} y2={12} stroke="currentColor" strokeWidth={0.8} strokeDasharray="3,3" opacity={0.4} className="text-muted-foreground" />
        {Array.from({ length: n }).map((_, i) => (
          <circle key={i} cx={px(a[i])} cy={py(b[i])} r={1.8} fill="currentColor" className="text-accent" opacity={0.85}>
            <title>{`${labelA} ${a[i]} · ${labelB} ${b[i]}`}</title>
          </circle>
        ))}
        <text x={50} y={97} fontSize="5" textAnchor="middle" className="fill-muted-foreground font-mono uppercase">
          {labelA} → {labelB}
        </text>
      </svg>
    </div>
  );
}
