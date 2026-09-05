"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CassetteTapeProps {
  title: string;
  playing?: boolean;
  onToggle?: () => void;
}

export function CassetteTape({ title, playing = false, onToggle }: CassetteTapeProps) {
  return (
    <div
      className={cn(
        "relative size-32 rounded-md border border-border bg-card p-4 motion-reduce:transition-none",
        "group"
      )}
    >
      <div className="absolute -top-2 -left-2 size-4 rounded-full border border-border/50 bg-border/50" />
      <div className="absolute -bottom-2 -right-2 size-4 rounded-full border border-border/50 bg-border/50" />

      <div className="absolute -bottom-2 -left-2 flex size-20 flex-col items-center justify-center gap-1 text-center">
        <div className="font-mono italic text-[8px] uppercase tracking-[0.15em] text-muted-foreground">
          {title}
        </div>
      </div>

      <div className="absolute -top-2 -left-2 size-8 rounded-full border border-border/50 bg-border/50" />
      <div className="absolute -bottom-2 -right-2 size-8 rounded-full border border-border/50 bg-border/50" />
    </div>
  );
}