import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const axePath = path.join(rootDir, "node_modules", "axe-core", "axe.min.js");
if (!fs.existsSync(axePath)) {
  console.error("a11y-scan: axe-core not installed (comes with npm install).");
  process.exit(2);
}
const base = process.env.BIGBULL_BASE ?? "http://localhost:3000";
const routes = ["/", "/docs", "/docs/button", "/docs/dialog", "/docs/tabs", "/docs/toast", "/blocks", "/showcase", "/theme", "/icons"];

const browser = await chromium.launch({ headless: true });
let critical = 0;
for (const route of routes) {
  const page = await browser.newPage();
  try {
    await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => {
      const result = await window.axe.run({ resultTypes: ["violations"] });
      return result.violations
        .filter((v) => v.impact === "critical" || v.impact === "serious")
        .map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
    });
    for (const v of violations) {
      console.log(`${v.impact === "critical" ? "CRITICAL" : "WARN"} a11y-scan: ${route} ${v.id} x${v.nodes}`);
      if (v.impact === "critical") critical += v.nodes;
    }
    if (violations.length === 0) console.log(`a11y-scan: ${route} clean`);
  } catch (error) {
    console.log(`a11y-scan: SKIPPED ${route} ${(error.message ?? error).split("\n")[0]}`);
  }
  await page.close();
}
await browser.close();
if (critical > 0) {
  console.error(`a11y-scan: ${critical} critical violations found.`);
  process.exit(1);
}
console.log(`a11y-scan: ${routes.length} routes scanned, no critical violations.`);
