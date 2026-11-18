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
    else if (entry.name.endsWith(".mjs") || entry.name.endsWith(".js")) acc.push(full);
  }
  return acc;
}

function normalizeDistDirectives() {
  const distDir = path.join(__dirname, "dist");
  if (!fs.existsSync(distDir)) return;

  const files = collectDistFiles(distDir);
  const pureFiles = new Set<string>();

  for (const base of ["utils.mjs", "utils.js"]) {
    const entry = path.join(distDir, "components", "ui", "lib", base);
    if (!fs.existsSync(entry)) continue;
    pureFiles.add(entry);
    const content = fs.readFileSync(entry, "utf8");
    for (const m of content.matchAll(/(?:from|require)\(\s*["']([^"']*chunk-[^"']+)["']\s*\)|from\s*["']([^"']*chunk-[^"']+)["']/g)) {
      const rel = m[1] ?? m[2];
      if (!rel) continue;
      const resolved = path.resolve(path.dirname(entry), rel);
      if (fs.existsSync(resolved)) pureFiles.add(resolved);
    }
  }

  // Root entry barrels only re-export chunks (component/hook chunks carry their own "use client"; directive),
  // keeping pure exports like cn() / isSafeUrl() / escapeRegExp() callable from Server Components.
  for (const barrelBase of ["index.mjs", "index.js"]) {
    const barrel = path.join(distDir, barrelBase);
    if (!fs.existsSync(barrel)) continue;
    pureFiles.add(barrel);
    const content = fs.readFileSync(barrel, "utf8");
    for (const m of content.matchAll(/(?:^|[;\n])\s*(?:import|require\()\s*["']([^"']*chunk-[^"']+)["']/g)) {
      const resolved = path.resolve(distDir, m[1]);
      if (fs.existsSync(resolved)) pureFiles.add(resolved);
    }
  }

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf8");
    const stripped = raw.replace(/"use client";\s*/g, "");
    if (pureFiles.has(filePath)) {
      if (stripped !== raw) fs.writeFileSync(filePath, stripped, "utf8");
    } else {
      const next = `"use client";\n${stripped}`;
      if (next !== raw) fs.writeFileSync(filePath, next, "utf8");
    }
  }
}

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/ui/lib/utils.ts",
    "src/components/ui/lib/hooks.ts",
    "src/components/ui/lib/focus-trap.ts",
    "src/components/ui/lib/use-ticket-audio.ts",
    ...uiFiles,
  ],
  format: ["cjs", "esm"],
  dts: {
    compilerOptions: {
      incremental: false,
    },
  },
  splitting: true,
  sourcemap: false,
  clean: true,
  external: ["react", "react-dom"],
  minify: true,
  async onSuccess() {
    normalizeDistDirectives();
  },
});
