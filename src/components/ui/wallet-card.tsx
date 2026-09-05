"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface WalletTransaction {
  id: string;
  label: string;
  amount: string;
  negative?: boolean;
  date?: string;
}

export interface WalletCardProps extends React.HTMLAttributes<HTMLDivElement> {
  balance: string;
  onTopUp?: () => void;
  transactions?: WalletTransaction[];
}

/** Digital wallet card: balance + top-up action + recent transactions. */
export function WalletCard({ balance, onTopUp, transactions = [], className, ...props }: WalletCardProps) {
  return (
    <div className={cn("w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes wcIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="bg-gradient-to-br from-accent/15 to-card p-5 animate-[wcIn_0.35s_ease-out_both] motion-reduce:animate-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Wallet Balance</p>
        <p className="mt-1 font-mono text-2xl font-bold tabular-nums">{balance}</p>
        <button
          onClick={onTopUp}
          className="mt-3 rounded-md border border-accent/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
        >
          + Bakiye ekle
        </button>
      </div>
      {transactions.length > 0 && (
        <ul className="divide-y divide-border/60">
          {transactions.slice(0, 4).map((t, idx) => (
            <li key={t.id} className="flex items-center justify-between px-4 py-2 text-sm animate-[wcIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${0.15 + idx * 0.05}s` }}>
              <span className="truncate">{t.label}{t.date && <span className="ml-2 text-[10px] text-muted-foreground">{t.date}</span>}</span>
              <span className={cn("shrink-0 font-mono text-xs tabular-nums", t.negative ? "text-destructive" : "text-emerald-600")}>
                {t.negative ? "−" : "+"}{t.amount}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
