"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const DEFAULT_NOTES = [
  { id: "n1", title: "Doors checklist", body: "Verify scanners, wristbands, and standby signage before 18:00.", tag: "OPS", date: "SEP 07" },
  { id: "n2", title: "VIP menu notes", body: "Confirm dessert swap and print revised table cards.", tag: "VIP", date: "SEP 06" },
  { id: "n3", title: "Poster copy draft", body: "Headline punch up for encore weekend marquee.", tag: "HYPE", date: "SEP 05" },
  { id: "n4", title: "Refund follow ups", body: "Call back two balcony holders about duplicate charges.", tag: "OPS", date: "SEP 04" },
];

const TAGS = ["ALL", "OPS", "VIP", "HYPE"] as const;

export interface AppNotesProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  notes?: typeof DEFAULT_NOTES;
  onAction?: (action: string) => void;
}

export function AppNotes({ title, notes = DEFAULT_NOTES, className, onAction, ...props }: AppNotesProps) {
  const [tag, setTag] = React.useState<(typeof TAGS)[number]>("ALL");
  const [notice, setNotice] = React.useState<string | null>(null);
  const visible = notes.filter((note) => tag === "ALL" || note.tag === tag);
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">DESK // NOTES</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{title ?? "Field notes"}</h2>
        </div>
        <div className="flex items-center gap-2">
          {notice && <span role="status" className="font-mono text-[10px] uppercase tracking-wider text-accent">{notice}</span>}
          <Button size="sm" onClick={() => { setNotice("Blank field note opened."); onAction?.("new-note"); }}>New note</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter notes by tag">
        {TAGS.map((option) => (
          <Button
            key={option}
            size="sm"
            variant={tag === option ? "default" : "outline"}
            onClick={() => setTag(option)}
            aria-pressed={tag === option}
          >
            {option}
          </Button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {visible.map((note) => (
          <Card key={note.id} className="min-w-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <Badge variant="default">{note.tag}</Badge>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{note.date}</span>
            </CardHeader>
            <CardContent className="space-y-1">
              <CardTitle className="text-base">{note.title}</CardTitle>
              <p className="font-mono text-xs text-muted-foreground">{note.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
