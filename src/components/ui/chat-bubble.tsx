"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ChatStatus {
  sent?: boolean;
  delivered?: boolean;
  read?: boolean;
}

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "incoming" | "outgoing";
  children?: React.ReactNode;
  status?: ChatStatus;
}

export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(function ChatBubble(
  { direction = "incoming", children, status, className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1",
        direction === "outgoing" ? "items-end" : "items-start",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative max-w-sm rounded-lg border px-3 py-2 text-sm shadow-2xs transition-transform duration-150 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100",
          direction === "outgoing"
            ? "rounded-ee-xs border-accent/40 bg-accent text-accent-foreground"
            : "rounded-es-xs border-border bg-card text-card-foreground",
        )}
      >
        {children}
      </div>

      {status && (
        <span className="flex items-center gap-1 px-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {[status.sent && "Sent", status.delivered && "Delivered", status.read && "Read"]
            .filter(Boolean)
            .join(" · ")}
        </span>
      )}
    </div>
  );
});
ChatBubble.displayName = "ChatBubble";
