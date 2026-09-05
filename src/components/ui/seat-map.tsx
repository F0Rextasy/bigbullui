"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type SeatTierType = "vip" | "orchestra" | "balcony" | "sold" | "accessible";

export interface SeatTier {
  id: SeatTierType | string;
  name: string;
  price: number;
  badgeClass?: string;
  description?: string;
}

export interface SeatData {
  id: string; // e.g. "A-1"
  row: string; // e.g. "A"
  number: number; // e.g. 1
  tier: SeatTierType | string;
  price?: number;
  accessible?: boolean;
}

export interface SeatMapProps extends React.HTMLAttributes<HTMLDivElement> {
  venueName?: string;
  eventName?: string;
  eventDate?: string;
  stageLabel?: string;
  rows?: string[];
  seatsPerRow?: number;
  aisleAfterSeat?: number;
  tiers?: Record<string, SeatTier>;
  initialSoldSeats?: string[];
  initialAccessibleSeats?: string[];
  selectedSeatIds?: string[];
  defaultSelectedSeatIds?: string[];
  maxSeats?: number;
  currency?: string;
  serviceFeePerTicket?: number;
  onSelectionChange?: (selectedSeats: SeatData[]) => void;
  onSeatClick?: (seat: SeatData) => void;
  onCheckout?: (selectedSeats: SeatData[], totalPrice: number) => void;
  className?: string;
}

const DEFAULT_TIERS: Record<string, SeatTier> = {
  vip: {
    id: "vip",
    name: "VIP Prime",
    price: 135,
    badgeClass: "border-accent text-accent bg-accent/10",
    description: "Front rows with priority acoustic center",
  },
  orchestra: {
    id: "orchestra",
    name: "Orchestra",
    price: 85,
    badgeClass: "border-foreground text-foreground bg-secondary",
    description: "Main floor prime viewing sightlines",
  },
  balcony: {
    id: "balcony",
    name: "Balcony Loge",
    price: 45,
    badgeClass: "border-border text-muted-foreground bg-card",
    description: "Elevated tier overview seating",
  },
  accessible: {
    id: "accessible",
    name: "Accessible",
    price: 60,
    badgeClass: "border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    description: "Step-free wheelchair companion access",
  },
  sold: {
    id: "sold",
    name: "Sold Out",
    price: 0,
    badgeClass: "border-border/50 text-muted-foreground/50 bg-muted/40 line-through",
    description: "Seat unavailable for purchase",
  },
};

const DEFAULT_ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const DEFAULT_SEATS_PER_ROW = 12;
const DEFAULT_AISLE_AFTER = 6;

const DEFAULT_SOLD_SEATS = [
  "A-3",
  "A-4",
  "B-7",
  "B-8",
  "C-1",
  "C-12",
  "D-5",
  "D-6",
  "E-2",
  "E-9",
  "F-6",
  "F-7",
  "G-3",
  "G-10",
  "H-4",
];

const DEFAULT_ACCESSIBLE_SEATS = ["H-1", "H-12"];

function getTierForRow(row: string): "vip" | "orchestra" | "balcony" {
  if (row === "A" || row === "B") return "vip";
  if (row === "C" || row === "D" || row === "E") return "orchestra";
  return "balcony";
}

/**
 * SeatMap: Interactive arena seating chart matrix grid with row letters,
 * seat numbers, tier types, selection toggle, price calculator readout, and ticket punch border.
 */
export function SeatMap({
  venueName = "GRAND AUDITORIUM",
  eventName = "BIGBULL SYMPHONY · OPENING NIGHT",
  eventDate = "SAT, OCT 24 · 20:00",
  stageLabel = "★ MAIN STAGE / ACOUSTIC PODIUM ★",
  rows = DEFAULT_ROWS,
  seatsPerRow = DEFAULT_SEATS_PER_ROW,
  aisleAfterSeat = DEFAULT_AISLE_AFTER,
  tiers = DEFAULT_TIERS,
  initialSoldSeats = DEFAULT_SOLD_SEATS,
  initialAccessibleSeats = DEFAULT_ACCESSIBLE_SEATS,
  selectedSeatIds,
  defaultSelectedSeatIds = ["A-6"],
  maxSeats = 8,
  currency = "$",
  serviceFeePerTicket = 4.5,
  onSelectionChange,
  onSeatClick,
  onCheckout,
  className,
  ...props
}: SeatMapProps) {
  const isControlled = selectedSeatIds !== undefined;
  const [internalSelectedIds, setInternalSelectedIds] = React.useState<string[]>(
    defaultSelectedSeatIds
  );
  const activeSelectedIds = isControlled ? selectedSeatIds : internalSelectedIds;

  const [hoveredSeat, setHoveredSeat] = React.useState<SeatData | null>(null);
  const [activeTierHighlight, setActiveTierHighlight] = React.useState<string | null>(null);
  const [limitNotice, setLimitNotice] = React.useState(false);

  // Generate seat data map
  const allSeatsMap = React.useMemo(() => {
    const map = new Map<string, SeatData>();
    rows.forEach((row) => {
      for (let num = 1; num <= seatsPerRow; num++) {
        const id = `${row}-${num}`;
        const isSold = initialSoldSeats.includes(id);
        const isAccessible = initialAccessibleSeats.includes(id);

        let tier: string = getTierForRow(row);
        if (isAccessible) tier = "accessible";
        if (isSold) tier = "sold";

        const price = tiers[tier]?.price ?? 50;

        map.set(id, {
          id,
          row,
          number: num,
          tier,
          price,
          accessible: isAccessible,
        });
      }
    });
    return map;
  }, [rows, seatsPerRow, tiers, initialSoldSeats, initialAccessibleSeats]);

  const selectedSeatsList = React.useMemo(() => {
    return activeSelectedIds
      .map((id) => allSeatsMap.get(id))
      .filter((s): s is SeatData => s !== undefined);
  }, [activeSelectedIds, allSeatsMap]);

  // Price calculations
  const subtotal = React.useMemo(() => {
    return selectedSeatsList.reduce((acc, s) => acc + (s.price || 0), 0);
  }, [selectedSeatsList]);

  const totalFee = selectedSeatsList.length * serviceFeePerTicket;
  const grandTotal = subtotal > 0 ? subtotal + totalFee : 0;

  const handleToggleSeat = (seat: SeatData) => {
    if (seat.tier === "sold") return;

    if (onSeatClick) {
      onSeatClick(seat);
    }

    const isAlreadySelected = activeSelectedIds.includes(seat.id);
    let nextIds: string[];

    if (isAlreadySelected) {
      nextIds = activeSelectedIds.filter((id) => id !== seat.id);
      setLimitNotice(false);
    } else {
      if (activeSelectedIds.length >= maxSeats) {
        setLimitNotice(true);
        setTimeout(() => setLimitNotice(false), 2400);
        return;
      }
      nextIds = [...activeSelectedIds, seat.id];
    }

    if (!isControlled) {
      setInternalSelectedIds(nextIds);
    }

    if (onSelectionChange) {
      const nextSeats = nextIds
        .map((id) => allSeatsMap.get(id))
        .filter((s): s is SeatData => s !== undefined);
      onSelectionChange(nextSeats);
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalSelectedIds([]);
    }
    if (onSelectionChange) {
      onSelectionChange([]);
    }
  };

  const handleCheckoutClick = () => {
    if (onCheckout && selectedSeatsList.length > 0) {
      onCheckout(selectedSeatsList, grandTotal);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-xl border-2 border-foreground bg-card text-card-foreground shadow-[6px_6px_0_0_var(--color-border)] outline-1 outline-dashed outline-offset-[-6px] overflow-hidden select-none",
        className
      )}
      {...props}
    >
      {/* Side Punch Notches along Ticket Frame */}
      <div
        aria-hidden="true"
        className="absolute -left-3 top-1/4 -translate-y-1/2 size-5 rounded-full border-2 border-foreground bg-background z-30"
      />
      <div
        aria-hidden="true"
        className="absolute -right-3 top-1/4 -translate-y-1/2 size-5 rounded-full border-2 border-foreground bg-background z-30"
      />
      <div
        aria-hidden="true"
        className="absolute -left-3 top-3/4 -translate-y-1/2 size-5 rounded-full border-2 border-foreground bg-background z-30"
      />
      <div
        aria-hidden="true"
        className="absolute -right-3 top-3/4 -translate-y-1/2 size-5 rounded-full border-2 border-foreground bg-background z-30"
      />

      {/* Arena Header Stub */}
      <div className="border-b-2 border-dashed border-border bg-secondary/60 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-accent uppercase">
                INTERACTIVE SEAT MATRIX
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                [MAX {maxSeats} SEATS]
              </span>
            </div>
            <h2 className="mt-1 text-lg sm:text-2xl font-black tracking-tight uppercase font-mono text-foreground">
              {venueName}
            </h2>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              {eventName} · {eventDate}
            </p>
          </div>

          {/* Interactive Tier Badges */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            {Object.values(tiers).map((t) => {
              const isActive = activeTierHighlight === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onMouseEnter={() => setActiveTierHighlight(t.id)}
                  onMouseLeave={() => setActiveTierHighlight(null)}
                  className={cn(
                    "font-mono text-[10px] uppercase font-bold px-2 py-1 rounded border transition-all flex items-center gap-1.5",
                    t.badgeClass,
                    isActive && "ring-2 ring-foreground scale-105"
                  )}
                  title={t.description}
                >
                  <span className="size-1.5 rounded-full bg-current" />
                  <span>{t.name}</span>
                  {t.price > 0 && <span>{currency}{t.price}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {limitNotice && (
          <div className="mt-3 rounded border border-accent bg-accent/10 px-3 py-1.5 text-center font-mono text-xs font-bold uppercase tracking-wider text-accent animate-pulse">
            ★ MAXIMUM LIMIT REACHED ({maxSeats} TICKETS PER ADMISSION) ★
          </div>
        )}
      </div>

      {/* Seating Arena Chart */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[540px] flex flex-col items-center">
          {/* Stage Graphic */}
          <div className="w-4/5 max-w-md mb-8 text-center">
            <div className="relative py-2.5 px-4 rounded-t-2xl border-2 border-foreground bg-secondary/80 shadow-inner">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-foreground block">
                {stageLabel}
              </span>
              <div className="mt-1 h-[2px] w-full border-b border-dashed border-border" />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-muted-foreground tracking-widest uppercase px-2">
              <span>◄ WEST AISLE</span>
              <span>ACOUSTIC CENTERLINE</span>
              <span>EAST AISLE ►</span>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="space-y-2.5 w-full max-w-xl">
            {rows.map((row) => {
              return (
                <div key={row} className="flex items-center justify-center gap-2 sm:gap-3">
                  {/* Left Row Indicator */}
                  <span className="w-5 text-center font-mono text-xs font-bold text-muted-foreground uppercase">
                    {row}
                  </span>

                  {/* Seat Buttons */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {Array.from({ length: seatsPerRow }).map((_, i) => {
                      const seatNum = i + 1;
                      const seatId = `${row}-${seatNum}`;
                      const seat = allSeatsMap.get(seatId);
                      if (!seat) return null;

                      const isSold = seat.tier === "sold";
                      const isSelected = activeSelectedIds.includes(seatId);
                      const isHighlighted =
                        activeTierHighlight !== null && seat.tier === activeTierHighlight;
                      const isAisle = seatNum === aisleAfterSeat;

                      return (
                        <React.Fragment key={seatId}>
                          <button
                            type="button"
                            onClick={() => handleToggleSeat(seat)}
                            onMouseEnter={() => setHoveredSeat(seat)}
                            onMouseLeave={() => setHoveredSeat(null)}
                            disabled={isSold}
                            aria-label={`Row ${row}, Seat ${seatNum}, ${seat.tier}, ${currency}${seat.price}`}
                            aria-pressed={isSelected}
                            className={cn(
                              "relative group size-6 sm:size-7 rounded-t-md rounded-b-xs border flex items-center justify-center font-mono text-[10px] font-bold transition-all focus-visible:ring-2 ring-ring",
                              // Tier Styles
                              seat.tier === "vip" &&
                                "border-accent/70 bg-card text-foreground hover:border-accent hover:bg-accent/15",
                              seat.tier === "orchestra" &&
                                "border-border bg-card text-foreground hover:border-foreground hover:bg-secondary",
                              seat.tier === "balcony" &&
                                "border-border/60 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-secondary",
                              seat.tier === "accessible" &&
                                "border-emerald-600 bg-card text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
                              isSold &&
                                "border-border/30 bg-muted/50 text-muted-foreground/30 cursor-not-allowed line-through",
                              // Selected State
                              isSelected &&
                                "border-accent bg-accent text-accent-foreground font-black shadow-md scale-110 ring-2 ring-accent ring-offset-1 z-10",
                              // Highlighted from Legend
                              isHighlighted && !isSelected && "ring-2 ring-foreground scale-105"
                            )}
                          >
                            {seat.accessible ? "♿" : isSold ? "✕" : seatNum}

                            {/* Tactile Seat Cushion bottom notch */}
                            <span
                              className={cn(
                                "absolute bottom-0 inset-x-1 h-[2px] rounded-t-xs",
                                isSelected ? "bg-white/40" : "bg-black/20 dark:bg-white/10"
                              )}
                            />
                          </button>

                          {/* Aisle Spacer */}
                          {isAisle && (
                            <div
                              aria-hidden="true"
                              className="w-4 sm:w-6 border-b-2 border-dotted border-border/60"
                              title="Center Aisle"
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  {/* Right Row Indicator */}
                  <span className="w-5 text-center font-mono text-xs font-bold text-muted-foreground uppercase">
                    {row}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Live Hover Readout Bar */}
          <div className="mt-6 h-7 flex items-center justify-center font-mono text-xs">
            {hoveredSeat ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded border border-dashed border-border bg-secondary/40 text-foreground">
                <span className="font-bold">ROW {hoveredSeat.row} · SEAT {hoveredSeat.number}</span>
                <span className="text-muted-foreground">/</span>
                <span className="uppercase text-accent font-semibold">{hoveredSeat.tier}</span>
                <span className="text-muted-foreground">/</span>
                <span className="font-mono font-bold">
                  {hoveredSeat.tier === "sold" ? "UNAVAILABLE" : `${currency}${hoveredSeat.price}.00`}
                </span>
              </div>
            ) : (
              <span className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider">
                HOVER OVER ANY SEAT FOR ROW, TIER, AND ADMISSION RATE
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Perforation Divider Line with Punch Notches */}
      <div className="relative border-t-2 border-dashed border-border">
        <div
          aria-hidden="true"
          className="absolute -left-2.5 -top-2.5 size-5 rounded-full border-2 border-foreground bg-background z-20"
        />
        <div
          aria-hidden="true"
          className="absolute -right-2.5 -top-2.5 size-5 rounded-full border-2 border-foreground bg-background z-20"
        />
      </div>

      {/* Price Calculator & Ticket Stub Readout */}
      <div className="p-4 sm:p-6 bg-secondary/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Selected Seats Pills List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                SELECTED STUBS ({selectedSeatsList.length}/{maxSeats})
              </span>
              {selectedSeatsList.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="font-mono text-[10px] uppercase font-bold text-accent hover:underline"
                >
                  CLEAR ALL
                </button>
              )}
            </div>

            {selectedSeatsList.length === 0 ? (
              <div className="rounded border border-dashed border-border bg-card p-3 text-center font-mono text-xs text-muted-foreground uppercase tracking-wider">
                NO SEATS CURRENTLY RESERVED · CLICK AVAILABLE SEATS ABOVE
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {selectedSeatsList.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1.5 rounded border border-foreground/30 bg-card px-2.5 py-1 font-mono text-xs text-foreground shadow-xs"
                  >
                    <span className="font-bold">
                      {s.row}-{s.number}
                    </span>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      ({s.tier})
                    </span>
                    <span className="font-semibold text-accent">
                      {currency}{s.price}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleSeat(s)}
                      className="ml-0.5 text-muted-foreground hover:text-destructive font-bold focus-visible:outline-hidden"
                      title={`Remove seat ${s.id}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Calculator Readout & Checkout Button */}
          <div className="flex flex-col sm:flex-row lg:flex-col sm:items-end justify-between gap-4 lg:w-72 pt-3 lg:pt-0 border-t lg:border-t-0 border-dashed border-border">
            <div className="w-full space-y-1 font-mono text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>STUBS SUBTOTAL:</span>
                <span className="text-foreground">{currency}{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>FACILITY / STAMP FEE:</span>
                <span className="text-foreground">{currency}{totalFee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between font-bold text-sm text-foreground pt-1.5 border-t border-dashed border-border">
                <span className="uppercase tracking-wider">TOTAL ADMISSION:</span>
                <span className="text-lg text-accent font-black tracking-tight">
                  {currency}{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckoutClick}
              disabled={selectedSeatsList.length === 0}
              className={cn(
                "w-full py-2.5 px-4 rounded-md font-mono text-xs font-black uppercase tracking-wider transition-all focus-visible:ring-2 ring-ring flex items-center justify-center gap-2",
                selectedSeatsList.length > 0
                  ? "bg-foreground text-background hover:opacity-90 shadow-md active:translate-y-0.5"
                  : "bg-muted text-muted-foreground cursor-not-allowed border border-border"
              )}
            >
              <span>ADMIT &amp; RESERVE ({selectedSeatsList.length})</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Security Stamp Micro Line */}
        <div className="mt-4 pt-3 border-t border-dashed border-border/50 flex flex-col sm:flex-row items-center justify-between gap-1 text-center font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
          <span>TICKET CHARTER #SEC-8820 · VALID UPON TURNSTILE SCAN</span>
          <span>ALL SEATS ARE SUBJECT TO VENUE CONDITIONS</span>
        </div>
      </div>
    </div>
  );
}
