"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ProfileSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  email?: string;
  initials?: string;
  onSave?: (data: { name: string; email: string }) => void;
  onDelete?: () => void;
}

/** Profile settings page: avatar + personal info + danger zone. */
export function ProfileSettings({ name = "Ada Lovelace", email = "ada@mail.com", initials = "AL", onSave, onDelete, className, ...props }: ProfileSettingsProps) {
  const [n, setN] = React.useState(name);
  const [e, setE] = React.useState(email);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  return (
    <div className={cn("w-full max-w-md space-y-4", className)} {...props}>
      <style>{`@keyframes profIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <div className="flex items-center gap-4 animate-[profIn_0.3s_ease-out_both] motion-reduce:animate-none">
        <span className="flex size-16 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary font-mono text-lg font-bold text-secondary-foreground transition-transform duration-300 hover:scale-105 motion-reduce:transition-none">
          {initials}
        </span>
        <div>
          <p className="text-sm font-medium">{n}</p>
          <p className="text-xs text-muted-foreground">{e}</p>
          <button className="mt-1 font-mono text-[9px] uppercase tracking-wider text-accent hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm">
            Change avatar
          </button>
        </div>
      </div>

      <div className="space-y-3 rounded-lg border border-border bg-card p-4 animate-[profIn_0.3s_ease-out_0.1s_both] motion-reduce:animate-none">
        <div className="space-y-1">
          <label htmlFor="prof-name" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Ad Soyad</label>
          <input
            id="prof-name"
            value={n}
            onChange={(ev) => setN(ev.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="prof-email" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">E-posta</label>
          <input
            id="prof-email"
            type="email"
            value={e}
            onChange={(ev) => setE(ev.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none"
          />
        </div>
        <button
          onClick={() => onSave?.({ name: n, email: e })}
          className={cn(
            "rounded-md bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground",
            "transition-all duration-150 hover:bg-accent/90 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          )}
        >
          Kaydet
        </button>
      </div>

      {/* Danger zone */}
      <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 animate-[profIn_0.3s_ease-out_0.2s_both] motion-reduce:animate-none">
        <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-destructive">Danger Zone</h4>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Permanently delete your account. This action cannot be undone.</p>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="shrink-0 rounded-md border border-destructive/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-destructive transition-colors hover:bg-destructive hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive motion-reduce:transition-none"
            >
              Delete Account
            </button>
          ) : (
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="rounded-md border border-border px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
              >
                Cancel
              </button>
              <button
                onClick={() => { setConfirmDelete(false); onDelete?.(); }}
                className="rounded-md bg-destructive px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white transition-all duration-150 hover:bg-destructive/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive motion-reduce:transition-none"
              >
                Confirm
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
