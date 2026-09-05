"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CharCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string;
  max: number;
  label?: string;
}

/** Karakter sayacı: limit aşımında uyarı animasyonu. */
export function CharCounter({ value, max, label, className, ...props }: CharCounterProps) {
  const count = value.length;
  const over = count > max;
  const near = !over && count >= max * 0.9;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-mono text-[10px] tabular-nums transition-colors duration-200 motion-reduce:transition-none",
        over ? "text-destructive" : near ? "text-amber-600" : "text-muted-foreground",
        over && "animate-pulse motion-reduce:animate-none",
        className
      )}
      aria-live="polite"
      {...props}
    >
      {label && <span>{label}</span>}
      {count.toLocaleString("tr-TR")}/{max.toLocaleString("tr-TR")}
      {over && <span aria-hidden="true">⚠</span>}
    </span>
  );
}
