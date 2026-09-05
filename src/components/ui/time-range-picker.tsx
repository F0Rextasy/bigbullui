"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TimeRangePickerProps {
  value?: [string, string];
  defaultValue?: [string, string];
  onValueChange?: (value: [string, string]) => void;
  className?: string;
}

export function TimeRangePicker({
  value: controlledValue,
  defaultValue: defaultVals,
  onValueChange,
  className,
}: TimeRangePickerProps) {
  const [internalValue, setInternalValue] = React.useState<[string, string]>(
    defaultVals ?? ["09:00", "17:00"]
  );
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const [startTime, setStartTime] = React.useState(currentValue[0]);
  const [endTime, setEndTime] = React.useState(currentValue[1]);

  React.useEffect(() => {
    if (isControlled) {
      setStartTime(controlledValue?.[0] ?? "");
      setEndTime(controlledValue?.[1] ?? "");
    }
  }, [isControlled, controlledValue]);

  const handleStartChange = (val: string) => {
    setStartTime(val);
    onValueChange?.([val, endTime]);
  };

  const handleEndChange = (val: string) => {
    setEndTime(val);
    onValueChange?.([startTime, val]);
  };

  const formatTime = (t: string) => {
    const [hRaw, mRaw] = t.split(":");
    const h24 = parseInt(hRaw, 10) || 0;
    const m = parseInt(mRaw, 10) || 0;
    const ampm = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 || 12;
    return `${h12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const durationMinutes = Math.max(
    0,
    ((new Date(`2000-01-01T${endTime}`).getTime() -
      new Date(`2000-01-01T${startTime}`).getTime()) /
      60000)
  );
  const durationHours = durationMinutes / 60;

  const startClasses = cn(
    "rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:border-solid focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  );
  const endClasses = cn(
    "rounded-md border border-input bg-transparent px-3 py-2 font-mono text-sm placeholder-text-muted-foreground focus-visible:outline-none focus-visible:border-solid focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
  );

  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 rounded-md border border-border bg-card p-4 font-mono",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-muted-foreground">Start</span>
        <input
          type="time"
          value={startTime}
          onChange={(e) => handleStartChange(e.target.value)}
          className={startClasses}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-muted-foreground">End</span>
        <input
          type="time"
          value={endTime}
          onChange={(e) => handleEndChange(e.target.value)}
          className={endClasses}
        />
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-border/40">
        <span className="font-mono uppercase tracking-[0.15em] text-[10px] text-muted-foreground">Duration</span>
        <span
          className={cn(
            "font-mono uppercase tracking-[0.15em] text-[10px]",
            durationMinutes > 0 && "text-accent-foreground",
            "animate-pulse-ring"
          )}
        >
          {durationHours.toFixed(1)} hr{durationHours > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

TimeRangePicker.displayName = "TimeRangePicker";

