"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RowExpandItem {
  id: string;
  label: string;
  detail: React.ReactNode;
}

export interface RowExpandListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: RowExpandItem[];
}

/** Expandable row list: accordion details with height animation. */
export function RowExpandList({ items, className, ...props }: RowExpandListProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <div className={cn("w-full max-w-md divide-y divide-border/60 overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes reIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {items.map((item, idx) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="animate-[reIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 50}ms` }}>
            <button
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring-inset motion-reduce:transition-none"
            >
              <span className="text-sm font-medium">{item.label}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("shrink-0 text-muted-foreground transition-transform duration-300 motion-reduce:transition-none", open && "rotate-180")} aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out motion-reduce:transition-none",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-dashed border-border/50 bg-secondary/30 px-4 py-3 text-sm text-muted-foreground">
                  {item.detail}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
