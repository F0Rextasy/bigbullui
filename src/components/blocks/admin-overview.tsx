"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MetricCard } from "../ui/metric-card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../ui/table";
import { Avatar } from "../ui/avatar";

const ORDERS = [
  { id: "BB-90210", holder: "Ada Bull", tier: "VIP BOX", total: "$240.00", status: "ADMITTED" },
  { id: "BB-90211", holder: "Grace Hopper", tier: "ORCHESTRA", total: "$150.00", status: "RESERVED" },
  { id: "BB-90212", holder: "Alan Turing", tier: "BALCONY", total: "$90.00", status: "ADMITTED" },
  { id: "BB-90213", holder: "Linus Torvalds", tier: "GENERAL", total: "$60.00", status: "STANDBY" },
];

const ACTIVITY = [
  { name: "Ada Bull", text: "claimed 2 VIP stubs", time: "2 MIN AGO" },
  { name: "Gate 03", text: "scanned 148 stubs this hour", time: "9 MIN AGO" },
  { name: "Grace Hopper", text: "refunded 1 balcony stub", time: "24 MIN AGO" },
];

export function AdminOverview() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">BOX OFFICE // OVERVIEW</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Nightly audit</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent">LIVE</Badge>
          <Button size="sm">Export stubs</Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="GROSS REVENUE" value="$48,250" trend={{ value: "+14.8%", direction: "up", label: "VS LAST WEEK" }} periodLabel="ROLLING 7 DAYS" sparklineData={[32, 38, 35, 42, 40, 48, 52, 59]} />
        <MetricCard title="STUBS ADMITTED" value="4,820" trend={{ value: "+8.1%", direction: "up", label: "VS LAST WEEK" }} periodLabel="ROLLING 7 DAYS" sparklineData={[20, 26, 24, 30, 34, 38, 44, 49]} />
        <MetricCard title="REFUND RATE" value="1.8%" trend={{ value: "-0.4%", direction: "down", label: "VS LAST WEEK" }} periodLabel="ROLLING 7 DAYS" sparklineTone="muted" sparklineData={[8, 7, 9, 6, 5, 6, 4, 3]} />
        <MetricCard title="STANDBY QUEUE" value="312" trend={{ value: "+22", direction: "up", label: "SINCE DOORS" }} periodLabel="TONIGHT" sparklineData={[10, 14, 18, 22, 26, 30, 34, 40]} />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Order</TableHeaderCell>
                  <TableHeaderCell>Holder</TableHeaderCell>
                  <TableHeaderCell>Tier</TableHeaderCell>
                  <TableHeaderCell>Total</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ORDERS.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-bold">{order.id}</TableCell>
                    <TableCell>{order.holder}</TableCell>
                    <TableCell>{order.tier}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "ADMITTED" ? "accent" : order.status === "RESERVED" ? "default" : "outline"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity stream</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ACTIVITY.map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <Avatar name={item.name} size="sm" />
                <div className="min-w-0">
                  <p className="font-mono text-xs">
                    <span className="font-bold">{item.name}</span> <span className="text-muted-foreground">{item.text}</span>
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">View full ledger</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
