"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DurationValue {
  hours: number;
  minutes: number;
  seconds?: number;
}

export interface DurationInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: DurationValue;
  defaultValue?: DurationValue;
  onValueChange?: (value: DurationValue) => void;
  showSeconds?: boolean;
  label?: string;
}

/** Süre girişi: saat/dakika(/saniye) stepper. */
export function DurationInput({ value, defaultValue = { hours: 0, minutes: 0 }, onValueChange, showSeconds = false, label = "Süre", className, ...props }: DurationInputProps) {
  const [internal, setInternal] = React.useState<DurationValue>(defaultValue);
  const current = value ?? internal;

  const set = (patch: Partial<DurationValue>) => {
    const next = { ...current, ...patch };
    setInternal(next);
    onValueChange?.(next);
  };

  const unit = (key: "hours" | "minutes" | "seconds", max: number, label: string) => (
    <div className="flex flex-col items-center gap-0.5">
      <button
        onClick={() => set({ [key]: Math.min(max, (current[key] ?? 0) + 1) } as Partial<DurationValue>)}
        className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
        aria-label={`${label} artır`}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
      </button>
      <span className="w-10 rounded-md border border-dashed border-border bg-card py-1 text-center font-mono text-base font-bold tabular-nums">
        {String(current[key] ?? 0).padStart(2, "0")}
      </span>
      <button
        onClick={() => set({ [key]: Math.max(0, (current[key] ?? 0) - 1) } as Partial<DurationValue>)}
        className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
        aria-label={`${label} azalt`}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      <span className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );

  return (
    <div className={cn("inline-flex items-start gap-2 rounded-lg border border-border bg-background p-3", className)} role="group" aria-label={label} {...props}>
      <style>{`@keyframes durIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
      {unit("hours", 99, "Saat")}
      <span className="pt-6 font-mono text-lg text-muted-foreground" aria-hidden="true">:</span>
      {unit("minutes", 59, "Dakika")}
      {showSeconds && (
        <>
          <span className="pt-6 font-mono text-lg text-muted-foreground" aria-hidden="true">:</span>
          {unit("seconds", 59, "Saniye")}
        </>
      )}
    </div>
  );
}
