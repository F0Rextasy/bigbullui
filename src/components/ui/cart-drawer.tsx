"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "./lib/utils";
import { getFocusable, lockBodyScroll, registerEscapeLayer, trapFocus } from "./lib/focus-trap";

export interface CartDrawerItem {
  id: string;
  title: string;
  price: string;
  qty: number;
}

export interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartDrawerItem[];
  onRemove?: (id: string) => void;
  onQtyChange?: (id: string, qty: number) => void;
  className?: string;
}

function parsePrice(raw: string): number {
  const n = parseFloat(raw.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function detectCurrency(items: CartDrawerItem[]): string {
  for (const it of items) {
    const m = it.price.trim().match(/^([^0-9.\s-]+)/);
    if (m) return m[1];
  }
  return "$";
}

export function CartDrawer({
  open,
  onOpenChange,
  items = [],
  onRemove,
  onQtyChange,
  className,
}: CartDrawerProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const restoreRef = React.useRef<HTMLElement | null>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);
  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });
  const titleId = React.useId();

  React.useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = panel ? getFocusable(panel) : [];
    (focusables[0] ?? panel)?.focus();

    const releaseScroll = lockBodyScroll();
    const releaseEscape = registerEscapeLayer(() => {
      onOpenChangeRef.current?.(false);
    });
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && panel) {
        trapFocus(panel, event);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      releaseEscape();
      releaseScroll();
      restoreRef.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  const subtotal = items.reduce((sum, it) => sum + parsePrice(it.price) * Math.max(0, it.qty), 0);
  const currency = detectCurrency(items);

  const overlay = (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden overscroll-contain">
      <div
        aria-hidden="true"
        onClick={() => onOpenChangeRef.current?.(false)}
        className="fixed inset-0 bg-foreground/50 overscroll-contain motion-safe:animate-[fade-in_0.2s_ease-out_both]"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "relative z-10 flex h-full w-full max-w-sm flex-col border-s-2 border-foreground bg-card p-6 text-card-foreground shadow-xl outline-none motion-safe:animate-[slide-in_0.2s_ease-out_both]",
          className,
        )}
      >
        <div className="mb-4 flex items-center justify-between border-b border-dashed border-border pb-4">
          <h2 id={titleId} className="font-mono text-sm font-bold uppercase tracking-widest">
            Cart
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => onOpenChangeRef.current?.(false)}
            className="cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                className="flex items-center justify-between gap-2 border-b border-border/50 py-2.5 last:border-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{it.title}</p>
                  <p className="font-mono text-xs text-muted-foreground">{it.price}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onQtyChange?.(it.id, Math.max(it.qty - 1, 0))}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-border font-mono text-xs transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Decrease quantity of ${it.title}`}
                  >
                    −
                  </button>
                  <span className="w-7 text-center font-mono text-xs">{it.qty}</span>
                  <button
                    type="button"
                    onClick={() => onQtyChange?.(it.id, it.qty + 1)}
                    className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border border-border font-mono text-xs transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Increase quantity of ${it.title}`}
                  >
                    +
                  </button>
                </div>
                {onRemove ? (
                  <button
                    type="button"
                    onClick={() => onRemove(it.id)}
                    className="ms-1 cursor-pointer rounded border border-destructive px-1.5 py-0.5 font-mono text-[10px] uppercase text-destructive transition-colors hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={`Remove ${it.title}`}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))
          )}
        </div>

        <div className="mt-4 border-t border-dashed border-border pt-4">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="font-mono text-sm text-muted-foreground">Subtotal</span>
            <span className="font-mono text-base font-bold">
              {`${currency}${subtotal.toFixed(2)}`}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onOpenChangeRef.current?.(false)}
            className="w-full cursor-pointer rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-widest text-accent-foreground transition-colors duration-150 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(overlay, document.body) : overlay;
}
