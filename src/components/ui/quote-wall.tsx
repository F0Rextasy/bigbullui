"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { Quote } from "./quote";

export interface QuoteWallEntry {
  id: string;
  quote: string;
  author: string;
}

export interface QuoteWallProps extends React.HTMLAttributes<HTMLDivElement> {
  quotes: QuoteWallEntry[];
  columns?: 2 | 3;
}

/** Testimonial quote wall: masonry card layout. */
export function QuoteWall({ quotes, columns = 2, className, ...props }: QuoteWallProps) {
  const colClass = { 2: "sm:columns-2", 3: "sm:columns-3" }[columns];
  return (
    <div className={cn("columns-1 gap-4 space-y-4", colClass, className)} {...props}>
      {quotes.map((q, idx) => (
        <div key={q.id} className="break-inside-avoid" style={{ animationDelay: `${(idx % 8) * 70}ms` }}>
          <div className="animate-[fade-in-up_0.35s_ease-out_both] motion-reduce:animate-none">
            <Quote author={q.author} className="w-full">
              {q.quote}
            </Quote>
          </div>
        </div>
      ))}
    </div>
  );
}
