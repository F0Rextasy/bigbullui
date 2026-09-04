import * as React from "react";
import { cn } from "./lib/utils";

export interface TicketCardProps extends React.HTMLAttributes<HTMLDivElement> {
  serial?: string;
  eventName?: string;
  admitCount?: string;
  seatInfo?: { row?: string; seat?: string; section?: string; gate?: string };
  date?: string;
  time?: string;
  price?: string;
  barcodeValue?: string;
  status?: "admitted" | "valid" | "void";
  className?: string;
}

export function TicketCard({
  serial = "NO. 08421",
  eventName = "BIGBULL MAIN STAGE",
  admitCount = "ADMIT ONE",
  seatInfo = { section: "A", row: "C", seat: "12", gate: "3" },
  date = "2026-09-05",
  time = "20:00",
  price = "$45.00",
  barcodeValue = "BB84210",
  status = "valid",
  className,
  ...props
}: TicketCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col md:flex-row overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-md transition-transform hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {/* Main Ticket Portion */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {admitCount}
            </span>
            <span className="font-mono text-xs text-muted-foreground">{serial}</span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {eventName}
          </h2>
        </div>

        {/* Seat Grid */}
        <div className="mt-6 grid grid-cols-4 gap-2 border-y-2 border-dashed border-border py-4 text-center">
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              SEC
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              {seatInfo.section || "—"}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              ROW
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              {seatInfo.row || "—"}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              SEAT
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              {seatInfo.seat || "—"}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              GATE
            </span>
            <span className="font-mono text-sm font-bold text-foreground">
              {seatInfo.gate || "—"}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>{date} · {time}</span>
          <span className="font-bold text-foreground">{price}</span>
        </div>
      </div>

      {/* Perforation Divider with Punch Notches */}
      <div className="relative flex md:flex-col items-center justify-between md:py-0">
        {/* Top/Left notch */}
        <div className="size-5 rounded-full bg-background border-2 border-foreground -ml-2.5 md:ml-0 md:-mt-2.5 shrink-0" />
        
        {/* Dashed line */}
        <div className="h-0 w-full md:w-0 md:h-full border-t-2 md:border-t-0 md:border-l-2 border-dashed border-border" />
        
        {/* Bottom/Right notch */}
        <div className="size-5 rounded-full bg-background border-2 border-foreground -mr-2.5 md:mr-0 md:-mb-2.5 shrink-0" />
      </div>

      {/* Tear-off Stub Portion */}
      <div className="w-full md:w-48 bg-secondary/50 p-6 flex flex-col justify-between items-center text-center">
        <div className="w-full">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            STUB
          </span>
          <div className="mt-1 font-mono text-xs font-semibold text-foreground truncate">
            {eventName}
          </div>
          <div className="mt-2 text-xs font-mono text-muted-foreground">
            R: {seatInfo.row} · S: {seatInfo.seat}
          </div>
        </div>

        {/* Status Stamp */}
        <div className="my-4">
          <span
            className={cn(
              "inline-block rotate-[-6deg] rounded-sm border px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest",
              status === "admitted" && "border-primary text-primary bg-primary/10",
              status === "valid" && "border-accent text-accent bg-accent/10",
              status === "void" && "border-destructive text-destructive bg-destructive/10"
            )}
          >
            {status}
          </span>
        </div>

        <div className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
          {barcodeValue}
        </div>
      </div>
    </div>
  );
}
