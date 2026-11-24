"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { PreviewErrorBoundary } from "@/components/site/preview-error-boundary";
import { WAVE_LOADERS, type PreviewMap } from "@/components/site/wave-loaders";
import previewWaves from "@/data/preview-waves.json";
import { cn } from "@/components/ui/lib/utils";

const cache = new Map<string, PreviewMap>();

export function IsolatedPreviewShell({ name }: { name: string }) {
  const searchParams = useSearchParams();
  const forcedTheme = searchParams.get("theme");
  const waveName = (previewWaves as Record<string, string>)[name];
  const [, setTick] = React.useState(0);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (forcedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (forcedTheme === "light") {
      document.documentElement.classList.remove("dark");
    }
  }, [forcedTheme]);

  React.useEffect(() => {
    if (!waveName || cache.has(waveName)) return;
    const loader = WAVE_LOADERS[waveName];
    if (!loader) return;
    let active = true;
    loader()
      .then((mod) => {
        cache.set(waveName, mod);
        if (active) setTick((t) => t + 1);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [waveName]);

  const Preview = waveName ? cache.get(waveName)?.[name] : undefined;

  return (
    <div
      className={cn(
        "flex min-h-screen w-full items-center justify-center p-4 sm:p-6",
        forcedTheme === "dark"
          ? "dark bg-background text-foreground"
          : forcedTheme === "light"
            ? "light bg-card text-foreground"
            : "bg-card text-foreground dark:bg-background"
      )}
    >
      <PreviewErrorBoundary resetKey={name}>
        {failed ? (
          <p className="font-mono text-xs text-muted-foreground">Preview unavailable.</p>
        ) : Preview ? (
          <div className="w-full flex justify-center">
            <Preview />
          </div>
        ) : (
          <div
            role="status"
            aria-label="Loading preview"
            className="h-24 w-full max-w-sm animate-pulse motion-reduce:animate-none rounded-md border border-dashed border-border bg-secondary/40"
          />
        )}
      </PreviewErrorBoundary>
    </div>
  );
}
