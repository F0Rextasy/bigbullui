"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function Rating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  onValueChange,
  disabled = false,
  className,
  "aria-label": ariaLabel = "Rating",
}: RatingProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : uncontrolledValue;

  const [hoverVal, setHoverVal] = React.useState<number | null>(null);

  const displayVal = hoverVal !== null ? hoverVal : currentVal;

  const handleSelect = (val: number) => {
    if (disabled) return;
    if (!isControlled) {
      setUncontrolledValue(val);
    }
    onValueChange?.(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(currentVal + 1, max);
      handleSelect(next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      const prev = Math.max(currentVal - 1, 0);
      handleSelect(prev);
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={cn("inline-flex items-center gap-1.5", disabled && "opacity-50", className)}
    >
      <div className="flex items-center gap-1" onMouseLeave={() => setHoverVal(null)}>
        {Array.from({ length: max }, (_, i) => {
          const starValue = i + 1;
          const isFilled = starValue <= displayVal;
          return (
            <button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={starValue === currentVal}
              aria-label={`${starValue} of ${max} stars`}
              disabled={disabled}
              onClick={() => handleSelect(starValue)}
              onMouseEnter={() => !disabled && setHoverVal(starValue)}
              className={cn(
                "rounded-sm p-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                !disabled && "cursor-pointer hover:scale-110 active:scale-95"
              )}
            >
              <svg
                viewBox="0 0 20 20"
                className={cn(
                  "size-5 transition-colors",
                  isFilled
                    ? "fill-accent stroke-accent"
                    : "fill-transparent stroke-muted-foreground hover:stroke-foreground"
                )}
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <polygon points="10 2 12.9 8.2 19.5 9.1 14.7 13.6 15.9 20 10 16.7 4.1 20 5.3 13.6 0.5 9.1 7.1 8.2 10 2" />
              </svg>
            </button>
          );
        })}
      </div>
      <span className="ml-1.5 font-mono text-xs text-muted-foreground">
        {currentVal}/{max}
      </span>
    </div>
  );
}
