"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InviteTeamProps extends React.HTMLAttributes<HTMLDivElement> {
  onInvite?: (email: string, role: string) => void;
}

/** Invite team stub: email plus role chip picker with sent log. */
export function InviteTeam({ onInvite, className, ...props }: InviteTeamProps) {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("Member");
  const [sent, setSent] = React.useState<string[]>([]);
  const invite = () => { if (!email.includes("@")) return; setSent((s) => [...s, email]); onInvite?.(email, role); setEmail(""); };
  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Invite team</span>
      <div className="mt-2 flex gap-1.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") invite(); }}
          placeholder="teammate@arena.com"
          aria-label="Teammate email"
          className="min-w-0 flex-1 rounded-md border border-dashed border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button type="button" onClick={invite} className="shrink-0 rounded-md bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Invite</button>
      </div>
      <div className="mt-2 flex gap-1.5" role="group" aria-label="Role">
        {["Admin", "Member", "Viewer"].map((r) => (
          <button
            key={r}
            type="button"
            aria-pressed={role === r}
            onClick={() => setRole(r)}
            className={cn("rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", role === r ? "border-accent bg-accent/10 text-accent" : "border-dashed border-border text-muted-foreground")}
          >
            {r}
          </button>
        ))}
      </div>
      {sent.length > 0 && (
        <ul className="mt-2 space-y-1">
          {sent.map((s) => (
            <li key={s} className="font-mono text-[11px] text-muted-foreground">Sent to {s} as {role}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
