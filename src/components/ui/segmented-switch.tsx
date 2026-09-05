"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type SegmentedSwitchTone = "default" | "success" | "warning" | "danger" | "accent";

export interface SegmentedSwitchOption {
  value: string;
  label: string;
  tone?: SegmentedSwitchTone;
  badge?: string;
  description?: string;
  disabled?: boolean;
}

export interface SegmentedSwitchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  options?: Array<SegmentedSwitchOption | string>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label?: string;
  gateCode?: string;
  showLeverGraphic?: boolean;
  className?: string;
}

const DEFAULT_OPTIONS: SegmentedSwitchOption[] = [
  { value: "ADMIT", label: "ADMIT", tone: "success", badge: "01" },
  { value: "HOLD", label: "HOLD", tone: "warning", badge: "02" },
  { value: "DENIED", label: "DENIED", tone: "danger", badge: "03" },
];

function normalizeOptions(raw?: Array<SegmentedSwitchOption | string>): SegmentedSwitchOption[] {
  if (!raw || raw.length === 0) return DEFAULT_OPTIONS;
  return raw.map((item, index) => {
    if (typeof item === "string") {
      let tone: SegmentedSwitchTone = "default";
      const upper = item.toUpperCase();
      if (upper.includes("ADMIT") || upper.includes("PASS") || upper.includes("ALLOW")) {
        tone = "success";
      } else if (upper.includes("HOLD") || upper.includes("PAUSE") || upper.includes("WAIT")) {
        tone = "warning";
      } else if (upper.includes("DENIED") || upper.includes("REJECT") || upper.includes("BLOCK") || upper.includes("STOP")) {
        tone = "danger";
      }
      return {
        value: item,
        label: item,
        tone,
        badge: `0${index + 1}`,
      };
    }
    return {
      ...item,
      badge: item.badge ?? `0${index + 1}`,
      tone: item.tone ?? "default",
    };
  });
}

export function SegmentedSwitch({
  options: rawOptions,
  value,
  defaultValue,
  onChange,
  size = "md",
  disabled = false,
  label = "TURNSTILE LEVER CONTROL",
  gateCode = "GATE-04",
  showLeverGraphic = true,
  className,
  ...props
}: SegmentedSwitchProps) {
  const options = React.useMemo(() => normalizeOptions(rawOptions), [rawOptions]);

  const [internalValue, setInternalValue] = React.useState<string>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return options[0]?.value ?? "ADMIT";
  });

  const currentValue = value !== undefined ? value : internalValue;

  const activeIndex = Math.max(
    0,
    options.findIndex((opt) => opt.value === currentValue)
  );

  const activeOption = options[activeIndex] || options[0];

  const handleSelect = (val: string, isDisabled?: boolean) => {
    if (disabled || isDisabled) return;
    if (value === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    let targetIndex = activeIndex;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      targetIndex = (activeIndex + 1) % options.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      targetIndex = (activeIndex - 1 + options.length) % options.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      targetIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      targetIndex = options.length - 1;
    } else {
      return;
    }

    const nextOpt = options[targetIndex];
    if (nextOpt && !nextOpt.disabled) {
      handleSelect(nextOpt.value);
    }
  };

  // Turnstile lever arm rotation calculation
  const leverRotation = React.useMemo(() => {
    if (options.length <= 1) return 0;
    // Map activeIndex across -45deg to +45deg
    const fraction = activeIndex / (options.length - 1);
    return -45 + fraction * 90;
  }, [activeIndex, options.length]);

  // Tone color schemes
  const getLedGlow = (tone?: SegmentedSwitchTone) => {
    switch (tone) {
      case "success":
        return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]";
      case "warning":
        return "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]";
      case "danger":
        return "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]";
      case "accent":
        return "bg-accent shadow-[0_0_10px_rgba(var(--accent),0.8)]";
      default:
        return "bg-foreground shadow-[0_0_8px_rgba(120,120,120,0.6)]";
    }
  };

  const getToneTextColor = (tone?: SegmentedSwitchTone, isSelected?: boolean) => {
    if (!isSelected) return "text-muted-foreground hover:text-foreground";
    switch (tone) {
      case "success":
        return "text-emerald-600 dark:text-emerald-400 font-black";
      case "warning":
        return "text-amber-600 dark:text-amber-400 font-black";
      case "danger":
        return "text-rose-600 dark:text-rose-400 font-black";
      case "accent":
        return "text-accent font-black";
      default:
        return "text-foreground font-black";
    }
  };

  // Size styling maps
  const heightClasses = {
    sm: "h-9 text-xs",
    md: "h-11 text-xs sm:text-sm",
    lg: "h-14 text-sm sm:text-base",
  }[size];

  const count = options.length;
  const carriageWidthPct = count > 0 ? 100 / count : 100;

  return (
    <div
      className={cn("w-full max-w-md select-none font-mono", className)}
      onKeyDown={handleKeyDown}
      role="radiogroup"
      aria-label={label}
      aria-disabled={disabled}
      {...props}
    >
      {/* =========================================================================
          TURNSTILE RATCHET HEADER & METADATA BAR
         ========================================================================= */}
      <div className="mb-2 flex items-center justify-between px-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        <div className="flex items-center gap-2">
          {/* Animated Turnstile Ratchet Lever Icon */}
          {showLeverGraphic && (
            <div className="relative size-6 shrink-0 rounded border border-dashed border-border bg-card flex items-center justify-center shadow-xs">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: `rotate(${leverRotation}deg)`,
                  transition: "transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
                className={cn(
                  "origin-center transition-colors",
                  activeOption?.tone === "success" && "text-emerald-500",
                  activeOption?.tone === "warning" && "text-amber-500",
                  activeOption?.tone === "danger" && "text-rose-500",
                  activeOption?.tone === "accent" && "text-accent",
                  activeOption?.tone === "default" && "text-foreground"
                )}
                aria-hidden="true"
              >
                {/* Tripod turnstile arms */}
                <circle cx="12" cy="12" r="3" fill="currentColor" />
                <line x1="12" y1="9" x2="12" y2="3" />
                <line x1="14.6" y1="13.5" x2="19.8" y2="16.5" />
                <line x1="9.4" y1="13.5" x2="4.2" y2="16.5" />
              </svg>
            </div>
          )}
          <span>{label}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-sm border border-dashed border-border px-1.5 py-0.5 text-[9px] text-muted-foreground">
            {gateCode}
          </span>
          <span
            className={cn(
              "inline-block size-2 rounded-full transition-colors duration-300",
              getLedGlow(activeOption?.tone)
            )}
            title={`Status: ${activeOption?.label}`}
          />
        </div>
      </div>

      {/* =========================================================================
          MECHANICAL SWITCH BODY CONTAINER (WITH NOTCHES)
         ========================================================================= */}
      <div
        className={cn(
          "relative rounded-xl border-2 border-foreground bg-secondary/50 p-1 shadow-sm transition-all",
          disabled && "pointer-events-none opacity-50 cursor-not-allowed"
        )}
      >
        {/* Left Edge Perimeter Punch Hole Notch */}
        <div
          aria-hidden="true"
          className="absolute -left-2.5 top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-foreground bg-background z-20 shadow-inner"
        />
        {/* Right Edge Perimeter Punch Hole Notch */}
        <div
          aria-hidden="true"
          className="absolute -right-2.5 top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-foreground bg-background z-20 shadow-inner"
        />

        {/* Inner Track */}
        <div className="relative flex w-full items-stretch">
          {/* =====================================================================
              SLIDING MECHANICAL LEVER CARRIAGE (SHUTTLE)
             ===================================================================== */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 z-10 pointer-events-none p-0.5"
            style={{
              width: `${carriageWidthPct}%`,
              transform: `translateX(${activeIndex * 100}%)`,
              transition: "transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div className="relative h-full w-full rounded-lg border-2 border-foreground bg-card shadow-md flex flex-col justify-between py-1 px-2">
              {/* Carriage Top Grip Ridges (3 mechanical ribs) */}
              <div className="flex items-center justify-center gap-1 opacity-70">
                <span className="h-1.5 w-0.5 rounded-full bg-foreground" />
                <span className="h-2 w-0.5 rounded-full bg-foreground" />
                <span className="h-1.5 w-0.5 rounded-full bg-foreground" />
              </div>

              {/* Carriage Bottom LED indicator line */}
              <div className="flex items-center justify-center">
                <span
                  className={cn(
                    "h-1 w-6 rounded-full transition-all duration-300",
                    getLedGlow(activeOption?.tone)
                  )}
                />
              </div>
            </div>
          </div>

          {/* =====================================================================
              SEGMENT BUTTONS & NOTCH DIVIDERS
             ===================================================================== */}
          {options.map((opt, index) => {
            const isSelected = opt.value === currentValue;
            const isLast = index === options.length - 1;

            return (
              <React.Fragment key={opt.value}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  disabled={disabled || opt.disabled}
                  onClick={() => handleSelect(opt.value, opt.disabled)}
                  className={cn(
                    "relative z-20 flex flex-1 items-center justify-center gap-1.5 px-2 font-mono uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 rounded-md",
                    heightClasses,
                    getToneTextColor(opt.tone, isSelected),
                    opt.disabled && "cursor-not-allowed opacity-40",
                    !isSelected && "hover:bg-foreground/5 active:scale-95"
                  )}
                >
                  {/* Micro Index Badge */}
                  {opt.badge && (
                    <span
                      className={cn(
                        "text-[9px] tracking-tighter opacity-60 transition-opacity",
                        isSelected && "opacity-100 font-bold"
                      )}
                    >
                      [{opt.badge}]
                    </span>
                  )}

                  {/* Main Label */}
                  <span className="truncate">{opt.label}</span>

                  {/* Micro Tone Icon Badge */}
                  {opt.tone === "success" && (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn("shrink-0", isSelected ? "opacity-100" : "opacity-40")}
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {opt.tone === "warning" && (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn("shrink-0", isSelected ? "opacity-100" : "opacity-40")}
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                  {opt.tone === "danger" && (
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn("shrink-0", isSelected ? "opacity-100" : "opacity-40")}
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  )}
                </button>

                {/* Perforation Divider between segments with top/bottom punch holes */}
                {!isLast && (
                  <div
                    aria-hidden="true"
                    className="relative z-0 flex flex-col items-center justify-between py-0.5"
                  >
                    {/* Top Micro Notch */}
                    <span className="size-2 -mt-1.5 rounded-full border border-foreground/60 bg-background shrink-0" />
                    {/* Vertical Dashed Line */}
                    <span className="h-full w-0 border-r-2 border-dashed border-border/80" />
                    {/* Bottom Micro Notch */}
                    <span className="size-2 -mb-1.5 rounded-full border border-foreground/60 bg-background shrink-0" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          STATUS FOOTER FEEDBACK
         ========================================================================= */}
      <div className="mt-2 flex items-center justify-between px-1 text-[9px] font-semibold text-muted-foreground uppercase tracking-widest">
        <span>STATE: [{activeOption?.value || "N/A"}]</span>
        <span className="flex items-center gap-1">
          <span>TURNSTILE:</span>
          <span
            className={cn(
              "font-bold",
              activeOption?.tone === "success" && "text-emerald-600 dark:text-emerald-400",
              activeOption?.tone === "warning" && "text-amber-600 dark:text-amber-400",
              activeOption?.tone === "danger" && "text-rose-600 dark:text-rose-400",
              activeOption?.tone === "accent" && "text-accent",
              activeOption?.tone === "default" && "text-foreground"
            )}
          >
            {activeOption?.value === "ADMIT"
              ? "GATE UNLOCKED // PASS"
              : activeOption?.value === "HOLD"
              ? "WAITING ON INSPECTION"
              : activeOption?.value === "DENIED"
              ? "ENTRY REFUSED // BARRED"
              : activeOption?.label}
          </span>
        </span>
      </div>
    </div>
  );
}
