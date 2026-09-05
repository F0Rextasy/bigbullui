"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type UserStatus = "active" | "invited" | "suspended";

export interface UserRow {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: "admin" | "editor" | "member" | "viewer";
  status: UserStatus;
}

export interface UserTableProps extends React.HTMLAttributes<HTMLDivElement> {
  users: UserRow[];
  onRemove?: (id: string) => void;
}

const ROLE_TONE: Record<UserRow["role"], string> = {
  admin: "border-accent/60 bg-accent/10 text-accent",
  editor: "border-sky-500/50 bg-sky-500/10 text-sky-600",
  member: "border-border bg-secondary text-secondary-foreground",
  viewer: "border-border/60 bg-transparent text-muted-foreground",
};

const STATUS_TONE: Record<UserStatus, string> = {
  active: "text-emerald-600",
  invited: "text-amber-600",
  suspended: "text-destructive",
};

const STATUS_LABEL: Record<UserStatus, string> = { active: "Aktif", invited: "Davetli", suspended: "Askıda" };

/** Kullanıcı yönetim tablosu: rol rozeti + durum + kaldırma eylemi. */
export function UserTable({ users, onRemove, className, ...props }: UserTableProps) {
  const [removed, setRemoved] = React.useState<string[]>([]);
  const visible = users.filter((u) => !removed.includes(u.id));

  return (
    <div className={cn("w-full max-w-2xl overflow-hidden rounded-lg border border-border", className)} {...props}>
      <style>{`
        @keyframes userRowIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes userRowOut { to { opacity: 0; transform: translateX(24px); } }
      `}</style>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/60 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              <th className="px-4 py-2.5 text-left font-medium">Kullanıcı</th>
              <th className="px-4 py-2.5 text-left font-medium">Rol</th>
              <th className="px-4 py-2.5 text-left font-medium">Durum</th>
              <th className="px-4 py-2.5 text-right font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((u, idx) => (
              <tr
                key={u.id}
                className="border-b border-border/50 last:border-0 animate-[userRowIn_0.3s_ease-out_both] motion-reduce:animate-none transition-colors hover:bg-secondary/30 motion-reduce:transition-none"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-secondary font-mono text-[10px] font-bold">
                      {u.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{u.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span className={cn("rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider", ROLE_TONE[u.role])}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className={cn("inline-flex items-center gap-1.5 text-xs", STATUS_TONE[u.status])}>
                    <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
                    {STATUS_LABEL[u.status]}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <button
                    onClick={() => { setRemoved((r) => [...r, u.id]); onRemove?.(u.id); }}
                    className="rounded-sm border border-dashed border-border px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-destructive hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
                    style={removed.includes(u.id) ? { animation: "userRowOut 0.25s ease-in both" } : undefined}
                  >
                    KALDIR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visible.length === 0 && (
        <p className="p-6 text-center text-sm text-muted-foreground">Tüm kullanıcılar kaldırıldı.</p>
      )}
    </div>
  );
}
