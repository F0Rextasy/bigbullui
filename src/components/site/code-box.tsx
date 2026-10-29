"use client";

import * as React from "react";
import { CopyButton } from "@/components/ui/copy-button";

export function CodeBox({ code, maxHeight, block }: { code: string; maxHeight?: string; block?: boolean }) {
  if (!block) {
    return (
      <span className="relative inline-flex min-w-0 max-w-full items-center gap-2 overflow-hidden rounded-md border-2 border-dashed border-foreground/30 bg-card px-3 py-2">
        <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-foreground">{code}</code>
        <CopyButton value={code} />
      </span>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-md border-2 border-dashed border-foreground/30 bg-card">
      <div className="flex items-center justify-end px-3 pt-3">
        <CopyButton value={code} />
      </div>
      <pre
        tabIndex={0}
        role="region"
        aria-label="Code sample, scrollable"
        className="overflow-x-auto p-4 pt-2 font-mono text-[13px] leading-relaxed text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
