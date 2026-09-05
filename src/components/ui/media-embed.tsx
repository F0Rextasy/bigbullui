"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MediaEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  title?: string;
  /** 16:9 sabit */
  poster?: string;
}

/** Gömülü medya çerçevesi: 16:9 + yükleme iskeleti + dashed çerçeve. */
export function MediaEmbed({ src, title, poster, className, ...props }: MediaEmbedProps) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-lg border-2 border-dashed border-border bg-secondary/40", className)} {...props}>
      <style>{`@keyframes meShimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }`}</style>
      {!loaded && (
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(90deg, var(--secondary) 25%, var(--muted) 50%, var(--secondary) 75%)", backgroundSize: "200% 100%", animation: "meShimmer 1.4s ease-in-out infinite" }}
          aria-hidden="true"
        />
      )}
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={title ?? ""} onLoad={() => setLoaded(true)} className={cn("size-full object-cover transition-opacity duration-300 motion-reduce:transition-none", loaded ? "opacity-100" : "opacity-0")} />
      ) : (
        <div className={cn("absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground", loaded && "hidden")}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em]">{title ?? "Medya yüklenmedi"}</span>
        </div>
      )}
      {title && loaded && (
        <span className="absolute bottom-2 left-2 rounded-sm bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white">{title}</span>
      )}
      {poster && <span className="hidden">{poster}</span>}
    </div>
  );
}
