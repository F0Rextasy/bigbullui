"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Progress } from "../ui/progress";

const TEAM = [
  { name: "Ada Bull", role: "DOOR CAPTAIN", leave: "ON SHIFT", score: 92 },
  { name: "Jon Reyes", role: "SCANNER LEAD", leave: "2 DAYS LEFT", score: 78 },
  { name: "Sena Park", role: "VIP HOST", leave: "ON LEAVE", score: 64 },
  { name: "Mira Chen", role: "BOX OFFICE", leave: "5 DAYS LEFT", score: 85 },
];

function leaveVariant(leave: string): "accent" | "outline" | "secondary" | "default" {
  if (leave === "ON SHIFT") return "accent";
  if (leave === "ON LEAVE") return "secondary";
  return "outline";
}

export function AdminHr() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">CREW // HUMAN RESOURCES</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Shift roster</h2>
        </div>
        <Button size="sm">Add member</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TEAM.map((person) => (
          <Card key={person.name} className="min-w-0">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <Avatar name={person.name} size="md" />
              <div className="min-w-0">
                <CardTitle className="truncate text-sm">{person.name}</CardTitle>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{person.role}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Badge variant={leaveVariant(person.leave)}>{person.leave}</Badge>
              <div>
                <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>Performance</span>
                  <span className="font-bold text-foreground">{person.score}%</span>
                </div>
                <Progress value={person.score} />
              </div>
              <Button variant="outline" size="sm" className="w-full">Review file</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
