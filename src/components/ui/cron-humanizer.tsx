"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CronHumanizerProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/** Cron expression explainer in plain English. */
export function CronHumanizer({ defaultValue = "30 19 * * FRI", className, ...props }: CronHumanizerProps) {
  const [expr, setExpr] = React.useState(defaultValue);
  const human = React.useMemo(() => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) return "Enter a 5-field cron expression: minute hour day month weekday.";
    const [min, hour, dom, mon, dow] = parts;
    const time = hour === "*" ? `every hour at minute ${min}` : `at ${hour.padStart(2, "0")}:${min.padStart(2, "0")}`;
    const day = dow === "*" ? (dom === "*" ? "every day" : `on day ${dom} of the month`) : `every ${DAYS[Number(dow)] ?? dow}`;
    const month = mon === "*" ? "" : ` in month ${mon}`;
    return `Runs ${time}, ${day}${month}.`;
  }, [expr]);
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cron humanizer</p>
      <input value={expr} onChange={(e) => setExpr(e.target.value)} spellCheck={false} aria-label="Cron expression" className="mt-2 w-full rounded-md border border-dashed border-border bg-secondary/40 p-2 font-mono text-sm text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      <p className="mt-2 rounded-md border border-dashed border-accent/50 bg-accent/10 px-3 py-2 font-mono text-xs text-foreground">{human}</p>
    </div>
  );
}
