"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DepartureRow {
  time: string;
  destination: string;
  gate: string;
  status: "ON TIME" | "BOARDING" | "DELAYED" | "CANCELLED";
}

export interface TrainDepartureBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  rows?: DepartureRow[];
}

const STATUS_TONE: Record<DepartureRow["status"], string> = {
  "ON TIME": "text-foreground",
  BOARDING: "text-accent",
  DELAYED: "text-accent",
  CANCELLED: "text-destructive",
};

export function TrainDepartureBoard({
  title = "DEPARTURES",
  rows = [
    { time: "18:40", destination: "Night Express", gate: "G3", status: "BOARDING" },
    { time: "19:05", destination: "Coastal Line", gate: "G1", status: "ON TIME" },
    { time: "19:30", destination: "Metro Loop", gate: "G2", status: "DELAYED" },
  ],
  className,
  ...props
}: TrainDepartureBoardProps) {
  const [tick, setTick] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <div className="flex items-center justify-between border-b-2 border-foreground bg-secondary px-4 py-2">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">{title}</span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground" aria-live="polite">
          <span key={tick} className="size-1.5 animate-pulse rounded-full bg-accent" aria-hidden />
          LIVE
        </span>
      </div>
      <div role="table" aria-label={title}>
        {rows.map((row) => (
          <div
            key={`${row.time}-${row.destination}`}
            role="row"
            className="grid grid-cols-[64px_1fr_auto_auto] items-center gap-3 border-b border-dashed border-border px-4 py-2.5 font-mono text-sm last:border-0"
          >
            <span className="font-bold tabular-nums" role="cell">{row.time}</span>
            <span className="truncate uppercase" role="cell">{row.destination}</span>
            <span className="text-muted-foreground" role="cell">{row.gate}</span>
            <span role="cell" className={cn("text-[11px] font-bold", STATUS_TONE[row.status])}>
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
