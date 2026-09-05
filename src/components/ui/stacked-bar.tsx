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
          <div
            key={row.label}
            className="relative flex items-end gap-2 p-2 rounded-md border border-border/60 bg-card"
          >
            {/* Segments growing from bottom with staggered delay */}
            {row.segments.map((seg, segIdx) => {
              const isAccent = seg.color?.includes("accent") || segIdx === 0;
              const heightPct = segmentHeights[segIdx];
              const colorClass = seg.color
                ? `border-${seg.color}-200 bg-${seg.color}-100 text-${seg.color}-800`
                : isAccent
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-muted text-muted-foreground";

              return (
                <div
                  key={seg.value}
                  className={cn(
                    "relative w-24 rounded-t-sm transition-all duration-500",
                    `motion-reduce:transition-none`,
                    `delay-${rowIdx * 50}`,
                    isAccent
                      ? "animate-[stamp_0.4s_ease-out_both]"
                      : "",
                    heightPct > 0
                      ? `h-[${heightPct}%]`
                      : "h-[0]",
                  )}
                >
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] uppercase text-xs text-muted-foreground"
                  >
                    {seg.value}
                  </span>
                </div>
              );
            })}

            {/* Row label on the left */}
            <span
              className="absolute left-2 flex-1 text-[10px] uppercase text-muted-foreground truncate"
              title={row.label}
            >
              {row.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export const StackedBarChart = StackedBar;
