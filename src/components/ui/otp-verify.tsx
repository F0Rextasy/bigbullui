"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OtpVerifyProps extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
  onVerify?: (code: string) => void;
  /** Cooldown seconds before resending */
  resendSeconds?: number;
}

/** 6-digit OTP verification: auto-advance, paste support, resend countdown. */
export function OtpVerify({ length = 6, onVerify, resendSeconds = 30, className, ...props }: OtpVerifyProps) {
  const [digits, setDigits] = React.useState<string[]>(Array(length).fill(""));
  const [seconds, setSeconds] = React.useState(resendSeconds);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  React.useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const code = digits.join("");
  const complete = code.length === length && digits.every((d) => d !== "");

  React.useEffect(() => {
    if (complete) onVerify?.(code);
  }, [code, complete, onVerify]);

  const setDigit = (idx: number, val: string) => {
    const clean = val.replace(/\D/g, "");
    if (clean.length > 1) {
      // paste: distribute across remaining slots
      const next = [...digits];
      for (let i = 0; i < clean.length && idx + i < length; i++) next[idx + i] = clean[i];
      setDigits(next);
      refs.current[Math.min(idx + clean.length, length - 1)]?.focus();
      return;
    }
    const next = [...digits];
    next[idx] = clean;
    setDigits(next);
    if (clean && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handleKey = (idx: number) => (e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) refs.current[idx - 1]?.focus();
  };

  return (
    <div className={cn("w-full max-w-sm space-y-4", className)} {...props}>
      <style>{`
        @keyframes otpPop {
          0% { transform: scale(0.9); }
          60% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
      `}</style>
      <div className="flex justify-center gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            value={d}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={handleKey(i)}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={length}
            aria-label={`${i + 1}. hane`}
            className={cn(
              "size-11 rounded-md border-2 border-dashed border-border bg-card text-center font-mono text-lg font-bold",
              "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              d && "border-accent animate-[otpPop_0.2s_ease-out] motion-reduce:animate-none"
            )}
          />
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {seconds > 0 ? (
          <>Resend code in: <span className="font-mono tabular-nums">{String(seconds).padStart(2, "0")}s</span></>
        ) : (
          <button
            onClick={() => { setSeconds(resendSeconds); setDigits(Array(length).fill("")); refs.current[0]?.focus(); }}
            className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
          >
            Resend code
          </button>
        )}
      </p>
    </div>
  );
}
