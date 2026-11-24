"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export interface Page404Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  badgeLabel?: string;
  code?: string;
  title?: string;
  description?: string;
  serial?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onAction?: (action: string) => void;
}

export function Page404({
  badgeLabel = "VOID STUB // 404",
  code = "404",
  title = "This gate leads nowhere",
  description = "The stub you scanned does not match any row, seat, or page in this arena.",
  serial = "SERIAL // LOST-404-G3",
  primaryLabel = "Back to box office",
  secondaryLabel = "View map",
  onPrimaryAction,
  onSecondaryAction,
  className,
  onAction,
  ...props
}: Page404Props) {
  const [notice, setNotice] = React.useState<string | null>(null);
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-lg space-y-5 rounded-lg border-2 border-foreground bg-card p-10 text-center outline-1 outline-dashed outline-offset-[-7px]",
        className
      )}
      {...props}
    >
      <Badge variant="accent" className="mx-auto">
        {badgeLabel}
      </Badge>
      <p className="font-mono text-7xl font-black tracking-tight">{code}</p>
      <p className="font-mono text-sm font-bold uppercase tracking-[0.2em]">{title}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex justify-center gap-2">
        <Button
          onClick={() => {
            setNotice("Returning to box office...");
            onPrimaryAction?.();
            onAction?.("back-home");
          }}
        >
          {primaryLabel}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setNotice("Loading venue map...");
            onSecondaryAction?.();
            onAction?.("view-map");
          }}
        >
          {secondaryLabel}
        </Button>
      </div>
      {notice && (
        <p role="status" className="font-mono text-[10px] uppercase tracking-widest text-accent">
          {notice}
        </p>
      )}
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{serial}</p>
    </div>
  );
}
