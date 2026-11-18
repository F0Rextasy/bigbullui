"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "@/components/theme-provider";
import { CodeBox } from "@/components/site/code-box";
import { cn } from "@/components/ui/lib/utils";
import { slugTitle } from "@/lib/site-meta";

export interface BlockViewerProps {
  slug: string;
  title: string;
  code: string;
  uiDeps: string[];
  children: React.ReactNode;
}

export function BlockViewer({ slug, title, code, uiDeps, children }: BlockViewerProps) {
  const { resolved } = useTheme();
  const [tab, setTab] = React.useState<"preview" | "source">("preview");
  const [viewport, setViewport] = React.useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewTheme, setPreviewTheme] = React.useState<"auto" | "light" | "dark">("auto");
  const isDark = previewTheme === "auto" ? resolved === "dark" : previewTheme === "dark";
  const previewTabRef = React.useRef<HTMLButtonElement>(null);
  const sourceTabRef = React.useRef<HTMLButtonElement>(null);
  const baseId = React.useId();

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "Home" || e.key === "End") {
      e.preventDefault();
      const next =
        e.key === "Home"
          ? "preview"
          : e.key === "End"
            ? "source"
            : tab === "preview"
              ? "source"
              : "preview";
      setTab(next);
      (next === "preview" ? previewTabRef : sourceTabRef).current?.focus();
    }
  };

  const viewportWidth = viewport === "mobile" ? "375px" : viewport === "tablet" ? "768px" : "100%";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2">
        <div
          role="tablist"
          aria-label={`${title} view`}
          className="flex items-center gap-1 rounded border border-border bg-card p-0.5 font-mono text-[11px]"
        >
          <button
            ref={previewTabRef}
            id={`${baseId}-tab-preview`}
            role="tab"
            type="button"
            aria-selected={tab === "preview"}
            aria-controls={`${baseId}-panel-preview`}
            tabIndex={tab === "preview" ? 0 : -1}
            onClick={() => setTab("preview")}
            onKeyDown={onTabKeyDown}
            className={cn(
              "cursor-pointer rounded px-2.5 py-1 uppercase transition-colors",
              tab === "preview" ? "bg-primary font-semibold text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Preview
          </button>
          <button
            ref={sourceTabRef}
            id={`${baseId}-tab-source`}
            role="tab"
            type="button"
            aria-selected={tab === "source"}
            aria-controls={`${baseId}-panel-source`}
            tabIndex={tab === "source" ? 0 : -1}
            onClick={() => setTab("source")}
            onKeyDown={onTabKeyDown}
            className={cn(
              "cursor-pointer rounded px-2.5 py-1 uppercase transition-colors",
              tab === "source" ? "bg-primary font-semibold text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Source
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {tab === "preview" ? (
            <>
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
                      viewport === mode ? "bg-primary font-semibold text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {mode === "mobile" ? "375" : mode === "tablet" ? "768" : "100%"}
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-pressed={isDark}
                onClick={() => setPreviewTheme(isDark ? "light" : "dark")}
                className={cn(
                  "cursor-pointer rounded border px-2 py-0.5 font-mono text-[11px] uppercase transition-colors active:scale-95 motion-reduce:active:scale-100",
                  isDark ? "border-accent bg-accent/15 font-semibold text-accent-strong" : "border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {previewTheme === "auto" ? `Auto ${isDark ? "Night" : "Paper"}` : isDark ? "Night" : "Paper"}
              </button>
            </>
          ) : (
            <span className="font-mono text-[11px] text-muted-foreground">
              components/blocks/{slug}.tsx
            </span>
          )}
        </div>
      </div>

      {tab === "preview" ? (
        <div
          id={`${baseId}-panel-preview`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-preview`}
          className={cn(
            "overflow-x-auto rounded-lg border border-border p-4 transition-colors sm:p-6",
            isDark ? "dark bg-background text-foreground" : "light bg-card text-foreground"
          )}
        >
          <div
            className="mx-auto w-full transition-all duration-300 motion-reduce:transition-none"
            style={{ maxWidth: viewportWidth }}
          >
            {children}
          </div>
        </div>
      ) : (
        <div
          id={`${baseId}-panel-source`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-source`}
        >
          <CodeBox code={code} maxHeight="36rem" block />
        </div>
      )}

      {uiDeps.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            UI dependencies:
          </span>
          {uiDeps.map((dep) => (
            <Link
              key={dep}
              href={`/docs/${dep}`}
              className="rounded border border-dashed border-border bg-card px-2 py-0.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
            >
              {slugTitle(dep)}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
