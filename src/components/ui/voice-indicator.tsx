"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface VoiceIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  speaking?: boolean;
  muted?: boolean;
  level?: number;
}

/** Voice indicator: speaking bars with mute state. */
export function VoiceIndicator({ name = "ADA", speaking = true, muted = false, level = 0.7, className, ...props }: VoiceIndicatorProps) {
  return (
    <div
      role="status"
      aria-label={muted ? `${name} muted` : speaking ? `${name} speaking` : `${name} silent`}
      className={cn("flex min-h-11 touch-none select-none items-center gap-2.5 rounded-md border border-border bg-card px-2.5 py-1.5", className)}
      style={{ touchAction: "none" }}
      {...props}
    >
      <style>{`@keyframes voiceBar { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }`}</style>
      <span className="flex h-6 items-end gap-0.5" aria-hidden="true">
        {[0.5, 0.9, 0.65, 1, 0.55].map((h, i) => (
          <span
            key={i}
            className={cn("w-1 origin-bottom rounded-full motion-reduce:animate-none", muted ? "bg-muted-foreground" : speaking ? "bg-emerald-500 animate-[voiceBar_0.7s_ease-in-out_infinite]" : "bg-secondary")}
            style={{ height: `${Math.round(h * level * 24)}px`, animationDelay: `${i * 90}ms` }}
          />
        ))}
      </span>
      <span className="font-mono text-xs font-bold uppercase text-foreground">{name}</span>
      <span className={cn("ml-auto rounded px-1.5 py-0.5 font-mono text-[10px] font-black", muted ? "bg-destructive text-destructive-foreground" : "bg-secondary text-muted-foreground")}>
        {muted ? "MUTED" : "LIVE"}
      </span>
    </div>
  );
}
