import { defineConfig } from "tsup";
import fs from "node:fs";
import path from "node:path";

const uiDir = path.join(__dirname, "src", "components", "ui");
const uiFiles = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
  .map((f) => `src/components/ui/${f}`);

function collectDistFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectDistFiles(full, acc);
    else if (
      entry.name.endsWith(".mjs") ||
      entry.name.endsWith(".js") ||
      entry.name.endsWith(".d.mts")
    ) {
      acc.push(full);
    }
  }
  return acc;
}

function rewriteEsmRelativeSpecifiers(src: string, filePath: string): string {
  return src.replace(
    /((?:from|import)\s*|\bimport\(\s*)(["'])(\.\.?\/[^"']+?)\2/g,
    (full, prefix, quote, spec) => {
      if (/\.[cm]?(js|ts)$/.test(spec)) return full;
      const base = path.resolve(path.dirname(filePath), spec);
      if (fs.existsSync(`${base}.mjs`) || fs.existsSync(`${base}.d.mts`)) {
        return `${prefix}${quote}${spec}.mjs${quote}`;
      }
      if (
        fs.existsSync(path.join(base, "index.mjs")) ||
        fs.existsSync(path.join(base, "index.d.mts"))
      ) {
        return `${prefix}${quote}${spec}/index.mjs${quote}`;
      }
      return full;
    }
  );
}

function sourceUsesClient(filePath: string): boolean {
  const distDir = path.join(__dirname, "dist");
  const rel = path.relative(distDir, filePath).replace(/\\/g, "/");
  const baseNoExt = rel.replace(/\.(?:mjs|js)$/, "");
  const candidates = [
    path.join(__dirname, "src", `${baseNoExt}.tsx`),
    path.join(__dirname, "src", `${baseNoExt}.ts`),
  ];
  for (const cand of candidates) {
    if (fs.existsSync(cand)) {
      const head = fs.readFileSync(cand, "utf8").trimStart();
      return head.startsWith('"use client"') || head.startsWith("'use client'");
    }
  }
  return false;
}

function normalizeDistDirectives() {
  const distDir = path.join(__dirname, "dist");
  if (!fs.existsSync(distDir)) return;

  const files = collectDistFiles(distDir);

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    if (filePath.endsWith(".d.mts")) {
      const nextDts = rewriteEsmRelativeSpecifiers(raw, filePath);
      if (nextDts !== raw) fs.writeFileSync(filePath, nextDts, "utf8");
      continue;
    }

    let body = raw.replace(/"use client";\s*/g, "");
    if (filePath.endsWith(".mjs")) {
      body = rewriteEsmRelativeSpecifiers(body, filePath);
    }

    const next = sourceUsesClient(filePath) ? `"use client";\n${body}` : body;
    if (next !== raw) fs.writeFileSync(filePath, next, "utf8");
  }
}

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/ui/lib/utils.ts",
    "src/components/ui/lib/hooks.ts",
    "src/components/ui/lib/focus-trap.ts",
    "src/components/ui/lib/use-ticket-audio.ts",
    "src/components/ui/lib/react-compat.ts",
    "src/components/ui/lib/use-controllable-state.ts",
    "src/components/ui/lib/slot.ts",
    "src/components/ui/lib/floating.ts",
    "src/components/ui/lib/presence.ts",
    "src/components/ui/lib/direction.ts",
    ...uiFiles,
  ],
  format: ["cjs", "esm"],
  dts: {
    compilerOptions: {
      incremental: false,
    },
  },
  splitting: false,
  bundle: false,
  sourcemap: false,
  clean: true,
  external: ["react", "react-dom"],
  minify: true,
  async onSuccess() {
    normalizeDistDirectives();
  },
});
