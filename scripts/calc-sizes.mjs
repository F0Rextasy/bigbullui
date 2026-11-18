import { readdirSync, writeFileSync } from "node:fs";
import { join, resolve, dirname, basename } from "node:path";
import { createRequire } from "node:module";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const need = createRequire(import.meta.url);
const esbuild = need("esbuild");

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(rootDir, "src", "components", "ui");
const WARN_KB = 12;
const HARD_FILE_KB = 30;
const HARD_TOTAL_KB = 2400;

const files = readdirSync(DIR).filter((f) => f.endsWith(".tsx")).sort();
const built = esbuild.buildSync({
  entryPoints: files.map((f) => join(DIR, f)),
  outdir: join(rootDir, ".tmp-calc-sizes"),
  bundle: true,
  minify: true,
  format: "esm",
  platform: "browser",
  target: ["es2020"],
  external: ["react", "react-dom", "react/*", "./*"],
  write: false,
  logLevel: "silent",
});

const sizes = {};
let over = 0;
for (const out of built.outputFiles) {
  if (!out.path.endsWith(".js")) continue;
  const slug = basename(out.path, ".js");
  const buf = Buffer.from(out.contents);
  const raw = buf.length;
  const gz = gzipSync(buf).length;
  const gzKb = Number((gz / 1024).toFixed(2));
  sizes[slug] = { raw, gzip: gz, kb: gzKb };
  if (gzKb > WARN_KB) {
    over += 1;
    console.log(`OVER  ${slug}.tsx ${gzKb.toFixed(1)}kb gzip`);
  }
}

const totalKb = Object.values(sizes).reduce((a, s) => a + s.raw, 0) / 1024;
const violators = Object.entries(sizes).filter(([, s]) => s.raw / 1024 > HARD_FILE_KB);
writeFileSync(join(rootDir, "src", "data", "sizes.json"), JSON.stringify({ updated: new Date().toISOString().slice(0, 10), sizes }, null, 2));
console.log(`${files.length} ui files bundled+minified, ${over} over ${WARN_KB}kb budget, total ${totalKb.toFixed(0)}kb minified.`);
if (violators.length > 0) {
  console.error(`SIZE GATE: files over ${HARD_FILE_KB}kb minified: ${violators.map(([n, s]) => `${n} ${(s.raw / 1024).toFixed(1)}kb`).join(", ")}`);
  process.exit(1);
}
if (totalKb > HARD_TOTAL_KB) {
  console.error(`SIZE GATE: total ${totalKb.toFixed(0)}kb minified exceeds ${HARD_TOTAL_KB}kb budget.`);
  process.exit(1);
}
