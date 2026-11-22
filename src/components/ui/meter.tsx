"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  label?: string;
  unit?: string;
  low?: number;
  high?: number;
  optimum?: number;
  notched?: boolean;
  showTicks?: boolean;
  className?: string;
}

export function Meter({
  value,
  min = 0,
  max = 100,
  label = "TURNSTILE OCCUPANCY",
  unit = "%",
  low = 30,
  high = 80,
  optimum = 50,
  notched = true,
  showTicks = true,
  className,
  ...props
}: MeterProps) {
  const safeMax = max >= min ? max : min;
  const span = safeMax - min;
  const clampedValue = Math.max(min, Math.min(safeMax, Number.isFinite(value) ? value : min));
  const percent = span > 0 ? ((clampedValue - min) / span) * 100 : 0;
  const optimumPct = span > 0 ? Math.max(0, Math.min(100, ((optimum - min) / span) * 100)) : 50;

  let tone = "bg-primary";
  let statusText = "OPTIMAL";

  if (optimum <= low) {
    if (clampedValue > high) {
      tone = "bg-destructive";
      statusText = "HIGH CAPACITY";
    } else if (clampedValue > low) {
      tone = "bg-accent";
      statusText = "ELEVATED";
    }
  } else if (optimum >= high) {
    if (clampedValue < low) {
      tone = "bg-destructive";
      statusText = "LOW LOAD";
    } else if (clampedValue < high) {
      tone = "bg-accent";
      statusText = "SUBOPTIMAL";
    }
  } else {
    if (clampedValue > high) {
      tone = "bg-destructive";
      statusText = "HIGH CAPACITY";
    } else if (clampedValue < low) {
      tone = "bg-accent";
      statusText = "LOW LOAD";
    }
  }

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={safeMax}
      className={cn(
        "relative flex flex-col rounded-lg border-2 border-foreground bg-card p-4 font-mono select-none shadow-sm",
        className,
      )}
      {...props}
    >
      {notched ? (
        <>
          <div
            aria-hidden="true"
            className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background"
          />
          <div
            aria-hidden="true"
            className="absolute -right-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background"
          />
        </>
      ) : null}

      <div className="flex items-center justify-between border-b border-dashed border-border pb-2 text-[10px] tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="font-bold text-foreground">
          {clampedValue}
          {unit}
        </span>
      </div>

      <div className="relative mt-3 h-6 w-full overflow-hidden rounded border-2 border-foreground bg-secondary/60 p-0.5 shadow-inner">
        <div
          style={{ width: `${percent}%` }}
          className={cn("h-full rounded-xs transition-all duration-300 ease-out motion-reduce:transition-none", tone)}
        />
        <span
          aria-hidden="true"
          style={{ left: `${optimumPct}%` }}
          className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-foreground/40"
        />
      </div>

      {showTicks ? (
        <div className="mt-1 flex justify-between px-0.5 text-[9px] text-muted-foreground">
          <span>{min}</span>
          <span>{Math.round(span * 0.25 + min)}</span>
          <span>{Math.round(span * 0.5 + min)}</span>
          <span>{Math.round(span * 0.75 + min)}</span>
          <span>{safeMax}</span>
        </div>
      ) : null}

      <div className="mt-2 flex items-center justify-between border-t border-dashed border-border pt-2 text-[9px] uppercase text-muted-foreground">
        <span>ZONE RATING</span>
        <span className="font-bold text-accent-strong">{statusText}</span>
      </div>
    </div>
  );
}
