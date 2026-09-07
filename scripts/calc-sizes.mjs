import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const DIR = join(process.cwd(), "src", "components", "ui");
const BUDGET_KB = 12;

const files = readdirSync(DIR).filter((f) => f.endsWith(".tsx"));
const sizes = {};
let over = 0;
for (const f of files) {
  const raw = statSync(join(DIR, f)).size;
  const kb = raw / 1024;
  const { readFileSync } = await import("node:fs");
  const gz = gzipSync(readFileSync(join(DIR, f))).length;
  sizes[f.replace(/\.tsx$/, "")] = { raw, gzip: gz, kb: Number((gz / 1024).toFixed(2)) };
  if (kb > BUDGET_KB) {
    over += 1;
    console.log(`OVER  ${f} ${kb.toFixed(1)}kb`);
  }
}
writeFileSync(join(process.cwd(), "src", "data", "sizes.json"), JSON.stringify({ updated: new Date().toISOString().slice(0, 10), sizes }, null, 2));
console.log(`${files.length} ui files scanned, ${over} over ${BUDGET_KB}kb budget.`);
