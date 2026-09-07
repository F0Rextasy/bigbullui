"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WebhookLogProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: { id: string; event: string; code: number; time: string }[];
}

/** Webhook log stub: mono delivery rows with status codes. */
export function WebhookLog({ events = [{ id: "w1", event: "stub.sold", code: 200, time: "12:01" }, { id: "w2", event: "gate.scan", code: 500, time: "12:04" }, { id: "w3", event: "refund.issued", code: 200, time: "12:09" }], className, ...props }: WebhookLogProps) {
  return (
    <div className={cn("w-full max-w-md rounded-lg border border-border bg-card p-3", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Webhook log</span>
      <ul className="mt-2 space-y-1 font-mono text-[11px]">
        {events.map((e) => (
          <li key={e.id} className="flex items-center gap-2 rounded border border-dashed border-border bg-background px-2 py-1.5">
            <span className={cn("rounded px-1.5 py-px text-[10px] font-bold tabular-nums", e.code < 300 ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-destructive/10 text-destructive")}>{e.code}</span>
            <span className="flex-1 truncate text-foreground">{e.event}</span>
            <span className="tabular-nums text-muted-foreground">{e.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
