"use client";
import * as React from "react";
import { cn } from "./lib/utils";

export type TruncateProps = {
  lines?: number;
  expandable?: boolean;
  children: React.ReactNode;
};

const Truncate = ({ lines = 1, expandable = true, children }: TruncateProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showMore, setShowMore] = React.useState(false);

  const toText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    return "";
  };

  const displayText = React.useMemo(() => {
    const text = toText(children);
    if (!expandable || text.length <= 200) {
      return text;
    }
    return text.substring(0, 200) + "...";
  }, [children, expandable]);

  if (!expandable) {
    return <div className="whitespace-break-all">{children}</div>;
  }

  const lineHeight = 1.25;
  const maxHeight = lines * lineHeight;

  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden animate-[fade-in-up_0.3s_ease-out_both]",
        "motion-reduce:animate-none"
      )}
      style={{ maxHeight }}
    >
      {showMore ? children : (
        <div className="flex flex-col">
          {React.Children.toArray(children).slice(0, lines)}
        </div>
      )}
      {showMore ? null : (
        <button
          onClick={() => setShowMore(true)}
          className={cn(
            "mt-1 text-xs font-mono uppercase tracking-[0.15em] text-primary-foreground hover:text-primary",
            "transition-colors"
          )}
        >
          MORE
        </button>
      )}
    </div>
  );
};

export { Truncate };
