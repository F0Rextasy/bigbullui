"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  label?: string;
}

export function Gauge({
  value,
  min = 0,
  max = 100,
  label,
  className,
  ...props
}: GaugeProps) {
  const clampedValue = Math.max(min, Math.min(max, value));
  const rotateDeg = (clampedValue / max) * 180 - 90;

  return (
    <div
      className={cn(
        "relative w-24 h-24 rounded-full border border-border/60 bg-card",
        "motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {/* Gauge face - half donut */}
      <svg
        className="absolute inset-0 rotate-90 motion-reduce:transition-none"
        viewBox="0 0 100 100"
      >
        {/* Background half-circle */}
        <path
          d="M50 95 A45 45 0 1 1 50 5 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={8}
          strokeOpacity={0.15}
        />
        {/* Progress arc */}
        <path
          d="M50 95 A45 45 0 1 1 50 5 Z"
          stroke={clampedValue > 80 ? "accent" : "border-border"}
          strokeWidth={8}
          fill="none"
          strokeDasharray={`${45 * Math.PI} ${45 * Math.PI}`}
          transform={`rotate(${rotateDeg} 50 50)`}
          className="motion-reduce:transition-none"
        />
      </svg>

      {/* Needle */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="15"
        stroke={clampedValue > 80 ? "destructive" : "currentColor"}
        strokeWidth={3}
        strokeLinecap="round"
        transform={`rotate(${rotateDeg} 50 50)`}
        className="motion-reduce:transition-none"
      />

      {/* Center percentage readout */}
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="18"
        fontWeight="bold"
        className={cn(
          "motion-reduce:transition-none",
          "fill-current",
        )}
      >
        {clampedValue}%
      </text>

      {/* Label below */}
      {label && (
        <p
          className="mt-2 text-[10px] uppercase text-muted-foreground text-center"
        >
          {label}
        </p>
      )}
    </div>
  );
}