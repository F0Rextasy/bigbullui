"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ChatWindow } from "../ui/chat-window";
import type { ChatMessage } from "../ui/chat-window";
import { StatusDot } from "../ui/status-dot";

const SEED: ChatMessage[] = [
  { id: "m1", author: "Box office", initials: "BO", body: "Hello, this is the box office desk. How can we help?", time: "20:02", direction: "incoming" },
  { id: "m2", author: "You", initials: "YO", body: "My barcode will not scan at gate 3.", time: "20:03", direction: "outgoing" },
  { id: "m3", author: "Box office", initials: "BO", body: "We reissued stub BB-90215. Show the new code at the gate.", time: "20:04", direction: "incoming" },
];

export function BlockLiveChat() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(SEED);
  const [typing, setTyping] = React.useState(false);

  const handleSend = (body: string) => {
    const outgoing: ChatMessage = { id: `m-${Date.now()}`, author: "You", initials: "YO", body, time: "NOW", direction: "outgoing" };
    setMessages((prev) => [...prev, outgoing]);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: `m-${Date.now()}-r`, author: "Box office", initials: "BO", body: "Noted. An agent joins this thread in a moment.", time: "NOW", direction: "incoming" },
      ]);
    }, 1200);
  };

  return (
    <div className="relative mx-auto w-full max-w-md rounded-lg border border-border bg-card p-4 shadow-md outline-1 outline-dashed outline-offset-[-7px] outline-border">
      <div className="mb-3 flex items-center gap-3">
        <StatusDot level="low" size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-xs font-bold uppercase tracking-wider">Box office chat</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Agents online</p>
        </div>
        <Badge variant="accent">LIVE</Badge>
        <Button size="sm" variant="outline">End</Button>
      </div>
      <ChatWindow messages={messages} onSend={handleSend} typing={typing} />
    </div>
  );
}
