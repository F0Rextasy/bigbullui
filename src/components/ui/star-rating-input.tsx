"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface StarRatingInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  max?: number;
  label?: string;
}

export function StarRatingInput({
  value: controlledValue,
  defaultValue = 0,
  onValueChange,
  max = 5,
  label,
  className,
  ...props
}: StarRatingInputProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [hover, setHover] = React.useState(0);
  const value = controlledValue ?? inner;
  const shown = hover || value;

  const pick = (v: number) => {
    setInner(v);
    onValueChange?.(v);
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {label ? (
        <span className="mb-1 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div
        role="radiogroup"
        aria-label={label ?? "Star rating"}
        className="flex items-center gap-1"
        onMouseLeave={() => setHover(0)}
      >
        {Array.from({ length: max }).map((_, i) => {
          const v = i + 1;
          const lit = v <= shown;
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={v === value}
              aria-label={`${v} star${v === 1 ? "" : "s"}`}
              onMouseEnter={() => setHover(v)}
              onFocus={() => setHover(v)}
              onClick={() => pick(v)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") pick(Math.min(max, value + 1));
                if (e.key === "ArrowLeft") pick(Math.max(0, value - 1));
              }}
              className={cn(
                "cursor-pointer p-0.5 transition-transform duration-100 hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                lit ? "text-accent" : "text-muted-foreground/40",
              )}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
              </svg>
            </button>
          );
        })}
        <span className="ml-2 font-mono text-xs text-muted-foreground" aria-live="polite">
          {shown > 0 ? `${shown}/${max}` : "Tap to rate"}
        </span>
      </div>
    </div>
  );
}
