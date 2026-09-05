"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DangerZoneProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  actions: { id: string; label: string; description?: string; onConfirm?: () => void }[];
}

/** Danger zone with red border: two-step confirmation. */
export function DangerZone({ title = "Danger Zone", actions, className, ...props }: DangerZoneProps) {
  const [confirming, setConfirming] = React.useState<string | null>(null);

  return (
    <div className={cn("w-full max-w-md rounded-lg border-2 border-destructive/40 p-4", className)} {...props}>
      <style>{`@keyframes dzIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-destructive">{title}</h3>
      <ul className="mt-3 space-y-2.5">
        {actions.map((a, idx) => (
          <li key={a.id} className="flex items-center justify-between gap-3 animate-[dzIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 60}ms` }}>
            <div className="min-w-0">
              <p className="text-sm font-medium">{a.label}</p>
              {a.description && <p className="text-xs text-muted-foreground">{a.description}</p>}
            </div>
            {confirming === a.id ? (
              <span className="flex shrink-0 gap-1.5">
                <button onClick={() => setConfirming(null)} className="rounded-md border border-border px-2 py-1 font-mono text-[9px] uppercase text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none">Cancel</button>
                <button onClick={() => { a.onConfirm?.(); setConfirming(null); }} className="rounded-md bg-destructive px-2 py-1 font-mono text-[9px] uppercase text-white transition-all duration-150 hover:bg-destructive/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive motion-reduce:transition-none">Onayla</button>
              </span>
            ) : (
              <button
                onClick={() => setConfirming(a.id)}
                className="shrink-0 rounded-md border border-destructive/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-destructive transition-colors hover:bg-destructive hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive motion-reduce:transition-none"
              >
                {a.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
