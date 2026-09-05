"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Timeline2Item {
  id: string;
  title: string;
  time: string;
  description?: string;
}

export interface TimelineVerticalV2Props extends React.HTMLAttributes<HTMLDivElement> {
  items: Timeline2Item[];
}

/** İki yanlı dikey zaman çizelgesi: kartlar sırayla sola-sağa dizilir. */
export function TimelineVerticalV2({ items, className, ...props }: TimelineVerticalV2Props) {
  return (
    <div className={cn("relative w-full max-w-md py-2", className)} {...props}>
      <style>{`@keyframes tv2In { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 rounded-full bg-border/60" aria-hidden="true" />
      <ul className="space-y-4">
        {items.map((item, idx) => {
          const left = idx % 2 === 0;
          return (
            <li key={item.id} className={cn("relative flex w-1/2", left ? "pr-6" : "ml-auto pl-6")} style={{ animation: "tv2In 0.35s ease-out both", animationDelay: `${idx * 90}ms` }}>
              <span className={cn("absolute top-4 size-3 rounded-full border-2 border-accent bg-card", left ? "-right-[7px]" : "-left-[7px]")} aria-hidden="true" />
              <div className="w-full rounded-md border border-border bg-card p-3 transition-colors hover:border-accent/40 motion-reduce:transition-none">
                <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{item.time}</p>
                <p className="mt-0.5 text-sm font-medium">{item.title}</p>
                {item.description && <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
