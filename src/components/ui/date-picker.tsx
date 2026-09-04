"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

const MONTHS = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
];
const DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export function DatePicker({
  value: controlledValue,
  defaultValue,
  onValueChange,
  placeholder = "SELECT ADMISSION DATE",
  className,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const selectedDate = isControlled ? controlledValue : internalDate;

  const [viewDate, setViewDate] = React.useState(selectedDate || new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectDay = (day: number) => {
    const newDate = new Date(year, month, day);
    if (!isControlled) {
      setInternalDate(newDate);
    }
    onValueChange?.(newDate);
    setIsOpen(false);
  };

  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, "0");
    const m = MONTHS[date.getMonth()].slice(0, 3);
    const y = date.getFullYear();
    return `${d} ${m} ${y}`;
  };

  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div ref={containerRef} className={cn("relative inline-block font-mono select-none", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex min-w-[220px] cursor-pointer items-center justify-between rounded-lg border-2 border-foreground bg-card px-3 py-2 text-xs transition-all shadow-xs",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isOpen ? "border-accent ring-1 ring-accent" : "hover:border-foreground/70"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">📅</span>
          <span className={cn("font-bold uppercase", !selectedDate && "text-muted-foreground font-normal")}>
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground transition-transform duration-150">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 inline-flex flex-col rounded-xl border-2 border-foreground bg-card p-4 shadow-2xl outline-1 outline-dashed outline-offset-[-6px] animate-[scale-in_0.15s_ease-out_both] w-72">
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-3">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="size-7 rounded-sm border border-border bg-secondary flex items-center justify-center font-mono text-xs hover:bg-foreground hover:text-background cursor-pointer"
            >
              ←
            </button>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="size-7 rounded-sm border border-border bg-secondary flex items-center justify-center font-mono text-xs hover:bg-foreground hover:text-background cursor-pointer"
            >
              →
            </button>
          </div>

          {/* Days labels */}
          <div className="mt-3 grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase text-muted-foreground font-semibold">
            {DAYS.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="mt-1 grid grid-cols-7 gap-1 text-center font-mono text-xs">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} className="size-8" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected =
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year;

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    "size-8 rounded-full flex items-center justify-center font-mono text-xs transition-all cursor-pointer",
                    isSelected
                      ? "bg-accent font-bold text-accent-foreground shadow-xs scale-105"
                      : "hover:bg-secondary text-foreground"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
