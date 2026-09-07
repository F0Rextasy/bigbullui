"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";

const COLUMNS = [
  {
    id: "todo",
    title: "QUEUE",
    cards: [
      { id: "t1", title: "Print VIP wristbands", tag: "PRINT", who: "Ada Bull", due: "JUN 28" },
      { id: "t2", title: "Confirm food truck permits", tag: "OPS", who: "Jon Reyes", due: "JUN 29" },
    ],
  },
  {
    id: "doing",
    title: "ON STAGE",
    cards: [
      { id: "t3", title: "Rig stage lights truss", tag: "STAGE", who: "Mira Chen", due: "JUN 27" },
    ],
  },
  {
    id: "done",
    title: "TORN",
    cards: [
      { id: "t4", title: "Publish door schedule", tag: "OPS", who: "Sena Park", due: "JUN 25" },
    ],
  },
];

export function AppTasks() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">CREW // TASK BOARD</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Load-in list</h2>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Filter tasks..." aria-label="Filter tasks" className="w-44" />
          <Button size="sm">New task</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {COLUMNS.map((column) => (
          <div key={column.id} className="rounded-lg border-2 border-dashed border-border bg-secondary/30 p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="font-mono text-xs font-black uppercase tracking-[0.2em]">{column.title}</p>
              <Badge variant="outline">{column.cards.length}</Badge>
            </div>
            <div className="space-y-3">
              {column.cards.map((card) => (
                <Card key={card.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={column.id === "done" ? "accent" : "default"}>{card.tag}</Badge>
                      <span className="font-mono text-[10px] text-muted-foreground">DUE {card.due}</span>
                    </div>
                    <CardTitle className="text-sm normal-case tracking-normal">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2">
                      <Avatar name={card.who} size="sm" />
                      <span className="font-mono text-[11px] text-muted-foreground">{card.who}</span>
                    </span>
                    <Button size="sm" variant="outline">Open</Button>
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
