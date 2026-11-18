"use client";

import * as React from "react";
import { cn } from "../ui/lib/utils";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export interface PageEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  onAction?: (action: string) => void;
}

export function PageEmpty({ className, onAction, ...props }: PageEmptyProps) {
  const [notice, setNotice] = React.useState<string | null>(null);
  return (
    <div className={cn("mx-auto w-full max-w-lg space-y-4 rounded-lg border-2 border-dashed border-border bg-card p-10 text-center", className)} {...props}>
      <Badge variant="outline" className="mx-auto">EMPTY ROW</Badge>
      <p className="font-mono text-xl font-black uppercase tracking-tight">Nothing on this stub yet</p>
      <p className="text-sm text-muted-foreground">No rows match. Clear the filter or print the first stub to fill this section.</p>
      <div className="flex justify-center gap-2">
        <Button size="sm" onClick={() => { setNotice("Blank stub opened."); onAction?.("create-stub"); }}>Create stub</Button>
        <Button size="sm" variant="outline" onClick={() => { setNotice("Filters reset."); onAction?.("clear-filters"); }}>Clear filters</Button>
      </div>
      {notice && <p role="status" className="font-mono text-[10px] uppercase tracking-wider text-accent">{notice}</p>}
    </div>
  );
}
