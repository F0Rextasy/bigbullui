"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface EnvVar {
  key: string;
  value: string;
  secret?: boolean;
}

export interface EnvEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  vars?: EnvVar[];
  onChange?: (vars: EnvVar[]) => void;
}

/** Environment variable editor: secret masking + add/remove keys. */
export function EnvEditor({ vars: varsProp, onChange, className, ...props }: EnvEditorProps) {
  const [vars, setVars] = React.useState<EnvVar[]>(varsProp ?? [
    { key: "DATABASE_URL", value: "postgres://…", secret: true },
    { key: "PORT", value: "3000" },
  ]);
  const [revealed, setRevealed] = React.useState<Set<number>>(new Set());

  const emit = (next: EnvVar[]) => { setVars(next); onChange?.(next); };

  const update = (idx: number, patch: Partial<EnvVar>) => {
    emit(vars.map((v, i) => (i === idx ? { ...v, ...patch } : v)));
  };

  const remove = (idx: number) => emit(vars.filter((_, i) => i !== idx));
  const add = () => emit([...vars, { key: `NEW_${vars.length + 1}`, value: "" }]);

  return (
    <div className={cn("w-full max-w-md space-y-2", className)} {...props}>
      <style>{`@keyframes evIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {vars.map((v, idx) => {
        const shown = !v.secret || revealed.has(idx);
        return (
          <div key={idx} className="flex items-center gap-2 animate-[evIn_0.25s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 40}ms` }}>
            <input
              value={v.key}
              onChange={(e) => update(idx, { key: e.target.value.toUpperCase().replace(/\s+/g, "_") })}
              aria-label="Variable name"
              className="w-32 shrink-0 rounded-md border border-input bg-secondary/40 px-2 py-1.5 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
              spellCheck={false}
            />
            <span className="shrink-0 font-mono text-xs text-muted-foreground" aria-hidden="true">=</span>
            <input
              type={shown ? "text" : "password"}
              value={v.value}
              onChange={(e) => update(idx, { value: e.target.value })}
              aria-label={`${v.key} value`}
              className="min-w-0 flex-1 rounded-md border border-input bg-background px-2 py-1.5 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
              spellCheck={false}
            />
            {v.secret && (
              <button
                onClick={() => setRevealed((prev) => { const n = new Set(prev); if (n.has(idx)) n.delete(idx); else n.add(idx); return n; })}
                className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
                aria-label={shown ? "Hide" : "Show"}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  {shown ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M1 1l22 22" /></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                </svg>
              </button>
            )}
            <button
              onClick={() => remove(idx)}
              className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              aria-label={`Delete ${v.key} row`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
        );
      })}
      <button
        onClick={add}
        className="w-full rounded-md border border-dashed border-border py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
      >
        + Add variable
      </button>
    </div>
  );
}
