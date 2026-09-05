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
  defaultValue = new Date().getMonth(),
  onValueChange,
  year: controlledYear,
  onYearChange,
  className,
}: MonthPickerProps) {
  const year = controlledYear ?? new Date().getFullYear();
  const month = controlledValue ?? defaultValue;

  const [internalMonth, setInternalMonth] = React.useState(month);
  const [internalYear, setInternalYear] = React.useState(year);
  const isControlled = controlledValue !== undefined;

  React.useEffect(() => {
    if (isControlled) {
      setInternalMonth(controlledValue!);
      setInternalYear(controlledYear ?? new Date().getFullYear());
    }
  }, [isControlled, controlledValue, controlledYear]);

  const prevYear = internalYear - 1;
  const nextYear = internalYear + 1;

  const handleMonthSelect = (m: number) => {
    setInternalMonth(m);
    onValueChange?.(m);
  };

  const handleYearChange = (y: number) => {
    setInternalYear(y);
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
            onClick={() => handleYearChange(prevYear)}
            className="prev-year hover:text-muted-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6L3 9l6-3 6 6-6 6Z" />
            </svg>
          </button>
          <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-muted-foreground">
            {MONTHS[internalMonth]}
          </span>
          <span className="mx-2 text-[10px]/7 uppercase tracking-wider">/</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{internalYear}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleYearChange(nextYear)}
            className="next-year hover:text-muted-foreground transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6v-3L15 9l-6-6 6-6Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 12 }, (_, i) => i).map((monthIdx) => {
          const isSelected = internalMonth === monthIdx;
          const handleClick = () => {
            setInternalMonth(monthIdx);
            onValueChange?.(monthIdx);
          };

          const bgClass = cn(
            "rounded-sm px-3 py-1.5 cursor-pointer select-none",
            isSelected && "bg-accent text-accent-foreground",
            "hover:bg-accent/20 transition-colors"
          );

          return (
            <div
              key={monthIdx}
              onClick={handleClick}
              className={bgClass}
            >
              {MONTHS[monthIdx]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

MonthPicker.displayName = "MonthPicker";

