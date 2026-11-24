"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { mergeRefs } from "./lib/react-compat";
import { useDirection, type Direction } from "./lib/direction";

export type SliderProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "defaultValue"> & {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  disabled?: boolean;
  dir?: Direction;
  "aria-label"?: string;
  "aria-valuetext"?: string;
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
      dir: dirProp,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [internal, setInternal] = React.useState(defaultValue);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const dir = useDirection(dirProp);
    const current = value ?? internal;
    const percent = max > min ? ((current - min) / (max - min)) * 100 : 0;

    React.useEffect(() => {
      const form = inputRef.current?.closest("form");
      if (!form) return;
      const handleReset = () => {
        if (value === undefined) setInternal(defaultValue);
      };
      form.addEventListener("reset", handleReset);
      return () => form.removeEventListener("reset", handleReset);
    }, [value, defaultValue]);

    return (
      <input
        ref={mergeRefs(ref, inputRef)}
        type="range"
        dir={dirProp}
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
        style={{ "--fill-pct": `${percent}%`, ...style } as React.CSSProperties}
        className={cn(
          "h-6 w-full cursor-pointer appearance-none bg-transparent disabled:pointer-events-none disabled:opacity-50",
          dir === "rtl"
            ? "[&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_left,var(--color-accent-strong)_0_var(--fill-pct,50%),var(--color-secondary)_var(--fill-pct,50%)_100%)] [&::-moz-range-track]:bg-[linear-gradient(to_left,var(--color-accent-strong)_0_var(--fill-pct,50%),var(--color-secondary)_var(--fill-pct,50%)_100%)]"
            : "[&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-accent-strong)_0_var(--fill-pct,50%),var(--color-secondary)_var(--fill-pct,50%)_100%)] [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-accent-strong)_0_var(--fill-pct,50%),var(--color-secondary)_var(--fill-pct,50%)_100%)]",
          "[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-sm [&::-webkit-slider-runnable-track]:border [&::-webkit-slider-runnable-track]:border-border [&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-sm [&::-moz-range-track]:border [&::-moz-range-track]:border-border [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-[4px] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-foreground [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:mt-[-6px] [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-[4px] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-foreground [&::-moz-range-thumb]:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          className
        )}
        {...props}
      />
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
