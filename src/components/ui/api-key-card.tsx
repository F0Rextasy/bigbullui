"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ApiKeyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  /** maskeli gösterilecek anahtar */
  apiKey?: string;
  onRegenerate?: () => void;
}

/** API anahtarı kartı: maskeli değer, göster/kopyala/yenile. */
export function ApiKeyCard({ label = "API Anahtarı", apiKey = "bb_live_a1b2c3d4e5f6g7h8i9j0", onRegenerate, className, ...props }: ApiKeyCardProps) {
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const masked = apiKey.slice(0, 8) + "•".repeat(Math.max(4, apiKey.length - 12)) + apiKey.slice(-4);

  const copy = () => {
    try { void navigator.clipboard?.writeText(apiKey); } catch { /* yoksay */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={cn("w-full max-w-md rounded-lg border border-border bg-card p-4", className)} {...props}>
      <style>{`
        @keyframes apiKeyIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes apiKeyStamp {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/50 bg-emerald-500/10 px-1.5 py-px font-mono text-[8px] uppercase tracking-wider text-emerald-600">
          <span className="size-1 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" /> Aktif
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-md border border-dashed border-border bg-secondary/30 px-3 py-2.5 animate-[apiKeyIn_0.3s_ease-out_both] motion-reduce:animate-none">
        <code className="min-w-0 flex-1 truncate font-mono text-xs text-foreground">
          {revealed ? apiKey : masked}
        </code>
        <button
          onClick={() => setRevealed((r) => !r)}
          className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
          aria-label={revealed ? "Anahtarı gizle" : "Anahtarı göster"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {revealed ? (
              <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><path d="M1 1l22 22" /></>
            ) : (
              <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
            )}
          </svg>
        </button>
        <button
          onClick={copy}
          className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm motion-reduce:transition-none"
        >
          {copied ? <span className="inline-block animate-[apiKeyStamp_0.3s_ease-out] motion-reduce:animate-none text-accent">✓ Kopyalandı</span> : "Kopyala"}
        </button>
      </div>

      <button
        onClick={onRegenerate}
        className="mt-3 w-full rounded-md border border-dashed border-border py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-destructive hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
      >
        Anahtarı yenile
      </button>
    </div>
  );
}
