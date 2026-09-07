"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ViolinChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[][];
  labels?: string[];
  height?: number;
}

function kde(values: number[], points: number, lo: number, hi: number): number[] {
  const span = hi - lo || 1;
  const bw = span / 8;
  const out: number[] = [];
  for (let i = 0; i < points; i++) {
    const x = lo + (span * i) / (points - 1);
    let sum = 0;
    for (const v of values) {
      const z = (x - v) / bw;
      sum += Math.exp(-0.5 * z * z);
    }
    out.push(sum / (values.length * bw));
  }
  const peak = Math.max(...out, 1e-9);
  return out.map((v) => v / peak);
}

export function ViolinChart({ data, labels, height = 260, className, ...props }: ViolinChartProps) {
  if (data.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }
  const all = data.flat();
  const lo = Math.min(...all);
  const hi = Math.max(...all);
  const N = 24;
  const n = data.length;
  const slot = 90 / n;
  const maxHalf = slot * 0.42;

  return (
    <div className={cn("w-full", className)} style={{ height: `${height}px` }} {...props}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {data.map((values, i) => {
          const density = kde(values, N, lo, hi);
          const cx = 8 + slot * (i + 0.5);
          const y = (k: number) => 92 - (k / (N - 1)) * 80;
          const right = density.map((d, k) => `${cx + d * maxHalf},${y(k)}`).join(" ");
          const left = density.map((d, k) => `${cx - d * maxHalf},${y(N - 1 - k)}`).join(" ");
          const median = values.slice().sort((a, b) => a - b)[Math.floor(values.length / 2)] ?? lo;
          const my = 92 - ((median - lo) / (hi - lo || 1)) * 80;
          return (
            <g key={i} className="text-accent">
              <polygon points={`${cx},92 ${right} ${cx},12 ${left}`} fill="currentColor" opacity={0.25} stroke="currentColor" strokeWidth={0.8} />
              <line x1={cx - maxHalf * 0.5} y1={my} x2={cx + maxHalf * 0.5} y2={my} stroke="currentColor" strokeWidth={1.5} />
              <text x={cx} y={97} fontSize="4.5" textAnchor="middle" className="fill-muted-foreground font-mono uppercase">
                {labels?.[i] ?? `G${i + 1}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
