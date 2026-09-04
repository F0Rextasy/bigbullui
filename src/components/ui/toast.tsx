"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type ToastTone = "default" | "accent" | "destructive";

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
  dismiss: (id: string) => void;
}

const ToastCtx = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastCtx);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    ({ title, description, tone = "default", duration = 4000 }: ToastOptions) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, tone, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }
    },
    [dismiss]
  );

  return (
    <ToastCtx.Provider value={{ toast, dismiss }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto relative flex flex-col gap-1 rounded-lg border-2 border-dashed bg-card p-4 shadow-lg animate-[fade-in-up_0.2s_ease-out]",
              t.tone === "accent" && "border-accent text-foreground",
              t.tone === "destructive" && "border-destructive text-destructive",
              t.tone === "default" && "border-border text-foreground"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider">
                {t.title}
              </span>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Close notification"
                className="cursor-pointer font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            {t.description ? (
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                {t.description}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
