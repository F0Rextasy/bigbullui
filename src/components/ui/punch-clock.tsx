"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PunchClockProps extends React.HTMLAttributes<HTMLDivElement> {
  employeeId?: string;
  onPunch?: (time: string, type: "in" | "out") => void;
}

/** Time punch clock: timestamp card + clock in/out tracking. */
export function PunchClock({ employeeId = "EMP-042", onPunch, className, ...props }: PunchClockProps) {
  const [punches, setPunches] = React.useState<{ time: string; type: "in" | "out" }[]>([]);
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const punch = (type: "in" | "out") => {
    const time = now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
    setPunches((p) => [{ time, type }, ...p].slice(0, 5));
    onPunch?.(time, type);
  };

  return (
    <div className={cn("w-56 rounded-lg border-2 border-dashed border-border bg-card p-4", className)} {...props}>
      <style>{`@keyframes pcFeed { from { transform: translateY(-16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Puantaj · {employeeId}</p>

      {/* Dijital saat */}
      <p className="mt-2 text-center font-mono text-2xl font-bold tabular-nums text-accent">
        {now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={() => punch("in")}
          className="rounded-md border-2 border-emerald-500/50 py-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-600 transition-colors hover:bg-emerald-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 motion-reduce:transition-none"
        >
          Clock In
        </button>
        <button
          onClick={() => punch("out")}
          className="rounded-md border-2 border-destructive/50 py-1.5 font-mono text-[10px] uppercase tracking-wider text-destructive transition-colors hover:bg-destructive hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive motion-reduce:transition-none"
        >
          Clock Out
        </button>
      </div>

      {/* Recent punches */}
      <ul className="mt-3 space-y-1">
        {punches.map((p, idx) => (
          <li
            key={`${p.time}-${p.type}-${idx}`}
            className="flex items-center justify-between rounded-sm border border-dashed border-border/60 bg-secondary/30 px-2 py-1 font-mono text-[10px] animate-[pcFeed_0.3s_ease-out_both] motion-reduce:animate-none"
          >
            <span className={p.type === "in" ? "text-emerald-600" : "text-destructive"}>{p.type === "in" ? "↓ IN" : "↑ OUT"}</span>
            <span className="tabular-nums text-foreground">{p.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
