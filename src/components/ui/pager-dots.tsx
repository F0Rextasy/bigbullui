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

  const safeCount = Math.max(1, count);

  const getItemStyle = (index: number): React.CSSProperties | undefined => {
    const isActive = current === index;
    if (variant === "lines" && isActive) {
      const width = safeCount > 1 ? (index / (safeCount - 1)) * 100 : 100;
      return { width: `${width}%` };
    }
    if (variant === "bars" && isActive) {
      const height = ((index + 1) / safeCount) * 100;
      return { height: `${height}%` };
    }
    return undefined;
  };

  const getItemClass = (index: number) => {
    const isActive = current === index;

    if (variant === "dots") {
      if (isActive) {
        return cn(
          "rounded-full bg-accent text-accent-foreground w-6 h-6 transition-all duration-300 ease-out flex items-center justify-center",
          "motion-safe:animate-[stamp_0.4s_ease-out_both] motion-reduce:animate-none!"
        );
      }
      return cn("rounded-full bg-transparent w-4 h-4 border border-border/30 transition-all duration-200 flex items-center justify-center");
    }

    if (variant === "lines") {
      return isActive
        ? "h-0.5 bg-accent transition-all duration-300 ease-out"
        : "h-0.5 bg-transparent w-full transition-all duration-200";
    }

    if (variant === "bars") {
      return isActive
        ? "w-1 h-full bg-accent rounded-t-md rounded-b-md transition-all duration-300 ease-out"
        : "w-0.5 bg-border/30 rounded-t-md rounded-b-md transition-all duration-200";
    }

    return cn("rounded-full bg-transparent w-4 h-4 border border-border/30");
  };

  return (
    <div
      className={cn(
        "flex space-x-1.5 justify-center",
        variant === "lines" && "items-center",
        variant === "bars" && "items-end h-5",
        className
      )}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          style={getItemStyle(i)}
          className={cn(getItemClass(i), "cursor-pointer")}
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