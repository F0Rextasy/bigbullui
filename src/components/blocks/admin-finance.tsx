"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MetricCard } from "../ui/metric-card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../ui/table";

const INVOICES = [
  { id: "INV-2041", vendor: "Print House Co", amount: "$4,820", due: "JUN 30", status: "PAID" },
  { id: "INV-2042", vendor: "Stage Lights Ltd", amount: "$12,400", due: "JUL 04", status: "PENDING" },
  { id: "INV-2043", vendor: "Sound Crew Union", amount: "$8,150", due: "JUL 09", status: "PENDING" },
  { id: "INV-2044", vendor: "Venue Deposit", amount: "$25,000", due: "JUL 15", status: "SCHEDULED" },
];

const FLOWS = [
  { label: "TICKET SALES", amount: "+$48,250", pct: 92 },
  { label: "MERCH CUT", amount: "+$6,310", pct: 48 },
  { label: "VENDOR PAYOUTS", amount: "-$21,370", pct: 64 },
  { label: "VENUE FEES", amount: "-$9,800", pct: 38 },
];

export function AdminFinance() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">BOX OFFICE // FINANCE</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Cash ledger</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent">AUDITED</Badge>
          <Button size="sm">New invoice</Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="CASH IN" value="$54,560" trend={{ value: "+12.4%", direction: "up", label: "VS LAST MONTH" }} sparklineData={[28, 34, 38, 44, 48, 52, 58]} />
        <MetricCard title="CASH OUT" value="$31,170" trend={{ value: "+4.2%", direction: "up", label: "VS LAST MONTH" }} sparklineTone="muted" sparklineData={[20, 24, 26, 28, 30, 31, 33]} />
        <MetricCard title="NET FLOW" value="$23,390" trend={{ value: "+21.9%", direction: "up", label: "VS LAST MONTH" }} sparklineData={[10, 14, 16, 18, 20, 22, 26]} />
        <MetricCard title="BURN COVER" value="8.2 MO" trend={{ value: "+0.6 MO", direction: "up", label: "VS LAST MONTH" }} sparklineData={[60, 64, 66, 70, 74, 78, 82]} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cash waterfall</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {FLOWS.map((flow) => (
              <div key={flow.label} className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold">{flow.label}</span>
                  <span className="text-muted-foreground">{flow.amount}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-sm border border-border bg-secondary">
                  <div className="h-full bg-accent" style={{ width: `${flow.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Invoice stack</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Invoice</TableHeaderCell>
                  <TableHeaderCell>Vendor</TableHeaderCell>
                  <TableHeaderCell>Amount</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {INVOICES.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-bold">{invoice.id}</TableCell>
                    <TableCell>{invoice.vendor}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge variant={invoice.status === "PAID" ? "accent" : "outline"}>{invoice.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
