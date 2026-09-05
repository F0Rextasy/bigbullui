"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MarqueeBulbsProps {
  text: string;
  bulbs?: boolean;
}

export function MarqueeBulbs({ text, bulbs = true }: MarqueeBulbsProps) {
  const bulbCount = bulbs ? Math.max(4, text.length + 2) : 1;

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-4 motion-reduce:transition-none",
        "overflow-hidden"
      )}
    >
      <style>{`
        @keyframes marqueeSlide {
          from { transform: translateX(100%); }
          to { transform: translateX(-100%); }
        }
      `}</style>

      <div className="flex gap-2 pt-2">
        {Array.from({ length: bulbCount }, (_, i) => (
          <div
            key={i}
            className={cn(
              "size-3 rounded-full",
              "bg-accent/30"
            )}
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground whitespace-nowrap">
          {text}
        </span>
      </div>
    </div>
  );
}