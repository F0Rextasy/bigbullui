"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface KeypadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit" | "defaultValue"> {
  /** Maximum length of the PIN code (default: 4) */
  maxLength?: number;
  /** Controlled PIN value */
  value?: string;
  /** Default initial PIN value for uncontrolled mode */
  defaultValue?: string;
  /** Callback fired whenever the entered PIN value changes */
  onValueChange?: (pin: string) => void;
  /** Callback fired when ENTER is pressed or PIN reaches maxLength */
  onSubmit?: (pin: string) => void;
  /** Callback fired when CLEAR is pressed */
  onClear?: () => void;
  /** Whether the PIN digits are masked (default: true) */
  masked?: boolean;
  /** Whether to show a toggle button to reveal/mask the PIN (default: true) */
  allowMaskToggle?: boolean;
  /** Whether to synthesize tactile mechanical key click audio via Web Audio API (default: true) */
  enableSound?: boolean;
  /** Whether all keypad inputs are disabled */
  disabled?: boolean;
  /** Turnstile security validation status */
  status?: "idle" | "validating" | "success" | "error";
  /** Custom status or error message beneath the display */
  statusMessage?: string;
  /** Header title on the ticket frame (default: "BOX OFFICE TURNSTILE") */
  title?: string;
  /** Terminal identifier code (default: "TERMINAL #07") */
  terminalId?: string;
  /** Gate identifier (default: "GATE A-01") */
  gate?: string;
  /** Whether CLR button acts as backspace or clears all digits (default: "backspace") */
  clearMode?: "backspace" | "all";
  /** Whether to auto-submit when maxLength is reached (default: false) */
  autoSubmit?: boolean;
  /** Additional CSS class names */
  className?: string;
}

interface KeypadKeyConfig {
  id: string;
  label: string;
  subLabel: string;
  action: "digit" | "clear" | "enter";
  digit?: string;
}

const DEFAULT_KEY_CONFIGS: KeypadKeyConfig[] = [
  { id: "1", label: "1", subLabel: "---", action: "digit", digit: "1" },
  { id: "2", label: "2", subLabel: "ABC", action: "digit", digit: "2" },
  { id: "3", label: "3", subLabel: "DEF", action: "digit", digit: "3" },
  { id: "4", label: "4", subLabel: "GHI", action: "digit", digit: "4" },
  { id: "5", label: "5", subLabel: "JKL", action: "digit", digit: "5" },
  { id: "6", label: "6", subLabel: "MNO", action: "digit", digit: "6" },
  { id: "7", label: "7", subLabel: "PQRS", action: "digit", digit: "7" },
  { id: "8", label: "8", subLabel: "TUV", action: "digit", digit: "8" },
  { id: "9", label: "9", subLabel: "WXYZ", action: "digit", digit: "9" },
  { id: "clear", label: "CLR", subLabel: "BACK", action: "clear" },
  { id: "0", label: "0", subLabel: "+ / OPER", action: "digit", digit: "0" },
  { id: "enter", label: "ENT", subLabel: "ADMIT", action: "enter" },
];

/**
 * Synthesizes acoustic mechanical turnstile switch sounds using the browser Web Audio API.
 * Zero external audio assets or network requests required.
 */
function playMechanicalKeySound(
  type: "digit" | "clear" | "enter" | "error" | "success" = "digit"
): void {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === "digit") {
      // Tactile stamped spring-loaded key strike
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(620, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.035);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === "clear") {
      // Deeper relay release click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.045);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "enter") {
      // Dual affirmative turnstile gate unlock ping
      [784, 1046.5].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.04);
        gain.gain.setValueAtTime(0.18, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.13);
      });
    } else if (type === "error") {
      // Harsh rejection buzz
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, now);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } else if (type === "success") {
      // High harmonic turnstile gate admission chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.22, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.22);
      });
    }
  } catch {
    // Gracefully handle browsers blocking AudioContext without user gesture
  }
}

export function Keypad({
  maxLength = 4,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  onSubmit,
  onClear,
  masked: initialMasked = true,
  allowMaskToggle = true,
  enableSound = true,
  disabled = false,
  status = "idle",
  statusMessage,
  title = "BOX OFFICE TURNSTILE",
  terminalId = "TERMINAL #07",
  gate = "GATE A-01",
  clearMode = "backspace",
  autoSubmit = false,
  className,
  ...props
}: KeypadProps) {
  const [internalPin, setInternalPin] = React.useState(defaultValue.slice(0, maxLength));
  const [isMasked, setIsMasked] = React.useState(initialMasked);
  const [activeKeyId, setActiveKeyId] = React.useState<string | null>(null);
  const [pulseKeyId, setPulseKeyId] = React.useState<string | null>(null);
  const keypadRef = React.useRef<HTMLDivElement>(null);

  const isControlled = controlledValue !== undefined;
  const pin = (isControlled ? controlledValue : internalPin).slice(0, maxLength);

  // Audio trigger on status change
  React.useEffect(() => {
    if (!enableSound) return;
    if (status === "success") {
      playMechanicalKeySound("success");
    } else if (status === "error") {
      playMechanicalKeySound("error");
    }
  }, [status, enableSound]);

  const updatePin = React.useCallback(
    (nextPin: string) => {
      const sanitized = nextPin.replace(/\D/g, "").slice(0, maxLength);
      if (!isControlled) {
        setInternalPin(sanitized);
      }
      onValueChange?.(sanitized);

      if (autoSubmit && sanitized.length === maxLength) {
        onSubmit?.(sanitized);
      }
    },
    [maxLength, isControlled, onValueChange, autoSubmit, onSubmit]
  );

  const triggerVisualPulse = (keyId: string) => {
    setActiveKeyId(keyId);
    setPulseKeyId(keyId);
    setTimeout(() => {
      setActiveKeyId(null);
    }, 120);
    setTimeout(() => {
      setPulseKeyId(null);
    }, 350);
  };

  const handleDigitPress = React.useCallback(
    (digit: string) => {
      if (disabled || pin.length >= maxLength) return;
      if (enableSound) playMechanicalKeySound("digit");
      triggerVisualPulse(digit);
      updatePin(pin + digit);
    },
    [disabled, pin, maxLength, enableSound, updatePin]
  );

  const handleClearPress = React.useCallback(() => {
    if (disabled) return;
    if (enableSound) playMechanicalKeySound("clear");
    triggerVisualPulse("clear");

    if (clearMode === "all" || pin.length <= 1) {
      updatePin("");
      onClear?.();
    } else {
      updatePin(pin.slice(0, -1));
    }
  }, [disabled, enableSound, clearMode, pin, updatePin, onClear]);

  const handleEnterPress = React.useCallback(() => {
    if (disabled) return;
    if (enableSound) playMechanicalKeySound("enter");
    triggerVisualPulse("enter");
    onSubmit?.(pin);
  }, [disabled, enableSound, onSubmit, pin]);

  // Handle hardware keyboard interactions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault();
      handleDigitPress(e.key);
    } else if (e.key === "Backspace") {
      e.preventDefault();
      handleClearPress();
    } else if (e.key === "Escape") {
      e.preventDefault();
      if (enableSound) playMechanicalKeySound("clear");
      triggerVisualPulse("clear");
      updatePin("");
      onClear?.();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleEnterPress();
    }
  };

  const statusToneClasses = React.useMemo(() => {
    switch (status) {
      case "success":
        return {
          indicator: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]",
          label: "text-emerald-600 dark:text-emerald-400 font-bold",
          border: "border-emerald-500/60",
          bg: "bg-emerald-500/10",
        };
      case "error":
        return {
          indicator: "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.7)]",
          label: "text-destructive font-bold animate-pulse",
          border: "border-destructive/60",
          bg: "bg-destructive/10",
        };
      case "validating":
        return {
          indicator: "bg-amber-500 animate-ping",
          label: "text-amber-600 dark:text-amber-400 font-bold",
          border: "border-amber-500/60",
          bg: "bg-amber-500/10",
        };
      default:
        return {
          indicator: "bg-accent animate-pulse",
          label: "text-muted-foreground",
          border: "border-border",
          bg: "bg-secondary/40",
        };
    }
  }, [status]);

  const resolvedStatusMessage = React.useMemo(() => {
    if (statusMessage) return statusMessage;
    switch (status) {
      case "success":
        return "PASSCODE VALIDATED · TURNSTILE UNLOCKED";
      case "error":
        return "INVALID PIN · ACCESS DENIED · RETRY";
      case "validating":
        return "VERIFYING CREDENTIALS WITH GATEWAY...";
      default:
        return `ENTER ${maxLength}-DIGIT BOX OFFICE ACCESS PIN`;
    }
  }, [statusMessage, status, maxLength]);

  return (
    <div
      ref={keypadRef}
      tabIndex={disabled ? -1 : 0}
      role="region"
      aria-label={`${title} Keypad`}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative w-full max-w-sm select-none rounded-xl border-2 border-dashed border-border bg-card p-4 font-mono shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-accent/40",
        disabled && "opacity-60 pointer-events-none cursor-not-allowed",
        status === "error" && "border-destructive/60",
        status === "success" && "border-emerald-500/60",
        className
      )}
      {...props}
    >
      {/* Outer Ticket Punch Notches on Side Edges */}
      <div
        aria-hidden="true"
        className="absolute -left-2.5 top-1/2 -translate-y-1/2 size-5 rounded-full border-2 border-border bg-background shadow-inner"
      />
      <div
        aria-hidden="true"
        className="absolute -right-2.5 top-1/2 -translate-y-1/2 size-5 rounded-full border-2 border-border bg-background shadow-inner"
      />

      {/* Top Punch Hole / Lanyard Eyelet */}
      <div
        aria-hidden="true"
        className="absolute -top-2 left-1/2 -translate-x-1/2 size-4 rounded-full border-2 border-border bg-background"
      />

      {/* Box Office Turnstile Header Frame */}
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-2.5 text-[10px] tracking-widest text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={cn("size-2 rounded-full shrink-0 transition-colors", statusToneClasses.indicator)}
          />
          <span className="font-bold tracking-wider text-foreground uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px]">
          <span className="rounded-sm border border-border/80 bg-secondary/60 px-1.5 py-0.5 text-muted-foreground">
            {terminalId}
          </span>
          <span className="font-bold text-accent">{gate}</span>
        </div>
      </div>

      {/* Masked PIN Slot Frame Display */}
      <div className="my-3.5 flex flex-col items-center">
        <div className="flex w-full items-center justify-between px-1 mb-1.5 text-[9px] uppercase tracking-wider text-muted-foreground">
          <span>PIN READOUT</span>
          <div className="flex items-center gap-2">
            {allowMaskToggle && (
              <button
                type="button"
                onClick={() => setIsMasked(!isMasked)}
                disabled={disabled}
                className="flex items-center gap-1 rounded-sm border border-border px-1.5 py-0.5 text-[9px] hover:border-foreground/50 hover:bg-secondary/60 transition-colors text-muted-foreground hover:text-foreground"
                title={isMasked ? "Reveal PIN digits" : "Mask PIN digits"}
              >
                <svg
                  className="size-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {isMasked ? (
                    <>
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  ) : (
                    <>
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </>
                  )}
                </svg>
                <span>{isMasked ? "SHOW" : "HIDE"}</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (disabled) return;
                if (enableSound) playMechanicalKeySound("clear");
                updatePin("");
                onClear?.();
              }}
              disabled={disabled || pin.length === 0}
              className="rounded-sm border border-border px-1.5 py-0.5 text-[9px] hover:border-destructive hover:text-destructive hover:bg-destructive/10 transition-colors text-muted-foreground disabled:opacity-30 disabled:pointer-events-none"
              title="Reset PIN entry"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Segmented Slot Boxes */}
        <div
          className={cn(
            "relative flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary/20 p-3 shadow-inner transition-colors",
            status === "error" && "border-destructive/60 bg-destructive/5",
            status === "success" && "border-emerald-500/60 bg-emerald-500/5"
          )}
        >
          {Array.from({ length: maxLength }).map((_, idx) => {
            const digit = pin[idx];
            const isFilled = digit !== undefined;
            const isCurrent = idx === pin.length && pin.length < maxLength;

            return (
              <div
                key={idx}
                className={cn(
                  "relative flex size-11 items-center justify-center rounded-md border-2 font-mono text-xl font-black transition-all duration-150 shadow-sm",
                  isFilled
                    ? "border-foreground/80 bg-card text-foreground scale-100"
                    : "border-dashed border-border/80 bg-secondary/40 text-muted-foreground/40",
                  isCurrent && "border-solid border-accent ring-2 ring-accent/30 bg-card/80 animate-pulse",
                  status === "error" && "border-destructive text-destructive",
                  status === "success" && "border-emerald-500 text-emerald-500"
                )}
              >
                {/* Punch registration notch on top edge of each slot */}
                <div
                  aria-hidden="true"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-2 rounded-b border-b border-border/40 bg-card"
                />

                {isFilled ? (
                  isMasked ? (
                    <span
                      className="size-3.5 rounded-full bg-foreground shadow-sm transition-transform duration-100 scale-100"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="tracking-widest">{digit}</span>
                  )
                ) : (
                  <span className="text-xs font-mono text-muted-foreground/30">•</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Readout Status Ticker */}
        <div
          className={cn(
            "mt-2 w-full rounded border px-2 py-1 text-center font-mono text-[10px] uppercase tracking-wider transition-colors",
            statusToneClasses.border,
            statusToneClasses.bg,
            statusToneClasses.label
          )}
        >
          {resolvedStatusMessage}
        </div>
      </div>

      {/* Tactile Perforation Line */}
      <div className="relative my-2.5 flex items-center justify-between">
        <div className="size-2 rounded-full border border-border bg-background" />
        <div className="h-0 flex-1 border-t-2 border-dashed border-border/70 mx-1" />
        <div className="size-2 rounded-full border border-border bg-background" />
      </div>

      {/* Mechanical Stamped Tactile Keypad Grid (3x4) */}
      <div
        className="grid grid-cols-3 gap-2 p-1"
        role="group"
        aria-label="Turnstile Numeric Keypad"
      >
        {DEFAULT_KEY_CONFIGS.map((k) => {
          const isActive = activeKeyId === k.id;
          const isPulsing = pulseKeyId === k.id;

          const isClearKey = k.action === "clear";
          const isEnterKey = k.action === "enter";

          const handleClick = () => {
            if (disabled) return;
            if (k.action === "digit" && k.digit) {
              handleDigitPress(k.digit);
            } else if (k.action === "clear") {
              handleClearPress();
            } else if (k.action === "enter") {
              handleEnterPress();
            }
          };

          return (
            <button
              key={k.id}
              type="button"
              disabled={disabled}
              onClick={handleClick}
              aria-label={
                isClearKey ? "Clear digit" : isEnterKey ? "Submit PIN code" : `Digit ${k.label}`
              }
              className={cn(
                "group relative flex flex-col items-center justify-center rounded-lg border-2 font-mono transition-all duration-75 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "h-14 sm:h-16 py-1 px-2",
                // Stamped Mechanical Raised 3D Button Shadows
                !isActive && "shadow-[0_3px_0_0_var(--color-border)] hover:border-foreground/40 hover:bg-secondary/40",
                isActive && "translate-y-0.5 shadow-[0_1px_0_0_var(--color-border)] bg-secondary/80",
                // Default Numeric Key
                !isClearKey &&
                  !isEnterKey &&
                  "border-border bg-card text-foreground active:border-foreground/60",
                // Clear Key (Tactile warning tone)
                isClearKey &&
                  "border-border/80 bg-secondary/50 text-muted-foreground hover:text-destructive hover:border-destructive/60 active:bg-destructive/10",
                // Enter Key (Accent Admission Stamp)
                isEnterKey &&
                  "border-accent bg-accent/15 text-accent-strong font-bold hover:bg-accent/25 hover:border-accent active:bg-accent/30 shadow-[0_3px_0_0_var(--color-accent)]"
              )}
            >
              {/* Mechanical keycap register mark */}
              <div
                aria-hidden="true"
                className="absolute top-1 left-1 size-1 rounded-full bg-border/60 group-hover:bg-foreground/40"
              />

              {/* Click / Audio Visual Pulse Ripple */}
              {isPulsing && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-lg border-2 border-accent/70 animate-ping pointer-events-none"
                />
              )}

              {/* Primary Key Label */}
              <span
                className={cn(
                  "text-lg sm:text-xl font-bold tracking-tight transition-transform",
                  isActive && "scale-95",
                  isEnterKey && "text-accent"
                )}
              >
                {k.label}
              </span>

              {/* Micro Sub-Label (Letters or Box Office Action) */}
              <span
                className={cn(
                  "font-mono text-[8px] sm:text-[9px] uppercase tracking-widest leading-none mt-0.5",
                  isEnterKey
                    ? "text-accent/90 font-bold"
                    : isClearKey
                    ? "text-muted-foreground group-hover:text-destructive"
                    : "text-muted-foreground/70"
                )}
              >
                {k.subLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer Turnstile Gate Pass Micro Receipt Bar */}
      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border/80 pt-2 text-[9px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-foreground/40" />
          <span>TURNSTILE READY</span>
        </span>
        <span className="tracking-widest uppercase">AUDIO CLICK ENABLED</span>
      </div>
    </div>
  );
}
