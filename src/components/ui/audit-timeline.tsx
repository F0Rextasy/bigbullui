"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AuditEvent {
  id: string;
  actor: string;
  action: string;
  time: string;
  tone?: "ok" | "warn" | "bad";
}

export interface AuditTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  events?: AuditEvent[];
}

const FALLBACK: AuditEvent[] = [
  { id: "1", actor: "Ada", action: "Printed 2 VIP stubs", time: "19:02", tone: "ok" },
  { id: "2", actor: "Row", action: "Moved Gate 3 scanner", time: "19:20", tone: "warn" },
  { id: "3", actor: "Max", action: "Voided order BB-1180", time: "19:41", tone: "bad" },
];

/** Audit event timeline with tone dots. */
export function AuditTimeline({ events = FALLBACK, className, ...props }: AuditTimelineProps) {
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="border-b border-dashed border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Audit timeline</p>
      <ol className="mt-3 space-y-3">
        {events.map((e) => (
          <li key={e.id} className="flex items-start gap-3">
            <span className={cn("mt-1 size-2.5 shrink-0 rounded-full border border-foreground", e.tone === "bad" ? "bg-destructive" : e.tone === "warn" ? "bg-amber-500" : "bg-primary")} aria-hidden="true" />
            <div className="flex-1 border-b border-dashed border-border pb-2">
              <p className="font-mono text-xs text-foreground"><span className="font-bold">{e.actor}</span> {e.action}</p>
              <p className="font-mono text-[10px] uppercase text-muted-foreground">{e.time} stamped</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
