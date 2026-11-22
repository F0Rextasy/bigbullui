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
  const toggle = () => onOpenChange?.(!open);
  return (
    <div
      role={onOpenChange ? "button" : undefined}
      tabIndex={onOpenChange ? 0 : undefined}
      aria-expanded={onOpenChange ? open : undefined}
      aria-label={onOpenChange ? (open ? "Close envelope" : "Open envelope") : undefined}
      className={cn(
        "relative size-32 rounded-2xl border border-border bg-card p-4 motion-reduce:transition-none",
        "hover:scale-[1.02] motion-reduce:hover:scale-100 transition-transform",
        onOpenChange && "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      onClick={onOpenChange ? toggle : undefined}
      onKeyDown={onOpenChange ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      } : undefined}
    >
      <div
        className={cn(
          "rounded-t-2xl border-b border-border bg-secondary p-3 motion-reduce:animate-none!"
        )}
        style={{
          transformOrigin: "top",
          transform: open ? "rotateX(0deg)" : "rotateX(-12deg)",
          animation: open ? "envFlapOpen 0.45s ease-out both" : undefined,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            {open ? "OPEN" : "CLOSED"}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            {sender ? `FROM: ${sender}` : recipient ? `TO: ${recipient}` : "SENDER"}
          </span>
        </div>
      </div>

      <div
        className="mt-3 p-3 bg-muted rounded-sm transition-transform duration-300 motion-reduce:transition-none"
        style={open ? { transform: "translateY(-8px)" } : undefined}
      >
        {letter}
      </div>

      <div className="absolute -bottom-1 w-full h-0.5 bg-border/20" />
    </div>
  );
}