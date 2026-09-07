"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface GanttBar {
  id: string;
  label: string;
  start: number;
  span: number;
  tone?: "primary" | "accent";
}

export interface TimelineGanttProps extends React.HTMLAttributes<HTMLDivElement> {
  bars?: GanttBar[];
  columns?: number;
}

const FALLBACK: GanttBar[] = [
  { id: "1", label: "Soundcheck", start: 0, span: 3, tone: "accent" },
  { id: "2", label: "Doors open", start: 3, span: 2, tone: "primary" },
  { id: "3", label: "Main act", start: 5, span: 5, tone: "primary" },
  { id: "4", label: "Encore", start: 10, span: 2, tone: "accent" },
];

/** Simple timeline gantt with dashed grid columns. */
export function TimelineGantt({ bars = FALLBACK, columns = 12, className, ...props }: TimelineGanttProps) {
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="border-b border-dashed border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Show timeline</p>
      <div className="mt-3 space-y-2">
        {bars.map((b) => (
          <div key={b.id} className="grid grid-cols-[110px_1fr] items-center gap-2">
            <span className="truncate font-mono text-[11px] font-bold uppercase text-foreground">{b.label}</span>
            <div className="grid h-7 overflow-hidden rounded border border-dashed border-border bg-secondary/30" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }} role="img" aria-label={`${b.label} from slot ${b.start} spanning ${b.span}`}>
              <div
                className={cn("h-full rounded-sm border border-foreground motion-safe:animate-[grow-x_0.5s_ease-out] motion-reduce:animate-none", b.tone === "accent" ? "bg-accent" : "bg-primary")}
                style={{ gridColumn: `${b.start + 1} / span ${Math.min(b.span, columns - b.start)}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
