"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: { id: string; title: string; price: string; qty: number }[];
  onRemove?: (id: string) => void;
  onQtyChange?: (id: string, qty: number) => void;
  className?: string;
}

const SlideIn = "cart-drawer-slide-in";
const Fade = "cart-item-fade";
const FocusTrap = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function CartDrawer({
  open,
  onOpenChange,
  items,
  onRemove,
  onQtyChange,
  className,
}: CartDrawerProps) {
  const [focusedEl, setFocusedEl] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 hidden items-center justify-center motion-reduce:hidden",
        open && "block",
        open && SlideIn
      )}
      onClick={(e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      {/* Overlay */}
      {open && (
        <div
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm",
            FocusTrap
          )}
          onClick={(e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
              onOpenChange(false);
            }
          }}
        />
      )}

      {/* Drawer container */}
      {open && (
        <div
          className={cn(
            "relative w-80 max-w-full bg-card rounded-lg border border-foreground shadow-lg p-6 transform transition-transform duration-300 motion-reduce:transition-none",
            open && "translate-x-0",
            open && SlideIn,
            "shadow-md"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-4">
            <h3 className="font-mono text-sm font-bold uppercase tracking-widest">Cart</h3>
            <button
              onClick={() => onOpenChange(false)}
              className={cn(
                "p-1 rounded-md hover:bg-secondary/20 transition-colors",
                FocusTrap
              )}
            >
              ✕
            </button>
          </div>

          {/* Empty state */}
          {items.length === 0 && (
            <p className="text-sm text-muted-foreground">Your cart is empty</p>
          )}

 {/* Items */}
          {items.map((it, i) => (
            <div
              key={i}
              className={cn(
                "flex items-baseline py-2 border-b border-border/50 last:border-0",
                Fade
              )}
            >
              <span className="font-medium line-clamp-1 flex-1">{it.title}</span>
              <div className="flex items-baseline gap-2">
                <button
                  onClick={() => onQtyChange?.(it.id, Math.max(it.qty - 1, 0))}
                  className={cn(
                    "rounded border border-border w-6 h-6 flex items-center justify-center text-xs font-mono",
                    "motion-reduce:transition-none"
                  )}
                  aria-label="decrease qty"
                >
                  −
                </button>
                <span className="font-mono w-8 text-center">{it.qty}</span>
                <button
                  onClick={() => onQtyChange?.(it.id, it.qty + 1)}
                  className={cn(
                    "rounded border border-border w-6 h-6 flex items-center justify-center text-xs font-mono",
                    "motion-reduce:transition-none"
                  )}
                  aria-label="increase qty"
                >
                  +
                </button>
              </div>
              {onRemove && (
                <button
                  onClick={() => onRemove(it.id)}
                  className={cn(
                    "ml-3 rounded border border-destructive text-destructive text-xs hover:bg-destructive/10 transition-colors",
                    FocusTrap
                  )}
                  aria-label="remove item"
                >
                  remove
                </button>
              )}
            </div>
          ))}

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-mono text-muted-foreground">Subtotal</span>
              <span className="font-mono text-right">$0.00</span>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className={cn(
                "w-full rounded-md bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold uppercase tracking-widest hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-150 motion-reduce:transition-none motion-reduce:focus-visible:ring-0",
                Fade
              )}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}