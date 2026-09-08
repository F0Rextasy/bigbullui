"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ScorePopupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label?: string;
  tone?: "default" | "accent" | "success";
}

/** Score popup: floating points burst that rises and fades. */
export function ScorePopup({ value, label = "PTS", tone = "accent", className, ...props }: ScorePopupProps) {
  const tones: Record<string, string> = {
    default: "text-foreground border-foreground",
    accent: "text-accent border-accent",
    success: "text-success border-success",
  };
  return (
    <div
      role="status"
      aria-label={`Plus ${value} ${label}`}
      className={cn("inline-flex min-h-11 touch-none select-none items-center gap-1.5 rounded-md border-2 border-dashed bg-card px-3 py-2", tones[tone], className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      <style>{`@keyframes scoreUp { 0% { transform: translateY(6px); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(-6px); opacity: 1; } }`}</style>
      <span className="animate-[scoreUp_0.6s_ease-out] font-mono text-lg font-black tabular-nums motion-reduce:animate-none" aria-hidden="true">
        +{value}
      </span>
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
