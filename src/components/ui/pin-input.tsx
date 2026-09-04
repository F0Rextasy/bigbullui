"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PinInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

export function PinInput({
  length = 4,
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  onComplete,
  disabled = false,
  className,
  "aria-label": ariaLabel = "PIN code",
}: PinInputProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue.slice(0, length));
  const isControlled = controlledValue !== undefined;
  const pin = (isControlled ? controlledValue : uncontrolledValue).slice(0, length);

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length }, (_, i) => pin[i] || "");

  const updatePin = (nextPin: string) => {
    const trimmed = nextPin.slice(0, length);
    if (!isControlled) {
      setUncontrolledValue(trimmed);
    }
    onValueChange?.(trimmed);
    if (trimmed.length === length) {
      onComplete?.(trimmed);
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    const nextPin = newDigits.join("");
    updatePin(nextPin);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").trim().slice(0, length);
    updatePin(pasted);
    const nextFocusIndex = Math.min(pasted.length, length - 1);
    inputRefs.current[nextFocusIndex]?.focus();
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("inline-flex items-center gap-2", disabled && "opacity-50", className)}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "size-11 rounded-md border-2 border-dashed border-border bg-card text-center font-mono text-lg font-bold text-foreground transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-foreground",
            digit && "border-foreground bg-secondary/50",
            disabled ? "cursor-not-allowed" : "hover:border-foreground/60"
          )}
        />
      ))}
    </div>
  );
}
