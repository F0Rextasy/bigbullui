"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TicketScanData {
  code: string;
  type: "QR-MATRIX" | "BARCODE-128";
  attendee: string;
  tier: string;
  seat: string;
  gate: string;
  timestamp: string;
  status: "VALID" | "ALREADY-SCANNED" | "INVALID";
}

export interface QrReaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header title for the turnstile scanner */
  title?: string;
  /** Gate identifier */
  gateId?: string;
  /** Whether the scanner lens is active */
  active?: boolean;
  /** Initial or controlled scan data */
  defaultScanResult?: TicketScanData | null;
  /** Callback fired when a valid ticket is detected */
  onScan?: (data: TicketScanData) => void;
  /** Callback fired when scanner is reset */
  onReset?: () => void;
  /** Whether to display the animated red laser sweep line */
  showLaser?: boolean;
  /** Whether to display corner bracket crosshairs */
  showCrosshairs?: boolean;
  /** Whether to display scanner controls */
  showControls?: boolean;
  /** Additional container classes */
  className?: string;
}

const DEFAULT_MOCK_TICKETS: TicketScanData[] = [
  {
    code: "TK-9428-VIP",
    type: "QR-MATRIX",
    attendee: "ALEXIS VANCE",
    tier: "VIP ORCHESTRA",
    seat: "SEC A · ROW 01 · SEAT 14",
    gate: "GATE 04B",
    timestamp: "20:14:02",
    status: "VALID",
  },
  {
    code: "TK-3310-GA",
    type: "BARCODE-128",
    attendee: "JORDAN REED",
    tier: "GENERAL ADMIT",
    seat: "SEC C · ROW 12 · SEAT 08",
    gate: "GATE 04B",
    timestamp: "20:14:18",
    status: "VALID",
  },
  {
    code: "TK-8854-PIT",
    type: "QR-MATRIX",
    attendee: "SAMIRA KHAN",
    tier: "FRONT PIT PASS",
    seat: "PIT · ROW AA · SEAT 03",
    gate: "GATE 04B",
    timestamp: "20:14:35",
    status: "VALID",
  },
];

export function QrReader({
  title = "TURNSTILE SCANNER",
  gateId = "GATE 04B // TURNSTILE-02",
  active = true,
  defaultScanResult = null,
  onScan,
  onReset,
  showLaser = true,
  showCrosshairs = true,
  showControls = true,
  className,
  ...props
}: QrReaderProps) {
  const [isScanning, setIsScanning] = React.useState(active);
  const [laserActive, setLaserActive] = React.useState(showLaser);
  const [torchOn, setTorchOn] = React.useState(false);
  const [scanResult, setScanResult] = React.useState<TicketScanData | null>(
    defaultScanResult
  );
  const [detectionPulse, setDetectionPulse] = React.useState(false);
  const [cameraMode, setCameraMode] = React.useState<"REAR 1X" | "REAR 0.5X" | "FRONT">(
    "REAR 1X"
  );
  const [mockIndex, setMockIndex] = React.useState(0);

  // Sync prop changes
  React.useEffect(() => {
    setIsScanning(active);
  }, [active]);

  React.useEffect(() => {
    setLaserActive(showLaser);
  }, [showLaser]);

  const triggerScanSimulation = React.useCallback(() => {
    if (!isScanning && scanResult) {
      // If already scanned, reset first
      setScanResult(null);
      setIsScanning(true);
      setDetectionPulse(false);
      onReset?.();
      return;
    }

    const nextTicket = DEFAULT_MOCK_TICKETS[mockIndex % DEFAULT_MOCK_TICKETS.length];
    setMockIndex((prev) => prev + 1);

    // Trigger visual pulse
    setDetectionPulse(true);
    setScanResult(nextTicket);
    setIsScanning(false);
    onScan?.(nextTicket);

    const timer = setTimeout(() => {
      setDetectionPulse(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [isScanning, scanResult, mockIndex, onScan, onReset]);

  const handleReset = React.useCallback(() => {
    setScanResult(null);
    setIsScanning(true);
    setDetectionPulse(false);
    onReset?.();
  }, [onReset]);

  const cycleCamera = React.useCallback(() => {
    setCameraMode((prev) => {
      if (prev === "REAR 1X") return "REAR 0.5X";
      if (prev === "REAR 0.5X") return "FRONT";
      return "REAR 1X";
    });
  }, []);

  return (
    <div
      className={cn(
        "relative flex flex-col w-full max-w-md overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-md select-none font-mono text-card-foreground",
        className
      )}
      role="region"
      aria-label={title}
      {...props}
    >
      <style>{`
        @keyframes laserSweep {
          0% { top: 4%; opacity: 0.9; }
          50% { top: 92%; opacity: 1; }
          100% { top: 4%; opacity: 0.9; }
        }
        @keyframes pulseRingSweep {
          0% { transform: scale(0.96); opacity: 0.9; }
          50% { transform: scale(1.06); opacity: 0.3; }
          100% { transform: scale(0.96); opacity: 0.9; }
        }
      `}</style>

      {/* Ticket Edge Notches */}
      <div
        className="size-5 rounded-full bg-background border-2 border-foreground absolute top-1/2 -left-2.5 -translate-y-1/2 z-30 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="size-5 rounded-full bg-background border-2 border-foreground absolute top-1/2 -right-2.5 -translate-y-1/2 z-30 pointer-events-none"
        aria-hidden="true"
      />

      {/* Scanner Headstock */}
      <div className="flex items-center justify-between border-b-2 border-foreground bg-secondary px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2.5 rounded-full transition-colors",
              scanResult
                ? "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                : isScanning
                ? "bg-destructive animate-pulse shadow-[0_0_8px_#ef4444]"
                : "bg-muted-foreground"
            )}
          />
          <span className="font-mono text-xs font-black uppercase tracking-wider text-foreground">
            {title}
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {gateId}
        </span>
      </div>

      {/* Subheader Status Bar */}
      <div className="flex items-center justify-between border-b border-dashed border-border px-4 py-1.5 text-[10px] text-muted-foreground uppercase">
        <span>CAM: {cameraMode}</span>
        <span>
          STATUS:{" "}
          <strong
            className={cn(
              "font-bold",
              scanResult ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"
            )}
          >
            {scanResult ? "PASS VALIDATED" : isScanning ? "SCANNING RETICLE" : "STANDBY"}
          </strong>
        </span>
        <span>ISO 400 // 60FPS</span>
      </div>

      {/* Viewfinder Main Viewport */}
      <div className="relative p-4 sm:p-5">
        <div
          onClick={triggerScanSimulation}
          className={cn(
            "relative w-full aspect-square max-h-[300px] sm:max-h-[320px] mx-auto rounded-lg overflow-hidden border-2 border-foreground bg-neutral-950 text-neutral-100 flex items-center justify-center cursor-pointer group shadow-inner transition-all",
            torchOn && "ring-4 ring-amber-300/40",
            detectionPulse && "ring-4 ring-emerald-500 shadow-[0_0_24px_rgba(16,185,129,0.6)]"
          )}
          title="Click to simulate ticket barcode scan"
        >
          {/* Torch Light Ambient Simulation */}
          {torchOn && (
            <div className="absolute inset-0 bg-amber-100/15 pointer-events-none z-10 mix-blend-screen" />
          )}

          {/* Camera Sensor Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Viewfinder HUD Micro Metadata */}
          <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-400 pointer-events-none z-20">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-red-500 animate-ping" />
              <span>LIVE SENSOR</span>
            </span>
            <span>AUTO-FOCUS ON</span>
          </div>

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono tracking-widest text-neutral-400 pointer-events-none z-20">
            <span>ALIGN PASS</span>
            <span>ZOOM: 1.0X</span>
          </div>

          {/* Center Targeting Reticle Container */}
          <div className="relative size-48 sm:size-52 flex items-center justify-center">
            {/* Target Reticle Frame */}
            <div
              className={cn(
                "relative size-full rounded-md border-2 border-dashed transition-colors duration-300 flex items-center justify-center",
                scanResult
                  ? "border-emerald-500 bg-emerald-950/20"
                  : "border-accent/70 bg-black/40"
              )}
            >
              {/* Corner Bracket Crosshairs */}
              {showCrosshairs && (
                <>
                  {/* Top-Left */}
                  <div className="absolute -top-1 -left-1 size-4 border-t-2 border-l-2 border-accent" />
                  {/* Top-Right */}
                  <div className="absolute -top-1 -right-1 size-4 border-t-2 border-r-2 border-accent" />
                  {/* Bottom-Left */}
                  <div className="absolute -bottom-1 -left-1 size-4 border-b-2 border-l-2 border-accent" />
                  {/* Bottom-Right */}
                  <div className="absolute -bottom-1 -right-1 size-4 border-b-2 border-r-2 border-accent" />
                </>
              )}

              {/* Center Crosshair Tick */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative size-4 opacity-50">
                  <div className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-accent" />
                  <div className="absolute top-1/2 left-0 w-full h-[1.5px] -translate-y-1/2 bg-accent" />
                </div>
              </div>

              {/* Simulated QR Code Silhouette Pattern */}
              <div
                className={cn(
                  "relative size-32 p-1.5 transition-opacity duration-300",
                  scanResult ? "opacity-100" : "opacity-35 group-hover:opacity-50"
                )}
              >
                <svg
                  viewBox="0 0 100 100"
                  className={cn(
                    "size-full transition-colors",
                    scanResult ? "text-emerald-400" : "text-neutral-200"
                  )}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  {/* QR Finder Pattern Top-Left */}
                  <rect x="0" y="0" width="28" height="28" fill="currentColor" rx="2" />
                  <rect x="4" y="4" width="20" height="20" fill="#0a0a0a" rx="1" />
                  <rect x="8" y="8" width="12" height="12" fill="currentColor" rx="1" />

                  {/* QR Finder Pattern Top-Right */}
                  <rect x="72" y="0" width="28" height="28" fill="currentColor" rx="2" />
                  <rect x="76" y="4" width="20" height="20" fill="#0a0a0a" rx="1" />
                  <rect x="80" y="8" width="12" height="12" fill="currentColor" rx="1" />

                  {/* QR Finder Pattern Bottom-Left */}
                  <rect x="0" y="72" width="28" height="28" fill="currentColor" rx="2" />
                  <rect x="4" y="76" width="20" height="20" fill="#0a0a0a" rx="1" />
                  <rect x="8" y="80" width="12" height="12" fill="currentColor" rx="1" />

                  {/* QR Matrix Payload Bits */}
                  <rect x="34" y="6" width="8" height="8" />
                  <rect x="48" y="10" width="6" height="6" />
                  <rect x="60" y="4" width="6" height="8" />
                  <rect x="36" y="22" width="6" height="6" />
                  <rect x="50" y="24" width="8" height="6" />
                  <rect x="6" y="36" width="8" height="6" />
                  <rect x="20" y="34" width="6" height="8" />
                  <rect x="34" y="38" width="10" height="6" />
                  <rect x="52" y="36" width="8" height="8" />
                  <rect x="66" y="34" width="6" height="6" />
                  <rect x="78" y="38" width="8" height="8" />
                  <rect x="90" y="34" width="6" height="6" />
                  <rect x="10" y="50" width="6" height="8" />
                  <rect x="24" y="48" width="8" height="6" />
                  <rect x="38" y="52" width="6" height="8" />
                  <rect x="50" y="50" width="10" height="6" />
                  <rect x="68" y="48" width="6" height="8" />
                  <rect x="82" y="52" width="8" height="6" />
                  <rect x="36" y="68" width="8" height="8" />
                  <rect x="52" y="66" width="6" height="6" />
                  <rect x="66" y="70" width="8" height="6" />
                  <rect x="80" y="66" width="8" height="8" />
                  <rect x="38" y="82" width="6" height="8" />
                  <rect x="50" y="80" width="8" height="6" />
                  <rect x="64" y="84" width="6" height="8" />
                  <rect x="78" y="80" width="6" height="6" />
                  <rect x="90" y="82" width="6" height="8" />
                </svg>
              </div>

              {/* Animated Red Laser Sweep Line */}
              {laserActive && isScanning && !scanResult && (
                <div
                  className="absolute left-0 right-0 z-30 pointer-events-none"
                  style={{
                    animation: "laserSweep 2.2s ease-in-out infinite",
                  }}
                >
                  {/* Intense laser beam line */}
                  <div className="h-[2px] w-full bg-red-500 shadow-[0_0_10px_2px_#ef4444]" />
                  {/* Subtle red laser glow cone */}
                  <div className="h-6 w-full bg-gradient-to-b from-red-500/25 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Success Detection Pulse Ring & Stamp */}
              {scanResult && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-40 bg-black/60 backdrop-blur-xs p-2 text-center">
                  <div className="animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center">
                    <div className="size-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mb-1.5 shadow-[0_0_12px_#10b981]">
                      <svg
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="rotate-[-3deg] rounded-xs border border-emerald-400 bg-emerald-500 px-2 py-0.5 text-[11px] font-black tracking-widest text-neutral-950 uppercase shadow-xs">
                      ACCESS GRANTED
                    </span>
                    <span className="mt-1 font-mono text-[10px] font-bold text-emerald-400 tracking-wider">
                      {scanResult.code}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Click hint badge */}
          <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
            <span className="rounded-xs bg-black/70 border border-neutral-700 px-2 py-0.5 font-mono text-[9px] text-neutral-300 uppercase tracking-wider backdrop-blur-xs">
              {scanResult ? "CLICK TO SCAN NEXT TICKET" : "TAP TO SIMULATE ADMISSION"}
            </span>
          </div>
        </div>
      </div>

      {/* Ticket Detection Stub Readout Card */}
      {scanResult ? (
        <div className="mx-4 mb-4 rounded-lg border-2 border-foreground bg-secondary/50 p-3 shadow-xs">
          <div className="flex items-center justify-between border-b border-dashed border-border pb-2">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground block">
                VALIDATED PASS
              </span>
              <span className="font-mono text-sm font-bold text-foreground">
                {scanResult.attendee}
              </span>
            </div>
            <span className="rounded-xs border border-dashed border-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
              {scanResult.tier}
            </span>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <span className="text-muted-foreground block">SEAT INFO:</span>
              <span className="font-bold text-foreground">{scanResult.seat}</span>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground block">TIME &amp; GATE:</span>
              <span className="font-bold text-foreground">
                {scanResult.timestamp} · {scanResult.gate}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-4 mb-4 rounded-lg border border-dashed border-border bg-muted/30 p-2.5 text-center">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            AWAITING TICKET STUB // TURNSTILE READY
          </span>
        </div>
      )}

      {/* Interactive Controls Bar */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-foreground bg-card p-3">
          <div className="flex items-center gap-1.5">
            {/* Simulate Scan Button */}
            <button
              type="button"
              onClick={triggerScanSimulation}
              className="inline-flex items-center gap-1.5 rounded-sm border-2 border-foreground bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground shadow-xs transition-transform hover:scale-102 active:scale-98 cursor-pointer"
            >
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                <line x1="7" y1="12" x2="17" y2="12" />
              </svg>
              <span>{scanResult ? "NEXT PASS" : "SCAN"}</span>
            </button>

            {/* Reset Button */}
            {scanResult && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-sm border border-foreground/50 bg-secondary px-2 py-1 text-xs font-bold text-foreground hover:bg-muted cursor-pointer transition-colors"
              >
                RESET
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Laser Beam Toggle */}
            <button
              type="button"
              onClick={() => setLaserActive(!laserActive)}
              className={cn(
                "rounded-sm border px-2 py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer",
                laserActive
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
              title="Toggle laser sweep line"
            >
              LASER: {laserActive ? "ON" : "OFF"}
            </button>

            {/* Torch Flash Toggle */}
            <button
              type="button"
              onClick={() => setTorchOn(!torchOn)}
              className={cn(
                "rounded-sm border px-2 py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer",
                torchOn
                  ? "border-amber-500 bg-amber-500/20 text-amber-600 dark:text-amber-400"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
              title="Toggle viewfinder torch light"
            >
              TORCH
            </button>

            {/* Camera Switch */}
            <button
              type="button"
              onClick={cycleCamera}
              className="rounded-sm border border-border px-2 py-1 text-[10px] font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-colors uppercase"
              title="Switch camera lens"
            >
              {cameraMode.split(" ")[0]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
