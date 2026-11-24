"use client";

import * as React from "react";
import { CodeBox } from "@/components/site/code-box";

export type PropMeta = {
  name: string;
  type: string;
  description: string;
};

type ControlDef =
  | { name: string; kind: "boolean"; defaultVal: boolean; description: string }
  | { name: string; kind: "union"; options: string[]; defaultVal: string; description: string }
  | { name: string; kind: "number"; defaultVal: number; description: string }
  | { name: string; kind: "string"; defaultVal: string; description: string };

const SKIP_NAMES = new Set([
  "className",
  "style",
  "children",
  "ref",
  "key",
  "id",
]);

function extractDefaultFromDesc(desc: string): string | null {
  const m = desc.match(/Default:\s*["']?([^"'\s,;)]+)["']?/i);
  return m ? m[1] : null;
}

function buildControls(propsList: PropMeta[]): ControlDef[] {
  const out: ControlDef[] = [];
  for (const prop of propsList) {
    if (SKIP_NAMES.has(prop.name) || prop.name.startsWith("on") || prop.type.includes("=>")) continue;
    const t = prop.type.trim();
    const defHint = extractDefaultFromDesc(prop.description);

    // String union e.g. "default" | "outline" | "ghost"
    const unionMatches = [...t.matchAll(/["']([^"']+)["']/g)].map((m) => m[1]);
    if (unionMatches.length >= 2 && !t.includes("{")) {
      out.push({
        name: prop.name,
        kind: "union",
        options: unionMatches,
        defaultVal: defHint && unionMatches.includes(defHint) ? defHint : unionMatches[0],
        description: prop.description,
      });
    } else if (t === "boolean") {
      out.push({
        name: prop.name,
        kind: "boolean",
        defaultVal: defHint === "true",
        description: prop.description,
      });
    } else if (t === "number") {
      const n = defHint ? Number(defHint) : 1;
      out.push({
        name: prop.name,
        kind: "number",
        defaultVal: Number.isFinite(n) ? n : 1,
        description: prop.description,
      });
    } else if (t === "string") {
      out.push({
        name: prop.name,
        kind: "string",
        defaultVal: defHint ?? (prop.name === "label" ? "Admit one" : "Sample"),
        description: prop.description,
      });
    }
    if (out.length >= 6) break;
  }
  return out;
}

export function LivePropPlayground({
  name,
  primarySymbol,
  isLib,
  propsList,
}: {
  name: string;
  primarySymbol: string;
  isLib: boolean;
  propsList: PropMeta[];
}) {
  const controls = React.useMemo(() => buildControls(propsList), [propsList]);
  const initialValues = React.useMemo(() => {
    const map: Record<string, string | number | boolean> = {};
    for (const c of controls) map[c.name] = c.defaultVal;
    return map;
  }, [controls]);

  const [values, setValues] = React.useState<Record<string, string | number | boolean>>(initialValues);

  if (controls.length === 0) return null;

  const propAttrs = controls
    .map((c) => {
      const val = values[c.name];
      if (val === c.defaultVal) return null;
      if (c.kind === "boolean") return val ? c.name : `${c.name}={false}`;
      if (c.kind === "number") return `${c.name}={${val}}`;
      return `${c.name}=${JSON.stringify(String(val))}`;
    })
    .filter(Boolean);

  const importPath = isLib ? `@/components/ui/lib/${name}` : `@/components/ui/${name}`;
  const jsxCode = isLib
    ? `import { ${primarySymbol} } from "${importPath}";`
    : `import { ${primarySymbol} } from "${importPath}";\n\n<${primarySymbol}${propAttrs.length ? " " + propAttrs.join(" ") : ""} />`;

  return (
    <section aria-labelledby="prop-playground-heading" className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-border pb-3">
        <div>
          <h2 id="prop-playground-heading" className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
            Interactive Prop Playground
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Tweak parsed AST props below to generate ready-to-paste JSX.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setValues(initialValues)}
          className="cursor-pointer rounded border border-border bg-background px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          Reset props
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {controls.map((c) => {
          const val = values[c.name];
          if (c.kind === "boolean") {
            return (
              <label
                key={c.name}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-md border border-border bg-background px-3 py-2"
              >
                <span className="font-mono text-xs text-foreground">{c.name}</span>
                <input
                  type="checkbox"
                  checked={Boolean(val)}
                  onChange={(e) => setValues((prev) => ({ ...prev, [c.name]: e.target.checked }))}
                  className="size-4 accent-accent-strong"
                />
              </label>
            );
          }
          if (c.kind === "union") {
            return (
              <label key={c.name} className="space-y-1">
                <span className="block font-mono text-[11px] uppercase text-muted-foreground">{c.name}</span>
                <select
                  value={String(val)}
                  onChange={(e) => setValues((prev) => ({ ...prev, [c.name]: e.target.value }))}
                  className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {c.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>
            );
          }
          if (c.kind === "number") {
            return (
              <label key={c.name} className="space-y-1">
                <span className="block font-mono text-[11px] uppercase text-muted-foreground">{c.name}</span>
                <input
                  type="number"
                  value={Number(val)}
                  onChange={(e) => setValues((prev) => ({ ...prev, [c.name]: Number(e.target.value) }))}
                  className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            );
          }
          return (
            <label key={c.name} className="space-y-1">
              <span className="block font-mono text-[11px] uppercase text-muted-foreground">{c.name}</span>
              <input
                type="text"
                value={String(val)}
                onChange={(e) => setValues((prev) => ({ ...prev, [c.name]: e.target.value }))}
                className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          );
        })}
      </div>

      <CodeBox code={jsxCode} block language="tsx" collapsible={false} />
    </section>
  );
}
