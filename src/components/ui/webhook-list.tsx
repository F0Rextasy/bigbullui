"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  active?: boolean;
}

export interface WebhookListProps extends React.HTMLAttributes<HTMLDivElement> {
  webhooks: Webhook[];
  onTest?: (id: string) => void;
  onRemove?: (id: string) => void;
}

/** Webhook listesi: URL + olay rozetleri + durum + test/kaldır. */
export function WebhookList({ webhooks, onTest, onRemove, className, ...props }: WebhookListProps) {
  const [tested, setTested] = React.useState<string | null>(null);

  return (
    <div className={cn("w-full max-w-lg space-y-2", className)} {...props}>
      <style>{`@keyframes whIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {webhooks.map((w, idx) => (
        <div
          key={w.id}
          className="rounded-md border border-border bg-card p-3 animate-[whIn_0.3s_ease-out_both] motion-reduce:animate-none transition-colors hover:border-foreground/30 motion-reduce:transition-none"
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          <div className="flex items-center gap-2">
            <span className={cn("size-1.5 shrink-0 rounded-full", w.active ? "bg-emerald-500 animate-pulse motion-reduce:animate-none" : "bg-border")} aria-hidden="true" />
            <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">{w.url}</code>
            <button
              onClick={() => { onTest?.(w.id); setTested(w.id); setTimeout(() => setTested(null), 1500); }}
              className="shrink-0 rounded-sm border border-dashed border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
            >
              {tested === w.id ? "✓ 200" : "TEST"}
            </button>
            <button
              onClick={() => onRemove?.(w.id)}
              className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              aria-label={`${w.url} webhookunu kaldır`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {w.events.map((ev) => (
              <span key={ev} className="rounded-full border border-border bg-secondary px-1.5 py-px font-mono text-[9px] text-secondary-foreground">{ev}</span>
            ))}
          </div>
        </div>
      ))}
      {webhooks.length === 0 && (
        <p className="rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground">Henüz webhook yok.</p>
      )}
    </div>
  );
}
