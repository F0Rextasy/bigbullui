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

function dayStamp(d: Date): number {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}

export function DateRangePicker({
  value: controlledValue,
  defaultValue: defaultVals,
  onValueChange,
  min,
  max,
  className,
}: DateRangePickerProps) {
  const [innerRange, setInnerRange] = React.useState<[Date | undefined, Date | undefined]>(() => [
    defaultVals?.[0],
    defaultVals?.[1],
  ]);
  const [draftStart, setDraftStart] = React.useState<Date | undefined>(undefined);
  const [viewDate, setViewDate] = React.useState<Date>(
    () => controlledValue?.[0] || defaultVals?.[0] || new Date(2024, 0, 1),
  );
  const [todayStamp, setTodayStamp] = React.useState<number | null>(null);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setTodayStamp(dayStamp(new Date()));
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const isControlled = controlledValue !== undefined;
  const currentStart = draftStart ?? (isControlled ? controlledValue[0] : innerRange[0]);
  const currentEnd = draftStart ? undefined : isControlled ? controlledValue[1] : innerRange[1];

  const startStamp = currentStart ? dayStamp(currentStart) : undefined;
  const endStamp = currentEnd ? dayStamp(currentEnd) : undefined;
  const minStamp = min ? dayStamp(min) : undefined;
  const maxStamp = max ? dayStamp(max) : undefined;

  const handleDayClick = (dayDate: Date) => {
    const clicked = dayStamp(dayDate);
    if ((minStamp !== undefined && clicked < minStamp) || (maxStamp !== undefined && clicked > maxStamp)) {
      return;
    }

    if (!currentStart || (currentStart && currentEnd)) {
      setDraftStart(dayDate);
      if (!isControlled) setInnerRange([dayDate, undefined]);
      onValueChange?.(undefined);
      return;
    }

    const [rangeStart, rangeEnd] =
      clicked < dayStamp(currentStart) ? [dayDate, currentStart] : [currentStart, dayDate];
    setDraftStart(undefined);
    if (!isControlled) setInnerRange([rangeStart, rangeEnd]);
    onValueChange?.([rangeStart, rangeEnd]);
  };

  const renderMonth = (date: Date, showPrev: boolean, showNext: boolean) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay + daysInMonth; i++) {
      cells.push(i < firstDay ? null : i - firstDay + 1);
    }

    return (
      <div key={`${year}-${month}`} className="min-w-0">
        <div className="mb-2 flex items-center justify-between gap-2">
          {showPrev ? (
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          ) : (
            <span className="size-6" aria-hidden="true" />
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {MONTHS[month]} {year}
          </span>
          {showNext ? (
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="rounded p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          ) : (
            <span className="size-6" aria-hidden="true" />
          )}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {DAYS.map((day) => (
            <div key={day} className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 pt-1">
          {cells.map((day, idx) => {
            if (day === null) {
              return <span key={`blank-${idx}`} aria-hidden="true" />;
            }
            const dayDate = new Date(year, month, day);
            const stamp = dayStamp(dayDate);
            const isToday = todayStamp !== null && stamp === todayStamp;
            const isStartSelected = startStamp !== undefined && stamp === startStamp;
            const isEndSelected = endStamp !== undefined && stamp === endStamp;
            const isBetween =
              startStamp !== undefined && endStamp !== undefined && stamp >= startStamp && stamp <= endStamp;
            const isDisabled =
              (minStamp !== undefined && stamp < minStamp) || (maxStamp !== undefined && stamp > maxStamp);

            return (
              <button
                key={`${year}-${month}-${day}`}
                type="button"
                disabled={isDisabled}
                aria-pressed={isStartSelected || isEndSelected || isBetween}
                aria-label={dayDate.toDateString()}
                onClick={() => handleDayClick(dayDate)}
                className={cn(
                  "cursor-pointer select-none rounded-sm px-1.5 py-1.5 text-center font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isToday && !isStartSelected && !isEndSelected && "bg-primary/10 font-bold text-foreground",
                  isBetween && !isStartSelected && !isEndSelected && "bg-accent/15 text-accent-strong",
                  (isStartSelected || isEndSelected) && "bg-accent font-bold text-accent-foreground",
                  isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-accent/20",
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const nights =
    startStamp !== undefined && endStamp !== undefined
      ? Math.max(0, Math.round((endStamp - startStamp) / 86400000))
      : null;

  return (
    <div
      className={cn(
        "relative flex w-full flex-col gap-3 rounded-md border border-border bg-card p-4 font-mono",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-border pb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Start:
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-accent-strong">
            {currentStart ? `${MONTHS[currentStart.getMonth()]} ${currentStart.getDate()}` : "Select start"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            End:
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-accent-strong">
            {currentEnd ? `${MONTHS[currentEnd.getMonth()]} ${currentEnd.getDate()}` : "Select end"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {renderMonth(new Date(viewDate.getFullYear(), viewDate.getMonth(), 1), true, false)}
        {renderMonth(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1), false, true)}
      </div>

      <div className="border-t border-border/40 pt-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {nights !== null ? `Nights: ${nights}` : ""}
          </span>
          <button
            type="button"
            onClick={() => {
              setDraftStart(undefined);
              if (!isControlled) setInnerRange([undefined, undefined]);
              onValueChange?.(undefined);
            }}
            className="rounded px-1.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-secondary-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

DateRangePicker.displayName = "DateRangePicker";
