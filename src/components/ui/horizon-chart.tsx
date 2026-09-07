"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HorizonChartProps extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  bands?: number;
  width?: number;
  height?: number;
}

/** Horizon chart: dense time series folded into stacked translucent bands. */
export function HorizonChart({
  data,
  bands = 3,
  width = 280,
  height = 64,
  className,
  ...props
}: HorizonChartProps) {
  const bandCount = Math.max(1, Math.floor(bands));
  const n = data.length;
  if (n === 0) {
    return <svg width={width} height={height} className={className} aria-hidden="true" {...props} />;
  }
  const max = Math.max(...data, 1);
  const x = (i: number) => (i / Math.max(n - 1, 1)) * width;

  const bandPath = (band: number): string => {
    const floor = (max * band) / bandCount;
    const span = max / bandCount || 1;
    const top = data
      .map((v, i) => {
        const clipped = Math.min(Math.max(v - floor, 0), span);
        const y = height - (clipped / span) * height;
        return `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
    return `${top} L${x(n - 1).toFixed(2)},${height} L${x(0).toFixed(2)},${height} Z`;
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Horizon chart, ${n} points, peak ${max}`}
      className={cn("text-accent", className)}
      {...props}
    >
      <title>{`Horizon chart with ${n} points across ${bandCount} bands`}</title>
      {Array.from({ length: bandCount }).map((_, b) => (
        <path
          key={b}
          d={bandPath(b)}
          fill="currentColor"
          opacity={0.25 + (0.55 * (b + 1)) / bandCount}
        />
      ))}
    </svg>
  );
}
