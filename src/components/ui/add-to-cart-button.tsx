"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AddToCartButtonProps {
  productName: string;
  onAdd: () => void;
  className?: string;
}

const FlyingDot = "add-to-cart-flying-dot";
const ScaleIn = "add-to-cart-scale-in";

export function AddToCartButton({
  productName,
  onAdd,
  className,
}: AddToCartButtonProps) {
  const [justAdded, setJustAdded] = React.useState(false);

  const handleClick = () => {
    onAdd();
    setJustAdded(true);
    const timer = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(timer);
  };

  return (
    <>
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-md bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold uppercase tracking-widest hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-150 motion-reduce:transition-none motion-reduce:focus-visible:ring-0",
        ScaleIn
      )}
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={cn("transition-transform duration-200")}
      >
        <path d="M19 9h-4A2 2 0 0 0 13 11v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4M9 7h6v2H9zm5 4h-2v2h2v-2zm-2-6h2v4H7v-4zm6 6h-4v2h4v-2z" />
      </svg>
      Add to Cart
    </button>

    {/* Flying dot animation */}
    {justAdded && (
      <div
        className={cn(
          "absolute -inset-0 pointer-events-none overflow-hidden",
          FlyingDot
        )}
      >
        <div
          className={cn(
            "absolute size-3 rounded-full bg-accent",
            "animate-flying-dot"
          )}
        />
      </div>
    )}
    </>
  );
}