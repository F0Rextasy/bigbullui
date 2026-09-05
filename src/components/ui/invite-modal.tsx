"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { Input } from "./input";
import { Button } from "./button";

export interface InviteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roles?: string[];
  onSend?: (email: string, role: string) => void;
}

/** Davet modalı: e-posta + rol seçimi + gönderme durumu. */
export function InviteModal({ open, onOpenChange, roles = ["admin", "editor", "member"], onSend }: InviteModalProps) {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState(roles[roles.length - 1]);
  const [sent, setSent] = React.useState(false);
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => onOpenChange(false)}>
      <style>{`
        @keyframes invScale { from { opacity: 0; transform: scale(0.95) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `}</style>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Ekip üyesi davet et"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-lg border border-border bg-card p-5 shadow-lg animate-[invScale_0.25s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none"
      >
        {!sent ? (
          <>
            <h3 className="text-sm font-semibold">Ekip üyesi davet et</h3>
            <p className="mt-1 text-xs text-muted-foreground">Davet e-postası anında gönderilir.</p>
            <div className="mt-4 space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yeni@uye.com"
                aria-label="Davet e-postası"
              />
              <div className="flex gap-1.5" role="radiogroup" aria-label="Rol">
                {roles.map((r) => (
                  <button
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
              <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>Vazgeç</Button>
              <Button
                size="sm"
                disabled={!valid}
                onClick={() => { onSend?.(email, role); setSent(true); setTimeout(() => { setSent(false); setEmail(""); onOpenChange(false); }, 1500); }}
              >
                Davet gönder
              </Button>
            </div>
          </>
        ) : (
          <div className="py-8 text-center">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500 animate-[invScale_0.3s_cubic-bezier(0.34,1.56,0.64,1)_both] motion-reduce:animate-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
            </span>
            <p className="mt-3 text-sm font-medium">Davet gönderildi</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        )}
      </div>
    </div>
  );
}
