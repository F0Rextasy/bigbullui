"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
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
  const clampedValue = Math.max(min, Math.min(max, value));
  const percent = ((clampedValue - min) / (max - min)) * 100;

  // Determine status tone
  let tone = "bg-primary";
  let statusText = "OPTIMAL";

  if (clampedValue > high) {
    tone = "bg-destructive";
    statusText = "HIGH CAPACITY";
  } else if (clampedValue < low) {
    tone = "bg-accent";
    statusText = "LOW LOAD";
  }

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border-2 border-foreground bg-card p-4 font-mono select-none shadow-sm",
        className
      )}
      {...props}
    >
      {notched && (
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
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-dashed border-border pb-2 text-[10px] tracking-widest text-muted-foreground">
        <span>{label}</span>
        <span className="font-bold text-foreground">
          {clampedValue}
          {unit}
        </span>
      </div>

      {/* Meter Track */}
      <div className="relative mt-3 h-6 w-full rounded border-2 border-foreground bg-secondary/60 p-0.5 overflow-hidden shadow-inner">
        <div
          style={{ width: `${percent}%` }}
          className={cn(
            "h-full rounded-xs transition-all duration-300 ease-out",
            tone
          )}
        />
      </div>

      {/* Tick Marks */}
      {showTicks && (
        <div className="mt-1 flex justify-between px-0.5 text-[9px] text-muted-foreground">
          <span>{min}</span>
          <span>{Math.round((max - min) * 0.25 + min)}</span>
          <span>{Math.round((max - min) * 0.5 + min)}</span>
          <span>{Math.round((max - min) * 0.75 + min)}</span>
          <span>{max}</span>
        </div>
      )}

      {/* Status Eyebrow */}
      <div className="mt-2 flex items-center justify-between border-t border-dashed border-border pt-2 text-[9px] text-muted-foreground uppercase">
        <span>ZONE RATING</span>
        <span className="font-bold text-accent">{statusText}</span>
      </div>
    </div>
  );
}
