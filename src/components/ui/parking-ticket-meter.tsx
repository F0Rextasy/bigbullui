"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ParkingTicketMeterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  plate?: string;
  enteredAt?: number;
  allowanceMin?: number;
  onExpire?: () => void;
}

export function ParkingTicketMeter({
  plate = "34 BB 042",
  enteredAt,
  allowanceMin = 120,
  onExpire,
  className,
  ...props
}: ParkingTicketMeterProps) {
  const [now, setNow] = React.useState(() => Date.now());
  const start = enteredAt ?? now;

  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsedMin = Math.max(0, (now - start) / 60000);
  const leftMin = allowanceMin - elapsedMin;
  const expired = leftMin <= 0;
  const pct = Math.min(100, Math.max(0, (leftMin / allowanceMin) * 100));

  React.useEffect(() => {
    if (expired) onExpire?.();
  }, [expired, onExpire ]);

  const hh = Math.floor(Math.max(leftMin, 0) / 60);
  const mm = Math.floor(Math.max(leftMin, 0) % 60);
  const ss = Math.floor(((Math.max(leftMin, 0) % 1) * 60) % 60);

  return (
    <div className={cn("w-full max-w-xs rounded-lg border-2 border-foreground bg-card p-4 text-center", className)} {...props}>
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Parking stub</p>
      <p className="mt-1 font-mono text-2xl font-bold tracking-widest">{plate}</p>
      <p
        className={cn("mt-2 font-mono text-4xl font-bold tabular-nums", expired ? "text-destructive" : "text-accent")}
        aria-live="polite"
      >
        {expired ? "EXPIRED" : `${hh}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label="Remaining time">
        <div className={cn("h-full rounded-full transition-all", expired ? "bg-destructive" : "bg-accent")} style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 font-mono text-[10px] uppercase text-muted-foreground">
        {allowanceMin} min allowance
      </p>
    </div>
  );
}
