"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Role {
  id: string;
  label: string;
}

export interface Permission {
  id: string;
  label: string;
}

export interface PermissionsMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  roles: Role[];
  permissions: Permission[];
  /** başlangıç yetki haritası: roleId -> permissionId[] */
  value?: Record<string, string[]>;
  onValueChange?: (value: Record<string, string[]>) => void;
}

/** Roller × izinler matrisi; hücre tıklaması yetkiyi açar/kapar. */
export function PermissionsMatrix({ roles, permissions, value, onValueChange, className, ...props }: PermissionsMatrixProps) {
  const [internal, setInternal] = React.useState<Record<string, string[]>>(() => {
    if (value) return value;
    const map: Record<string, string[]> = {};
    for (const r of roles) map[r.id] = [];
    return map;
  });
  React.useEffect(() => { if (value) setInternal(value); }, [value]);

  const toggle = (roleId: string, permId: string) => {
    const next = { ...internal };
    const list = next[roleId] ?? [];
    next[roleId] = list.includes(permId) ? list.filter((p) => p !== permId) : [...list, permId];
    setInternal(next);
    onValueChange?.(next);
  };

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)} {...props}>
      <style>{`@keyframes permPop { 0% { transform: scale(0.6); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }`}</style>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60">
              <th className="px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">İzin</th>
              {roles.map((r) => (
                <th key={r.id} className="px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{r.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, rowIdx) => (
              <tr key={perm.id} className="border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/30 motion-reduce:transition-none">
                <td className="px-3 py-2 text-foreground" style={{ animation: undefined }}>{perm.label}</td>
                {roles.map((role) => {
                  const checked = (internal[role.id] ?? []).includes(perm.id);
                  return (
                    <td key={role.id} className="px-3 py-2 text-center">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={checked}
                        aria-label={`${role.label}: ${perm.label}`}
                        onClick={() => toggle(role.id, perm.id)}
                        className={cn(
                          "inline-flex size-5 items-center justify-center rounded-sm border transition-all duration-150",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
                          checked
                            ? "border-accent bg-accent text-accent-foreground animate-[permPop_0.2s_ease-out] motion-reduce:animate-none"
                            : "border-border bg-background hover:border-foreground/40"
                        )}
                      >
                        {checked && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
