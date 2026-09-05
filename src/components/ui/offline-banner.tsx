"use client";

import * as React from "react";
import { cn } from "./lib/utils";

/** Offline warning banner: monitors navigator.onLine state. */
export function OfflineBanner({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [online, setOnline] = React.useState(true);
  const [reconnecting, setReconnecting] = React.useState(false);

  React.useEffect(() => {
    setOnline(navigator.onLine);
    const goOffline = () => setOnline(false);
    const goOnline = () => {
      setReconnecting(true);
      setTimeout(() => { setReconnecting(false); setOnline(true); }, 1200);
    };
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  if (online && !reconnecting) return null;

  return (
    <div className={cn("flex items-center justify-center gap-2 border-b px-4 py-1.5", online ? "border-emerald-500/40 bg-emerald-500/10" : "border-destructive/40 bg-destructive/10", className)} role="status" {...props}>
      <style>{`@keyframes obDots { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }`}</style>
      {reconnecting ? (
        <>
          <span className="flex gap-0.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-1 rounded-full bg-emerald-600" style={{ animation: "obDots 1s ease-in-out infinite", animationDelay: `${i * 150}ms` }} />
            ))}
          </span>
          <span className="text-xs text-emerald-700">Reconnecting to network…</span>
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-destructive" aria-hidden="true"><path d="M1 1l22 22" /><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" /><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" /><path d="M10.71 5.05A16 16 0 0 1 22.58 9" /><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" /><path d="M12 20h.01" /></svg>
          <span className="text-xs text-destructive">You are offline — changes will not be saved</span>
        </>
      )}
    </div>
  );
}
