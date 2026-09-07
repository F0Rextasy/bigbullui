"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DensityPlotProps extends React.HTMLAttributes<HTMLDivElement> {
  values: number[];
  points?: number;
  height?: number;
  label?: string;
}

export function DensityPlot({ values, points = 48, height = 180, label, className, ...props }: DensityPlotProps) {
  if (values.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  const bw = span / 7;
  const curve: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const x = lo + (span * i) / (points - 1);
    let sum = 0;
    for (const v of values) {
      const z = (x - v) / bw;
      sum += Math.exp(-0.5 * z * z);
    }
    curve.push([x, sum / (values.length * bw)]);
  }
  const peak = Math.max(...curve.map((c) => c[1]), 1e-9);
  const W = 100;
  const H = 80;
  const px = (x: number) => 5 + ((x - lo) / span) * 90;
  const py = (d: number) => 88 - (d / peak) * 76;
  const line = curve.map(([x, d]) => `${px(x)},${py(d)}`).join(" ");

  return (
    <div className={cn("w-full", className)} style={{ height: `${height}px` }} {...props}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label ?? `Density of ${values.length} values`}>
        <polygon points={`5,92 ${line} 95,92`} fill="currentColor" opacity={0.18} className="text-accent" />
        <polyline points={line} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-accent" />
        {values.map((v, i) => (
          <line key={i} x1={px(v)} y1={92} x2={px(v)} y2={89} stroke="currentColor" strokeWidth={0.8} opacity={0.5} className="text-muted-foreground" />
        ))}
        {label ? (
          <text x={50} y={98} fontSize="5" textAnchor="middle" className="fill-muted-foreground font-mono uppercase">
            {label}
          </text>
        ) : null}
      </svg>
    </div>
  );
}
