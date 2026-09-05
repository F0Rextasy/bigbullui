"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BadgeRibbonProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  rank?: string;
  award?: string;
  color?: "gold" | "red" | "ink" | "cream";
  className?: string;
}

export function BadgeRibbon({
  title = "GRAND FESTIVAL",
  rank = "1ST PRIZE",
  award = "BEST IN SHOW // VIP",
  color = "red",
  className,
  ...props
}: BadgeRibbonProps) {
  const COLOR_MAP = {
    red: "bg-accent text-accent-foreground border-foreground",
    gold: "bg-amber-500 text-background border-foreground",
    ink: "bg-foreground text-background border-foreground",
    cream: "bg-card text-foreground border-foreground",
  };

  return (
    <div
      className={cn(
        "relative inline-flex flex-col items-center select-none font-mono",
        className
      )}
      {...props}
    >
      {/* Rosette Round Stamp Head */}
      <div
        className={cn(
          "relative z-10 flex size-24 flex-col items-center justify-center rounded-full border-2 p-2 text-center shadow-md",
          COLOR_MAP[color]
        )}
      >
        {/* Inner Dashed Ring */}
        <div className="absolute inset-1 rounded-full border border-dashed border-current opacity-60 pointer-events-none" />

        <span className="text-[8px] font-bold uppercase tracking-widest opacity-80">
          {title}
        </span>
        <span className="my-0.5 text-xs font-black uppercase tracking-tight">
          {rank}
        </span>
        <span className="text-[7px] font-bold uppercase opacity-80">
          ★ CERTIFIED ★
        </span>
      </div>

      {/* Hanging Swallow-tail Ribbon Streamers */}
      <div className="relative -mt-3 flex gap-1 z-0">
        {/* Left Ribbon Tail */}
        <div className="relative h-14 w-6 bg-card border-x-2 border-b-2 border-foreground shadow-xs">
          <div className="absolute inset-x-0 bottom-0 h-2 border-t border-dashed border-border" />
        </div>

        {/* Right Ribbon Tail */}
        <div className="relative h-14 w-6 bg-card border-x-2 border-b-2 border-foreground shadow-xs">
          <div className="absolute inset-x-0 bottom-0 h-2 border-t border-dashed border-border" />
        </div>
      </div>

      {/* Ribbon Description Banner */}
      <div className="relative -mt-2 z-20 rounded border border-foreground bg-secondary px-2 py-0.5 text-[9px] font-bold text-foreground uppercase shadow-xs">
        {award}
      </div>
    </div>
  );
}
