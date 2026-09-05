"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Activity2Item {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
}

export interface ActivityV2Props extends React.HTMLAttributes<HTMLDivElement> {
  items: Activity2Item[];
  filters?: string[];
}

/** Filtrelenebilir etkinlik akışı v2. */
export function ActivityV2({ items, filters, className, ...props }: ActivityV2Props) {
  const actions = filters ?? [...new Set(items.map((i) => i.action))];
  const [active, setActive] = React.useState<string | null>(null);
  const visible = active ? items.filter((i) => i.action === active) : items;

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <style>{`@keyframes av2In { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <button
          onClick={() => setActive(null)}
          className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase transition-colors motion-reduce:transition-none", active === null ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground")}
        >
          Tümü
        </button>
        {actions.map((a) => (
          <button
            key={a}
            onClick={() => setActive(a)}
            className={cn("rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase transition-colors motion-reduce:transition-none", active === a ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground")}
          >
            {a}
          </button>
        ))}
      </div>
      <ul className="space-y-1.5">
        {visible.map((item, idx) => (
          <li key={item.id} className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2 animate-[av2In_0.25s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 40}ms` }}>
            <span className="min-w-0 flex-1 truncate text-sm">
              <span className="font-medium">{item.actor}</span> <span className="text-muted-foreground">{item.action}</span> <span className="font-medium">{item.target}</span>
            </span>
            <span className="shrink-0 font-mono text-[9px] text-muted-foreground">{item.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
