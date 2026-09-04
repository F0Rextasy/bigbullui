import * as React from "react";
import { cn } from "./lib/utils";

export type ProgressProps = {
  value: number;
  max?: number;
  className?: string;
};

export function Progress({ value, max = 100, className }: ProgressProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const percent = (clamped / max) * 100;

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("h-3.5 w-full overflow-hidden rounded-sm border-2 border-dashed border-border bg-secondary", className)}
    >
      <div
        className="h-full transition-[width] duration-300 motion-reduce:transition-none bg-[repeating-linear-gradient(45deg,var(--color-accent)_0_10px,transparent_10px_20px)] bg-[length:28.3px_28.3px] animate-[stripes_1.2s_linear_infinite]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
