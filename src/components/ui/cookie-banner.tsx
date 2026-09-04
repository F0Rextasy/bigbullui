"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CookieBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
}

export function CookieBanner({
  title = "PRIVACY & ADMISSION COOKIES",
  description = "We use minimal session cookies to remember your ticket stub and theme preferences.",
  onAccept,
  onDecline,
  className,
  ...props
}: CookieBannerProps) {
  const [open, setOpen] = React.useState(true);

  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl rounded-lg border-[1.5px] border-foreground bg-card p-5 shadow-xl outline-1 outline-dashed outline-offset-[-6px] animate-[fade-in-up_0.25s_ease-out]",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              NOTICE
            </span>
            <span className="font-mono text-xs font-bold text-foreground">{title}</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed font-mono">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDecline?.();
            }}
            className="rounded-sm border border-border bg-transparent px-3 py-1.5 font-mono text-xs text-muted-foreground hover:bg-secondary hover:text-foreground cursor-pointer transition-colors"
          >
            DECLINE
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onAccept?.();
            }}
            className="rounded-sm bg-primary px-3 py-1.5 font-mono text-xs font-bold text-primary-foreground hover:bg-primary/90 cursor-pointer transition-colors shadow-xs"
          >
            ADMIT ALL
          </button>
        </div>
      </div>
    </div>
  );
}
