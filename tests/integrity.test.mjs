import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const uiDir = path.join(rootDir, "src", "components", "ui");

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
        // Only react and relative internal imports (e.g. ./lib/utils or peer component) are permitted
        const isAllowed = importSource === "react" || importSource.startsWith("./");
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

  it("utils.ts exists and exports cn", () => {
    const utilsPath = path.join(uiDir, "lib", "utils.ts");
    assert.ok(fs.existsSync(utilsPath), "src/components/ui/lib/utils.ts must exist");
    const utilsContent = fs.readFileSync(utilsPath, "utf8");
    assert.match(utilsContent, /export\s+function\s+cn\b/);
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
});
