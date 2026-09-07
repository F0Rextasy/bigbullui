"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CountdownV2Props extends React.HTMLAttributes<HTMLDivElement> {
  targetDate?: Date;
  label?: string;
}

function diff(target: Date): [number, number, number, number] {
  const ms = Math.max(0, target.getTime() - Date.now());
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return [d, h, m, s];
}

/** Countdown v2 with flip cards and live tick. */
export function CountdownV2({ targetDate, label = "Doors open in", className, ...props }: CountdownV2Props) {
  const target = React.useMemo(() => targetDate ?? new Date(Date.now() + 2 * 86400000 + 3600000), [targetDate]);
  const [now, setNow] = React.useState(() => diff(target));
  React.useEffect(() => {
    const t = setInterval(() => setNow(diff(target)), 1000);
    return () => clearInterval(t);
  }, [target]);
  const units = [["Days", now[0]], ["Hrs", now[1]], ["Min", now[2]], ["Sec", now[3]]] as const;
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 text-center shadow-md", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <div className="mt-2 flex justify-center gap-2" role="timer" aria-live="off">
        {units.map(([u, v]) => (
          <div key={u} className="min-w-14 rounded-md border-2 border-foreground bg-secondary px-2 py-1.5 outline-1 outline-dashed outline-offset-[-4px] outline-border">
            <p className="font-mono text-xl font-black tabular-nums text-foreground">{String(v).padStart(2, "0")}</p>
            <p className="font-mono text-[9px] font-bold uppercase text-accent">{u}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
