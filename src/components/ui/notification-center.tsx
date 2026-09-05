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
  notifications: Notification[];
};

function getDelay(index: number): string {
  return `${index * 40}ms`;
}

export function NotificationCenter({ notifications }: NotificationCenterProps) {
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(-1);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      else if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocused((f) => Math.min(f + 1, notifications.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocused((f) => Math.max(f - 1, -1));
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          "relative w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "motion-reduce:animate-none",
          "motion-reduce:transition-none",
        )}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
        aria-label="Notifications"
        role="button"
        tabIndex={0}
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h12a5 5 0 0 0 5-5 5 5 0 0 0-5-5z"></path>
          <path d="M13.73 21a2 2 0 0 0 2.83 0"></path>
        </svg>
        {unreadCount > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive flex items-center justify-center text-xs font-bold",
              "motion-reduce:animate-none",
            )}
          >
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div
          className={cn(
            "absolute left-0 right-0 bottom-full mt-2 w-80 rounded-md bg-card border border-border p-6 shadow-lg z-50",
            "motion-reduce:animate-none",
            "motion-reduce:transition-none",
          )}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={cn("text-lg font-semibold tracking-tight", "motion-reduce:animate-none")}>
              Notification Center
            </h3>
            <button
              onClick={() => setOpen(false)}
              className={cn("text-sm text-muted-foreground hover:underline", "motion-redule:animate-none")}
            >
              Close
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className={cn("text-sm text-muted-foreground", "motion-reduce:animate-none")}>
              No notifications
            </p>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {notifications.map((notif, i) => {
                const isUnread = notif.unread;
                const delay = getDelay(i);

                return (
                  <div
                    key={notif.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-md",
                      isUnread ? "bg-accent/5 text-accent-foreground" : "bg-muted",
                      "motion-reduce:animate-none",
                      "motion-reduce:transition-none",
                    )}
                    style={{ animationName: "fadeIn", animationDuration: "200ms", animationDelay: delay, animationFillMode: "forwards" }}
                  >
                    <div className={cn("w-3 h-3 rounded-full", isUnread ? "bg-destructive" : "bg-muted-foreground", "mr-3")}> </div>
                    <div className="flex-1 min-w-0">
                      <p className={cn("font-medium", "motion-reduce:animate-none")}>
                        {notif.title}
                      </p>
                      {notif.body && (
                        <p className={cn("text-xs text-muted-foreground/80", "motion-reduce:animate-none")}>
                          {notif.body}
                        </p>
                      )}
                    </div>
                    <p className={cn("text-xs text-muted-foreground/60", "motion-reduce:animate-none")}>
                      {notif.time || "Just now"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          <div className={cn("mt-6 pt-6 border-t border-border", "motion-reduce:animate-none")}>
            <button
              onClick={() => {}}
              className={cn("text-sm text-primary hover:underline", "motion-reduce:transition-none", "motion-reduce:animate-none")}
            >
              Mark all read
            </button>
          </div>
        </div>
      )}
    </div>
  );
}