"use client";

import * as React from "react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/components/ui/lib/utils";
import previewWaves from "@/data/preview-waves.json";
import { WAVE_LOADERS, type PreviewMap } from "@/components/site/wave-loaders";
import { PreviewErrorBoundary } from "@/components/site/preview-error-boundary";

const loadedWaves = new Map<string, PreviewMap>();
const pendingWaves = new Map<string, Promise<PreviewMap>>();

export function ComponentPreview({ name }: { name: string }) {
  const { resolved } = useTheme();
  const [previewTheme, setPreviewTheme] = React.useState<"auto" | "light" | "dark">("auto");
  const isDark = previewTheme === "auto" ? resolved === "dark" : previewTheme === "dark";
  const [reloadKey, setReloadKey] = React.useState(0);
  const [isAnimated, setIsAnimated] = React.useState(true);
  const [viewport, setViewport] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [, setWaveTick] = React.useState(0);
  const [failedWave, setFailedWave] = React.useState<string | null>(null);

  const waveName = (previewWaves as Record<string, string>)[name];

  React.useEffect(() => {
    if (!waveName || loadedWaves.has(waveName)) return;
    const loader = WAVE_LOADERS[waveName];
    if (!loader) return;
    let active = true;
    let pending = pendingWaves.get(waveName);
    if (!pending) {
      pending = loader().then((mod) => {
        loadedWaves.set(waveName, mod);
        pendingWaves.delete(waveName);
        return mod;
      });
      pendingWaves.set(waveName, pending);
    }
    pending
      .then(() => {
        if (active) setWaveTick((t) => t + 1);
      })
      .catch(() => {
        pendingWaves.delete(waveName);
        if (active) setFailedWave(waveName);
      });
    return () => {
      active = false;
    };
  }, [waveName]);

  if (!waveName || !WAVE_LOADERS[waveName] || failedWave === waveName) {
    return <p className="text-sm text-muted-foreground font-mono">Preview not available.</p>;
  }

  const waveModule = loadedWaves.get(waveName);
  const Preview = waveModule?.[name];

  if (waveModule && !Preview) {
    return <p className="text-sm text-muted-foreground font-mono">Preview not available.</p>;
  }

  const viewportWidth = viewport === "mobile" ? "375px" : viewport === "tablet" ? "768px" : "100%";

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-2xs">
      {/* Interactive Canvas Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-secondary/40 px-3 py-2 text-xs sm:px-4">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-accent/70" aria-hidden="true" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Live Preview
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div className="flex items-center overflow-hidden rounded border border-border bg-card font-mono text-[11px]" role="group" aria-label="Viewport width">
            {(["mobile", "tablet", "desktop"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={viewport === mode}
                onClick={() => setViewport(mode)}
                title={mode === "mobile" ? "Mobile 375px" : mode === "tablet" ? "Tablet 768px" : "Desktop full width"}
                className={cn(
                  "cursor-pointer px-2 py-0.5 uppercase transition-colors active:scale-95 motion-reduce:active:scale-100",
                  viewport === mode
                    ? "bg-primary font-semibold text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {mode === "mobile" ? "375" : mode === "tablet" ? "768" : "100%"}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-pressed={isAnimated}
            onClick={() => setIsAnimated((a) => !a)}
            title="Toggle motion on the preview canvas"
            className={cn(
              "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] uppercase transition-colors active:scale-95 motion-reduce:active:scale-100",
              isAnimated
                ? "border-accent bg-accent font-semibold text-accent-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {isAnimated ? "Motion" : "Static"}
          </button>
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            title="Reset component state & replay entrance animations"
            className="cursor-pointer rounded border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground active:scale-95 motion-reduce:active:scale-100"
          >
            ↻ Replay
          </button>
          <button
            type="button"
            aria-pressed={isDark}
            onClick={() => setPreviewTheme(isDark ? "light" : "dark")}
            title="Preview canvas: follows the site theme until you switch it"
            className={cn(
              "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] uppercase transition-colors active:scale-95 motion-reduce:active:scale-100",
              isDark
                ? "border-accent bg-accent/15 font-semibold text-accent-strong"
                : "border-border bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {previewTheme === "auto" ? `Auto ${isDark ? "Night" : "Paper"}` : isDark ? "Night" : "Paper"}
          </button>
          <a
            href={`/preview/${name}`}
            target="_blank"
            rel="noreferrer"
            title="Open isolated preview in a new tab"
            className="rounded border border-border bg-card px-2 py-0.5 font-mono text-[11px] uppercase text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            Open ↗
          </a>
        </div>
      </div>

      {/* Render Canvas */}
      <div
        key={reloadKey}
        className={cn(
          "flex min-h-52 w-full items-center justify-center overflow-x-auto p-4 transition-colors sm:p-8",
          previewTheme === "auto"
            ? "bg-card text-foreground dark:bg-background"
            : isDark
              ? "dark bg-background text-foreground"
              : "light bg-card text-foreground",
          !isAnimated && "[&_*]:animate-none [&_*]:transition-none"
        )}
      >
        {viewport !== "desktop" ? (
          <iframe
            key={`${name}-${viewport}-${previewTheme}-${reloadKey}`}
            src={`/preview/${name}${previewTheme !== "auto" ? `?theme=${previewTheme}` : ""}`}
            title={`${name} ${viewport} isolated preview`}
            style={{ width: viewportWidth, maxWidth: "100%" }}
            className="h-80 rounded-md border-2 border-dashed border-border bg-background"
          />
        ) : (
          <div className="w-full transition-[max-width] duration-300 motion-reduce:transition-none" style={{ maxWidth: viewportWidth }}>
            <PreviewErrorBoundary resetKey={`${name}-${reloadKey}`}>
              {Preview ? (
                <Preview />
              ) : (
                <div className="mx-auto h-28 w-full max-w-md animate-pulse motion-reduce:animate-none rounded-md border border-dashed border-border bg-secondary/40" role="status" aria-label="Loading component preview" />
              )}
            </PreviewErrorBoundary>
          </div>
        )}
      </div>
    </div>
  );
}
