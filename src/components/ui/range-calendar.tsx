"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RangeCalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  start?: string;
  end?: string;
  defaultStart?: string;
  defaultEnd?: string;
  onRangeChange?: (start: string, end: string) => void;
  monthOffset?: number;
}

function toYmd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function RangeCalendar({
  start: controlledStart,
  end: controlledEnd,
  defaultStart = "",
  defaultEnd = "",
  onRangeChange,
  monthOffset = 0,
  className,
  ...props
}: RangeCalendarProps) {
  const [innerStart, setInnerStart] = React.useState(defaultStart);
  const [innerEnd, setInnerEnd] = React.useState(defaultEnd);
  const start = controlledStart ?? innerStart;
  const end = controlledEnd ?? innerEnd;

  const base = new Date();
  base.setDate(1);
  base.setMonth(base.getMonth() + monthOffset);
  const year = base.getFullYear();
  const month = base.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadBlanks = (new Date(year, month, 1).getDay() + 6) % 7;

  const pick = (ymd: string) => {
    let s = start;
    let e = end;
    if (!s || (s && e)) {
      s = ymd;
      e = "";
    } else if (ymd < s) {
      s = ymd;
    } else {
      e = ymd;
    }
    setInnerStart(s);
    setInnerEnd(e);
    onRangeChange?.(s, e);
  };

  const monthName = base.toLocaleString(undefined, { month: "long", year: "numeric" });
  const nights = start && end
    ? Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000)
    : 0;

  return (
    <div className={cn("w-full max-w-xs", className)} {...props}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold uppercase tracking-widest">{monthName}</span>
        {nights > 0 ? (
          <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-bold text-accent-foreground">
            {nights} nights
          </span>
        ) : null}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1" role="grid" aria-label={monthName}>
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="pb-1 text-center font-mono text-[10px] text-muted-foreground">
            {d}
          </span>
        ))}
        {Array.from({ length: leadBlanks }).map((_, i) => (
          <span key={`b-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const ymd = toYmd(new Date(year, month, i + 1));
          const inRange = start !== "" && end !== "" && ymd >= start && ymd <= end;
          const isEdge = ymd === start || (end !== "" && ymd === end);
          return (
            <button
              key={ymd}
              type="button"
              onClick={() => pick(ymd)}
              aria-pressed={inRange}
              aria-label={ymd}
              className={cn(
                "cursor-pointer rounded-sm py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isEdge
                  ? "bg-accent font-bold text-accent-foreground"
                  : inRange
                    ? "bg-accent/20 text-foreground"
                    : "hover:bg-secondary",
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
