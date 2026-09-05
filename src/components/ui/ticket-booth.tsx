import * as React from "react";
import { cn } from "./lib/utils";

export interface TicketBoothProps {
  label?: string;
  open?: boolean;
  className?: string;
}

export function TicketBooth({ label, open = false, className }: TicketBoothProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-border bg-card p-6 motion-reduce:transition-none",
        "group"
      )}
      style={{
        ...(open && {
          animation: "boothOpen 0.4s cubic-bezier(0.16,1,0.3,1) forwards",
          '@keyframes boothOpen': `
            from { transform: scaleY(1); }
            to { transform: scaleY(1.05); }
          `
        })
      }}
    >
      {/* Frame */}
      <div className="relative h-48">

        {/* Window */}
        <div
          className="absolute inset-2 rounded-lg border-2 border-dashed border-border/50 bg-secondary"
        />

        {/* TICKETS marquee header */}
        <div className="absolute top-2 left-2 right-2 font-mono text-[8px] uppercase tracking-[0.2em] text-destructive animate-marquee">
          TICKETS
        </div>

        {/* CLOSED sign on closed */}
        {!open && (
          <div
            className="absolute top-2 right-2 size-6 rounded-full border border-destructive bg-destructive text-xs font-bold"
          >
            CLOSED
          </div>
        )}

        {/* Counter ledge */}
        <div className="absolute bottom-2 left-2 right-2 h-2 bg-muted/30 rounded-t-lg" />

        {/* Speaker grille */}
        <div className="absolute bottom-4 left-2 right-2 grid grid-cols-3 gap-1">
          {Array.from({ length: 9 }, (_, dotIdx) => (
            <div key={dotIdx} className="size-1 rounded-full bg-border/40" />
          ))}
        </div>
      </div>

      {/* Bulb row blinking */}
      <div className="absolute top-2 right-2">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="size-2 rounded-full bg-accent/50 animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
}