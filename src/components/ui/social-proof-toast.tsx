"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface SocialProofToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  buyer?: string;
  item?: string;
  time?: string;
  duration?: number;
  onClose?: () => void;
}

export function SocialProofToast({
  buyer = "Grace from Berlin",
  item = "VIP Pass",
  time = "2 min ago",
  duration = 6000,
  onClose,
  className,
  ...props
}: SocialProofToastProps) {
  const [visible, setVisible] = React.useState(true);
  const [leaving, setLeaving] = React.useState(false);

  React.useEffect(() => {
    const id = setTimeout(() => setLeaving(true), Math.max(duration - 400, 500));
    const hide = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => {
      clearTimeout(id);
      clearTimeout(hide);
    };
  }, [duration, onClose ]);

  if (!visible) return null;

  return (
    <div
      role="status"
      className={cn(
        "flex w-72 items-center gap-3 rounded-lg border-2 border-foreground bg-card p-3 shadow-lg transition-all duration-300 motion-reduce:transition-none",
        leaving ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="flex size-9 shrink-0 rotate-[-6deg] items-center justify-center rounded-full border-2 border-accent font-mono text-xs font-bold text-accent">
        ✓
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm">
          <strong>{buyer}</strong> grabbed <strong>{item}</strong>
        </p>
        <p className="font-mono text-[10px] uppercase text-muted-foreground">{time} · verified stub</p>
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className="shrink-0 cursor-pointer font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        ✕
      </button>
    </div>
  );
}
