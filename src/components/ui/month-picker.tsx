"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MonthPickerProps {
  value?: number; // 0-11
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  year?: number;
  onYearChange?: (year: number) => void;
  className?: string;
}

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

export function MonthPicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  year: controlledYear,
  onYearChange,
  className,
}: MonthPickerProps) {
  const [internalMonth, setInternalMonth] = React.useState(() => controlledValue ?? defaultValue ?? 0);
  const [internalYear, setInternalYear] = React.useState(() => controlledYear ?? 2026);
  const isControlled = controlledValue !== undefined;
  const activeMonth = isControlled ? controlledValue : internalMonth;
  const activeYear = controlledYear ?? internalYear;

  React.useEffect(() => {
    if (controlledValue !== undefined || defaultValue !== undefined) {
      if (controlledYear !== undefined) return;
    }
    const id = setTimeout(() => {
      const now = new Date();
      if (controlledValue === undefined && defaultValue === undefined) {
        setInternalMonth(now.getMonth());
      }
      if (controlledYear === undefined) {
        setInternalYear(now.getFullYear());
      }
    }, 0);
    return () => clearTimeout(id);
  }, [controlledValue, defaultValue, controlledYear]);

  const prevYear = activeYear - 1;
  const nextYear = activeYear + 1;

  const handleMonthSelect = (m: number) => {
    if (!isControlled) setInternalMonth(m);
    onValueChange?.(m);
  };

  const handleYearChange = (y: number) => {
    if (controlledYear === undefined) setInternalYear(y);
    onYearChange?.(y);
  };

  return (
    <div
      className={cn(
        "relative rounded-md border border-border bg-card p-4 font-mono",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleYearChange(prevYear)}
            aria-label="Previous year"
            className="prev-year hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6L3 9l6-3 6 6-6 6Z" />
            </svg>
          </button>
          <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-muted-foreground">
            {MONTHS[activeMonth]}
          </span>
          <span className="mx-2 text-[10px]/7 uppercase tracking-wider">/</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{activeYear}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleYearChange(nextYear)}
            aria-label="Next year"
            className="next-year hover:text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6v-3L15 9l-6-6 6-6Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 12 }, (_, i) => i).map((monthIdx) => {
          const isSelected = activeMonth === monthIdx;
          const bgClass = cn(
            "rounded-sm px-3 py-1.5 text-left cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            isSelected && "bg-accent text-accent-foreground",
            "hover:bg-accent/20 transition-colors"
          );

          return (
            <button
              key={monthIdx}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleMonthSelect(monthIdx)}
              className={bgClass}
            >
              {MONTHS[monthIdx]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

MonthPicker.displayName = "MonthPicker";

