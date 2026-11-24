import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "tsup";

const CLIENT_FILES = ["dist/dynamic.mjs", "dist/dynamic.js"];

export default defineConfig({
  entry: ["src/index.ts", "src/dynamic.ts"],
  format: ["esm", "cjs"],
  target: "es2020",
  dts: true,
  clean: true,
  splitting: true,
  treeshake: true,
  minify: true,
  external: ["react"],
  async onSuccess() {
    const distDir = path.join(process.cwd(), "dist");
    for (const rel of CLIENT_FILES) {
      const full = path.join(process.cwd(), rel);
      if (!fs.existsSync(full)) continue;
      const body = fs.readFileSync(full, "utf8");
      if (!body.startsWith('"use client"') && !body.startsWith("'use client'")) {
        fs.writeFileSync(full, `"use client";\n${body}`);
      }
    }
    if (fs.existsSync(distDir)) {
      for (const f of fs.readdirSync(distDir)) {
        if (!/^chunk-.*\.(?:mjs|js)$/.test(f)) continue;
        const full = path.join(distDir, f);
        const body = fs.readFileSync(full, "utf8");
        if (/\buseEffect\b|\buseRef\b/.test(body) && !body.startsWith('"use client"')) {
          fs.writeFileSync(full, `"use client";\n${body}`);
        }
      }
    }
  },
});
