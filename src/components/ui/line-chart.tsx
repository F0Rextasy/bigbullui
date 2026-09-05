"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LineChartDataItem {
  id: string;
  label: string;
  color?: string;
  data: number[];
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  series: LineChartDataItem[];
  labels?: string[];
  height?: number;
}

export function LineChart({
  series,
  labels,
  height = 300,
  className,
  ...props
}: LineChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const maxValue = Math.max(
    ...series.flatMap((s) => s.data),
    ...series.map((s) => s.data.length),
  ) || 1;

  const previewMax = Math.max(...series.map((s) => Math.max(...s.data))) || 1;

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
      {...props}
      style={{ height: `${height}px` }}
    >
      {/* SVG canvas */}
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        {/* Background grid lines (dashed) */}
        <g className="motion-reduce:transition-none">
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={i}
              x1="5"
              y1={20 + (i * 20)}
              x2="95"
              y2={20 + (i * 20)}
              stroke="currentColor"
              strokeWidth={1}
              strokeOpacity={0.1}
            />
          ))}
        </g>

        {/* Data lines with stroke-dasharray animation */}
        {series.map((s, si) => {
          const color = s.color || `hsl(${30 + si * 50}, 70%, 60%)`;
          const pathRef = React.useRef<SVGPolylineElement>(null!);
          const accumulatedLength = React.useRef(0);

          // Compute total path length
          const d = `M5,20 L95,20`;
          // Simplified: we'll animate a polyline
          const points = s.data.map(
            (val, i) => `${5 + (i / (s.data.length - 1)) * 90},${20 + (val / previewMax) * 70}`,
          );
          const pathString = `M5,20 ${points.join(" ")}`;

          React.useEffect(() => {
            pathRef.current?.setAttribute("stroke-dasharray", "0 282");
            // Animate from 0 to full length
            pathRef.current?.animate(
              [
                { strokeDasharray: "0 282" },
                { strokeDasharray: `${accumulatedLength.current} 282` },
              ],
              { duration: 800, easing: "ease-out", fill: "forwards" },
            );
          }, []);

          return (
            <polyline
              key={s.id}
              ref={pathRef}
              points={points.join(" ")}
              stroke={color}
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "motion-reduce:transition-none",
                hoveredIndex === si ? "stroke-[4]" : "",
              )}
            />
          );
        })}

        {/* Animated end-point dots */}
        {series.map((s, si) =>
          s.data.map((val, i) => {
            const x =
              5 + (i / (s.data.length - 1)) * 90;
            const y =
              20 + (val / previewMax) * 70;
            const isHovered = hoveredIndex === si && /* check point */ true;

            return (
              <circle
                key={`${s.id}-${i}`}
                cx={x}
                cy={y}
                r={hoveredIndex === si ? 4 : 3}
                fill={s.color || "currentColor"}
                stroke={s.color || "currentColor"}
                strokeWidth={2}
                className={cn(
                  "transition-all duration-300",
                  "motion-reduce:transition-none",
                  "group-hover:scale-125",
                )}
              />
            );
          }),
        )}

        {/* Hover connector line */}
        {hoveredIndex !== null && series[hoveredIndex] && (
          <polyline
            points={`M5,20 ${series[hoveredIndex].data.map(
              (_, i) =>
                `${5 + (i / (series[hoveredIndex].data.length - 1)) * 90},${20 + (series[hoveredIndex].data[i] / previewMax) * 70}`,
            )}`}
            stroke={series[hoveredIndex].color || "currentColor"}
            strokeWidth={2}
            strokeDasharray="5,5"
            fill="none"
            className="motion-reduce:transition-none"
          />
        )}
      </svg>
    </div>
  );
}