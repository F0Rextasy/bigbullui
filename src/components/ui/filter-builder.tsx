"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface FilterRule {
  id: string;
  field: string;
  op: string;
  value: string;
}

export interface FilterBuilderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  initial?: FilterRule[];
  onChange?: (rules: FilterRule[]) => void;
}

const FIELDS = ["Section", "Tier", "Status", "Gate"];
const OPS = ["is", "is not", "contains"];

/** Rule list builder with add and remove stamps. */
export function FilterBuilder({ initial = [{ id: "1", field: "Tier", op: "is", value: "VIP" }], onChange, className, ...props }: FilterBuilderProps) {
  const [rules, setRules] = React.useState<FilterRule[]>(initial);
  const update = (next: FilterRule[]) => { setRules(next); onChange?.(next); };
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <div className="flex items-center justify-between border-b border-dashed border-border pb-2">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Filter builder</p>
        <button
          type="button"
          onClick={() => update([...rules, { id: String(Date.now()), field: FIELDS[0], op: OPS[0], value: "" }])}
          className="rounded border border-foreground bg-primary px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-primary-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Add rule
        </button>
      </div>
      <ul className="mt-2 space-y-2">
        {rules.map((r, i) => (
          <li key={r.id} className="flex flex-wrap items-center gap-1.5 rounded-md border border-dashed border-border bg-secondary/30 p-2">
            <span className="font-mono text-[10px] font-bold uppercase text-accent">{i === 0 ? "Where" : "And"}</span>
            <select value={r.field} onChange={(e) => update(rules.map((x) => (x.id === r.id ? { ...x, field: e.target.value } : x)))} aria-label="Filter field" className="rounded border border-border bg-card px-1.5 py-1 font-mono text-[11px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {FIELDS.map((f) => <option key={f}>{f}</option>)}
            </select>
            <select value={r.op} onChange={(e) => update(rules.map((x) => (x.id === r.id ? { ...x, op: e.target.value } : x)))} aria-label="Filter operator" className="rounded border border-border bg-card px-1.5 py-1 font-mono text-[11px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              {OPS.map((o) => <option key={o}>{o}</option>)}
            </select>
            <input value={r.value} onChange={(e) => update(rules.map((x) => (x.id === r.id ? { ...x, value: e.target.value } : x)))} placeholder="Value" aria-label="Filter value" className="w-24 rounded border border-border bg-card px-1.5 py-1 font-mono text-[11px] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            <button type="button" onClick={() => update(rules.filter((x) => x.id !== r.id))} aria-label={`Remove rule ${i + 1}`} className="rounded border border-destructive/50 px-1.5 py-0.5 font-mono text-[11px] text-destructive hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">X</button>
          </li>
        ))}
      </ul>
      {rules.length === 0 && <p className="mt-2 font-mono text-[11px] uppercase text-muted-foreground">No rules, showing all stubs.</p>}
    </div>
  );
}
