import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const cli = path.join(rootDir, "bin", "cli.js");

let workdir = "";

function run(...args) {
  return execFileSync("node", [cli, ...args], { cwd: workdir, encoding: "utf8", timeout: 30000 });
}

describe("bigbullui CLI end-to-end", () => {
  before(() => {
    workdir = fs.mkdtempSync(path.join(os.tmpdir(), "bigbullui-cli-"));
  });

  it("list shows available components", () => {
    const out = run("list");
    assert.ok(out.includes("button"), "list output should contain button");
    assert.ok(out.includes("ticket-card"), "list output should contain ticket-card");
  });

  it("list filters by query", () => {
    const out = run("list", "chart");
    assert.ok(out.includes("chart"), "filtered list should mention chart");
  });

  it("init creates utils and tokens", () => {
    run("init");
    const files = [];
    const walk = (dir) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else files.push(path.relative(workdir, p));
      }
    };
    walk(workdir);
    assert.ok(files.some((f) => f.endsWith("utils.ts")), `utils.ts created, got: ${files.join(",")}`);
    assert.ok(files.includes("bigbullui.css"), "bigbullui.css copied to root");
  });

  it("add copies a component file", () => {
    run("add", "badge", "--dir", "./components/ui");
    const target = path.join(workdir, "components", "ui", "badge.tsx");
    assert.ok(fs.existsSync(target), "badge.tsx copied");
    const src = fs.readFileSync(target, "utf8");
    assert.ok(src.includes("export"), "copied file exports a component");
  });

  it("add is idempotent without --force", () => {
    const out = run("add", "badge", "--dir", "./components/ui");
    assert.ok(/kipped|already exists/i.test(out), "second add skips existing file");
  });

  it("update reports installed components as current", () => {
    const out = run("update", "--dir", "./components/ui");
    assert.ok(/up to date|Checking 1 installed/i.test(out), "update checks installed set");
  });

  it("update detects a stale file", () => {
    const target = path.join(workdir, "components", "ui", "badge.tsx");
    fs.appendFileSync(target, "\n// local tweak\n");
    const out = run("update", "--dir", "./components/ui");
    assert.ok(/has updates/i.test(out), "stale badge detected");
    const fixed = run("update", "--dir", "./components/ui", "-f");
    assert.ok(/Updated.*badge/i.test(fixed), "force update applies");
    const clean = run("update", "--dir", "./components/ui");
    assert.ok(/up to date/i.test(clean), "clean after force update");
  });

  it("doctor runs and reports checks", () => {
    let out = "";
    try {
      out = run("doctor");
    } catch (e) {
      out = (e.stdout || "") + (e.stderr || "");
    }
    assert.ok(/Node|tailwindcss|utils/i.test(out), "doctor prints checklist");
  });
});
