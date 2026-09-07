"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InstallPromptProps extends React.HTMLAttributes<HTMLDivElement> {
  onInstall?: () => void;
  onDismiss?: () => void;
}

/** Install prompt stub: stub-framed PWA install banner. */
export function InstallPrompt({ onInstall, onDismiss, className, ...props }: InstallPromptProps) {
  const [hidden, setHidden] = React.useState(false);
  if (hidden) return null;
  return (
    <div className={cn("flex w-full max-w-md flex-wrap items-center gap-2 rounded-lg border-2 border-foreground bg-card p-3 shadow-sm outline-1 outline-dashed outline-offset-[-5px] outline-border/60", className)} role="dialog" aria-label="Install app" {...props}>
      <span className="flex size-8 items-center justify-center rounded border border-dashed border-accent font-mono text-sm font-bold text-accent" aria-hidden="true">◈</span>
      <p className="min-w-0 flex-1 font-mono text-[11px] uppercase tracking-wide text-foreground">Install box office stub app</p>
      <button type="button" onClick={() => { onInstall?.(); setHidden(true); }} className="rounded-md bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Install</button>
      <button type="button" onClick={() => { onDismiss?.(); setHidden(true); }} className="rounded px-1.5 py-1 font-mono text-[10px] uppercase text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Later</button>
    </div>
  );
}
