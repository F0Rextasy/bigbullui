// Preview manifest check & real Playwright PNG pixel-diff runner.
// Usage:
//   node scripts/visual-regression.mjs            (manifest check)
//   node scripts/visual-regression.mjs --update   (update .wave/screenshots/manifest.json)
//   node scripts/visual-regression.mjs --capture  (capture baseline PNGs from BIGBULL_BASE)
//   node scripts/visual-regression.mjs --compare  (capture current PNGs & run RGBA pixel diff)
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const previewsDir = path.join(rootDir, "src", "components", "site", "previews");
const shotsDir = path.join(rootDir, ".wave", "screenshots");
const update = process.argv.includes("--update");
const capture = process.argv.includes("--capture");
const compare = process.argv.includes("--compare");

if (!fs.existsSync(previewsDir)) {
  console.error("visual-regression: previews directory missing");
  process.exit(1);
}

const files = fs.readdirSync(previewsDir).filter((f) => f.endsWith(".tsx")).sort();
if (!fs.existsSync(shotsDir)) fs.mkdirSync(shotsDir, { recursive: true });

function parsePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("Not a PNG buffer");
  let offset = 8;
  let width = 0;
  let height = 0;
  const idat = [];
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString("ascii", offset + 4, offset + 8);
    const data = buf.subarray(offset + 8, offset + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") {
      break;
    }
    offset += 12 + len;
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = 4;
  const stride = width * bpp;
  const rgba = Buffer.alloc(height * stride);
  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const rowStart = y * (stride + 1) + 1;
    const outStart = y * stride;
    for (let x = 0; x < stride; x++) {
      const val = raw[rowStart + x];
      const left = x >= bpp ? rgba[outStart + x - bpp] : 0;
      const up = y > 0 ? rgba[(y - 1) * stride + x] : 0;
      const upLeft = y > 0 && x >= bpp ? rgba[(y - 1) * stride + x - bpp] : 0;
      let recon = val;
      if (filter === 1) recon = (val + left) & 0xff;
      else if (filter === 2) recon = (val + up) & 0xff;
      else if (filter === 3) recon = (val + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) recon = (val + paeth(left, up, upLeft)) & 0xff;
      rgba[outStart + x] = recon;
    }
  }
  return { width, height, rgba };
}

function diffPngs(bufA, bufB, channelTol = 12) {
  const a = parsePng(bufA);
  const b = parsePng(bufB);
  if (a.width !== b.width || a.height !== b.height) return 1;
  const totalPixels = a.width * a.height;
  let diffPixels = 0;
  for (let i = 0; i < a.rgba.length; i += 4) {
    if (
      Math.abs(a.rgba[i] - b.rgba[i]) > channelTol ||
      Math.abs(a.rgba[i + 1] - b.rgba[i + 1]) > channelTol ||
      Math.abs(a.rgba[i + 2] - b.rgba[i + 2]) > channelTol
    ) {
      diffPixels += 1;
    }
  }
  return diffPixels / Math.max(1, totalPixels);
}

if (capture || compare) {
  const { chromium } = await import("playwright");
  const base = process.env.BIGBULL_BASE ?? "http://localhost:3000";
  const routes = ["/", "/docs", "/docs/button", "/docs/dialog", "/blocks", "/icons"];
  const threshold = Number(process.env.BIGBULL_DIFF_THRESHOLD ?? "0.015");
  const baseDir = path.join(shotsDir, "baseline");
  const targetDir = compare ? path.join(shotsDir, "current") : baseDir;
  fs.mkdirSync(targetDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results = [];
  let regressions = 0;
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    for (const route of routes) {
      const slug = route === "/" ? "home" : route.slice(1).replace(/\//g, "_");
      await page.goto(base + route, { waitUntil: "networkidle", timeout: 45000 });
      const shot = await page.screenshot({ fullPage: false });
      const outFile = path.join(targetDir, `${slug}.png`);
      fs.writeFileSync(outFile, shot);

      if (compare) {
        const refFile = path.join(baseDir, `${slug}.png`);
        if (!fs.existsSync(refFile)) {
          results.push({ route, status: "no-baseline" });
        } else {
          const ratio = diffPngs(fs.readFileSync(refFile), shot);
          const pass = ratio <= threshold;
          if (!pass) regressions += 1;
          results.push({ route, diffRatio: Number(ratio.toFixed(5)), pass });
        }
      }
    }
  } finally {
    await browser.close();
  }

  if (compare) {
    fs.writeFileSync(path.join(shotsDir, "diff-report.json"), JSON.stringify({ threshold, results }, null, 2));
    console.log("visual-regression pixel diff:", JSON.stringify(results));
    if (regressions > 0) {
      console.error(`visual-regression: ${regressions} visual regression(s) exceeded threshold ${threshold}`);
      process.exit(1);
    }
  } else {
    console.log(`visual-regression: captured ${routes.length} baseline screenshots to ${baseDir}`);
  }
  process.exit(0);
}

const manifestPath = path.join(shotsDir, "manifest.json");
if (update) {
  const manifest = Object.fromEntries(files.map((f) => [f, { captured: new Date().toISOString() }]));
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`visual-regression: ${files.length} preview files indexed, manifest updated.`);
} else {
  if (!fs.existsSync(manifestPath)) {
    console.error("visual-regression: manifest.json missing — run node scripts/visual-regression.mjs --update first.");
    process.exit(1);
  }
  const onDisk = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const diskKeys = new Set(Object.keys(onDisk));
  const missing = files.filter((f) => !diskKeys.has(f));
  const orphaned = [...diskKeys].filter((f) => !files.includes(f));
  if (missing.length > 0 || orphaned.length > 0) {
    console.error(`visual-regression: manifest drift — missing: ${missing.join(", ") || "none"}; orphaned: ${orphaned.join(", ") || "none"}`);
    console.error("Re-run with --update after reviewing screenshots.");
    process.exit(1);
  }
  console.log(`visual-regression: ${files.length} preview files indexed, manifest in sync.`);
}
