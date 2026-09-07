"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MetricCard } from "../ui/metric-card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../ui/table";

const PLANS = [
  { name: "STUB STARTER", seats: 1240, pct: 52 },
  { name: "BOX OFFICE PRO", seats: 860, pct: 36 },
  { name: "ARENA SCALE", seats: 290, pct: 12 },
];

const COHORTS = [
  { month: "MAR", signups: 210, churn: "2.1%" },
  { month: "APR", signups: 284, churn: "1.9%" },
  { month: "MAY", signups: 342, churn: "1.6%" },
  { month: "JUN", signups: 410, churn: "1.4%" },
];

export function AdminSaas() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">BOX OFFICE // SAAS</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Subscription desk</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent">CHURN 1.4%</Badge>
          <Button size="sm">Invite team</Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="MRR" value="$86,400" trend={{ value: "+6.8%", direction: "up", label: "VS LAST MONTH" }} sparklineData={[50, 56, 60, 66, 72, 80, 86]} />
        <MetricCard title="ARR" value="$1.04M" trend={{ value: "+24.1%", direction: "up", label: "VS LAST YEAR" }} sparklineData={[40, 48, 56, 64, 74, 86, 98]} />
        <MetricCard title="ACTIVE SEATS" value="2,390" trend={{ value: "+182", direction: "up", label: "THIS MONTH" }} sparklineData={[30, 36, 42, 48, 54, 60, 66]} />
        <MetricCard title="NRR" value="118%" trend={{ value: "+3.0%", direction: "up", label: "VS LAST QUARTER" }} sparklineData={[90, 96, 100, 106, 110, 114, 118]} />
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Plan mix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {PLANS.map((plan) => (
              <div key={plan.name} className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold">{plan.name}</span>
                  <span className="text-muted-foreground">{plan.seats.toLocaleString()} SEATS</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-sm border border-border bg-secondary">
                  <div className="h-full bg-primary" style={{ width: `${plan.pct}%` }} />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">Compare plans</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Growth cohorts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Cohort</TableHeaderCell>
                  <TableHeaderCell>Signups</TableHeaderCell>
                  <TableHeaderCell>Churn</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {COHORTS.map((cohort) => (
                  <TableRow key={cohort.month}>
                    <TableCell className="font-bold">{cohort.month}</TableCell>
                    <TableCell>{cohort.signups}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{cohort.churn}</Badge>
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
