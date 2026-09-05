"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BentoCell {
  id: string;
  /** Grid column span (1-4) */
  span?: 1 | 2 | 3 | 4;
  /** Grid row span (1-3) */
  rows?: 1 | 2 | 3;
  content: React.ReactNode;
}

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cells: BentoCell[];
  columns?: 2 | 3 | 4;
}

/** Bento grid: variable sized cells with hover lift elevation. */
export function BentoGrid({ cells, columns = 4, className, ...props }: BentoGridProps) {
  const spanClass: Record<number, string> = { 1: "col-span-1", 2: "col-span-2", 3: "col-span-3", 4: "col-span-4" };
  const rowClass: Record<number, string> = { 1: "row-span-1", 2: "row-span-2", 3: "row-span-3" };
  const colClass = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns];

  return (
    <div className={cn("grid auto-rows-min gap-3", colClass, className)} {...props}>
      <style>{`@keyframes bentoIn { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      {cells.map((cell, idx) => (
        <div
          key={cell.id}
          className={cn(
            "group rounded-lg border border-border bg-card p-5",
            "transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm motion-reduce:transition-none motion-reduce:hover:transform-none",
            "animate-[bentoIn_0.4s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none",
            spanClass[cell.span ?? 1],
            rowClass[cell.rows ?? 1]
          )}
          style={{ animationDelay: `${idx * 70}ms` }}
        >
          {cell.content}
        </div>
      ))}
    </div>
  );
}
