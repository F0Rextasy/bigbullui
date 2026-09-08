"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MasterDetailItem {
  id: string;
  title: string;
  meta?: string;
  body?: string;
}

export interface MasterDetailProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items?: MasterDetailItem[];
}

/** Master-detail: selectable list pane with detail pane. */
export function MasterDetail({
  items = [
    { id: "m1", title: "Order BB-101", meta: "2 stubs · $90", body: "General Admission × 2. Gate 3 entry, doors 19:30." },
    { id: "m2", title: "Order BB-102", meta: "1 stub · $120", body: "VIP Box North. Lounge access included." },
    { id: "m3", title: "Order BB-103", meta: "4 stubs · $180", body: "Orchestra row B. Group booking, adjacent seats." },
  ],
  className,
  ...props
}: MasterDetailProps) {
  const [activeId, setActiveId] = React.useState(items[0]?.id);
  const active = items.find((i) => i.id === activeId) ?? items[0];
  return (
    <div
      className={cn("grid w-full max-w-2xl grid-cols-1 overflow-hidden rounded-lg border-2 border-foreground bg-card sm:grid-cols-[180px_1fr]", className)}
      {...props}
    >
      <div role="listbox" aria-label="Records" className="border-b-2 border-dashed border-border sm:border-b-0 sm:border-r-2">
        {items.map((item) => {
          const selected = item.id === active?.id;
          return (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "block w-full border-b border-dashed border-border px-3 py-2.5 text-start transition-colors last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring motion-reduce:transition-none",
                selected ? "bg-accent/10" : "hover:bg-secondary/60"
              )}
            >
              <span className={cn("block text-xs font-bold", selected && "text-accent")}>{item.title}</span>
              {item.meta && (
                <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{item.meta}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        {active ? (
          <div key={active.id}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Detail</p>
            <h3 className="mt-1 text-sm font-black">{active.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{active.body}</p>
          </div>
        ) : (
          <p className="font-mono text-xs text-muted-foreground">No record selected.</p>
        )}
      </div>
    </div>
  );
}
