"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HeroSplitProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  actions?: React.ReactNode;
  /** sağ görsel/vurgu slotu */
  visual: React.ReactNode;
}

/** Sol metin + sağ görsel hero düzeni. */
export function HeroSplit({ eyebrow, title, description, actions, visual, className, ...props }: HeroSplitProps) {
  return (
    <section className={cn("grid grid-cols-1 items-center gap-8 overflow-hidden rounded-xl border border-border bg-card p-8 lg:grid-cols-2 lg:p-12", className)} {...props}>
      <style>{`@keyframes hsLeft { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
      @keyframes hsRight { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }`}</style>

      <div className="animate-[hsLeft_0.45s_cubic-bezier(0.16,1,0.3,1)_both] motion-reduce:animate-none">
        {eyebrow && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-md text-muted-foreground">{description}</p>}
        {actions && <div className="mt-5 flex flex-wrap gap-3">{actions}</div>}
      </div>

      <div className="relative animate-[hsRight_0.45s_cubic-bezier(0.16,1,0.3,1)_0.15s_both] motion-reduce:animate-none">
        <div className="absolute -inset-3 rounded-xl border border-dashed border-border/40" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-lg border border-border">{visual}</div>
      </div>
    </section>
  );
}
