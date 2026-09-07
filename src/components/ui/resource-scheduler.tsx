"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ResourceSchedulerProps extends React.HTMLAttributes<HTMLDivElement> {
  resources?: { name: string; slots: boolean[] }[];
}

/** Resource scheduler stub: grid of bookable slots per resource row. */
export function ResourceScheduler({ resources = [{ name: "Gate A", slots: [true, false, true, true, false, false] }, { name: "Gate B", slots: [false, false, true, true, true, false] }], className, ...props }: ResourceSchedulerProps) {
  const [booked, setBooked] = React.useState<Record<string, number[]>>({});
  const toggle = (r: string, i: number) =>
    setBooked((b) => ({ ...b, [r]: (b[r] ?? []).includes(i) ? (b[r] ?? []).filter((x) => x !== i) : [...(b[r] ?? []), i] }));
  return (
    <div className={cn("w-full max-w-lg overflow-x-auto rounded-lg border border-border bg-card p-3", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Resource scheduler</span>
      <div className="mt-2 space-y-2">
        {resources.map((r) => (
          <div key={r.name} className="flex items-center gap-2">
            <span className="w-16 shrink-0 font-mono text-[10px] font-bold uppercase text-foreground">{r.name}</span>
            <div className="flex flex-1 gap-1" role="group" aria-label={r.name}>
              {r.slots.map((free, i) => {
                const mine = (booked[r.name] ?? []).includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={!free}
                    aria-pressed={mine}
                    aria-label={`${r.name} slot ${i + 1}`}
                    onClick={() => toggle(r.name, i)}
                    className={cn(
                      "h-7 min-w-7 flex-1 rounded border border-dashed font-mono text-[10px] tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                      !free && "cursor-not-allowed bg-muted/40 text-muted-foreground/50",
                      free && !mine && "border-border bg-background text-muted-foreground hover:border-accent/60",
                      mine && "border-accent bg-accent text-accent-foreground"
                    )}
                  >
                    {String(i + 9).padStart(2, "0")}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
