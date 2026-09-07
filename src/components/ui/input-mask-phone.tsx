"use client";

import * as React from "react";
import { cn } from "./lib/utils";

const MASKS: { prefix: string; groups: number[] }[] = [
  { prefix: "+1", groups: [3, 3, 4] },
  { prefix: "+90", groups: [3, 3, 2, 2] },
  { prefix: "+44", groups: [4, 3, 4] },
  { prefix: "+49", groups: [3, 3, 4] },
  { prefix: "+33", groups: [1, 2, 2, 2, 2] },
];

export interface InputMaskPhoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, complete: boolean) => void;
}

export function InputMaskPhone({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  className,
  ...props
}: InputMaskPhoneProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const raw = controlledValue ?? inner;

  const digits = raw.replace(/\D/g, "");
  const mask = MASKS.find((m) => digits.startsWith(m.prefix.replace("+", ""))) ?? MASKS[0];
  const prefixDigits = mask.prefix.replace("+", "");
  const rest = digits.startsWith(prefixDigits) ? digits.slice(prefixDigits.length) : digits;

  const parts: string[] = [];
  let cursor = 0;
  for (const size of mask.groups) {
    if (cursor >= rest.length) break;
    parts.push(rest.slice(cursor, cursor + size));
    cursor += size;
  }
  const formatted = `${mask.prefix}${parts.length > 0 ? " " : ""}${parts.join(" ")}${rest.slice(cursor)}`;
  const totalSlots = mask.groups.reduce((a, b) => a + b, 0);
  const complete = rest.length >= totalSlots;

  const apply = (nextRaw: string) => {
    setInner(nextRaw);
    const d = nextRaw.replace(/\D/g, "");
    const m = MASKS.find((x) => d.startsWith(x.prefix.replace("+", ""))) ?? MASKS[0];
    const r = d.startsWith(m.prefix.replace("+", "")) ? d.slice(m.prefix.replace("+", "").length) : d;
    onValueChange?.(nextRaw, r.length >= m.groups.reduce((a, b) => a + b, 0));
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-stretch overflow-hidden rounded-md border border-border bg-card transition-colors focus-within:border-foreground/60">
        <span aria-hidden className="flex items-center bg-secondary px-3 font-mono text-sm font-bold text-muted-foreground">
          {mask.prefix}
        </span>
        <input
          inputMode="tel"
          autoComplete="tel"
          value={formatted.replace(mask.prefix, "").trimStart()}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, "").slice(0, totalSlots + 2);
            apply(`${prefixDigits}${d}`);
          }}
          placeholder={mask.groups.map((g) => "•".repeat(g)).join(" ")}
          aria-label={props["aria-label"] ?? "Phone number"}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 font-mono text-sm tracking-wider focus:outline-none"
          {...props}
        />
        <span className={cn("flex items-center px-3 font-mono text-[10px] uppercase", complete ? "text-accent" : "text-muted-foreground")}>
          {rest.length}/{totalSlots}
        </span>
      </div>
    </div>
  );
}
