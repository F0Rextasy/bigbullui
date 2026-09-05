"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  repeat?: number;
  angle?: number;
  opacity?: number;
  notched?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Watermark({
  text = "OFFICIAL TICKET • DO NOT DUPLICATE",
  repeat = 12,
  angle = -22,
  opacity = 0.07,
  notched = false,
  children,
  className,
  ...props
}: WatermarkProps) {
  const watermarkItems = Array.from({ length: repeat }, (_, i) => i);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border-2 border-dashed border-border bg-card select-none",
        className
      )}
      {...props}
    >
      {notched && (
        <>
          <div
            aria-hidden="true"
            className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background z-20"
          />
          <div
            aria-hidden="true"
            className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background z-20"
          />
        </>
      )}

      {/* Repeating Anti-Counterfeit Background Layer */}
      <div
        aria-hidden="true"
        style={{
          transform: `rotate(${angle}deg)`,
          opacity,
        }}
        className="pointer-events-none absolute -inset-24 flex flex-wrap items-center justify-around gap-6 select-none font-mono font-black text-xs uppercase tracking-widest text-foreground z-0"
      >
        {watermarkItems.map((i) => (
          <span key={i} className="whitespace-nowrap">
            {text}
          </span>
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
