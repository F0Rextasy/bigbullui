"use client";

import * as React from "react";

export function CopyBlock({ name }: { name: string }) {
  const [copied, setCopied] = React.useState(false);
  const code = `npx bigbullui add ${name}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="cursor-pointer rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
    >
      {copied ? "Copied block" : "Copy block"}
    </button>
  );
}
