"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface DamageVignetteProps extends React.HTMLAttributes<HTMLDivElement> {
  hitKey: number;
  intensity?: number;
}

/** Damage vignette: edge flash that pulses on every hitKey change, silent under motion-reduce. */
export function DamageVignette({ hitKey, intensity = 0.55, className, children, ...props }: DamageVignetteProps) {
  const [flash, setFlash] = React.useState(0);
  React.useEffect(() => {
    if (hitKey <= 0) return;
    setFlash((f) => f + 1);
    const t = setTimeout(() => setFlash((f) => Math.max(0, f - 1)), 450);
    return () => clearTimeout(t);
  }, [hitKey]);

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <style>{`@keyframes dmgFlash { 0% { opacity: 0; } 25% { opacity: 1; } 100% { opacity: 0; } }`}</style>
      {children}
      {flash > 0 && (
        <div
          key={flash}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 animate-[dmgFlash_0.45s_ease-out] motion-reduce:animate-none"
          style={{
            opacity: intensity,
            background: "radial-gradient(ellipse at center, transparent 45%, var(--destructive) 100%)",
          }}
        />
      )}
      <span className="sr-only" role="status">
        {hitKey > 0 ? `Took damage ${hitKey} times` : "No damage"}
      </span>
    </div>
  );
}
