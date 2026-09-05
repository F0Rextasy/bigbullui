"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FeatureFlag {
  id: string;
  label: string;
  enabled: boolean;
  /** kademeli dağıtım yüzdesi */
  rollout?: number;
}

export interface FeatureFlagPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  flags: FeatureFlag[];
  onToggle?: (id: string, enabled: boolean) => void;
}

/** Özellik anahtarı panosu: aç/kapa + yüzde dağıtımı. */
export function FeatureFlagPanel({ flags, onToggle, className, ...props }: FeatureFlagPanelProps) {
  const [state, setState] = React.useState(flags);

  const toggle = (id: string) => {
    const next = state.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f));
    setState(next);
    const changed = next.find((f) => f.id === id);
    if (changed) onToggle?.(changed.id, changed.enabled);
  };

  return (
    <div className={cn("w-full max-w-md divide-y divide-border/60 rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes ffSlide { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }`}</style>
      {state.map((f, idx) => (
        <div key={f.id} className="flex items-center gap-3 px-4 py-3 animate-[ffSlide_0.25s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 50}ms` }}>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{f.label}</p>
            {f.rollout !== undefined && (
              <div className="mt-1 flex items-center gap-2">
                <div className="h-1 w-20 overflow-hidden rounded-full bg-border/60">
                  <div className="h-full rounded-full bg-accent transition-all duration-500 motion-reduce:transition-none" style={{ width: `${f.rollout}%` }} />
                </div>
                <span className="font-mono text-[9px] tabular-nums text-muted-foreground">%{f.rollout} dağıtımda</span>
              </div>
            )}
          </div>
          <button
            role="switch"
            aria-checked={f.enabled}
            aria-label={f.label}
            onClick={() => toggle(f.id)}
            className={cn(
              "relative h-5 w-9 shrink-0 rounded-full border transition-colors duration-200 motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              f.enabled ? "border-accent bg-accent" : "border-border bg-secondary"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 size-3.5 rounded-full bg-background shadow-xs transition-all duration-200 motion-reduce:transition-none",
                f.enabled ? "left-[18px]" : "left-0.5"
              )}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
