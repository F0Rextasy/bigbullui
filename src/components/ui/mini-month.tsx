"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MiniMonthProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: Date;
  onValueChange?: (d: Date) => void;
}

/** Mini month stub: compact 7-col calendar with today ring. */
export function MiniMonth({ value, onValueChange, className, ...props }: MiniMonthProps) {
  const today = new Date();
  const [cursor, setCursor] = React.useState<Date>(value ?? today);
  const [selected, setSelected] = React.useState<Date | undefined>(value);
  const y = cursor.getFullYear();
  const m = cursor.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array.from({ length: first }, () => null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const pick = (d: number) => { const dt = new Date(y, m, d); setSelected(dt); onValueChange?.(dt); };
  return (
    <div className={cn("w-60 rounded-lg border border-border bg-card p-3", className)} {...props}>
      <div className="flex items-center justify-between">
        <button type="button" aria-label="Previous month" onClick={() => setCursor(new Date(y, m - 1, 1))} className="rounded px-1.5 font-mono text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">‹</button>
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-foreground">{cursor.toLocaleString("en-US", { month: "short", year: "numeric" })}</span>
        <button type="button" aria-label="Next month" onClick={() => setCursor(new Date(y, m + 1, 1))} className="rounded px-1.5 font-mono text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">›</button>
      </div>
      <div className="mt-2 grid grid-cols-7 gap-0.5 text-center" role="grid" aria-label="Mini month">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i} className="font-mono text-[9px] uppercase text-muted-foreground">{d}</span>
        ))}
        {cells.map((d, i) =>
          d === null ? (
            <span key={`e-${i}`} />
          ) : (
            <button
              key={d}
              type="button"
              onClick={() => pick(d)}
              aria-pressed={selected?.getDate() === d && selected?.getMonth() === m}
              className={cn(
                "aspect-square rounded font-mono text-[11px] tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected?.getDate() === d && selected?.getMonth() === m
                  ? "bg-accent text-accent-foreground"
                  : d === today.getDate() && m === today.getMonth() && y === today.getFullYear()
                    ? "border border-dashed border-accent text-foreground"
                    : "text-foreground hover:bg-secondary"
              )}
            >
              {d}
            </button>
          )
        )}
      </div>
    </div>
  );
}
