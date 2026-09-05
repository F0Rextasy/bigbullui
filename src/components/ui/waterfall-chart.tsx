"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WaterfallChartItem {
  label: string;
  value: number; // positive = increment, negative = decrement
}

export interface WaterfallChartProps extends React.HTMLAttributes<HTMLDivElement> {
  items: WaterfallChartItem[];
  height?: number;
}

export function WaterfallChart({
  items,
  height = 350,
  className,
  ...props
}: WaterfallChartProps) {
  const cumulativeValues: number[] = [];
  let runningTotal = 0;

  for (const item of items) {
    runningTotal += item.value;
    cumulativeValues.push(runningTotal);
  }

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
        {/* Y-axis grid lines */}
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

        {/* Floating bars with connecting guides */}
        {items.map((item, idx) => {
          const isPositive = item.value >= 0;
  const barColor = isPositive
    ? "accent"
    : "destructive";
  const barHeightPct = Math.abs(item.value / 10) * 100; // scale factor
  const prevCumulative = idx > 0 ? cumulativeValues[idx - 1] : 0;
  const currCumulative = cumulativeValues[idx];
  const prevHeight = prevCumulative / 10 * 100;
  const currHeight = currCumulative / 10 * 100;

  const delay = idx * 50;

  return (
    <g key={item.label} className="relative">
      {/* Connecting dashed guide */}
      <line
        x1={50}
        y1={20 + prevHeight}
        x2={50}
        y2={20 + currHeight}
        stroke={barColor}
        strokeWidth={2}
        strokeDasharray="3,3"
        strokeOpacity={0.5}
        className="motion-reduce:transition-none"
      />

      {/* The bar */}
      <rect
        x="40"
        y={20 + Math.min(prevHeight, currHeight)}
        width="10"
        height={Math.abs(currHeight - prevHeight)}
        fill={barColor}
        className={cn(
          "motion-reduce:transition-none",
          `animate-[barIn_0.4s_ease-out_both ${delay}ms fill mode]`,
          isPositive
            ? "hover:scale-[1.05] transition-transform"
            : "hover:scale-[0.95] transition-transform",
        )}
      />
    </g>
  );
})}

        {/* X-axis labels */}
        <g className="motion-reduce:transition-none">
          {items.map((item, idx) => {
            const x = 5 + (idx / Math.max(items.length - 1, 1)) * 90;
            return (
              <text
                key={item.label}
                x={x}
                y={98}
                fontSize="9"
                textAnchor="middle"
                className={cn(
                  "motion-reduce:transition-none",
                  "text-[9px] uppercase text-muted-foreground rotate-6",
                  "transform-origin-bottom",
                )}
              >
                {item.label}
              </text>
            );
          })}
        </g>
      </svg>
    </div>
  );
}