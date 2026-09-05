"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TwoColumnListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: { id: string; label: string; value?: string }[];
}

/** Two-column ledger list view with center divider rule. */
export function TwoColumnList({ items, className, ...props }: TwoColumnListProps) {
  const half = Math.ceil(items.length / 2);
  const left = items.slice(0, half);
  const right = items.slice(half);

  const Row = ({ item, idx }: { item: (typeof items)[number]; idx: number }) => (
    <li
      className="flex items-center justify-between gap-3 border-b border-dashed border-border/50 py-2 animate-[twoColIn_0.3s_ease-out_both] motion-reduce:animate-none transition-colors hover:text-accent motion-reduce:transition-none"
      style={{ animationDelay: `${idx * 40}ms` }}
    >
      <span className="truncate text-sm">{item.label}</span>
      {item.value !== undefined && <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">{item.value}</span>}
    </li>
  );

  return (
    <div className={cn("grid grid-cols-1 gap-x-10 sm:grid-cols-2", className)} {...props}>
      <style>{`@keyframes twoColIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <ul>{left.map((item, i) => <Row key={item.id} item={item} idx={i} />)}</ul>
      <ul>{right.map((item, i) => <Row key={item.id} item={item} idx={i + half} />)}</ul>
    </div>
  );
}
