"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../ui/table";

const DEFAULT_SHIPMENTS = [
  { id: "SHP-4101", route: "Gate 01 to Depot East", carrier: "Bull Freight", eta: "08:40", status: "IN TRANSIT" },
  { id: "SHP-4102", route: "Depot West to Gate 04", carrier: "Night Haul", eta: "09:15", status: "LOADING" },
  { id: "SHP-4103", route: "Gate 02 to Annex", carrier: "Bull Freight", eta: "10:05", status: "DELIVERED" },
  { id: "SHP-4104", route: "Annex to Gate 03", carrier: "Swift Cart", eta: "11:30", status: "DELAYED" },
];

const DEFAULT_TIMELINE = [
  { point: "06:10", label: "MANIFEST STAMPED", detail: "42 crates logged at dock" },
  { point: "07:25", label: "GATE 01 DISPATCH", detail: "Convoy cleared scanner" },
  { point: "08:40", label: "ETA CHECKPOINT", detail: "East depot confirms arrival window" },
  { point: "09:00", label: "COLD CHAIN VERIFIED", detail: "Seal temps within range" },
];

function statusVariant(status: string): "accent" | "default" | "outline" | "secondary" {
  if (status === "DELIVERED") return "accent";
  if (status === "IN TRANSIT") return "default";
  if (status === "DELAYED") return "secondary";
  return "outline";
}

export interface AdminLogisticsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: string;
  subtitle?: string;
  shipments?: typeof DEFAULT_SHIPMENTS;
  timeline?: typeof DEFAULT_TIMELINE;
  onAction?: (action: string) => void;
}

export function AdminLogistics({ title, shipments = DEFAULT_SHIPMENTS, timeline = DEFAULT_TIMELINE, className, onAction, ...props }: AdminLogisticsProps) {
  const [notice, setNotice] = React.useState<string | null>(null);
  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">DISPATCH // LOGISTICS</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">{title ?? "Shipment board"}</h2>
        </div>
        <div className="flex items-center gap-2">
          {notice && <span role="status" className="font-mono text-[10px] uppercase tracking-wider text-accent">{notice}</span>}
          <Button size="sm" onClick={() => { setNotice("Manifest SHP-4105 created."); onAction?.("new-manifest"); }}>New manifest</Button>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="min-w-0 xl:col-span-2">
          <CardHeader>
            <CardTitle>Active shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>ID</TableHeaderCell>
                  <TableHeaderCell>Route</TableHeaderCell>
                  <TableHeaderCell>Carrier</TableHeaderCell>
                  <TableHeaderCell>ETA</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {shipments.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-bold">{row.id}</TableCell>
                    <TableCell>{row.route}</TableCell>
                    <TableCell>{row.carrier}</TableCell>
                    <TableCell className="font-mono">{row.eta}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Status timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-4 border-l-2 border-dashed border-border ps-4">
              {timeline.map((step) => (
                <li key={step.label} className="relative">
                  <span aria-hidden className="absolute -left-[21px] top-1 size-2.5 rounded-full border-2 border-foreground bg-accent motion-reduce:transition-none" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{step.point}</p>
                  <p className="font-mono text-xs font-black uppercase tracking-widest">{step.label}</p>
                  <p className="font-mono text-xs text-muted-foreground">{step.detail}</p>
                </li>
              ))}
            </ol>
            <Button variant="outline" size="sm" className="mt-4 w-full" onClick={() => { setNotice("Loaded full dispatch ledger."); onAction?.("view-ledger"); }}>View full ledger</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
