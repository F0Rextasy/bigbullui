"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ProgressCircleProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  indeterminate?: boolean;
  label?: string;
  size?: number;
}

export function ProgressCircle({
  value,
  min = 0,
  max = 100,
  indeterminate = false,
  label,
  size = 120,
  className,
  ...props
}: ProgressCircleProps) {
  const clampedValue = Math.max(min, Math.min(max, value));
  const progressPercent = (clampedValue / max) * 100;
  const circumference = 2 * Math.PI * (size / 2 - 8);

  return (
    <div
      className={cn(
        "relative w-full h-full",
        "motion-reduce:transition-none",
        className,
      )}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={size / 2 - 8}
          fill="none"
          stroke="currentColor"
          strokeWidth={8}
          strokeOpacity={0.15}
        />

        {/* Progress circle - stroke-dashoffset animation */}
        <circle
          cx="50"
          cy="50"
          r={size / 2 - 8}
          fill="none"
          stroke="currentColor"
          strokeWidth={8}
          strokeDasharray={circumference}
          strokeDashoffset={
            indeterminate
              ? circumference
              : circumference * (1 - progressPercent / 100)
          }
          className={cn(
            "transition-all duration-800 ease-out",
            "motion-reduce:transition-none",
            indeterminate
              ? "animate-[spin_1.5s_linear_forever]"
              : "",
          )}
        />
      </svg>

      {/* Center percentage count-up */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p
            className={cn(
              "text-3xl font-bold",
              "motion-reduce:animate-none",
            )}
          >
            {Math.round(clampedValue)}%
          </p>
          {label && (
            <p
              className="mt-1 text-[10px] uppercase text-muted-foreground"
            >
              {label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}