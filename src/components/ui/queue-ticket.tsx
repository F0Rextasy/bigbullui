import * as React from "react";
import { cn } from "./lib/utils";

export interface QueueTicketProps {
  number: number;
  queueLength?: number;
  className?: string;
}

export function QueueTicket({ number, queueLength, className }: QueueTicketProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-6 motion-reduce:transition-none",
        className
      )}
    >
      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">TAKE-A-NUMBER</div>
            <div className="font-mono text-[24px] font-bold tracking-wider">
              {number}
            </div>
          </div>
          <div className="relative w-14 h-14 rounded-full border border-dashed border-border flex items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-widest">
              NOW SERVING
            </span>
          </div>
        </div>
        {queueLength && (
          <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            Queue: {queueLength} waiting
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border/30">
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeOpacity={0.5}
        >
          <path d="M19 2L15 6M15 6L23 14M23 14L11 7M11 7L29 23M29 23L35 15M35 15L21 21L15 19L21 21" strokeWidth={2} strokeOpacity={0.5} />
        </svg>
      </div>
    </div>
  );
}