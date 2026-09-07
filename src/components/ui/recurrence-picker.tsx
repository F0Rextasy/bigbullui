"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RecurrencePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const FREQS = ["Daily", "Weekly", "Monthly"] as const;
const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

/** Recurrence rule picker with weekday stamps. */
export function RecurrencePicker({ value, onValueChange, className, ...props }: RecurrencePickerProps) {
  const [freq, setFreq] = React.useState<(typeof FREQS)[number]>("Weekly");
  const [days, setDays] = React.useState<string[]>(["FRI"]);
  const [count, setCount] = React.useState(6);
  const summary = `${freq}${freq === "Weekly" && days.length ? ` on ${[...days].sort().join(", ")}` : ""}, ${count} shows`;
  React.useEffect(() => { onValueChange?.(summary); }, [summary, onValueChange]);
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Recurrence picker</p>
      <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Frequency">
        {FREQS.map((f) => (
          <button key={f} type="button" role="radio" aria-checked={freq === f} onClick={() => setFreq(f)} className={cn("flex-1 rounded border px-2 py-1 font-mono text-[11px] font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", freq === f ? "border-foreground bg-primary text-primary-foreground" : "border-dashed border-border text-muted-foreground hover:text-foreground")}>
            {f}
          </button>
        ))}
      </div>
      {freq === "Weekly" && (
        <div className="mt-2 flex flex-wrap gap-1">
          {WEEKDAYS.map((d) => {
            const on = days.includes(d);
            return (
              <button key={d} type="button" aria-pressed={on} onClick={() => setDays((prev) => (on ? prev.filter((x) => x !== d) : [...prev, d]))} className={cn("rounded border px-2 py-1 font-mono text-[10px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", on ? "border-foreground bg-accent text-accent-foreground" : "border-dashed border-border text-muted-foreground")}>
                {d}
              </button>
            );
          })}
        </div>
      )}
      <label className="mt-2 flex items-center gap-2 font-mono text-[11px] uppercase text-muted-foreground">
        Repeat count
        <input type="number" min={1} max={52} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-16 rounded border border-dashed border-border bg-secondary/40 px-2 py-1 font-mono text-xs text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      </label>
      <p className="mt-2 rounded bg-secondary px-2 py-1 font-mono text-[11px] font-bold uppercase text-accent" aria-live="polite">{value ?? summary}</p>
    </div>
  );
}
