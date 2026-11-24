"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { useIsMounted } from "./lib/react-compat";

export type ToastTone = "default" | "accent" | "destructive";
export type ToastPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
  action?: ToastAction;
}

interface ToastItem extends ToastOptions {
  id: string;
  remaining: number;
  startedAt: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
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
  position?: ToastPosition;
  maxToasts?: number;
}

const POSITION_CLASSES: Record<ToastPosition, string> = {
  "bottom-right": "bottom-4 end-4",
  "bottom-left": "bottom-4 start-4",
  "top-right": "top-4 end-4",
  "top-left": "top-4 start-4",
};

let toastSeq = 0;

export function ToastProvider({
  children,
  position = "bottom-right",
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const mounted = useIsMounted();
  const timersRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  React.useEffect(() => {
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

  const scheduleTimer = React.useCallback(
    (id: string, ms: number) => {
      if (ms <= 0) return;
      const existing = timersRef.current.get(id);
      if (existing) clearTimeout(existing);
      const timer = setTimeout(() => {
        timersRef.current.delete(id);
        dismiss(id);
      }, ms);
      timersRef.current.set(id, timer);
    },
    [dismiss],
  );

  const pauseToast = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    const now = Date.now();
    setToasts((prev) =>
      prev.map((t) =>
        t.id === id && t.remaining > 0
          ? { ...t, remaining: Math.max(0, t.remaining - (now - t.startedAt)), startedAt: now }
          : t,
      ),
    );
  }, []);

  const resumeToast = React.useCallback(
    (id: string) => {
      const now = Date.now();
      setToasts((prev) =>
        prev.map((t) => {
          if (t.id !== id || !t.duration || t.duration <= 0) return t;
          const ms = Math.max(800, t.remaining);
          scheduleTimer(id, ms);
          return { ...t, startedAt: now };
        }),
      );
    },
    [scheduleTimer],
  );

  const toast = React.useCallback(
    ({ title, description, tone = "default", duration = 4000, action }: ToastOptions): string => {
      toastSeq += 1;
      const id = `bb-toast-${toastSeq}-${Date.now().toString(36)}`;
      const now = Date.now();
      setToasts((prev) => {
        const next = [...prev, { id, title, description, tone, duration, action, remaining: duration, startedAt: now }];
        return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
      });

      if (duration > 0) {
        scheduleTimer(id, duration);
      }
      return id;
    },
    [maxToasts, scheduleTimer],
  );

  const ctxValue = React.useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  const viewport = (
    <div
      className={cn(
        "pointer-events-none fixed z-50 flex w-full max-w-sm flex-col gap-2",
        POSITION_CLASSES[position],
      )}
    >
      {toasts.map((t) => {
        const isAssertive = t.tone === "destructive";
        return (
          <div
            key={t.id}
            role={isAssertive ? "alert" : "status"}
            aria-live={isAssertive ? "assertive" : "polite"}
            onMouseEnter={() => pauseToast(t.id)}
            onMouseLeave={() => resumeToast(t.id)}
            onFocus={() => pauseToast(t.id)}
            onBlur={() => resumeToast(t.id)}
            className={cn(
              "pointer-events-auto relative flex flex-col gap-1 rounded-lg border-2 border-dashed bg-card p-4 shadow-lg motion-safe:animate-[fade-in-up_0.2s_ease-out]",
              t.tone === "accent" && "border-accent text-foreground",
              t.tone === "destructive" && "border-destructive text-destructive",
              t.tone === "default" && "border-border text-foreground",
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
                className="cursor-pointer rounded-sm px-1 font-mono text-xs text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                ✕
              </button>
            </div>
            {t.description ? (
              <p className="font-mono text-xs leading-relaxed text-muted-foreground">
                {t.description}
              </p>
            ) : null}
            {t.action ? (
              <div className="mt-1">
                <button
                  type="button"
                  onClick={() => {
                    t.action?.onClick();
                    dismiss(t.id);
                  }}
                  className="rounded border border-border bg-secondary px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {t.action.label}
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  return (
    <ToastCtx.Provider value={ctxValue}>
      {children}
      {mounted ? createPortal(viewport, document.body) : null}
    </ToastCtx.Provider>
  );
}
