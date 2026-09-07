"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DeckCard {
  id: string;
  title: string;
  serial: string;
}

export interface TicketDeckDndProps extends React.HTMLAttributes<HTMLOListElement> {
  initial?: DeckCard[];
  onOrderChange?: (cards: DeckCard[]) => void;
}

const FALLBACK: DeckCard[] = [
  { id: "1", title: "Orchestra VIP", serial: "NO 0042" },
  { id: "2", title: "Balcony Standard", serial: "NO 0117" },
  { id: "3", title: "Backstage Pass", serial: "NO 0203" },
];

/** Draggable ticket deck with keyboard reorder. */
export function TicketDeckDnd({ initial = FALLBACK, onOrderChange, className, ...props }: TicketDeckDndProps) {
  const [cards, setCards] = React.useState<DeckCard[]>(initial);
  const [dragId, setDragId] = React.useState<string | null>(null);
  const move = (next: DeckCard[]) => { setCards(next); onOrderChange?.(next); };
  const shift = (id: string, dir: -1 | 1) => {
    const i = cards.findIndex((c) => c.id === id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= cards.length) return;
    const next = [...cards];
    const [card] = next.splice(i, 1);
    next.splice(j, 0, card);
    move(next);
  };
  return (
    <ol className={cn("w-full max-w-sm space-y-2", className)} aria-label="Ticket deck, drag to reorder" {...props}>
      {cards.map((c, i) => (
        <li
          key={c.id}
          draggable
          onDragStart={() => setDragId(c.id)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (!dragId || dragId === c.id) return;
            const from = cards.findIndex((x) => x.id === dragId);
            const to = cards.findIndex((x) => x.id === c.id);
            const next = [...cards];
            const [card] = next.splice(from, 1);
            next.splice(to, 0, card);
            move(next);
            setDragId(null);
          }}
          className={cn("flex cursor-grab items-center gap-3 rounded-lg border-2 bg-card px-3 py-2 shadow-md active:cursor-grabbing", dragId === c.id ? "border-accent opacity-70" : "border-foreground")}
        >
          <span className="rounded bg-secondary px-2 py-1 font-mono text-[11px] font-bold text-muted-foreground">{i + 1}</span>
          <span className="flex-1">
            <span className="block font-mono text-xs font-black uppercase text-foreground">{c.title}</span>
            <span className="block font-mono text-[10px] uppercase text-muted-foreground">{c.serial}</span>
          </span>
          <span className="flex gap-1">
            <button type="button" onClick={() => shift(c.id, -1)} disabled={i === 0} aria-label={`Move ${c.title} up`} className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-foreground disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Up</button>
            <button type="button" onClick={() => shift(c.id, 1)} disabled={i === cards.length - 1} aria-label={`Move ${c.title} down`} className="rounded border border-border px-1.5 py-0.5 font-mono text-[11px] text-foreground disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Dn</button>
          </span>
        </li>
      ))}
    </ol>
  );
}
