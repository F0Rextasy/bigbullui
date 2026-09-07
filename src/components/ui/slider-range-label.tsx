"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SliderRangeLabelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  min?: number;
  max?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  format?: (value: number) => string;
  minLabel?: string;
  maxLabel?: string;
}

export function SliderRangeLabel({
  min = 0,
  max = 100,
  value: controlledValue,
  defaultValue = [20, 80],
  onValueChange,
  format = (v) => `${v}`,
  minLabel = "Min",
  maxLabel = "Max",
  className,
  ...props
}: SliderRangeLabelProps) {
  const [inner, setInner] = React.useState<[number, number]>(defaultValue);
  const value = controlledValue ?? inner;

  const set = (next: [number, number]) => {
    const clamped: [number, number] = [
      Math.min(max, Math.max(min, Math.min(next[0], next[1]))),
      Math.min(max, Math.max(min, Math.max(next[0], next[1]))),
    ];
    setInner(clamped);
    onValueChange?.(clamped);
  };

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const trackRef = React.useRef<HTMLDivElement>(null);

  const drag = (index: 0 | 1) => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    const move = (ev: PointerEvent) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const ratio = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width));
      const v = min + ratio * (max - min);
      const next: [number, number] = index === 0 ? [v, value[1]] : [value[0], v];
      set(next);
    };
    const up = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
  };

  return (
    <div className={cn("w-full select-none", className)} {...props}>
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="text-muted-foreground">
          {minLabel}: <strong className="text-foreground">{format(value[0])}</strong>
        </span>
        <span className="text-muted-foreground">
          {maxLabel}: <strong className="text-foreground">{format(value[1])}</strong>
        </span>
      </div>
      <div
        ref={trackRef}
        className="relative mt-3 h-6"
        role="group"
        aria-label="Range"
      >
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-secondary" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent"
          style={{ left: `${pct(value[0])}%`, width: `${pct(value[1]) - pct(value[0])}%` }}
        />
        {([0, 1] as const).map((i) => (
          <button
            key={i}
            type="button"
            role="slider"
            aria-label={i === 0 ? minLabel : maxLabel}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={Math.round(value[i])}
            onPointerDown={drag(i)}
            style={{ left: `calc(${pct(value[i])}% - 10px)` }}
            className="absolute top-1/2 h-5 w-5 -translate-y-1/2 cursor-grab rounded-full border-2 border-foreground bg-card shadow active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        ))}
      </div>
    </div>
  );
}
