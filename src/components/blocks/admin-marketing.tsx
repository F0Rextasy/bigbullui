"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

const CAMPAIGNS = [
  { name: "Opening Night Blitz", channel: "POSTER + RADIO", spent: 72, budget: "$4.2K OF $5.8K", status: "LIVE" },
  { name: "Standby Rush", channel: "MARQUEE + SMS", spent: 45, budget: "$1.8K OF $4.0K", status: "LIVE" },
  { name: "VIP Encore", channel: "DIRECT MAIL", spent: 91, budget: "$8.2K OF $9.0K", status: "ENDING" },
  { name: "Matinee Push", channel: "KIOSK FLYERS", spent: 28, budget: "$0.9K OF $3.2K", status: "DRAFT" },
];

export function AdminMarketing() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">HYPE // MARKETING</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Campaign ledger</h2>
        </div>
        <Button size="sm">New campaign</Button>
      </div>
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Budget burn</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {CAMPAIGNS.map((row) => (
            <div key={row.name} className="rounded-md border-2 border-dashed border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-mono text-sm font-black uppercase tracking-wide">{row.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{row.channel} // {row.budget}</p>
                </div>
                <Badge variant={row.status === "LIVE" ? "accent" : row.status === "ENDING" ? "secondary" : "outline"}>{row.status}</Badge>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <Progress value={row.spent} className="flex-1" />
                <span className="font-mono text-xs font-bold">{row.spent}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
