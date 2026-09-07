"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AudioToggleProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, "onToggle"> {
  defaultMuted?: boolean;
  muted?: boolean;
  label?: string;
  onToggle?: (muted: boolean) => void;
}

/** Speaker mute toggle stub with pressed state and mono status label. */
export function AudioToggle({
  defaultMuted = false,
  muted,
  label = "Gate audio",
  onToggle,
  className,
  ...props
}: AudioToggleProps) {
  const [inner, setInner] = React.useState(defaultMuted);
  const isMuted = muted ?? inner;
  const flip = () => {
    const next = !isMuted;
    setInner(next);
    onToggle?.(next);
  };
  return (
    <button
      type="button"
      onClick={flip}
      aria-pressed={!isMuted}
      aria-label={isMuted ? `Unmute ${label}` : `Mute ${label}`}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded border-2 px-2.5 py-1.5 transition-transform hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isMuted ? "border-dashed border-border bg-card text-muted-foreground" : "border-foreground bg-primary text-primary-foreground",
        className,
      )}
      {...props}
    >
      <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5z" strokeLinejoin="round" />
        {isMuted ? (
          <path d="m16 9 5 6M21 9l-5 6" strokeLinecap="round" />
        ) : (
          <path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" strokeLinecap="round" />
        )}
      </svg>
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
        {isMuted ? "Muted" : label}
      </span>
    </button>
  );
}
