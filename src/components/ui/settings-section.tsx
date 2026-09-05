"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SettingsSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  rows?: { label: string; control: React.ReactNode }[];
  onSave?: () => void;
}

/** Settings section panel: title + description + setting rows + save. */
export function SettingsSection({ title, description, rows = [], onSave, className, children, ...props }: SettingsSectionProps) {
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    onSave?.();
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <section className={cn("w-full max-w-xl rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`
        @keyframes setIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes setStamp { 0% { transform: scale(0.7); opacity: 0; } 70% { transform: scale(1.12); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>

      <div className="divide-y divide-border/60">
        {rows.map((row, idx) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3 animate-[setIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 50}ms` }}>
            <span className="text-sm text-foreground">{row.label}</span>
            <div className="shrink-0">{row.control}</div>
          </div>
        ))}
      </div>

      {(children || rows.length > 0) && (
        <div className="flex items-center justify-end gap-3 border-t border-border px-4 py-3">
          {saved && (
            <span className="inline-block animate-[setStamp_0.3s_ease-out] motion-reduce:animate-none font-mono text-[10px] uppercase tracking-wider text-emerald-600">
              ✓ Kaydedildi
            </span>
          )}
          <button
            onClick={handleSave}
            className={cn(
              "rounded-md bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground",
              "transition-all duration-150 hover:bg-accent/90 active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            )}
          >
            Kaydet
          </button>
        </div>
      )}
      {children}
    </section>
  );
}
