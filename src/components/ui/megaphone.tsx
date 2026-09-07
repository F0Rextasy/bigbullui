"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MegaphoneProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  onAnnounce?: () => void;
}

/** Megaphone banner: broadcast message + animated soundwaves. */
export function Megaphone({ message, onAnnounce, className, ...props }: MegaphoneProps) {
  const [announcing, setAnnouncing] = React.useState(false);

  const announce = () => {
    setAnnouncing(true);
    onAnnounce?.();
    setTimeout(() => setAnnouncing(false), 2000);
  };

  return (
    <div className={cn("flex w-full max-w-sm items-center gap-3 rounded-lg border border-accent/40 bg-accent/5 p-4", className)} {...props}>
      <style>{`@keyframes mgWave { 0%, 100% { transform: scaleY(1); opacity: 0.4; } 50% { transform: scaleY(1.6); opacity: 1; } }`}</style>
      <span className="shrink-0" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-7"><path d="M3.5 10.8v3.2L7 14.6v-4.4L3.5 10.8z" /><path d="M7 10.2L18 5.8v12.4L7 13.8v-3.6z" /><path d="M18.5 9.4a3.6 3.6 0 0 1 0 5.2M9 14.2l1.4 4.6" /></svg></span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{message}</p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {announcing ? "Broadcasting…" : "Announcement"}
        </p>
      </div>
      {/* Audio waveforms */}
      <span className="flex shrink-0 items-center gap-0.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("w-0.5 rounded-full bg-accent", announcing ? "h-3" : "h-1.5")}
            style={announcing ? { animation: "mgWave 0.6s ease-in-out infinite", animationDelay: `${i * 120}ms` } : undefined}
          />
        ))}
      </span>
      <button
        onClick={announce}
        className="shrink-0 rounded-md bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-accent-foreground transition-all duration-150 hover:bg-accent/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
      >
        Broadcast
      </button>
    </div>
  );
}
