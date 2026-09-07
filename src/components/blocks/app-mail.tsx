"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/separator";

const FOLDERS = ["INBOX", "STARRED", "SENT", "DRAFTS", "SPAM"];
const MESSAGES = [
  { id: "m1", from: "Box Office", subject: "Your VIP stubs are ready", preview: "Present this pass at Gate 3 for instant entry.", time: "09:41", unread: true },
  { id: "m2", from: "Stage Crew", subject: "Soundcheck moved to 18:30", preview: "Doors still open at 19:30 sharp.", time: "08:15", unread: true },
  { id: "m3", from: "Support Desk", subject: "Refund BB-90213 confirmed", preview: "Funds return within 5 business days.", time: "YESTERDAY", unread: false },
];

export function AppMail() {
  const [active, setActive] = React.useState("m1");
  const current = MESSAGES.find((message) => message.id === active) ?? MESSAGES[0];
  return (
    <div className="w-full overflow-hidden rounded-lg border-2 border-foreground bg-card">
      <div className="flex items-center justify-between border-b-2 border-dashed border-border px-4 py-3">
        <p className="font-mono text-xs font-black uppercase tracking-[0.2em]">Mail stub // Inbox</p>
        <Badge variant="accent">2 UNREAD</Badge>
      </div>
      <div className="grid md:grid-cols-4">
        <div className="space-y-1 border-b border-dashed border-border p-3 md:border-b-0 md:border-r">
          <Input placeholder="Search mail..." aria-label="Search mail" className="mb-2" />
          {FOLDERS.map((folder) => (
            <button
              key={folder}
              type="button"
              onClick={() => setActive(MESSAGES[0]?.id ?? "m1")}
              className="flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {folder}
              {folder === "INBOX" && <Badge variant="accent">2</Badge>}
            </button>
          ))}
          <Separator className="my-2" />
          <Button size="sm" className="w-full">Compose</Button>
        </div>
        <div className="divide-y divide-dashed divide-border border-b border-dashed border-border md:col-span-1 md:border-b-0 md:border-r">
          {MESSAGES.map((message) => (
            <button
              key={message.id}
              type="button"
              onClick={() => setActive(message.id)}
              className={`w-full cursor-pointer px-4 py-3 text-left transition-colors hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${active === message.id ? "bg-secondary/60" : ""}`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-black uppercase">{message.from}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{message.time}</span>
              </span>
              <span className="mt-0.5 block truncate font-mono text-xs font-bold">
                {message.unread && <span className="mr-1.5 inline-block size-1.5 rounded-full bg-accent" />}
                {message.subject}
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">{message.preview}</span>
            </button>
          ))}
        </div>
        <Card className="rounded-none border-0 outline-none md:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar name={current?.from ?? "Mail"} />
              <div>
                <CardTitle>{current?.subject}</CardTitle>
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">FROM {current?.from}{" // "}{current?.time}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{current?.preview} Full thread renders here with ticket context, seat map snapshot, and refund status stamps.</p>
            <div className="flex gap-2">
              <Button size="sm">Reply</Button>
              <Button size="sm" variant="outline">Forward</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
