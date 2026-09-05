"use client";

import * as React from "react";
import { cn } from "./lib/utils";
import { CopyButton } from "./copy-button";

export interface SnippetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  filename?: string;
}

/** Kod parçası kartı: dil rozeti + kopyala butonu + dashed çerçeve. */
export function SnippetCard({ code, language = "ts", filename, className, ...props }: SnippetCardProps) {
  return (
    <div className={cn("group w-full overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes snIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-accent">{language}</span>
          {filename && <span className="font-mono text-[10px] text-muted-foreground">{filename}</span>}
        </div>
        <CopyButton value={code} />
      </div>
      <pre className="overflow-x-auto p-3 animate-[snIn_0.3s_ease-out_both] motion-reduce:animate-none">
        <code className="font-mono text-xs leading-5 text-foreground">{code}</code>
      </pre>
    </div>
  );
}
