"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PropField {
  name: string;
  type: string;
  control: "text" | "number" | "toggle" | "select";
  options?: string[];
  defaultValue?: string | number | boolean;
}

export interface DocsPropPlaygroundProps extends React.HTMLAttributes<HTMLDivElement> {
  componentName?: string;
  fields?: PropField[];
  renderPreview?: (values: Record<string, string | number | boolean>) => React.ReactNode;
}

const FALLBACK_FIELDS: PropField[] = [
  { name: "label", type: "string", control: "text", defaultValue: "ADMIT ONE" },
  { name: "count", type: "number", control: "number", defaultValue: 2 },
  { name: "vip", type: "boolean", control: "toggle", defaultValue: true },
  { name: "tone", type: "enum", control: "select", options: ["paper", "night", "stamp"], defaultValue: "paper" },
];

/** Docs prop playground editing props with live preview. */
export function DocsPropPlayground({ componentName = "TicketCard", fields = FALLBACK_FIELDS, renderPreview, className, ...props }: DocsPropPlaygroundProps) {
  const [values, setValues] = React.useState<Record<string, string | number | boolean>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""]))
  );
  const set = (name: string, v: string | number | boolean) => setValues((prev) => ({ ...prev, [name]: v }));
  return (
    <div className={cn("grid w-full gap-3 rounded-lg border-2 border-foreground bg-card p-4 shadow-md md:grid-cols-2", className)} {...props}>
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{componentName} props</p>
        <div className="mt-2 space-y-2">
          {fields.map((f) => (
            <label key={f.name} className="flex items-center justify-between gap-2 rounded-md border border-dashed border-border px-2 py-1.5 font-mono text-[11px]">
              <span className="font-bold uppercase text-foreground">{f.name} <span className="font-normal normal-case text-muted-foreground">{f.type}</span></span>
              {f.control === "toggle" ? (
                <button type="button" role="switch" aria-checked={Boolean(values[f.name])} onClick={() => set(f.name, !values[f.name])} className={cn("rounded border px-2 py-0.5 font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", values[f.name] ? "border-foreground bg-primary text-primary-foreground" : "border-border text-muted-foreground")}>
                  {values[f.name] ? "On" : "Off"}
                </button>
              ) : f.control === "select" ? (
                <select value={String(values[f.name])} onChange={(e) => set(f.name, e.target.value)} className="rounded border border-border bg-card px-1.5 py-1 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {f.options?.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input type={f.control === "number" ? "number" : "text"} value={String(values[f.name])} onChange={(e) => set(f.name, f.control === "number" ? Number(e.target.value) : e.target.value)} className="w-28 rounded border border-border bg-secondary/40 px-1.5 py-1 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              )}
            </label>
          ))}
        </div>
      </div>
      <div className="flex min-h-32 items-center justify-center rounded-md border-2 border-dashed border-border bg-secondary/30 p-4">
        {renderPreview ? renderPreview(values) : <span className="rounded border-2 border-foreground bg-card px-4 py-2 font-mono text-sm font-black uppercase text-foreground">{String(values.label)} x{String(values.count)}{values.vip ? " VIP" : ""}</span>}
      </div>
    </div>
  );
}
