"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FunnelChartStage {
  label: string;
  value: number;
  conversion?: number;
  color?: string;
}

export interface FunnelChartProps extends React.HTMLAttributes<HTMLDivElement> {
  stages: FunnelChartStage[];
  height?: number;
}

export function FunnelChart({
  stages,
  height = 300,
  className,
  ...props
}: FunnelChartProps) {
  if (stages.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }

  const maxValue = Math.max(...stages.map((s) => s.value), 1);
  const n = stages.length;
  const topY = 6;
  const bandH = 88 / n;
  const fullW = 64;
  const cx = 54;

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
      style={{ height: `${height}px` }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 120 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {stages.map((stage, stageIdx) => {
          const prevValue = stageIdx === 0 ? maxValue : stages[stageIdx - 1].value;
          const topW = Math.max((Math.max(prevValue, 0) / maxValue) * fullW, 2);
          const bottomW = Math.max((Math.max(stage.value, 0) / maxValue) * fullW, 2);
          const y0 = topY + stageIdx * bandH;
          const y1 = y0 + bandH - 2;
          const midY = (y0 + y1) / 2;
          const conversion = stage.conversion !== undefined ? `${stage.conversion}%` : "-";

          return (
            <g key={stage.label}>
              <polygon
                points={
                  `${cx - topW / 2},${y0} ` +
                  `${cx + topW / 2},${y0} ` +
                  `${cx + bottomW / 2},${y1} ` +
                  `${cx - bottomW / 2},${y1}`
                }
                fill={stage.color || "currentColor"}
                opacity={0.28 + (0.5 * (n - stageIdx)) / n}
              />
              <text
                x={cx - fullW / 2 - 3}
                y={midY + 3}
                fontSize="7"
                textAnchor="end"
                className="motion-reduce:transition-none fill-muted-foreground font-mono uppercase"
              >
                {stage.label}
              </text>
              <text
                x={cx + fullW / 2 + 3}
                y={midY + 3}
                fontSize="7"
                textAnchor="start"
                className="motion-reduce:transition-none fill-foreground font-mono"
              >
                {conversion}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}