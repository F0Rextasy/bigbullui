"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface KanbanTicket {
  id: string;
  code: string;
  title: string;
  seat: string;
  tier: "VIP" | "GA" | "PRESS" | "STAFF";
}

export interface KanbanColumn {
  id: string;
  title: string;
  tickets: KanbanTicket[];
}

export interface KanbanLiteProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: KanbanColumn[];
  onMoveTicket?: (ticketId: string, fromColId: string, toColId: string) => void;
  className?: string;
}

const DEFAULT_COLUMNS: KanbanColumn[] = [
  {
    id: "issued",
    title: "1. ISSUED",
    tickets: [
      { id: "t-101", code: "#TK-4821", title: "Elena Rostova", seat: "Row A • Seat 04", tier: "VIP" },
      { id: "t-102", code: "#TK-9920", title: "Marcus Vance", seat: "Row H • Seat 12", tier: "GA" },
    ],
  },
  {
    id: "checked",
    title: "2. SECURITY CHECK",
    tickets: [
      { id: "t-103", code: "#TK-3312", title: "Dmitri Hall", seat: "Gate 4 • Box 01", tier: "PRESS" },
    ],
  },
  {
    id: "admitted",
    title: "3. ADMITTED",
    tickets: [
      { id: "t-104", code: "#TK-1104", title: "Sarah Jenkins", seat: "Row C • Seat 09", tier: "GA" },
    ],
  },
];

const TIER_COLORS: Record<string, string> = {
  VIP: "bg-accent text-accent-foreground border-accent",
  GA: "bg-secondary text-secondary-foreground border-border",
  PRESS: "bg-foreground text-background border-foreground",
  STAFF: "bg-muted text-muted-foreground border-border",
};

export function KanbanLite({
  columns: propColumns,
  onMoveTicket,
  className,
  ...props
}: KanbanLiteProps) {
  const [columns, setColumns] = React.useState<KanbanColumn[]>(propColumns || DEFAULT_COLUMNS);

  // Sync if propColumns changes
  React.useEffect(() => {
    if (propColumns) setColumns(propColumns);
  }, [propColumns]);

  const moveTicket = (ticketId: string, currentColIdx: number, direction: "left" | "right") => {
    const targetColIdx = direction === "left" ? currentColIdx - 1 : currentColIdx + 1;
    if (targetColIdx < 0 || targetColIdx >= columns.length) return;

    const fromCol = columns[currentColIdx];
    const toCol = columns[targetColIdx];
    const ticket = fromCol.tickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    const nextColumns = columns.map((col, idx) => {
      if (idx === currentColIdx) {
        return { ...col, tickets: col.tickets.filter((t) => t.id !== ticketId) };
      }
      if (idx === targetColIdx) {
        return { ...col, tickets: [...col.tickets, ticket] };
      }
      return col;
    });

    setColumns(nextColumns);
    onMoveTicket?.(ticketId, fromCol.id, toCol.id);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 w-full font-mono select-none",
        className
      )}
      {...props}
    >
      {columns.map((col, colIdx) => (
        <div
          key={col.id}
          className="flex flex-col rounded-lg border-2 border-dashed border-border bg-card/60 p-3 shadow-xs"
        >
          {/* Column Header */}
          <div className="flex items-center justify-between border-b-2 border-border pb-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-foreground">
              {col.title}
            </span>
            <span className="flex size-5 items-center justify-center rounded-sm border border-foreground bg-secondary text-[10px] font-bold">
              {col.tickets.length}
            </span>
          </div>

          {/* Ticket Stubs in Column */}
          <div className="flex flex-col gap-2.5 flex-1 min-h-[160px]">
            {col.tickets.length === 0 ? (
              <div className="flex flex-1 items-center justify-center rounded-md border border-dashed border-border p-4 text-center text-[10px] text-muted-foreground uppercase">
                NO TICKETS IN QUEUE
              </div>
            ) : (
              col.tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="group relative rounded-md border-2 border-foreground bg-background p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Left notch cut */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-card"
                  />
                  {/* Right notch cut */}
                  <div
                    aria-hidden="true"
                    className="absolute -right-1.5 top-1/2 -translate-y-1/2 size-3 rounded-full border border-foreground bg-card"
                  />

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground tracking-widest">
                      {ticket.code}
                    </span>
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[9px] font-bold uppercase border",
                        TIER_COLORS[ticket.tier] || "bg-secondary text-foreground"
                      )}
                    >
                      {ticket.tier}
                    </span>
                  </div>

                  <div className="mt-1.5 text-xs font-bold text-foreground">
                    {ticket.title}
                  </div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    {ticket.seat}
                  </div>

                  {/* Actions to move ticket */}
                  <div className="mt-2.5 flex items-center justify-between border-t border-dashed border-border pt-2 text-[10px]">
                    <button
                      type="button"
                      disabled={colIdx === 0}
                      onClick={() => moveTicket(ticket.id, colIdx, "left")}
                      className="cursor-pointer rounded px-1.5 py-0.5 font-bold transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-20"
                      title="Move Previous"
                    >
                      ← BACK
                    </button>
                    <button
                      type="button"
                      disabled={colIdx === columns.length - 1}
                      onClick={() => moveTicket(ticket.id, colIdx, "right")}
                      className="cursor-pointer rounded bg-foreground px-2 py-0.5 font-bold text-background transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-20"
                      title="Move Next"
                    >
                      ADVANCE →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
