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
  const maxValue = Math.max(
    ...rows.flatMap((row) => row.cells.map((c) => c.value)),
    0,
  );
  const cellSize = 80 / columns;

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
      style={{ height: `${height}px` }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        {/* Grid cells with fade-in diagonal stagger */}
        {rows.map((row, rowIdx) =>
          row.cells.map((cell, cellIdx) => {
            const value = cell.value;
            const intensity = Math.min(value / (maxValue || 1), 1);
            const cellX = (cellIdx % columns) * (100 / columns);
            const cellY = rowIdx * 12 + 10;
            const bgOpacity = 0.1 + intensity * 0.8;
            const textColor = intensity > 0.5 ? "text-foreground" : "text-muted-foreground";

            const delay = rowIdx * 20 + cellIdx * 10;

            return (
              <React.Fragment key={`${row.label}-${cellIdx}`}>
              <rect
                x={cellX}
                y={cellY}
                width={100 / columns - 2}
                height={8}
                fill="currentColor"
                opacity={bgOpacity > 0.9 ? 0.9 : bgOpacity}
                className={cn(
                  "motion-reduce:transition-none",
                  `animate-[fade-in-up_0.3s_ease-out_both_${delay}ms]`,
                )}
              />
              <text
                x={cellX + (100 / columns) / 2}
                y={cellY + 14}
                textAnchor="middle"
                fontSize="10"
                className={cn(
                  textColor,
                  "motion-reduce:transition-none",
                  "select-none",
                )}
              >
                {value}
              </text>
              </React.Fragment>
            );
          }),
        )}

        {/* Column labels */}
        {rows.map((row, rowIdx) => (
          <text
            key={`row-label-${rowIdx}`}
            x={10}
            y={rowIdx * 12 + 20}
            fontSize="10"
            className={cn(
              "motion-reduce:transition-none",
              "text-[10px] uppercase text-muted-foreground capitalize",
            )}
          >
            {row.label}
          </text>
        ))}
      </svg>
    </div>
  );
}