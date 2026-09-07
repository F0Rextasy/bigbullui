"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PrintInvoiceLine {
  id: string;
  label: string;
  qty: number;
  price: number;
}

export interface PrintInvoiceProps extends React.HTMLAttributes<HTMLDivElement> {
  orderNo?: string;
  lines?: PrintInvoiceLine[];
}

/** Printable invoice stub with dashed tear line and print trigger. */
export function PrintInvoice({
  orderNo = "BB-2026-0481",
  lines = [
    { id: "l1", label: "General Admission", qty: 2, price: 45 },
    { id: "l2", label: "Balcony Upgrade", qty: 1, price: 20 },
  ],
  className,
  ...props
}: PrintInvoiceProps) {
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
  return (
    <div
      className={cn(
        "w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-5 shadow-sm print:shadow-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Invoice</span>
        <span className="font-mono text-xs font-bold">{orderNo}</span>
      </div>
      <div className="my-3 border-t-2 border-dashed border-border" aria-hidden="true" />
      <ul className="space-y-2">
        {lines.map((l) => (
          <li key={l.id} className="flex items-center justify-between font-mono text-xs">
            <span>
              {l.label} <span className="text-muted-foreground">× {l.qty}</span>
            </span>
            <span className="tabular-nums">${(l.qty * l.price).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="my-3 border-t-2 border-dashed border-border" aria-hidden="true" />
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Total</span>
        <span className="font-mono text-base font-black text-accent">${total.toFixed(2)}</span>
      </div>
      <button
        type="button"
        onClick={() => window.print()}
        className="mt-4 w-full rounded-md border-2 border-dashed border-foreground/40 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring print:hidden motion-reduce:transition-none"
      >
        Print Stub
      </button>
    </div>
  );
}
