"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ChatMessage {
  id: string;
  author: string;
  initials: string;
  body: string;
  time?: string;
  direction: "incoming" | "outgoing";
}

export interface ChatWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  messages?: ChatMessage[];
  onSend?: (body: string) => void;
  typing?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

function LocalBubble({
  direction,
  className,
  children,
}: {
  direction: "incoming" | "outgoing";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg px-3 py-2 text-sm shadow-2xs animate-[fade-in-up_0.25s_ease-out_both] motion-reduce:animate-none",
        direction === "outgoing" ? "rounded-ee-xs" : "rounded-es-xs",
        className,
      )}
    >
      {children}
    </div>
  );
}

function LocalTyping() {
  return (
    <div className="flex gap-1 px-3 py-2" aria-label="Someone is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 rounded-full bg-muted-foreground animate-[loadingDotsBounce_1.2s_ease-in-out_infinite] motion-reduce:animate-none"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </div>
  );
}

export const ChatWindow = React.forwardRef<HTMLDivElement, ChatWindowProps>(function ChatWindow(
  {
    messages = [],
    onSend,
    typing = false,
    autoFocus = false,
    placeholder = "Message...",
    className,
    ...props
  },
  ref,
) {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setInput("");
  };

  return (
    <div
      ref={ref}
      className={cn("w-full max-w-lg overflow-hidden rounded-lg border border-border bg-card", className)}
      {...props}
    >
      <div
        className="h-56 space-y-2 overflow-y-auto p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        tabIndex={0}
        role="region"
        aria-label="Chat messages"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn("flex", msg.direction === "outgoing" ? "justify-end" : "justify-start")}
          >
            <LocalBubble
              className={cn(
                "max-w-[80%]",
                msg.direction === "outgoing"
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-background text-foreground",
              )}
              direction={msg.direction}
            >
              <p>{msg.body}</p>
              <div
                className={cn(
                  "mt-0.5 font-mono text-[10px] uppercase",
                  msg.direction === "outgoing" ? "text-accent-foreground/80" : "text-muted-foreground",
                )}
              >
                {msg.initials}
                {msg.time ? ` · ${msg.time}` : ""}
              </div>
            </LocalBubble>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <LocalTyping />
          </div>
        )}
      </div>

      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={placeholder}
            aria-label="Message input"
            className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            autoFocus={autoFocus}
          />
          <button
            type="button"
            onClick={handleSend}
            className="shrink-0 rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40"
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
});
ChatWindow.displayName = "ChatWindow";
