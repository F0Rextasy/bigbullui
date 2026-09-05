import * as React from "react";
import { cn } from "./lib/utils";

export interface CtaButton {
  label: string;
  href: string;
}

export interface CtaSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  highlight?: string;
  copy?: string;
  action?: CtaButton;
  sealText?: string;
}

export function CtaSection({
  title,
  highlight,
  copy,
  action,
  sealText = "Admit One",
  className,
  ...props
}: CtaSectionProps) {
  const segments = highlight ? title.split(highlight) : [title];

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-card px-6 py-12 outline-1 outline-dashed outline-offset-[-7px] animate-[fade-in-up_0.4s_ease-out_both] motion-reduce:animate-none",
        className
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        className="absolute right-6 top-6 hidden size-20 rotate-[-8deg] flex-col items-center justify-center rounded-full border-2 border-accent text-accent animate-[stamp_0.4s_ease-out_both] motion-reduce:animate-none sm:flex"
      >
        <span className="px-2 text-center font-mono text-[8px] font-bold uppercase tracking-[0.2em]">★ {sealText} ★</span>
      </div>
      <h2 className="max-w-lg font-mono text-2xl font-extrabold uppercase leading-tight tracking-tight text-foreground md:text-3xl animate-[stamp_0.4s_ease-out_both] motion-reduce:animate-none">
        {highlight ? (
          <>
            {segments[0]}
            <span className="mx-1 inline-block -rotate-2 rounded-sm bg-accent px-2 text-accent-foreground">{highlight}</span>
            {segments.slice(1).join(highlight)}
          </>
        ) : (
          title
        )}
      </h2>
      {copy && (
        <p
          className="mt-3 max-w-md text-sm text-muted-foreground animate-[fade-in_0.3s_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: "120ms" }}
        >
          {copy}
        </p>
      )}
      {action && (
        <a
          href={action.href}
          className="mt-6 inline-block rounded-sm bg-accent px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0 animate-[fade-in-up_0.3s_ease-out_both]"
          style={{ animationDelay: "200ms" }}
        >
          {action.label}
        </a>
      )}
    </section>
  );
}
