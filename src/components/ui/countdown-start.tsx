"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CountdownStartProps extends React.HTMLAttributes<HTMLDivElement> {
  from?: number;
  onGo?: () => void;
}

/** Countdown start: 3-2-1-GO match opener with auto tick. */
export function CountdownStart({ from = 3, onGo, className, ...props }: CountdownStartProps) {
  const [entry, setEntry] = React.useState(() => ({ base: from, n: from }));
  const n = entry.base === from ? entry.n : from;
  React.useEffect(() => {
    if (n <= 0) {
      onGo?.();
      return;
    }
    const t = setTimeout(() => setEntry((prev) => ({
      base: from,
      n: (prev.base === from ? prev.n : from) - 1,
    })), 900);
    return () => clearTimeout(t);
  }, [n, from, onGo]);
  return (
    <div
      role="timer"
      aria-label={n > 0 ? `Match starts in ${n}` : "Go"}
      className={cn("flex min-h-11 touch-none select-none flex-col items-center gap-1 rounded-md border-2 border-foreground bg-card px-6 py-3", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      <span key={n} className="animate-[countZoom_0.85s_ease-out] font-mono text-4xl font-black tabular-nums motion-reduce:animate-none" aria-hidden="true">
        {n > 0 ? n : "GO"}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Match Start</span>
    </div>
  );
}
