"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export interface AddToCartButtonProps {
  productName: string;
  onAdd: () => void;
  className?: string;
}

export function AddToCartButton({
  productName,
  onAdd,
  className,
}: AddToCartButtonProps) {
  const [justAdded, setJustAdded] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    onAdd();
    setJustAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <span className="relative inline-flex items-center">
      <button
        type="button"
        aria-label={productName ? `Add ${productName} to cart` : "Add to Cart"}
        onClick={handleClick}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold uppercase tracking-widest text-accent-foreground transition-colors duration-150 hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
          className,
        )}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span>{justAdded ? "Added" : "Add to Cart"}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {justAdded ? `${productName || "Item"} added to cart` : ""}
      </span>
    </span>
  );
}
