"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SunburstRing {
  /** Slice: label, value, parent (inner ring id or null for center) */
  id: string;
  label: string;
  value: number;
  parentId: string | null;
}

export interface SunburstChartProps extends React.HTMLAttributes<SVGSVGElement> {
  slices: SunburstRing[];
  height?: number;
}

function polar(cx: number, cy: number, r: number, angle: number) {
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function arcPath(cx: number, cy: number, rInner: number, rOuter: number, start: number, end: number): string {
  const large = end - start > Math.PI ? 1 : 0;
  const p1 = polar(cx, cy, rOuter, start);
  const p2 = polar(cx, cy, rOuter, end);
  const p3 = polar(cx, cy, rInner, end);
  const p4 = polar(cx, cy, rInner, start);
  return `M ${p1.x} ${p1.y} A ${rOuter} ${rOuter} 0 ${large} 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rInner} ${rInner} 0 ${large} 0 ${p4.x} ${p4.y} Z`;
}

/** Sunburst radial chart: two-ring hierarchy with hover highlight. */
export function SunburstChart({ slices, height = 260, className, ...props }: SunburstChartProps) {
  const [hover, setHover] = React.useState<string | null>(null);
  const cx = 50, cy = 50;

  const root = slices.filter((s) => s.parentId === null);
  const rootTotal = root.reduce((s, r) => s + r.value, 0);
  const rootChildren = new Map<string, SunburstRing[]>();
  for (const s of slices) {
    if (s.parentId === null) continue;
    const list = rootChildren.get(s.parentId) ?? [];
    list.push(s);
    rootChildren.set(s.parentId, list);
  }

  let angle = -Math.PI / 2;

  return (
    <svg viewBox="0 0 100 100" style={{ height }} className={cn("w-full max-w-sm mx-auto", className)} role="img" aria-label="Sunburst chart" {...props}>
      <style>{`@keyframes sbIn { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: scale(1); } }`}</style>
      {root.map((seg, idx) => {
        const sweep = (seg.value / rootTotal) * Math.PI * 2;
        const start = angle;
        const end = angle + sweep;
        angle = end;
        const isActive = hover === seg.id || (hover !== null && rootChildren.get(seg.id)?.some((c) => c.id === hover));

        return (
          <g key={seg.id} style={{ animation: "sbIn 0.45s ease-out both", animationDelay: `${idx * 100}ms`, transformOrigin: `${cx}px ${cy}px` }}>
            {/* Outer ring slices */}
            {(rootChildren.get(seg.id) ?? []).map((child, cIdx) => {
              const childSweep = (child.value / seg.value) * sweep;
              const childStart = start + (cIdx / (rootChildren.get(seg.id)!.length)) * sweep * 0 + (rootChildren.get(seg.id)!.slice(0, cIdx).reduce((s, c) => s + c.value, 0) / seg.value) * sweep;
              const childEnd = childStart + childSweep;
              const dim = hover !== null && !isActive && hover !== child.id;
              return (
                <path
                  key={child.id}
                  d={arcPath(cx, cy, 26, 44, childStart, childEnd)}
                  fill="var(--accent)"
                  opacity={dim ? 0.15 : 0.25 + cIdx * 0.12}
                  stroke="var(--card)"
                  strokeWidth="0.4"
                  onMouseEnter={() => setHover(child.id)}
                  onMouseLeave={() => setHover(null)}
                  className="cursor-pointer transition-opacity duration-150 motion-reduce:transition-none"
                />
              );
            })}
            {/* Inner ring */}
            <path
              d={arcPath(cx, cy, 12, 25, start, end)}
              fill="var(--accent)"
              opacity={isActive || hover === seg.id ? 0.7 : 0.35}
              stroke="var(--card)"
              strokeWidth="0.5"
              onMouseEnter={() => setHover(seg.id)}
              onMouseLeave={() => setHover(null)}
              className="cursor-pointer transition-opacity duration-150 motion-reduce:transition-none"
            />
            <text x={cx} y={cy + 1.5} textAnchor="middle" fontSize="3.5" fill="var(--foreground)" className="pointer-events-none select-none font-mono">
              {hover ? slices.find((s) => s.id === hover)?.label : `${rootTotal}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
