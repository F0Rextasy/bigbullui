"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PrintableInvoiceLine {
  label: string;
  qty: number;
  price: number;
}

export interface PrintableInvoiceProps extends React.HTMLAttributes<HTMLDivElement> {
  invoiceNo?: string;
  from?: string;
  to?: string;
  items?: PrintableInvoiceLine[];
}

/** Print-ready invoice sheet with line items, tax row and stamped total. */
export function PrintableInvoice({
  invoiceNo = "INV-2026-042",
  from = "Bigbull Box Office",
  to = "Guest Services",
  items = [
    { label: "VIP admission × 2", qty: 2, price: 85 },
    { label: "Service fee", qty: 1, price: 6 },
  ],
  className,
  ...props
}: PrintableInvoiceProps) {
  const subtotal = items.reduce((s, l) => s + l.qty * l.price, 0);
  const tax = Math.round(subtotal * 0.1 * 100) / 100;
  const money = (n: number) => `$${n.toFixed(2)}`;
  return (
    <div className={cn("w-full max-w-md", className)} {...props}>
      <button
        type="button"
        onClick={() => window.print()}
        className="mb-3 cursor-pointer rounded border-2 border-foreground bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Print invoice
      </button>
      <div className="rounded-lg border-2 border-foreground bg-card p-4 print:border-black">
        <div className="flex items-start justify-between border-b border-dashed border-border pb-2">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">Invoice</p>
            <p className="mt-0.5 font-mono text-xs font-bold text-foreground">{invoiceNo}</p>
          </div>
          <span className="rotate-[-4deg] rounded border-2 border-accent px-1.5 py-px font-mono text-[10px] font-bold uppercase text-accent">
            Paid
          </span>
        </div>
        <div className="flex justify-between gap-2 py-2 text-xs">
          <p className="text-muted-foreground">From: <span className="font-bold text-foreground">{from}</span></p>
          <p className="text-muted-foreground">To: <span className="font-bold text-foreground">{to}</span></p>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-y border-dashed border-border font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="py-1 text-left font-bold">Item</th>
              <th className="py-1 text-right font-bold">Qty</th>
              <th className="py-1 text-right font-bold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((l, i) => (
              <tr key={i} className="border-b border-dashed border-border text-foreground">
                <td className="py-1.5">{l.label}</td>
                <td className="py-1.5 text-right font-mono">{l.qty}</td>
                <td className="py-1.5 text-right font-mono">{money(l.qty * l.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="space-y-1 pt-2 font-mono text-xs text-foreground">
          <p className="flex justify-between"><span className="text-muted-foreground">SUBTOTAL</span><span>{money(subtotal)}</span></p>
          <p className="flex justify-between"><span className="text-muted-foreground">TAX 10%</span><span>{money(tax)}</span></p>
          <p className="flex justify-between border-t-2 border-foreground pt-1 text-sm font-bold print:border-black">
            <span>TOTAL</span><span>{money(subtotal + tax)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
