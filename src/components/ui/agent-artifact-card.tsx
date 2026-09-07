"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AgentArtifactCardProps extends React.HTMLAttributes<HTMLDivElement> {
  kind?: string;
  title?: string;
  snippet?: string;
  version?: string;
  onOpen?: () => void;
  onCopy?: () => void;
}

/** Framed agent output card with kind stamp, snippet and copy/open actions. */
export function AgentArtifactCard({
  kind = "STUB",
  title = "Main stage seating map",
  snippet = "Section A · Rows 1-12 · 240 seats verified for print.",
  version = "V3",
  onOpen,
  onCopy,
  className,
  ...props
}: AgentArtifactCardProps) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        void navigator.clipboard.writeText(snippet);
      }
    } catch {
      // clipboard unavailable
    }
    setCopied(true);
    onCopy?.();
    window.setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card", className)} {...props}>
      <div className="flex items-center gap-2 border-b border-dashed border-border px-3 py-2">
        <span className="rotate-[-4deg] rounded border-2 border-accent px-1.5 py-px font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
          {kind}
        </span>
        <p className="truncate text-xs font-bold text-foreground">{title}</p>
        <span className="ml-auto shrink-0 font-mono text-[10px] text-muted-foreground">{version}</span>
      </div>
      <div className="m-3 rounded border border-dashed border-border bg-background p-2.5">
        <p className="font-mono text-xs leading-5 text-foreground">{snippet}</p>
      </div>
      <div className="flex items-center gap-2 px-3 pb-3">
        <button
          type="button"
          onClick={copy}
          className="cursor-pointer rounded border border-border bg-card px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          type="button"
          onClick={() => onOpen?.()}
          className="cursor-pointer rounded border-2 border-foreground bg-primary px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open
        </button>
      </div>
    </div>
  );
}
