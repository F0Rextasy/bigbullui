"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ChatStatus {
  sent?: boolean;
  delivered?: boolean;
  read?: boolean;
}

export interface ChatBubbleProps {
  direction: "incoming" | "outgoing";
  children: React.ReactNode;
  status?: ChatStatus;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ direction, children, status }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <div
      className={cn(
        "flex flex-col gap-1 relative min-w-[40px]",
        direction === "outgoing"
          ? "items-end"
          : "items-start"
      )}
    >
      {children}
      {status && (
        <div
          className={cn(
            "absolute -bottom-1 -left-1 flex gap-0.5 text-[10px] mono uppercase text-muted-foreground",
            direction === "outgoing" ? "-right-1" : "-left-1"
          )}
        >
          {[status.sent && "S", status.delivered && "D", status.read && "R"]
            .filter(Boolean)
            .join(" ")}
        </div>
      )}

      {/* Tail triangle for incoming, rotated square for outgoing */}
      {direction === "incoming" ? (
        <div
          className={cn(
            "absolute -inset-0.5 pointer-events-none",
            "mx-auto w-0 border-2 border-transparent border-border/50"
          )}
        >
          <div
            className={cn(
              "mx-auto w-0 border-2 border-border/60",
              "border-t-transparent border-b-2"
            )}
          />
        </div>
      ) : (
        <div
          className={cn(
            "absolute -inset-0.5 pointer-events-none rotate-6",
            "w-0 h-0 border-2 border-transparent border-border/50"
          )}
        >
          <div
            className={cn(
              "w-0 h-0 border-2 border-border/60",
              "border-t-transparent border-b-2 rotate-6"
            )}
          />
        </div>
      )}

      {/* Press feedback */}
      <div
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={cn(
          "transition-transform duration-150",
          isPressed ? "scale-[0.96]" : ""
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { ChatBubble };