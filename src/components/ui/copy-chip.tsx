"use client";
import { cn } from "./lib/utils";
import { useCopy } from "./lib/hooks";

export type CopyChipProps = {
  value: string;
  label?: string;
};


const CopyChip = ({ value, label = "COPY" }: CopyChipProps) => {
  const { copied, copy } = useCopy();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border bg-background p-2",
        "animate-[stampIn_0.2s_ease-out_both]",
        "motion-reduce:animate-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
      onCopy={() => copy(value)}
    >
      <span className="font-mono text-sm">
        {value}
      </span>
      <span className="ms-2 text-xs">
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
