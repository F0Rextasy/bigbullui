"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SignatureLineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  hint?: string;
}

export function SignatureLine({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  label = "Signature",
  hint = "Type your full name as it appears on official documents",
  className,
  ...props
}: SignatureLineProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = controlledValue ?? inner;

  return (
    <div className={cn("w-full", className)} {...props}>
      <input
        value={value}
        onChange={(e) => {
          setInner(e.target.value);
          onValueChange?.(e.target.value);
        }}
        aria-label={label}
        placeholder="Jane Doe"
        spellCheck={false}
        autoComplete="off"
        className="w-full border-0 border-b-2 border-dashed border-border bg-transparent pb-1 ps-1 font-mono text-lg italic transition-colors placeholder:font-sans placeholder:text-sm placeholder:not-italic placeholder:text-muted-foreground/60 focus:border-accent focus-visible:outline-none"
      />
      <div className="mt-1 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">{hint}</span>
      </div>
    </div>
  );
}
