"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface LobbyPlayer {
  id: string;
  name: string;
  ready: boolean;
}

export interface MatchmakingLobbyProps extends React.HTMLAttributes<HTMLDivElement> {
  players?: LobbyPlayer[];
  searching?: boolean;
  onToggleReady?: (id: string) => void;
}

/** Matchmaking lobby: ready-check roster with search state. */
export function MatchmakingLobby({ players, searching = true, onToggleReady, className, ...props }: MatchmakingLobbyProps) {
  const fallback: LobbyPlayer[] = [
    { id: "p1", name: "ADA", ready: true },
    { id: "p2", name: "ROW C", ready: true },
    { id: "p3", name: "MAX", ready: false },
    { id: "p4", name: "REX", ready: false },
  ];
  const rows = players ?? fallback;
  const ready = rows.filter((p) => p.ready).length;
  return (
    <div role="group" aria-label="Matchmaking lobby" className={cn("w-full touch-none select-none rounded-md border-2 border-foreground bg-card p-3", className)} style={{ touchAction: "none" }} {...props}>
      <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
        <span className="text-muted-foreground">Lobby</span>
        <span className="tabular-nums text-foreground" role="status">{ready}/{rows.length} ready</span>
      </div>
      <div className="mt-2 space-y-1.5">
        {rows.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onToggleReady?.(p.id)}
            aria-pressed={p.ready}
            aria-label={`${p.name} ${p.ready ? "ready" : "not ready"}`}
            className={cn(
              "flex min-h-11 w-full touch-none items-center justify-between rounded-md border px-2.5 font-mono text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              p.ready ? "border-emerald-600/60 bg-emerald-500/10" : "border-dashed border-border bg-background"
            )}
            style={{ touchAction: "none" }}
          >
            <span className="uppercase text-foreground">{p.name}</span>
            <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-black", p.ready ? "bg-emerald-500 text-white" : "bg-secondary text-muted-foreground")}>
              {p.ready ? "READY" : "WAIT"}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground" role="status">
        {searching ? "Searching match..." : "Match found"}
      </p>
    </div>
  );
}
