"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PassportStamp {
  id: string;
  country: string;
  date: string;
  color?: string;
  unlocked?: boolean;
}

export interface PassportStampGridProps extends React.HTMLAttributes<HTMLDivElement> {
  stamps: PassportStamp[];
  columns?: number;
}

export function PassportStampGrid({ stamps, columns = 3, className, ...props }: PassportStampGridProps) {
  return (
    <div
      className={cn("grid w-full gap-3", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      {...props}
    >
      {stamps.map((stamp) => {
        const open = stamp.unlocked !== false;
        return (
          <div
            key={stamp.id}
            className={cn(
              "flex aspect-square flex-col items-center justify-center rounded-full border-2 p-2 text-center transition-transform hover:scale-105 motion-reduce:transition-none",
              open ? "border-accent" : "border-dashed border-border/60 opacity-50",
            )}
            style={open && stamp.color ? { borderColor: stamp.color } : undefined}
            title={`${stamp.country} · ${stamp.date}`}
          >
            <span
              aria-hidden
              className="flex size-8 items-center justify-center rounded-full font-mono text-sm font-bold"
              style={open ? { backgroundColor: stamp.color ?? "var(--accent)", color: "var(--accent-foreground)" } : undefined}
            >
              {open ? "✦" : "?"}
            </span>
            <span className="mt-1 font-mono text-[10px] font-bold uppercase leading-tight">
              {open ? stamp.country : "Locked"}
            </span>
            <span className="font-mono text-[9px] text-muted-foreground">{stamp.date}</span>
          </div>
        );
      })}
    </div>
  );
}
