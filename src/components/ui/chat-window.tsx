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

export interface ChatWindowProps {
  messages?: ChatMessage[];
  onSend?: (body: string) => void;
  typing?: boolean;
}

type LocalBubbleProps = { direction: "incoming" | "outgoing"; className?: string; children: React.ReactNode };

function LocalBubble({ direction, className, children }: LocalBubbleProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg px-3 py-2 text-sm shadow-xs animate-[fade-in-up_0.25s_ease-out_both] motion-reduce:animate-none",
        direction === "outgoing" ? "rounded-br-sm" : "rounded-bl-sm",
        className
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

const ChatWindow: React.FC<ChatWindowProps> = ({ messages = [], onSend, typing }) => {
  const [input, setInput] = React.useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed && onSend) {
      onSend(trimmed);
      setInput("");
    }
  };

  return (
    <div className="space-y-1 max-w-lg">
      <div className="space-y-2 p-4 h-48 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.direction === "outgoing"
                ? "justify-end"
                : "justify-start"
            )}
          >
            <LocalBubble
              className={cn(
                "max-w-[80%]",
                msg.direction === "outgoing"
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-foreground"
              )}
              direction={msg.direction}
            >
              <>{msg.body}</>
              <div className="text-[10px] mono uppercase text-muted-foreground">
                {msg.initials} · {msg.time || ""}
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

      <div className="p-4 border-t border-border">
        <div className="flex items-gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
            className="flex-1 rounded-border border-input px-3 py-2 text-sm"
            autoFocus
          />
          <button
            onClick={handleSend}
            className="bg-accent text-accent-foreground px-3 rounded-md hover:bg-accent/90"
            disabled={!input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export { ChatWindow };