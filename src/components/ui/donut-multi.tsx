"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DonutMultiRing {
  label: string;
  value: number;
  max?: number;
}

export interface DonutMultiProps extends React.HTMLAttributes<HTMLDivElement> {
  rings: DonutMultiRing[];
  size?: number;
  label?: string;
}

const RING_TONES = ["text-accent", "text-foreground", "text-muted-foreground"];

export function DonutMulti({ rings, size = 200, label, className, ...props }: DonutMultiProps) {
  const R = 80;
  const C = 2 * Math.PI * R;
  const ringW = 88 / Math.max(rings.length, 1);

  return (
    <div className={cn("flex w-full flex-col items-center gap-2", className)} {...props}>
      <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label={label ?? "Multi-ring donut"}>
        {rings.map((ring, i) => {
          const frac = Math.min(Math.max(ring.value / (ring.max ?? 100), 0), 1);
          const r = R - i * ringW;
          return (
            <g key={ring.label} className={RING_TONES[i % RING_TONES.length]}>
              <circle cx={100} cy={100} r={r} fill="none" stroke="currentColor" strokeWidth={ringW - 6} opacity={0.15} />
              <circle
                cx={100}
                cy={100}
                r={r}
                fill="none"
                stroke="currentColor"
                strokeWidth={ringW - 6}
                strokeDasharray={`${frac * C} ${C}`}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
              >
                <title>{`${ring.label}: ${ring.value}`}</title>
              </circle>
            </g>
          );
        })}
        {label ? (
          <text x={100} y={104} textAnchor="middle" fontSize="13" className="fill-foreground font-mono font-bold uppercase">
            {label}
          </text>
        ) : null}
      </svg>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
        {rings.map((ring, i) => (
          <span key={ring.label} className={cn("flex items-center gap-1.5 font-mono text-[11px]", RING_TONES[i % RING_TONES.length])}>
            <span className="size-2 rounded-full bg-current" aria-hidden />
            <span className="text-muted-foreground">
              {ring.label} · <strong className="text-foreground">{ring.value}</strong>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
