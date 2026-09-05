"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type GateOccupancyLevel = "low" | "moderate" | "full" | "closed";
export type StatusDotVariant = "booth" | "badge" | "dot";
export type StatusDotSize = "sm" | "md" | "lg";

export interface StatusDotProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gate occupancy level */
  level?: GateOccupancyLevel;
  /** Display variant: complete booth card, inline ticket badge, or pure beacon dot */
  variant?: StatusDotVariant;
  /** Size of the beacon dot */
  size?: StatusDotSize;
  /** Name or designation of the turnstile gate */
  gateName?: string;
  /** Terminal or booth station title */
  terminal?: string;
  /** Lane category (e.g. VIP FAST-TRACK, GENERAL ADMISSION) */
  laneType?: string;
  /** Numerical occupancy percentage override (0 to 100) */
  occupancyPercent?: number;
  /** Estimated wait duration string */
  waitTime?: string;
  /** Admission flow rate */
  throughput?: string;
  /** Turnstile equipment serial or station ID */
  turnstileId?: string;
  /** Custom label override for the status */
  label?: string;
  /** Custom secondary description override */
  sublabel?: string;
  /** Whether the radar sweep beam is active */
  radarSweep?: boolean;
  /** Whether glow ring pulses are animated */
  pulse?: boolean;
  /** Additional CSS class names */
  className?: string;
}

interface LevelConfig {
  label: string;
  sublabel: string;
  defaultPercent: number;
  defaultWait: string;
  defaultThroughput: string;
  dotColor: string;
  dotBg: string;
  textColor: string;
  badgeBorder: string;
  badgeBg: string;
  glowClass: string;
  sweepDuration: string;
  meterBg: string;
}

const levelConfigs: Record<GateOccupancyLevel, LevelConfig> = {
  low: {
    label: "LOW OCCUPANCY",
    sublabel: "RAPID ADMISSION · FLOWING",
    defaultPercent: 22,
    defaultWait: "< 1 MIN",
    defaultThroughput: "46 / MIN",
    dotColor: "text-emerald-500",
    dotBg: "bg-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
    badgeBorder: "border-emerald-500/40",
    badgeBg: "bg-emerald-500/10",
    glowClass: "shadow-[0_0_12px_rgba(16,185,129,0.55)]",
    sweepDuration: "3.6s",
    meterBg: "bg-emerald-500",
  },
  moderate: {
    label: "MODERATE FLOW",
    sublabel: "STEADY ENTRY · MINOR QUEUE",
    defaultPercent: 58,
    defaultWait: "4-6 MIN",
    defaultThroughput: "32 / MIN",
    dotColor: "text-amber-500",
    dotBg: "bg-amber-500",
    textColor: "text-amber-600 dark:text-amber-400",
    badgeBorder: "border-amber-500/40",
    badgeBg: "bg-amber-500/10",
    glowClass: "shadow-[0_0_12px_rgba(245,158,11,0.55)]",
    sweepDuration: "2.6s",
    meterBg: "bg-amber-500",
  },
  full: {
    label: "CAPACITY FULL",
    sublabel: "PEAK CONGESTION · GATES DIVERTED",
    defaultPercent: 94,
    defaultWait: "12-15 MIN",
    defaultThroughput: "14 / MIN",
    dotColor: "text-rose-500",
    dotBg: "bg-rose-500",
    textColor: "text-rose-600 dark:text-rose-400",
    badgeBorder: "border-rose-500/40",
    badgeBg: "bg-rose-500/10",
    glowClass: "shadow-[0_0_14px_rgba(244,63,94,0.65)]",
    sweepDuration: "1.6s",
    meterBg: "bg-rose-500",
  },
  closed: {
    label: "GATE CLOSED",
    sublabel: "TURNSTILE LOCKED · USE GATE B",
    defaultPercent: 0,
    defaultWait: "LOCKED",
    defaultThroughput: "0 / MIN",
    dotColor: "text-muted-foreground",
    dotBg: "bg-muted-foreground/60",
    textColor: "text-muted-foreground",
    badgeBorder: "border-border",
    badgeBg: "bg-secondary/60",
    glowClass: "shadow-none",
    sweepDuration: "0s",
    meterBg: "bg-muted-foreground/30",
  },
};

/**
 * Radar Beacon Visual Element
 */
function BeaconGraphic({
  level,
  size = "md",
  radarSweep = true,
  pulse = true,
}: {
  level: GateOccupancyLevel;
  size?: StatusDotSize;
  radarSweep?: boolean;
  pulse?: boolean;
}) {
  const config = levelConfigs[level];
  const isClosed = level === "closed";

  const sizeContainer = {
    sm: "size-5",
    md: "size-8",
    lg: "size-14",
  }[size];

  const sizeDot = {
    sm: "size-2",
    md: "size-3",
    lg: "size-4",
  }[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 select-none",
        sizeContainer,
        config.dotColor
      )}
    >
      {/* Outer reticle / sweep track */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border border-current/20 transition-all",
          size === "lg" && "border-current/30"
        )}
      />

      {/* Internal concentric guide ring for lg and md */}
      {size !== "sm" && (
        <div className="absolute inset-[25%] rounded-full border border-dashed border-current/25" />
      )}

      {/* Reticle Crosshair Ticks for lg */}
      {size === "lg" && (
        <>
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-current/15" />
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-current/15" />
        </>
      )}

      {/* Radar Conic Sweep Beam */}
      {radarSweep && !isClosed && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full animate-spin pointer-events-none opacity-40"
          style={{
            animationDuration: config.sweepDuration,
            background:
              "conic-gradient(from 0deg, transparent 0deg, currentColor 50deg, transparent 55deg)",
          }}
        />
      )}

      {/* Radiating Glow Ping Ring */}
      {pulse && !isClosed && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute rounded-full bg-current opacity-75 animate-ping",
            size === "sm" ? "size-2.5" : size === "md" ? "size-4" : "size-6"
          )}
        />
      )}

      {/* Center LED Core Dot */}
      <span
        className={cn(
          "relative z-10 rounded-full border border-background/60 transition-all",
          sizeDot,
          config.dotBg,
          config.glowClass
        )}
      >
        <span className="absolute top-0.5 left-0.5 size-1 rounded-full bg-white/70" />
      </span>
    </div>
  );
}

export function StatusDot({
  level = "low",
  variant = "booth",
  size = "md",
  gateName = "GATE A-04",
  terminal = "NORTH TURNSTILE",
  laneType = "GENERAL ADMISSION",
  occupancyPercent,
  waitTime,
  throughput,
  turnstileId = "TRN-902",
  label,
  sublabel,
  radarSweep = true,
  pulse = true,
  className,
  ...props
}: StatusDotProps) {
  const config = levelConfigs[level];
  const percent = occupancyPercent !== undefined ? occupancyPercent : config.defaultPercent;
  const currentWait = waitTime || config.defaultWait;
  const currentThroughput = throughput || config.defaultThroughput;
  const displayLabel = label || config.label;
  const displaySublabel = sublabel || config.sublabel;

  // Pure Standalone Dot Variant
  if (variant === "dot") {
    return (
      <div
        role="status"
        aria-label={`${gateName} status: ${displayLabel}`}
        className={cn("inline-flex items-center gap-2", className)}
        {...props}
      >
        <BeaconGraphic
          level={level}
          size={size}
          radarSweep={radarSweep}
          pulse={pulse}
        />
        {label && (
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
            {label}
          </span>
        )}
      </div>
    );
  }

  // Compact Inline Ticket Badge Variant
  if (variant === "badge") {
    return (
      <div
        role="status"
        aria-label={`${gateName} status: ${displayLabel}`}
        className={cn(
          "inline-flex items-center gap-2.5 rounded-xs border-2 border-dashed border-border bg-card px-2.5 py-1.5 font-mono select-none shadow-2xs",
          className
        )}
        {...props}
      >
        <BeaconGraphic
          level={level}
          size="sm"
          radarSweep={radarSweep}
          pulse={pulse}
        />
        <div className="flex items-center gap-1.5 text-[10px] font-bold">
          <span className="uppercase text-foreground">{gateName}</span>
          <span className="text-muted-foreground/60">·</span>
          <span
            className={cn(
              "rounded-xs border px-1.5 py-0.2 uppercase tracking-widest text-[9px]",
              config.badgeBorder,
              config.badgeBg,
              config.textColor
            )}
          >
            {displayLabel}
          </span>
        </div>
      </div>
    );
  }

  // Complete Ticket Booth Card Variant
  return (
    <div
      role="status"
      aria-label={`${gateName} admission booth status: ${displayLabel}`}
      className={cn(
        "relative flex flex-col rounded-sm border-2 border-foreground bg-card p-4 font-mono select-none shadow-md max-w-sm w-full",
        className
      )}
      {...props}
    >
      {/* Left Perforation Notch Hole */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 size-3.5 rounded-full border-2 border-foreground bg-background z-10"
      />

      {/* Right Perforation Notch Hole */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 size-3.5 rounded-full border-2 border-foreground bg-background z-10"
      />

      {/* Ticket Booth Header */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-2.5">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {terminal}
          </span>
          <span className="text-base font-black tracking-tight text-foreground">
            {gateName}
          </span>
        </div>
        <div className="flex flex-col items-end text-right">
          <span className="rounded-xs border border-border bg-secondary/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
            {turnstileId}
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-wider text-muted-foreground/80">
            {laneType}
          </span>
        </div>
      </div>

      {/* Center Radar Scanner Station Screen */}
      <div className="my-3 flex items-center gap-4 rounded-xs border border-dashed border-border bg-secondary/30 p-3">
        <BeaconGraphic
          level={level}
          size="lg"
          radarSweep={radarSweep}
          pulse={pulse}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-block rounded-xs border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]",
                config.badgeBorder,
                config.badgeBg,
                config.textColor
              )}
            >
              {displayLabel}
            </span>
            <span className="text-xs font-bold text-foreground">
              {percent}%
            </span>
          </div>

          <p className="mt-1 text-[10px] text-muted-foreground truncate uppercase tracking-wider">
            {displaySublabel}
          </p>

          {/* Turnstile Occupancy Capacity Meter Bar */}
          <div className="mt-2.5">
            <div className="relative h-2 w-full overflow-hidden rounded-xs border border-border bg-background">
              <div
                className={cn("h-full transition-all duration-500", config.meterBg)}
                style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between text-[8px] uppercase tracking-widest text-muted-foreground">
              <span>0% EMPTY</span>
              <span>50% FLOW</span>
              <span>100% MAX</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Footer Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 border-t-2 border-dashed border-border pt-2.5 text-center">
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">
            WAIT TIME
          </span>
          <span className="text-xs font-bold text-foreground">
            {currentWait}
          </span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">
            THROUGHPUT
          </span>
          <span className="text-xs font-bold text-foreground">
            {currentThroughput}
          </span>
        </div>
        <div>
          <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">
            BEACON
          </span>
          <span className={cn("text-xs font-bold uppercase", config.textColor)}>
            {level === "closed" ? "OFFLINE" : "LIVE RADAR"}
          </span>
        </div>
      </div>
    </div>
  );
}
