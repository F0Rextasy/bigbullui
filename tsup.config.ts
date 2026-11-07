import { defineConfig } from "tsup";
import fs from "node:fs";
import path from "node:path";

const uiDir = path.join(__dirname, "src", "components", "ui");
const uiFiles = fs
  .readdirSync(uiDir)
  .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
  .map((f) => `src/components/ui/${f}`);

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
  banner: {
    js: '"use client";',
  },
});
