"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TimeRangePickerProps {
  value?: [string, string];
  defaultValue?: [string, string];
  onValueChange?: (value: [string, string]) => void;
  className?: string;
}

function parseMinutes(hhmm: string): number | null {
  const m = /^(\d{2}):(\d{2})$/.exec(hhmm.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return h * 60 + min;
}

export function TimeRangePicker({
  value: controlledValue,
  defaultValue: defaultVals,
  onValueChange,
  className,
}: TimeRangePickerProps) {
  const [innerValue, setInnerValue] = React.useState<[string, string]>(
    defaultVals ?? ["09:00", "17:00"],
  );
  const isControlled = controlledValue !== undefined;
  const [startTime, endTime] = isControlled ? controlledValue : innerValue;
  const startId = React.useId();
  const endId = React.useId();

  const handleStartChange = (val: string) => {
    const next: [string, string] = [val, endTime];
    if (!isControlled) setInnerValue(next);
    onValueChange?.(next);
  };

  const handleEndChange = (val: string) => {
    const next: [string, string] = [startTime, val];
    if (!isControlled) setInnerValue(next);
    onValueChange?.(next);
  };

  const startMins = parseMinutes(startTime);
  const endMins = parseMinutes(endTime);
  let durationMinutes = 0;
  if (startMins !== null && endMins !== null) {
    durationMinutes = endMins >= startMins ? endMins - startMins : 1440 - startMins + endMins;
  }
  const durationHours = durationMinutes / 60;

  const inputClasses =
    "rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-solid focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 rounded-md border border-border bg-card p-4 font-mono",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={startId} className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Start
        </label>
        <input
          id={startId}
          type="time"
          value={startTime}
          onChange={(e) => handleStartChange(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <label htmlFor={endId} className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          End
        </label>
        <input
          id={endId}
          type="time"
          value={endTime}
          onChange={(e) => handleEndChange(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border/40 pt-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Duration</span>
        <span
          className={cn(
            "font-mono text-[10px] font-bold uppercase tracking-[0.15em]",
            durationMinutes > 0 ? "text-accent-strong" : "text-muted-foreground",
          )}
        >
          {durationHours.toFixed(1)} hr{durationHours === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}

TimeRangePicker.displayName = "TimeRangePicker";
