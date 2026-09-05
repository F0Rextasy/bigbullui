"use client";
import * as React from "react";
import { cn } from "./lib/utils";

export type CopyChipProps = {
  value: string;
  label?: string;
};

const copyChipKeyframes = `
  @keyframes stampIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;

const CopyChip = ({ value, label = "COPY" }: CopyChipProps) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for SSR/non-browser
        const textarea = document.createElement("textarea");
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
    } catch (e) {
      console.error("Copy failed", e);
    }
    setCopied(false);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border bg-background p-2",
        "animate-[stampIn_0.2s_ease-out_both]",
        "motion-reduce:animate-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      onCopy={handleCopy}
    >
      <span className="font-mono text-sm">
        {value}
      </span>
      <span className="ml-2 text-xs">
        {label}
      </span>
      {copied && (
        <span className="text-xs text-primary-foreground">
          COPIED
        </span>
      )}
    </div>
  );
};

export { CopyChip };
