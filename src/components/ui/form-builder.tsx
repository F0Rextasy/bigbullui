"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BuilderField {
  id: string;
  kind: "text" | "number" | "date";
  label: string;
}

export interface FormBuilderProps extends React.HTMLAttributes<HTMLDivElement> {
  onBuild?: (fields: BuilderField[]) => void;
}

/** Form builder: add, rename and remove fields with live count. */
export function FormBuilder({
  onBuild,
  className,
  ...props
}: FormBuilderProps) {
  const [fields, setFields] = React.useState<BuilderField[]>([
    { id: "f1", kind: "text", label: "Holder name" },
  ]);
  const add = (kind: BuilderField["kind"]) => {
    const next = [...fields, { id: `f${Date.now()}`, kind, label: `Field ${fields.length + 1}` }];
    setFields(next);
    onBuild?.(next);
  };
  return (
    <div className={cn("w-full max-w-sm rounded-lg border-2 border-foreground bg-card p-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Form builder</p>
        <span className="font-mono text-[11px] tabular-nums text-accent">{fields.length} fields</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {fields.map((f) => (
          <li key={f.id} className="flex items-center gap-1.5 rounded-md border border-dashed border-border px-2 py-1.5">
            <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase">{f.kind}</span>
            <input
              value={f.label}
              onChange={(e) => setFields((prev) => prev.map((p) => (p.id === f.id ? { ...p, label: e.target.value } : p)))}
              aria-label="Field label"
              className="min-w-0 flex-1 bg-transparent text-xs font-bold focus-visible:outline-none"
            />
            <button
              type="button"
              onClick={() => setFields((prev) => prev.filter((p) => p.id !== f.id))}
              aria-label={`Remove ${f.label}`}
              className="rounded px-1.5 font-mono text-xs text-muted-foreground hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-2.5 flex gap-1.5">
        {(["text", "number", "date"] as const).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => add(k)}
            className="flex-1 rounded-md border border-dashed border-border py-1.5 font-mono text-[11px] font-bold uppercase transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            + {k}
          </button>
        ))}
      </div>
    </div>
  );
}
