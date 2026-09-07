"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BookingCalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  booked?: number[];
  monthLabel?: string;
  onSelect?: (day: number) => void;
}

/** Month grid with booked stamps and selection. */
export function BookingCalendar({ booked = [4, 11, 18], monthLabel = "October 2026", onSelect, className, ...props }: BookingCalendarProps) {
  const [selected, setSelected] = React.useState<number | null>(null);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <div className="flex items-center justify-between border-b border-dashed border-border pb-2">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-foreground">{monthLabel}</p>
        <span className="rounded bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">{booked.length} booked</span>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1" role="grid" aria-label={monthLabel}>
        {days.map((d) => {
          const isBooked = booked.includes(d);
          const isSel = selected === d;
          return (
            <button
              key={d}
              type="button"
              role="gridcell"
              aria-selected={isSel}
              disabled={isBooked}
              onClick={() => { setSelected(d); onSelect?.(d); }}
              className={cn(
                "aspect-square rounded border font-mono text-[11px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isBooked ? "border-dashed border-border bg-muted text-muted-foreground line-through" : isSel ? "border-foreground bg-accent font-bold text-accent-foreground" : "border-border bg-card text-foreground hover:border-foreground"
              )}
            >
              {d}
            </button>
          );
        })}
      </div>
      {selected && <p className="mt-2 font-mono text-[11px] uppercase text-accent" aria-live="polite">Held day {selected} for booking</p>}
    </div>
  );
}
