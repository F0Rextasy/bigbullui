"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MasonryItem {
  id: string;
  content: React.ReactNode;
}

export interface MasonryColumnsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MasonryItem[];
  columns?: 2 | 3 | 4;
}

/** CSS multi-column masonry layout: dynamic height card distribution. */
export function MasonryColumns({ items, columns = 3, className, ...props }: MasonryColumnsProps) {
  const colClass = { 2: "sm:columns-2", 3: "sm:columns-3", 4: "sm:columns-4" }[columns];

  return (
    <div className={cn("columns-1 gap-4 space-y-4", colClass, className)} {...props}>
      <style>{`@keyframes masonryIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="break-inside-avoid rounded-lg border border-border bg-card p-4 animate-[masonryIn_0.4s_ease-out_both] motion-reduce:animate-none transition-colors hover:border-foreground/30 motion-reduce:transition-none"
          style={{ animationDelay: `${(idx % 12) * 60}ms` }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
