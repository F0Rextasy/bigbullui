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
  const xRange = Math.max(...points.map((p, i) => i), points.length - 1) || 1;
  const priceRange = Math.max(
    ...points.flatMap((p) => [p.high, p.low]),
    1,
  );

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
          const openPct = ((pt.open / priceRange) * 50) + 50;
          const closePct = ((pt.close / priceRange) * 50) + 50;
          const highPct = ((pt.high / priceRange) * 50) + 50;
          const lowPct = ((pt.low / priceRange) * 50) + 50;

          const isUp = pt.close >= pt.open;
          const bodyColor = isUp ? "accent" : "destructive";

          const delay = idx * 40;

          return (
            <g key={pt.label || idx} className="cursor-pointer">
              {/* Wick (line) */}
              <line
                x1={x}
                y1={95 - highPct * 0.9}
                x2={x}
                y2={95 - lowPct * 0.9}
                stroke={bodyColor}
                strokeWidth={1}
                strokeLinecap="round"
                opacity={0.8}
                className="motion-reduce:transition-none"
              />

              {/* Body - grows in from center */}
              <rect
                x={x - 3}
                y={95 - Math.max(openPct, closePct) * 0.9}
                width={6}
                height={Math.abs(openPct - closePct) * 0.9}
                fill={bodyColor}
                className={cn(
                  "motion-reduce:transition-none",
                  "transform-origin-center",
                  `animate-[bodyIn_0.2s_ease-out_both ${delay}ms fill mode]`,
                )}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}