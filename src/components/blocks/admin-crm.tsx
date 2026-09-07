"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MetricCard } from "../ui/metric-card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../ui/table";
import { Avatar } from "../ui/avatar";

const LEADS = [
  { name: "Nova Events", contact: "Mira Chen", value: "$48,000", stage: "NEGOTIATION" },
  { name: "Copper Hall", contact: "Jon Reyes", value: "$21,500", stage: "PROPOSAL" },
  { name: "Velvet Org", contact: "Sena Park", value: "$12,800", stage: "QUALIFIED" },
  { name: "Dune Fest", contact: "Omar Haddad", value: "$63,200", stage: "CLOSED" },
];

const STAGES = ["QUALIFIED", "PROPOSAL", "NEGOTIATION", "CLOSED"];

export function AdminCrm() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">BOX OFFICE // CRM</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Deal pipeline</h2>
        </div>
        <Button size="sm">Add lead</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="PIPELINE VALUE" value="$145,500" trend={{ value: "+9.6%", direction: "up", label: "VS LAST MONTH" }} sparklineData={[30, 34, 38, 44, 50, 56, 62]} />
        <MetricCard title="OPEN DEALS" value="18" trend={{ value: "+3", direction: "up", label: "THIS WEEK" }} sparklineData={[10, 12, 14, 15, 16, 17, 18]} />
        <MetricCard title="WIN RATE" value="34%" trend={{ value: "+2.1%", direction: "up", label: "VS LAST MONTH" }} sparklineData={[20, 24, 22, 28, 30, 32, 34]} />
        <MetricCard title="AVG CYCLE" value="21 DAYS" trend={{ value: "-3 DAYS", direction: "down", label: "VS LAST MONTH" }} sparklineTone="muted" sparklineData={[30, 28, 28, 26, 24, 22, 21]} />
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle>Lead ledger</CardTitle>
            <div className="flex flex-wrap gap-1.5">
              {STAGES.map((stage) => (
                <Badge key={stage} variant={stage === "CLOSED" ? "accent" : "outline"}>{stage}</Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Account</TableHeaderCell>
                <TableHeaderCell>Contact</TableHeaderCell>
                <TableHeaderCell>Value</TableHeaderCell>
                <TableHeaderCell>Stage</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {LEADS.map((lead) => (
                <TableRow key={lead.name}>
                  <TableCell className="font-bold">{lead.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2">
                      <Avatar name={lead.contact} size="sm" />
                      {lead.contact}
                    </span>
                  </TableCell>
                  <TableCell>{lead.value}</TableCell>
                  <TableCell>
                    <Badge variant={lead.stage === "CLOSED" ? "accent" : "default"}>{lead.stage}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
