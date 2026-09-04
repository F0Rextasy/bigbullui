import * as React from "react";
import { cn } from "./lib/utils";

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  tone?: "accent" | "foreground";
  showArea?: boolean;
  className?: string;
}

export function Sparkline({
  data,
  width = 140,
  height = 40,
  strokeWidth = 2,
  tone = "accent",
  showArea = true,
  className,
  ...props
}: SparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 4;

  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  const points = data.map((val, idx) => {
    const x = padding + (idx / (data.length - 1)) * innerWidth;
    const y = height - padding - ((val - min) / range) * innerHeight;
    return { x, y };
  });

  const pathData = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  const areaData = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  const strokeColor = tone === "accent" ? "var(--color-accent, #BC3A28)" : "currentColor";
  const areaColor = tone === "accent" ? "var(--color-accent, #BC3A28)" : "currentColor";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible select-none", className)}
      width={width}
      height={height}
      aria-label="Sparkline trend"
      role="img"
      {...props}
    >
      {/* Dashed baseline */}
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeDasharray="2 2"
      />

      {/* Area under line */}
      {showArea ? (
        <path d={areaData} fill={areaColor} fillOpacity="0.12" />
      ) : null}

      {/* Main sparkline */}
      <path
        d={pathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Final value dot */}
      <circle
        cx={points[points.length - 1].x}
        cy={points[points.length - 1].y}
        r={3}
        fill={strokeColor}
      />
    </svg>
  );
}
