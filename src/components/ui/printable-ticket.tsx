"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PrintableTicketProps extends React.HTMLAttributes<HTMLDivElement> {
  eventName?: string;
  venue?: string;
  date?: string;
  section?: string;
  seat?: string;
  code?: string;
}

/** Print-ready admission ticket with print button and clean print frame. */
export function PrintableTicket({
  eventName = "Bigbull Main Stage",
  venue = "Grand Arena Hall",
  date = "12 DEC 2026 · 20:00",
  section = "Section A",
  seat = "Row 4 · Seat 12",
  code = "BB-2026-0412",
  className,
  ...props
}: PrintableTicketProps) {
  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <button
        type="button"
        onClick={() => window.print()}
        className="mb-3 cursor-pointer rounded border-2 border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Print ticket
      </button>
      <div className="overflow-hidden rounded-lg border-2 border-foreground bg-card print:border-black">
        <div className="border-b-2 border-foreground bg-secondary px-4 py-2 print:border-black">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Admit one · Keep stub
          </p>
        </div>
        <div className="flex">
          <div className="flex-1 px-4 py-3">
            <p className="text-lg font-bold leading-tight text-foreground">{eventName}</p>
            <p className="mt-1 text-xs text-muted-foreground">{venue}</p>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-foreground">{date}</p>
            <div className="mt-2 flex gap-2">
              <span className="rounded border border-dashed border-border px-2 py-0.5 font-mono text-[10px] uppercase text-foreground">
                {section}
              </span>
              <span className="rounded border border-dashed border-border px-2 py-0.5 font-mono text-[10px] uppercase text-foreground">
                {seat}
              </span>
            </div>
          </div>
          <div className="flex w-28 shrink-0 flex-col items-center justify-center gap-1 border-l-2 border-dashed border-border px-2 py-3">
            <div className="flex items-end gap-0.5" aria-hidden="true">
              {[10, 18, 8, 22, 12, 20, 9, 16, 11, 19].map((h, i) => (
                <span key={i} className="w-1 bg-foreground print:bg-black" style={{ height: h }} />
              ))}
            </div>
            <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{code}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
