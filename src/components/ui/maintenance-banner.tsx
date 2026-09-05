"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MaintenanceBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  /** Minutes remaining until maintenance window starts */
  startsInMinutes?: number;
  onDismiss?: () => void;
}

/** Scheduled maintenance banner: announcement + countdown + dismiss. */
export function MaintenanceBanner({ message = "Scheduled maintenance in progress. Services may experience brief interruptions.", startsInMinutes, onDismiss, className, ...props }: MaintenanceBannerProps) {
  const [dismissed, setDismissed] = React.useState(false);
  const [mins, setMins] = React.useState(startsInMinutes ?? 0);
  const hasCountdown = startsInMinutes !== undefined && startsInMinutes > 0;

  React.useEffect(() => {
    if (!hasCountdown || mins <= 0) return;
    const t = setInterval(() => setMins((m) => Math.max(0, m - 1)), 60000);
    return () => clearInterval(t);
  }, [hasCountdown, mins]);

  if (dismissed) return null;

  return (
    <div className={cn("relative flex items-center gap-3 border-b border-amber-500/40 bg-amber-500/10 px-4 py-2", className)} role="status" {...props}>
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-600 animate-pulse motion-reduce:animate-none" aria-hidden="true">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
      </span>
      <p className="min-w-0 flex-1 truncate text-xs text-foreground">{message}</p>
      {hasCountdown && mins > 0 && (
        <span className="shrink-0 rounded-full border border-amber-500/50 bg-background px-2 py-0.5 font-mono text-[10px] tabular-nums text-amber-600">
          ~{mins} dk
        </span>
      )}
      <button
        onClick={() => { setDismissed(true); onDismiss?.(); }}
        className="shrink-0 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
        aria-label="Bildirimi kapat"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>
    </div>
  );
}
