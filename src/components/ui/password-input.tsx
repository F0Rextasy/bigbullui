"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onVisibilityChange?: (visible: boolean) => void;
}

/** Şifre girişi: göster/gizle göz ikonu. */
export function PasswordInput({ onVisibilityChange, className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={cn("relative", className)}>
      <style>{`@keyframes piIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`}</style>
      <input
        type={visible ? "text" : "password"}
        className={cn(
          "w-full rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors motion-reduce:transition-none",
          props["aria-invalid"] && "border-destructive"
        )}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => { setVisible((v) => { const n = !v; onVisibilityChange?.(n); return n; }); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
        aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-[piIn_0.15s_ease-out] motion-reduce:animate-none" aria-hidden="true">
          {visible ? (
            <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><path d="M1 1l22 22" /></>
          ) : (
            <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
          )}
        </svg>
      </button>
    </div>
  );
}
