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
  if (items.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }

  const cumulativeValues: number[] = [];
  let runningTotal = 0;

  for (const item of items) {
    runningTotal += item.value;
    cumulativeValues.push(runningTotal);
  }

  const lo = Math.min(0, ...cumulativeValues);
  const hi = Math.max(0, ...cumulativeValues);
  const span = hi - lo || 1;
  const y = (v: number) => 90 - ((v - lo) / span) * 70;
  const n = items.length;
  const x = (i: number) => 10 + (i / Math.max(n - 1, 1)) * 80;

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
          const prevCumulative = idx > 0 ? cumulativeValues[idx - 1] : 0;
          const currCumulative = cumulativeValues[idx];
          const top = Math.min(y(prevCumulative), y(currCumulative));
          const bottom = Math.max(y(prevCumulative), y(currCumulative));

          return (
            <g
              key={item.label}
              className={cn(isPositive ? "text-accent" : "text-destructive")}
            >
              {idx > 0 ? (
                <line
                  x1={x(idx - 1) + 5}
                  y1={y(prevCumulative)}
                  x2={x(idx) - 5}
                  y2={y(prevCumulative)}
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeDasharray="3,3"
                  strokeOpacity={0.5}
                  className="motion-reduce:transition-none"
                />
              ) : null}
              <rect
                x={x(idx) - 5}
                y={top}
                width={10}
                height={Math.max(bottom - top, 1.5)}
                fill="currentColor"
                opacity={0.85}
                className="motion-reduce:transition-none"
              >
                <title>{`${item.label}: ${item.value >= 0 ? "+" : ""}${item.value}`}</title>
              </rect>
            </g>
          );
        })}

        {/* X-axis labels */}
        <g className="motion-reduce:transition-none">
          {items.map((item, idx) => {
            return (
              <text
                key={item.label}
                x={x(idx)}
                y={97}
                fontSize="6"
                textAnchor="middle"
                className={cn(
                  "motion-reduce:transition-none",
                  "fill-muted-foreground font-mono uppercase",
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