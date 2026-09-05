"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: "admin" | "editor" | "member";
  email?: string;
}

export interface TeamMembersProps extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamMember[];
  onInvite?: (email: string) => void;
  onRemove?: (id: string) => void;
}

/** Team member management panel: invite input + role badges + remove. */
export function TeamMembers({ members, onInvite, onRemove, className, ...props }: TeamMembersProps) {
  const [invite, setInvite] = React.useState("");
  const [list, setList] = React.useState(members);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invite);

  const add = () => {
    if (!valid) return;
    const id = `inv-${Date.now()}`;
    setList((l) => [...l, { id, name: invite.split("@")[0], initials: invite.slice(0, 2).toUpperCase(), role: "member", email: invite }]);
    onInvite?.(invite);
    setInvite("");
  };

  return (
    <div className={cn("w-full max-w-md rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`
        @keyframes teamIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes teamStamp { 0% { transform: scale(0.8); opacity: 0; } 70% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
      <div className="border-b border-border px-4 py-3">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Team Members · {list.length}</h3>
      </div>

      <ul className="divide-y divide-border/60">
        {list.map((m, idx) => (
          <li key={m.id} className="flex items-center gap-3 px-4 py-2.5 animate-[teamIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 45}ms` }}>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-secondary font-mono text-[10px] font-bold">
              {m.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{m.name}</p>
              {m.email && <p className="truncate text-xs text-muted-foreground">{m.email}</p>}
            </div>
            <span className={cn(
              "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider",
              m.role === "admin" ? "border-accent/60 bg-accent/10 text-accent" : m.role === "editor" ? "border-sky-500/50 bg-sky-500/10 text-sky-600" : "border-border bg-secondary text-secondary-foreground"
            )}>
              {m.role}
            </span>
            <button
              onClick={() => { setList((l) => l.filter((x) => x.id !== m.id)); onRemove?.(m.id); }}
              className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              aria-label={`Remove member ${m.name}`}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 border-t border-border p-3">
        <input
          value={invite}
          onChange={(e) => setInvite(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          placeholder="yeni@uye.com"
          aria-label="Invitation email"
          className="min-w-0 flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
        />
        <button
          onClick={add}
          disabled={!valid}
          className={cn(
            "shrink-0 rounded-md bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-accent-foreground",
            "transition-all duration-150 hover:bg-accent/90 active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
            "disabled:pointer-events-none disabled:opacity-40"
          )}
        >
          Davet et
        </button>
      </div>
      {invite.length > 0 && !valid && (
        <p className="px-4 pb-2 font-mono text-[9px] text-destructive animate-[teamStamp_0.2s_ease-out] motion-reduce:animate-none">Enter a valid email address</p>
      )}
    </div>
  );
}
