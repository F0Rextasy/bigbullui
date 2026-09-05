"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type AuditAction = "create" | "update" | "delete" | "login" | "export";

export interface AuditEntry {
  id: string;
  actor: string;
  initials: string;
  action: AuditAction;
  target: string;
  time: string;
  ip?: string;
}

export interface AuditLogProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: AuditEntry[];
  /** Shows all actions if omitted */
  filter?: AuditAction | "all";
}

const ACTION_TONE: Record<AuditAction, string> = {
  create: "border-emerald-500/50 bg-emerald-500/10 text-emerald-600",
  update: "border-amber-500/50 bg-amber-500/10 text-amber-600",
  delete: "border-destructive/50 bg-destructive/10 text-destructive",
  login: "border-accent/50 bg-accent/10 text-accent",
  export: "border-border bg-secondary text-muted-foreground",
};

const ACTION_LABEL: Record<AuditAction, string> = {
  create: "CREATED",
  update: "UPDATED",
  delete: "DELETED",
  login: "LOGIN",
  export: "EXPORTED",
};

/** Audit log: actor + action + timestamp + IP with status tones. */
export function AuditLog({ entries, filter = "all", className, ...props }: AuditLogProps) {
  const visible = filter === "all" ? entries : entries.filter((e) => e.action === filter);

  return (
    <div className={cn("w-full max-w-md space-y-1.5", className)} {...props}>
      <style>{`@keyframes auditIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {visible.map((e, idx) => (
        <div
          key={e.id}
          className="flex items-start gap-3 rounded-md border border-border bg-card px-3 py-2.5 animate-[auditIn_0.3s_ease-out_both] motion-reduce:animate-none transition-colors hover:border-foreground/30 motion-reduce:transition-none"
          style={{ animationDelay: `${idx * 45}ms` }}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-secondary font-mono text-[10px] font-bold text-secondary-foreground">
            {e.initials}
          </span>
          <div className="min-w-0 flex-1 text-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-medium">{e.actor}</span>
              <span className={cn("rounded-full border px-1.5 py-px font-mono text-[8px] uppercase tracking-wider", ACTION_TONE[e.action])}>
                {ACTION_LABEL[e.action]}
              </span>
              <span className="truncate text-muted-foreground">{e.target}</span>
            </div>
            <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
              {e.time}{e.ip ? ` · ${e.ip}` : ""}
            </p>
          </div>
        </div>
      ))}
      {visible.length === 0 && (
        <p className="rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground">No audit records found.</p>
      )}
    </div>
  );
}
