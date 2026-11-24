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
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>

      <div className="divide-y divide-border/60">
        {rows.map((row, idx) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3 animate-[walletCardIn_0.3s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 50}ms` }}>
            <span className="text-sm text-foreground">{row.label}</span>
            <div className="shrink-0">{row.control}</div>
          </div>
        ))}
      </div>

      {(children || rows.length > 0) && (
        <div className="flex items-center justify-end gap-3 border-t border-border px-4 py-3">
          {saved && (
            <span className="inline-block animate-[gachaIn_0.3s_ease-out] motion-reduce:animate-none font-mono text-[10px] uppercase tracking-wider text-success">
              ✓ Saved
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            className={cn(
              "rounded-md bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground",
              "transition-[transform,opacity,background-color,border-color,color] duration-150 hover:bg-accent/90 active:scale-[0.97] motion-reduce:active:scale-100",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
            )}
          >
            Save
          </button>
        </div>
      )}
      {children}
    </section>
  );
}
