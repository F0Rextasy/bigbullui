"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FlipClockProps {
  time: string; // "HH:MM"
  className?: string;
}

export function FlipClock({ time, className }: FlipClockProps) {
  const digits = time.split(":");

  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-1.5 text-center motion-reduce:transition-none",
        className
      )}
    >
      {digits.map((digit, i) => (
        <FlipDigit key={i} value={parseInt(digit, 10) || 0} index={i} />
      ))}

      <div className="self-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground :">
        :
      </div>
    </div>
  );
}

function FlipDigit({ value, index }: { value: number; index: number }) {
  const digitStyles = [
    "rotateX(0deg) scale(1)",     // 0
    "rotateX(90deg) scale(0.95)", // 1
    "rotateX(90deg) scale(0.95)", // 2
    "rotateX(90deg) scale(0.95)", // 3
    "rotateX(-90deg) scale(0.95)", // 4
    "rotateX(-90deg) scale(0.95)", // 5
    "rotateX(-90deg) scale(0.95)", // 6
    "rotateX(-90deg) scale(0.95)", // 7
    "rotateX(0deg) scale(1)",     // 8
    "rotateX(0deg) scale(1)",     // 9
  ];

  return (
    <div
      className={cn(
        "aspect-square rounded-md border border-dashed border-border/50 bg-card p-1 transition-transform",
        "font-mono text-[11px] font-bold"
      )}
      style={{
        transform: digitStyles[value],
      }}
    >
      {value}
    </div>
  );
}