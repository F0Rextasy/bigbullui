"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SensitivitySliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

/** Sensitivity slider: touch-friendly look-speed control. */
export function SensitivitySlider({ value = 50, min = 0, max = 100, onChange, className, ...props }: SensitivitySliderProps) {
  const pct = ((value - min) / Math.max(1, max - min)) * 100;
  return (
    <div className={cn("w-full touch-none select-none", className)} style={{ touchAction: "none" }} {...props}>
      <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
        <span className="text-muted-foreground">Sensitivity</span>
        <span className="tabular-nums text-foreground" role="status">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        aria-label="Look sensitivity"
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="mt-2 min-h-11 w-full touch-none cursor-pointer accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        style={{ touchAction: "none" }}
      />
      <div className="h-2 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
        <div className="h-full bg-accent transition-[width] motion-reduce:transition-none" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
