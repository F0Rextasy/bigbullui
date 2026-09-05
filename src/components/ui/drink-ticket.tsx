"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DrinkTicketProps {
  code?: string;
  className?: string;
}

export function DrinkTicket({ code, className }: DrinkTicketProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-dashed border-border bg-card p-6 motion-reduce:transition-none",
        "group"
      )}
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
        &bull;&bull;
      </div>

      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
        GOOD FOR ONE
      </div>

      <div className="font-mono text-[11px] font-bold uppercase tracking-wider mb-4">
        DRINK TICKET
      </div>

      <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
        {code || "DRINK{00000}"}
      </div>
    </div>
  );
}