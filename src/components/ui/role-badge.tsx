"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type RoleTone = "admin" | "editor" | "member" | "viewer" | "custom";

export interface RoleBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  role: RoleTone;
  label?: string;
}

const TONE: Record<RoleTone, string> = {
  admin: "border-accent/60 bg-accent/10 text-accent",
  editor: "border-sky-500/50 bg-sky-500/10 text-sky-600",
  member: "border-border bg-secondary text-secondary-foreground",
  viewer: "border-border/60 bg-transparent text-muted-foreground",
  custom: "border-dashed border-border bg-transparent text-foreground",
};

const LABEL: Record<RoleTone, string> = { admin: "Admin", editor: "Editör", member: "Üye", viewer: "Ziyaretçi", custom: "Özel" };

/** Rol rozeti seti: admin/editör/üye/ziyaretçi tonları. */
export function RoleBadge({ role, label, className, ...props }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider",
        "animate-[fade-in-up_0.25s_ease-out_both] motion-reduce:animate-none",
        TONE[role],
        className
      )}
      {...props}
    >
      {role === "admin" && <span className="size-1 rounded-full bg-current" aria-hidden="true" />}
      {label ?? LABEL[role]}
    </span>
  );
}
