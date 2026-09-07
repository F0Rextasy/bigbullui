"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StreamLayer {
  label: string;
  data: number[];
}

export interface StreamGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  layers: StreamLayer[];
  height?: number;
}

const LAYER_TONES = ["text-accent", "text-foreground", "text-muted-foreground"];

export function StreamGraph({ layers, height = 240, className, ...props }: StreamGraphProps) {
  if (layers.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }
  const n = Math.max(...layers.map((l) => l.data.length));
  const totals = Array.from({ length: n }, (_, i) =>
    layers.reduce((a, l) => a + (l.data[i] ?? 0), 0),
  );
  const peak = Math.max(...totals, 1);
  const x = (i: number) => 5 + (i / Math.max(n - 1, 1)) * 90;

  let baseline = totals.map(() => 0);
  const bands = layers.map((layer) => {
    const top = totals.map((t, i) => baseline[i] + (layer.data[i] ?? 0));
    const band = { layer, top, bottom: [...baseline] };
    baseline = top;
    return band;
  });

  const y = (v: number) => 92 - (v / peak) * 80;

  return (
    <div className={cn("w-full", className)} style={{ height: `${height}px` }} {...props}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Stream graph">
        {bands.map((band, bi) => {
          const topPath = band.top.map((v, i) => `${x(i)},${y(v)}`).join(" ");
          const bottomPath = band.bottom.map((v, i) => `${x(i)},${y(v)}`).reverse().join(" ");
          return (
            <polygon
              key={band.layer.label}
              points={`${x(0)},${y(0)} ${topPath} ${x(n - 1)},${y(0)} ${bottomPath}`}
              fill="currentColor"
              opacity={0.3}
              className={LAYER_TONES[bi % LAYER_TONES.length]}
            >
              <title>{band.layer.label}</title>
            </polygon>
          );
        })}
      </svg>
      <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1">
        {layers.map((l, i) => (
          <span key={l.label} className={cn("flex items-center gap-1.5 font-mono text-[11px]", LAYER_TONES[i % LAYER_TONES.length])}>
            <span className="size-2 rounded-full bg-current" aria-hidden />
            <span className="text-muted-foreground">{l.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
