"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface UploadProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  filename: string;
  /** 0-100 */
  progress: number;
  onCancel?: () => void;
}

/** Tek dosya yükleme: dairesel ilerleme + dosya adı + iptal. */
export function UploadProgress({ filename, progress, onCancel, className, ...props }: UploadProgressProps) {
  const R = 16;
  const C = 2 * Math.PI * R;
  const done = progress >= 100;

  return (
    <div className={cn("flex w-full max-w-sm items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5", className)} {...props}>
      <style>{`@keyframes upFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <span className="relative size-10 shrink-0" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={filename}>
        <svg viewBox="0 0 40 40" className="size-full -rotate-90">
          <circle cx="20" cy="20" r={R} fill="none" stroke="var(--border)" strokeWidth="3" />
          <circle
            cx="20" cy="20" r={R} fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className={done ? "text-emerald-500" : "text-accent"}
            strokeDasharray={C}
            strokeDashoffset={C - (C * Math.min(100, progress)) / 100}
            style={{ transition: "stroke-dashoffset 0.4s ease-out" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold tabular-nums">
          {done ? "✓" : `${progress}%`}
        </span>
      </span>
      <div className="min-w-0 flex-1 animate-[upFade_0.3s_ease-out_both] motion-reduce:animate-none">
        <p className="truncate text-sm font-medium">{filename}</p>
        <p className="text-xs text-muted-foreground">{done ? "Yükleme tamamlandı" : "Yükleniyor…"}</p>
      </div>
      {!done && (
        <button
          onClick={onCancel}
          className="shrink-0 rounded-sm p-1 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
          aria-label={`${filename} yüklemesini iptal et`}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      )}
    </div>
  );
}
