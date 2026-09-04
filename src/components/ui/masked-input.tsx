"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MaskedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  mask?: string; // e.g. "BB-####-####" where # represents digits, A represents alpha
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string, complete: boolean) => void;
  className?: string;
}

export function MaskedInput({
  mask = "BB-####-####",
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  placeholder,
  className,
  ...props
}: MaskedInputProps) {
  const [internalVal, setInternalVal] = React.useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : internalVal;

  const applyMask = (raw: string) => {
    let rawIndex = 0;
    let result = "";
    const cleanChars = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    for (let i = 0; i < mask.length; i++) {
      if (rawIndex >= cleanChars.length) break;

      const maskChar = mask[i];
      if (maskChar === "#") {
        while (rawIndex < cleanChars.length && !/[0-9]/.test(cleanChars[rawIndex])) {
          rawIndex++;
        }
        if (rawIndex < cleanChars.length) {
          result += cleanChars[rawIndex];
          rawIndex++;
        }
      } else if (maskChar === "A") {
        while (rawIndex < cleanChars.length && !/[a-zA-Z]/.test(cleanChars[rawIndex])) {
          rawIndex++;
        }
        if (rawIndex < cleanChars.length) {
          result += cleanChars[rawIndex];
          rawIndex++;
        }
      } else {
        result += maskChar;
        if (cleanChars[rawIndex] === maskChar) {
          rawIndex++;
        }
      }
    }
    return result;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = applyMask(e.target.value);
    const isComplete = formatted.length === mask.length;
    if (!isControlled) {
      setInternalVal(formatted);
    }
    onValueChange?.(formatted, isComplete);
  };

  const isComplete = currentVal.length === mask.length;

  return (
    <div className={cn("relative inline-flex items-center font-mono select-none", className)}>
      <input
        type="text"
        value={currentVal}
        onChange={handleChange}
        placeholder={placeholder || mask}
        className={cn(
          "w-full rounded-md border-2 border-foreground bg-card px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground placeholder:text-muted-foreground/60 transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isComplete ? "border-accent shadow-xs" : "hover:border-foreground/70"
        )}
        {...props}
      />
      {isComplete && (
        <span
          className="absolute right-2.5 flex size-4 items-center justify-center rounded-xs bg-accent text-[10px] font-bold text-accent-foreground animate-[scale-in_0.15s_ease-out]"
          title="Ticket Serial Validated"
        >
          ✓
        </span>
      )}
    </div>
  );
}
