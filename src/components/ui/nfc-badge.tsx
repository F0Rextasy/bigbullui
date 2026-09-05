"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type NfcStatus = "idle" | "scanning" | "success" | "denied";

export interface NfcBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Name of the credential holder */
  holderName?: string;
  /** Unique NFC chip / badge identifier */
  passId?: string;
  /** Department, crew role, or category */
  department?: string;
  /** Access tier label displayed on stamp */
  accessLevel?: string;
  /** Gate turnstile or terminal identifier */
  gate?: string;
  /** Expiration or season validity string */
  validUntil?: string;
  /** Controlled status override */
  status?: NfcStatus;
  /** Duration in ms to show admission success before resetting to idle (0 to stay) */
  autoResetDuration?: number;
  /** Whether to render the acoustic chime visual indicator on success */
  showChimeVisual?: boolean;
  /** Callback fired when pass is tapped */
  onTap?: () => void;
  /** Callback fired on successful gate admission */
  onAdmission?: (passId: string) => void;
  /** Custom className */
  className?: string;
}

export function NfcBadge({
  holderName = "MAXINE VANCE",
  passId = "NFC-8842-VIP",
  department = "STAGE MANAGEMENT // SOUND A1",
  accessLevel = "ALL ACCESS VIP",
  gate = "NORTH TURNSTILE 04",
  validUntil = "SEASON 2026",
  status: controlledStatus,
  autoResetDuration = 2800,
  showChimeVisual = true,
  onTap,
  onAdmission,
  className,
  ...props
}: NfcBadgeProps) {
  const [internalStatus, setInternalStatus] = React.useState<NfcStatus>("idle");
  const [tapRippleKey, setTapRippleKey] = React.useState(0);
  const resetTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentStatus = controlledStatus ?? internalStatus;

  // Clean up timer on unmount
  React.useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const triggerTap = React.useCallback(() => {
    if (currentStatus === "scanning") return;

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    setTapRippleKey((prev) => prev + 1);
    onTap?.();

    if (controlledStatus !== undefined) return;

    // Simulate contactless scan flow
    setInternalStatus("scanning");

    setTimeout(() => {
      setInternalStatus("success");
      onAdmission?.(passId);

      if (autoResetDuration > 0) {
        resetTimerRef.current = setTimeout(() => {
          setInternalStatus("idle");
        }, autoResetDuration);
      }
    }, 700);
  }, [currentStatus, controlledStatus, onTap, onAdmission, passId, autoResetDuration]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerTap();
    }
  };

  return (
    <div
      role="region"
      aria-label={`NFC Gate Pass for ${holderName}`}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-xl border-2 border-foreground bg-card text-foreground shadow-lg select-none transition-all duration-200",
        className
      )}
      {...props}
    >
      {/* Top Lanyard Punch Hole Notch & Strap Loop */}
      <div className="relative flex flex-col items-center pt-3 pb-1 bg-secondary/30 border-b-2 border-dashed border-border">
        {/* Lanyard Hook Clip Representation */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <div className="h-3 w-8 rounded-t border-2 border-foreground/40 bg-muted" />
        </div>

        {/* Lanyard Punch Hole Slot */}
        <div className="relative z-10 flex h-4 w-14 items-center justify-center rounded-full border-2 border-foreground bg-background shadow-inner">
          <div className="h-1.5 w-10 rounded-full bg-border/60" />
        </div>

        {/* Micro Label */}
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-bold">
          RFID // 13.56 MHz NFC GATE PASS
        </span>
      </div>

      {/* Ticket Punch Side Notches */}
      <div className="pointer-events-none absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full border-2 border-foreground bg-background" />
      <div className="pointer-events-none absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full border-2 border-foreground bg-background" />

      {/* Main Double-Frame Interior */}
      <div className="p-5 flex flex-col gap-4">
        {/* Pass Header: Tier Stamp & Serial */}
        <div className="flex items-center justify-between gap-2 border-b-2 border-dashed border-border pb-3">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              CREDENTIAL ID
            </span>
            <span className="font-mono text-sm font-extrabold text-foreground tracking-wider">
              {passId}
            </span>
          </div>

          <div
            className={cn(
              "rotate-[-3deg] rounded-sm border-2 px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest shadow-xs",
              currentStatus === "success"
                ? "border-emerald-600 bg-emerald-500/15 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400"
                : "border-accent bg-accent/15 text-accent"
            )}
          >
            {accessLevel}
          </div>
        </div>

        {/* Holder Identity Banner */}
        <div className="rounded-lg border-2 border-dashed border-border bg-secondary/20 p-3.5 flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-md border-2 border-foreground bg-card font-mono text-base font-black text-foreground shadow-xs">
            {holderName
              .split(" ")
              .map((part) => part[0])
              .filter(Boolean)
              .slice(0, 2)
              .join("") || "ID"}
          </div>

          <div className="min-w-0 flex-1">
            <div className="truncate font-mono text-base font-black tracking-tight text-foreground">
              {holderName}
            </div>
            <div className="truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {department}
            </div>
            <div className="mt-1 flex items-center gap-2 font-mono text-[9px] text-muted-foreground">
              <span className="inline-block size-1.5 rounded-full bg-accent animate-pulse" />
              <span>{gate}</span>
            </div>
          </div>
        </div>

        {/* Contactless Target / NFC Tap Simulator Zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Tap pass to simulate RFID turnstile scan"
          onClick={triggerTap}
          onKeyDown={handleKeyDown}
          className={cn(
            "group relative flex flex-col items-center justify-center overflow-hidden rounded-lg border-2 p-5 text-center cursor-pointer transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring select-none",
            currentStatus === "idle" &&
              "border-dashed border-border bg-secondary/30 hover:border-foreground hover:bg-secondary/50",
            currentStatus === "scanning" &&
              "border-accent bg-accent/10 shadow-inner ring-2 ring-accent/30",
            currentStatus === "success" &&
              "border-emerald-600 bg-emerald-500/10 dark:border-emerald-400",
            currentStatus === "denied" &&
              "border-destructive bg-destructive/10"
          )}
        >
          {/* Animated Radio Wave Ripples */}
          <div className="relative my-2 flex size-20 items-center justify-center">
            {/* Concentric ripple pulses on tap */}
            <span
              key={`ripple-1-${tapRippleKey}`}
              className={cn(
                "absolute inset-0 rounded-full border-2 opacity-0",
                currentStatus === "scanning"
                  ? "border-accent animate-ping"
                  : currentStatus === "success"
                  ? "border-emerald-500 animate-ping"
                  : "group-hover:border-foreground/40 group-hover:animate-ping"
              )}
            />
            <span
              key={`ripple-2-${tapRippleKey}`}
              className={cn(
                "absolute -inset-2 rounded-full border border-dashed opacity-0 transition-opacity",
                currentStatus === "scanning" && "border-accent animate-pulse opacity-100",
                currentStatus === "success" && "border-emerald-500 animate-pulse opacity-100",
                currentStatus === "idle" && "group-hover:opacity-40"
              )}
            />

            {/* Central RFID / Radio Wave Icon */}
            <div
              className={cn(
                "flex size-14 items-center justify-center rounded-full border-2 transition-transform duration-200 group-hover:scale-105",
                currentStatus === "idle" && "border-foreground bg-card text-foreground shadow-xs",
                currentStatus === "scanning" && "border-accent bg-accent text-accent-foreground scale-110 shadow-md",
                currentStatus === "success" && "border-emerald-600 bg-emerald-600 text-white scale-110 shadow-md",
                currentStatus === "denied" && "border-destructive bg-destructive text-white"
              )}
            >
              {currentStatus === "success" ? (
                /* Admission Checkmark Icon */
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : currentStatus === "denied" ? (
                /* Cross Icon */
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                /* Standard Contactless 4-Wave Radio Icon */
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={cn(
                    "transition-all duration-300",
                    currentStatus === "scanning" && "animate-pulse"
                  )}
                  aria-hidden="true"
                >
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                  <path d="M10.6 13.4c-0.8-0.8-0.8-2 0-2.8" />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                  <path d="M13.4 10.6c0.8 0.8 0.8 2 0 2.8" />
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                  <path d="M19.1 4.9c3.9 3.9 3.9 10.2 0 14.1" />
                </svg>
              )}
            </div>
          </div>

          {/* TAP PASS TO ENTER Status Badge */}
          <div className="mt-2 flex flex-col items-center gap-1">
            <div
              className={cn(
                "inline-flex items-center gap-1.5 rounded-sm border px-3 py-1 font-mono text-xs font-black uppercase tracking-wider transition-colors",
                currentStatus === "idle" &&
                  "border-foreground bg-card text-foreground shadow-xs group-hover:bg-foreground group-hover:text-background",
                currentStatus === "scanning" &&
                  "border-accent bg-accent text-accent-foreground animate-pulse",
                currentStatus === "success" &&
                  "border-emerald-600 bg-emerald-600 text-white font-bold",
                currentStatus === "denied" &&
                  "border-destructive bg-destructive text-white font-bold"
              )}
            >
              {currentStatus === "idle" && (
                <>
                  <span className="inline-block size-2 rounded-full bg-accent animate-ping" />
                  <span>TAP PASS TO ENTER</span>
                </>
              )}
              {currentStatus === "scanning" && <span>AUTHENTICATING CHIP...</span>}
              {currentStatus === "success" && <span>ACCESS GRANTED • ENTER</span>}
              {currentStatus === "denied" && <span>ACCESS RESTRICTED</span>}
            </div>

            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {currentStatus === "idle"
                ? "CLICK OR TAP PASS TO SIMULATE RFID"
                : currentStatus === "scanning"
                ? "SYNCING WITH TURNSTILE BEACON"
                : currentStatus === "success"
                ? "TURNSTILE GATE UNLOCKED"
                : "CONTACT BOX OFFICE DESK"}
            </span>
          </div>

          {/* Successful Admission Chime Visual Indicator */}
          {showChimeVisual && currentStatus === "success" && (
            <div
              className="mt-3 flex w-full items-center justify-center gap-2 rounded border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-emerald-700 dark:text-emerald-300 animate-in fade-in zoom-in-95 duration-200"
              aria-live="polite"
            >
              {/* Chime Bell Icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce"
                aria-hidden="true"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>

              <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                ♫ ADMISSION CHIME CONFIRMED
              </span>

              {/* Acoustic Chime Reverberation Bars */}
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 h-2 rounded-full bg-current animate-pulse" />
                <span className="w-0.5 h-3.5 rounded-full bg-current animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 rounded-full bg-current animate-pulse delay-150" />
                <span className="w-0.5 h-3 rounded-full bg-current animate-pulse delay-100" />
              </div>
            </div>
          )}
        </div>

        {/* Footer Info & Mock Barcode */}
        <div className="border-t-2 border-dashed border-border pt-3 flex items-center justify-between">
          <div className="flex flex-col font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
            <span>TURNSTILE: {gate}</span>
            <span>VALID: {validUntil}</span>
          </div>

          {/* Micro Striped Barcode Graphic */}
          <div className="flex items-center gap-[2px] opacity-80" aria-hidden="true">
            <span className="h-6 w-1 bg-foreground" />
            <span className="h-6 w-0.5 bg-foreground" />
            <span className="h-6 w-1.5 bg-foreground" />
            <span className="h-6 w-0.5 bg-foreground" />
            <span className="h-6 w-2 bg-foreground" />
            <span className="h-6 w-0.5 bg-foreground" />
            <span className="h-6 w-1 bg-foreground" />
            <span className="h-6 w-1.5 bg-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
