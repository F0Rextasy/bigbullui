"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface QuickAction {
  id: string;
  label: string;
  shortcut?: string;
  onSelect?: () => void;
  danger?: boolean;
}

export interface QuickActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: QuickAction[];
}

/** Quick action toolbar: keyboard shortcuts + danger variants. */
export function QuickActions({ actions, className, ...props }: QuickActionsProps) {
  const [flash, setFlash] = React.useState<string | null>(null);

  return (
    <div className={cn("inline-flex divide-x divide-border/60 overflow-hidden rounded-md border border-border bg-card", className)} role="toolbar" aria-label="Quick actions" {...props}>
      <style>{`@keyframes qaFlash { from { background-color: var(--accent); } to { background-color: transparent; } }`}</style>
      {actions.map((a, idx) => (
        <button
          key={a.id}
          onClick={() => { a.onSelect?.(); setFlash(a.id); setTimeout(() => setFlash(null), 350); }}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors motion-reduce:transition-none",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring-inset",
            a.danger ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            flash === a.id && "animate-[qaFlash_0.35s_ease-out] motion-reduce:animate-none"
          )}
          style={{ animationDelay: undefined }}
        >
          {a.label}
          {a.shortcut && <span className="rounded-sm border border-border px-1 text-[8px] opacity-60">{a.shortcut}</span>}
        </button>
      ))}
    </div>
  );
}
