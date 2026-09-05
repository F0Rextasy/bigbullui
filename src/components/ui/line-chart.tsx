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

const SERIES_TONES = ["text-accent", "text-foreground", "text-muted-foreground"];

const TOKEN_TONES: Record<string, string> = {
  accent: "text-accent",
  foreground: "text-foreground",
  muted: "text-muted-foreground",
  destructive: "text-destructive",
  primary: "text-primary",
};

function SeriesLine({
  s,
  si,
  max,
  hovered,
  onHover,
}: {
  s: LineChartDataItem;
  si: number;
  max: number;
  hovered: boolean;
  onHover: (si: number | null) => void;
}) {
  const n = Math.max(s.data.length - 1, 1);
  const y = (val: number) => 90 - (val / max) * 70;
  const points = s.data.map((val, i) => `${5 + (i / n) * 90},${y(val)}`);
  const toneClass = s.color
    ? (TOKEN_TONES[s.color] ?? undefined)
    : SERIES_TONES[si % SERIES_TONES.length];

  return (
    <g
      onMouseEnter={() => onHover(si)}
      onMouseLeave={() => onHover(null)}
      className={cn(toneClass)}
      style={s.color && !toneClass ? { color: s.color } : undefined}
    >
      <polyline
        points={points.join(" ")}
        stroke="currentColor"
        strokeWidth={hovered ? 3.5 : 2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        style={{ animation: "lcDraw 0.9s ease-out both", animationDelay: `${si * 120}ms` }}
        className="motion-reduce:animate-none"
      />
      {s.data.map((val, i) => (
        <circle
          key={`${s.id}-${i}`}
          cx={5 + (i / n) * 90}
          cy={y(val)}
          r={hovered ? 4 : 3}
          fill="currentColor"
          className="transition-all duration-300 motion-reduce:transition-none"
        >
          <title>{`${s.label}: ${val}`}</title>
        </circle>
      ))}
    </g>
  );
}

export function LineChart({
  series,
  labels,
  height = 300,
  className,
  ...props
}: LineChartProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  const max = Math.max(...series.flatMap((s) => s.data), 1);

  if (series.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }

  return (
    <div
      className={cn("w-full", "motion-reduce:animate-none", className)}
      {...props}
      style={{ height: `${height}px` }}
    >
      <style>{`@keyframes lcDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }`}</style>
      {/* SVG canvas */}
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

        {/* Data lines with draw animation */}
        {series.map((s, si) => (
          <SeriesLine
            key={s.id}
            s={s}
            si={si}
            max={max}
            hovered={hoveredIndex === si}
            onHover={setHoveredIndex}
          />
        ))}
      </svg>
    </div>
  );
}
