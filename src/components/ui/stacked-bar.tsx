"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StackedBarSegment {
  value: number;
  color?: string;
}

export interface StackedBarRow {
  label: string;
  segments: StackedBarSegment[];
}

export interface StackedBarProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: StackedBarRow[];
  height?: number;
}

export function StackedBar({
  rows,
  height = 400,
  className,
  ...props
}: StackedBarProps) {
  return (
    <div
      className={cn("w-full space-y-4", "motion-reduce:animate-none", className)}
      style={{ height: `${height}px` }}
      {...props}
    >
      {rows.map((row, rowIdx) => {
        const totalValue = row.segments.reduce(
          (sum, seg) => sum + seg.value,
          0,
        );
        const segmentHeights = row.segments.map((seg) =>
          totalValue > 0 ? (seg.value / totalValue) * 100 : 0,
        );

        return (
          <div key={row.label}>
            <div className="relative flex h-44 flex-col items-stretch justify-end gap-1 rounded-md border border-border/60 bg-card p-2">
              {row.segments.map((seg, segIdx) => {
                const isAccent = seg.color?.includes("accent") || segIdx === 0;
                const heightPct = segmentHeights[segIdx];
                const colorClass = seg.color
                  ? "border-accent bg-accent text-accent-foreground"
                  : isAccent
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-muted text-muted-foreground";

                return (
                  <div
                    key={`${row.label}-${segIdx}`}
                    className={cn(
                      "relative flex items-center justify-center rounded-sm border transition-all duration-500",
                      "motion-reduce:transition-none",
                      colorClass,
                    )}
                    style={{
                      height: `${heightPct}%`,
                      transitionDelay: `${rowIdx * 50}ms`,
                    }}
                    title={`${seg.value}`}
                  >
                    <span className="font-mono text-[10px] font-bold">
                      {seg.value}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-1 text-center font-mono text-[10px] uppercase text-muted-foreground">
              {row.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export const StackedBarChart = StackedBar;
