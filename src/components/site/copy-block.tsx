"use client";

import * as React from "react";

export function CopyBlock({ name }: { name: string }) {
  const [state, setState] = React.useState<"idle" | "copied" | "error">("idle");
  const code = `npx bigbullui add ${name}`;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      setState("error");
    }
    window.setTimeout(() => setState("idle"), 1500);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="cursor-pointer rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
    >
      {state === "copied" ? "Copied block" : state === "error" ? "Copy failed" : "Copy block"}
    </button>
  );
}
