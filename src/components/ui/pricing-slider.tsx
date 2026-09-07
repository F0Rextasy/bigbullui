"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PricingTier {
  name: string;
  monthly: number;
  annual: number;
  unit?: string;
}

export interface PricingSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  tiers: PricingTier[];
  seats?: number;
  defaultSeats?: number;
  maxSeats?: number;
  currency?: string;
}

export function PricingSlider({
  tiers,
  seats: controlledSeats,
  defaultSeats = 5,
  maxSeats = 100,
  currency = "$",
  className,
  ...props
}: PricingSliderProps) {
  const [innerSeats, setInnerSeats] = React.useState(defaultSeats);
  const seats = controlledSeats ?? innerSeats;
  const [annual, setAnnual] = React.useState(true);

  if (tiers.length === 0) {
    return <div className={cn("w-full", className)} {...props} />;
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex items-center justify-between gap-3">
        <label className="font-mono text-xs text-muted-foreground">
          Seats: <strong className="text-foreground">{seats}</strong>
        </label>
        <div className="flex rounded-md border border-border p-0.5 font-mono text-[11px]" role="group" aria-label="Billing period">
          {(["Monthly", "Annual"] as const).map((p) => {
            const isAnnual = p === "Annual";
            const active = annual === isAnnual;
            return (
              <button
                key={p}
                type="button"
                aria-pressed={active}
                onClick={() => setAnnual(isAnnual)}
                className={cn(
                  "cursor-pointer rounded px-3 py-1 uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active ? "bg-primary font-bold text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p}
              </button>
            );
          })}
        </div>
      </div>
      <input
        type="range"
        min={1}
        max={maxSeats}
        value={seats}
        onChange={(e) => setInnerSeats(Number(e.target.value))}
        aria-label="Seats"
        className="mt-3 w-full accent-accent"
      />
      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {tiers.map((tier) => {
          const perSeat = annual ? tier.annual : tier.monthly;
          const total = perSeat * seats * (annual ? 12 : 1);
          return (
            <div key={tier.name} className="rounded-lg border border-border bg-card p-4">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{tier.name}</p>
              <p className="mt-1 font-mono text-2xl font-bold tabular-nums">
                {currency}
                {total.toLocaleString()}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                {currency}
                {perSeat}/seat/mo{annual ? ", billed yearly" : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
