import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
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

  it("add auto-installs lib helper dependencies (hooks)", () => {
    run("add", "coupon", "--dir", "./components/ui");
    const hooksPath = path.join(workdir, "components", "ui", "lib", "hooks.ts");
    assert.ok(fs.existsSync(hooksPath), "lib/hooks.ts must be auto-installed with coupon");
    assert.match(fs.readFileSync(hooksPath, "utf8"), /useCopy/, "copied hooks export useCopy");
  });

  it("add icon-* installs and update refreshes icon files", () => {
    const idx = JSON.parse(fs.readFileSync(path.join(rootDir, "public", "icons.json"), "utf8"));
    assert.ok(Array.isArray(idx.icons) && idx.icons.length > 0, "icons.json index must exist (run prebuild)");
    const name = idx.icons[0];
    const iconFile = path.join(workdir, "components", "ui", `icon-${name}.tsx`);
    run("add", `icon-${name}`, "--dir", "./components/ui");
    fs.writeFileSync(iconFile, "// stale icon copy\n", "utf8");
    const out = run("update", "--dir", "./components/ui", "-f");
    assert.match(out, /Updated.*icon-/, "update must refresh icon files");
    assert.ok(!/offline/i.test(out), "icon update must not blame offline while sources resolve");
    assert.ok(!fs.readFileSync(iconFile, "utf8").includes("// stale icon copy"), "icon content restored from registry");
  });

  it("rejects --dir without a value", () => {
    const res = spawnSync("node", [cli, "add", "button", "--dir"], { cwd: workdir, encoding: "utf8", timeout: 30000 });
    assert.equal(res.status, 1, "missing --dir value must exit non-zero");
    assert.match(res.stderr + res.stdout, /--dir/);
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

  it("rejects path-traversal slugs with a non-zero exit", () => {
    const res = spawnSync("node", [cli, "add", "../../evil"], { cwd: workdir, encoding: "utf8", timeout: 30000 });
    assert.equal(res.status, 1, "invalid slug must exit non-zero");
    assert.match(res.stderr + res.stdout, /Invalid component name/);
  });

  it("-v prints the package version", () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
    assert.equal(run("-v").trim(), pkg.version);
  });

  it("npx bigbullui mcp starts the stdio MCP server", () => {
    const res = spawnSync(
      "node",
      [cli, "mcp"],
      {
        cwd: workdir,
        encoding: "utf8",
        timeout: 30000,
        input:
          '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05"}}\n' +
          '{"jsonrpc":"2.0","id":2,"method":"tools/list"}\n' +
          '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"list_components","arguments":{"search":"ticket"}}}\n' +
          '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"get_component","arguments":{"name":"..%2F..%2Fevil"}}}\n',
      }
    );
    const lines = (res.stdout || "").trim().split("\n").map((l) => JSON.parse(l));
    const byId = new Map(lines.map((m) => [m.id, m]));
    const init = byId.get(1);
    assert.ok(init && init.result, "initialize replied");
    assert.equal(init.result.serverInfo.name, "bigbullui");
    const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
    assert.equal(init.result.serverInfo.version, pkg.version, "server reports the real package version");
    const tools = byId.get(2);
    assert.ok(tools && tools.result.tools.length >= 6, "tools/list exposes all tools");
    const call = byId.get(3);
    assert.ok(call && call.result && !call.result.isError, "list_components succeeds locally");
    const bad = byId.get(4);
    assert.ok(bad && bad.result && bad.result.isError === true, "invalid name returns isError result, not protocol error");
  });

  it("init and tokens strip package-local @source directive from bigbullui.css", () => {
    const isolated = fs.mkdtempSync(path.join(os.tmpdir(), "bigbullui-tokens-"));
    try {
      execFileSync("node", [cli, "tokens"], { cwd: isolated, encoding: "utf8", timeout: 30000 });
      const css = fs.readFileSync(path.join(isolated, "bigbullui.css"), "utf8");
      assert.doesNotMatch(css, /^@source\s+["']\.\/dist["']/m, "copied CSS must not keep ./dist @source directive");
      assert.ok(css.includes("--background:"), "copied CSS retains design tokens");
    } finally {
      fs.rmSync(isolated, { recursive: true, force: true });
    }
  });

  it("list --blocks and list --icons print blocks and icon names offline", () => {
    const blocksOut = run("list", "--blocks");
    assert.match(blocksOut, /admin-overview|auth-login/, "list --blocks prints block slugs");
    const iconsOut = run("list", "--icons", "ticket");
    assert.ok(iconsOut.includes("ticket"), "list --icons filters icon names");
  });

  it("create-bigbull-app --help, -v, and --no-install run cleanly without DEP0190", () => {
    const createBin = path.join(rootDir, "packages", "create-app", "bin", "create.js");
    const createPkg = JSON.parse(fs.readFileSync(path.join(rootDir, "packages", "create-app", "package.json"), "utf8"));
    const helpRes = spawnSync("node", [createBin, "--help"], { encoding: "utf8", timeout: 15000 });
    assert.equal(helpRes.status, 0);
    assert.match(helpRes.stdout, /Usage:/);

    const verRes = spawnSync("node", [createBin, "-v"], { encoding: "utf8", timeout: 15000 });
    assert.equal(verRes.status, 0);
    assert.equal(verRes.stdout.trim(), createPkg.version);

    const appParent = fs.mkdtempSync(path.join(os.tmpdir(), "bigbullui-create-"));
    try {
      const scaffoldRes = spawnSync("node", [createBin, "sample-app", "--no-install"], {
        cwd: appParent,
        encoding: "utf8",
        timeout: 30000,
      });
      assert.equal(scaffoldRes.status, 0, scaffoldRes.stderr);
      assert.doesNotMatch(scaffoldRes.stderr || "", /DEP0190/, "must not emit Node DEP0190 shell deprecation warnings");
      const pkg = JSON.parse(fs.readFileSync(path.join(appParent, "sample-app", "package.json"), "utf8"));
      assert.equal(pkg.name, "sample-app");
      assert.ok(fs.existsSync(path.join(appParent, "sample-app", ".gitignore")));
      assert.ok(fs.existsSync(path.join(appParent, "sample-app", "tsconfig.json")));
      assert.ok(fs.existsSync(path.join(appParent, "sample-app", "next.config.ts")));
    } finally {
      fs.rmSync(appParent, { recursive: true, force: true });
    }
  });
});
