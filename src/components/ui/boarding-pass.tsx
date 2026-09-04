import * as React from "react";
import { cn } from "./lib/utils";

export interface BoardingPassProps extends React.HTMLAttributes<HTMLDivElement> {
  flight: string;
  origin: string;
  destination: string;
  originCity?: string;
  destinationCity?: string;
  passenger: string;
  seat: string;
  gate: string;
  boardingTime: string;
  terminal?: string;
  barcodeValue?: string;
  className?: string;
}

export function BoardingPass({
  flight = "BB-402",
  origin = "JFK",
  destination = "IST",
  originCity = "New York",
  destinationCity = "Istanbul",
  passenger = "ADA BULL",
  seat = "12A",
  gate = "B7",
  boardingTime = "18:40",
  terminal = "T4",
  barcodeValue = "BB402IST",
  className,
  ...props
}: BoardingPassProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col md:flex-row overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-md select-none",
        className
      )}
      {...props}
    >
      {/* Flight Main Header */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              BOARDING PASS
            </span>
            <span className="font-mono text-xs text-muted-foreground">{flight}</span>
          </div>

          {/* Airport Codes */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <span className="font-mono text-4xl font-extrabold tracking-tight text-foreground">
                {origin}
              </span>
              <span className="block text-xs text-muted-foreground font-mono">{originCity}</span>
            </div>

            <div className="flex flex-col items-center px-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-accent"
                aria-hidden="true"
              >
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
              </svg>
              <span className="mt-1 font-mono text-[10px] text-muted-foreground">NON-STOP</span>
            </div>

            <div className="text-right">
              <span className="font-mono text-4xl font-extrabold tracking-tight text-foreground">
                {destination}
              </span>
              <span className="block text-xs text-muted-foreground font-mono">
                {destinationCity}
              </span>
            </div>
          </div>
        </div>

        {/* Flight Data Grid */}
        <div className="mt-6 grid grid-cols-4 gap-2 border-t-2 border-dashed border-border pt-4 text-center">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              PASSENGER
            </span>
            <span className="font-mono text-xs font-bold text-foreground truncate block">
              {passenger}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              GATE
            </span>
            <span className="font-mono text-sm font-bold text-foreground">{gate}</span>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              SEAT
            </span>
            <span className="font-mono text-sm font-bold text-accent">{seat}</span>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              BOARDING
            </span>
            <span className="font-mono text-sm font-bold text-foreground">{boardingTime}</span>
          </div>
        </div>
      </div>

      {/* Perforation Divider */}
      <div className="relative flex md:flex-col items-center justify-between">
        <div className="size-5 rounded-full bg-background border-2 border-foreground -ml-2.5 md:ml-0 md:-mt-2.5 shrink-0" />
        <div className="h-0 w-full md:w-0 md:h-full border-t-2 md:border-t-0 md:border-l-2 border-dashed border-border" />
        <div className="size-5 rounded-full bg-background border-2 border-foreground -mr-2.5 md:mr-0 md:-mb-2.5 shrink-0" />
      </div>

      {/* Right Stub Section */}
      <div className="w-full md:w-44 bg-secondary/40 p-5 flex flex-col justify-between text-center">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            PASSENGER RECEIPT
          </span>
          <div className="mt-2 font-mono text-xs font-semibold text-foreground">{passenger}</div>
          <div className="mt-1 font-mono text-xs text-muted-foreground">
            {origin} → {destination}
          </div>
          <div className="mt-2 font-mono text-sm font-bold text-accent">SEAT {seat}</div>
        </div>

        <div className="mt-4 border-t border-dashed border-border pt-3">
          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest block">
            {terminal} · {flight}
          </span>
          <span className="mt-1 font-mono text-[10px] text-foreground font-bold tracking-widest block">
            *{barcodeValue}*
          </span>
        </div>
      </div>
    </div>
  );
}
