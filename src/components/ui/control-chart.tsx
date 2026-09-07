"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ControlChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[];
  sigma?: number;
  height?: number;
  label?: string;
}

export function ControlChart({ data, sigma = 3, height = 240, label, className, ...props }: ControlChartProps) {
  if (data.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }
  const mean = data.reduce((a, v) => a + v, 0) / data.length;
  const sd = Math.sqrt(data.reduce((a, v) => a + (v - mean) * (v - mean), 0) / data.length) || 1;
  const ucl = mean + sigma * sd;
  const lcl = mean - sigma * sd;
  const lo = Math.min(lcl, ...data);
  const hi = Math.max(ucl, ...data);
  const span = hi - lo || 1;
  const n = data.length;
  const x = (i: number) => 10 + (i / Math.max(n - 1, 1)) * 80;
  const y = (v: number) => 88 - ((v - lo) / span) * 76;
  const line = data.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const violations = data.filter((v) => v > ucl || v < lcl).length;

  return (
    <div className={cn("w-full", className)} style={{ height: `${height}px` }} {...props}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label ?? `Control chart, ${violations} violations`}>
        <line x1={10} y1={y(ucl)} x2={90} y2={y(ucl)} stroke="currentColor" strokeWidth={0.8} strokeDasharray="4,2" opacity={0.6} className="text-destructive" />
        <line x1={10} y1={y(mean)} x2={90} y2={y(mean)} stroke="currentColor" strokeWidth={0.8} opacity={0.5} className="text-foreground" />
        <line x1={10} y1={y(lcl)} x2={90} y2={y(lcl)} stroke="currentColor" strokeWidth={0.8} strokeDasharray="4,2" opacity={0.6} className="text-destructive" />
        <polyline points={line} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-accent" />
        {data.map((v, i) => {
          const bad = v > ucl || v < lcl;
          return (
            <circle key={i} cx={x(i)} cy={y(v)} r={bad ? 2.4 : 1.6} fill="currentColor" className={bad ? "text-destructive" : "text-accent"}>
              <title>{v}</title>
            </circle>
          );
        })}
        <text x={90} y={y(ucl) - 2} fontSize="4.5" textAnchor="end" className="fill-muted-foreground font-mono">
          UCL {ucl.toFixed(1)}
        </text>
        <text x={90} y={y(lcl) + 6} fontSize="4.5" textAnchor="end" className="fill-muted-foreground font-mono">
          LCL {lcl.toFixed(1)}
        </text>
      </svg>
    </div>
  );
}
