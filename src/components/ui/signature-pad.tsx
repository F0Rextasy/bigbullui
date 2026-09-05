"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SignaturePadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Canvas height in pixels (default: 160) */
  height?: number;
  /** Stroke color (default: "currentColor") */
  strokeColor?: string;
  /** Pen stroke line width in pixels (default: 2.5) */
  strokeWidth?: number;
  /** Header title on ticket receipt stub (default: "TICKET HOLDER ENDORSEMENT") */
  title?: string;
  /** Ticket or stub serial number (default: "STUB #BB-8841") */
  stubNumber?: string;
  /** Micro instruction below signature line */
  instruction?: string;
  /** Text shown inside the rubber stamp seal (default: "SIGNED & ENDORSED") */
  stampText?: string;
  /** Whether the pad is initially endorsed / stamped */
  defaultEndorsed?: boolean;
  /** Whether the canvas is disabled / read-only */
  disabled?: boolean;
  /** Whether to play a synthesized rubber stamp thud sound (default: true) */
  enableSound?: boolean;
  /** Callback fired whenever user finishes a stroke, receiving dataURL or null if empty */
  onChange?: (dataUrl: string | null) => void;
  /** Callback fired when signature is cleared */
  onClear?: () => void;
  /** Callback fired when user endorses the ticket, receiving the image dataURL */
  onEndorse?: (dataUrl: string) => void;
  className?: string;
}

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
}

/**
 * Generates an acoustic rubber-stamp thud / mechanical latch sound using Web Audio API.
 */
function playStampSound(): void {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // Heavy stamp thud
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.13);

    // Mechanical ink slap
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(450, now);
    clickOsc.frequency.exponentialRampToValueAtTime(90, now + 0.05);
    clickGain.gain.setValueAtTime(0.2, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.06);

    setTimeout(() => {
      ctx.close();
    }, 180);
  } catch {
    // AudioContext blocked
  }
}

export function SignaturePad({
  height = 160,
  strokeColor = "currentColor",
  strokeWidth = 2.5,
  title = "TICKET HOLDER ENDORSEMENT",
  stubNumber = "STUB #BB-8841",
  instruction = "AUTHORIZED SIGNATURE // ADMISSION HOLDER",
  stampText = "SIGNED & ENDORSED",
  defaultEndorsed = false,
  disabled = false,
  enableSound = true,
  onChange,
  onClear,
  onEndorse,
  className,
  ...props
}: SignaturePadProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [strokes, setStrokes] = React.useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = React.useState<Point[] | null>(null);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [isEndorsed, setIsEndorsed] = React.useState(defaultEndorsed);
  const [stampTime, setStampTime] = React.useState<string>("");

  const hasSignature = strokes.length > 0 || (currentStroke !== null && currentStroke.length > 0);

  // Set initial stamp timestamp on client
  React.useEffect(() => {
    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} // ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    setStampTime(formatted);
  }, []);

  // Redraw all strokes onto the canvas
  const redraw = React.useCallback(
    (strokeList: Stroke[], liveStroke: Point[] | null) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      ctx.lineWidth = strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Detect foreground color if currentColor is passed
      let effectiveColor = strokeColor;
      if (strokeColor === "currentColor" && containerRef.current && typeof window !== "undefined") {
        effectiveColor = window.getComputedStyle(containerRef.current).color || "#17130c";
      }
      ctx.strokeStyle = effectiveColor;

      const allStrokes = liveStroke ? [...strokeList, { points: liveStroke }] : strokeList;

      for (const stroke of allStrokes) {
        if (stroke.points.length === 0) continue;
        ctx.beginPath();
        if (stroke.points.length === 1) {
          ctx.arc(stroke.points[0].x, stroke.points[0].y, strokeWidth / 2, 0, Math.PI * 2);
          ctx.fillStyle = effectiveColor;
          ctx.fill();
        } else {
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          for (let i = 1; i < stroke.points.length; i++) {
            const p1 = stroke.points[i - 1];
            const p2 = stroke.points[i];
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
          }
          const last = stroke.points[stroke.points.length - 1];
          ctx.lineTo(last.x, last.y);
          ctx.stroke();
        }
      }
    },
    [strokeColor, strokeWidth]
  );

  // Resize canvas according to HiDPI and container width
  const handleResize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    redraw(strokes, currentStroke);
  }, [height, redraw, strokes, currentStroke]);

  React.useEffect(() => {
    handleResize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [handleResize]);

  // Coordinate extractor for both Mouse and Touch
  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  // Drawing event handlers
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (disabled || isEndorsed) return;
    const pt = getCoordinates(e);
    if (!pt) return;

    setIsDrawing(true);
    setCurrentStroke([pt]);
    redraw(strokes, [pt]);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing || disabled || isEndorsed || !currentStroke) return;
    const pt = getCoordinates(e);
    if (!pt) return;

    const nextStroke = [...currentStroke, pt];
    setCurrentStroke(nextStroke);
    redraw(strokes, nextStroke);
  };

  const endDrawing = () => {
    if (!isDrawing || !currentStroke) return;
    setIsDrawing(false);

    const updatedStrokes = [...strokes, { points: currentStroke }];
    setStrokes(updatedStrokes);
    setCurrentStroke(null);
    redraw(updatedStrokes, null);

    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      onChange?.(dataUrl);
    }
  };

  const handleClear = () => {
    if (disabled) return;
    setStrokes([]);
    setCurrentStroke(null);
    setIsDrawing(false);
    setIsEndorsed(false);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
    }

    onChange?.(null);
    onClear?.();
  };

  const handleEndorse = () => {
    if (disabled || !hasSignature) return;

    if (enableSound) {
      playStampSound();
    }

    setIsEndorsed(true);

    const now = new Date();
    const formatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} // ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
    setStampTime(formatted);

    if (canvasRef.current) {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      onEndorse?.(dataUrl);
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current || !hasSignature) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `ticket-signature-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative select-none overflow-hidden rounded-md border-2 border-dashed border-foreground bg-card text-foreground shadow-sm font-mono",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {/* Top Ticket Punch Notch Cutouts */}
      <span
        className="absolute -left-2.5 top-12 size-5 rounded-full border-2 border-foreground bg-background z-20"
        aria-hidden="true"
      />
      <span
        className="absolute -right-2.5 top-12 size-5 rounded-full border-2 border-foreground bg-background z-20"
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* HEADER SECTION: TICKET STUB BANNER                           */}
      {/* ============================================================ */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-border px-4 py-2.5 bg-secondary/50">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
            {stubNumber}
          </span>
          <span className="text-xs font-black tracking-tight text-foreground uppercase">
            {title}
          </span>
        </div>

        {/* Live Indicator Pill */}
        <div className="flex items-center gap-2">
          {isEndorsed ? (
            <span className="flex items-center gap-1.5 rounded border border-dashed border-accent bg-accent/15 px-2 py-0.5 text-[10px] font-black text-accent uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              ENDORSED
            </span>
          ) : isDrawing ? (
            <span className="flex items-center gap-1.5 rounded border border-dashed border-foreground bg-foreground/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-foreground animate-ping" />
              SIGNING...
            </span>
          ) : hasSignature ? (
            <span className="flex items-center gap-1.5 rounded border border-border bg-card px-2 py-0.5 text-[10px] font-bold text-foreground uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-emerald-600" />
              SIGNATURE READY
            </span>
          ) : (
            <span className="flex items-center gap-1.5 rounded border border-dashed border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-muted-foreground/60" />
              AWAITING SIGNATURE
            </span>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN CANVAS AREA                                             */}
      {/* ============================================================ */}
      <div
        className="relative bg-card overflow-hidden"
        style={{ height: `${height}px` }}
      >
        {/* Background Watermark Guidelines */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5 select-none"
          aria-hidden="true"
        >
          <span className="text-4xl font-black uppercase tracking-widest text-foreground">
            TICKET PASS
          </span>
        </div>

        {/* The Signature Baseline & "X" prompt */}
        <div
          className="pointer-events-none absolute inset-x-6 bottom-7 flex items-end justify-between border-b border-dashed border-border/80 pb-1"
          aria-hidden="true"
        >
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-black text-muted-foreground/80">X</span>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
              {instruction}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground/50">
            SIGN INSIDE BOX
          </span>
        </div>

        {/* HTML5 Interactive Drawing Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
          className={cn(
            "relative z-10 w-full h-full touch-none",
            disabled || isEndorsed ? "cursor-default" : "cursor-crosshair"
          )}
          style={{ height: `${height}px` }}
        />

        {/* ============================================================ */}
        {/* RUBBER STAMP "SIGNED & ENDORSED" BADGE                       */}
        {/* ============================================================ */}
        {isEndorsed && (
          <div
            className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 z-20 transition-all duration-300 transform -rotate-12 select-none"
            style={{
              animation: "stampIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
            }}
          >
            <div className="rounded border-4 border-double border-accent bg-card/85 px-4 py-2 text-center shadow-lg backdrop-blur-xs">
              <div className="text-[8px] font-black uppercase tracking-widest text-accent/80">
                ★ OFFICIAL VALIDATION ★
              </div>
              <div className="text-lg font-black uppercase tracking-tight text-accent leading-tight">
                {stampText}
              </div>
              <div className="text-[8px] font-bold text-accent/90 uppercase tracking-tighter mt-0.5">
                {stampTime}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Ticket Punch Notch Cutouts */}
      <span
        className="absolute -left-2.5 bottom-12 size-5 rounded-full border-2 border-foreground bg-background z-20"
        aria-hidden="true"
      />
      <span
        className="absolute -right-2.5 bottom-12 size-5 rounded-full border-2 border-foreground bg-background z-20"
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* FOOTER CONTROLS & RECEIPT ACTIONS                            */}
      {/* ============================================================ */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-dashed border-border px-4 py-2.5 bg-secondary/30">
        <div className="text-[9px] text-muted-foreground uppercase tracking-wider">
          ENDORSEMENT BINDS TICKET TO BEARER
        </div>

        <div className="flex items-center gap-2">
          {/* Clear Button */}
          <button
            type="button"
            disabled={disabled || (!hasSignature && !isEndorsed)}
            onClick={handleClear}
            className="inline-flex cursor-pointer items-center justify-center rounded border border-dashed border-border bg-card px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary hover:border-foreground disabled:opacity-40 disabled:cursor-not-allowed"
          >
            CLEAR
          </button>

          {/* Export PNG button */}
          {hasSignature && (
            <button
              type="button"
              disabled={disabled}
              onClick={handleDownload}
              className="inline-flex cursor-pointer items-center justify-center rounded border border-dashed border-border bg-card px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary hover:border-foreground"
            >
              SAVE PNG
            </button>
          )}

          {/* Endorse & Stamp Button */}
          {!isEndorsed && (
            <button
              type="button"
              disabled={disabled || !hasSignature}
              onClick={handleEndorse}
              className="inline-flex cursor-pointer items-center justify-center rounded border-2 border-dashed border-foreground bg-accent px-3 py-1 text-[11px] font-black uppercase tracking-wider text-accent-foreground shadow-xs transition-all hover:border-solid hover:scale-102 active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ENDORSE &amp; STAMP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
