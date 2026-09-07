"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PageHeader } from "../ui/page-header";
import { Steps } from "../ui/steps";

const TICKETS = [
  { id: "SUP-1042", subject: "Refund for duplicate stub order", status: "IN PROGRESS", updated: "12 MIN AGO" },
  { id: "SUP-1041", subject: "Seat swap for orchestra row C", status: "TRIAGE", updated: "1 HR AGO" },
  { id: "SUP-1038", subject: "Missing barcode on confirmation", status: "RESOLVED", updated: "1 DAY AGO" },
];

const TRACKER = [
  { title: "Received", description: "Stub logged" },
  { title: "Triage", description: "Agent assigned" },
  { title: "In progress", description: "Fix underway" },
  { title: "Resolved", description: "Stamped shut" },
];

export function BlockCustomerPortal() {
  const [sent, setSent] = React.useState(false);

  return (
    <div className="w-full space-y-6">
      <PageHeader
        eyebrow="SUPPORT // HELP DESK"
        title="Customer portal"
        description="Track every request from counter to resolution."
        actions={<Button size="sm">New request</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>My tickets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {TICKETS.map((ticket) => (
              <div key={ticket.id} className="flex min-w-0 items-center gap-3 rounded-md border border-dashed border-border p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs font-bold">{ticket.id} — {ticket.subject}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">UPDATED {ticket.updated}</p>
                </div>
                <Badge variant={ticket.status === "RESOLVED" ? "accent" : ticket.status === "TRIAGE" ? "default" : "outline"}>
                  {ticket.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Status tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <Steps steps={TRACKER} current={2} />
            <p className="mt-4 rounded-md border border-dashed border-border bg-secondary p-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              SUP-1042 is with the box office crew
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Open a new request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="Subject, e.g. exchange my balcony stub" aria-label="Request subject" />
          <Textarea placeholder="Describe the issue with order numbers and dates" aria-label="Request details" />
          <Button size="sm" onClick={() => setSent(true)}>{sent ? "Filed at counter" : "File request"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
