"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DigestPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  subject?: string;
  items?: string[];
}

/** Digest preview: email-style weekly roundup card. */
export function DigestPreview({
  subject = "This week at the arena",
  items = ["3 new shows announced", "VIP presale opens Friday", "Balcony seats back in stock"],
  className,
  ...props
}: DigestPreviewProps) {
  return (
    <div className={cn("w-full max-w-sm overflow-hidden rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <div className="border-b-2 border-dashed border-border bg-secondary/60 px-4 py-2.5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Weekly digest</p>
        <h3 className="text-sm font-black">{subject}</h3>
      </div>
      <ul className="space-y-2 p-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-xs">
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-accent font-mono text-[9px] font-bold text-accent">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ul>
      <div className="border-t-2 border-dashed border-border px-4 py-2.5">
        <button
          type="button"
          className="w-full rounded-md border border-dashed border-border py-1.5 font-mono text-[11px] font-bold uppercase transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          Read full issue
        </button>
      </div>
    </div>
  );
}
