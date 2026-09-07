"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LoveNote {
  quote: string;
  name: string;
  role?: string;
}

export interface WallOfLoveProps extends React.HTMLAttributes<HTMLDivElement> {
  notes?: LoveNote[];
}

/** Wall of love: masonry testimonial grid with stamp accents. */
export function WallOfLove({
  notes = [
    { quote: "Fastest gate entry we have ever run.", name: "Mara V", role: "Venue lead" },
    { quote: "The stubs look unreal on paper.", name: "Jon K", role: "Promoter" },
    { quote: "Scanning never missed a beat.", name: "Priya S", role: "Box office" },
  ],
  className,
  ...props
}: WallOfLoveProps) {
  return (
    <div className={cn("grid w-full max-w-2xl grid-cols-1 gap-2 sm:grid-cols-3", className)} {...props}>
      {notes.map((n, i) => (
        <figure
          key={i}
          className={cn("rounded-lg border-2 bg-card p-4", i === 0 ? "border-accent" : "border-foreground")}
        >
          <span aria-hidden="true" className="font-mono text-lg text-accent">★</span>
          <blockquote className="mt-1 text-xs leading-relaxed">{n.quote}</blockquote>
          <figcaption className="mt-3 border-t border-dashed border-border pt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {n.name}{n.role ? ` · ${n.role}` : ""}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
