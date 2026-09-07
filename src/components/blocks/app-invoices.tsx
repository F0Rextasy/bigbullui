"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../ui/table";

const INVOICES = [
  { id: "INV-2001", client: "Annex Events", total: "$1,240.00", status: "PAID" },
  { id: "INV-2002", client: "Night Haul Co", total: "$860.00", status: "SENT" },
  { id: "INV-2003", client: "Swift Cart", total: "$430.00", status: "DRAFT" },
  { id: "INV-2004", client: "Depot East", total: "$2,105.00", status: "OVERDUE" },
];

const FLOW = ["DRAFT", "SENT", "PAID"] as const;

function statusVariant(status: string): "accent" | "default" | "outline" | "secondary" {
  if (status === "PAID") return "accent";
  if (status === "OVERDUE") return "secondary";
  if (status === "SENT") return "default";
  return "outline";
}

export function AppInvoices() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">LEDGER // INVOICES</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Billing stubs</h2>
        </div>
        <Button size="sm">New invoice</Button>
      </div>
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Status flow</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-wrap items-center gap-2" aria-label="Invoice status flow">
            {FLOW.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-md border-2 border-dashed border-foreground px-3 py-1 font-mono text-[11px] font-black uppercase tracking-widest">
                  <span aria-hidden className="inline-flex size-5 items-center justify-center rounded-full bg-accent font-mono text-[10px] text-accent-foreground">{index + 1}</span>
                  {step}
                </span>
                {index < FLOW.length - 1 ? <span aria-hidden className="font-mono text-muted-foreground">--</span> : null}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      <Card className="min-w-0">
        <CardHeader>
          <CardTitle>Invoice table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Invoice</TableHeaderCell>
                <TableHeaderCell>Client</TableHeaderCell>
                <TableHeaderCell>Total</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {INVOICES.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-bold">{row.id}</TableCell>
                  <TableCell>{row.client}</TableCell>
                  <TableCell className="font-mono">{row.total}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
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
