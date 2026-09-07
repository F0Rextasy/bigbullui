"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MetricCard } from "../ui/metric-card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const PAGES = [
  { path: "/events/midnight-cinema", views: "18,204", share: 82 },
  { path: "/events/symphony-brass", views: "12,480", share: 64 },
  { path: "/pricing", views: "9,312", share: 48 },
  { path: "/events/vip-balcony", views: "6,108", share: 32 },
];

const REGIONS = [
  { region: "NORTH AMERICA", pct: 46 },
  { region: "EUROPE", pct: 31 },
  { region: "ASIA PACIFIC", pct: 15 },
  { region: "REST OF WORLD", pct: 8 },
];

export function AdminAnalytics() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">BOX OFFICE // ANALYTICS</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Traffic ledger</h2>
        </div>
        <Badge variant="accent">7D WINDOW</Badge>
      </div>
      <Tabs defaultValue="7d">
        <TabsList>
          <TabsTrigger value="7d">7D</TabsTrigger>
          <TabsTrigger value="30d">30D</TabsTrigger>
          <TabsTrigger value="12m">12M</TabsTrigger>
        </TabsList>
        <TabsContent value="7d">
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard title="PAGE VIEWS" value="86,410" trend={{ value: "+11.2%", direction: "up", label: "VS PRIOR 7D" }} sparklineData={[40, 44, 42, 50, 55, 58, 64]} />
            <MetricCard title="CONVERSION" value="4.6%" trend={{ value: "+0.8%", direction: "up", label: "VS PRIOR 7D" }} sparklineData={[20, 24, 22, 28, 30, 34, 38]} />
            <MetricCard title="BOUNCE" value="32.1%" trend={{ value: "-2.4%", direction: "down", label: "VS PRIOR 7D" }} sparklineTone="muted" sparklineData={[50, 46, 48, 42, 40, 38, 34]} />
          </div>
        </TabsContent>
        <TabsContent value="30d">
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard title="PAGE VIEWS" value="342,900" trend={{ value: "+9.4%", direction: "up", label: "VS PRIOR 30D" }} sparklineData={[30, 36, 40, 44, 50, 56, 62]} />
            <MetricCard title="CONVERSION" value="4.1%" trend={{ value: "+0.3%", direction: "up", label: "VS PRIOR 30D" }} sparklineData={[18, 20, 24, 26, 28, 30, 32]} />
            <MetricCard title="BOUNCE" value="34.8%" trend={{ value: "-1.1%", direction: "down", label: "VS PRIOR 30D" }} sparklineTone="muted" sparklineData={[52, 50, 48, 46, 44, 42, 40]} />
          </div>
        </TabsContent>
        <TabsContent value="12m">
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCard title="PAGE VIEWS" value="3.8M" trend={{ value: "+28.6%", direction: "up", label: "VS PRIOR YEAR" }} sparklineData={[20, 28, 34, 42, 50, 60, 72]} />
            <MetricCard title="CONVERSION" value="3.9%" trend={{ value: "+0.6%", direction: "up", label: "VS PRIOR YEAR" }} sparklineData={[14, 18, 20, 24, 28, 30, 34]} />
            <MetricCard title="BOUNCE" value="36.2%" trend={{ value: "-3.0%", direction: "down", label: "VS PRIOR YEAR" }} sparklineTone="muted" sparklineData={[56, 52, 50, 46, 44, 40, 36]} />
          </div>
        </TabsContent>
      </Tabs>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top pages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Path</TableHeaderCell>
                  <TableHeaderCell>Views</TableHeaderCell>
                  <TableHeaderCell>Share</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {PAGES.map((page) => (
                  <TableRow key={page.path}>
                    <TableCell className="font-bold">{page.path}</TableCell>
                    <TableCell>{page.views}</TableCell>
                    <TableCell className="min-w-32">
                      <span className="block h-2 overflow-hidden rounded-sm bg-secondary">
                        <span className="block h-full bg-accent" style={{ width: `${page.share}%` }} />
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Traffic by region</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {REGIONS.map((row) => (
              <div key={row.region} className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold">{row.region}</span>
                  <span className="text-muted-foreground">{row.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-sm border border-border bg-secondary">
                  <div className="h-full bg-primary" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">Download report</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
