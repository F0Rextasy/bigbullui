"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Notification {
  id: string;
  title: string;
  body?: string;
  time: string;
  type?: "info" | "success" | "warning" | "error";
  unread?: boolean;
}

export interface NotificationFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  notifications: Notification[];
  onMarkRead?: (id: string) => void;
}

const TYPE_ICON: Record<string, { bg: string; glyph: string }> = {
  info: { bg: "bg-sky-500/15 text-sky-600", glyph: "i" },
  success: { bg: "bg-emerald-500/15 text-emerald-600", glyph: "✓" },
  warning: { bg: "bg-amber-500/15 text-amber-600", glyph: "!" },
  error: { bg: "bg-destructive/15 text-destructive", glyph: "×" },
};

/** Tam sayfa bildirim akışı: tip ikonları + okundu durumu. */
export function NotificationFeed({ notifications, onMarkRead, className, ...props }: NotificationFeedProps) {
  const [read, setRead] = React.useState<Set<string>>(new Set());

  const mark = (id: string) => {
    setRead((r) => new Set(r).add(id));
    onMarkRead?.(id);
  };

  return (
    <div className={cn("w-full max-w-md space-y-2", className)} {...props}>
      <style>{`@keyframes nfIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {notifications.map((n, idx) => {
        const t = TYPE_ICON[n.type ?? "info"];
        const isRead = read.has(n.id) || !n.unread;
        return (
          <div
            key={n.id}
            className={cn(
              "flex items-start gap-3 rounded-md border p-3 animate-[nfIn_0.3s_ease-out_both] motion-reduce:animate-none transition-colors motion-reduce:transition-none",
              isRead ? "border-border bg-card opacity-70" : "border-accent/40 bg-accent/5"
            )}
            style={{ animationDelay: `${idx * 55}ms` }}
          >
            <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold", t.bg)} aria-hidden="true">
              {t.glyph}
            </span>
            <div className="min-w-0 flex-1">
              <p className={cn("text-sm", isRead ? "text-muted-foreground" : "font-medium")}>{n.title}</p>
              {n.body && <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>}
              <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">{n.time}</p>
            </div>
            {!isRead && (
              <button
                onClick={() => mark(n.id)}
                className="shrink-0 rounded-sm border border-dashed border-border px-2 py-0.5 font-mono text-[9px] uppercase text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              >
                Okundu
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
