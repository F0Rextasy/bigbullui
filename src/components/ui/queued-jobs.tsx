"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type QueueJobStatus = "queued" | "running" | "done" | "failed";

export interface QueueJob {
  id: string;
  label: string;
  status: QueueJobStatus;
  progress?: number;
}

export interface QueuedJobsProps extends React.HTMLAttributes<HTMLDivElement> {
  jobs: QueueJob[];
  onCancel?: (id: string) => void;
}

/** Kuyruktaki işler: durum + ilerleme + iptal. */
export function QueuedJobs({ jobs, onCancel, className, ...props }: QueuedJobsProps) {
  const [list, setList] = React.useState(jobs);

  const statusMeta: Record<QueueJobStatus, { label: string; tone: string }> = {
    queued: { label: "Kuyrukta", tone: "text-muted-foreground" },
    running: { label: "Çalışıyor", tone: "text-accent" },
    done: { label: "Bitti", tone: "text-emerald-600" },
    failed: { label: "Hata", tone: "text-destructive" },
  };

  return (
    <div className={cn("w-full max-w-md space-y-1.5", className)} {...props}>
      <style>{`@keyframes qjIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {list.map((job, idx) => {
        const m = statusMeta[job.status];
        return (
          <div
            key={job.id}
            className="rounded-md border border-border bg-card px-3 py-2.5 animate-[qjIn_0.3s_ease-out_both] motion-reduce:animate-none"
            style={{ animationDelay: `${idx * 55}ms` }}
          >
            <div className="flex items-center gap-2">
              <span className={cn("size-1.5 shrink-0 rounded-full", job.status === "running" ? "bg-accent animate-pulse motion-reduce:animate-none" : job.status === "done" ? "bg-emerald-500" : job.status === "failed" ? "bg-destructive" : "bg-border")} aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate text-sm">{job.label}</span>
              <span className={cn("shrink-0 font-mono text-[10px] uppercase tracking-wider", m.tone)}>{m.label}</span>
              {(job.status === "queued" || job.status === "running") && (
                <button
                  onClick={() => { setList((l) => l.filter((j) => j.id !== job.id)); onCancel?.(job.id); }}
                  className="shrink-0 rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
                  aria-label={`${job.label} işini iptal et`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              )}
            </div>
            {job.status === "running" && job.progress !== undefined && (
              <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-border/50">
                <div className="h-full rounded-full bg-accent transition-all duration-500 motion-reduce:transition-none" style={{ width: `${job.progress}%` }} />
              </div>
            )}
          </div>
        );
      })}
      {list.length === 0 && <p className="rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground">Kuyruk boş.</p>}
    </div>
  );
}
