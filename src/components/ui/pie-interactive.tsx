"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PieSlice {
  label: string;
  value: number;
}

export interface PieInteractiveProps extends React.HTMLAttributes<HTMLDivElement> {
  slices: PieSlice[];
  size?: number;
}

const SLICE_TONES = ["text-accent", "text-foreground", "text-muted-foreground"];

function polar(cx: number, cy: number, r: number, angle: number): [number, number] {
  const a = ((angle - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

export function PieInteractive({ slices, size = 220, className, ...props }: PieInteractiveProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const total = slices.reduce((a, s) => a + Math.max(s.value, 0), 0) || 1;
  const R = 80;
  const cx = 100;
  const cy = 100;
  let acc = 0;

  return (
    <div className={cn("flex w-full flex-col items-center gap-2", className)} {...props}>
      <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label="Interactive pie">
        {slices.map((s, i) => {
          const frac = Math.max(s.value, 0) / total;
          const a0 = acc * 360;
          acc += frac;
          const a1 = acc * 360;
          const [x0, y0] = polar(cx, cy, R, a0);
          const [x1, y1] = polar(cx, cy, R, a1);
          const large = frac > 0.5 ? 1 : 0;
          const isActive = active === i;
          const mid = (a0 + a1) / 2;
          const [ox, oy] = polar(0, 0, isActive ? 8 : 0, mid);
          return (
            <path
              key={s.label}
              d={`M ${cx + ox} ${cy + oy} L ${x0 + ox} ${y0 + oy} A ${R} ${R} 0 ${large} 1 ${x1 + ox} ${y1 + oy} Z`}
              fill="currentColor"
              opacity={active === null || isActive ? 0.85 : 0.3}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              role="img"
              aria-label={`${s.label}: ${s.value}`}
              className={cn(SLICE_TONES[i % SLICE_TONES.length], "cursor-pointer outline-none transition-opacity motion-reduce:transition-none")}
            >
              <title>{`${s.label}: ${s.value}`}</title>
            </path>
          );
        })}
      </svg>
      <p className="font-mono text-xs text-muted-foreground" aria-live="polite">
        {active === null ? "Hover a slice" : `${slices[active].label} · ${slices[active].value} (${Math.round((Math.max(slices[active].value, 0) / total) * 100)}%)`}
      </p>
    </div>
  );
}
