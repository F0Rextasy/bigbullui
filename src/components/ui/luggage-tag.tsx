import * as React from "react";
import { cn } from "./lib/utils";

export interface LuggageTagProps extends React.HTMLAttributes<HTMLDivElement> {
  tagNumber: string;
  passengerName: string;
  destination: string;
  flight?: string;
  weight?: string;
  className?: string;
}

export function LuggageTag({
  tagNumber = "BB-920-142",
  passengerName = "ADA BULL",
  destination = "IST",
  flight = "BB-402",
  weight = "23 KG",
  className,
  ...props
}: LuggageTagProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border-2 border-foreground bg-card p-5 shadow-md select-none max-w-xs",
        className
      )}
      {...props}
    >
      {/* Top loop handle visual */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full border-2 border-foreground bg-background" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            BAGGAGE CLAIM
          </span>
        </div>
        <span className="font-mono text-xs font-bold text-accent">{flight}</span>
      </div>

      {/* Main Destination Code */}
      <div className="my-4 text-center">
        <span className="font-mono text-5xl font-black tracking-tight text-foreground">
          {destination}
        </span>
        <span className="block mt-1 font-mono text-xs text-muted-foreground uppercase tracking-widest">
          FINAL DESTINATION
        </span>
      </div>

      {/* Passenger and Weight Information */}
      <div className="grid grid-cols-2 gap-2 border-t-2 border-dashed border-border py-3 text-center">
        <div>
          <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            PASSENGER
          </span>
          <span className="font-mono text-xs font-bold text-foreground truncate block">
            {passengerName}
          </span>
        </div>
        <div>
          <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            WEIGHT
          </span>
          <span className="font-mono text-xs font-bold text-foreground">{weight}</span>
        </div>
      </div>

      {/* Bottom Serial Stamp */}
      <div className="border-t border-border pt-3 text-center">
        <span className="font-mono text-xs tracking-[0.25em] font-semibold text-foreground">
          *{tagNumber}*
        </span>
      </div>
    </div>
  );
}
