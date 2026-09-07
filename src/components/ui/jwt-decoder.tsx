"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface JwtDecoderProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultToken?: string;
}

function decodeSegment(seg: string): string {
  try {
    const padded = seg.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.stringify(JSON.parse(atob(padded)), null, 2);
  } catch {
    return "Invalid segment";
  }
}

/** JWT inspector splitting header, payload, signature. */
export function JwtDecoder({ defaultToken = "eyJhbGciOiJIUzI1NiJ9.eyJzZWN0aW9uIjoiQyIsInJvdyI6MTJ9.c2lnbmF0dXJl", className, ...props }: JwtDecoderProps) {
  const [token, setToken] = React.useState(defaultToken);
  const parts = token.split(".");
  const labels = ["Header", "Payload", "Signature"];
  return (
    <div className={cn("w-full rounded-lg border-2 border-foreground bg-card p-4 shadow-md", className)} {...props}>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">JWT decoder</p>
      <input
        value={token}
        onChange={(e) => setToken(e.target.value)}
        spellCheck={false}
        className="mt-2 w-full rounded-md border border-dashed border-border bg-secondary/40 p-2 font-mono text-[11px] text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="JWT token"
      />
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {labels.map((label, i) => (
          <div key={label} className="rounded-md border border-border bg-background p-2">
            <p className="font-mono text-[10px] font-bold uppercase text-accent">{label}</p>
            <pre className="mt-1 max-h-28 overflow-auto font-mono text-[11px] text-foreground">{parts[i] ? (i < 2 ? decodeSegment(parts[i]) : parts[i]) : "Missing"}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
