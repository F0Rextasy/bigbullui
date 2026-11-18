"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type Notification = {
  id: string;
  title: string;
  body?: string;
  time?: string;
  unread?: boolean;
};

export type NotificationCenterProps = {
  notifications?: Notification[];
  onMarkAllRead?: () => void;
};

function getDelay(index: number): string {
  return `${index * 40}ms`;
}

export function NotificationCenter({ notifications = [], onMarkAllRead }: NotificationCenterProps) {
  const [open, setOpen] = React.useState(false);
  const [readIds, setReadIds] = React.useState<Set<string>>(() => new Set());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handleOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [open]);

  const unreadCount = notifications.filter((n) => n.unread && !readIds.has(n.id)).length;

  const markAllRead = () => {
    setReadIds(new Set(notifications.map((n) => n.id)));
    onMarkAllRead?.();
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        className={cn(
          "relative w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "motion-reduce:animate-none",
          "motion-reduce:transition-none",
        )}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={`Notifications (${unreadCount} unread)`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h12a5 5 0 0 0 5-5 5 5 0 0 0-5-5z"></path>
          <path d="M13.73 21a2 2 0 0 0 2.83 0"></path>
        </svg>
        {unreadCount > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-white flex items-center justify-center text-xs font-bold",
              "motion-reduce:animate-none",
            )}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className={cn(
            "absolute right-0 top-full mt-2 w-80 rounded-md bg-card border border-border p-6 shadow-lg z-50",
            "motion-reduce:animate-none",
            "motion-reduce:transition-none",
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={cn("text-base font-semibold tracking-tight text-foreground", "motion-reduce:animate-none")}>
              Notification Center
            </h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={cn("text-sm text-muted-foreground hover:underline cursor-pointer", "motion-reduce:animate-none")}
            >
              Close
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className={cn("text-sm text-muted-foreground", "motion-reduce:animate-none")}>
              No notifications
            </p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {notifications.map((notif, i) => {
                const isUnread = Boolean(notif.unread) && !readIds.has(notif.id);
                const delay = getDelay(i);

                return (
                  <div
                    key={notif.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-md border",
                      isUnread ? "border-accent/30 bg-accent/10 text-foreground" : "border-transparent bg-muted text-foreground",
                      "motion-reduce:animate-none!",
                      "motion-reduce:transition-none",
                    )}
                    style={{ animationName: "fadeIn", animationDuration: "200ms", animationDelay: delay, animationFillMode: "forwards" }}
                  >
                    <div className={cn("mt-1.5 w-2.5 h-2.5 shrink-0 rounded-full", isUnread ? "bg-accent" : "bg-muted-foreground")} aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <p className={cn("text-sm font-medium text-foreground", "motion-reduce:animate-none")}>
                        {notif.title}
                      </p>
                      {notif.body && (
                        <p className={cn("text-xs text-muted-foreground", "motion-reduce:animate-none")}>
                          {notif.body}
                        </p>
                      )}
                    </div>
                    <p className={cn("text-xs text-muted-foreground shrink-0", "motion-reduce:animate-none")}>
                      {notif.time || "Just now"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <div className={cn("mt-4 pt-4 border-t border-border", "motion-reduce:animate-none")}>
            <button
              type="button"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className={cn("text-sm text-accent-strong hover:underline cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed", "motion-reduce:transition-none", "motion-reduce:animate-none")}
            >
              Mark all read
            </button>
          </div>
        </div>
      )}
    </div>
  );
}