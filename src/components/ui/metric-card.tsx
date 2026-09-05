"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type TrendDirection = "up" | "down" | "neutral";

export interface MetricCardTrend {
  value: string | number;
  direction?: TrendDirection;
  label?: string;
  invertColors?: boolean;
}

export type MetricCardProps = Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> & {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  trend?: MetricCardTrend;
  periodLabel?: string;
  badge?: string;
  serial?: string;
  sparklineData?: number[];
  sparklineTone?: "accent" | "foreground" | "success" | "muted";
  progress?: number;
  progressTarget?: string;
  statusDot?: "active" | "warning" | "error" | "idle";
  footerText?: string;
  barcodeValue?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  prefix,
  suffix,
  trend,
  periodLabel,
  badge = "LIVE AUDIT",
  serial,
  sparklineData,
  sparklineTone = "accent",
  progress,
  progressTarget,
  statusDot = "active",
  footerText,
  barcodeValue,
  className,
  ...props
}: MetricCardProps) {
  const gradientId = React.useId();

  // Auto detect trend direction if not explicitly provided
  const trendDirection: TrendDirection = React.useMemo(() => {
    if (trend?.direction) return trend.direction;
    if (!trend?.value) return "neutral";
    const strVal = String(trend.value).trim();
    if (strVal.startsWith("+")) return "up";
    if (strVal.startsWith("-")) return "down";
    const numVal = parseFloat(strVal);
    if (!isNaN(numVal)) {
      if (numVal > 0) return "up";
      if (numVal < 0) return "down";
    }
    return "neutral";
  }, [trend?.direction, trend?.value]);

  const isPositive = trendDirection === "up";
  const isNegative = trendDirection === "down";
  const invert = Boolean(trend?.invertColors);

  // Invert colors if lower is better (e.g. churn or latency)
  const isGood = invert ? isNegative : isPositive;
  const isBad = invert ? isPositive : isNegative;

  const trendValue = trend?.value;
  const trendDirectionProp = trend?.direction;

  // Format trend string display
  const formattedTrendValue = React.useMemo(() => {
    if (!trendValue) return "";
    const str = String(trendValue).trim();
    if (trendDirection === "up" && !str.startsWith("+")) {
      return `+${str}`;
    }
    return str;
  }, [trendValue, trendDirection]);

  // Generate SVG path for sparkline
  const sparklinePath = React.useMemo(() => {
    if (!sparklineData || sparklineData.length < 2) return null;
    const width = 120;
    const height = 36;
    const padY = 4;
    const padX = 2;

    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min || 1;

    const innerWidth = width - padX * 2;
    const innerHeight = height - padY * 2;

    const pts = sparklineData.map((v, i) => {
      const x = padX + (i / (sparklineData.length - 1)) * innerWidth;
      const y = height - padY - ((v - min) / range) * innerHeight;
      return { x, y };
    });

    const d = pts.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, "");

    const lastPt = pts[pts.length - 1];
    const areaD = `${d} L ${lastPt.x} ${height} L ${pts[0].x} ${height} Z`;

    return { d, areaD, lastPt, width, height };
  }, [sparklineData]);

  const strokeColor =
    sparklineTone === "accent"
      ? "var(--color-accent, #bc3a28)"
      : sparklineTone === "success"
      ? "#10b981"
      : sparklineTone === "muted"
      ? "var(--color-muted-foreground, #6f6350)"
      : "currentColor";

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border-2 border-foreground bg-card shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md overflow-hidden select-none",
        className
      )}
      {...props}
    >
      {/* Top Header Section */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2">
          {/* Micro Serial & Category */}
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground truncate">
            {serial || "STUB // KPI"}
          </span>

          {/* Live Status Badge */}
          {badge && (
            <span className="inline-flex items-center gap-1.5 rounded-xs border border-dashed border-border bg-secondary/40 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-foreground shrink-0">
              {statusDot === "active" && (
                <span className="size-1.5 rounded-full bg-accent animate-ping shrink-0" />
              )}
              {statusDot === "warning" && (
                <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
              )}
              {statusDot === "error" && (
                <span className="size-1.5 rounded-full bg-destructive shrink-0" />
              )}
              {statusDot === "idle" && (
                <span className="size-1.5 rounded-full bg-muted-foreground shrink-0" />
              )}
              <span>{badge}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="mt-2 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </h4>

        {/* Value Display */}
        <div className="mt-2 flex items-baseline gap-1">
          {prefix && (
            <span className="font-mono text-xl font-bold text-muted-foreground">
              {prefix}
            </span>
          )}
          <span className="font-mono text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            {value}
          </span>
          {suffix && (
            <span className="font-mono text-xs font-semibold text-muted-foreground ml-0.5">
              {suffix}
            </span>
          )}
        </div>

        {/* Trend & Period Comparison */}
        {(trend || periodLabel) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-xs border border-dashed px-1.5 py-0.5 font-mono text-[11px] font-bold rotate-[-1deg]",
                  isGood &&
                    "border-emerald-600/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                  isBad &&
                    "border-destructive/40 bg-destructive/10 text-destructive",
                  !isGood &&
                    !isBad &&
                    "border-border bg-secondary/50 text-muted-foreground"
                )}
              >
                {trendDirection === "up" && (
                  <svg
                    className="size-3 shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12 12 4M6 4h6v6" />
                  </svg>
                )}
                {trendDirection === "down" && (
                  <svg
                    className="size-3 shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 4l8 8M6 12h6V6" />
                  </svg>
                )}
                {trendDirection === "neutral" && (
                  <span className="font-mono text-[10px]" aria-hidden="true">
                    —
                  </span>
                )}
                <span>{formattedTrendValue}</span>
              </span>
            )}

            {(trend?.label || periodLabel) && (
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-tight">
                {trend?.label || periodLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Perforation Divider with Punch Notches */}
      <div className="relative flex items-center justify-between py-1">
        {/* Left Cutout Hole */}
        <div
          className="size-4 rounded-full bg-background border-2 border-foreground -ml-2 shrink-0"
          aria-hidden="true"
        />

        {/* Dashed Perforation Line */}
        <div className="h-0 flex-1 border-t-2 border-dashed border-border" />

        {/* Right Cutout Hole */}
        <div
          className="size-4 rounded-full bg-background border-2 border-foreground -mr-2 shrink-0"
          aria-hidden="true"
        />
      </div>

      {/* Bottom Visual Graphic / Stub Area */}
      <div className="p-5 pt-3 bg-secondary/20 flex flex-col justify-between flex-1 gap-3">
        {/* Sparkline Graphic */}
        {sparklinePath && (
          <div className="w-full">
            <svg
              viewBox={`0 0 ${sparklinePath.width} ${sparklinePath.height}`}
              className="w-full h-10 overflow-visible"
              aria-label="Metric trend visualization"
              role="img"
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Dashed baseline */}
              <line
                x1={0}
                y1={sparklinePath.height - 1}
                x2={sparklinePath.width}
                y2={sparklinePath.height - 1}
                stroke="currentColor"
                strokeOpacity="0.2"
                strokeDasharray="2 2"
              />

              {/* Gradient area */}
              <path
                d={sparklinePath.areaD}
                fill={`url(#${gradientId})`}
              />

              {/* Trend line */}
              <path
                d={sparklinePath.d}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Endpoint Pulsing Indicator */}
              <circle
                cx={sparklinePath.lastPt.x}
                cy={sparklinePath.lastPt.y}
                r="3"
                fill={strokeColor}
              />
              <circle
                cx={sparklinePath.lastPt.x}
                cy={sparklinePath.lastPt.y}
                r="5"
                fill={strokeColor}
                opacity="0.3"
                className="animate-ping"
              />
            </svg>
          </div>
        )}

        {/* Progress Bar Graphic */}
        {progress !== undefined && (
          <div className="space-y-1.5 w-full">
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground font-bold">
              <span>{progressTarget || "CYCLE PROGRESS"}</span>
              <span>{Math.min(100, Math.max(0, progress))}%</span>
            </div>
            <div className="h-2 w-full rounded-xs border border-dashed border-foreground/30 bg-muted overflow-hidden p-0.5">
              <div
                className="h-full bg-accent rounded-xs transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        )}

        {/* Micro Barcode & Timestamp Footer */}
        <div className="flex items-center justify-between text-[9px] font-mono text-muted-foreground/80 border-t border-dashed border-border/70 pt-2.5">
          <span className="truncate pr-2">
            {footerText || "VALIDATED EMISSION"}
          </span>

          {/* Mini Barcode Graphic */}
          <div className="flex items-center gap-0.5 shrink-0 opacity-70" aria-hidden="true">
            <div className="w-0.5 h-3.5 bg-foreground" />
            <div className="w-1 h-3.5 bg-foreground" />
            <div className="w-0.5 h-3.5 bg-transparent" />
            <div className="w-0.5 h-3.5 bg-foreground" />
            <div className="w-1.5 h-3.5 bg-foreground" />
            <div className="w-0.5 h-3.5 bg-transparent" />
            <div className="w-0.5 h-3.5 bg-foreground" />
            <div className="w-1 h-3.5 bg-foreground" />
            <div className="w-0.5 h-3.5 bg-foreground" />
            {barcodeValue && (
              <span className="ml-1 text-[8px] font-mono uppercase tracking-widest hidden sm:inline">
                {barcodeValue}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
