"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface RefundCardProps extends React.HTMLAttributes<HTMLDivElement> {
  orderId: string;
  amount: string;
  reason?: string;
  status: "pending" | "approved" | "rejected" | "completed";
}

const STATUS = {
  pending: { label: "Beklemede", cls: "border-amber-500/50 bg-amber-500/10 text-amber-600" },
  approved: { label: "Approved", cls: "border-sky-500/50 bg-sky-500/10 text-sky-600" },
  rejected: { label: "Reddedildi", cls: "border-destructive/50 bg-destructive/10 text-destructive" },
  completed: { label: "Completed", cls: "border-emerald-500/50 bg-emerald-500/10 text-emerald-600" },
};

/** Refund status card: resolution state + amount + reason. */
export function RefundCard({ orderId, amount, reason, status, className, ...props }: RefundCardProps) {
  const s = STATUS[status];
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <style>{`@keyframes rfIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-center justify-between animate-[rfIn_0.3s_ease-out_both] motion-reduce:animate-none">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Order {orderId}</span>
        <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider", s.cls)}>{s.label}</span>
      </div>
      <p className="mt-2 font-mono text-2xl font-bold tabular-nums">{amount}</p>
      {reason && <p className="mt-1 text-xs text-muted-foreground">Sebep: {reason}</p>}
    </div>
  );
}
