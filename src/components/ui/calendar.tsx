"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (d: Date) => void;
  className?: string;
}

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];

const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export function Calendar({
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
}: CalendarProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | undefined>(
    defaultValue || new Date()
  );
  const isControlled = controlledValue !== undefined;
  const selectedDate = isControlled ? controlledValue : uncontrolledValue;

  const [viewDate, setViewDate] = React.useState(selectedDate || new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  // Days calculations
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleSelectDay = (day: number) => {
    const newDate = new Date(year, month, day);
    if (!isControlled) {
      setUncontrolledValue(newDate);
    }
    onValueChange?.(newDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  return (
    <div
      className={cn(
        "inline-flex flex-col rounded-xl border-2 border-foreground bg-card p-4 shadow-sm select-none w-72",
        className
      )}
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-3">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="size-7 rounded-sm border border-border bg-secondary flex items-center justify-center font-mono text-xs hover:bg-foreground hover:text-background cursor-pointer transition-colors"
        >
          ←
        </button>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          {MONTHS[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="size-7 rounded-sm border border-border bg-secondary flex items-center justify-center font-mono text-xs hover:bg-foreground hover:text-background cursor-pointer transition-colors"
        >
          →
        </button>
      </div>

      {/* Weekday Row */}
      <div className="mt-3 grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase text-muted-foreground font-semibold">
        {DAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="mt-1 grid grid-cols-7 gap-1 text-center font-mono text-xs">
        {/* Blanks for initial offset */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`blank-${i}`} className="size-8" />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const selected = isSelected(day);
          const today = isToday(day);

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => handleSelectDay(day)}
              className={cn(
                "size-8 rounded-full flex items-center justify-center font-mono text-xs transition-all cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected
                  ? "bg-accent font-bold text-accent-foreground shadow-xs scale-105"
                  : today
                  ? "border border-accent text-accent font-bold"
                  : "hover:bg-secondary text-foreground"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
