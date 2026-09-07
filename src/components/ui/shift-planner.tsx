"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ShiftSlot {
  id: string;
  day: string;
  label: string;
  staff: string;
}

export interface ShiftPlannerProps extends React.HTMLAttributes<HTMLDivElement> {
  slots?: ShiftSlot[];
}

const FALLBACK: ShiftSlot[] = [
  { id: "1", day: "FRI", label: "Gate 3 - Evening", staff: "Ada" },
  { id: "2", day: "SAT", label: "Gate 3 - Matinee", staff: "Row" },
  { id: "3", day: "SAT", label: "Gate 4 - Evening", staff: "Max" },
  { id: "4", day: "SUN", label: "Will call desk", staff: "Ada" },
];

/** Weekly staff shift board with claim buttons. */
export function ShiftPlanner({ slots = FALLBACK, className, ...props }: ShiftPlannerProps) {
  const [claimed, setClaimed] = React.useState<string[]>([]);
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="border-b border-dashed border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Shift planner</p>
      <ul className="mt-2 space-y-2">
        {slots.map((s) => {
          const done = claimed.includes(s.id);
          return (
            <li key={s.id} className="flex items-center gap-3 rounded-md border border-dashed border-border bg-secondary/30 px-3 py-2">
              <span className="rounded bg-primary px-2 py-1 font-mono text-[11px] font-bold text-primary-foreground">{s.day}</span>
              <span className="flex-1 font-mono text-xs text-foreground">{s.label} <span className="text-muted-foreground">- {s.staff}</span></span>
              <button
                type="button"
                onClick={() => setClaimed((c) => (done ? c.filter((x) => x !== s.id) : [...c, s.id]))}
                aria-pressed={done}
                className={cn("rounded border px-2 py-0.5 font-mono text-[10px] font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", done ? "border-foreground bg-accent text-accent-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground")}
              >
                {done ? "Held" : "Claim"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
