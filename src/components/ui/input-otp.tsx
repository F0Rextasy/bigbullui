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

export function InputOtp({
  length = 6,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  onComplete,
  disabled = false,
  label,
  className,
  ...props
}: InputOtpProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = controlledValue ?? inner;
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const commit = (next: string) => {
    const clean = next.replace(/\D/g, "").slice(0, length);
    setInner(clean);
    onValueChange?.(clean);
    if (clean.length === length) onComplete?.(clean);
  };

  const onKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    commit(e.clipboardData.getData("text"));
    refs.current[Math.min(value.length, length - 1)]?.focus();
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      {label ? (
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
      ) : null}
      <div className="flex items-center gap-2" role="group" aria-label={label ?? "One-time code"}>
        {Array.from({ length }, (_, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={value[i] ?? ""}
            disabled={disabled}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1}`}
            maxLength={1}
            onChange={(e) => {
              const digit = e.target.value.replace(/\D/g, "").slice(-1);
              if (!digit) {
                commit(value.slice(0, i) + value.slice(i + 1));
                return;
              }
              commit(value.slice(0, i) + digit + value.slice(i + 1));
              if (i < length - 1) refs.current[i + 1]?.focus();
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
}
