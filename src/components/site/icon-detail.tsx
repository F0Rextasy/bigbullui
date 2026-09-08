"use client";

import * as React from "react";
import Link from "next/link";
import { NavIcon, type NavIconName } from "@/components/site/nav-icons";
import { CodeBox } from "@/components/site/code-box";

type Anim = "draw" | "pulse" | "spin" | "none";

const MODES: { value: Anim; label: string }[] = [
  { value: "draw", label: "Draw" },
  { value: "pulse", label: "Pulse" },
  { value: "spin", label: "Spin" },
  { value: "none", label: "Static" },
];

const BTN =
  "rounded-md border px-2.5 py-1.5 font-mono text-[11px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const BTN_ACTIVE = "border-foreground bg-primary font-bold text-primary-foreground";
const BTN_IDLE = "border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground";

export function IconDetail({ name, prev, next, index, total }: { name: NavIconName; prev: string; next: string; index: number; total: number }) {
  const [animation, setAnimation] = React.useState<Anim>("draw");
  const [replayKey, setReplayKey] = React.useState(0);
  const snippet = `<StampIcon name="${name}" />`;
  return (
    <>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/icons"
          className="rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← All icons
        </Link>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {index + 1} / {total}
        </p>
      </nav>
      <header className="space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          BIGBULLUI // ICONS
        </p>
        <h1 className="max-w-full break-all font-mono text-3xl font-black uppercase tracking-tight sm:text-4xl">
          {name}
        </h1>
      </header>
      <section
        aria-label="Icon preview"
        className="rounded-lg border border-border bg-card p-4 sm:p-6"
      >
        <div className="rounded-md border-2 border-dashed border-foreground/30 bg-background p-8 text-center">
          <NavIcon
            key={replayKey}
            name={name}
            size={96}
            animation={animation}
            className="mx-auto max-w-full text-foreground"
          />
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            size 96 // {animation === "none" ? "static" : animation}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Animation">
          {MODES.map((mode) => (
            <button
              key={mode.value}
              type="button"
              onClick={() => setAnimation(mode.value)}
              aria-pressed={animation === mode.value}
              className={`${BTN} ${animation === mode.value ? BTN_ACTIVE : BTN_IDLE}`}
            >
              {mode.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setReplayKey((k) => k + 1)}
            className={`${BTN} ${BTN_IDLE}`}
          >
            Replay
          </button>
        </div>
      </section>
      <div className="min-w-0 space-y-2">
        <CodeBox block code={snippet} />
        <CodeBox code="npm install bigbullicons" />
      </div>
      <nav aria-label="More icons" className="flex items-center justify-between gap-2">
        <Link
          href={`/icons/${prev}`}
          className="min-w-0 max-w-[48%] truncate rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← {prev}
        </Link>
        <Link
          href={`/icons/${next}`}
          className="min-w-0 max-w-[48%] truncate rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {next} →
        </Link>
      </nav>
    </>
  );
}
