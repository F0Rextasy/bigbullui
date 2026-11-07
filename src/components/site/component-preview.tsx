"use client";

import * as React from "react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/components/ui/lib/utils";
import { waveCorePreviews } from "@/components/site/previews/wave-core";
import { waveAdvancedPreviews } from "@/components/site/previews/wave-advanced";
import { wave1Previews } from "@/components/site/previews/wave1";
import { wave2Previews } from "@/components/site/previews/wave2";
import { wave3Previews } from "@/components/site/previews/wave3";
import { wave4Previews } from "@/components/site/previews/wave4";
import { wave5Previews } from "@/components/site/previews/wave5";
import { wave6Previews } from "@/components/site/previews/wave6";
import { wave7Previews } from "@/components/site/previews/wave7";
import { wave8Previews } from "@/components/site/previews/wave8";
import { wave9Previews } from "@/components/site/previews/wave9";
import { wave10Previews } from "@/components/site/previews/wave10";
import { wave11Previews } from "@/components/site/previews/wave11";
import { wave12Previews } from "@/components/site/previews/wave12";
import { wave13Previews } from "@/components/site/previews/wave13";
import { wave14Previews } from "@/components/site/previews/wave14";
import { wave15Previews } from "@/components/site/previews/wave15";
import { wave16Previews } from "@/components/site/previews/wave16";
import { wave17Previews } from "@/components/site/previews/wave17";
import { wave18Previews } from "@/components/site/previews/wave18";
import { wave19Previews } from "@/components/site/previews/wave19";
import { wave20Previews } from "@/components/site/previews/wave20";
import { wave21Previews } from "@/components/site/previews/wave21";
import { wave22Previews } from "@/components/site/previews/wave22";
import { wave23Previews } from "@/components/site/previews/wave23";
import { wave24Previews } from "@/components/site/previews/wave24";
import { wave25Previews } from "@/components/site/previews/wave25";
import { wave26Previews } from "@/components/site/previews/wave26";
import { wave27Previews } from "@/components/site/previews/wave27";
import { wave28Previews } from "@/components/site/previews/wave28";
import { wave29Previews } from "@/components/site/previews/wave29";
import { wave30Previews } from "@/components/site/previews/wave30";
import { wave31Previews } from "@/components/site/previews/wave31";

const previews: Record<string, React.ComponentType> = Object.assign(
  {},
  waveCorePreviews,
  waveAdvancedPreviews,
  wave1Previews,
  wave10Previews,
  wave11Previews,
  wave12Previews,
  wave20Previews,
  wave22Previews,
  wave23Previews,
  wave24Previews,
  wave25Previews,
  wave2Previews,
  wave3Previews,
  wave4Previews,
  wave5Previews,
  wave6Previews,
  wave7Previews,
  wave8Previews,
  wave9Previews,
  wave13Previews,
  wave14Previews,
  wave15Previews,
  wave16Previews,
  wave17Previews,
  wave18Previews,
  wave19Previews,
  wave21Previews,
  wave26Previews,
  wave27Previews,
  wave28Previews,
  wave30Previews,
  wave31Previews,
  wave29Previews,
);

export function ComponentPreview({ name }: { name: string }) {
  const { resolved } = useTheme();
  const [previewTheme, setPreviewTheme] = React.useState<"auto" | "light" | "dark">("auto");
  const isDark = previewTheme === "auto" ? resolved === "dark" : previewTheme === "dark";
  const [reloadKey, setReloadKey] = React.useState(0);
  const [isAnimated, setIsAnimated] = React.useState(true);
  const [viewport, setViewport] = React.useState<"desktop" | "tablet" | "mobile">("desktop");

  const Preview = previews[name];
  if (!Preview) {
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
                onClick={() => setViewport(mode)}
                title={mode === "mobile" ? "Mobile 375px" : mode === "tablet" ? "Tablet 768px" : "Desktop full width"}
                className={cn(
                  "cursor-pointer px-2 py-0.5 uppercase transition-colors active:scale-95",
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
            onClick={() => setIsAnimated((a) => !a)}
            title="Toggle motion on the preview canvas"
            className={cn(
              "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] uppercase transition-colors active:scale-95",
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
            className="cursor-pointer rounded border border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground active:scale-95"
          >
            ↻ Replay
          </button>
          <button
            type="button"
            onClick={() => setPreviewTheme(isDark ? "light" : "dark")}
            title="Preview canvas: follows the site theme until you switch it"
            className={cn(
              "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] uppercase transition-colors active:scale-95",
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
        <div className="w-full transition-all duration-300" style={{ maxWidth: viewportWidth }}>
          <Preview />
        </div>
      </div>
    </div>
  );
}
