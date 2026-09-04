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
      className={cn("h-3 w-full overflow-hidden rounded-sm border border-border bg-secondary", className)}
    >
      <div
        className="h-full transition-[width] duration-300 motion-reduce:transition-none bg-[repeating-linear-gradient(45deg,var(--color-accent-strong)_0_8px,transparent_8px_16px)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
