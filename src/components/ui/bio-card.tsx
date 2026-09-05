"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface BioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  initials: string;
  bio?: string;
  links?: { platform: string; href: string }[];
  onFollow?: () => void;
}

/** Biyografi kartı: avatar + sosyal ikonlar + takip butonu. */
export function BioCard({ name, initials, bio, links = [], onFollow, className, ...props }: BioCardProps) {
  const [following, setFollowing] = React.useState(false);

  return (
    <div className={cn("w-full max-w-xs rounded-lg border border-border bg-card p-5 text-center", className)} {...props}>
      <style>{`@keyframes bioIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <span className="mx-auto flex size-16 items-center justify-center rounded-full border-2 border-dashed border-border bg-secondary font-mono text-lg font-bold text-secondary-foreground animate-[bioIn_0.35s_ease-out_both] motion-reduce:animate-none">
        {initials}
      </span>
      <h3 className="mt-3 text-sm font-semibold">{name}</h3>
      {bio && <p className="mt-1 text-xs text-muted-foreground">{bio}</p>}
      {links.length > 0 && (
        <div className="mt-3 flex justify-center gap-2">
          {links.map((l) => (
            <a
              key={l.platform}
              href={l.href}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
            >
              {l.platform}
            </a>
          ))}
        </div>
      )}
      <button
        onClick={() => { setFollowing((f) => !f); onFollow?.(); }}
        className={cn(
          "mt-4 w-full rounded-md border-2 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-200 motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          following
            ? "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
            : "border-accent bg-accent text-accent-foreground hover:bg-accent/90 active:scale-[0.98]"
        )}
      >
        {following ? "Takip ediliyor ✓" : "Takip et"}
      </button>
    </div>
  );
}
