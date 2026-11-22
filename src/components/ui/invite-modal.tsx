"use client";

import * as React from "react";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";
import { cn } from "./lib/utils";
export interface InviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roles?: string[];
  onSend?: (email: string, role: string) => void;
}

/** Team member invite modal: email + role selector + dispatch state. */
export function InviteModal({ open, onOpenChange, roles = ["admin", "editor", "member"], onSend }: InviteModalProps) {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState(roles[roles.length - 1]);
  const [sent, setSent] = React.useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);

  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => onOpenChangeRef.current(false));
    const handleKeyDown = (event: KeyboardEvent) => {
      if (panelRef.current) trapFocus(panelRef.current, event);
    };
    document.addEventListener("keydown", handleKeyDown);
    if (panelRef.current) {
      const focusables = getFocusable(panelRef.current);
      (focusables[0] ?? panelRef.current).focus();
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      releaseEscape();
      releaseScroll();
      restoreRef.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={() => onOpenChange(false)} aria-hidden="true" />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Invite team member"
        className="relative z-10 w-full max-w-sm rounded-lg border border-border bg-card p-5 shadow-lg animate-[invScale_0.25s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none focus:outline-none"
      >
        {!sent ? (
          <>
            <h3 className="text-sm font-semibold">Invite team member</h3>
            <p className="mt-1 text-xs text-muted-foreground">An invitation email will be dispatched immediately.</p>
            <div className="mt-4 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@example.com"
                aria-label="Invitation email"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <div className="flex gap-1.5" role="radiogroup" aria-label="Role">
                {roles.map((r) => (
                  <button
                    type="button"
                    key={r}
                    role="radio"
                    aria-checked={role === r}
                    onClick={() => setRole(r)}
                    className={cn(
                      "flex-1 rounded-md border px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-150 motion-reduce:transition-none",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      role === r ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-foreground/40"
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!valid}
                onClick={() => {
                  onSend?.(email, role);
                  setSent(true);
                  if (timerRef.current) clearTimeout(timerRef.current);
                  timerRef.current = setTimeout(() => {
                    setSent(false);
                    setEmail("");
                    onOpenChangeRef.current(false);
                  }, 1500);
                }}
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
              >
                Send Invite
              </button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-success/15 text-success animate-[invScale_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both] motion-reduce:animate-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
            </span>
            <p className="mt-3 text-sm font-medium">Invitation sent</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
