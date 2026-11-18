import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "tsup";

const ENTRY_FILES = ["dist/index.mjs", "dist/index.js", "dist/dynamic.mjs", "dist/dynamic.js"];

export default defineConfig({
  entry: ["src/index.ts", "src/dynamic.ts"],
  format: ["esm", "cjs"],
  target: "es2020",
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  minify: false,
  external: ["react"],
  async onSuccess() {
    for (const rel of ENTRY_FILES) {
      const full = path.join(process.cwd(), rel);
      if (!fs.existsSync(full)) continue;
      const body = fs.readFileSync(full, "utf8");
      if (!body.startsWith('"use client"') && !body.startsWith("'use client'")) {
        fs.writeFileSync(full, `"use client";\n${body}`);
      }
    }
  },
});
