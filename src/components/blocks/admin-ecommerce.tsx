"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MetricCard } from "../ui/metric-card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../ui/table";

const PRODUCTS = [
  { name: "VIP ALL-ACCESS", sold: 842, revenue: "$101,040", stock: "IN STOCK" },
  { name: "ORCHESTRA ROW", sold: 1240, revenue: "$93,000", stock: "LOW STOCK" },
  { name: "BALCONY PASS", sold: 2084, revenue: "$93,780", stock: "IN STOCK" },
  { name: "STANDBY STUB", sold: 390, revenue: "$11,700", stock: "SOLD OUT" },
];

export function AdminEcommerce() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">BOX OFFICE // COMMERCE</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Stub storefront</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent">OPEN</Badge>
          <Button size="sm">New drop</Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="GROSS SALES" value="$299,520" trend={{ value: "+18.2%", direction: "up", label: "VS LAST MONTH" }} sparklineData={[30, 38, 44, 48, 56, 62, 70]} />
        <MetricCard title="ORDERS" value="4,556" trend={{ value: "+12.0%", direction: "up", label: "VS LAST MONTH" }} sparklineData={[24, 30, 34, 40, 46, 52, 58]} />
        <MetricCard title="AVG BASKET" value="$65.74" trend={{ value: "+5.5%", direction: "up", label: "VS LAST MONTH" }} sparklineData={[40, 42, 44, 46, 48, 50, 52]} />
        <MetricCard title="REFUNDS" value="84" trend={{ value: "-9.1%", direction: "down", label: "VS LAST MONTH" }} sparklineTone="muted" sparklineData={[20, 18, 19, 16, 14, 13, 11]} />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Top stubs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Product</TableHeaderCell>
                  <TableHeaderCell>Sold</TableHeaderCell>
                  <TableHeaderCell>Revenue</TableHeaderCell>
                  <TableHeaderCell>Stock</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {PRODUCTS.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell className="font-bold">{product.name}</TableCell>
                    <TableCell>{product.sold.toLocaleString()}</TableCell>
                    <TableCell>{product.revenue}</TableCell>
                    <TableCell>
                      <Badge variant={product.stock === "SOLD OUT" ? "accent" : product.stock === "LOW STOCK" ? "default" : "outline"}>
                        {product.stock}
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
            <CardTitle>Order donut</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "FULFILLED", pct: 72, tone: "bg-accent" },
              { label: "RESERVED", pct: 18, tone: "bg-primary" },
              { label: "REFUNDED", pct: 10, tone: "bg-secondary" },
            ].map((slice) => (
              <div key={slice.label} className="space-y-1.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-bold">{slice.label}</span>
                  <span className="text-muted-foreground">{slice.pct}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-sm border border-border bg-card">
                  <div className={`h-full ${slice.tone}`} style={{ width: `${slice.pct}%` }} />
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">Manage orders</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
