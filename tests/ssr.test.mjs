import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runSweep } from "../scripts/ssr-sweep.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

describe("bigbullui SSR sweep", () => {
  it("no new server-render crashes beyond the known baseline", async () => {
    const baselinePath = path.join(rootDir, "tests", "ssr-baseline.json");
    assert.ok(fs.existsSync(baselinePath), "ssr-baseline.json missing — run node scripts/ssr-sweep.mjs --update");
    const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8")).crashes;
    const { files, crashes } = await runSweep();
    assert.ok(files > 600, `expected 600+ ui files, got ${files}`);
    const fresh = [];
    for (const [slug, sigs] of Object.entries(crashes)) {
      const known = new Set(baseline[slug] || []);
      for (const sig of sigs) {
        if (!known.has(sig)) fresh.push(`${slug}: ${sig}`);
      }
    }
    assert.deepEqual(fresh, [], `New SSR crashes (fix component or regenerate baseline):\n${fresh.join("\n")}`);
  });
});
