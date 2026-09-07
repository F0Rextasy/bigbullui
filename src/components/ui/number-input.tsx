"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface NumberInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "type"> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  currency?: string;
  locale?: string;
}

export function NumberInput({
  value: controlledValue,
  defaultValue = 0,
  onValueChange,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  step = 1,
  currency,
  locale = "en-US",
  className,
  ...props
}: NumberInputProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const raw = controlledValue ?? inner;
  const clamped = Math.min(max, Math.max(min, raw));
  const [text, setText] = React.useState<string | null>(null);

  const commit = (next: number) => {
    const v = Number.isNaN(next) ? 0 : Math.min(max, Math.max(min, next));
    setInner(v);
    onValueChange?.(v);
    setText(null);
  };

  const shown = text ?? clamped.toLocaleString(locale, { maximumFractionDigits: 2 });

  return (
    <div className={cn("flex w-full items-stretch overflow-hidden rounded-md border border-border bg-card transition-colors focus-within:border-foreground/60", className)}>
      {currency ? (
        <span aria-hidden className="flex items-center bg-secondary px-3 font-mono text-sm font-bold text-muted-foreground">
          {currency}
        </span>
      ) : null}
      <input
        inputMode="decimal"
        value={shown}
        onChange={(e) => {
          const cleaned = e.target.value.replace(/[^0-9.\-]/g, "");
          setText(e.target.value);
          const parsed = Number(cleaned);
          if (!Number.isNaN(parsed)) {
            setInner(Math.min(max, Math.max(min, parsed)));
            onValueChange?.(Math.min(max, Math.max(min, parsed)));
          }
        }}
        onBlur={() => commit(Number(String(text ?? clamped).replace(/[^0-9.\-]/g, "")) || 0)}
        aria-label={props["aria-label"] ?? "Number"}
        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-right font-mono text-sm tabular-nums focus:outline-none"
        {...props}
      />
      <div className="flex flex-col border-l border-border">
        <button
          type="button"
          aria-label="Increase"
          onClick={() => commit(clamped + step)}
          className="flex-1 cursor-pointer px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          ▲
        </button>
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => commit(clamped - step)}
          className="flex-1 cursor-pointer border-t border-border px-2.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          ▼
        </button>
      </div>
    </div>
  );
}
