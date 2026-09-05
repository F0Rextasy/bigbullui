"use client";

import * as React from "react";
import { cn } from "./lib/utils";

export type LoadingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: string;
  success?: boolean;
  className?: string;
};

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading = false, loadingText = "Loading...", success = false, className, children }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);

    React.useEffect(() => {
      setIsLoading(loading);
      if (loading) {
        setShowSuccess(false);
      }
    }, [loading]);

    // When success prop changes
    React.useEffect(() => {
      if (success && !isLoading) {
        setShowSuccess(true);
        // Auto-reset after 2 seconds
        const timeout = setTimeout(() => setShowSuccess(false), 2000);
        return () => clearTimeout(timeout);
      }
    }, [success, isLoading]);

    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
      const el = buttonRef.current;
      if (el && showSuccess) {
        // Measure width and set min-width to prevent jump
        el.style.minWidth = `${el.clientWidth}px`;
      }
    }, [showSuccess]);

    return (
      <button
        ref={ref}
        disabled={loading || showSuccess}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border transition-all duration-150",
          "motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        {showSuccess ? (
          <>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0 text-primary"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            {success}
          </>
        ) : null}
        {!showSuccess && (!loading ? children : loadingText)}
        {!showSuccess && loading && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="flex-shrink-0 animate-spin"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14l8-8l-4-4" />
          </svg>
        )}
      </button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };

