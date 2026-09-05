import * as React from "react";
import { cn } from "./lib/utils";

export interface ListItemProps {
  id: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  variant?: "dashed" | "numbered" | "icon";
  className?: string;
  children?: React.ReactNode;
}

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  items?: ListItemProps[];
  variant?: "dashed" | "numbered" | "icon";
}

export function ListItem({ id, title, content, variant = "dashed", className, children, ...props }: ListItemProps) {
  return (
    <li
      key={id}
      className={cn(
        "flex items-start gap-3 animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none",
        variant === "dashed" && "border-l-2 border-dashed border-border pl-4",
        className
      )}
      {...props}
    >
      {variant === "numbered" && (
        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-[10px] font-bold text-secondary-foreground">
          --
        </span>
      )}
      {variant === "icon" && (
        <svg aria-hidden="true" viewBox="0 0 12 12" className="mt-1 size-3 shrink-0 text-accent">
          <path d="M2 6.5L5 9.5L10 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span className="min-w-0">
        {title && <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">{title}</span>}
        <span className="block text-sm text-muted-foreground">{content ?? children}</span>
      </span>
    </li>
  );
}

export function List({ items, variant = "dashed", className, children, ...props }: ListProps) {
  const data = items ?? [];

  return (
    <ul className={cn("space-y-2", className)} {...props}>
      {data.length > 0
        ? data.map((item, index) => (
            <li
              key={item.id}
              className={cn(
                "flex items-start gap-3 animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none",
                variant === "dashed" && "border-l-2 border-dashed border-border pl-4"
              )}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {variant === "numbered" && (
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-[10px] font-bold text-secondary-foreground animate-[stamp_0.4s_ease-out_both] motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 40 + 80}ms` }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              {variant === "icon" && (
                <svg aria-hidden="true" viewBox="0 0 12 12" className="mt-1 size-3 shrink-0 text-accent">
                  <path d="M2 6.5L5 9.5L10 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              <span className="min-w-0">
                {item.title && <span className="block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-foreground">{item.title}</span>}
                <span className="block text-sm text-muted-foreground">{item.content}</span>
              </span>
            </li>
          ))
        : children}
    </ul>
  );
}
