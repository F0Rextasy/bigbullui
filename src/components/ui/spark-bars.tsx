"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SparkBarsProps extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  width?: number;
  height?: number;
  barWidth?: number;
  tone?: "accent" | "foreground";
}

export function SparkBars({
  data,
  width = 140,
  height = 40,
  barWidth = 6,
  tone = "accent",
  className,
  ...props
}: SparkBarsProps) {
  if (data.length === 0) {
    return <svg width={width} height={height} className={className} aria-hidden {...props} />;
  }
  const max = Math.max(...data, 1);
  const gap = 2;
  const w = Math.max((width - gap * (data.length - 1)) / data.length, 1);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Spark bars, ${data.length} values, peak ${max}`}
      className={cn(tone === "accent" ? "text-accent" : "text-foreground", className)}
      {...props}
    >
      {data.map((v, i) => {
        const h = Math.max((v / max) * (height - 4), 2);
        return (
          <rect
            key={i}
            x={i * (w + gap)}
            y={height - h}
            width={Math.min(w, barWidth + 3)}
            height={h}
            rx={1.5}
            fill="currentColor"
            opacity={0.35 + 0.65 * (v / max)}
          >
            <title>{v}</title>
          </rect>
        );
      })}
    </svg>
  );
}
