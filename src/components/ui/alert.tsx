import * as React from "react";
import { cn } from "./lib/utils";

type Tone = "info" | "accent" | "destructive";

export type AlertProps = {
  tone?: Tone;
  title?: string;
  className?: string;
  children: React.ReactNode;
};

const bars: Record<Tone, string> = {
  info: "bg-foreground",
  accent: "bg-accent",
  destructive: "bg-destructive",
};

const eyebrows: Record<Tone, string> = {
  info: "Info",
  accent: "Notice",
  destructive: "Alert",
};

export function Alert({ tone = "info", title, className, children }: AlertProps) {
  return (
    <div role="alert" className={cn("relative rounded-md border border-border bg-card p-4 pl-5", className)}>
      <span aria-hidden className={cn("absolute bottom-3 left-2 top-3 w-1 rounded-full", bars[tone])} />
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {eyebrows[tone]}
      </p>
      {title && <p className="mt-1 text-sm font-semibold">{title}</p>}
      <div className={cn("text-sm text-muted-foreground", title && "mt-1")}>{children}</div>
    </div>
  );
}
