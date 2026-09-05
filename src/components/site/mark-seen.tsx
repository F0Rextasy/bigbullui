"use client";

import * as React from "react";
import { markSeen } from "@/components/site/seen-store";

export function MarkSeen({ name }: { name: string }) {
  React.useEffect(() => {
    markSeen(name);
  }, [name]);
  return null;
}
