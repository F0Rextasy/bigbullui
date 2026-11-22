import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const uiDir = path.join(rootDir, "src", "components", "ui");

let artifactsReady = false;
/** Generate registry + LLM artifacts once (also covers isolated single-test runs). */
function ensureGenerated() {
  if (artifactsReady) return;
  execFileSync(process.execPath, ["scripts/generate-registry-json.mjs"], {
    cwd: rootDir,
    encoding: "utf8",
    timeout: 120000,
    env: { ...process.env, BIGBULLUI_NO_CLI_SYNC: "1" },
  });
  execFileSync(process.execPath, ["scripts/generate-llms-full.mjs"], { cwd: rootDir, encoding: "utf8", timeout: 120000 });
  execFileSync(process.execPath, ["scripts/generate-icon-registry.mjs"], { cwd: rootDir, encoding: "utf8", timeout: 120000 });
  execFileSync(process.execPath, ["scripts/generate-icon-components.mjs"], { cwd: rootDir, encoding: "utf8", timeout: 120000 });
  artifactsReady = true;
}

describe("bigbullui Component Library Integrity", () => {
  const uiFiles = fs
    .readdirSync(uiDir)
    .filter((file) => file.endsWith(".tsx") && !file.endsWith(".test.tsx"));

  it("should have components in src/components/ui", () => {
    assert.ok(uiFiles.length > 0, "No UI components found");
  });

  it("HARD RULE: components may ONLY import 'react' or internal './*' files (zero 3rd-party dependencies)", () => {
    const importRegex = /from\s+["']([^"']+)["']/g;
    const violations = [];

    for (const file of uiFiles) {
      const filePath = path.join(uiDir, file);
      const content = fs.readFileSync(filePath, "utf8");
      let match;

      while ((match = importRegex.exec(content)) !== null) {
        const importSource = match[1];
        // React, ReactDOM (portals), and relative internal imports (e.g. ./lib/utils or peer component) are permitted
        const isAllowed = importSource === "react" || importSource === "react-dom" || importSource.startsWith("./");
        if (!isAllowed) {
          violations.push({
            file,
            importSource,
          });
        }
      }
    }

    assert.deepEqual(
      violations,
      [],
      `External 3rd-party package imports found in UI components:\n${JSON.stringify(violations, null, 2)}`
    );
  });

  it("HARD RULE: components must never use 'as any', '@ts-ignore', or '@ts-expect-error'", () => {
    const forbiddenPatterns = [
      /\bas\s+any\b/,
      /@ts-ignore/,
      /@ts-expect-error/,
    ];

    const violations = [];

    for (const file of uiFiles) {
      const filePath = path.join(uiDir, file);
      const content = fs.readFileSync(filePath, "utf8");

      for (const pattern of forbiddenPatterns) {
        if (pattern.test(content)) {
          violations.push({
            file,
            pattern: pattern.toString(),
          });
        }
      }
    }

    assert.deepEqual(
      violations,
      [],
      `Forbidden TypeScript escapes found:\n${JSON.stringify(violations, null, 2)}`
    );
  });

  it("index.ts must export all UI components", () => {
    const indexPath = path.join(rootDir, "src", "index.ts");
    assert.ok(fs.existsSync(indexPath), "src/index.ts must exist");
    const indexContent = fs.readFileSync(indexPath, "utf8");

    const missing = [];
    for (const file of uiFiles) {
      const slug = file.replace(/\.tsx$/, "");
      const expectedImportPath = `./components/ui/${slug}`;
      if (!indexContent.includes(expectedImportPath)) {
        missing.push(file);
      }
    }

    assert.deepEqual(
      missing,
      [],
      `Components missing from src/index.ts:\n${missing.join(", ")}`
    );
  });

  it("registry-site.ts must register all UI components", () => {
    const registryPath = path.join(rootDir, "src", "lib", "registry-site.ts");
    assert.ok(fs.existsSync(registryPath), "src/lib/registry-site.ts must exist");
    const registryContent = fs.readFileSync(registryPath, "utf8");

    const missing = [];
    for (const file of uiFiles) {
      const slug = file.replace(/\.tsx$/, "");
      const pattern = new RegExp(`name:\\s*["']${slug}["']`);
      if (!pattern.test(registryContent)) {
        missing.push(slug);
      }
    }

    assert.deepEqual(
      missing,
      [],
      `Components missing from registry-site.ts:\n${missing.join(", ")}`
    );
  });

  it("utils.ts exists, exports cn, and matches bin/cli.js UTILS_CONTENT", () => {
    const utilsPath = path.join(uiDir, "lib", "utils.ts");
    assert.ok(fs.existsSync(utilsPath), "src/components/ui/lib/utils.ts must exist");
    const utilsContent = fs.readFileSync(utilsPath, "utf8").replace(/\r\n/g, "\n").trim();
    assert.match(utilsContent, /export\s+function\s+cn\b/);

    const cliContent = fs.readFileSync(path.join(rootDir, "bin", "cli.js"), "utf8");
    const match = cliContent.match(/const UTILS_CONTENT = \[([\s\S]*?)\]\.join\(['"]\\n['"]\);/);
    assert.ok(match, "bin/cli.js must define UTILS_CONTENT");
    const cliLines = vm.runInNewContext(`[${match[1]}]`);
    assert.equal(cliLines.join("\n").trim(), utilsContent, "bin/cli.js UTILS_CONTENT must stay byte-identical to src/components/ui/lib/utils.ts");
  });

  it("shadcn registry: components install out of the box (utils.json + deps)", () => {
    ensureGenerated();
    const rDir = path.join(rootDir, "public", "r");
    assert.ok(fs.existsSync(path.join(rDir, "utils.json")), "public/r/utils.json must exist");
    const utilsItem = JSON.parse(fs.readFileSync(path.join(rDir, "utils.json"), "utf8"));
    assert.equal(utilsItem.type, "registry:lib");
    assert.equal(utilsItem.files[0].target, "components/ui/lib/utils.ts");
    assert.match(utilsItem.files[0].content, /export\s+function\s+cn\b/);
    const byPath = (files, p) => files.find((f) => f.path === p);
    const checked = ["button", "stat-tile", "admin-overview", "form-validation"];
    for (const slug of checked) {
      const item = JSON.parse(fs.readFileSync(path.join(rDir, `${slug}.json`), "utf8"));
      const targetByPath = {};
      for (const f of item.files) targetByPath[f.path] = f.target;
      for (const f of item.files) {
        assert.ok(!f.target || !f.target.startsWith("@"), `${slug}: ${f.path} target must not use invalid @ alias prefix (${f.target})`);
        if (f.path.startsWith("src/components/ui/lib/")) {
          assert.ok(f.target && f.target.startsWith("components/ui/lib/"), `${slug}: ${f.path} needs a components/ui/lib/ target`);
        }
      }
      const needsUtils = item.files.some(
        (f) => typeof f.content === "string" && (f.content.includes('"./lib/utils"') || f.content.includes('"../ui/lib/utils"'))
      );
      if (needsUtils) {
        assert.ok((item.registryDependencies || []).includes("https://ui.bigbullapp.com/r/utils.json"), `${slug} must declare the utils registryDependency`);
      } else {
        assert.ok(!(item.registryDependencies || []).length, `${slug} must not declare unneeded registryDependencies`);
      }
      // Sibling and block UI imports bundled in the same item must resolve to bundled files.
      for (const f of item.files) {
        const content = typeof f.content === "string" ? f.content : "";
        if (f.path.startsWith("src/components/blocks/")) {
          assert.equal(f.target, `components/blocks/${slug}.tsx`, `${slug}: block file target must map to components/blocks/`);
          for (const m of content.matchAll(/from\s+["']\.\.\/ui\/([a-z0-9-]+)["']/g)) {
            if (m[1] === "lib") continue;
            assert.ok(byPath(item.files, `src/components/ui/${m[1]}.tsx`), `${slug}: block UI dep ../ui/${m[1]} must be bundled`);
          }
        }
        for (const m of content.matchAll(/from\s+["']\.\/([a-z0-9-]+)["']/g)) {
          if (m[1] === "lib") {
            assert.ok(byPath(item.files, "src/components/ui/lib/utils.ts") || targetByPath["src/components/ui/lib/utils.ts"] === "components/ui/lib/utils.ts" || utilsItem, `${slug}: ./lib dep needs utils coverage`);
            continue;
          }
          assert.ok(byPath(item.files, `src/components/ui/${m[1]}.tsx`), `${slug}: sibling ./${m[1]} must be bundled`);
        }
      }
    }
    assert.deepEqual(
      JSON.parse(fs.readFileSync(path.join(rDir, "stat-tile.json"), "utf8")).files.map((f) => f.path),
      ["src/components/ui/stat-tile.tsx", "src/components/ui/tilt-card.tsx"]
    );
  });

  it("bigbullui.css defines core design tokens", () => {
    const cssPath = path.join(rootDir, "bigbullui.css");
    assert.ok(fs.existsSync(cssPath), "bigbullui.css must exist");
    const cssContent = fs.readFileSync(cssPath, "utf8");

    const requiredTokens = [
      "--background",
      "--foreground",
      "--primary",
      "--primary-foreground",
      "--muted",
      "--border",
      "--radius",
    ];

    for (const token of requiredTokens) {
      assert.ok(
        cssContent.includes(token),
        `bigbullui.css is missing required token: ${token}`
      );
    }
  });

  it("CLI executable exists and responds to --help", async () => {
    const cliPath = path.join(rootDir, "bin", "cli.js");
    assert.ok(fs.existsSync(cliPath), "bin/cli.js must exist");

    const { execFileSync } = await import("node:child_process");
    const output = execFileSync(process.execPath, [cliPath, "--help"], {
      encoding: "utf8",
    });
    assert.ok(output.includes("USAGE"));
    assert.ok(output.includes("npx bigbullui"));
  });

  it("SEO & LLM files exist and are valid", () => {
    const sitemapPath = path.join(rootDir, "app", "sitemap.ts");
    ensureGenerated();
    const robotsPath = path.join(rootDir, "app", "robots.ts");
    const llmsPath = path.join(rootDir, "public", "llms.txt");
    const llmsFullPath = path.join(rootDir, "public", "llms-full.txt");

    assert.ok(fs.existsSync(sitemapPath), "app/sitemap.ts must exist");
    assert.ok(fs.existsSync(robotsPath), "app/robots.ts must exist");
    assert.ok(fs.existsSync(llmsPath), "public/llms.txt must exist");
    assert.ok(fs.existsSync(llmsFullPath), "public/llms-full.txt must exist");

    const llmsContent = fs.readFileSync(llmsPath, "utf8");
    assert.ok(llmsContent.includes("# bigbullui"));
    assert.ok(llmsContent.includes("npx bigbullui"));

    const llmsFullContent = fs.readFileSync(llmsFullPath, "utf8");
    assert.ok(llmsFullContent.includes("Component Catalog"));
    assert.ok(llmsFullContent.includes("AUTO-GENERATED"), "llms-full.txt must carry the auto-generation note");
    assert.ok(llmsFullContent.length > 50000, "llms-full.txt should contain comprehensive catalog");
  });

  it("dead-preview detector: every preview key must resolve to a UI file or registry entry", () => {
    const previewsDir = path.join(rootDir, "src", "components", "site", "previews");
    const previewFiles = fs.readdirSync(previewsDir).filter((f) => f.endsWith(".tsx"));
    // Quoted keys accept any preview-style value; bare keys must map to an
    // identifier ending in Preview so incidental object literals don't count.
    const quotedPattern = /"([a-z0-9][a-z0-9-]*)"\s*:\s*(?:[A-Za-z_$][\w$]*Preview|function|\()/g;
    const barePattern = /(?<![\w."'])([a-z][a-z0-9-]*)\s*:\s*[A-Za-z_$][\w$]*Preview/g;
    const collect = (content) => {
      const found = new Set();
      let m;
      while ((m = quotedPattern.exec(content)) !== null) found.add(m[1]);
      while ((m = barePattern.exec(content)) !== null) found.add(m[1]);
      return found;
    };
    const keys = new Set();
    for (const file of previewFiles) {
      for (const key of collect(fs.readFileSync(path.join(previewsDir, file), "utf8"))) keys.add(key);
    }
    const sitePreviewPath = path.join(rootDir, "src", "components", "site", "component-preview.tsx");
    if (fs.existsSync(sitePreviewPath)) {
      for (const key of collect(fs.readFileSync(sitePreviewPath, "utf8"))) keys.add(key);
    }
    const registryPath = path.join(rootDir, "src", "lib", "registry-site.ts");
    const registryContent = fs.readFileSync(registryPath, "utf8");
    const dead = [...keys].filter((slug) => {
      const hasFile = fs.existsSync(path.join(uiDir, `${slug}.tsx`));
      const hasRegistry = new RegExp(`name:\\s*["']${slug}["']`).test(registryContent);
      return !hasFile && !hasRegistry;
    });
    assert.deepEqual(dead, [], `Dead previews without UI file or registry entry:\n${dead.join(", ")}`);
  });
  it("registry entries must all have a UI source file (no dangling docs routes)", () => {
    const registryPath = path.join(rootDir, "src", "lib", "registry-site.ts");
    const registryContent = fs.readFileSync(registryPath, "utf8");
    const names = [...registryContent.matchAll(/name:\s*["']([a-z0-9][a-z0-9-]*)["']/g)].map((m) => m[1]);
    const dangling = names.filter((slug) => {
      if (fs.existsSync(path.join(uiDir, `${slug}.tsx`))) return false;
      if (fs.existsSync(path.join(uiDir, "lib", `${slug}.ts`))) return false;
      return true;
    });
    assert.deepEqual(dangling, [], `Registry entries without UI source file:\n${dangling.join(", ")}`);
  });

  it("semantic tokens only: no raw palette or hex in UI components", () => {
    // Exempt by nature: fixed-dark device surfaces (qr-reader, split-flap),
    // medal metals (medal-display), canvas API fallback (signature-pad),
    // multi-hue data series (donut-chart, confetti-burst), color tools whose
    // subject matter is literal color, theme-toggle renders both themes fixed.
    const allow = new Set(["qr-reader.tsx", "split-flap.tsx", "medal-display.tsx", "signature-pad.tsx", "donut-chart.tsx", "confetti-burst.tsx", "color-contrast.tsx", "color-palette-picker.tsx", "color-picker.tsx", "theme-preset-picker.tsx", "theme-stamping-machine.tsx", "theme-toggle.tsx", "variant-picker.tsx"]);
    const palette = /(emerald|amber|sky|rose|green|yellow|blue|purple|pink|indigo|cyan|teal|lime)-\d+|#[0-9a-fA-F]{6}/;
    const violations = [];
    for (const file of uiFiles) {
      if (allow.has(file)) continue;
      const content = fs.readFileSync(path.join(uiDir, file), "utf8");
      const m = content.match(palette);
      if (m) violations.push(`${file}: ${m[0]}`);
    }
    assert.deepEqual(violations, [], `Non-semantic palette found (use success/warning/info/destructive):\n${violations.join("\n")}`);
  });

  it("no phantom foreground tokens (must exist in bigbullui.css)", () => {
    const phantom = /text-(destructive|success|warning|info)-foreground/;
    const violations = [];
    for (const file of uiFiles) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf8");
      const m = content.match(phantom);
      if (m) violations.push(`${file}: ${m[0]}`);
    }
    assert.deepEqual(violations, [], `Undefined foreground token (renders unstyled):\n${violations.join("\n")}`);
  });

  it("English UI copy: no Turkish strings in UI components", () => {
    const turkish = /\b(Aktif|DARALT|hedef|Eklendi|Beklemede|Reddedildi|Onayla|Kapat|Kaydet|Kopyala|Tamamlanan|Toplam|Detay|Bitti|Hata|Kaydedildi|Kaydediliyor|Kaydedilemedi|Stokta|Yenileme|Bakiye ekle|Kuyrukta|Okundu|Sonraki|Sayfalama|Geri|Senkronize|POSTA|bu kaynak|Sonraki sayfa)\b/;
    const violations = [];
    for (const file of uiFiles) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf8");
      const m = content.match(turkish);
      if (m) violations.push(`${file}: ${m[0]}`);
    }
    assert.deepEqual(violations, [], `Turkish UI copy found (DESIGN.md requires English):\n${violations.join("\n")}`);
  });

  it("contrast gate: light and dark text/fill tokens pass WCAG AA across surfaces", () => {
    const css = fs.readFileSync(path.join(rootDir, "bigbullui.css"), "utf8");
    const parseVars = (block) => {
      const vars = {};
      for (const m of block.matchAll(/--([a-z-]+):\s*(#[0-9a-fA-F]{6})/g)) vars[m[1]] = m[2];
      return vars;
    };
    const light = parseVars(css.slice(css.indexOf(":root"), css.indexOf("\n.dark")));
    const dark = parseVars(css.slice(css.indexOf("\n.dark"), css.indexOf("@theme")));
    const lum = (hex) => {
      const c = [0, 2, 4].map((i) => {
        const v = parseInt(hex.slice(i + 1, i + 3), 16) / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const ratio = (a, b) => {
      const x = lum(a), y = lum(b);
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    const failures = [];
    const check = (mode, vars, fg, bg) => {
      const r = ratio(vars[fg], vars[bg]);
      if (r < 4.5) failures.push(`${mode} ${fg} on ${bg}: ${r.toFixed(2)}:1`);
    };
    for (const bg of ["background", "card", "muted"]) {
      for (const fg of ["foreground", "muted-foreground", "destructive", "success", "warning", "info", "accent", "accent-strong"]) {
        check("light", light, fg, bg);
      }
      for (const fg of ["foreground", "muted-foreground", "destructive", "success", "warning", "info", "accent-strong"]) {
        check("dark", dark, fg, bg);
      }
    }
    for (const [fg, bg] of [["primary-foreground", "primary"], ["secondary-foreground", "secondary"], ["accent-foreground", "accent"]]) {
      check("light", light, fg, bg);
      check("dark", dark, fg, bg);
    }
    assert.ok(css.includes(".bg-info.text-white"), "bigbullui.css dark override must include .bg-info.text-white");
    assert.deepEqual(failures, [], `Text tokens below WCAG AA 4.5:1:\n${failures.join("\n")}`);
  });

  it("form safety: every internal <button> has an explicit type attribute", () => {
    const findButtons = (src) => {
      const results = [];
      const regex = /<button\b/g;
      let match;
      while ((match = regex.exec(src)) !== null) {
        const start = match.index;
        let i = start + 7;
        let braceDepth = 0;
        let quote = null;
        while (i < src.length) {
          const ch = src[i];
          if (quote) {
            if (ch === "\\") { i += 2; continue; }
            if (ch === quote) quote = null;
          } else {
            if (ch === '"' || ch === "'" || ch === "`") quote = ch;
            else if (ch === "{") braceDepth++;
            else if (ch === "}") { if (braceDepth > 0) braceDepth--; }
            else if (ch === ">" && braceDepth === 0) break;
          }
          i++;
        }
        results.push(src.slice(start, i + 1));
      }
      return results;
    };
    const violations = [];
    for (const file of uiFiles) {
      if (file === "button.tsx") continue;
      const content = fs.readFileSync(path.join(uiDir, file), "utf8");
      for (const tag of findButtons(content)) {
        if (!/\btype\s*=/.test(tag) && !/\.\.\.\w+/.test(tag)) {
          violations.push(file);
          break;
        }
      }
    }
    assert.deepEqual(violations, [], `Internal <button> without explicit type= (submits parent <form> by default):\n${violations.join("\n")}`);
  });

  it("no dynamic Tailwind animation templates in UI components", () => {
    const dynamicAnim = /animate-\[[^\]]*\$\{|transition-\[[^\]]*\$\{/;
    const violations = [];
    for (const file of uiFiles) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf8");
      const m = content.match(dynamicAnim);
      if (m) violations.push(`${file}: ${m[0]}`);
    }
    assert.deepEqual(violations, [], `Dynamic Tailwind animation templates fail static JIT scanning:\n${violations.join("\n")}`);
  });

  it("no undefined animate-in or bare mono class names in UI components", () => {
    const invalidAnim = /\banimate-in\b|\bzoom-in-95\b|\bfade-in-50\b/;
    const bareMono = /(?<![-\w])\bmono\b(?![-\w:])/;
    const violations = [];
    for (const file of uiFiles) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf8");
      const mAnim = content.match(invalidAnim);
      if (mAnim) violations.push(`${file}: ${mAnim[0]}`);
      for (const m of content.matchAll(/(?:className\s*=\s*["'`]|cn\([^)]*["'`])([^"'`]*)/g)) {
        if (bareMono.test(m[1])) violations.push(`${file}: bare mono in "${m[1].slice(0, 60)}"`);
      }
    }
    assert.deepEqual(violations, [], `Undefined Tailwind utility classes found:\n${violations.join("\n")}`);
  });

  it("use client boundary: built per-component bundle is client-marked while barrel is server-safe", () => {
    const barrelPath = path.join(rootDir, "dist", "index.mjs");
    const buttonPath = path.join(rootDir, "dist", "components", "ui", "button.mjs");
    if (!fs.existsSync(barrelPath) || !fs.existsSync(buttonPath)) return;
    const barrelHead = fs.readFileSync(barrelPath, "utf8").trimStart();
    const buttonHead = fs.readFileSync(buttonPath, "utf8").trimStart();
    assert.ok(buttonHead.startsWith('"use client"') || buttonHead.startsWith("'use client'"), "dist/components/ui/button.mjs must start with 'use client'");
    assert.ok(!barrelHead.startsWith('"use client"') && !barrelHead.startsWith("'use client'"), "dist/index.mjs barrel must not emit top-level 'use client'");
  });

  it("reduced motion safety: never strip focus rings or hide interactive UI on motion-reduce", () => {
    const allowHidden = new Set(["seasonal-snow.tsx"]);
    const violations = [];
    for (const file of uiFiles) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf8");
      if (/motion-reduce:focus-visible:ring-0/.test(content)) {
        violations.push(`${file}: motion-reduce:focus-visible:ring-0 disables keyboard focus indicator`);
      }
      if (!allowHidden.has(file) && /motion-reduce:hidden/.test(content)) {
        violations.push(`${file}: motion-reduce:hidden hides component for reduced-motion users`);
      }
    }
    assert.deepEqual(violations, [], `Accessibility / reduced-motion violations:\n${violations.join("\n")}`);
  });

  it("CSP & CSS keyframes: zero inline <style> tags in UI components and zero duplicate/missing @keyframes in bigbullui.css", () => {
    const css = fs.readFileSync(path.join(rootDir, "bigbullui.css"), "utf8");
    const defined = new Map();
    const dupes = [];
    for (const m of css.matchAll(/@keyframes\s+([A-Za-z0-9_-]+)/g)) {
      const name = m[1];
      defined.set(name, (defined.get(name) ?? 0) + 1);
      if (defined.get(name) > 1) dupes.push(name);
    }
    assert.deepEqual(dupes, [], `Duplicate @keyframes in bigbullui.css: ${dupes.join(", ")}`);

    const twBuiltins = new Set(["spin", "ping", "pulse", "bounce", "none"]);
    const inlineStyles = [];
    const missingKfs = [];
    for (const file of uiFiles) {
      const content = fs.readFileSync(path.join(uiDir, file), "utf8");
      if (/<style\b/i.test(content)) inlineStyles.push(file);
      for (const m of content.matchAll(/animate-\[([A-Za-z0-9-]+)(?:_|\])/g)) {
        if (!defined.has(m[1]) && !twBuiltins.has(m[1])) missingKfs.push(`${file}: animate-[${m[1]}...]`);
      }
      for (const m of content.matchAll(/animation:\s*(?:["'`]([A-Za-z0-9-]+))/g)) {
        if (m[1] && m[1] !== "none" && !defined.has(m[1]) && !twBuiltins.has(m[1])) {
          missingKfs.push(`${file}: style animation=${m[1]}`);
        }
      }
    }
    assert.deepEqual(inlineStyles, [], `Inline <style> tags break strict CSP and duplicate keyframes:\n${inlineStyles.join("\n")}`);
    assert.deepEqual(missingKfs, [], `Animation references missing @keyframes in bigbullui.css:\n${missingKfs.join("\n")}`);
  });

  it("overlay & keyboard a11y: every fixed inset-0 overlay wires focus-trap helpers and clickable div/span controls are keyboard-accessible", () => {
    const missingTrap = [];
    const clickableIssues = [];
    const focusDelegatorFiles = new Set(["console-panel.tsx", "inline-multiselect.tsx", "tag-input.tsx"]);

    for (const file of uiFiles) {
      const s = fs.readFileSync(path.join(uiDir, file), "utf8");
      if (/fixed inset-0/.test(s) && !/focus-trap/.test(s)) {
        missingTrap.push(file);
      }
      const tagRegex = /<(div|span)\b/g;
      let m;
      while ((m = tagRegex.exec(s)) !== null) {
        let i = m.index + m[1].length + 1;
        let brace = 0;
        let quote = null;
        while (i < s.length) {
          const ch = s[i];
          if (quote) {
            if (ch === "\\") { i += 2; continue; }
            if (ch === quote) quote = null;
          } else {
            if (ch === '"' || ch === "'" || ch === "`") quote = ch;
            else if (ch === "{") brace++;
            else if (ch === "}") { if (brace > 0) brace--; }
            else if (ch === ">" && brace === 0) break;
          }
          i++;
        }
        const tag = s.slice(m.index, i + 1);
        if (!/\bonClick\s*=/.test(tag)) continue;
        const isBackdropOrGuard =
          /aria-hidden/.test(tag) ||
          /stopPropagation/.test(tag) ||
          /role=["'](?:presentation|none)["']/.test(tag);
        const isCompositeOptionOrRadio = /role=["'](?:option|radio)["']/.test(tag);
        const hasFullKeyboard = /\bonKeyDown\s*=/.test(tag) && /\brole\s*=/.test(tag) && /\btabIndex\b/.test(tag);
        const isInputDelegator =
          focusDelegatorFiles.has(file) &&
          /inputRef\.current\?\.focus\(\)|setOpen\(true\)/.test(tag);
        if (!isBackdropOrGuard && !isCompositeOptionOrRadio && !hasFullKeyboard && !isInputDelegator) {
          const line = s.slice(0, m.index).split(/\r?\n/).length;
          clickableIssues.push(`${file}:${line}`);
        }
      }
    }

    assert.deepEqual(missingTrap, [], `fixed inset-0 overlays missing focus-trap.ts integration:\n${missingTrap.join("\n")}`);
    assert.deepEqual(clickableIssues, [], `Clickable <div>/<span> elements without keyboard/ARIA support:\n${clickableIssues.join("\n")}`);
  });
});
