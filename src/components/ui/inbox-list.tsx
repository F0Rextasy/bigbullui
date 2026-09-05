"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface InboxItem {
  id: string;
  from: string;
  initials: string;
  subject: string;
  preview: string;
  time: string;
  unread?: boolean;
  starred?: boolean;
}

export interface InboxListProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: InboxItem[];
  onSelect?: (id: string) => void;
}

/** Email inbox rows: unread badge indicator, sender, subject preview. */
export function InboxList({ items, onSelect, className, ...props }: InboxListProps) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [stars, setStars] = React.useState<Set<string>>(
    () => new Set(items.filter((i) => i.starred).map((i) => i.id))
  );

  const toggleStar = (id: string) => {
    setStars((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("w-full max-w-lg divide-y divide-border/60 overflow-hidden rounded-lg border border-border bg-card", className)} {...props}>
      <style>{`@keyframes inboxIn { from { opacity: 0; transform: translateX(-8px); } to { opacity: 1; transform: translateX(0); } }`}</style>
      {items.map((item, idx) => (
        <button
          key={item.id}
          onClick={() => { setSelected(item.id); onSelect?.(item.id); }}
          className={cn(
            "flex w-full items-start gap-3 px-4 py-3 text-left animate-[inboxIn_0.3s_ease-out_both] motion-reduce:animate-none",
            "transition-colors motion-reduce:transition-none hover:bg-secondary/40",
            selected === item.id && "bg-accent/5",
            item.unread && "bg-secondary/20"
          )}
          style={{ animationDelay: `${idx * 45}ms` }}
        >
          <span className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full border border-dashed font-mono text-[10px] font-bold",
            item.unread ? "border-accent/60 text-accent" : "border-border text-muted-foreground"
          )}>
            {item.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2">
              <span className={cn("truncate text-sm", item.unread ? "font-semibold" : "font-medium text-foreground/80")}>{item.from}</span>
              {item.unread && <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-label="Unread" />}
              <span className="ml-auto shrink-0 font-mono text-[9px] text-muted-foreground">{item.time}</span>
            </span>
            <span className="mt-0.5 block truncate text-xs text-foreground/90">{item.subject}</span>
            <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.preview}</span>
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); toggleStar(item.id); }}
            onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); toggleStar(item.id); } }}
            aria-label={stars.has(item.id) ? "Remove star" : "Star message"}
            className={cn("shrink-0 rounded-sm p-0.5 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", stars.has(item.id) ? "text-amber-500" : "text-border hover:text-muted-foreground")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={stars.has(item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </span>
        </button>
      ))}
    </div>
  );
}
