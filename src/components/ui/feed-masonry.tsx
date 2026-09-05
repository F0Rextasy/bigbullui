"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { MasonryColumns } from "./masonry-columns";

export interface FeedMasonryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: { id: string; content: React.ReactNode }[];
  columns?: 2 | 3;
}

/** Masonry feed layout for dynamic height cards. */
export function FeedMasonry({ items, columns = 2, className, ...props }: FeedMasonryProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <MasonryColumns items={items.map((i) => ({ id: i.id, content: i.content }))} columns={columns} />
    </div>
  );
}
