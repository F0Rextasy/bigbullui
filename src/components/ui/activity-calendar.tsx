"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ActivityCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Record<string, number>;
  weeks?: number;
  label?: string;
}

function toYmd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function ActivityCalendar({
  data = {},
  weeks = 12,
  label,
  className,
  ...props
}: ActivityCalendarProps) {
  const today = new Date();
  const days: { date: string; value: number }[] = [];
  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = toYmd(d);
    days.push({ date: key, value: data[key] ?? 0 });
  }
  const max = Math.max(...days.map((d) => d.value), 1);
  const total = days.reduce((a, d) => a + d.value, 0);

  const cols: { date: string; value: number }[][] = Array.from({ length: weeks }, (_, w) =>
    days.slice(w * 7, w * 7 + 7),
  );

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex items-baseline justify-between">
        {label ? (
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {label}
          </span>
        ) : (
          <span />
        )}
        <span className="font-mono text-[11px] text-muted-foreground">
          {total} contributions
        </span>
      </div>
      <div className="mt-2 flex gap-1 overflow-x-auto pb-1" role="img" aria-label={`Activity over last ${weeks} weeks, ${total} total`}>
        {cols.map((col, ci) => (
          <div key={ci} className="flex shrink-0 flex-col gap-1">
            {col.map((day) => {
              const intensity = Math.min(day.value / max, 1);
              return (
                <span
                  key={day.date}
                  title={`${day.date}: ${day.value}`}
                  className="size-3 rounded-[3px] border border-border/40"
                  style={{
                    backgroundColor: day.value === 0 ? "transparent" : "var(--accent)",
                    opacity: day.value === 0 ? 1 : 0.15 + intensity * 0.85,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center justify-end gap-1 font-mono text-[10px] text-muted-foreground">
        <span>Less</span>
        {[0.15, 0.4, 0.65, 1].map((o) => (
          <span key={o} className="size-3 rounded-[3px] border border-border/40" style={{ backgroundColor: "var(--accent)", opacity: o }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
