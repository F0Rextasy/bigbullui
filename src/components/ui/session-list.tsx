"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current?: boolean;
  icon?: "desktop" | "mobile" | "tablet";
}

export interface SessionListProps extends React.HTMLAttributes<HTMLDivElement> {
  sessions: Session[];
  onRevoke?: (id: string) => void;
}

/** Active login sessions: device + location + activity + revoke. */
export function SessionList({ sessions, onRevoke, className, ...props }: SessionListProps) {
  const [revoked, setRevoked] = React.useState<string[]>([]);

  const deviceIcon = (icon?: Session["icon"]) => {
    const paths: Record<string, React.ReactNode> = {
      desktop: <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
      mobile: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
      tablet: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M10 18h4" /></>,
    };
    return paths[icon ?? "desktop"] ?? paths.desktop;
  };

  const visible = sessions.filter((s) => !revoked.includes(s.id));

  return (
    <div className={cn("w-full max-w-md space-y-2", className)} {...props}>
      <style>{`@keyframes sessionSlide { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes sessionOut { to { opacity: 0; transform: translateX(24px); } }`}</style>
      {visible.map((s, idx) => (
        <div
          key={s.id}
          className={cn(
            "flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5",
            "animate-[sessionSlide_0.3s_ease-out_both] motion-reduce:animate-none",
            "transition-colors duration-200 hover:border-foreground/30 motion-reduce:transition-none",
            s.current && "border-accent/50"
          )}
          style={{ animationDelay: `${idx * 60}ms` }}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {deviceIcon(s.icon)}
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-medium">{s.device}</span>
              {s.current && (
                <span className="rounded-full border border-accent/60 bg-accent/10 px-1.5 py-px font-mono text-[8px] uppercase tracking-wider text-accent">
                  Bu cihaz
                </span>
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground">{s.location} · {s.lastActive}</p>
          </div>
          {!s.current && (
            <button
              onClick={() => { setRevoked((r) => [...r, s.id]); onRevoke?.(s.id); }}
              className="shrink-0 rounded-sm border border-dashed border-border px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-destructive hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              aria-label={`${s.device} oturumunu kapat`}
            >
              REVOKE
            </button>
          )}
        </div>
      ))}
      {visible.length === 0 && (
        <p className="rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          All other active sessions revoked.
        </p>
      )}
    </div>
  );
}
