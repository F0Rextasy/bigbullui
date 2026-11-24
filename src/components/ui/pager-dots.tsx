"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { useControllableState } from "./lib/use-controllable-state";

export interface PagerDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  variant?: "dots" | "lines" | "bars";
}

export const PagerDots = React.forwardRef<HTMLDivElement, PagerDotsProps>(function PagerDots(
  {
    count = 5,
    value: controlledValue,
    defaultValue = 0,
    onValueChange,
    variant = "dots",
    className,
    ...props
  },
  ref,
) {
  const safeCount = Math.max(1, count);
  const [current, setCurrent] = useControllableState<number>({
    prop: controlledValue,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });

  const handleChange = React.useCallback(
    (idx: number) => {
      setCurrent(Math.max(0, Math.min(safeCount - 1, idx)));
    },
    [safeCount, setCurrent],
  );

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Pagination indicators"
      className={cn(
        "flex items-center justify-center gap-2",
        variant === "bars" && "h-6 items-end",
        className,
      )}
      {...props}
    >
      {Array.from({ length: safeCount }, (_, i) => {
        const isActive = current === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => handleChange(i)}
            aria-label={`Go to page ${i + 1}`}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              variant === "dots" &&
                (isActive
                  ? "size-5 rounded-full bg-accent text-accent-foreground motion-safe:animate-[stamp_0.3s_ease-out_both] motion-reduce:animate-none"
                  : "size-3 rounded-full border border-border bg-transparent hover:border-foreground/60"),
              variant === "lines" &&
                (isActive
                  ? "h-1.5 w-8 rounded-full bg-accent"
                  : "h-1.5 w-4 rounded-full bg-border hover:bg-foreground/40"),
              variant === "bars" &&
                (isActive
                  ? "h-5 w-1.5 rounded-t-sm bg-accent"
                  : "h-2.5 w-1 rounded-t-sm bg-border hover:bg-foreground/40"),
            )}
          >
            {variant === "dots" && (
              <span
                aria-hidden="true"
                className={cn(
                  "block rounded-full",
                  isActive ? "size-2 bg-accent-foreground" : "size-1.5 bg-transparent",
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
});
PagerDots.displayName = "PagerDots";
