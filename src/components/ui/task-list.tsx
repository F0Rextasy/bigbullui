"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface TaskListProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onToggle"> {
  tasks: { id: string; label: string; assignee?: string; priority?: "low" | "med" | "high"; done?: boolean }[];
  onToggle?: (id: string) => void;
}

const PRI: Record<string, string> = { low: "text-muted-foreground", med: "text-amber-600", high: "text-destructive" };

/** Görev satırları: atanan chip + öncelik noktası. */
export function TaskList({ tasks, onToggle, className, ...props }: TaskListProps) {
  const [state, setState] = React.useState(tasks);
  React.useEffect(() => setState(tasks), [tasks]);

  return (
    <ul className={cn("w-full max-w-sm space-y-1", className)} {...props}>
      <style>{`@keyframes tlIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      {state.map((t, idx) => (
        <li
          key={t.id}
          className="flex items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2 animate-[tlIn_0.25s_ease-out_both] motion-reduce:animate-none transition-colors hover:border-foreground/30 motion-reduce:transition-none"
          style={{ animationDelay: `${idx * 40}ms` }}
        >
          <input
            type="checkbox"
            checked={t.done}
            onChange={() => { setState((s) => s.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x))); onToggle?.(t.id); }}
            className="size-3.5 shrink-0 accent-accent"
            aria-label={t.label}
          />
          <span className={cn("min-w-0 flex-1 truncate text-sm transition-colors motion-reduce:transition-none", t.done && "text-muted-foreground line-through")}>{t.label}</span>
          {t.assignee && <span className="shrink-0 rounded-full bg-secondary px-1.5 py-px font-mono text-[9px] text-secondary-foreground">{t.assignee}</span>}
          {t.priority && <span className={cn("size-1.5 shrink-0 rounded-full", t.priority === "high" ? "bg-destructive" : t.priority === "med" ? "bg-amber-500" : "bg-border")} aria-label={t.priority} />}
        </li>
      ))}
    </ul>
  );
}
