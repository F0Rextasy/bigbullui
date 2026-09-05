"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TaskItem {
  id: string;
  label: string;
  done?: boolean;
  assignee?: string;
  priority?: "low" | "med" | "high";
}

export interface BoardChecklistProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle"> {
  title?: string;
  items: TaskItem[];
  onToggle?: (id: string) => void;
}

const PRIORITY_TONE: Record<NonNullable<TaskItem["priority"]>, string> = {
  low: "border-border bg-secondary text-muted-foreground",
  med: "border-amber-500/50 bg-amber-500/10 text-amber-600",
  high: "border-destructive/50 bg-destructive/10 text-destructive",
};

const PRIORITY_LABEL: Record<NonNullable<TaskItem["priority"]>, string> = { low: "Low", med: "Med", high: "High" };

/** Task checklist: checkbox + assignee + priority + progress. */
export function BoardChecklist({ title = "Tasks", items, onToggle, className, ...props }: BoardChecklistProps) {
  const [list, setList] = React.useState(items);
  React.useEffect(() => setList(items), [items]);
  const doneCount = list.filter((i) => i.done).length;
  const pct = Math.round((doneCount / Math.max(1, list.length)) * 100);

  const toggle = (id: string) => {
    const next = list.map((i) => (i.id === id ? { ...i, done: !i.done } : i));
    setList(next);
    onToggle?.(id);
  };

  return (
    <div className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4", className)} {...props}>
      <style>{`
        @keyframes bcCheck { 0% { transform: scale(0.6); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
        @keyframes bcIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="flex items-center justify-between">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{title}</h3>
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{doneCount}/{list.length}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-border/50">
        <div className="h-full rounded-full bg-accent transition-all duration-500 motion-reduce:transition-none" style={{ width: `${pct}%` }} />
      </div>

      <ul className="mt-3 space-y-1">
        {list.map((item, idx) => (
          <li key={item.id} className="animate-[bcIn_0.25s_ease-out_both] motion-reduce:animate-none" style={{ animationDelay: `${idx * 40}ms` }}>
            <label className="flex cursor-pointer items-center gap-2.5 rounded-sm px-1 py-1.5 transition-colors hover:bg-secondary/40 motion-reduce:transition-none">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex size-4 shrink-0 items-center justify-center rounded-sm border transition-all duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-ring motion-reduce:transition-none",
                  item.done ? "border-accent bg-accent text-accent-foreground animate-[bcCheck_0.2s_ease-out] motion-reduce:animate-none" : "border-border"
                )}
                aria-hidden="true"
              >
                {item.done && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>}
              </span>
              <span className={cn("min-w-0 flex-1 truncate text-sm transition-colors motion-reduce:transition-none", item.done && "text-muted-foreground line-through")}>
                {item.label}
              </span>
              {item.assignee && <span className="shrink-0 font-mono text-[9px] text-muted-foreground">{item.assignee}</span>}
              {item.priority && (
                <span className={cn("shrink-0 rounded-full border px-1.5 py-px font-mono text-[8px] uppercase tracking-wider", PRIORITY_TONE[item.priority])}>
                  {PRIORITY_LABEL[item.priority]}
                </span>
              )}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
