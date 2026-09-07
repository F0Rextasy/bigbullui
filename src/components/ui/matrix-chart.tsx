"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MatrixChartProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: string[];
  columns: string[];
  values: number[][];
  height?: number;
}

export function MatrixChart({ rows, columns, values, height = 260, className, ...props }: MatrixChartProps) {
  const flat = values.flat();
  const max = Math.max(...flat, 1);
  const CELL = 30;
  const GAP = 5;
  const LABEL_W = 64;
  const HEAD_H = 22;
  const PAD = 6;
  const gridW = LABEL_W + columns.length * (CELL + GAP) + PAD;
  const gridH = HEAD_H + rows.length * (CELL + GAP) + PAD;

  if (rows.length === 0 || columns.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }

  return (
    <div className={cn("w-full overflow-x-auto", className)} style={{ height: `${height}px` }} {...props}>
      <svg height={gridH} width={gridW} viewBox={`0 0 ${gridW} ${gridH}`} role="img" aria-label="Matrix heatmap" className="mx-auto h-full">
        {columns.map((col, ci) => (
          <text key={col} x={LABEL_W + ci * (CELL + GAP) + CELL / 2} y={HEAD_H - 8} fontSize="9" textAnchor="middle" className="fill-muted-foreground font-mono uppercase">
            {col}
          </text>
        ))}
        {rows.map((row, ri) => (
          <g key={row}>
            <text x={LABEL_W - 8} y={HEAD_H + ri * (CELL + GAP) + CELL / 2 + 3} fontSize="9" textAnchor="end" className="fill-muted-foreground font-mono uppercase">
              {row}
            </text>
            {columns.map((col, ci) => {
              const v = values[ri]?.[ci] ?? 0;
              const intensity = Math.min(v / max, 1);
              return (
                <rect
                  key={col}
                  x={LABEL_W + ci * (CELL + GAP)}
                  y={HEAD_H + ri * (CELL + GAP)}
                  width={CELL}
                  height={CELL}
                  rx={5}
                  fill="currentColor"
                  opacity={0.12 + intensity * 0.78}
                  className="text-accent"
                >
                  <title>{`${row} × ${col}: ${v}`}</title>
                </rect>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
