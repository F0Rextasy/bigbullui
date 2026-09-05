"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "onToggle"> {
  /** Controlled dark state */
  dark?: boolean;
  /** Default dark state for uncontrolled mode */
  defaultDark?: boolean;
  /** Callback fired when the theme state flips */
  onToggle?: (isDark: boolean) => void;
  /** Whether to sync the 'dark' class on document.documentElement (default: true) */
  syncHtmlDark?: boolean;
  /** Whether to play a synthesized mechanical ticket punch click sound (default: true) */
  enableSound?: boolean;
  /** Display style: 'ticket' (full ticket stub) or 'compact' (pocket pass) */
  variant?: "ticket" | "compact";
  /** Size scale */
  size?: "sm" | "default" | "lg";
  className?: string;
}

/**
 * Generates an acoustic mechanical ticket punch sound using the browser's Web Audio API.
 * Zero external audio assets required.
 */
function playTicketPunchSound(): void {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    // 1. Initial mechanical metal strike (click)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "square";
    osc1.frequency.setValueAtTime(800, now);
    osc1.frequency.exponentialRampToValueAtTime(120, now + 0.04);
    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.045);

    // 2. Paper punch snap & resonance thud
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(220, now + 0.01);
    osc2.frequency.exponentialRampToValueAtTime(60, now + 0.08);
    gain2.gain.setValueAtTime(0.35, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.01);
    osc2.stop(now + 0.09);

    // Clean up AudioContext
    setTimeout(() => {
      ctx.close();
    }, 150);
  } catch {
    // AudioContext might be prevented by autoplay policy before user gesture
  }
}

export function ThemeToggle({
  dark,
  defaultDark = false,
  onToggle,
  syncHtmlDark = true,
  enableSound = true,
  variant = "ticket",
  size = "default",
  className,
  disabled,
  onClick,
  onKeyDown,
  ...props
}: ThemeToggleProps) {
  const isControlled = dark !== undefined;
  const [internalDark, setInternalDark] = React.useState<boolean>(defaultDark);
  const [mounted, setMounted] = React.useState(false);
  const [isPunching, setIsPunching] = React.useState(false);

  // Initialize theme from DOM or localStorage on client mount
  React.useEffect(() => {
    setMounted(true);
    if (!isControlled && syncHtmlDark && typeof document !== "undefined") {
      const isDocDark = document.documentElement.classList.contains("dark");
      const stored = localStorage.getItem("bigbullui-theme");
      const initial = stored ? stored === "dark" : isDocDark;
      setInternalDark(initial);
      if (initial !== isDocDark) {
        document.documentElement.classList.toggle("dark", initial);
      }
    }
  }, [isControlled, syncHtmlDark]);

  // Keep internal state in sync if external class changes on html element
  React.useEffect(() => {
    if (isControlled || !syncHtmlDark || typeof window === "undefined") return;

    const observer = new MutationObserver(() => {
      const isDocDark = document.documentElement.classList.contains("dark");
      setInternalDark(isDocDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [isControlled, syncHtmlDark]);

  const activeDark = isControlled ? Boolean(dark) : internalDark;

  const handleToggle = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const nextDark = !activeDark;

      // Sound feedback
      if (enableSound) {
        playTicketPunchSound();
      }

      // Punch tactile recoil animation
      setIsPunching(true);
      setTimeout(() => setIsPunching(false), 260);

      // DOM sync
      if (syncHtmlDark && typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", nextDark);
        try {
          localStorage.setItem("bigbullui-theme", nextDark ? "dark" : "light");
        } catch {
          // localStorage disabled
        }
      }

      if (!isControlled) {
        setInternalDark(nextDark);
      }

      onToggle?.(nextDark);
    },
    [disabled, activeDark, enableSound, syncHtmlDark, isControlled, onToggle]
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      handleToggle(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(e);
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleToggle(e);
    }
  };

  // Size scaling classes
  const sizeStyles = {
    sm: variant === "ticket" ? "w-64 min-h-[76px] text-xs" : "h-8 px-3 text-xs",
    default: variant === "ticket" ? "w-80 min-h-[92px] text-sm" : "h-9 px-4 text-xs",
    lg: variant === "ticket" ? "w-96 min-h-[108px] text-base" : "h-11 px-5 text-sm",
  }[size];

  // Compact variant: Pocket stub toggle pill
  if (variant === "compact") {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={activeDark}
        aria-label={activeDark ? "Switch to Day Pass (Light theme)" : "Switch to Night Pass (Dark theme)"}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "group relative inline-flex select-none items-center justify-between overflow-hidden rounded-md border-2 border-dashed border-foreground bg-card font-mono uppercase tracking-wider text-foreground shadow-xs transition-all duration-200 hover:border-solid hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          isPunching && "scale-95",
          sizeStyles,
          className
        )}
        {...props}
      >
        {/* Left punch cutout notch */}
        <span
          className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background transition-transform duration-150 group-active:scale-125"
          aria-hidden="true"
        />

        {/* Right punch cutout notch */}
        <span
          className="absolute -right-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-background transition-transform duration-150 group-active:scale-125"
          aria-hidden="true"
        />

        {/* Toggle label & indicator */}
        <span className="flex items-center gap-2 pl-2">
          <span
            className={cn(
              "size-2 rounded-full border border-foreground transition-all duration-200",
              activeDark ? "bg-accent" : "bg-foreground"
            )}
          />
          <span className="text-[11px] font-bold">
            {mounted && activeDark ? "NIGHT PASS" : "DAY PASS"}
          </span>
        </span>

        {/* Icon & Stamp badge */}
        <span
          className={cn(
            "ml-3 rounded border border-dashed px-1.5 py-0.5 text-[9px] font-black transition-colors duration-200",
            activeDark
              ? "border-accent bg-accent/15 text-accent"
              : "border-foreground bg-foreground/10 text-foreground"
          )}
        >
          {mounted && activeDark ? "PM // 23:00" : "AM // 07:00"}
        </span>
      </button>
    );
  }

  // Ticket variant: Full double-frame stamped 3D flip admission stub
  return (
    <div
      className={cn(
        "relative inline-block select-none [perspective:1000px]",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={activeDark}
        aria-label={activeDark ? "Switch to Day Pass (Light theme)" : "Switch to Night Pass (Dark theme)"}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative block w-full text-left font-mono cursor-pointer transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground rounded-md",
          isPunching && "scale-95",
          sizeStyles
        )}
        {...props}
      >
        {/* 3D Rotating Flipper Container */}
        <div
          className="relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] [transform-style:preserve-3d]"
          style={{
            transform: mounted && activeDark ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ============================================================ */}
          {/* FRONT FACE: DAY PASS (Light Cream Stub)                      */}
          {/* ============================================================ */}
          <div
            className="w-full h-full rounded-md border-2 border-dashed border-foreground bg-[#fffdf5] text-[#17130c] shadow-md p-3 relative flex items-center justify-between [backface-visibility:hidden]"
            style={{ minHeight: "inherit" }}
          >
            {/* Edge Notch Cutouts */}
            <span
              className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background z-10"
              aria-hidden="true"
            />
            <span
              className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-foreground bg-background z-10"
              aria-hidden="true"
            />

            {/* Left Ticket Main Body */}
            <div className="flex-1 pr-3 border-r-2 border-dashed border-[#d8c9ac]">
              {/* Header Micro-label */}
              <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#6f6350] mb-1">
                <span>ADMISSION STUB</span>
                <span className="font-bold text-[#17130c]">PASS #01-DAY</span>
              </div>

              {/* Title & Stamp */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center size-5 rounded-full border border-foreground bg-[#ece3cc] text-[10px]">
                  ☼
                </span>
                <span className="text-base font-black tracking-tight text-[#17130c]">
                  DAY PASS
                </span>
                <span className="rounded border border-dashed border-[#bc3a28] bg-[#bc3a28]/10 px-1 py-0.2 text-[8px] font-black text-[#bc3a28] uppercase tracking-wider">
                  STAMPED
                </span>
              </div>

              {/* Sub-label & Hours */}
              <div className="flex items-center justify-between text-[9px] text-[#6f6350] mt-1.5 uppercase">
                <span>GATES: 07:00 - 19:00</span>
                <span className="tracking-tighter font-semibold">CLICK TO FLIP</span>
              </div>
            </div>

            {/* Right Perforated Tear-off Stub */}
            <div className="w-16 pl-3 flex flex-col items-center justify-center text-center shrink-0">
              <span className="text-[8px] font-bold tracking-widest text-[#6f6350] uppercase">
                SHIFT
              </span>
              <span className="text-xs font-black tracking-wider text-[#17130c] my-0.5">
                LIGHT
              </span>
              {/* Mini Barcode Glyph */}
              <div
                className="text-[7px] tracking-tight text-[#6f6350] font-mono leading-none select-none opacity-80"
                aria-hidden="true"
              >
                ||| | |||| |
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* BACK FACE: NIGHT PASS (Dark Night Stub)                     */}
          {/* ============================================================ */}
          <div
            className="absolute inset-0 w-full h-full rounded-md border-2 border-dashed border-[#f3ead3] bg-[#16120b] text-[#f3ead3] shadow-md p-3 flex items-center justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]"
            style={{ minHeight: "inherit" }}
          >
            {/* Edge Notch Cutouts */}
            <span
              className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-[#f3ead3] bg-background z-10"
              aria-hidden="true"
            />
            <span
              className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full border-2 border-[#f3ead3] bg-background z-10"
              aria-hidden="true"
            />

            {/* Left Ticket Main Body */}
            <div className="flex-1 pr-3 border-r-2 border-dashed border-[#3a3122]">
              {/* Header Micro-label */}
              <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-[#a89a7e] mb-1">
                <span>NIGHT CURTAIN</span>
                <span className="font-bold text-[#f3ead3]">PASS #02-NGT</span>
              </div>

              {/* Title & Stamp */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center size-5 rounded-full border border-[#f3ead3] bg-[#241e13] text-[10px] text-[#f3ead3]">
                  ☾
                </span>
                <span className="text-base font-black tracking-tight text-[#f3ead3]">
                  NIGHT PASS
                </span>
                <span className="rounded border border-dashed border-[#d95b43] bg-[#d95b43]/20 px-1 py-0.2 text-[8px] font-black text-[#d95b43] uppercase tracking-wider">
                  ENDORSED
                </span>
              </div>

              {/* Sub-label & Hours */}
              <div className="flex items-center justify-between text-[9px] text-[#a89a7e] mt-1.5 uppercase">
                <span>GATES: 19:00 - 07:00</span>
                <span className="tracking-tighter font-semibold">CLICK TO FLIP</span>
              </div>
            </div>

            {/* Right Perforated Tear-off Stub */}
            <div className="w-16 pl-3 flex flex-col items-center justify-center text-center shrink-0">
              <span className="text-[8px] font-bold tracking-widest text-[#a89a7e] uppercase">
                SHIFT
              </span>
              <span className="text-xs font-black tracking-wider text-[#d95b43] my-0.5">
                DARK
              </span>
              {/* Mini Barcode Glyph */}
              <div
                className="text-[7px] tracking-tight text-[#a89a7e] font-mono leading-none select-none opacity-80"
                aria-hidden="true"
              >
                | ||| || | |
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Tactile Punch Hole Flash Indicator */}
      {isPunching && (
        <span
          className="pointer-events-none absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full border-2 border-accent bg-background text-[9px] font-black text-accent animate-ping"
          aria-hidden="true"
        >
          *
        </span>
      )}
    </div>
  );
}
