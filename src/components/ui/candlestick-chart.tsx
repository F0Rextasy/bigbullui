"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CandlestickPoint {
  open: number;
  high: number;
  low: number;
  close: number;
  label?: string;
}

export interface CandlestickChartProps extends React.HTMLAttributes<HTMLDivElement> {
  points: CandlestickPoint[];
  className?: string;
}

export function CandlestickChart({
  points,
  className,
  ...props
}: CandlestickChartProps) {
  if (points.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }

  const xRange = Math.max(points.length - 1, 1);
  const lo = Math.min(...points.flatMap((p) => [p.low, p.open, p.close]));
  const hi = Math.max(...points.flatMap((p) => [p.high, p.open, p.close]));
  const span = hi - lo || 1;
  const y = (v: number) => 90 - ((v - lo) / span) * 80;

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
    >
      <svg
        className="w-full h-full max-w-md mx-auto"
        viewBox="0 0 100 100"
        style={{ overflow: "visible" }}
      >
        {/* X axis labels */}
        <g className="motion-reduce:transition-none">
          {points.map((pt, idx) => {
            const x = 5 + (idx / xRange) * 90;
            return (
              <text
                key={pt.label || idx}
                x={x}
                y={98}
                fontSize="8"
                textAnchor="middle"
                className={cn(
                  "motion-reduce:transition-none",
                  "text-[8px] uppercase text-muted-foreground",
                )}
              >
                {pt.label || idx}
              </text>
            );
          })}
        </g>

        {/* Candlesticks with body grow animation */}
        {points.map((pt, idx) => {
          const x = 5 + (idx / xRange) * 90;
          const isUp = pt.close >= pt.open;

          return (
            <g
              key={pt.label || idx}
              className={cn("cursor-pointer", isUp ? "text-accent" : "text-destructive")}
            >
              <line
                x1={x}
                y1={y(pt.high)}
                x2={x}
                y2={y(pt.low)}
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                opacity={0.8}
                className="motion-reduce:transition-none"
              />
              <rect
                x={x - 3}
                y={y(Math.max(pt.open, pt.close))}
                width={6}
                height={Math.max(Math.abs(y(pt.open) - y(pt.close)), 1.5)}
                fill="currentColor"
                className="motion-reduce:transition-none"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}