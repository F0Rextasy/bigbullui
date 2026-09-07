"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Friend {
  id: string;
  name: string;
  online: boolean;
  level: number;
}

export interface FriendListProps extends React.HTMLAttributes<HTMLDivElement> {
  friends?: Friend[];
  onInvite?: (id: string) => void;
}

/** Friend list: presence roster with invite actions. */
export function FriendList({ friends, onInvite, className, ...props }: FriendListProps) {
  const fallback: Friend[] = [
    { id: "f1", name: "ADA BULL", online: true, level: 12 },
    { id: "f2", name: "ROW C", online: true, level: 9 },
    { id: "f3", name: "REX STUB", online: false, level: 21 },
  ];
  return (
    <div role="list" aria-label="Friend list" className={cn("w-full touch-none select-none space-y-1.5", className)} style={{ touchAction: "none" }} {...props}>
      {(friends ?? fallback).map((f) => (
        <div key={f.id} role="listitem" className="flex min-h-11 items-center gap-2.5 rounded-md border border-border bg-card px-2.5 py-1.5">
          <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-secondary font-mono text-[10px] font-black" aria-hidden="true">
            {f.name.slice(0, 1)}
            <span className={cn("absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-card", f.online ? "bg-emerald-500" : "bg-muted-foreground")} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate font-mono text-xs font-bold uppercase text-foreground">{f.name}</span>
            <span className="block font-mono text-[10px] text-muted-foreground">LV {f.level} · {f.online ? "ONLINE" : "OFFLINE"}</span>
          </span>
          <button
            type="button"
            disabled={!f.online}
            onClick={() => onInvite?.(f.id)}
            aria-label={`Invite ${f.name}`}
            className="min-h-11 shrink-0 touch-none rounded-md border border-foreground px-3 font-mono text-[11px] font-bold uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
            style={{ touchAction: "none" }}
          >
            Invite
          </button>
        </div>
      ))}
    </div>
  );
}
