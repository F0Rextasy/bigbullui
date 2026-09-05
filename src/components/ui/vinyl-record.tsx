"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VinylRecordProps {
  label?: React.ReactNode;
  playing?: boolean;
  onToggle?: () => void;
}

export function VinylRecord({ label, playing = false, onToggle }: VinylRecordProps) {
  return (
    <div
      className={cn(
        "relative size-32 rounded-full border border-border bg-card p-4 motion-reduce:transition-none",
        "group"
      )}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-border/20 via-border/30 to-border/20" />

      <div className="absolute inset-0 flex items-center justify-center">
        {label || <div className="size-8 rounded-md border border-border/50 bg-border/50" />}
      </div>

      <div className="absolute -right-2 top-1/2 -translate-y-1/2 size-6 border-2 border-border/50" />
    </div>
  );
}