"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RateLimitNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** sıfırlamaya kalan saniye */
  resetSeconds?: number;
  limitLabel?: string;
}

/** Hız sınırı uyarısı: geri sayımlı kilit notu. */
export function RateLimitNote({ resetSeconds = 60, limitLabel = "İstek limiti doldu", className, ...props }: RateLimitNoteProps) {
  const [seconds, setSeconds] = React.useState(resetSeconds);

  React.useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  return (
    <div className={cn("flex items-center gap-2.5 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2", className)} role="status" {...props}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-amber-600" aria-hidden="true">
        <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
      <p className="min-w-0 flex-1 text-xs text-foreground">
        <span className="font-medium">{limitLabel}.</span>{" "}
        {seconds > 0 ? (
          <>Lütfen <span className="font-mono tabular-nums text-amber-600">{String(seconds).padStart(2, "0")}s</span> bekle.</>
        ) : (
          "Tekrar deneyebilirsin."
        )}
      </p>
    </div>
  );
}
