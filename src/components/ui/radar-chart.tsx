"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RadarChartPoint {
  x: number;
  y: number;
  label: string;
}

export interface RadarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  points: RadarChartPoint[];
  className?: string;
}

export function RadarChart({
  points,
  className,
  ...props
}: RadarChartProps) {
  const n = points.length;
  const cx = 50;
  const cy = 50;
  const r = 40;

  // Calculate polygon points for each axis
  const axisPoints = points.map((pt, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    return { x, y, label: pt.label, angle };
  });

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
    >
      <svg
        className="w-64 h-64 mx-auto"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        {/* Web - dashed axes */}
        <g className="motion-reduce:transition-none">
          {axisPoints.map((pt, i) => {
            const nextPt = axisPoints[(i + 1) % n];
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={pt.x}
                y2={pt.y}
                stroke="currentColor"
                strokeWidth={1}
                strokeOpacity={0.3}
              />
            );
          })}
        </g>

        {/* Filled polygon - animates in from center */}
        <polygon
          points={axisPoints.map((pt) => `${pt.x},${pt.y}`).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            "motion-reduce:transition-none",
            "animate-[radarIn_0.8s_ease-out_forwards]",
          )}
        />

        {/* Data points on vertices */}
        {axisPoints.map((pt, i) => (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={3}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={1}
            className={cn(
              "transition-all duration-200",
              "motion-reduce:transition-none",
              "group-hover:scale-125",
            )}
          />
        ))}

        {/* Axis labels */}
        {axisPoints.map((pt, i) => (
          <text
            key={`label-${i}`}
            x={pt.x}
            y={pt.y}
            textAnchor="middle"
            dy={pt.x > 50 ? "0.3em" : "-0.3em"}
            fontSize="9"
            className={cn(
              "motion-reduce:transition-none",
              "uppercase text-[9px] text-muted-foreground capitalize",
            )}
          >
            {pt.label}
          </text>
        ))}
      </svg>
    </div>
  );
}