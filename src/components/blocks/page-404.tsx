"use client";

import * as React from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

export function Page404() {
  return (
    <div className="mx-auto w-full max-w-lg space-y-5 rounded-lg border-2 border-foreground bg-card p-10 text-center outline-1 outline-dashed outline-offset-[-7px]">
      <Badge variant="accent" className="mx-auto">VOID STUB // 404</Badge>
      <p className="font-mono text-7xl font-black tracking-tight">404</p>
      <p className="font-mono text-sm font-bold uppercase tracking-[0.2em]">This gate leads nowhere</p>
      <p className="text-sm text-muted-foreground">The stub you scanned does not match any row, seat, or page in this arena.</p>
      <div className="flex justify-center gap-2">
        <Button>Back to box office</Button>
        <Button variant="outline">View map</Button>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">SERIAL // LOST-404-G3</p>
    </div>
  );
}
