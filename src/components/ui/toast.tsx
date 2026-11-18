"use client";

import * as React from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = React.useState(false);
  const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  React.useEffect(() => {
    setMounted(true);
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const dismiss = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = React.useCallback(
    ({ title, description, tone = "default", duration = 4000 }: ToastOptions) => {
      const id = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`;
      setToasts((prev) => [...prev, { id, title, description, tone, duration }]);

      if (duration > 0) {
        const timer = setTimeout(() => {
          timersRef.current.delete(id);
          dismiss(id);
        }, duration);
        timersRef.current.set(id, timer);
      }
    },
    [dismiss]
  );

  const ctxValue = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  const viewport = (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto relative flex flex-col gap-1 rounded-lg border-2 border-dashed bg-card p-4 shadow-lg motion-safe:animate-[fade-in-up_0.2s_ease-out]",
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
  );

  return (
    <ToastCtx.Provider value={ctxValue}>
      {children}
      {mounted && typeof document !== "undefined" ? createPortal(viewport, document.body) : viewport}
    </ToastCtx.Provider>
  );
}
