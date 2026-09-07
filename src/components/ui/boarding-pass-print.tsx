"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BoardingPassPrintProps extends React.HTMLAttributes<HTMLDivElement> {
  flight?: string;
  origin?: string;
  destination?: string;
  passenger?: string;
  seat?: string;
  gate?: string;
  boarding?: string;
}

/** Print-ready boarding pass with route strip and perforated stub. */
export function BoardingPassPrint({
  flight = "BB 402",
  origin = "JFK",
  destination = "IST",
  passenger = "ADA BULL",
  seat = "12A",
  gate = "B7",
  boarding = "19:20",
  className,
  ...props
}: BoardingPassPrintProps) {
  const cell = (label: string, value: string) => (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-mono text-xs font-bold text-foreground">{value}</p>
    </div>
  );
  return (
    <div className={cn("w-full max-w-lg", className)} {...props}>
      <button
        type="button"
        onClick={() => window.print()}
        className="mb-3 cursor-pointer rounded border-2 border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Print boarding pass
      </button>
      <div className="overflow-hidden rounded-lg border-2 border-foreground bg-card print:border-black">
        <div className="flex items-center justify-between bg-secondary px-4 py-2 print:border-b print:border-black">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Boarding pass · {flight}
          </p>
          <p className="font-mono text-[10px] font-bold uppercase text-accent">Priority</p>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 px-4 py-3">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold tracking-tight text-foreground">{origin}</p>
              <span aria-hidden="true" className="flex-1 border-t-2 border-dashed border-border" />
              <span aria-hidden="true" className="text-accent">✈</span>
              <span aria-hidden="true" className="flex-1 border-t-2 border-dashed border-border" />
              <p className="text-2xl font-bold tracking-tight text-foreground">{destination}</p>
            </div>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-foreground">{passenger}</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {cell("Seat", seat)}
              {cell("Gate", gate)}
              {cell("Boards", boarding)}
            </div>
          </div>
          <div className="flex flex-row items-center justify-around gap-2 border-t-2 border-dashed border-border px-4 py-3 sm:w-32 sm:flex-col sm:border-l-2 sm:border-t-0">
            {cell("Flight", flight)}
            {cell("Seat", seat)}
            {cell("Gate", gate)}
          </div>
        </div>
      </div>
    </div>
  );
}
