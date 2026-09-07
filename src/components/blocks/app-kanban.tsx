"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "../ui/avatar";

const LANES = [
  {
    id: "backlog",
    title: "BACKLOG",
    cards: [
      { id: "k1", title: "Reprint faded wristbands", tag: "PRINT", who: "Jon Reyes", comments: 2 },
      { id: "k2", title: "Translate safety signage", tag: "OPS", who: "Sena Park", comments: 0 },
    ],
  },
  {
    id: "build",
    title: "IN BUILD",
    cards: [
      { id: "k3", title: "Wire scanner gate 4", tag: "GATE", who: "Ada Bull", comments: 5 },
    ],
  },
  {
    id: "review",
    title: "DOOR REVIEW",
    cards: [
      { id: "k4", title: "Approve VIP lounge menu", tag: "VIP", who: "Mira Chen", comments: 1 },
    ],
  },
  {
    id: "live",
    title: "LIVE",
    cards: [
      { id: "k5", title: "Open standby window", tag: "GATE", who: "Gate Team", comments: 8 },
    ],
  },
];

export function AppKanban() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">SHOW // PROJECT BOARD</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Opening night</h2>
        </div>
        <Button size="sm">New card</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {LANES.map((lane) => (
          <div key={lane.id} className="rounded-lg border-2 border-foreground bg-card p-3">
            <div className="mb-3 flex items-center justify-between border-b-2 border-dashed border-border px-1 pb-2">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em]">{lane.title}</p>
              <Badge variant="outline">{lane.cards.length}</Badge>
            </div>
            <div className="space-y-3">
              {lane.cards.map((card) => (
                <Card key={card.id}>
                  <CardHeader className="pb-2">
                    <Badge variant={lane.id === "live" ? "accent" : "default"}>{card.tag}</Badge>
                    <CardTitle className="text-sm normal-case tracking-normal">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2">
                      <Avatar name={card.who} size="sm" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{card.comments} NOTES</span>
                    </span>
                    <Button size="sm" variant="ghost">Detail</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
