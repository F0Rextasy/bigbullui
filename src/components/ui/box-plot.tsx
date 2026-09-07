"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BoxPlotItem {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

export interface BoxPlotProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BoxPlotItem[];
  height?: number;
}

export function BoxPlot({ items, height = 260, className, ...props }: BoxPlotProps) {
  if (items.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }
  const lo = Math.min(...items.map((d) => d.min));
  const hi = Math.max(...items.map((d) => d.max));
  const span = hi - lo || 1;
  const y = (v: number) => 92 - ((v - lo) / span) * 80;
  const n = items.length;
  const slot = 90 / n;
  const bw = Math.min(slot * 0.5, 14);

  return (
    <div className={cn("w-full", className)} style={{ height: `${height}px` }} {...props}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="8" y1={92 - f * 80} x2="98" y2={92 - f * 80} stroke="currentColor" strokeWidth={0.4} strokeOpacity={0.15} strokeDasharray="2,2" />
        ))}
        {items.map((d, i) => {
          const cx = 8 + slot * (i + 0.5);
          return (
            <g key={d.label} className="text-accent">
              <line x1={cx} y1={y(d.max)} x2={cx} y2={y(d.min)} stroke="currentColor" strokeWidth={1} opacity={0.7} />
              <line x1={cx - bw / 4} y1={y(d.max)} x2={cx + bw / 4} y2={y(d.max)} stroke="currentColor" strokeWidth={1.5} />
              <line x1={cx - bw / 4} y1={y(d.min)} x2={cx + bw / 4} y2={y(d.min)} stroke="currentColor" strokeWidth={1.5} />
              <rect x={cx - bw / 2} y={y(d.q3)} width={bw} height={Math.max(y(d.q1) - y(d.q3), 1)} fill="currentColor" opacity={0.35} stroke="currentColor" strokeWidth={1}>
                <title>{`${d.label}: min ${d.min}, Q1 ${d.q1}, med ${d.median}, Q3 ${d.q3}, max ${d.max}`}</title>
              </rect>
              <line x1={cx - bw / 2} y1={y(d.median)} x2={cx + bw / 2} y2={y(d.median)} stroke="currentColor" strokeWidth={2} />
              <text x={cx} y={97} fontSize="4.5" textAnchor="middle" className="fill-muted-foreground font-mono uppercase">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
