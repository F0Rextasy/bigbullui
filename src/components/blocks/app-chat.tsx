"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";

const THREADS = [
  { id: "c1", name: "Stage Crew", last: "Truss is up, lights at 80%", time: "09:12", unread: 3 },
  { id: "c2", name: "Gate Team", last: "Scanner 4 needs a reboot", time: "08:47", unread: 1 },
  { id: "c3", name: "Vendors", last: "Ice delivery confirmed", time: "YESTERDAY", unread: 0 },
];

const MESSAGES = [
  { id: "m1", who: "Mira Chen", body: "Truss is up, lights at 80 percent.", mine: false, time: "09:10" },
  { id: "m2", who: "You", body: "Copy that. Doors still 19:30 sharp.", mine: true, time: "09:11" },
  { id: "m3", who: "Mira Chen", body: "Sending the cue sheet now.", mine: false, time: "09:12" },
];

export function AppChat() {
  const [active, setActive] = React.useState("c1");
  const [draft, setDraft] = React.useState("");
  const current = THREADS.find((thread) => thread.id === active) ?? THREADS[0];
  return (
    <div className="grid w-full overflow-hidden rounded-lg border-2 border-foreground bg-card md:grid-cols-3">
      <div className="divide-y divide-dashed divide-border border-b border-dashed border-border md:border-b-0 md:border-r">
        <p className="px-4 py-3 font-mono text-xs font-black uppercase tracking-[0.2em]">Channels</p>
        {THREADS.map((thread) => (
          <button
            key={thread.id}
            type="button"
            onClick={() => setActive(thread.id)}
            className={`flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${active === thread.id ? "bg-secondary/60" : ""}`}
          >
            <Avatar name={thread.name} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-black uppercase">{thread.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{thread.time}</span>
              </span>
              <span className="block truncate text-xs text-muted-foreground">{thread.last}</span>
            </span>
            {thread.unread > 0 && <Badge variant="accent">{thread.unread}</Badge>}
          </button>
        ))}
      </div>
      <div className="flex min-h-96 flex-col md:col-span-2">
        <div className="flex items-center justify-between border-b-2 border-dashed border-border px-4 py-3">
          <p className="font-mono text-xs font-black uppercase tracking-[0.2em]">{current?.name}</p>
          <Badge variant="outline">ONLINE</Badge>
        </div>
        <div className="flex-1 space-y-3 p-4">
          {MESSAGES.map((message) => (
            <div key={message.id} className={`flex ${message.mine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-lg border px-3 py-2 ${message.mine ? "border-foreground bg-primary text-primary-foreground" : "border-dashed border-border bg-secondary/50"}`}>
                {!message.mine && <p className="font-mono text-[10px] font-black uppercase tracking-widest opacity-70">{message.who}</p>}
                <p className="text-sm">{message.body}</p>
                <p className="mt-1 text-right font-mono text-[10px] opacity-60">{message.time}</p>
              </div>
            </div>
          ))}
        </div>
        <form
          className="flex gap-2 border-t-2 border-dashed border-border p-3"
          onSubmit={(event) => {
            event.preventDefault();
            setDraft("");
          }}
        >
          <Input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Type a message..." aria-label="Type a message" />
          <Button type="submit" size="sm">Send</Button>
        </form>
      </div>
    </div>
  );
}
