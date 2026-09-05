"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CenteredCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** üst logo/başlık slotu */
  header?: React.ReactNode;
  /** kart altı yardımcı metin */
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md";
}

/** Ortalanmış tek kart düzeni — giriş/kayıt sayfaları için. */
export function CenteredCard({ children, header, footer, maxWidth = "sm", className, ...props }: CenteredCardProps) {
  return (
    <div className={cn("flex min-h-[420px] w-full items-center justify-center bg-secondary/30 p-6", className)} {...props}>
      <style>{`@keyframes ccIn { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }`}</style>
      <div className={cn("w-full", maxWidth === "sm" ? "max-w-sm" : "max-w-md")}>
        {header && <div className="mb-4 text-center animate-[ccIn_0.35s_ease-out_both] motion-reduce:animate-none">{header}</div>}
        <div className="rounded-lg border-2 border-dashed border-border bg-card p-6 outline-1 outline-dashed outline-offset-[-6px] outline-border/30 animate-[ccIn_0.4s_cubic-bezier(0.16,1,0.3,1)_0.08s_both] motion-reduce:animate-none">
          {children}
        </div>
        {footer && <div className="mt-3 text-center animate-[ccIn_0.35s_ease-out_0.16s_both] motion-reduce:animate-none">{footer}</div>}
      </div>
    </div>
  );
}
