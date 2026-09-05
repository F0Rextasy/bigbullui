"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
  code?: "404" | "500" | "403";
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

/** Full-page error display: large status code + description + return button. */
export function ErrorPage({ code = "404", title, description, action, className, ...props }: ErrorPageProps) {
  const defaults: Record<string, { t: string; d: string }> = {
    "404": { t: "Page Not Found", d: "The page you are looking for does not exist or may have moved." },
    "500": { t: "Server Error", d: "An unexpected error occurred behind the scenes. Please try again shortly." },
    "403": { t: "Access Denied", d: "You do not have permission to view this section." },
  };
  const meta = defaults[code];

  return (
    <div className={cn("flex min-h-[360px] w-full flex-col items-center justify-center gap-4 p-8 text-center", className)} {...props}>
      <style>{`
        @keyframes errStamp {
          0% { transform: scale(1.6) rotate(-14deg); opacity: 0; }
          60% { transform: scale(0.95) rotate(-8deg); opacity: 1; }
          100% { transform: scale(1) rotate(-8deg); opacity: 1; }
        }
        @keyframes errIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <span
        className="inline-block rounded-lg border-4 border-dashed border-destructive/70 px-6 py-3 font-mono text-5xl font-black tracking-widest text-destructive"
        style={{ animation: "errStamp 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
        aria-hidden="true"
      >
        {code}
      </span>
      <div className="animate-[errIn_0.35s_ease-out_0.2s_both] motion-reduce:animate-none">
        <h1 className="text-xl font-semibold tracking-tight">{title ?? meta.t}</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">{description ?? meta.d}</p>
      </div>
      <div className="animate-[errIn_0.35s_ease-out_0.3s_both] motion-reduce:animate-none">
        {action ?? (
          // eslint-disable-next-line @next/next/no-html-link-for-pages -- library component must not depend on next/link
          <a
            href="/"
            className="inline-block rounded-md border-2 border-dashed border-border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            ← Ana sayfa
          </a>
        )}
      </div>
    </div>
  );
}
