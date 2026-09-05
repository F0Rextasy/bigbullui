"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface EnvelopeProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  sender?: string;
  recipient?: string;
  letter?: React.ReactNode;
}

export function Envelope({ open = false, onOpenChange, sender, recipient, letter }: EnvelopeProps) {
  return (
    <div
      className={cn(
        "relative size-32 rounded-2xl border border-border bg-card p-4 motion-reduce:transition-none",
        "hover:scale-[1.02] transition-transform"
      )}
      onClick={() => onOpenChange && onOpenChange(!open)}
    >
      <div
        className={cn(
          "rounded-t-2xl border-b border-border bg-secondary p-3",
          "transform-origin-top",
          open ? "animate-flip-open" : "animate-flap-closed"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            {open ? "OPEN" : "CLOSED"}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            {sender ? `FROM: ${sender}` : "SENDER"}
          </span>
        </div>
      </div>

      <div className="mt-3 p-3 bg-muted rounded-sm">
        {letter}
      </div>

      <div className="absolute -bottom-1 w-full h-0.5 bg-border/20" />
    </div>
  );
}