"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { mergeRefs, useIsMounted } from "./lib/react-compat";
import { useFloating } from "./lib/floating";
import { registerEscapeLayer } from "./lib/focus-trap";

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  minDate?: Date;
  maxDate?: Date;
  locale?: string;
  weekStartsOn?: 0 | 1;
  "aria-label"?: string;
  className?: string;
}

const DEFAULT_VIEW_DATE = new Date(2026, 0, 1);

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

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    value: controlledValue,
    defaultValue,
    onValueChange,
    placeholder = "SELECT ADMISSION DATE",
    disabled = false,
    required = false,
    name,
    id,
    minDate,
    maxDate,
    locale = "en-US",
    weekStartsOn = 0,
    "aria-label": ariaLabel,
    className,
  },
  forwardedRef
) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);

  const mounted = useIsMounted();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const headerId = React.useId();

  const isControlled = controlledValue !== undefined;
  const selectedDate = isControlled ? controlledValue : internalDate;

  const [viewDate, setViewDate] = React.useState(() => selectedDate ?? DEFAULT_VIEW_DATE);
  const [focusedDate, setFocusedDate] = React.useState<Date>(() => selectedDate ?? DEFAULT_VIEW_DATE);
  const userNavigatedRef = React.useRef(Boolean(selectedDate));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const floating = useFloating({
    open: isOpen && mounted,
    referenceRef: triggerRef,
    floatingRef: popoverRef,
    side: "bottom",
    align: "start",
    offset: 8,
  });

  const monthFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
    [locale]
  );
  const triggerDateFormatter = React.useMemo(
    () => new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }),
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
    // 2024-01-07 is Sunday
    return Array.from({ length: 7 }, (_, idx) => {
      const d = new Date(2024, 0, 7 + ((idx + weekStartsOn) % 7));
      return {
        short: shortFmt.format(d).slice(0, 2).toUpperCase(),
        long: longFmt.format(d),
      };
    });
  }, [locale, weekStartsOn]);

  const isOutOfRange = React.useCallback(
    (d: Date) => {
      const target = startOfDay(d).getTime();
      if (minDate && target < startOfDay(minDate).getTime()) return true;
      if (maxDate && target > startOfDay(maxDate).getTime()) return true;
      return false;
    },
    [minDate, maxDate]
  );

  const closePicker = React.useCallback((restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const openPicker = React.useCallback(() => {
    if (disabled) return;
    const anchor =
      selectedDate ??
      (userNavigatedRef.current ? viewDate : minDate ?? new Date());
    setViewDate(new Date(anchor.getFullYear(), anchor.getMonth(), 1));
    setFocusedDate(anchor);
    setIsOpen(true);
    requestAnimationFrame(() => {
      const targetBtn =
        gridRef.current?.querySelector<HTMLButtonElement>('[data-focused-day="true"]') ??
        gridRef.current?.querySelector<HTMLButtonElement>("button:not(:disabled)");
      targetBtn?.focus();
    });
  }, [disabled, selectedDate, viewDate, minDate]);

  React.useEffect(() => {
    const form = triggerRef.current?.closest("form");
    if (!form) return;
    const handleReset = () => {
      if (!isControlled) setInternalDate(defaultValue);
      setIsOpen(false);
    };
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [isControlled, defaultValue]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      closePicker(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    const unregisterEscape = registerEscapeLayer(() => closePicker(true));
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      unregisterEscape();
    };
  }, [isOpen, closePicker]);

  const handleSelectDate = (date: Date) => {
    if (isOutOfRange(date)) return;
    if (!isControlled) setInternalDate(date);
    onValueChange?.(date);
    closePicker(true);
  };

  const focusAndNavigateTo = (next: Date) => {
    userNavigatedRef.current = true;
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
  const today = mounted ? new Date() : null;

  return (
    <div className={cn("relative inline-block font-mono", className)}>
      {name ? (
        <input
          type="hidden"
          name={name}
          value={selectedDate ? toIsoDate(selectedDate) : ""}
          required={required}
          disabled={disabled}
        />
      ) : null}
      <button
        ref={mergeRefs(forwardedRef, triggerRef)}
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-required={required || undefined}
        aria-label={ariaLabel}
        onClick={() => (isOpen ? closePicker(false) : openPicker())}
        className={cn(
          "flex min-w-[220px] items-center justify-between rounded-lg border-2 border-foreground bg-card px-3 py-2 text-xs transition-colors shadow-xs",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          disabled
            ? "cursor-not-allowed opacity-50"
            : isOpen
            ? "cursor-pointer border-accent ring-1 ring-accent"
            : "cursor-pointer hover:border-foreground/70"
        )}
      >
        <span className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-4"
          >
            <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
            <path d="M3.5 9.8h17M8 3v3.6M16 3v3.6M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 16.8h2M11 16.8h2" />
          </svg>
          <span className={cn("font-bold uppercase", !selectedDate && "text-muted-foreground font-normal")}>
            {selectedDate ? triggerDateFormatter.format(selectedDate) : placeholder}
          </span>
        </span>
        <span className="text-[10px] text-muted-foreground" aria-hidden="true">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && mounted
        ? createPortal(
            <div
              ref={popoverRef}
              role="dialog"
              aria-modal="false"
              aria-label="Choose date"
              style={{
                position: "fixed",
                top: floating.top,
                left: floating.left,
                maxWidth: "calc(100vw - 16px)",
              }}
              className="z-50 inline-flex w-72 flex-col rounded-xl border-2 border-foreground bg-card p-4 shadow-2xl outline-1 outline-dashed outline-offset-[-6px] motion-safe:animate-[scale-in_0.15s_ease-out_both] font-mono select-none"
            >
              <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-3">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => {
                    userNavigatedRef.current = true;
                    const nextMonth = new Date(year, month - 1, 1);
                    setViewDate(nextMonth);
                    setFocusedDate(nextMonth);
                  }}
                  className="flex size-7 items-center justify-center rounded-sm border border-border bg-secondary font-mono text-xs hover:bg-foreground hover:text-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  aria-label="Next month"
                  onClick={() => {
                    userNavigatedRef.current = true;
                    const nextMonth = new Date(year, month + 1, 1);
                    setViewDate(nextMonth);
                    setFocusedDate(nextMonth);
                  }}
                  className="flex size-7 items-center justify-center rounded-sm border border-border bg-secondary font-mono text-xs hover:bg-foreground hover:text-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                    const isSelected = Boolean(selectedDate && isSameDay(selectedDate, cellDate));
                    const isToday = Boolean(today && isSameDay(today, cellDate));
                    const isFocusedDay = isSameDay(focusedDate, cellDate) || (!isSameDay(focusedDate, cellDate) && day === 1 && (focusedDate.getMonth() !== month || focusedDate.getFullYear() !== year));

                    return (
                      <div key={`day-${day}`} role="gridcell" aria-selected={isSelected}>
                        <button
                          type="button"
                          data-date={toIsoDate(cellDate)}
                          data-focused-day={isFocusedDay ? "true" : undefined}
                          tabIndex={isFocusedDay ? 0 : -1}
                          disabled={cellDisabled}
                          aria-label={fullDateFormatter.format(cellDate)}
                          aria-pressed={isSelected}
                          aria-current={isToday ? "date" : undefined}
                          onClick={() => handleSelectDate(cellDate)}
                          onKeyDown={(e) => handleGridKeyDown(e, cellDate)}
                          className={cn(
                            "flex size-8 items-center justify-center rounded-full font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            cellDisabled
                              ? "cursor-not-allowed opacity-35 text-muted-foreground"
                              : "cursor-pointer",
                            isSelected
                              ? "bg-accent font-bold text-accent-foreground shadow-xs"
                              : isToday
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
            </div>,
            document.body
          )
        : null}
    </div>
  );
});
DatePicker.displayName = "DatePicker";
