"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type FeatureStage = "new" | "beta" | "deprecated" | "stable";

export interface VersionBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  stage: FeatureStage;
  version?: string;
}

const STAGE: Record<FeatureStage, { label: string; tone: string }> = {
  new: { label: "Yeni", tone: "border-emerald-500/50 bg-emerald-500/10 text-emerald-600" },
  beta: { label: "Beta", tone: "border-amber-500/50 bg-amber-500/10 text-amber-600" },
  deprecated: { label: "Kullanımdan kaldırılacak", tone: "border-destructive/50 bg-destructive/10 text-destructive" },
  stable: { label: "Kararlı", tone: "border-border bg-secondary text-secondary-foreground" },
};

/** Sürüm rozeti: yeni/beta/kararlı/kaldırılacak tonları. */
export function VersionBadge({ stage, version, className, ...props }: VersionBadgeProps) {
  const s = STAGE[stage];
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider", s.tone, className)}
      {...props}
    >
      {stage === "new" && <span className="size-1 rounded-full bg-current animate-pulse motion-reduce:animate-none" aria-hidden="true" />}
      {s.label}
      {version && <span className="opacity-60">v{version}</span>}
    </span>
  );
}
