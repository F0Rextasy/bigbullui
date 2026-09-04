"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TimeInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string; // "19:30" or "07:30 PM"
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  format24h?: boolean;
  className?: string;
}

export function TimeInput({
  value: controlledValue,
  defaultValue = "19:30",
  onValueChange,
  format24h = true,
  className,
  ...props
}: TimeInputProps) {
  const [internalVal, setInternalVal] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : internalVal;

  const [hours, minutes] = React.useMemo(() => {
    const parts = currentVal.split(":");
    return [
      parseInt(parts[0] || "19", 10),
      parseInt(parts[1] || "30", 10),
    ];
  }, [currentVal]);

  const updateTime = (newH: number, newM: number) => {
    const clampedH = (newH + 24) % 24;
    const clampedM = (newM + 60) % 60;
    const pad = (n: number) => n.toString().padStart(2, "0");
    const formatted = `${pad(clampedH)}:${pad(clampedM)}`;
    if (!isControlled) {
      setInternalVal(formatted);
    }
    onValueChange?.(formatted);
  };

  const handleHourStep = (delta: number) => updateTime(hours + delta, minutes);
  const handleMinuteStep = (delta: number) => updateTime(hours, minutes + delta);

  return (
    <div
      className={cn(
        "inline-flex flex-col gap-1.5 font-mono select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1">
        {/* Hours Box */}
        <div className="flex flex-col items-center rounded-md border-2 border-foreground bg-card p-1 shadow-xs">
          <button
            type="button"
            onClick={() => handleHourStep(1)}
            className="size-5 flex items-center justify-center text-[10px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            aria-label="Increase hours"
          >
            ▲
          </button>
          <span className="w-8 text-center text-sm font-bold text-foreground">
            {hours.toString().padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => handleHourStep(-1)}
            className="size-5 flex items-center justify-center text-[10px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            aria-label="Decrease hours"
          >
            ▼
          </button>
        </div>

        <span className="text-sm font-bold text-muted-foreground animate-pulse">:</span>

        {/* Minutes Box */}
        <div className="flex flex-col items-center rounded-md border-2 border-foreground bg-card p-1 shadow-xs">
          <button
            type="button"
            onClick={() => handleMinuteStep(5)}
            className="size-5 flex items-center justify-center text-[10px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            aria-label="Increase minutes"
          >
            ▲
          </button>
          <span className="w-8 text-center text-sm font-bold text-foreground">
            {minutes.toString().padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => handleMinuteStep(-5)}
            className="size-5 flex items-center justify-center text-[10px] text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            aria-label="Decrease minutes"
          >
            ▼
          </button>
        </div>

        {!format24h && (
          <button
            type="button"
            onClick={() => handleHourStep(12)}
            className="ml-1 rounded-md border border-dashed border-border bg-secondary px-2 py-2 text-xs font-bold text-foreground hover:bg-foreground hover:text-background cursor-pointer transition-colors"
          >
            {hours >= 12 ? "PM" : "AM"}
          </button>
        )}
      </div>

      <span className="text-[10px] tracking-widest text-muted-foreground uppercase text-center">
        SHOWTIME
      </span>
    </div>
  );
}
