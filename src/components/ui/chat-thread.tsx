"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface ChatThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  messages?: ChatMessage[];
  title?: string;
}

const FALLBACK: ChatMessage[] = [
  { id: "1", role: "user", text: "Print two VIP stubs for Saturday." },
  { id: "2", role: "assistant", text: "Reserved Row C Seats 12 and 13. Barcode ink is drying." },
  { id: "3", role: "user", text: "Add a backstage pass." },
];

/** Vertical chat thread with dashed stem and role stamps. */
export function ChatThread({ messages = FALLBACK, title = "Box office thread", className, ...props }: ChatThreadProps) {
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="border-b border-dashed border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
      <ol className="mt-3 space-y-3 border-l-2 border-dashed border-border ps-4">
        {messages.map((m) => (
          <li key={m.id} className="flex flex-col gap-1">
            <span className={cn("w-fit rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase", m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground")}>
              {m.role}
            </span>
            <p className="rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm text-foreground">{m.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
