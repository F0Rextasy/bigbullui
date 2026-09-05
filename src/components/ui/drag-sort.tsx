"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DragSortItem {
  id: string;
  content: React.ReactNode;
}

export interface DragSortProps extends React.HTMLAttributes<HTMLUListElement> {
  items: DragSortItem[];
  onReorder?: (items: DragSortItem[]) => void;
}

/** Drag and drop sortable list using HTML5 drag events with smooth displacement. */
export function DragSort({ items, onReorder, className, ...props }: DragSortProps) {
  const [order, setOrder] = React.useState(items);
  const [dragId, setDragId] = React.useState<string | null>(null);
  const [overId, setOverId] = React.useState<string | null>(null);

  React.useEffect(() => setOrder(items), [items]);

  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) { setDragId(null); setOverId(null); return; }
    const from = order.findIndex((i) => i.id === dragId);
    const to = order.findIndex((i) => i.id === targetId);
    if (from === -1 || to === -1) return;
    const next = [...order];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setOrder(next);
    onReorder?.(next);
    setDragId(null);
    setOverId(null);
  };

  return (
    <ul className={cn("space-y-1.5", className)} {...props}>
      <style>{`@keyframes dragSortPop { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
      {order.map((item, idx) => (
        <li
          key={item.id}
          draggable
          onDragStart={(e) => { setDragId(item.id); e.dataTransfer.effectAllowed = "move"; }}
          onDragOver={(e) => { e.preventDefault(); setOverId(item.id); }}
          onDragEnd={() => { setDragId(null); setOverId(null); }}
          onDrop={() => handleDrop(item.id)}
          className={cn(
            "flex cursor-grab items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5 select-none",
            "transition-all duration-200 motion-reduce:transition-none",
            "animate-[dragSortPop_0.25s_ease-out_both] motion-reduce:animate-none",
            "hover:border-foreground/40 active:cursor-grabbing",
            dragId === item.id && "opacity-40 border-dashed",
            overId === item.id && dragId !== item.id && "border-accent"
          )}
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-muted-foreground" aria-hidden="true">
            <circle cx="9" cy="6" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="18" r="1" />
            <circle cx="15" cy="6" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="18" r="1" />
          </svg>
          <span className="font-mono text-[10px] text-muted-foreground">{String(idx + 1).padStart(2, "0")}</span>
          <div className="flex-1 text-sm">{item.content}</div>
        </li>
      ))}
    </ul>
  );
}
