"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AgendaListProps extends React.OlHTMLAttributes<HTMLOListElement> {
  items?: { time: string; title: string; meta?: string; done?: boolean }[];
}

/** Agenda list stub: dashed timeline of timed entries with done marks. */
export function AgendaList({ items = [{ time: "09:00", title: "Doors open", meta: "Gate A" }, { time: "10:30", title: "Soundcheck", meta: "Main stage", done: true }, { time: "12:00", title: "Matinee show", meta: "Hall 1" }], className, ...props }: AgendaListProps) {
  const [done, setDone] = React.useState<string[]>(items.filter((i) => i.done).map((i) => i.title));
  return (
    <ol className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-3", className)} {...props}>
      <li className="mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Agenda</li>
      {items.map((item) => {
        const isDone = done.includes(item.title);
        return (
          <li key={item.title} className="relative border-l-2 border-dashed border-border ps-4 pb-3 last:pb-0">
            <span className={cn("absolute -left-[5px] top-1 size-2 rounded-full border", isDone ? "border-accent bg-accent" : "border-border bg-background")} aria-hidden="true" />
            <button
              type="button"
              onClick={() => setDone((d) => (isDone ? d.filter((x) => x !== item.title) : [...d, item.title]))}
              className="w-full text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-pressed={isDone}
            >
              <span className="font-mono text-[10px] tabular-nums text-accent">{item.time}</span>
              <span className={cn("ms-2 font-mono text-xs font-bold", isDone ? "text-muted-foreground line-through" : "text-foreground")}>{item.title}</span>
              {item.meta && <span className="block font-mono text-[10px] uppercase text-muted-foreground">{item.meta}</span>}
            </button>
          </li>
        );
      })}
    </ol>
  );
}
