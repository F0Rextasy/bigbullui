"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SparkLineGroupItem {
  label: string;
  value: string;
  data: number[];
}

export interface SparkLineGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SparkLineGroupItem[];
  columns?: number;
}

export function SparkLineGroup({ items, columns = 3, className, ...props }: SparkLineGroupProps) {
  return (
    <div
      className={cn("grid w-full gap-3", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      {...props}
    >
      {items.map((item) => {
        const max = Math.max(...item.data, 1);
        const min = Math.min(...item.data, 0);
        const span = max - min || 1;
        const pts = item.data
          .map((v, i) => `${(i / Math.max(item.data.length - 1, 1)) * 100},${34 - ((v - min) / span) * 30}`)
          .join(" ");
        return (
          <div key={item.label} className="rounded-lg border border-border bg-card p-3">
            <p className="truncate font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {item.label}
            </p>
            <p className="mt-0.5 font-mono text-lg font-bold tabular-nums">{item.value}</p>
            <svg viewBox="0 0 100 38" className="mt-1 h-9 w-full text-accent" preserveAspectRatio="none" aria-hidden>
              <polyline points={pts} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
