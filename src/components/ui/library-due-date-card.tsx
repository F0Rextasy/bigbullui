"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DueDateEntry {
  id: string;
  title: string;
  due: string;
  returned?: boolean;
}

export interface LibraryDueDateCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  borrower?: string;
  cardNo?: string;
  entries?: DueDateEntry[];
  onToggle?: (id: string, returned: boolean) => void;
}

export function LibraryDueDateCard({
  borrower = "ADA BULL",
  cardNo = "LIB-00421",
  entries = [
    { id: "1", title: "Design Systems Handbook", due: "SEP 12" },
    { id: "2", title: "CSS Secrets", due: "SEP 19" },
  ],
  onToggle,
  className,
  ...props
}: LibraryDueDateCardProps) {
  const [inner, setInner] = React.useState<Record<string, boolean>>({});

  const toggle = (entry: DueDateEntry) => {
    const next = !(inner[entry.id] ?? entry.returned ?? false);
    setInner((prev) => ({ ...prev, [entry.id]: next }));
    onToggle?.(entry.id, next);
  };

  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <div className="flex items-center justify-between border-b-2 border-dashed border-border pb-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Library card</p>
          <p className="font-bold">{borrower}</p>
        </div>
        <span className="rounded border border-border px-2 py-0.5 font-mono text-[10px]">{cardNo}</span>
      </div>
      <div className="mt-2 divide-y divide-dashed divide-border">
        {entries.map((entry) => {
          const done = inner[entry.id] ?? entry.returned ?? false;
          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => toggle(entry)}
              aria-pressed={done}
              className="flex w-full cursor-pointer items-center gap-3 py-2 text-start transition-opacity hover:opacity-80"
            >
              <span
                aria-hidden
                className={cn(
                  "flex size-6 shrink-0 rotate-[-8deg] items-center justify-center rounded-full border-2 font-mono text-[10px] font-bold",
                  done ? "border-accent text-accent" : "border-dashed border-border text-transparent",
                )}
              >
                ✓
              </span>
              <span className={cn("min-w-0 flex-1 truncate text-sm", done && "text-muted-foreground line-through")}>
                {entry.title}
              </span>
              <span className={cn("shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px]", done ? "bg-secondary text-muted-foreground" : "bg-accent/15 text-accent")}>
                {entry.due}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
