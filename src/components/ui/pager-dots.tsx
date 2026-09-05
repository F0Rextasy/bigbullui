"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PagerDotsProps {
  count: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  variant?: "dots" | "lines" | "bars";
  className?: string;
}

export function PagerDots({
  count,
  value,
  defaultValue,
  onValueChange,
  variant = "dots",
  className,
}: PagerDotsProps) {
  const [internal, setInternal] = React.useState(defaultValue ?? 0);
  const current = value ?? internal;

  const handleChange = React.useCallback(
    (idx: number) => {
      setInternal(idx);
      onValueChange?.(idx);
    },
    [onValueChange]
  );

  const getItemClass = (index: number) => {
    const isActive = current === index;
    const center = count - 1;

    if (variant === "dots") {
      if (isActive) {
        return cn(
          "rounded-full bg-accent w-6 h-6 transition-all duration-300 ease-out",
          "animate-[stamp_0.4s_ease-out_both]"
        );
      }
      return cn("rounded-full bg-transparent w-4 h-4 border border-border/30 transition-all duration-200");
    }

    if (variant === "lines") {
      if (isActive) {
        const width = (index / (count - 1)) * 100;
        return cn(
          "h-0.5 bg-accent transition-all duration-300 ease-out",
          `w-[${width}%]`
        );
      }
      return cn("h-0.5 bg-transparent w-full transition-all duration-200");
    }

    if (variant === "bars") {
      if (isActive) {
        const height = ((index + 1) / count) * 12;
        return cn(
          "w-1 bg-accent rounded-t-md rounded-b-md transition-all duration-300 ease-out",
          `h-[${height}%]`
        );
      }
      return cn("w-0.5 bg-border/30 rounded-t-md rounded-b-md transition-all duration-200");
    }

    return cn("rounded-full bg-transparent w-4 h-4 border border-border/30");
  };

  return (
    <div
      className={cn(
        "flex space-x-1.5 justify-center",
        variant === "lines" && "items-center",
        variant === "bars" && "items-end",
        className
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          className={getItemClass(i)}
          onClick={() => handleChange(i)}
          aria-label={`Go to page ${i + 1}`}
          type="button"
        >
          {variant === "dots" && (
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="currentColor"
              focusable="false"
            >
              <path d="M8 5v14l11-4-11-4z" />
            </svg>
          )}
          {variant === "lines" && (
            <div className="h-full w-full bg-current rounded-md" />
          )}
          {variant === "bars" && (
            <div className="h-4 w-1 bg-current rounded-t rounded-b" />
          )}
        </button>
      ))}
    </div>
  );
}