"use client";

import * as React from "react";
import { CodeBox } from "@/components/site/code-box";
import { cn } from "@/components/ui/lib/utils";

export type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const PMS: PackageManager[] = ["npm", "pnpm", "yarn", "bun"];
const STORAGE_KEY = "bigbullui-pm";
const EVENT_NAME = "bigbullui-pm-change";

function readPm(): PackageManager {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "npm" || v === "pnpm" || v === "yarn" || v === "bun") return v;
  } catch {
    // Storage may be unavailable in restricted contexts
  }
  return "npm";
}

function subscribePm(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT_NAME, cb);
    window.removeEventListener("storage", cb);
  };
}

function convertCommand(cmd: string, pm: PackageManager): string {
  if (pm === "npm") return cmd;
  if (cmd.startsWith("npx ")) {
    const rest = cmd.slice(4);
    if (pm === "pnpm") return `pnpm dlx ${rest}`;
    if (pm === "yarn") return `yarn dlx ${rest}`;
    return `bunx ${rest}`;
  }
  if (/^npm\s+(install|i)\s+/.test(cmd)) {
    const rest = cmd.replace(/^npm\s+(install|i)\s+/, "");
    if (pm === "pnpm") return `pnpm add ${rest}`;
    if (pm === "yarn") return `yarn add ${rest}`;
    return `bun add ${rest}`;
  }
  return cmd;
}

export function PackageManagerTabs({
  command,
  commands,
}: {
  command?: string;
  commands?: Partial<Record<PackageManager, string>>;
}) {
  const pm = React.useSyncExternalStore(subscribePm, readPm, () => "npm" as PackageManager);

  const selectPm = (next: PackageManager) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage write errors
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(EVENT_NAME));
    }
  };

  const activeCmd = commands?.[pm] ?? convertCommand(command ?? commands?.npm ?? "", pm);

  return (
    <div className="space-y-2">
      <div
        role="tablist"
        aria-label="Package manager"
        className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary/50 p-1 font-mono text-[11px]"
      >
        {PMS.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={pm === item}
            onClick={() => selectPm(item)}
            className={cn(
              "cursor-pointer rounded px-2.5 py-1 uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              pm === item
                ? "bg-primary font-semibold text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div>
        <CodeBox code={activeCmd} language="bash" />
      </div>
    </div>
  );
}
