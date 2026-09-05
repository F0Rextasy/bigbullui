"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AreaChartDataItem {
  id: string;
  label: string;
  color?: string;
  data: number[];
}

export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  series: AreaChartDataItem[];
  labels?: string[];
  height?: number;
}

export function AreaChart({
  series,
  labels,
  height = 300,
  className,
  ...props
}: AreaChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const previewMax = Math.max(...series.map((s) => Math.max(...s.data))) || 1;

  // Generate linear gradient for area fill
  const gradientId = `area-gradient-${series[0]?.id || "0"}`;

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
        {/* Gradient definition */}
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor={series[0]?.color || "hsl(200, 80%, 60%)" } />
            <stop offset="100%" stopColor={series[0]?.color || "hsl(200, 80%, 60%)" } stopOpacity={0.2} />
          </linearGradient>
        </defs>

        {/* Area paths with in-fill animation */}
        {series.map((s, si) => {
          const color = s.color || `hsl(${30 + si * 40}, 70%, 60%)`;
          const previewMax = Math.max(...series.map((s) => Math.max(...s.data))) || 1;
          const points = s.data.map(
            (val, i) =>
              `${5 + (i / (s.data.length - 1)) * 90},${20 + (val / previewMax) * 70}`,
          );
          const closedPath = [`M5,20`, ...points, `L95,20 Z`];

          return (
            <path
              key={s.id}
              d={closedPath.join(" ")}
              fill={`url(#${gradientId})`}
              stroke={color}
              strokeWidth={1.5}
              className={cn(
                "motion-reduce:transition-none",
                "animate-[areaIn_0.6s_ease-out_forwards]",
                hoveredIndex === si
                  ? "stroke-[3]"
                  : "",
              )}
            />
          );
        })}

        {/* Data points on hover */}
        {series.map((s, si) =>
          s.data.map((val, i) => {
            const x =
              5 + (i / (s.data.length - 1)) * 90;
            const y =
              20 + (val / previewMax) * 70;

            return (
              <circle
                key={`${s.id}-${i}`}
                cx={x}
                cy={y}
                r={3}
                fill={s.color || "currentColor"}
                stroke={s.color || "currentColor"}
                strokeWidth={1}
                className={cn(
                  "transition-all duration-200",
                  "motion-reduce:transition-none",
                  "group-hover:scale-125",
                )}
              />
            );
          }),
        )}

        {/* Hover highlight */}
        {hoveredIndex !== null && series[hoveredIndex] && (
          <path
            d={
              "M5,20 " +
              series[hoveredIndex].data.map(
                (val, i) =>
                  `${5 + (i / (series[hoveredIndex].data.length - 1)) * 90},${20 + (val / previewMax) * 70}`,
              ).join(" ") +
              "L95,20 Z"
            }
            fill={`url(#${gradientId})`}
            stroke={series[hoveredIndex].color || "currentColor"}
            strokeWidth={2}
            strokeDasharray="5,5"
            fillRule="evenodd"
            className="motion-reduce:transition-none"
          />
        )}
      </svg>
    </div>
  );
}