"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FeedbackWidgetProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  onSubmit?: (message: string, mood: "good" | "bad") => void;
  position?: "bottom-right" | "bottom-left";
}

export function FeedbackWidget({ onSubmit, position = "bottom-right", className, ...props }: FeedbackWidgetProps) {
  const [open, setOpen] = React.useState(false);
  const [mood, setMood] = React.useState<"good" | "bad" | null>(null);
  const [message, setMessage] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const send = () => {
    if (!mood) return;
    onSubmit?.(message.trim(), mood);
    setSent(true);
    setTimeout(() => {
      setOpen(false);
      setSent(false);
      setMood(null);
      setMessage("");
    }, 1400);
  };

  return (
    <div
      className={cn(
        "fixed bottom-5 z-40 flex flex-col items-end gap-2",
        position === "bottom-right" ? "right-5" : "left-5 items-start",
        className,
      )}
      {...props}
    >
      {open ? (
        <div className="w-72 overflow-hidden rounded-xl border-2 border-foreground bg-card shadow-xl">
          <div className="border-b border-dashed border-border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            Ticket feedback
          </div>
          <div className="space-y-3 p-4">
            {sent ? (
              <p className="py-4 text-center font-mono text-sm text-accent">Stamped. Thank you!</p>
            ) : (
              <>
                <div className="flex gap-2" role="group" aria-label="Mood">
                  {(["good", "bad"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={mood === m}
                      onClick={() => setMood(m)}
                      className={cn(
                        "flex-1 cursor-pointer rounded-md border px-3 py-2 text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        mood === m ? "border-accent bg-accent/10 scale-105" : "border-border hover:border-foreground/50",
                      )}
                    >
                      <span aria-hidden="true" className="flex justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn("size-5", m === "bad" && "rotate-180")}><path d="M7 11v8H4.6A1.6 1.6 0 0 1 3 17.4v-4.8A1.6 1.6 0 0 1 4.6 11H7z" /><path d="M7 11l3.1-6.6c.4-.9 1.7-.9 2 .1L13.4 9H19a1.5 1.5 0 0 1 1.5 1.8l-1.2 5.3a2 2 0 0 1-2 1.6H7" /></svg>
                      </span>
                      <span className="sr-only">{m === "good" ? "Good" : "Bad"}</span>
                    </button>
                  ))}
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="What should we stamp next?"
                  aria-label="Feedback message"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <button
                  type="button"
                  disabled={!mood}
                  onClick={send}
                  className="w-full cursor-pointer rounded-md bg-primary px-3 py-2 font-mono text-xs font-bold uppercase text-primary-foreground transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Send stub
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Send feedback"
        className="cursor-pointer rounded-full border-2 border-foreground bg-accent px-4 py-2 font-mono text-xs font-bold uppercase text-accent-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        ✎ Feedback
      </button>
    </div>
  );
}
