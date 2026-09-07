"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RoadmapCard {
  id: string;
  title: string;
  votes?: number;
}

export interface RoadmapBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  now?: RoadmapCard[];
  next?: RoadmapCard[];
  later?: RoadmapCard[];
}

/** Roadmap board: now / next / later columns with vote counts. */
export function RoadmapBoard({
  now = [{ id: "r1", title: "Mobile scanner", votes: 48 }],
  next = [{ id: "r2", title: "Season passes", votes: 31 }],
  later = [{ id: "r3", title: "AR seat view", votes: 12 }],
  className,
  ...props
}: RoadmapBoardProps) {
  const cols: { label: string; cards: RoadmapCard[] }[] = [
    { label: "Now", cards: now },
    { label: "Next", cards: next },
    { label: "Later", cards: later },
  ];
  return (
    <div className={cn("grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-3", className)} {...props}>
      {cols.map((col) => (
        <div key={col.label} className="rounded-lg border-2 border-foreground bg-card p-2.5">
          <p className="border-b-2 border-dashed border-border pb-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {col.label}
          </p>
          <ul className="mt-2 space-y-1.5">
            {col.cards.map((c) => (
              <li key={c.id} className="rounded-md border border-dashed border-border bg-background px-2.5 py-2 text-xs font-bold">
                {c.title}
                {typeof c.votes === "number" && (
                  <span className="mt-1 block font-mono text-[10px] font-normal text-muted-foreground">{c.votes} votes</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
