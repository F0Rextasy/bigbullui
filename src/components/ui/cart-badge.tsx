"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CartBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number;
  /** count değiştiğinde otomatik pulse */
  pulseOnChange?: boolean;
}

/** Sepet rozeti: count değişince pulse animasyonu. */
export function CartBadge({ count, pulseOnChange = true, className, ...props }: CartBadgeProps) {
  const prev = React.useRef(count);
  const [pulse, setPulse] = React.useState(false);

  React.useEffect(() => {
    if (pulseOnChange && count !== prev.current) {
      prev.current = count;
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 400);
      return () => clearTimeout(t);
    }
  }, [count, pulseOnChange]);

  if (count <= 0) return null;

  return (
    <span
      className={cn(
        "inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 font-mono text-[10px] font-bold tabular-nums text-accent-foreground",
        "animate-[fade-in-up_0.25s_ease-out_both] motion-reduce:animate-none",
        pulse && "animate-[scale-in_0.15s_ease-out] motion-reduce:animate-none",
        className
      )}
      role="status"
      aria-label={`Sepette ${count} ürün`}
      {...props}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
