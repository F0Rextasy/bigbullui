"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SecurityCheck {
  id: string;
  label: string;
  passed: boolean;
  hint?: string;
}

export interface SecurityScoreProps extends React.HTMLAttributes<HTMLDivElement> {
  checks: SecurityCheck[];
}

/** Güvenlik puanı: dairesel puan + madde madde durum listesi. */
export function SecurityScore({ checks, className, ...props }: SecurityScoreProps) {
  const passed = checks.filter((c) => c.passed).length;
  const percent = Math.round((passed / Math.max(1, checks.length)) * 100);
  const R = 44;
  const C = Math.PI * R; // yarım daire
  const tone = percent >= 80 ? "text-emerald-500" : percent >= 50 ? "text-amber-500" : "text-destructive";

  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-5", className)} {...props}>
      <style>{`
        @keyframes secDraw { from { stroke-dashoffset: ${C}; } }
        @keyframes secIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>

      <div className="flex items-center gap-5">
        <div className="relative size-28 shrink-0">
          <svg viewBox="0 0 100 58" className="size-full">
            <path d={`M 6 54 A ${R} ${R} 0 0 1 94 54`} fill="none" stroke="var(--border)" strokeWidth="8" strokeLinecap="round" />
            <path
              d={`M 6 54 A ${R} ${R} 0 0 1 94 54`}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              className={tone}
              strokeDasharray={C}
              style={{ strokeDashoffset: C - (C * percent) / 100, animation: "secDraw 0.8s cubic-bezier(0.16,1,0.3,1) both", transition: "stroke-dashoffset 0.5s ease-out" }}
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <span className={cn("font-mono text-2xl font-bold tabular-nums", tone)}>{percent}</span>
            <span className="font-mono text-[10px] text-muted-foreground">/100</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider">Güvenlik Puanı</h3>
          <p className="mt-1 text-xs text-muted-foreground">{passed}/{checks.length} kontrol geçildi</p>
        </div>
      </div>

      <ul className="mt-4 space-y-1.5">
        {checks.map((c, i) => (
          <li
            key={c.id}
            className="flex items-start gap-2 text-sm animate-[secIn_0.3s_ease-out_both] motion-reduce:animate-none"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span
              className={cn(
                "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
                c.passed ? "border-emerald-500 bg-emerald-500/15 text-emerald-500" : "border-destructive/50 bg-destructive/10 text-destructive"
              )}
              aria-hidden="true"
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                {c.passed ? <path d="M20 6L9 17l-5-5" /> : <path d="M18 6L6 18M6 6l12 12" />}
              </svg>
            </span>
            <div>
              <span className={c.passed ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
              {!c.passed && c.hint && <span className="block text-xs text-muted-foreground">{c.hint}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
