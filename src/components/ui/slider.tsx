"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type SliderProps = {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
};

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value,
      defaultValue = 50,
      min = 0,
      max = 100,
      step = 1,
      onValueChange,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState(defaultValue);
    const current = value ?? internal;

    return (
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        disabled={disabled}
        onChange={(event) => {
          const next = Number(event.target.value);
          if (value === undefined) setInternal(next);
          onValueChange?.(next);
        }}
        className={cn(
          "h-6 w-full cursor-pointer appearance-none bg-transparent disabled:pointer-events-none disabled:opacity-50 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-sm [&::-webkit-slider-runnable-track]:border [&::-webkit-slider-runnable-track]:border-border [&::-webkit-slider-runnable-track]:bg-secondary [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-sm [&::-moz-range-track]:border [&::-moz-range-track]:border-border [&::-moz-range-track]:bg-secondary [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[4px] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-[4px] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-foreground [&::-moz-range-thumb]:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        {...props}
      />
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
