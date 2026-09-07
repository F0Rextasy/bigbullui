"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DateTimeValue {
  date: string;
  time: string;
}

export interface DateTimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: DateTimeValue;
  defaultValue?: DateTimeValue;
  onValueChange?: (value: DateTimeValue) => void;
  label?: string;
  minDate?: string;
}

function toDate(v: DateTimeValue): Date | null {
  if (!v.date || !v.time) return null;
  const d = new Date(`${v.date}T${v.time}`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function DateTimePicker({
  value: controlledValue,
  defaultValue = { date: "", time: "" },
  onValueChange,
  label,
  minDate,
  className,
  ...props
}: DateTimePickerProps) {
  const [inner, setInner] = React.useState<DateTimeValue>(defaultValue);
  const value = controlledValue ?? inner;

  const set = (patch: Partial<DateTimeValue>) => {
    const next = { ...value, ...patch };
    setInner(next);
    onValueChange?.(next);
  };

  const preview = toDate(value);

  return (
    <div className={cn("w-full", className)} {...props}>
      {label ? (
        <span className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="mb-1 block font-mono text-[10px] uppercase text-muted-foreground">Date</span>
          <input
            type="date"
            value={value.date}
            min={minDate}
            onChange={(e) => set({ date: e.target.value })}
            className="w-full rounded-md border border-border bg-card px-3 py-2 font-mono text-sm transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <label className="block">
          <span className="mb-1 block font-mono text-[10px] uppercase text-muted-foreground">Time</span>
          <input
            type="time"
            value={value.time}
            onChange={(e) => set({ time: e.target.value })}
            className="w-full rounded-md border border-border bg-card px-3 py-2 font-mono text-sm transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </div>
      <p className="mt-2 font-mono text-[11px] text-muted-foreground" aria-live="polite">
        {preview
          ? preview.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
          : "Pick a date and time"}
      </p>
    </div>
  );
}
