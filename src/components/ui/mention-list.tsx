"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MentionUser {
  id: string;
  name: string;
  initials: string;
  handle?: string;
}

export interface MentionListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onSelect"> {
  users: MentionUser[];
  onSelect?: (user: MentionUser) => void;
}

/** @bahsetme öneri paneli: arama sonuçları + baş harf avatarları. */
export function MentionList({ users, onSelect, className, ...props }: MentionListProps) {
  const [highlight, setHighlight] = React.useState(0);

  return (
    <ul
      className={cn("w-56 divide-y divide-border/60 rounded-md border border-border bg-card py-1 shadow-lg", className)}
      role="listbox"
      aria-label="Bahsetme önerileri"
      {...props}
    >
      <style>{`@keyframes mlIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {users.map((u, idx) => (
        <li key={u.id} role="option" aria-selected={idx === highlight}>
          <button
            onClick={() => onSelect?.(u)}
            onMouseEnter={() => setHighlight(idx)}
            className={cn(
              "flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring-inset",
              idx === highlight ? "bg-accent/10" : "hover:bg-secondary/50"
            )}
            style={{ animation: "mlIn 0.2s ease-out both", animationDelay: `${idx * 35}ms` }}
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-secondary font-mono text-[9px] font-bold">
              {u.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{u.name}</span>
              {u.handle && <span className="block truncate text-[11px] text-muted-foreground">{u.handle}</span>}
            </span>
            <span className="shrink-0 font-mono text-[10px] text-accent">@</span>
          </button>
        </li>
      ))}
      {users.length === 0 && <li className="px-3 py-3 text-center text-xs text-muted-foreground">Kullanıcı bulunamadı</li>}
    </ul>
  );
}
