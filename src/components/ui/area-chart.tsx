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

const SERIES_TONES = ["text-accent", "text-foreground", "text-muted-foreground"];

const TOKEN_TONES: Record<string, string> = {
  accent: "text-accent",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  destructive: "text-destructive",
  primary: "text-primary",
};

export function AreaChart({
  series,
  labels,
  height = 300,
  className,
  ...props
}: AreaChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const max = Math.max(...series.flatMap((s) => s.data), 1);
  const y = (val: number) => 90 - (val / max) * 70;

  if (series.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
      style={{ height: `${height}px` }}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background grid lines (dashed) */}
        <g className="motion-reduce:transition-none">
          {Array.from({ length: 5 }, (_, i) => (
            <line
              key={i}
              x1="5"
              y1={20 + i * 17.5}
              x2="95"
              y2={20 + i * 17.5}
              stroke="currentColor"
              strokeWidth={1}
              strokeOpacity={0.1}
            />
          ))}
        </g>

        {/* X axis labels */}
        {labels?.map((label, i) => {
          const n = Math.max(labels.length - 1, 1);
          return (
            <text
              key={label}
              x={5 + (i / n) * 90}
              y={97}
              fontSize="5"
              textAnchor="middle"
              className="motion-reduce:transition-none fill-muted-foreground font-mono uppercase"
            >
              {label}
            </text>
          );
        })}

        {/* Area paths */}
        {series.map((s, si) => {
          const n = Math.max(s.data.length - 1, 1);
          const points = s.data.map((val, i) => `${5 + (i / n) * 90},${y(val)}`);
          const closedPath = [`M5,90`, ...points, `L95,90 Z`];
          const toneClass = s.color
            ? (TOKEN_TONES[s.color] ?? undefined)
            : SERIES_TONES[si % SERIES_TONES.length];

          return (
            <g
              key={s.id}
              onMouseEnter={() => setHoveredIndex(si)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(toneClass)}
              style={s.color && !toneClass ? { color: s.color } : undefined}
            >
              <path
                d={closedPath.join(" ")}
                fill="currentColor"
                opacity={hoveredIndex === si ? 0.35 : 0.18}
                className="motion-reduce:transition-none"
              />
              <polyline
                points={points.join(" ")}
                stroke="currentColor"
                strokeWidth={hoveredIndex === si ? 3 : 2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="motion-reduce:transition-none"
              />
              {s.data.map((val, i) => (
                <circle
                  key={`${s.id}-${i}`}
                  cx={5 + (i / n) * 90}
                  cy={y(val)}
                  r={hoveredIndex === si ? 3.5 : 2.5}
                  fill="currentColor"
                  className="transition-all duration-200 motion-reduce:transition-none"
                >
                  <title>{`${s.label}: ${val}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
