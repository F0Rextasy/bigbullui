"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FlightLeg {
  code: string;
  city: string;
  time: string;
}

export interface FlightTimelineCardProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: FlightLeg;
  to?: FlightLeg;
  flight?: string;
  seat?: string;
  delayed?: boolean;
}

export function FlightTimelineCard({
  from = { code: "IST", city: "Istanbul", time: "18:40" },
  to = { code: "BER", city: "Berlin", time: "20:35" },
  flight = "BB-402",
  seat = "12A",
  delayed = false,
  className,
  ...props
}: FlightTimelineCardProps) {
  return (
    <div className={cn("w-full max-w-md rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        <span>{flight}</span>
        <span>Seat {seat}</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <div className="text-center">
          <p className="text-2xl font-bold">{from.code}</p>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">{from.city}</p>
          <p className="mt-0.5 font-mono text-sm font-bold tabular-nums">{from.time}</p>
        </div>
        <div className="relative min-w-0 flex-1" aria-hidden>
          <div className="border-t-2 border-dashed border-border" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-1 text-base">
            ✈
          </span>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{to.code}</p>
          <p className="font-mono text-[10px] uppercase text-muted-foreground">{to.city}</p>
          <p className="mt-0.5 font-mono text-sm font-bold tabular-nums">{to.time}</p>
        </div>
      </div>
      {delayed ? (
        <p className="mt-3 inline-block rounded bg-destructive/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-destructive">
          Delayed — gate update pending
        </p>
      ) : (
        <p className="mt-3 inline-block rounded bg-accent/10 px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-accent">
          On time — boarding soon
        </p>
      )}
    </div>
  );
}
