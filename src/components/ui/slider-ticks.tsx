"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SliderTicksProps {
  min?: number;
  max?: number;
  step?: number;
  ticks?: number[];
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  className?: string;
}

export function SliderTicks({
  min = 0,
  max = 100,
  step = 1,
  ticks: providedTicks,
  value: controlledValue,
  defaultValue: defaultVal,
  onValueChange,
  className,
}: SliderTicksProps) {
  const ticks = providedTicks ?? [];
  const [internalValue, setInternalValue] = React.useState<number>(defaultVal ?? min);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  React.useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue);
    }
  }, [isControlled, controlledValue]);

  const handleChange = (val: number) => {
    setInternalValue(val);
    onValueChange?.(val);
  };

  // Calculate tick positions
  const tickPositions: number[] = [];
  const tickLabels: (string | null)[] = [];

  // Generate ticks based on step
  for (let i = min; i <= max; i += step) {
    tickPositions.push(i);
    tickLabels.push(String(i));
  }

  // Add provided ticks if not already included
  providedTicks?.forEach(t => {
    if (!tickPositions.includes(t)) {
      tickPositions.push(t);
      tickLabels.push(String(t));
    }
  });

  const percent = ((currentValue - min) / (max - min)) * 100;

  const trackRef = React.useRef<HTMLDivElement>(null);
  const handleDrag = (clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newVal = Math.round(min + (max - min) * (clamped / 100));
    handleChange(newVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const stepVal = step;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      handleChange(currentValue + stepVal);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      handleChange(currentValue - stepVal);
    }
  };

  const trackClasses = cn(
    "relative h-1.5 rounded-full bg-border/30 overflow-hidden",
    "motion-reduce:transition-none",
  );

  const thumbClasses = cn(
    "absolute -translate-x-1/2 bottom-full -bottom-1 rounded-full bg-ring w-4 h-4",
    "motion-reduce:transition-none",
  );

  const labelClasses = cn(
    "font-[10px] uppercase tracking-[0.15em] text-[10px] text-muted-foreground",
    "absolute bottom-full left-[calc(-50%_-_4px)] mb-1 text-center",
  );

  return (
    <div
      className={cn(
        "relative w-full min-h-6",
        className,
      )}
    >
      <div
        ref={trackRef}
        className={trackClasses}
        onMouseDown={(e) => {
          handleDrag(e.clientX);
          const handleMove = (moveEvent: MouseEvent) => handleDrag(moveEvent.clientX);
          const handleUp = () => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("mouseup", handleUp);
          };
          document.addEventListener("mousemove", handleMove);
          document.addEventListener("mouseup", handleUp);
        }}
        onKeyDown={handleKeyDown}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={currentValue}
      >
        {/* Tick marks row */}
        <div className="flex text-[10px] uppercase tracking-[0.15em]">
          {tickPositions.map((pos, idx) => {
            const posPercent = ((pos - min) / (max - min)) * 100;
            const label = tickLabels[idx] ?? "";
            const isMajor = ticks.includes(pos);
            return (
              <div
                key={pos}
                className={cn(
                  "flex-1 px-0.5 text-center",
                  isMajor && "font-medium text-accent-foreground",
                  !isMajor && "text-muted-foreground",
                  "motion-reduce:transition-none",
                )}
              >
                <span className={labelClasses} style={{ left: `${posPercent}%` }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Track background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-ring/20 via-transparent to-ring/20"
        />

        {/* Thumb */}
        <div
          className={cn(
            thumbClasses,
            `transform translateX(${percent}%)`,
          )}
        />
      </div>
    </div>
  );
}

SliderTicks.displayName = "SliderTicks";

