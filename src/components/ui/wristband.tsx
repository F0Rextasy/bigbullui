"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WristbandProps {
  text: string;
  variant?: "general" | "vip" | "media";
}

export function Wristband({ text, variant = "general" }: WristbandProps) {
  const variantClasses = {
    general: "bg-secondary text-secondary-foreground",
    vip: "bg-accent text-accent-foreground",
    media: "bg-destructive text-destructive-foreground",
  };

  return (
    <div
      className={cn(
        "relative size-40 rounded-full border-2 border-border/50 bg-[var(--band-color)] p-2 text-center motion-reduce:animate-none motion-reduce:transition-none",
        variantClasses[variant],
        "group"
      )}
    >
      <div className="font-mono text-[9px] uppercase tracking-[0.15em]">
        {text}
      </div>
    </div>
  );
}