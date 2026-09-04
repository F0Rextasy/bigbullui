"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CountupProps extends React.HTMLAttributes<HTMLDivElement> {
  end: number;
  start?: number;
  duration?: number; // duration in ms
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  label?: string;
  variant?: "odometer" | "minimal" | "badge";
  className?: string;
}

export function Countup({
  end,
  start = 0,
  duration = 1500,
  prefix = "",
  suffix = "",
  separator = ",",
  decimals = 0,
  label = "TICKETS ADMITTED",
  variant = "odometer",
  className,
  ...props
}: CountupProps) {
  const [current, setCurrent] = React.useState(start);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic for smooth mechanical slowdown
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const nextValue = start + (end - start) * easeOut;

      setCurrent(nextValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, start, duration]);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(".");
  };

  const formattedValue = formatNumber(current);

  if (variant === "badge") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-1.5 rounded border-2 border-foreground bg-accent px-2.5 py-1 font-mono text-xs font-bold text-accent-foreground shadow-xs select-none",
          className
        )}
        {...props}
      >
        <span>{prefix}</span>
        <span className="tabular-nums">{formattedValue}</span>
        <span>{suffix}</span>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("inline-flex items-baseline gap-1 font-mono select-none", className)} {...props}>
        {prefix && <span className="text-sm font-bold text-muted-foreground">{prefix}</span>}
        <span className="text-2xl font-black tabular-nums text-foreground">{formattedValue}</span>
        {suffix && <span className="text-sm font-bold text-muted-foreground">{suffix}</span>}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-lg border-2 border-foreground bg-card p-4 font-mono select-none shadow-sm",
        className
      )}
      {...props}
    >
      {/* Decorative side ticket notches */}
      <div
        aria-hidden="true"
        className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background"
      />
      <div
        aria-hidden="true"
        className="absolute -right-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background"
      />

      {label && (
        <span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      )}

      {/* Mechanical odometer slot display */}
      <div className="flex items-center rounded border border-foreground bg-secondary/80 px-3 py-1.5 shadow-inner">
        {prefix && <span className="mr-1 text-sm font-bold text-muted-foreground">{prefix}</span>}
        <span className="text-2xl font-black tracking-wider tabular-nums text-foreground sm:text-3xl">
          {formattedValue}
        </span>
        {suffix && <span className="ml-1 text-xs font-bold text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}
