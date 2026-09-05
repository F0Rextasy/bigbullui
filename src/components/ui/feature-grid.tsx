import * as React from "react";
import { cn } from "./lib/utils";

export interface FeatureItem {
  id: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3;
  className?: string;
}

export function FeatureGrid({ items, columns = 2, className }: FeatureGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className="group rounded-md border border-border bg-card p-5 transition-colors duration-200 hover:border-foreground/40 motion-reduce:transition-none animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: `${index * 40}ms` }}
        >
          <span className="inline-flex size-10 items-center justify-center rounded-sm border border-dashed border-border bg-muted text-foreground transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0">
            {item.icon ?? "★"}
          </span>
          <p className="mt-3 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-foreground">{item.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
