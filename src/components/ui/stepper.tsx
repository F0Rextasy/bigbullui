"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function Stepper({
  value: controlledValue,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  disabled = false,
  className,
  "aria-label": ariaLabel = "Stepper",
}: StepperProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : uncontrolledValue;

  const clamp = React.useCallback(
    (val: number) => Math.min(Math.max(val, min), max),
    [min, max]
  );

  const updateValue = (nextVal: number) => {
    const clamped = clamp(nextVal);
    if (!isControlled) {
      setUncontrolledValue(clamped);
    }
    onValueChange?.(clamped);
  };

  const handleDecrement = () => {
    if (disabled || currentVal <= min) return;
    updateValue(currentVal - step);
  };

  const handleIncrement = () => {
    if (disabled || currentVal >= max) return;
    updateValue(currentVal + step);
  };

  const isMin = currentVal <= min;
  const isMax = currentVal >= max;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center rounded-md border-2 border-dashed border-border bg-card p-1",
        disabled && "opacity-50",
        className
      )}
    >
      <button
        type="button"
        disabled={disabled || isMin}
        onClick={handleDecrement}
        aria-label="Decrease value"
        className={cn(
          "flex size-8 items-center justify-center rounded-sm border border-border bg-secondary font-mono text-sm font-bold transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isMin || disabled
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:bg-primary hover:text-primary-foreground active:scale-95"
        )}
      >
        −
      </button>

      <span
        aria-live="polite"
        className="min-w-12 px-3 text-center font-mono text-sm font-semibold tracking-wider text-foreground"
      >
        {currentVal}
      </span>

      <button
        type="button"
        disabled={disabled || isMax}
        onClick={handleIncrement}
        aria-label="Increase value"
        className={cn(
          "flex size-8 items-center justify-center rounded-sm border border-border bg-secondary font-mono text-sm font-bold transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isMax || disabled
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer hover:bg-primary hover:text-primary-foreground active:scale-95"
        )}
      >
        +
      </button>
    </div>
  );
}
