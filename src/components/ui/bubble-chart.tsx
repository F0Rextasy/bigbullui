"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BubblePoint {
  id: string;
  x: number;
  y: number;
  size: number;
  label?: string;
}

export interface BubbleChartProps extends React.HTMLAttributes<SVGSVGElement> {
  points: BubblePoint[];
  height?: number;
}

/** Kabarcık grafiği: x/y konum + boyut kodlu daireler, hover büyütme. */
export function BubbleChart({ points, height = 240, className, ...props }: BubbleChartProps) {
  const [hover, setHover] = React.useState<string | null>(null);
  const maxSize = Math.max(...points.map((p) => p.size), 1);

  return (
    <svg viewBox="0 0 100 62" style={{ height }} className={cn("w-full", className)} role="img" aria-label="Kabarcık grafiği" onMouseLeave={() => setHover(null)} {...props}>
      <style>{`@keyframes bcPop { from { transform: scale(0); opacity: 0; } }`}</style>
      {/* Izgara */}
      {[20, 40, 60, 80].map((x) => <line key={x} x1={x} y1={4} x2={x} y2={58} stroke="var(--border)" strokeWidth="0.2" strokeDasharray="1 1" />)}
      {[20, 40].map((y) => <line key={y} x1={2} y1={y} x2={98} y2={y} stroke="var(--border)" strokeWidth="0.2" strokeDasharray="1 1" />)}
      <rect x="1" y="3" width="98" height="56" fill="none" stroke="var(--border)" strokeWidth="0.3" rx="1" />

      {points.map((p, idx) => {
        const r = 2 + (p.size / maxSize) * 6;
        const isHover = hover === p.id;
        return (
          <g
            key={p.id}
            onMouseEnter={() => setHover(p.id)}
            style={{ animation: "bcPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both", animationDelay: `${idx * 70}ms`, transformOrigin: `${p.x}px ${p.y}px` }}
          >
            <circle
              cx={p.x} cy={p.y} r={r}
              fill="var(--accent)"
              opacity={isHover ? 0.55 : 0.25}
              stroke="var(--accent)"
              strokeWidth={isHover ? 0.6 : 0.3}
              className="cursor-pointer transition-all duration-200 motion-reduce:transition-none"
            />
            <text x={p.x} y={p.y + r + 3} textAnchor="middle" fontSize="2.4" fill="var(--muted-foreground)" className="pointer-events-none select-none font-mono">
              {p.label ?? ""}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
