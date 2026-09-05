"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScratchOffProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title of the prize shown when revealed */
  prizeTitle?: string;
  /** Value or headline of the prize */
  prizeAmount?: string;
  /** Secret redeemable voucher / prize code */
  prizeCode?: string;
  /** Subtitle or terms description */
  prizeSubtitle?: string;
  /** Ticket serial number */
  serial?: string;
  /** Name of the lottery / event */
  lotteryTitle?: string;
  /** Reveal threshold percentage (0-100) to trigger auto-reveal */
  revealThreshold?: number;
  /** Brush scratch radius in pixels */
  brushSize?: number;
  /** Controlled reveal state */
  isRevealed?: boolean;
  /** Callback fired when reveal threshold is reached or revealed manually */
  onReveal?: (code: string) => void;
  /** Callback fired when ticket is reset */
  onReset?: () => void;
  /** Custom prize element to reveal under the foil */
  children?: React.ReactNode;
  /** Custom className */
  className?: string;
}

export function ScratchOff({
  prizeTitle = "GRAND RAFFLE WINNER",
  prizeAmount = "$500 VOUCHER",
  prizeCode = "BULL-JACKPOT-777",
  prizeSubtitle = "REDEEMABLE AT ALL TURNSTILES & CONCESSIONS",
  serial = "NO. #774921-X",
  lotteryTitle = "BIG BULL LOTTERY // GOLDEN STUB",
  revealThreshold = 50,
  brushSize = 18,
  isRevealed: controlledIsRevealed,
  onReveal,
  onReset,
  children,
  className,
  ...props
}: ScratchOffProps) {
  const [internalRevealed, setInternalRevealed] = React.useState(false);
  const [scratchedPercent, setScratchedPercent] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const isDrawingRef = React.useRef(false);
  const lastPosRef = React.useRef<{ x: number; y: number } | null>(null);
  const animFrameRef = React.useRef<number | null>(null);

  const isRevealed = controlledIsRevealed ?? internalRevealed;

  // Render metallic foil onto canvas
  const drawFoil = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = "source-over";

    // Warm metallic ticket foil gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#423826");
    gradient.addColorStop(0.25, "#6b5d43");
    gradient.addColorStop(0.5, "#9c8764");
    gradient.addColorStop(0.75, "#6b5d43");
    gradient.addColorStop(1, "#362c1d");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative hatched scratch pattern
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    const step = 14;
    for (let x = -height; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }

    // Foil Border Frame
    ctx.strokeStyle = "rgba(216, 201, 172, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    // Centered foil typographic stamps
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = "rgba(246, 240, 224, 0.95)";
    ctx.font = "900 13px monospace";
    ctx.fillText("★ SCRATCH TO REVEAL ★", width / 2, height / 2 - 10);

    ctx.fillStyle = "rgba(216, 201, 172, 0.85)";
    ctx.font = "bold 9px monospace";
    ctx.fillText("RUB WITH CURSOR OR TOUCH", width / 2, height / 2 + 10);
  }, []);

  // Initialize canvas dimensions on mount or resize
  const setupCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const width = Math.max(Math.floor(rect.width), 200);
    const height = Math.max(Math.floor(rect.height), 120);

    canvas.width = width;
    canvas.height = height;

    if (!isRevealed) {
      drawFoil();
    }
  }, [drawFoil, isRevealed]);

  React.useEffect(() => {
    setupCanvas();

    const handleResize = () => {
      if (!isRevealed) {
        setupCanvas();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [setupCanvas, isRevealed]);

  // Measure scratched percentage
  const calculateScratchedArea = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentCount = 0;
      let totalSamples = 0;
      const stride = 16; // sample every 16th pixel for high performance

      for (let i = 3; i < data.length; i += stride * 4) {
        totalSamples++;
        if (data[i] < 128) {
          transparentCount++;
        }
      }

      const percent = totalSamples > 0 ? Math.round((transparentCount / totalSamples) * 100) : 0;
      setScratchedPercent(percent);

      if (percent >= revealThreshold && !isRevealed) {
        // Auto reveal threshold met!
        setInternalRevealed(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onReveal?.(prizeCode);
      }
    } catch {
      // Ignore canvas security errors if any
    }
  }, [revealThreshold, isRevealed, onReveal, prizeCode]);

  // Scratch action
  const scratch = React.useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas || isRevealed) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      if (lastPosRef.current) {
        ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.arc(x, y, brushSize, 0, Math.PI * 2);
        ctx.fill();
      }

      lastPosRef.current = { x, y };

      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(() => {
          calculateScratchedArea();
          animFrameRef.current = null;
        });
      }
    },
    [brushSize, isRevealed, calculateScratchedArea]
  );

  // Pointer Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    lastPosRef.current = null;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isRevealed) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    try {
      (e.target as HTMLCanvasElement).releasePointerCapture(e.pointerId);
    } catch {
      // In case capture was not registered
    }
    isDrawingRef.current = false;
    lastPosRef.current = null;
    calculateScratchedArea();
  };

  // Full reveal action
  const handleRevealAll = () => {
    setInternalRevealed(true);
    setScratchedPercent(100);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    onReveal?.(prizeCode);
  };

  // Reset ticket action
  const handleReset = () => {
    setInternalRevealed(false);
    setScratchedPercent(0);
    setCopied(false);
    drawFoil();
    onReset?.();
  };

  // Copy code helper
  const handleCopyCode = () => {
    navigator.clipboard.writeText(prizeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="region"
      aria-label="Lottery Scratch-Off Ticket Stub"
      className={cn(
        "relative flex flex-col md:flex-row overflow-hidden rounded-xl border-2 border-foreground bg-card text-foreground shadow-md select-none transition-all",
        className
      )}
      {...props}
    >
      {/* Side Punch Notches on Ticket Edges */}
      <div className="pointer-events-none absolute top-1/2 -left-3 size-5 -translate-y-1/2 rounded-full border-2 border-foreground bg-background" />

      {/* Main Scratch-Off Ticket Body */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between gap-4">
        {/* Ticket Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-3">
          <div>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-accent">
              {lotteryTitle}
            </span>
            <div className="font-mono text-xs text-muted-foreground">{serial}</div>
          </div>

          <div className="rounded-sm border border-foreground/30 bg-secondary/60 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground">
            50% AUTO-REVEAL
          </div>
        </div>

        {/* Scratch Area Container */}
        <div
          ref={containerRef}
          className="relative min-h-[150px] w-full overflow-hidden rounded-lg border-2 border-dashed border-border bg-card"
        >
          {/* Hidden Prize Layer (Underneath the Canvas Foil) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-secondary/10">
            {children ? (
              children
            ) : (
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1 text-accent">
                  <span className="text-sm">★</span>
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-widest">
                    {prizeTitle}
                  </span>
                  <span className="text-sm">★</span>
                </div>

                <div className="font-mono text-2xl md:text-3xl font-black tracking-tight text-foreground">
                  {prizeAmount}
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded border-2 border-dashed border-accent bg-accent/15 px-2.5 py-0.5 font-mono text-xs font-black tracking-widest text-accent">
                    {prizeCode}
                  </span>
                  {isRevealed && (
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="cursor-pointer rounded border border-foreground bg-card px-2 py-0.5 font-mono text-[10px] font-bold text-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {copied ? "COPIED!" : "COPY"}
                    </button>
                  )}
                </div>

                <span className="mt-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {prizeSubtitle}
                </span>
              </div>
            )}
          </div>

          {/* Canvas Scratch Foil Layer */}
          <canvas
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={cn(
              "absolute inset-0 size-full touch-none cursor-crosshair transition-opacity duration-300",
              isRevealed && "pointer-events-none opacity-0"
            )}
            style={{ touchAction: "none" }}
            aria-label="Scratch-off foil layer. Drag with cursor or finger to scratch."
          />
        </div>

        {/* Scratch Progress Meter & Quick Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Progress Bar & Readout */}
          <div className="flex flex-col gap-1 min-w-[140px]">
            <div className="flex items-center justify-between font-mono text-[10px] font-bold text-muted-foreground">
              <span>SCRATCHED: {scratchedPercent}%</span>
              <span>GOAL: {revealThreshold}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full border border-border bg-secondary/40">
              <div
                className={cn(
                  "h-full transition-all duration-150",
                  isRevealed ? "bg-emerald-500" : "bg-accent"
                )}
                style={{ width: `${Math.min(100, (scratchedPercent / revealThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {!isRevealed ? (
              <button
                type="button"
                onClick={handleRevealAll}
                className="cursor-pointer rounded-sm border border-foreground/40 bg-secondary/50 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground hover:border-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                REVEAL ALL
              </button>
            ) : (
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                ✓ REVEALED
              </span>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer rounded-sm border-2 border-foreground bg-card px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              RESET CARD
            </button>
          </div>
        </div>
      </div>

      {/* Perforation Divider with Ticket Punch Cutouts */}
      <div className="relative flex md:flex-col items-center justify-between">
        {/* Top/Left notch */}
        <div className="size-5 rounded-full bg-background border-2 border-foreground -ml-2.5 md:ml-0 md:-mt-2.5 shrink-0" />
        {/* Dashed line */}
        <div className="h-0 w-full md:w-0 md:h-full border-t-2 md:border-t-0 md:border-l-2 border-dashed border-border" />
        {/* Bottom/Right notch */}
        <div className="size-5 rounded-full bg-background border-2 border-foreground -mr-2.5 md:mr-0 md:-mb-2.5 shrink-0" />
      </div>

      {/* Perforated Right Claim Stub */}
      <div className="w-full md:w-44 bg-secondary/30 p-5 flex flex-col justify-between items-center text-center gap-4">
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            CLAIM STUB
          </span>
          <div className="mt-1 font-mono text-xs font-black text-foreground">
            {isRevealed ? "PRIZE UNLOCKED" : "SCRATCH CARD"}
          </div>
          <div className="mt-2 font-mono text-[10px] text-muted-foreground">
            SERIAL: {serial}
          </div>
        </div>

        {/* Mini Status Stamp */}
        <div className="my-2">
          <span
            className={cn(
              "inline-block rotate-[-5deg] rounded-sm border-2 px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest",
              isRevealed
                ? "border-emerald-600 bg-emerald-500/15 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400"
                : "border-border text-muted-foreground"
            )}
          >
            {isRevealed ? "CLAIMABLE" : "UNSCRATCHED"}
          </span>
        </div>

        {/* Stub Barcode & Security Microprint */}
        <div className="w-full border-t border-dashed border-border pt-3">
          <div className="flex justify-center items-center gap-[2px] opacity-75 mb-1" aria-hidden="true">
            <span className="h-5 w-0.5 bg-foreground" />
            <span className="h-5 w-1 bg-foreground" />
            <span className="h-5 w-0.5 bg-foreground" />
            <span className="h-5 w-1.5 bg-foreground" />
            <span className="h-5 w-0.5 bg-foreground" />
            <span className="h-5 w-1 bg-foreground" />
            <span className="h-5 w-0.5 bg-foreground" />
            <span className="h-5 w-2 bg-foreground" />
            <span className="h-5 w-0.5 bg-foreground" />
          </div>
          <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground block">
            VOID IF REMOVED
          </span>
        </div>
      </div>
    </div>
  );
}
