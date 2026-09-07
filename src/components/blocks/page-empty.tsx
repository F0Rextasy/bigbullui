"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function PageEmpty() {
  return (
    <div className="mx-auto w-full max-w-lg space-y-4 rounded-lg border-2 border-dashed border-border bg-card p-10 text-center">
      <Badge variant="outline" className="mx-auto">EMPTY ROW</Badge>
      <p className="font-mono text-xl font-black uppercase tracking-tight">Nothing on this stub yet</p>
      <p className="text-sm text-muted-foreground">No rows match. Clear the filter or print the first stub to fill this section.</p>
      <div className="flex justify-center gap-2">
        <Button size="sm">Create stub</Button>
        <Button size="sm" variant="outline">Clear filters</Button>
      </div>
    </div>
  );
}
