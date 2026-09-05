"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DonutChartDataItem {
  label: string;
  value: number;
  color?: string;
  tone?: "accent" | "primary" | "secondary" | "muted" | "warning" | "success" | "info";
  description?: string;
}

export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DonutChartDataItem[];
  size?: number;
  innerRadiusRatio?: number;
  padAngle?: number;
  formatValue?: (value: number) => string;
  formatPercent?: (percent: number) => string;
  centerLabel?: string;
  centerValue?: string | number;
  centerSubtext?: string;
  showCenterText?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  legendPosition?: "bottom" | "right" | "top" | "none";
  interactive?: boolean;
  activeIndex?: number | null;
  onActiveChange?: (index: number | null, item: DonutChartDataItem | null) => void;
  variant?: "donut" | "pie";
  frameVariant?: "ticket" | "card" | "bare";
  ticketSerial?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_COLORS: string[] = [
  "var(--color-accent, #bc3a28)",
  "var(--color-foreground, #17130c)",
  "#d97706", // warm amber
  "#2563eb", // admission blue
  "#059669", // emerald gate
  "#7c3aed", // violet stamp
  "#db2777", // pink stub
  "#4b5563", // charcoal gray
];

const TONE_COLORS: Record<string, string> = {
  accent: "var(--color-accent, #bc3a28)",
  primary: "var(--color-foreground, #17130c)",
  secondary: "var(--color-muted-foreground, #6f6350)",
  muted: "var(--color-muted-foreground, #6f6350)",
  warning: "#d97706",
  success: "#059669",
  info: "#2563eb",
};

interface SliceArc {
  item: DonutChartDataItem;
  index: number;
  value: number;
  percent: number;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  color: string;
  pathData: string;
  centroidX: number;
  centroidY: number;
}

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const radians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function buildArcPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number
): string {
  const span = endDeg - startDeg;
  if (span <= 0) return "";

  // For 360 or near-360 deg arc, split into two 180 deg halves to prevent SVG arc degenerate loops
  if (span >= 359.99) {
    const half = startDeg + span / 2;
    return `${buildArcPath(cx, cy, innerR, outerR, startDeg, half)} ${buildArcPath(cx, cy, innerR, outerR, half, endDeg)}`;
  }

  const startRad = ((startDeg - 90) * Math.PI) / 180.0;
  const endRad = ((endDeg - 90) * Math.PI) / 180.0;
  const largeArcFlag = span > 180 ? 1 : 0;

  const x1 = cx + outerR * Math.cos(startRad);
  const y1 = cy + outerR * Math.sin(startRad);
  const x2 = cx + outerR * Math.cos(endRad);
  const y2 = cy + outerR * Math.sin(endRad);

  if (innerR <= 0) {
    return `M ${cx} ${cy} L ${x1.toFixed(3)} ${y1.toFixed(3)} A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${x2.toFixed(3)} ${y2.toFixed(3)} Z`;
  }

  const x3 = cx + innerR * Math.cos(endRad);
  const y3 = cy + innerR * Math.sin(endRad);
  const x4 = cx + innerR * Math.cos(startRad);
  const y4 = cy + innerR * Math.sin(startRad);

  return `M ${x1.toFixed(3)} ${y1.toFixed(3)} A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${x2.toFixed(3)} ${y2.toFixed(3)} L ${x3.toFixed(3)} ${y3.toFixed(3)} A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${x4.toFixed(3)} ${y4.toFixed(3)} Z`;
}

export function DonutChart({
  data,
  size = 220,
  innerRadiusRatio = 0.62,
  padAngle = 2,
  formatValue = (val) => val.toLocaleString(),
  formatPercent = (pct) => `${pct.toFixed(1)}%`,
  centerLabel = "TOTAL",
  centerValue,
  centerSubtext,
  showCenterText = true,
  showTooltip = true,
  showLegend = true,
  legendPosition = "bottom",
  interactive = true,
  activeIndex: controlledActiveIndex,
  onActiveChange,
  variant = "donut",
  frameVariant = "ticket",
  ticketSerial = "№ DNT-804",
  title = "ADMISSION BREAKDOWN",
  subtitle = "STUB SECTOR ALLOCATION",
  className,
  ...props
}: DonutChartProps) {
  const [internalHoveredIndex, setInternalHoveredIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState<{ x: number; y: number } | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isControlled = controlledActiveIndex !== undefined;
  const activeIdx = isControlled ? controlledActiveIndex : internalHoveredIndex;

  const total = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + Math.max(0, curr.value), 0);
  }, [data]);

  const padding = 14;
  const outerRadius = (size / 2) - padding;
  const innerRadius = variant === "pie" ? 0 : outerRadius * innerRadiusRatio;
  const centerCoord = size / 2;

  const slices = React.useMemo<SliceArc[]>(() => {
    if (total <= 0) return [];

    let currentAngle = 0;
    const count = data.length;

    return data.map((item, idx) => {
      const val = Math.max(0, item.value);
      const percent = (val / total) * 100;
      const rawSpan = (val / total) * 360;

      // Adjust padAngle for tiny slices or single item
      const safePadAngle = count > 1 ? Math.min(padAngle, rawSpan * 0.3) : 0;
      const sliceSpan = Math.max(0, rawSpan - safePadAngle);

      const startAngle = currentAngle + safePadAngle / 2;
      const endAngle = startAngle + sliceSpan;
      const midAngle = startAngle + sliceSpan / 2;

      currentAngle += rawSpan;

      const color =
        item.color ||
        (item.tone ? TONE_COLORS[item.tone] : null) ||
        DEFAULT_COLORS[idx % DEFAULT_COLORS.length];

      const pathData = buildArcPath(
        centerCoord,
        centerCoord,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle
      );

      const midRad = ((midAngle - 90) * Math.PI) / 180;
      const centroidR = innerRadius + (outerRadius - innerRadius) / 2;
      const centroidX = centerCoord + centroidR * Math.cos(midRad);
      const centroidY = centerCoord + centroidR * Math.sin(midRad);

      return {
        item,
        index: idx,
        value: val,
        percent,
        startAngle,
        endAngle,
        midAngle,
        color,
        pathData,
        centroidX,
        centroidY,
      };
    });
  }, [data, total, padAngle, centerCoord, innerRadius, outerRadius]);

  const activeSlice = activeIdx !== null && activeIdx !== undefined && activeIdx >= 0 && activeIdx < slices.length
    ? slices[activeIdx]
    : null;

  const handleSliceHover = (index: number, e: React.MouseEvent<SVGPathElement>) => {
    if (!interactive) return;
    setInternalHoveredIndex(index);
    onActiveChange?.(index, data[index]);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!interactive || activeIdx === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSliceLeave = () => {
    if (!interactive) return;
    setInternalHoveredIndex(null);
    setTooltipPos(null);
    onActiveChange?.(null, null);
  };

  const chartElement = (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Zero State / Empty Ring */}
      {slices.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-full border-2 border-dashed border-border/80 w-44 h-44 text-center p-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
            NO ADMISSION DATA
          </span>
          <span className="mt-1 font-mono text-xs text-muted-foreground/60">
            0 TICKETS
          </span>
        </div>
      ) : (
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
          role="img"
          aria-label="Donut Chart"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleSliceLeave}
        >
          {/* Subtle Outer Guideline Ring */}
          <circle
            cx={centerCoord}
            cy={centerCoord}
            r={outerRadius + 2}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="3 3"
          />

          {/* Slices */}
          <g>
            {slices.map((slice) => {
              const isHovered = activeIdx === slice.index;
              const hasActiveSlice = activeIdx !== null && activeIdx !== undefined;
              const opacity = hasActiveSlice ? (isHovered ? 1 : 0.45) : 1;

              // Outward translation vector for active slice
              const midRad = ((slice.midAngle - 90) * Math.PI) / 180;
              const hoverOffset = isHovered ? 5 : 0;
              const dx = Math.cos(midRad) * hoverOffset;
              const dy = Math.sin(midRad) * hoverOffset;

              return (
                <path
                  key={slice.index}
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="var(--color-card, #fffdf5)"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  className={cn(
                    "transition-all duration-200",
                    interactive && "cursor-pointer focus-visible:outline-none"
                  )}
                  style={{
                    transform: `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`,
                    opacity,
                    filter: isHovered ? "drop-shadow(0 4px 6px rgba(0,0,0,0.18))" : "none",
                  }}
                  onMouseEnter={(e) => handleSliceHover(slice.index, e)}
                  onFocus={() => {
                    if (interactive) {
                      setInternalHoveredIndex(slice.index);
                      onActiveChange?.(slice.index, slice.item);
                    }
                  }}
                  onBlur={handleSliceLeave}
                  tabIndex={interactive ? 0 : -1}
                  role="graphics-symbol"
                  aria-label={`${slice.item.label}: ${formatValue(slice.value)} (${formatPercent(slice.percent)})`}
                />
              );
            })}
          </g>

          {/* Optional Inner Guide Ring for Donut */}
          {variant === "donut" && innerRadius > 0 && (
            <circle
              cx={centerCoord}
              cy={centerCoord}
              r={Math.max(0, innerRadius - 2)}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeDasharray="2 2"
            />
          )}
        </svg>
      )}

      {/* Center Readout Overlay for Donut */}
      {variant === "donut" && showCenterText && slices.length > 0 && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-2"
          style={{
            maxWidth: `${innerRadius * 1.8}px`,
            maxHeight: `${innerRadius * 1.8}px`,
            margin: "auto",
          }}
        >
          {activeSlice ? (
            <div className="animate-fade-in flex flex-col items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-bold truncate max-w-[110px]">
                {activeSlice.item.label}
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black tracking-tight text-foreground leading-tight mt-0.5">
                {formatValue(activeSlice.value)}
              </span>
              <span className="inline-block mt-0.5 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-xs border border-dashed border-border bg-secondary text-accent">
                {formatPercent(activeSlice.percent)}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                {centerLabel}
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black tracking-tight text-foreground leading-tight mt-0.5">
                {centerValue !== undefined ? centerValue : formatValue(total)}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 truncate max-w-[110px]">
                {centerSubtext || `${data.length} SECTORS`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Floating Interactive Tooltip */}
      {showTooltip && activeSlice && tooltipPos && (
        <div
          className="pointer-events-none absolute z-30 transition-transform duration-75 ease-out"
          style={{
            left: `${tooltipPos.x + 12}px`,
            top: `${tooltipPos.y - 34}px`,
          }}
        >
          <div className="flex items-center gap-2 rounded-xs border-2 border-dashed border-border bg-card/95 px-2.5 py-1.5 shadow-xl backdrop-blur-xs">
            <span
              className="size-2.5 rounded-xs shrink-0 border border-foreground/20"
              style={{ backgroundColor: activeSlice.color }}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-foreground">
                  {activeSlice.item.label}
                </span>
                <span className="font-mono text-[10px] font-bold text-accent">
                  {formatPercent(activeSlice.percent)}
                </span>
              </div>
              <span className="font-mono text-[9px] text-muted-foreground">
                {formatValue(activeSlice.value)} TICKETS
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Legend Element
  const legendElement = showLegend && data.length > 0 && (
    <div
      className={cn(
        "grid gap-2 select-none",
        legendPosition === "right"
          ? "grid-cols-1 justify-center py-2"
          : "grid-cols-2 sm:grid-cols-3 pt-2"
      )}
    >
      {slices.map((slice) => {
        const isHovered = activeIdx === slice.index;
        return (
          <button
            key={slice.index}
            type="button"
            className={cn(
              "group flex items-center justify-between gap-2 px-2 py-1 rounded-xs border border-transparent text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer",
              isHovered
                ? "border-dashed border-foreground/40 bg-secondary shadow-xs scale-[1.02]"
                : "hover:border-dashed hover:border-border hover:bg-secondary/40"
            )}
            onMouseEnter={() => {
              if (interactive) {
                setInternalHoveredIndex(slice.index);
                onActiveChange?.(slice.index, slice.item);
              }
            }}
            onMouseLeave={handleSliceLeave}
            onClick={() => {
              if (interactive) {
                const nextIdx = activeIdx === slice.index ? null : slice.index;
                setInternalHoveredIndex(nextIdx);
                onActiveChange?.(nextIdx, nextIdx !== null ? data[nextIdx] : null);
              }
            }}
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="size-2.5 rounded-xs shrink-0 border border-foreground/20"
                style={{ backgroundColor: slice.color }}
              />
              <span className="font-mono text-[11px] font-bold uppercase tracking-tight text-foreground truncate">
                {slice.item.label}
              </span>
            </div>
            <div className="flex items-center gap-1 text-right shrink-0">
              <span className="font-mono text-[11px] text-muted-foreground">
                {formatValue(slice.value)}
              </span>
              <span className="font-mono text-[10px] text-accent font-bold">
                ({formatPercent(slice.percent)})
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );

  if (frameVariant === "bare") {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4",
          legendPosition === "right" && "sm:flex-row sm:items-center",
          className
        )}
        {...props}
      >
        {chartElement}
        {legendElement}
      </div>
    );
  }

  // Full Ticket Stub Framing
  return (
    <div
      className={cn(
        "relative rounded-lg border-2 border-foreground bg-card text-card-foreground shadow-sm select-none overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Ticket Stub Header Banner */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-border bg-secondary/50 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">
            {title}
          </span>
          {subtitle && (
            <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground uppercase">
              {"// "}{subtitle}
            </span>
          )}
        </div>
        <span className="rounded-xs border border-dashed border-foreground/30 bg-background px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-muted-foreground">
          {ticketSerial}
        </span>
      </div>

      {/* Notches on Outer Perforation Boundary */}
      <div className="relative">
        <div className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-background border-2 border-foreground z-10" />
        <div className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-background border-2 border-foreground z-10" />

        {/* Content Area */}
        <div
          className={cn(
            "p-5 flex flex-col items-center justify-center gap-4",
            legendPosition === "right" && "sm:flex-row sm:items-center sm:gap-6"
          )}
        >
          {legendPosition === "top" && legendElement}
          {chartElement}
          {legendPosition !== "top" && legendElement}
        </div>
      </div>

      {/* Ticket Stub Perforated Footer */}
      <div className="flex items-center justify-between border-t-2 border-dashed border-border px-4 py-2 bg-secondary/20">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          TOTAL DISTRIBUTION: {formatValue(total)} UNITS
        </span>
        <span className="font-mono text-[9px] uppercase font-bold text-accent">
          {activeSlice ? `HIGHLIGHT: ${activeSlice.item.label}` : "HOVER SEGMENT TO INSPECT"}
        </span>
      </div>
    </div>
  );
}
