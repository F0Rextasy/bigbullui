"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InputOtpProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  label?: string;
}

export const InputOtp = React.forwardRef<HTMLDivElement, InputOtpProps>(function InputOtp(
  {
    length = 6,
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    onComplete,
    disabled = false,
    label,
    className,
    ...props
  },
  ref
) {
  const [inner, setInner] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : inner;
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);
  const slots = React.useMemo(
    () =>
      Array.from({ length }, (_, i) => {
        const ch = value[i];
        return ch && ch !== " " ? ch : "";
      }),
    [value, length]
  );

  const commitSlots = (nextSlots: string[]) => {
    const serialized = nextSlots.map((c) => c || " ").join("").replace(/\s+$/, "");
    if (!isControlled) setInner(serialized);
    onValueChange?.(serialized);
    if (nextSlots.every((c) => c !== "")) onComplete?.(nextSlots.join(""));
  };

  const onKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !slots[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const nextSlots = Array.from({ length }, (_, i) => digits[i] ?? "");
    commitSlots(nextSlots);
    refs.current[Math.min(digits.length, length - 1)]?.focus();
  };

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {label ? (
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div className="flex items-center gap-2" role="group" aria-label={label ?? "One-time code"}>
        {slots.map((slotDigit, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={slotDigit}
            disabled={disabled}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1}`}
            maxLength={1}
            onChange={(e) => {
              const digit = e.target.value.replace(/\D/g, "").slice(-1);
              const nextSlots = [...slots];
              nextSlots[i] = digit;
              commitSlots(nextSlots);
              if (digit && i < length - 1) refs.current[i + 1]?.focus();
            }}
            onKeyDown={onKeyDown(i)}
            onPaste={onPaste}
            onFocus={(e) => e.target.select()}
            className="h-12 w-10 rounded-md border border-border bg-card text-center font-mono text-lg font-bold transition-colors focus:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
          />
        ))}
      </div>
    </div>
  );
});
InputOtp.displayName = "InputOtp";
