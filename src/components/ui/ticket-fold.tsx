"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TicketFoldSeatInfo {
  section?: string;
  row?: string;
  seat?: string;
  gate?: string;
}

export interface TicketFoldProps extends React.HTMLAttributes<HTMLDivElement> {
  eventName?: string;
  subtitle?: string;
  tier?: string;
  serial?: string;
  date?: string;
  time?: string;
  venue?: string;
  seatInfo?: TicketFoldSeatInfo;
  holderName?: string;
  barcodeValue?: string;
  admitCount?: string;
  unfolded?: boolean;
  defaultUnfolded?: boolean;
  onFoldChange?: (unfolded: boolean) => void;
  torn?: boolean;
  defaultTorn?: boolean;
  onTear?: () => void;
  allowTear?: boolean;
  className?: string;
}

export function TicketFold({
  eventName = "NEO-TOKYO SOUNDSYSTEM",
  subtitle = "ANNUAL ELECTRONIC MUSIC SPECTACULAR",
  tier = "VIP ALL-ACCESS",
  serial = "NO. 8942-X",
  date = "2026-10-14",
  time = "21:00 CEST",
  venue = "ARENA 07 · BERLIN TERMINAL",
  seatInfo = { section: "A1", row: "04", seat: "18", gate: "GATE G" },
  holderName = "K. ARMITAGE // CORP-ID 7701",
  barcodeValue = "BB-8942-X-2026",
  admitCount = "ADMIT ONE PASS",
  unfolded,
  defaultUnfolded = false,
  onFoldChange,
  torn,
  defaultTorn = false,
  onTear,
  allowTear = true,
  className,
  ...props
}: TicketFoldProps) {
  const [internalUnfolded, setInternalUnfolded] = React.useState(defaultUnfolded);
  const isUnfolded = unfolded !== undefined ? unfolded : internalUnfolded;

  const [internalTorn, setInternalTorn] = React.useState(defaultTorn);
  const isTorn = torn !== undefined ? torn : internalTorn;

  const handleToggleFold = () => {
    const next = !isUnfolded;
    if (unfolded === undefined) {
      setInternalUnfolded(next);
    }
    onFoldChange?.(next);
  };

  const handleTearSlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!allowTear || isTorn) return;
    if (torn === undefined) {
      setInternalTorn(true);
    }
    onTear?.();
  };

  const handleResetSlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (torn === undefined) {
      setInternalTorn(false);
    }
  };

  return (
    <div
      className={cn("w-full max-w-md mx-auto select-none", className)}
      style={{ perspective: "1400px" }}
      {...props}
    >
      {/* 3D Ticket Accordion Container */}
      <div
        className={cn(
          "relative flex flex-col rounded-xl border-2 border-foreground bg-card shadow-lg transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
          !isUnfolded && "hover:-translate-y-1 hover:shadow-xl"
        )}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Notch Punch Holes on Main Edge */}
        <div
          aria-hidden="true"
          className="absolute -left-3 top-10 size-6 rounded-full border-2 border-foreground bg-background z-30"
        />
        <div
          aria-hidden="true"
          className="absolute -right-3 top-10 size-6 rounded-full border-2 border-foreground bg-background z-30"
        />

        {/* =========================================================================
            PANEL 1: COVER / HEADER PASS (ALWAYS VISIBLE)
           ========================================================================= */}
        <div className="relative z-20 flex flex-col p-5 bg-card rounded-t-xl">
          {/* Top Micro Metadata Bar */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-border/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-accent">
                {admitCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-semibold text-muted-foreground uppercase">
                {serial}
              </span>
              <span className="rounded-sm border border-foreground/30 bg-secondary px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-foreground">
                PASS
              </span>
            </div>
          </div>

          {/* Event Title & Tier */}
          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <span className="inline-block rounded border border-dashed border-accent/70 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-extrabold uppercase tracking-widest text-accent">
                {tier}
              </span>
              <h3 className="mt-2 font-mono text-xl font-black uppercase tracking-tight text-foreground sm:text-2xl">
                {eventName}
              </h3>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                {subtitle}
              </p>
            </div>

            {/* Vintage Stamp Emblem */}
            <div className="hidden sm:flex size-14 shrink-0 rotate-[-8deg] flex-col items-center justify-center rounded-md border-2 border-dashed border-foreground/50 bg-secondary/60 text-center">
              <span className="font-mono text-[8px] font-extrabold uppercase tracking-widest text-muted-foreground">
                VALID
              </span>
              <span className="font-mono text-xs font-black text-foreground">2026</span>
              <span className="font-mono text-[7px] font-bold text-accent">STAGE</span>
            </div>
          </div>

          {/* Date, Time & Venue Banner */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border-2 border-dashed border-border bg-secondary/40 px-3 py-2 text-xs font-mono">
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">
                SHOWTIME
              </span>
              <span className="font-bold text-foreground">
                {date} · {time}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-[9px] uppercase tracking-wider text-muted-foreground">
                VENUE
              </span>
              <span className="font-bold text-foreground">{venue}</span>
            </div>
          </div>

          {/* Accordion Unfold Toggle Control */}
          <div className="mt-4 flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-wider text-muted-foreground">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={cn(
                  "transition-transform duration-500",
                  isUnfolded ? "rotate-180 text-accent" : "rotate-0"
                )}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
              <span>{isUnfolded ? "3-FOLD EXTENDED PASS" : "ACCORDION FOLD PASS"}</span>
            </div>

            <button
              type="button"
              onClick={handleToggleFold}
              aria-expanded={isUnfolded}
              className="inline-flex items-center gap-1.5 rounded border border-foreground bg-primary px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-transform active:scale-95 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>{isUnfolded ? "FOLD PASS" : "UNFOLD PASS"}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={cn("transition-transform duration-500", isUnfolded && "rotate-180")}
              >
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </button>
          </div>
        </div>

        {/* =========================================================================
            CREASE 01: PERFORATION DIVIDER WITH NOTCHES
           ========================================================================= */}
        <div className="relative z-20 flex items-center justify-between bg-card px-0 py-0">
          {/* Left Notch */}
          <div
            aria-hidden="true"
            className="size-5 -ml-2.5 rounded-full border-2 border-foreground bg-background shrink-0 shadow-inner"
          />
          {/* Crease Line with micro text */}
          <div className="relative flex-1 py-1">
            <div className="h-0 w-full border-t-2 border-dashed border-border" />
            <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 bg-card px-2 font-mono text-[8px] font-bold uppercase tracking-[0.25em] text-muted-foreground/80 select-none">
              PERFORATION CREASE 01
            </span>
          </div>
          {/* Right Notch */}
          <div
            aria-hidden="true"
            className="size-5 -mr-2.5 rounded-full border-2 border-foreground bg-background shrink-0 shadow-inner"
          />
        </div>

        {/* =========================================================================
            PANEL 2: 3D ACCORDION MID-SECTION (SEATING & ITINERARY)
           ========================================================================= */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isUnfolded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
          style={{
            transformOrigin: "top center",
            transform: isUnfolded
              ? "rotateX(0deg) translateZ(0)"
              : "rotateX(-75deg) translateY(-20px) translateZ(-40px)",
          }}
        >
          <div className="p-5 bg-card/95 border-b-2 border-dashed border-border/80 relative">
            {/* 3D Fold Crease Shading Overlay */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-foreground/10 to-transparent transition-opacity duration-500",
                isUnfolded ? "opacity-0" : "opacity-100"
              )}
            />

            {/* Access & Seating Grid */}
            <div className="grid grid-cols-4 gap-2 text-center rounded-lg border-2 border-dashed border-border bg-secondary/30 py-3 px-1">
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  SECTION
                </span>
                <span className="font-mono text-sm font-black text-foreground">
                  {seatInfo.section || "GA"}
                </span>
              </div>
              <div className="border-l border-dashed border-border/70">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  ROW
                </span>
                <span className="font-mono text-sm font-black text-foreground">
                  {seatInfo.row || "—"}
                </span>
              </div>
              <div className="border-l border-dashed border-border/70">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  SEAT
                </span>
                <span className="font-mono text-sm font-black text-accent">
                  {seatInfo.seat || "—"}
                </span>
              </div>
              <div className="border-l border-dashed border-border/70">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  GATE
                </span>
                <span className="font-mono text-sm font-black text-foreground">
                  {seatInfo.gate || "MAIN"}
                </span>
              </div>
            </div>

            {/* Holder and Security Details */}
            <div className="mt-3 flex items-center justify-between font-mono text-[10px]">
              <div>
                <span className="text-muted-foreground block text-[9px] uppercase tracking-wider">
                  TICKET HOLDER
                </span>
                <span className="font-bold text-foreground">{holderName}</span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground block text-[9px] uppercase tracking-wider">
                  SECURITY LEVEL
                </span>
                <span className="font-bold text-accent">TIER 1 · ALL-ZONE</span>
              </div>
            </div>

            {/* Perforation Warning Strip */}
            <div className="mt-3 rounded border border-dashed border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-center font-mono text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              * RETAIN FULL ACCORDION PASS UNTIL TURNSTILE SCAN COMPLETE *
            </div>
          </div>
        </div>

        {/* =========================================================================
            CREASE 02: PERFORATION LINE BEFORE TEAR-AWAY SLIP
           ========================================================================= */}
        <div
          className={cn(
            "relative z-20 flex items-center justify-between bg-card transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
            isUnfolded ? "opacity-100 max-h-8" : "opacity-0 max-h-0 overflow-hidden"
          )}
        >
          {/* Left Notch */}
          <div
            aria-hidden="true"
            className="size-5 -ml-2.5 rounded-full border-2 border-foreground bg-background shrink-0 shadow-inner"
          />
          {/* Tear Crease line with scissor icon */}
          <div className="relative flex-1 py-1 flex items-center justify-center">
            <div className="h-0 w-full border-t-2 border-dashed border-border" />
            <div className="absolute left-1/2 -top-2 -translate-x-1/2 bg-card px-2 flex items-center gap-1">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
                aria-hidden="true"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <line x1="20" y1="4" x2="8.12" y2="15.88" />
                <line x1="14.47" y1="14.48" x2="20" y2="20" />
                <line x1="8.12" y1="8.12" x2="12" y2="12" />
              </svg>
              <span className="font-mono text-[8px] font-bold uppercase tracking-[0.25em] text-muted-foreground select-none">
                TEAR ALONG LINE
              </span>
            </div>
          </div>
          {/* Right Notch */}
          <div
            aria-hidden="true"
            className="size-5 -mr-2.5 rounded-full border-2 border-foreground bg-background shrink-0 shadow-inner"
          />
        </div>

        {/* =========================================================================
            PANEL 3: TEAR-AWAY ADMISSION STUB SLIP
           ========================================================================= */}
        <div
          className={cn(
            "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-b-xl overflow-hidden",
            isUnfolded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
          style={{
            transformOrigin: "top center",
            transform: isUnfolded
              ? isTorn
                ? "translateY(12px) rotate(2deg) scale(0.98)"
                : "rotateX(0deg)"
              : "rotateX(75deg) translateY(-20px)",
          }}
        >
          <div
            className={cn(
              "relative p-5 transition-colors duration-500 rounded-b-xl",
              isTorn
                ? "bg-secondary/70 border-2 border-dashed border-destructive/60"
                : "bg-secondary/40"
            )}
          >
            {/* If torn, overlay rubber stamp */}
            {isTorn ? (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/70 backdrop-blur-[1px] p-4 text-center">
                <div className="rotate-[-8deg] rounded-md border-2 border-destructive bg-card/95 px-4 py-2 shadow-lg animate-in fade-in zoom-in duration-300">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-destructive">
                    STUB DETACHED
                  </div>
                  <div className="font-mono text-base font-black tracking-widest text-destructive">
                    CLAIMED // VOID
                  </div>
                  <button
                    type="button"
                    onClick={handleResetSlip}
                    className="mt-2 inline-flex items-center gap-1 rounded border border-dashed border-foreground/40 bg-secondary px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <span>↺ RE-ATTACH STUB</span>
                  </button>
                </div>
              </div>
            ) : null}

            {/* Stub Content Header */}
            <div className="flex items-center justify-between border-b border-dashed border-border/80 pb-2">
              <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
                TURNSTILE ENTRY SLIP
              </span>
              <span className="font-mono text-[9px] font-semibold text-accent">
                ZONE {seatInfo.section} · ROW {seatInfo.row}
              </span>
            </div>

            {/* Stub Event & Serial */}
            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground block">
                  {eventName}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {serial} · {holderName.split("//")[0]}
                </span>
              </div>

              {/* Interactive Tear Trigger Button */}
              {allowTear && !isTorn ? (
                <button
                  type="button"
                  onClick={handleTearSlip}
                  className="group inline-flex items-center gap-1.5 rounded-sm border-2 border-dashed border-destructive/80 bg-card px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider text-destructive shadow-sm transition-all hover:bg-destructive hover:text-destructive-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:rotate-45"
                    aria-hidden="true"
                  >
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <line x1="20" y1="4" x2="8.12" y2="15.88" />
                    <line x1="14.47" y1="14.48" x2="20" y2="20" />
                    <line x1="8.12" y1="8.12" x2="12" y2="12" />
                  </svg>
                  <span>TEAR SLIP</span>
                </button>
              ) : null}
            </div>

            {/* Barcode Strip */}
            <div className="mt-3 border-t border-dashed border-border pt-3">
              <div className="flex h-9 w-full items-center justify-center gap-[3px] overflow-hidden px-2 py-1 bg-card rounded border border-dashed border-border/70">
                {/* Visual Barcode Bars */}
                {[
                  3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 3,
                  2, 1, 4, 2, 1, 3, 4, 1, 2,
                ].map((width, idx) => (
                  <span
                    key={idx}
                    aria-hidden="true"
                    className={cn(
                      "h-full bg-foreground inline-block shrink-0",
                      width === 1 && "w-[1px]",
                      width === 2 && "w-[2px]",
                      width === 3 && "w-[3px]",
                      width === 4 && "w-[4px]"
                    )}
                  />
                ))}
              </div>
              <div className="mt-1 flex items-center justify-between font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                <span>*{barcodeValue}*</span>
                <span>ENTRY ADMITTED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fold state helper badge below container */}
      <div className="mt-2.5 flex items-center justify-between px-1 font-mono text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-1.5 rounded-full transition-colors",
              isUnfolded ? "bg-accent" : "bg-muted-foreground/60"
            )}
          />
          STATUS: {isUnfolded ? "UNFOLDED (FULL 3-PANEL)" : "COMPACT ACCORDION FOLD"}
        </span>
        {isTorn ? (
          <span className="font-bold text-destructive">SLIP TORN & VOIDED</span>
        ) : (
          <span className="text-muted-foreground">PERFORATION INTACT</span>
        )}
      </div>
    </div>
  );
}
