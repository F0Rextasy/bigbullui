"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CodeTabsTab {
  id: string;
  label: string;
  code: string;
  language?: string;
}

export interface CodeTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onCopy"> {
  tabs: CodeTabsTab[];
  defaultTab?: string;
  onCopy?: (code: string, tabId: string) => void;
}

export function CodeTabs({ tabs, defaultTab, onCopy, className, ...props }: CodeTabsProps) {
  const [active, setActive] = React.useState(defaultTab ?? tabs[0]?.id ?? "");
  const [copied, setCopied] = React.useState(false);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  const copy = async () => {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.code);
    } catch {
      /* clipboard unavailable */
    }
    onCopy?.(current.code, current.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  if (!current) {
    return <div className={cn("w-full", className)} {...props} />;
  }

  return (
    <div className={cn("w-full overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <div className="flex items-center justify-between gap-2 border-b border-dashed border-border px-2 pt-2">
        <div role="tablist" aria-label="Code variants" className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === active}
              onClick={() => setActive(t.id)}
              className={cn(
                "cursor-pointer rounded-t-md border border-b-0 px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                t.id === active
                  ? "border-border bg-secondary font-bold"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="mb-1 shrink-0 cursor-pointer rounded border border-border px-2 py-1 font-mono text-[10px] uppercase transition-colors hover:border-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
        <code>
          {current.code.split("\n").map((line, i) => (
            <span key={i} className="block">
              <span aria-hidden className="me-3 inline-block w-6 select-none text-right text-muted-foreground/50">
                {i + 1}
              </span>
              {line || " "}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
