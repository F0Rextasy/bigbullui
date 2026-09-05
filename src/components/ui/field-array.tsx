"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FieldArrayRow {
  id: string;
  value: string;
}

export interface FieldArrayProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  rows: FieldArrayRow[];
  onRowsChange?: (rows: FieldArrayRow[]) => void;
  placeholder?: string;
  maxRows?: number;
}

/** Dinamik form alanları: satır ekle/çıkar/yukarı-aşağı taşı. */
export function FieldArray({ label = "Alanlar", rows, onRowsChange, placeholder = "Değer…", maxRows = 10, className, ...props }: FieldArrayProps) {
  const update = (idx: number, value: string) => onRowsChange?.(rows.map((r, i) => (i === idx ? { ...r, value } : r)));
  const remove = (idx: number) => onRowsChange?.(rows.filter((_, i) => i !== idx));
  const add = () => onRowsChange?.([...rows, { id: `row-${Date.now()}`, value: "" }]);
  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[idx], next[target]] = [next[target], next[idx]];
    onRowsChange?.(next);
  };

  return (
    <div className={cn("w-full max-w-sm space-y-2", className)} {...props}>
      <style>{`@keyframes faIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label} · {rows.length}</p>
      {rows.map((row, idx) => (
        <div key={row.id} className="flex items-center gap-1.5 animate-[faIn_0.25s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 40}ms` }}>
          <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">{idx + 1}</span>
          <input
            value={row.value}
            onChange={(e) => update(idx, e.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 rounded-md border border-input bg-background px-2.5 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
          />
          <button onClick={() => move(idx, -1)} disabled={idx === 0} className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none" aria-label="Yukarı taşı">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6" /></svg>
          </button>
          <button onClick={() => move(idx, 1)} disabled={idx === rows.length - 1} className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none" aria-label="Aşağı taşı">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          <button onClick={() => remove(idx)} disabled={rows.length <= 1} className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none" aria-label="Satırı sil">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
      ))}
      <button
        onClick={add}
        disabled={rows.length >= maxRows}
        className="w-full rounded-md border border-dashed border-border py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
      >
        + Satır ekle
      </button>
    </div>
  );
}
