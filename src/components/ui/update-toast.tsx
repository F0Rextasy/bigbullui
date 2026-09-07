"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface UpdateToastProps extends React.HTMLAttributes<HTMLDivElement> {
  version?: string;
  onReload?: () => void;
}

/** Update toast stub: version stamp with reload action. */
export function UpdateToast({ version = "v2.4.0", onReload, className, ...props }: UpdateToastProps) {
  const [hidden, setHidden] = React.useState(false);
  if (hidden) return null;
  return (
    <div className={cn("flex w-full max-w-sm items-center gap-2 rounded-lg border border-accent/50 bg-card p-3 shadow-md", className)} role="status" {...props}>
      <span className="rounded bg-accent px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-accent-foreground">New</span>
      <p className="min-w-0 flex-1 font-mono text-[11px] text-foreground">Update ready · {version}</p>
      <button type="button" onClick={() => { onReload?.(); setHidden(true); }} className="rounded-md bg-primary px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Reload</button>
      <button type="button" aria-label="Dismiss update" onClick={() => setHidden(true)} className="rounded px-1 font-mono text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">×</button>
    </div>
  );
}
