"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BingoCardProps {
  numbers: number[];
  marked?: number[];
  className?: string;
}

export function BingoCard({ numbers, marked = [], className }: BingoCardProps) {
  const columns = ["B", "I", "N", "G", "O"];

  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-6 motion-reduce:transition-none",
        className
      )}
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground border-b border-border/30 pb-4 mb-4">
        B I N G O
      </div>

      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 25 }, (_, i) => i + 1).map((cellNumber, i) => {
          const col = Math.floor(i / 5);
          const row = i % 5;
          const colLetter = columns[col];
          const isFree = i === 12;

          const isMarked = marked.includes(cellNumber);
          const shouldRender = isFree || !isMarked;

          return (
            <div
              key={i}
              className={cn(
                "aspect-square flex items-center justify-center rounded-md border border-border/50 bg-muted",
                isMarked && "animate-stamp",
                isFree && "border-0 bg-card/50"
              )}
            >
              {isFree ? (
                <span className="text-muted-foreground/50">FREE</span>
              ) : (
                <span className="font-mono text-[9px] uppercase tracking-[0.1em]">
                  {cellNumber}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {numbers.length > 0 && (
        <div className="mt-4 text-xs text-destructive/60 animate-sweep">
          Line complete!
        </div>
      )}
    </div>
  );
}