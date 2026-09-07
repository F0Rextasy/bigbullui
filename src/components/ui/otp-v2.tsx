"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface OtpV2Props extends React.HTMLAttributes<HTMLDivElement> {
  length?: number;
  onComplete?: (code: string) => void;
}

/** OTP v2: segmented boxes with paste fill, auto-advance and error shake. */
export function OtpV2({ length = 6, onComplete, className, ...props }: OtpV2Props) {
  const [digits, setDigits] = React.useState<string[]>(Array(length).fill(""));
  const [error, setError] = React.useState(false);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join("");
  const done = code.length === length && digits.every((d) => d !== "");

  React.useEffect(() => {
    if (done) onComplete?.(code);
  }, [code, done, onComplete]);

  const fill = (idx: number, val: string) => {
    const clean = val.replace(/\D/g, "");
    if (!clean) {
      const next = [...digits];
      next[idx] = "";
      setDigits(next);
      return;
    }
    const next = [...digits];
    for (let i = 0; i < clean.length && idx + i < length; i++) next[idx + i] = clean[i];
    setDigits(next);
    setError(false);
    refs.current[Math.min(idx + clean.length, length - 1)]?.focus();
  };

  return (
    <div className={cn("w-full max-w-sm space-y-3", className)} {...props}>
      <style>{`@keyframes otpShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }`}</style>
      <p className="text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Enter verification code
      </p>
      <div
        className="flex justify-center gap-1.5"
        style={error ? { animation: "otpShake 0.3s ease-out" } : undefined}
        role="group"
        aria-label="One time code"
      >
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={d}
            onChange={(e) => fill(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={length}
            aria-label={`Digit ${i + 1}`}
            className={cn(
              "size-10 rounded-md border-2 border-dashed text-center font-mono text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
              error ? "border-accent bg-accent/10" : "border-border bg-card",
              d && "border-foreground"
            )}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setError(true)}
          className="rounded-sm font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Simulate error
        </button>
      </div>
    </div>
  );
}
