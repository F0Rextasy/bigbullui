"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HtmlPreviewProps extends React.HTMLAttributes<HTMLIFrameElement> {
  html: string;
  title?: string;
  height?: string;
}

/** Sandboxed HTML önizleme iframe'i. */
export function HtmlPreview({ html, title = "HTML önizleme", height = "240px", className, ...props }: HtmlPreviewProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)} {...props}>
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">HTML önizleme</span>
        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-px font-mono text-[8px] uppercase tracking-wider text-emerald-600">sandbox</span>
      </div>
      <iframe
        title={title}
        srcDoc={html}
        sandbox="allow-scripts"
        style={{ height }}
        className="w-full border-0 bg-white"
      />
    </div>
  );
}
