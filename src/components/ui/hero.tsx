"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface HeroButton {
  label: string;
  href: string;
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  highlight?: string;
  description?: string;
  primaryAction?: HeroButton;
  secondaryAction?: HeroButton;
  marqueeItems?: string[];
}

export function Hero({
  title,
  highlight,
  description,
  primaryAction,
  secondaryAction,
  marqueeItems,
  className,
  ...props
}: HeroProps) {
  const segments = highlight ? title.split(highlight) : [title];

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card px-6 py-14 text-center outline-1 outline-dashed outline-offset-[-7px] animate-[fade-in-up_0.4s_ease-out_both] motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Ticket stub ui</p>
      <h1
        className="mx-auto mt-3 max-w-2xl font-mono text-3xl font-extrabold uppercase leading-tight tracking-tight text-foreground md:text-5xl animate-[stamp_0.4s_ease-out_both] motion-reduce:animate-none"
      >
        {highlight ? (
          <>
            {segments[0]}
            <span className="mx-1 inline-block -rotate-2 rounded-sm bg-accent px-2 text-accent-foreground">{highlight}</span>
            {segments.slice(1).join(highlight)}
          </>
        ) : (
          title
        )}
      </h1>
      {description && (
        <p
          className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground animate-[fade-in_0.3s_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: "120ms" }}
        >
          {description}
        </p>
      )}
      <div
        className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-[fade-in-up_0.3s_ease-out_both] motion-reduce:animate-none"
        style={{ animationDelay: "200ms" }}
      >
        {primaryAction && (
          <a
            href={primaryAction.href}
            className="rounded-sm bg-primary px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            {primaryAction.label}
          </a>
        )}
        {secondaryAction && (
          <a
            href={secondaryAction.href}
            className="rounded-sm border border-dashed border-border px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-foreground transition-colors duration-200 hover:border-accent hover:text-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            {secondaryAction.label}
          </a>
        )}
      </div>
      {marqueeItems && marqueeItems.length > 0 && (
        <div className="group mt-10 flex select-none overflow-hidden border-t border-dashed border-border pt-4" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex min-w-full shrink-0 items-center justify-around gap-8 motion-reduce:animate-none motion-reduce:transform-none group-hover:[animation-play-state:paused]"
              style={{ animation: "marquee 22s linear infinite" }}
            >
              {marqueeItems.map((item, i) => (
                <span key={i} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  ★ {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
