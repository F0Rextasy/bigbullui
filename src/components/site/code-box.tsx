"use client";

import * as React from "react";
import { CopyButton } from "@/components/ui/copy-button";

export function CodeBox({ code, maxHeight, block }: { code: string; maxHeight?: string; block?: boolean }) {
  const [torn, setTorn] = React.useState(false);
  const timerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const tearCopy = React.useCallback(() => {
    setTorn(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setTorn(false), 900);
  }, []);

  if (!block) {
    return (
      <span className="relative inline-flex min-w-0 max-w-full items-center gap-2 overflow-hidden rounded-md border-2 border-dashed border-foreground/30 bg-card px-3 py-2">
        <code className="min-w-0 flex-1 truncate font-mono text-[13px] text-foreground">{code}</code>
        <span onClickCapture={tearCopy}>
          <CopyButton value={code} />
        </span>
        {torn ? (
          <span className="pointer-events-none absolute -right-2 -top-3 rotate-[-8deg] rounded-sm border-2 border-accent bg-card px-1.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest text-accent">
            Copied
          </span>
        ) : null}
      </span>
    );
  }
  return (
    <div className="relative overflow-hidden rounded-md border-2 border-dashed border-foreground/30 bg-card">
      <div className="flex items-center justify-end px-3 pt-3" onClickCapture={tearCopy}>
        <CopyButton value={code} />
      </div>
      {torn ? (
        <span className="pointer-events-none absolute right-3 top-2 rotate-[-8deg] rounded-sm border-2 border-accent bg-card px-2 py-0.5 font-mono text-[11px] font-black uppercase tracking-widest text-accent">
          Copied
        </span>
      ) : null}
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
