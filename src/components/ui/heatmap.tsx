"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HeatmapRow {
  label: string;
  cells: { value: number }[];
}

export interface HeatmapProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: HeatmapRow[];
  columns?: number;
  height?: number;
}

export function Heatmap({
  rows,
  columns = 7,
  height = 300,
  className,
  ...props
}: HeatmapProps) {
  if (rows.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }

  const maxValue = Math.max(
    ...rows.flatMap((row) => row.cells.map((c) => c.value)),
    0,
  );
  const CELL = 22;
  const GAP = 4;
  const STEP = CELL + GAP;
  const LABEL_W = 44;
  const PAD = 6;
  const cols = Math.max(...rows.map((r) => Math.min(r.cells.length, columns)), 1);
  const gridW = LABEL_W + cols * STEP + PAD;
  const gridH = rows.length * STEP + PAD;

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
      style={{ height: `${height}px` }}
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${gridW} ${gridH}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {rows.map((row, rowIdx) =>
          row.cells.slice(0, columns).map((cell, cellIdx) => {
            const value = cell.value;
            const intensity = Math.min(value / (maxValue || 1), 1);
            const bgOpacity = 0.1 + intensity * 0.8;
            const delay = rowIdx * 20 + cellIdx * 10;

            return (
              <React.Fragment key={`${row.label}-${cellIdx}`}>
              <rect
                x={PAD + LABEL_W + cellIdx * STEP}
                y={PAD + rowIdx * STEP}
                width={CELL}
                height={CELL}
                rx={4}
                fill="currentColor"
                opacity={bgOpacity > 0.9 ? 0.9 : bgOpacity}
                className={cn(
                  "motion-reduce:transition-none",
                  `animate-[fade-in-up_0.3s_ease-out_both_${delay}ms]`,
                )}
              >
                <title>{`${row.label}: ${value}`}</title>
              </rect>
              </React.Fragment>
            );
          }),
        )}

        {rows.map((row, rowIdx) => (
          <text
            key={`row-label-${rowIdx}`}
            x={PAD}
            y={PAD + rowIdx * STEP + 15}
            fontSize="9"
            className={cn(
              "motion-reduce:transition-none",
              "fill-muted-foreground font-mono uppercase",
            )}
          >
            {row.label}
          </text>
        ))}
      </svg>
    </div>
  );
}