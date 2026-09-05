"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScatterPlotPoint {
  x: number;
  y: number;
  label?: string;
  color?: string;
}

export interface ScatterPlotProps extends React.HTMLAttributes<HTMLDivElement> {
  points: ScatterPlotPoint[];
  className?: string;
}

export function ScatterPlot({
  points,
  className,
  ...props
}: ScatterPlotProps) {
  const xRange = Math.max(...points.map((p) => p.x), 1);
  const yRange = Math.max(...points.map((p) => p.y), 1);

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
    >
      <svg
        className="w-full h-full max-w-md mx-auto"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        {/* Axes - dashed */}
        <g className="motion-reduce:transition-none">
          {/* X axis */}
          <line
            x1="5"
            y1="95"
            x2="95"
            y2="95"
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="5,5"
            strokeOpacity={0.3}
          />
          {/* Y axis */}
          <line
            x1="5"
            y1="5"
            x2="5"
            y2="95"
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="5,5"
            strokeOpacity={0.3}
          />
        </g>

        {/* Data points with entrance scale-pop stagger */}
        {points.map((pt, ptIdx) => {
          const x = 5 + (pt.x / xRange) * 90;
          const y = 95 - (pt.y / yRange) * 90;

          const delay = ptIdx * 30;

          return (
            <g key={pt.label || ptIdx} className="cursor-pointer">
              <circle
                cx={x}
                cy={y}
                r={4}
                fill={pt.color || "currentColor"}
                stroke={pt.color || "currentColor"}
                strokeWidth={1}
                className={cn(
                  "transition-all duration-300",
                  "motion-reduce:transition-none",
                  `animate-[scale-in_0.15s_ease-out_both ${delay}ms fill mode]`,
                  "group-hover:scale-150",
                )}
              />

              {/* Label on hover */}
              {pt.label && (
                <text
                  x={x}
                  y={y - 8}
                  textAnchor="middle"
                  fontSize="9"
                  className={cn(
                    "motion-reduce:transition-none",
                    "hidden",
                    "group-hover:block",
                    "text-[9px] text-foreground uppercase tracking-wider",
                  )}
                >
                  {pt.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Hover connection line */}
        {points.map((pt, ptIdx) => {
          const x = 5 + (pt.x / xRange) * 90;
          const y = 95 - (pt.y / yRange) * 90;

          return (
            <line
              key={`conn-${ptIdx}`}
              x1={x}
              y1={y}
              x2={x}
              y2={5}
              stroke={pt.color || "currentColor"}
              strokeWidth={1}
              strokeDasharray="3,3"
              opacity={0.5}
              className="motion-reduce:transition-none"
            />
          );
        })}
      </svg>
    </div>
  );
}