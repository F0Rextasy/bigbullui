"use client";

import * as React from "react";

const STARTER = "F0Rextasy/bigbullui/tree/main/packages/create-app/template";

function buildStackBlitzUrl(name: string): string {
  const params = new URLSearchParams({
    file: "app/page.tsx",
    title: `bigbullui starter - ${name}`,
    description: `bigbullui create-app starter, opened for ${name}`,
  });
  return `https://stackblitz.com/fork/github/${STARTER}?${params.toString()}`;
}

export function DocsStackBlitzButton({ name }: { name: string }) {
  const href = React.useMemo(() => buildStackBlitzUrl(name), [name]);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      Starter template
    </a>
  );
}
