"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RaffleTicketProps {
  number: string;
  winningNumber?: string;
  className?: string;
}

export function RaffleTicket({ number, winningNumber, className }: RaffleTicketProps) {
  const isWinning = winningNumber && number === winningNumber;

  return (
    <div
      className={cn(
        "relative rounded-lg border border-dashed border-border bg-card p-6 motion-reduce:transition-none",
        isWinning && "animate-pulse-ring",
        className
      )}
    >
      <div className="font-mono text-[24px] font-bold uppercase tracking-wider mb-2">
        {number}
      </div>

      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
        MATCHING STUB
      </div>

      <div className="mt-4 pt-4 border-t border-border/30">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeOpacity={0.5}
        >
          <path d="M12 2L2 7l10 5L2 17l10 5" strokeWidth={1.5} strokeOpacity="0.5" />
        </svg>
      </div>

      {isWinning && (
        <div className="absolute top-2 right-2 size-3 rounded-full bg-accent animate-pulse" />
      )}
    </div>
  );
}