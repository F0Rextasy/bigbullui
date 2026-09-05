"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DateRangePickerProps {
  value?: [Date, Date];
  defaultValue?: [Date, Date];
  onValueChange?: (value: [Date, Date] | undefined) => void;
  min?: Date;
  max?: Date;
  className?: string;
}

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export function DateRangePicker({
  value: controlledValue,
  defaultValue: defaultVals,
  onValueChange,
  min,
  max,
  className,
}: DateRangePickerProps) {
  const [internalValue, setInternalValue] = React.useState<[Date, Date] | undefined>(defaultVals);
  const [viewDate, setViewDate] = React.useState<Date>(() => defaultVals?.[0] || new Date());
  const [focusedMonth, setFocusedMonth] = React.useState<Date>(() => new Date());
  const [selectedStart, setSelectedStart] = React.useState<Date | undefined>(defaultVals?.[0]);
  const [selectedEnd, setSelectedEnd] = React.useState<Date | undefined>(defaultVals?.[1]);

  const isControlled = controlledValue !== undefined;
  const currentStart = isControlled ? controlledValue[0] : selectedStart;
  const currentEnd = isControlled ? controlledValue[1] : selectedEnd;

  React.useEffect(() => {
    if (isControlled) {
      setSelectedStart(controlledValue?.[0]);
      setSelectedEnd(controlledValue?.[1]);
    }
  }, [isControlled, controlledValue]);

  const adjustDate = (d: Date, min: Date, max: Date) => {
    if (d < min) return new Date(min);
    if (d > max) return new Date(max);
    return new Date(d);
  };

  const renderMonth = (date: Date, isStart: boolean) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay + daysInMonth; i++) {
      if (i < firstDay) {
        days.push(null);
      } else {
        days.push(i - firstDay + 1);
      }
    }

    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    return (
      <div key={`${year}-${month}`} className="relative">
        <div className="flex justify-between mb-2">
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="prev-button absolute left-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6L3 9l6-3 6 6-6 6Z" />
            </svg>
          </button>
          <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-muted-foreground">
            {MONTHS[month]} {year}
          </span>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="next-button absolute right-0"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6v-3L15 9l-6-6 6-6Z" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((day) => (
            <div key={day} className="font-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 pt-1">
          {days.map((day, idx) => {
            if (day === null) return null;
            const dayDate = new Date(year, month, day);
            const isToday = dayDate.getFullYear() === today.getFullYear() &&
              dayDate.getMonth() === today.getMonth() &&
              dayDate.getDate() === today.getDate();
            const isStartSelected = selectedStart && dayDate.getTime() === selectedStart.getTime();
            const isEndSelected = selectedEnd && dayDate.getTime() === selectedEnd.getTime();
            const isBetween = selectedStart && selectedEnd &&
              dayDate >= selectedStart && dayDate <= selectedEnd;
            const isDisabled = min && dayDate < min || max && dayDate > max;

            const handleClick = () => {
              if (isDisabled) return;

              if (isStartSelected && !isEndSelected) {
                // Click on same start: select end from here
                const afterStart = days.find(d => d && new Date(year, month, d).getTime() >= selectedStart.getTime());
                if (afterStart) {
                  setSelectedEnd(new Date(year, month, afterStart));
                  onValueChange?.([selectedStart, new Date(year, month, afterStart)]);
                }
              } else if (!isStartSelected) {
                setSelectedStart(dayDate);
                setSelectedEnd(undefined);
                onValueChange?.(undefined);
              } else if (isStartSelected && isEndSelected && dayDate.getTime() === selectedStart.getTime()) {
                setSelectedStart(undefined);
                setSelectedEnd(undefined);
                onValueChange?.(undefined);
              } else if (isStartSelected && !isEndSelected && dayDate.getTime() > selectedStart.getTime()) {
                setSelectedEnd(dayDate);
                onValueChange?.([selectedStart, dayDate]);
              } else {
                // Reset and select this as start
                setSelectedStart(dayDate);
                setSelectedEnd(undefined);
                onValueChange?.(undefined);
              }
            };

            const bgClass = cn(
              "rounded-sm px-1.5 py-1.5 cursor-pointer select-none",
              isToday && "bg-primary/10 text-primary-foreground",
              isStartSelected && "bg-accent text-accent-foreground",
              isEndSelected && "bg-accent text-accent-foreground",
              isBetween && "bg-accent/10 text-accent-foreground",
              isDisabled && "opacity-50 cursor-not-allowed",
              "hover:bg-accent/20 transition-colors"
            );

            return (
              <div
                key={idx}
                onClick={handleClick}
                className={bgClass}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "relative flex w-full rounded-md border border-border bg-card p-4 font-mono",
        className,
      )}
    >
      <div className="flex gap-2">
        <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-muted-foreground start-label">
          Start:
        </span>
        <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-accent-strong selected-start">
          {currentStart ? `${MONTHS[currentStart.getMonth()]} ${currentStart.getDate()}` : "Select start"}
        </span>
      </div>
      <div className="flex gap-2">
        <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-muted-foreground end-label">
          End:
        </span>
        <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-accent-strong selected-end">
          {currentEnd ? `${MONTHS[currentEnd.getMonth()]} ${currentEnd.getDate()}` : "Select end"}
        </span>
      </div>

      <div className="relative flex-1 mt-4">
        {renderMonth(new Date(viewDate.getFullYear(), viewDate.getMonth(), 1), true)}
        {renderMonth(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1), false)}
      </div>

      <div className="mt-3 pt border-t border-border/40">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {selectedStart && currentEnd ? `Nights: ${Math.max(0, (currentEnd.getTime() - selectedStart.getTime()) / 86400000)}` : ""}
          </span>
          <button
            onClick={() => {
              setSelectedStart(undefined);
              setSelectedEnd(undefined);
              onValueChange?.(undefined);
            }}
            className="text-[10px] uppercase tracking-[0.15em] text-secondary-foreground hover:text-destructive transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

DateRangePicker.displayName = "DateRangePicker";

