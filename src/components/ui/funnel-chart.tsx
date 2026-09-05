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
  const maxValue = Math.max(...stages.map((s) => s.value), 1);

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
        {/* Stages - trapezoids drawing in sequence */}
        {stages.map((stage, stageIdx) => {
          const heightPct = (stage.value / maxValue) * 80;
          const topWidth = 100 - (stageIdx / (stages.length - 1)) * 20;
          const bottomWidth = 100 - ((stageIdx + 1) / (stages.length - 1)) * 20;

          const delay = stageIdx * 100;

          return (
            <polygon
              key={stage.label}
              points={
                `25,${100 - heightPct} ` +
                `${50 - topWidth / 2},${100 - heightPct} ` +
                `${50 + topWidth / 2},${100 - heightPct} ` +
                `${50 + bottomWidth / 2},${100} ` +
                `${50 - bottomWidth / 2},${100} `
              }
              fill={stage.color || "currentColor"}
              opacity={0.3}
              className={cn(
                "motion-reduce:transition-none",
                `animate-[funnelIn_0.4s_ease-out_both ${delay}ms fill mode]`,
              )}
            />
          );
        })}

        {/* Conversion % readout */}
        <g className="text-center pt-2">
          {stages.map((stage, stageIdx) => {
            const conversion = stage.conversion !== undefined
              ? `${stage.conversion}%`
              : "-";
            const delay = stageIdx * 100;
            return (
              <text
                key={`conv-${stageIdx}`}
                x={50}
                y={80 + stageIdx * 15}
                fontSize="10"
                textAnchor="middle"
                className={cn(
                  "motion-reduce:transition-none",
                  `animate-[fade-in_0.2s_ease-out_both ${delay}ms fill mode]`,
                )}
              >
                {conversion}
              </text>
            );
          })}
        </g>

        {/* Stage labels */}
        {stages.map((stage, stageIdx) => {
          const delay = stageIdx * 100;
          return (
            <text
              key={`label-${stageIdx}`}
              x={50}
              y={95 + stageIdx * 15}
              fontSize="9"
              textAnchor="middle"
              className={cn(
                "motion-reduce:transition-none",
                `animate-[fade-in_0.2s_ease-out_both ${delay}ms fill mode]`,
              )}
            >
              {stage.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}