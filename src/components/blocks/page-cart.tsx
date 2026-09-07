"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CouponField } from "../ui/coupon-field";
import { CheckoutSummary } from "../ui/checkout-summary";
import { Separator } from "../ui/separator";

const INITIAL = [
  { id: "jacket", title: "TOUR JACKET 1977", price: "$148.00", qty: 1 },
  { id: "tee", title: "STUB TEE BLACK", price: "$32.00", qty: 2 },
  { id: "cap", title: "GATE CAP", price: "$24.00", qty: 1 },
];

export function PageCart() {
  const [rows, setRows] = React.useState(INITIAL);
  const [coupon, setCoupon] = React.useState<string | null>(null);
  const bump = (id: string, d: number) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, qty: Math.max(1, r.qty + d) } : r)));
  const remove = (id: string) => setRows((prev) => prev.filter((r) => r.id !== id));
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">STOREFRONT // CART</p>
          <h2 className="font-mono text-2xl font-black uppercase tracking-tight">Your bundle</h2>
        </div>
        <Badge variant="accent">{rows.length} ITEMS</Badge>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="min-w-0 lg:col-span-2">
          <CardHeader><CardTitle>Cart rows</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {rows.map((r) => (
              <div key={r.id} className="flex min-w-0 items-center gap-3 rounded-md border-2 border-dashed border-border p-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-[10px] font-black">BB</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs font-bold uppercase tracking-widest">{r.title}</p>
                  <p className="font-mono text-xs text-muted-foreground">{r.price} × {r.qty}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Button variant="outline" size="sm" onClick={() => bump(r.id, -1)} aria-label={`Decrease ${r.title}`}>−</Button>
                  <span className="w-6 text-center font-mono text-sm">{r.qty}</span>
                  <Button variant="outline" size="sm" onClick={() => bump(r.id, 1)} aria-label={`Increase ${r.title}`}>+</Button>
                </div>
                <Button variant="ghost" size="sm" onClick={() => remove(r.id)}>Remove</Button>
              </div>
            ))}
            {rows.length === 0 && <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">CART IS EMPTY</p>}
            <Separator />
            <CouponField onApply={(c) => setCoupon(c)} />
            {coupon && <Badge variant="secondary">COUPON {coupon} APPLIED</Badge>}
          </CardContent>
        </Card>
        <CheckoutSummary items={rows} subtotal="$236.00" tax="$18.88" total={coupon ? "$229.88" : "$254.88"} cta="Checkout now" className="min-w-0" />
      </div>
    </div>
  );
}
