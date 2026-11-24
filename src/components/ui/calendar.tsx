"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { useIsMounted } from "./lib/react-compat";

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLElement>, "value" | "defaultValue"> {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (d: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  weekStartsOn?: 0 | 1;
  "aria-label"?: string;
  className?: string;
}

const DEFAULT_CALENDAR_DATE = new Date(2026, 0, 1);

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function Calendar({
  value: controlledValue,
  defaultValue,
  onValueChange,
  minDate,
  maxDate,
  locale = "en-US",
  weekStartsOn = 0,
  "aria-label": ariaLabel = "Calendar",
  className, ...props
}: CalendarProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedDate = isControlled ? controlledValue : uncontrolledValue;

  const [viewDate, setViewDate] = React.useState(() => selectedDate ?? DEFAULT_CALENDAR_DATE);
  const [focusedDate, setFocusedDate] = React.useState<Date>(() => selectedDate ?? DEFAULT_CALENDAR_DATE);
  const mounted = useIsMounted();
  const gridRef = React.useRef<HTMLDivElement>(null);
  const headerId = React.useId();

  const today = mounted ? new Date() : null;
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
    [locale]
  );
  const fullDateFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    [locale]
  );

  const weekdays = React.useMemo(() => {
    const shortFmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
    const longFmt = new Intl.DateTimeFormat(locale, { weekday: "long" });
    return Array.from({ length: 7 }, (_, idx) => {
      const d = new Date(2024, 0, 7 + ((idx + weekStartsOn) % 7));
      return {
        short: shortFmt.format(d).slice(0, 2).toUpperCase(),
        long: longFmt.format(d),
      };
    });
  }, [locale, weekStartsOn]);

  const isOutOfRange = (d: Date) => {
    const target = startOfDay(d).getTime();
    if (minDate && target < startOfDay(minDate).getTime()) return true;
    if (maxDate && target > startOfDay(maxDate).getTime()) return true;
    return false;
  };

  const prevMonth = () => {
    const next = new Date(year, month - 1, 1);
    setViewDate(next);
    setFocusedDate(next);
  };
  const nextMonth = () => {
    const next = new Date(year, month + 1, 1);
    setViewDate(next);
    setFocusedDate(next);
  };

  const handleSelectDate = (newDate: Date) => {
    if (isOutOfRange(newDate)) return;
    if (!isControlled) {
      setUncontrolledValue(newDate);
    }
    setFocusedDate(newDate);
    onValueChange?.(newDate);
  };

  const focusAndNavigateTo = (next: Date) => {
    setFocusedDate(next);
    if (next.getFullYear() !== year || next.getMonth() !== month) {
      setViewDate(new Date(next.getFullYear(), next.getMonth(), 1));
    }
    const iso = toIsoDate(next);
    requestAnimationFrame(() => {
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${iso}"]`)?.focus();
    });
  };

  const handleGridKeyDown = (e: React.KeyboardEvent, dayDate: Date) => {
    let next: Date | null = null;
    if (e.key === "ArrowLeft") {
      next = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() - 1);
    } else if (e.key === "ArrowRight") {
      next = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 1);
    } else if (e.key === "ArrowUp") {
      next = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() - 7);
    } else if (e.key === "ArrowDown") {
      next = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + 7);
    } else if (e.key === "Home") {
      const offset = (dayDate.getDay() - weekStartsOn + 7) % 7;
      next = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() - offset);
    } else if (e.key === "End") {
      const offset = 6 - ((dayDate.getDay() - weekStartsOn + 7) % 7);
      next = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate() + offset);
    } else if (e.key === "PageUp") {
      next = new Date(dayDate.getFullYear(), dayDate.getMonth() - (e.shiftKey ? 12 : 1), dayDate.getDate());
    } else if (e.key === "PageDown") {
      next = new Date(dayDate.getFullYear(), dayDate.getMonth() + (e.shiftKey ? 12 : 1), dayDate.getDate());
    }
    if (next) {
      e.preventDefault();
      focusAndNavigateTo(next);
    }
  };

  const rawFirstDay = new Date(year, month, 1).getDay();
  const leadingBlanks = (rawFirstDay - weekStartsOn + 7) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex w-72 flex-col rounded-xl border-2 border-foreground bg-card p-4 shadow-sm select-none",
        className
      )} {...props}
    >
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-3">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="flex size-7 items-center justify-center rounded-sm border border-border bg-secondary font-mono text-xs hover:bg-foreground hover:text-background cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ←
        </button>
        <span
          id={headerId}
          aria-live="polite"
          className="font-mono text-xs font-bold uppercase tracking-wider text-foreground"
        >
          {monthFormatter.format(viewDate)}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="flex size-7 items-center justify-center rounded-sm border border-border bg-secondary font-mono text-xs hover:bg-foreground hover:text-background cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          →
        </button>
      </div>

      <div role="grid" ref={gridRef} aria-labelledby={headerId} className="mt-3">
        <div
          role="row"
          className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] font-semibold uppercase text-muted-foreground"
        >
          {weekdays.map((wd) => (
            <div key={wd.long} role="columnheader" aria-label={wd.long} className="py-1">
              {wd.short}
            </div>
          ))}
        </div>

        <div role="rowgroup" className="mt-1 grid grid-cols-7 gap-1 text-center font-mono text-xs">
          {Array.from({ length: leadingBlanks }).map((_, i) => (
            <div key={`blank-${i}`} role="gridcell" aria-hidden="true" className="size-8" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const cellDate = new Date(year, month, day);
            const cellDisabled = isOutOfRange(cellDate);
            const selected = Boolean(selectedDate && isSameDay(selectedDate, cellDate));
            const todayFlag = Boolean(today && isSameDay(today, cellDate));
            const isFocusedDay =
              isSameDay(focusedDate, cellDate) ||
              (!isSameDay(focusedDate, cellDate) &&
                day === 1 &&
                (focusedDate.getMonth() !== month || focusedDate.getFullYear() !== year));

            return (
              <div key={`day-${day}`} role="gridcell" aria-selected={selected}>
                <button
                  type="button"
                  data-date={toIsoDate(cellDate)}
                  tabIndex={isFocusedDay ? 0 : -1}
                  disabled={cellDisabled}
                  aria-label={fullDateFormatter.format(cellDate)}
                  aria-pressed={selected}
                  aria-current={todayFlag ? "date" : undefined}
                  onClick={() => handleSelectDate(cellDate)}
                  onKeyDown={(e) => handleGridKeyDown(e, cellDate)}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full font-mono text-xs transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    cellDisabled
                      ? "cursor-not-allowed opacity-35 text-muted-foreground"
                      : "cursor-pointer",
                    selected
                      ? "bg-accent font-bold text-accent-foreground shadow-xs"
                      : todayFlag
                      ? "border border-accent font-bold text-accent"
                      : !cellDisabled && "hover:bg-secondary text-foreground"
                  )}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
