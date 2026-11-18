"use client";

import * as React from "react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/components/ui/lib/utils";
import previewWaves from "@/data/preview-waves.json";

type PreviewMap = Record<string, React.ComponentType>;

const WAVE_LOADERS: Record<string, () => Promise<PreviewMap>> = {
  "wave-core": async () => (await import("@/components/site/previews/wave-core")).waveCorePreviews,
  "wave-advanced": async () => (await import("@/components/site/previews/wave-advanced")).waveAdvancedPreviews,
  wave1: async () => (await import("@/components/site/previews/wave1")).wave1Previews,
  wave2: async () => (await import("@/components/site/previews/wave2")).wave2Previews,
  wave3: async () => (await import("@/components/site/previews/wave3")).wave3Previews,
  wave4: async () => (await import("@/components/site/previews/wave4")).wave4Previews,
  wave5: async () => (await import("@/components/site/previews/wave5")).wave5Previews,
  wave6: async () => (await import("@/components/site/previews/wave6")).wave6Previews,
  wave7: async () => (await import("@/components/site/previews/wave7")).wave7Previews,
  wave8: async () => (await import("@/components/site/previews/wave8")).wave8Previews,
  wave9: async () => (await import("@/components/site/previews/wave9")).wave9Previews,
  wave10: async () => (await import("@/components/site/previews/wave10")).wave10Previews,
  wave11: async () => (await import("@/components/site/previews/wave11")).wave11Previews,
  wave12: async () => (await import("@/components/site/previews/wave12")).wave12Previews,
  wave13: async () => (await import("@/components/site/previews/wave13")).wave13Previews,
  wave14: async () => (await import("@/components/site/previews/wave14")).wave14Previews,
  wave15: async () => (await import("@/components/site/previews/wave15")).wave15Previews,
  wave16: async () => (await import("@/components/site/previews/wave16")).wave16Previews,
  wave17: async () => (await import("@/components/site/previews/wave17")).wave17Previews,
  wave18: async () => (await import("@/components/site/previews/wave18")).wave18Previews,
  wave19: async () => (await import("@/components/site/previews/wave19")).wave19Previews,
  wave20: async () => (await import("@/components/site/previews/wave20")).wave20Previews,
  wave21: async () => (await import("@/components/site/previews/wave21")).wave21Previews,
  wave22: async () => (await import("@/components/site/previews/wave22")).wave22Previews,
  wave23: async () => (await import("@/components/site/previews/wave23")).wave23Previews,
  wave24: async () => (await import("@/components/site/previews/wave24")).wave24Previews,
  wave25: async () => (await import("@/components/site/previews/wave25")).wave25Previews,
  wave26: async () => (await import("@/components/site/previews/wave26")).wave26Previews,
  wave27: async () => (await import("@/components/site/previews/wave27")).wave27Previews,
  wave28: async () => (await import("@/components/site/previews/wave28")).wave28Previews,
  wave29: async () => (await import("@/components/site/previews/wave29")).wave29Previews,
  wave30: async () => (await import("@/components/site/previews/wave30")).wave30Previews,
  wave31: async () => (await import("@/components/site/previews/wave31")).wave31Previews,
};

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
        </div>
      </div>

      {/* Render Canvas */}
      <div
        key={reloadKey}
        className={cn(
          "flex min-h-52 w-full items-center justify-center overflow-x-auto p-4 transition-colors sm:p-8",
          isDark ? "dark bg-background text-foreground" : "light bg-card text-foreground",
          !isAnimated && "[&_*]:animate-none [&_*]:transition-none"
        )}
      >
        <div className="w-full transition-all duration-300 motion-reduce:transition-none" style={{ maxWidth: viewportWidth }}>
          {Preview ? (
            <Preview />
          ) : (
            <div className="mx-auto h-28 w-full max-w-md animate-pulse motion-reduce:animate-none rounded-md border border-dashed border-border bg-secondary/40" role="status" aria-label="Loading component preview" />
          )}
        </div>
      </div>
    </div>
  );
}
