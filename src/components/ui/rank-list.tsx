"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { DragSort, type DragSortItem } from "./drag-sort";

export interface RankListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: { id: string; label: string; score?: number }[];
  onReorder?: (items: DragSortItem[]) => void;
}

/** Sıralı liste: sürükle-bırak sıralama + skor. */
export function RankList({ items, onReorder, className, ...props }: RankListProps) {
  const dragItems: DragSortItem[] = items.map((it) => ({
    id: it.id,
    content: (
      <span className="flex items-center justify-between gap-3">
        <span className="truncate">{it.label}</span>
        {it.score !== undefined && (
          <span className="shrink-0 font-mono text-xs tabular-nums text-accent">{it.score.toLocaleString("tr-TR")}</span>
        )}
      </span>
    ),
  }));

  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <DragSort items={dragItems} onReorder={onReorder} />
    </div>
  );
}
