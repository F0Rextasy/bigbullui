"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Textarea } from "../ui/textarea";

const TICKETS = [
  { id: "TCK-881", who: "Gate 03", subject: "Scanner will not read balcony stubs", sla: "OVERDUE", tone: "secondary" as const },
  { id: "TCK-882", who: "Ada Bull", subject: "Refund request for duplicate charge", sla: "2H LEFT", tone: "default" as const },
  { id: "TCK-883", who: "Mira Chen", subject: "VIP list spelling correction", sla: "ON TRACK", tone: "accent" as const },
];

export function AdminSupport() {
  const [reply, setReply] = React.useState("");
  const [active, setActive] = React.useState(TICKETS[0].id);
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">DESK{" // "}SUPPORT QUEUE</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Ticket inbox</h2>
        </div>
        <Badge variant="accent">3 OPEN</Badge>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="min-w-0 xl:col-span-2">
          <CardHeader>
            <CardTitle>Ticket queue</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {TICKETS.map((ticket) => (
              <button
                key={ticket.id}
                type="button"
                onClick={() => setActive(ticket.id)}
                aria-pressed={active === ticket.id}
                className="flex w-full items-center gap-3 rounded-md border-2 border-dashed border-border bg-card p-3 text-left transition-colors hover:border-solid hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
              >
                <Avatar name={ticket.who} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{ticket.id}{" // "}{ticket.who}</span>
                  <span className="block truncate font-mono text-sm font-bold">{ticket.subject}</span>
                </span>
                <Badge variant={ticket.tone}>{ticket.sla}</Badge>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Reply box</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">ANSWERING {active}</p>
            <Textarea
              value={reply}
              onChange={(event) => setReply(event.target.value)}
              placeholder="Type a stamped reply..."
              rows={5}
            />
            <Button size="sm" className="w-full">Send reply</Button>
            <Button variant="outline" size="sm" className="w-full">Escalate to lead</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
