"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ColorToken {
  name: string;
  value: string;
  /** CSS var adı, örn. --accent */
  cssVar?: string;
  usage?: string;
}

export interface ColorTokenTableProps extends React.HTMLAttributes<HTMLDivElement> {
  tokens: ColorToken[];
}

/** Tema token tablosu: renk örneği + değer + kopyala. */
export function ColorTokenTable({ tokens, className, ...props }: ColorTokenTableProps) {
  const [copied, setCopied] = React.useState<string | null>(null);

  const copy = (token: ColorToken) => {
    try { void navigator.clipboard?.writeText(token.cssVar ?? token.value); } catch { /* yoksay */ }
    setCopied(token.name);
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div className={cn("w-full max-w-md overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes ctRow { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }`}</style>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/60 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            <th className="px-3 py-2 text-left font-medium">Token</th>
            <th className="px-3 py-2 text-left font-medium">Değer</th>
            <th className="px-3 py-2 text-right font-medium">Kopyala</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, idx) => (
            <tr key={token.name} className="border-b border-border/40 last:border-0 animate-[ctRow_0.3s_ease-out_both] motion-reduce:animate-none transition-colors hover:bg-secondary/30 motion-reduce:transition-none" style={{ animationDelay: `${idx * 40}ms` }}>
              <td className="px-3 py-2">
                <span className="flex items-center gap-2">
                  <span
                    className="size-5 shrink-0 rounded-sm border border-border"
                    style={{ background: token.cssVar ? `var(${token.cssVar})` : token.value }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs">{token.name}</span>
                </span>
              </td>
              <td className="px-3 py-2">
                <code className="font-mono text-xs text-muted-foreground">{token.value}</code>
              </td>
              <td className="px-3 py-2 text-right">
                <button
                  onClick={() => copy(token)}
                  className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm motion-reduce:transition-none"
                  aria-label={`${token.name} kopyala`}
                >
                  {copied === token.name ? "✓" : "KOPYALA"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
