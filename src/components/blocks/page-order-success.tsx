"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { OrderTracking } from "../ui/order-tracking";
import { Timeline } from "../ui/timeline";
import { Separator } from "../ui/separator";

const TRACK = [
  { id: "paid", label: "Paid", date: "SEP 05", done: true },
  { id: "pack", label: "Packed", date: "SEP 06", done: true },
  { id: "ship", label: "Shipped", date: "SEP 07", done: true },
  { id: "gate", label: "Out", date: "SEP 08", done: false },
  { id: "done", label: "Done", date: "SEP 09", done: false },
];
const FEED = [
  { date: "SEP 07 // 09:41", title: "PARCEL LEFT DEPOT", description: "Courier scanned crate at Gate 03 hub.", tone: "accent" as const },
  { date: "SEP 06 // 18:02", title: "STUBS PACKED", description: "Double-frame box sealed with stamp wax." },
  { date: "SEP 05 // 12:20", title: "PAYMENT SEALED", description: "Order BB-90210 confirmed, receipt issued." },
];

export function PageOrderSuccess() {
  return (
    <div className="w-full space-y-6">
      <div className="space-y-1 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">STOREFRONT // CONFIRMED</p>
        <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Order sealed</h2>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="accent">BB-90210</Badge>
          <Badge variant="outline">PAID</Badge>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader><CardTitle>Tracking</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <OrderTracking orderId="BB-90210" steps={TRACK} courier="GATE EXPRESS" />
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Track parcel</Button>
              <Button variant="outline" size="sm">View receipt</Button>
            </div>
          </CardContent>
        </Card>
        <Card className="min-w-0">
          <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
          <CardContent>
            <Timeline items={FEED} />
          </CardContent>
        </Card>
      </div>
      <Card className="min-w-0">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Receipt sent to inbox // arrives in 2 days</p>
          <Button variant="outline" size="sm">Continue browsing</Button>
        </CardContent>
      </Card>
    </div>
  );
}
