"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ApiTesterProps extends React.HTMLAttributes<HTMLDivElement> {
  onSend?: (method: string, url: string) => void;
}

/** API tester stub: method picker plus URL bar with fake latency. */
export function ApiTester({ onSend, className, ...props }: ApiTesterProps) {
  const [method, setMethod] = React.useState("GET");
  const [url, setUrl] = React.useState("/api/stubs");
  const [status, setStatus] = React.useState<string | null>(null);
  const send = () => { setStatus("200 · 42ms"); onSend?.(method, url); };
  return (
    <div className={cn("w-full max-w-lg rounded-lg border border-border bg-card p-3", className)} {...props}>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">API tester</span>
      <div className="mt-2 flex gap-1.5">
        <div className="flex shrink-0 gap-0.5 rounded-md border border-dashed border-border p-0.5" role="group" aria-label="Method">
          {["GET", "POST"].map((m) => (
            <button key={m} type="button" aria-pressed={method === m} onClick={() => setMethod(m)} className={cn("rounded px-2 py-1 font-mono text-[10px] font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", method === m ? "bg-accent text-accent-foreground" : "text-muted-foreground")}>{m}</button>
          ))}
        </div>
        <input value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} aria-label="Request URL" className="min-w-0 flex-1 rounded-md border border-dashed border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        <button type="button" onClick={send} className="shrink-0 rounded-md bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Send</button>
      </div>
      {status && <p className="mt-2 rounded border border-dashed border-emerald-500/50 bg-emerald-500/10 px-2 py-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-400" role="status">{method} {url} → {status}</p>}
    </div>
  );
}
