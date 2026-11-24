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
const routes = [
  "/",
  "/docs",
  "/docs/installation",
  "/docs/recipes",
  "/docs/changelog",
  "/docs/button",
  "/docs/dialog",
  "/docs/tabs",
  "/docs/toast",
  "/docs/migrate",
  "/docs/help",
  "/docs/shortcuts",
  "/blocks",
  "/blocks/admin-overview",
  "/showcase",
  "/docs/design",
  "/icons",
  "/icons/ticket",
  "/dep-graph",
  "/benchmarks",
  "/preview/button",
];

const themes = ["light", "dark"];
const strictModerate = process.env.BIGBULL_STRICT_MODERATE === "1";
const browser = await chromium.launch({ headless: true });
let critical = 0;
let moderateCount = 0;
let skipped = 0;
let scanCount = 0;

async function setTheme(page, theme) {
  await page.evaluate(async (t) => {
    document.documentElement.classList.toggle("dark", t === "dark");
    void document.documentElement.offsetHeight;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    for (const anim of document.getAnimations({ subtree: true })) {
      if (anim instanceof CSSTransition) anim.finish();
    }
    await new Promise((r) => requestAnimationFrame(r));
  }, theme);
}

async function runAxe(page, label) {
  scanCount += 1;
  const violations = await page.evaluate(async () => {
    for (const anim of document.getAnimations({ subtree: true })) {
      try {
        if (anim.effect?.getTiming?.().iterations !== Infinity) anim.finish();
      } catch {
        // ignore unfinishable animations
      }
    }
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const result = await window.axe.run({ resultTypes: ["violations"] });
    return result.violations
      .filter((v) => v.impact === "critical" || v.impact === "serious" || v.impact === "moderate")
      .map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.length,
        sample: v.nodes[0]?.html?.replace(/\s+/g, " ").slice(0, 120) ?? "",
      }));
  });
  let blocking = 0;
  for (const v of violations) {
    if (v.impact === "moderate") {
      moderateCount += v.nodes;
      console.log(`MODERATE a11y-scan: ${label} ${v.id} x${v.nodes}`);
      if (strictModerate) critical += v.nodes;
    } else {
      blocking += v.nodes;
      critical += v.nodes;
      console.log(`${v.impact === "critical" ? "CRITICAL" : "SERIOUS"} a11y-scan: ${label} ${v.id} x${v.nodes} -> ${v.sample}`);
    }
  }
  if (blocking === 0 && violations.length === 0) console.log(`a11y-scan: ${label} clean`);
}

for (const route of routes) {
  const page = await browser.newPage();
  try {
    await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
    await page.addScriptTag({ path: axePath });
    for (const theme of themes) {
      await setTheme(page, theme);
      await runAxe(page, `${route} [${theme}]`);
    }

    if (route === "/docs/dialog") {
      for (const theme of themes) {
        await setTheme(page, theme);
        await page.getByRole("button", { name: "Open Dialog" }).click();
        await page.locator('[role="dialog"]').waitFor({ state: "visible", timeout: 5000 });
        await runAxe(page, `${route} [${theme}] [overlay:dialog]`);
        await page.keyboard.press("Escape");
        await page.locator('[role="dialog"]').waitFor({ state: "detached", timeout: 5000 });
      }
    }

    if (route === "/docs") {
      for (const theme of themes) {
        await setTheme(page, theme);
        await page.keyboard.press("Control+k");
        await page.locator('[role="dialog"]').waitFor({ state: "visible", timeout: 5000 });
        await runAxe(page, `${route} [${theme}] [overlay:search]`);
        await page.keyboard.press("Escape");
        await page.locator('[role="dialog"]').waitFor({ state: "detached", timeout: 5000 });
      }
    }
  } catch (error) {
    console.error(`a11y-scan: SKIPPED ${route} ${(error.message ?? error).split("\n")[0]}`);
    skipped += 1;
  }
  await page.close();
}

await browser.close();
if (skipped > 0) {
  console.error(`a11y-scan: ${skipped} route(s) SKIPPED — a crashed page must not pass the gate.`);
  process.exit(1);
}
if (critical > 0) {
  console.error(`a11y-scan: ${critical} critical/serious violations (${moderateCount} moderate) found across ${scanCount} scans.`);
  process.exit(1);
}
console.log(`a11y-scan: ${scanCount} scans across ${routes.length} routes (light + dark + open overlays), 0 critical/serious violations (${moderateCount} moderate).`);
