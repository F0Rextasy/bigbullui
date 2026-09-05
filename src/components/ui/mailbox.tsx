"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface MailboxProps extends React.HTMLAttributes<HTMLDivElement> {
  recipient?: string;
  onSend?: () => void;
}

/** Posta kutusu: mektup girer + bayrak kalkar. */
export function Mailbox({ recipient = "Ada Lovelace", onSend, className, ...props }: MailboxProps) {
  const [sent, setSent] = React.useState(false);

  const send = () => {
    setSent(true);
    onSend?.();
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className={cn("flex w-40 flex-col items-center", className)} {...props}>
      <style>{`
        @keyframes mbFlag { 0% { transform: rotate(0deg); } 100% { transform: rotate(45deg); } }
        @keyframes mbLetter { 0% { transform: translateY(-20px) scale(0.8); opacity: 0; } 60% { opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 0; } }
        @keyframes mbBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }
      `}</style>

      <div className="relative">
        {/* Bayrak */}
        <span
          className={cn("absolute -right-1 -top-2 text-lg transition-transform duration-300 motion-reduce:transition-none", sent && "animate-[mbFlag_0.4s_ease-out_forwards]")}
          aria-hidden="true"
        >
          🚩
        </span>
        {/* Kutu */}
        <div className={cn("flex size-28 flex-col items-center justify-center rounded-b-lg rounded-t-md border-2 border-dashed border-border bg-card transition-transform duration-200 motion-reduce:transition-none", sent && "animate-[mbBounce_0.4s_ease-out]")}>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">POSTA</span>
          <span className="mt-1 text-2xl" aria-hidden="true">📬</span>
        </div>
        {sent && (
          <span className="absolute inset-x-0 -top-4 flex justify-center" aria-hidden="true">
            <span className="text-xl" style={{ animation: "mbLetter 0.8s ease-in both" }}>✉️</span>
          </span>
        )}
      </div>

      <p className="mt-2 max-w-full truncate text-center text-[11px] text-muted-foreground">{recipient}</p>

      <button
        onClick={send}
        disabled={sent}
        className="mt-2 w-full rounded-md border border-dashed border-border py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-accent hover:text-accent disabled:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none"
      >
        {sent ? "Gönderildi ✓" : "Mektup gönder"}
      </button>
    </div>
  );
}
