"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type TrendDirection = "up" | "down" | "neutral";
export type TrendVelocityLevel = "low" | "medium" | "high" | "surge" | 1 | 2 | 3 | 4;
export type TrendBadgeVariant = "stamp" | "outline" | "solid" | "subtle";
export type TrendBadgeSize = "sm" | "md" | "lg";

export interface TrendBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | string;
  trend?: TrendDirection;
  label?: string;
  timeframe?: string;
  rate?: string;
  velocity?: TrendVelocityLevel;
  variant?: TrendBadgeVariant;
  size?: TrendBadgeSize;
  live?: boolean;
  notched?: boolean;
  animated?: boolean;
  stampAngle?: boolean;
  className?: string;
}

export function TrendBadge({
  value,
  trend,
  label,
  timeframe,
  rate,
  velocity,
  variant = "stamp",
  size = "md",
  live = true,
  notched = false,
  animated = true,
  stampAngle = false,
  className,
  ...props
}: TrendBadgeProps) {
  // Determine trend direction automatically if not explicitly provided
  const resolvedTrend: TrendDirection = React.useMemo(() => {
    if (trend) return trend;
    if (typeof value === "number") {
      if (value > 0) return "up";
      if (value < 0) return "down";
      return "neutral";
    }
    const clean = String(value).trim();
    if (clean.startsWith("+")) return "up";
    if (clean.startsWith("-")) return "down";
    return "neutral";
  }, [trend, value]);

  // Format value with sign & percentage if number
  const formattedValue = React.useMemo(() => {
    if (typeof value === "number") {
      const sign = value > 0 ? "+" : "";
      return `${sign}${value}%`;
    }
    return value;
  }, [value]);

  // Compute velocity bars count (1 to 4)
  const velocityScore = React.useMemo(() => {
    if (typeof velocity === "number") {
      return Math.max(1, Math.min(4, velocity));
    }
    switch (velocity) {
      case "low":
        return 1;
      case "medium":
        return 2;
      case "high":
        return 3;
      case "surge":
        return 4;
      default:
        return resolvedTrend === "up" ? 3 : resolvedTrend === "down" ? 1 : 2;
    }
  }, [velocity, resolvedTrend]);

  // Styling based on trend direction & variants
  const toneStyles: Record<TrendDirection, Record<TrendBadgeVariant, string>> = {
    up: {
      stamp: "border-emerald-600/70 bg-emerald-500/10 text-emerald-700 dark:border-emerald-500/80 dark:bg-emerald-950/40 dark:text-emerald-300",
      outline: "border-emerald-600/80 bg-transparent text-emerald-700 dark:border-emerald-400 dark:text-emerald-300",
      solid: "border-emerald-700 bg-emerald-600 text-white dark:border-emerald-400 dark:bg-emerald-500 dark:text-emerald-950",
      subtle: "border-border bg-card text-emerald-600 dark:text-emerald-400",
    },
    down: {
      stamp: "border-destructive/70 bg-destructive/10 text-destructive",
      outline: "border-destructive/80 bg-transparent text-destructive",
      solid: "border-destructive bg-destructive text-accent-foreground",
      subtle: "border-border bg-card text-destructive",
    },
    neutral: {
      stamp: "border-border bg-secondary/70 text-foreground",
      outline: "border-border bg-transparent text-muted-foreground",
      solid: "border-foreground bg-foreground text-background",
      subtle: "border-border bg-card text-muted-foreground",
    },
  };

  const sizeStyles: Record<TrendBadgeSize, {
    container: string;
    arrow: string;
    value: string;
    label: string;
    notch: string;
    gap: string;
  }> = {
    sm: {
      container: "px-2 py-0.5 text-[10px]",
      arrow: "size-3",
      value: "text-[11px] font-black",
      label: "text-[8px] tracking-wider",
      notch: "size-2 -left-1 -right-1",
      gap: "gap-1.5",
    },
    md: {
      container: "px-3 py-1 text-xs",
      arrow: "size-3.5",
      value: "text-xs font-black",
      label: "text-[9px] tracking-widest",
      notch: "size-2.5 -left-1.5 -right-1.5",
      gap: "gap-2",
    },
    lg: {
      container: "px-4 py-1.5 text-sm",
      arrow: "size-4",
      value: "text-sm font-black",
      label: "text-[10px] tracking-widest",
      notch: "size-3 -left-1.5 -right-1.5",
      gap: "gap-2.5",
    },
  };

  const currentSize = sizeStyles[size];

  return (
    <div
      role="status"
      aria-label={`Ticket sales trend: ${formattedValue} (${resolvedTrend}), velocity: level ${velocityScore} of 4${
        rate ? `, ${rate}` : ""
      }`}
      className={cn(
        // Base badge geometry & ticket stub stamp framing
        "group relative inline-flex items-center rounded-xs border-2 border-dashed font-mono font-bold select-none transition-all duration-200",
        currentSize.container,
        currentSize.gap,
        toneStyles[resolvedTrend][variant],
        stampAngle && "rotate-[-1.5deg] hover:rotate-0",
        className
      )}
      {...props}
    >
      {/* Semicircular Ticket Punch Notches */}
      {notched && (
        <>
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-full border border-current bg-background pointer-events-none",
              currentSize.notch.includes("size-2") && "size-2 -left-1",
              currentSize.notch.includes("size-2.5") && "size-2.5 -left-1.5",
              currentSize.notch.includes("size-3") && "size-3 -left-1.5"
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-full border border-current bg-background pointer-events-none",
              currentSize.notch.includes("size-2") && "size-2 -right-1",
              currentSize.notch.includes("size-2.5") && "size-2.5 -right-1.5",
              currentSize.notch.includes("size-3") && "size-3 -right-1.5"
            )}
          />
        </>
      )}

      {/* Live Sales Velocity Pulsing Beacon */}
      {live && (
        <span className="relative flex size-2 shrink-0 items-center justify-center">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-current" />
        </span>
      )}

      {/* Micro Eyebrow Label */}
      {label && (
        <span className={cn("uppercase opacity-80", currentSize.label)}>
          {label}
        </span>
      )}

      {/* Upward / Downward Ticker Arrow */}
      <span className="shrink-0 flex items-center justify-center">
        {resolvedTrend === "up" && (
          <svg
            aria-hidden="true"
            className={cn(
              currentSize.arrow,
              "stroke-current",
              animated && "transition-transform duration-300 group-hover:-translate-y-0.5"
            )}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 13.5V2.5" />
            <path d="M3.5 7L8 2.5L12.5 7" />
          </svg>
        )}

        {resolvedTrend === "down" && (
          <svg
            aria-hidden="true"
            className={cn(
              currentSize.arrow,
              "stroke-current",
              animated && "transition-transform duration-300 group-hover:translate-y-0.5"
            )}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2.5V13.5" />
            <path d="M3.5 9L8 13.5L12.5 9" />
          </svg>
        )}

        {resolvedTrend === "neutral" && (
          <svg
            aria-hidden="true"
            className={cn(currentSize.arrow, "stroke-current")}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 8H13.5" />
          </svg>
        )}
      </span>

      {/* Percentage / Delta Readout */}
      <span className={cn("tracking-tight font-black", currentSize.value)}>
        {formattedValue}
      </span>

      {/* Mechanical Velocity Meter Bars (4 segments) */}
      {velocity !== undefined && (
        <div
          aria-hidden="true"
          className="flex items-end gap-[2px] px-0.5 py-0.5"
          title={`Sales velocity: ${velocityScore}/4`}
        >
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              style={{ height: `${bar * 3 + 3}px` }}
              className={cn(
                "w-[2.5px] rounded-[0.5px] transition-all duration-200",
                bar <= velocityScore ? "bg-current opacity-100" : "bg-current/25"
              )}
            />
          ))}
        </div>
      )}

      {/* Live Rate Readout (e.g. '18/min', '420/hr') */}
      {rate && (
        <span className="text-[9px] uppercase tracking-wider opacity-85 font-mono">
          {rate}
        </span>
      )}

      {/* Timeframe Tag (e.g. 'vs last hr', '24h') */}
      {timeframe && (
        <span className="text-[9px] uppercase tracking-widest opacity-65 font-mono border-l border-dashed border-current/40 pl-1.5 ml-0.5">
          {timeframe}
        </span>
      )}
    </div>
  );
}
