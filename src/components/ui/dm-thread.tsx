"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DmThreadMessage {
  id: string;
  body: string;
  mine?: boolean;
  time: string;
}

export interface DmThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  initials?: string;
  online?: boolean;
  messages?: DmThreadMessage[];
  onSend?: (body: string) => void;
  onInfoClick?: () => void;
}

/** Direct message thread: header + status + action toolbar. */
export const DmThread = React.forwardRef<HTMLDivElement, DmThreadProps>(function DmThread(
  {
    name = "",
    initials = "",
    online = false,
    messages = [],
    onSend,
    onInfoClick,
    className,
    ...props
  },
  ref,
) {
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages.length]);

  const send = () => {
    if (!input.trim()) return;
    onSend?.(input.trim());
    setInput("");
  };

  return (
    <div
      ref={ref}
      className={cn("flex w-full max-w-md flex-col overflow-hidden rounded-lg border border-border bg-card", className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-2.5">
        <span className="relative">
          <span className="flex size-9 items-center justify-center rounded-full border border-dashed border-border bg-secondary font-mono text-[10px] font-bold">
            {initials}
          </span>
          {online && (
            <span
              className="absolute -bottom-0.5 -end-0.5 size-2.5 rounded-full border-2 border-card bg-success"
              aria-label="Online"
            />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className={cn("text-[10px] uppercase tracking-wider", online ? "text-success" : "text-muted-foreground")}>
            {online ? "Online" : "Recently active"}
          </p>
        </div>
        <button
          type="button"
          onClick={onInfoClick}
          className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
          aria-label="Conversation info"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="max-h-72 flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((m, idx) => (
          <div key={m.id} className={cn("flex", m.mine ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-3 py-1.5 text-sm animate-[creditCardIn_0.25s_ease-out_both] motion-reduce:animate-none",
                m.mine ? "bg-accent text-accent-foreground" : "bg-secondary",
              )}
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              {m.body}
              <span
                className={cn(
                  "mt-0.5 block text-end font-mono text-[9px]",
                  m.mine ? "text-accent-foreground/70" : "text-muted-foreground",
                )}
              >
                {m.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 border-t border-border p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Write a message..."
          aria-label="Message"
          className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        />
        <button
          type="button"
          onClick={send}
          disabled={!input.trim()}
          className="shrink-0 rounded-md bg-accent px-3 py-1.5 text-accent-foreground transition-colors duration-150 hover:bg-accent/90 active:scale-95 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40 motion-reduce:transition-none"
          aria-label="Send message"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
});
DmThread.displayName = "DmThread";
