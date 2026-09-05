import * as React from "react";
import { cn } from "./lib/utils";

export interface TicketStubV2Props {
  event?: string;
  date?: string;
  serial?: string;
  tear?: boolean;
  className?: string;
}

export function TicketStubV2({ event, date, serial, tear = false, className }: TicketStubV2Props) {
  return (
    <div
      className={cn(
        "relative rounded-sm border border-dashed border-border/50 bg-card p-4 motion-reduce:transition-none",
        "group"
      )}
      style={{
        ...(tear && {
          animation: "stubTear 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
          '@keyframes stubTear': `
            from { transform: rotate(0deg) translateY(0); }
            to { transform: rotate(-30deg) translateY(20px); }
          `
        })
      }}
    >
      {/* Event details */}
      <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
        {event || "EVENT NAME"}
      </div>

      {/* Date */}
      <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground mb-3">
        {date || "MM/DD/YYYY"}
      </div>

      {/* Serial number */}
      <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
        Serial: {serial || "STUB-00000"}
      </div>

      {/* Barcode */}
      <div className="h-2 bg-border/30 rounded w-full mb-3">
        <div className="h-0.5 bg-destructive rounded w-1/6" />
        <div className="h-0.5 bg-destructive rounded w-1/10" />
        <div className="h-0.5 bg-destructive rounded w-1/12" />
      </div>

      {/* Tear line */}
      <div className="mt-3 pt-3 border-t border-border/30">
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path d="M12 2L2 7l10 5L2 17l10 5" strokeWidth={1.5} />
        </svg>
      </div>

      {/* Tear status */}
      {tear && (
        <div className="mt-2 text-xs text-destructive">
          Tear detached
        </div>
      )}
    </div>
  );
}