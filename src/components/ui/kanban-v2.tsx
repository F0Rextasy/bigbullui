"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Kanban2Column {
  id: string;
  title: string;
  cards: { id: string; label: string }[];
}

export interface KanbanV2Props extends React.HTMLAttributes<HTMLDivElement> {
  columns: Kanban2Column[];
  onMove?: (cardId: string, from: string, to: string) => void;
}

/** Drag-and-drop Kanban board v2: HTML5 drag reordering across columns. */
export function KanbanV2({ columns, onMove, className, ...props }: KanbanV2Props) {
  const [board, setBoard] = React.useState(columns);
  const [dragging, setDragging] = React.useState<{ cardId: string; from: string } | null>(null);
  const [overCol, setOverCol] = React.useState<string | null>(null);

  const drop = (to: string) => {
    if (!dragging || dragging.from === to) { setDragging(null); setOverCol(null); return; }
    setBoard((prev) => {
      const fromCol = prev.find((c) => c.id === dragging.from);
      const toCol = prev.find((c) => c.id === to);
      if (!fromCol || !toCol) return prev;
      const card = fromCol.cards.find((c) => c.id === dragging.cardId);
      if (!card) return prev;
      return prev.map((c) => {
        if (c.id === dragging.from) return { ...c, cards: c.cards.filter((x) => x.id !== dragging.cardId) };
        if (c.id === to) return { ...c, cards: [...c.cards, card] };
        return c;
      });
    });
    onMove?.(dragging.cardId, dragging.from, to);
    setDragging(null);
    setOverCol(null);
  };

  return (
    <div className={cn("flex w-full gap-3 overflow-x-auto pb-2", className)} {...props}>
      <style>{`@keyframes kbIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {board.map((col, idx) => (
        <div
          key={col.id}
          onDragOver={(e) => { e.preventDefault(); setOverCol(col.id); }}
          onDragLeave={() => setOverCol((c) => (c === col.id ? null : c))}
          onDrop={() => drop(col.id)}
          className={cn(
            "flex w-48 shrink-0 flex-col rounded-lg border bg-card p-2 transition-colors duration-200 motion-reduce:transition-none animate-[kbIn_0.3s_ease-out_both] motion-reduce:animate-none",
            overCol === col.id && dragging && dragging.from !== col.id ? "border-accent bg-accent/5" : "border-border"
          )}
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          <p className="mb-2 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {col.title}
            <span className="rounded-full bg-secondary px-1.5 tabular-nums">{col.cards.length}</span>
          </p>
          <ul className="min-h-16 flex-1 space-y-1.5">
            {col.cards.map((card) => (
              <li
                key={card.id}
                draggable
                onDragStart={() => setDragging({ cardId: card.id, from: col.id })}
                onDragEnd={() => { setDragging(null); setOverCol(null); }}
                className={cn(
                  "cursor-grab rounded-md border border-border bg-background px-2.5 py-2 text-xs select-none",
                  "transition-all duration-150 motion-reduce:transition-none active:cursor-grabbing",
                  "hover:border-foreground/30 hover:shadow-sm",
                  dragging?.cardId === card.id && "opacity-40 border-dashed"
                )}
              >
                {card.label}
              </li>
            ))}
            {col.cards.length === 0 && (
              <li className="flex min-h-12 items-center justify-center rounded-md border border-dashed border-border/60 text-[10px] text-muted-foreground">Empty</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
