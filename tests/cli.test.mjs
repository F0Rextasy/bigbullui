import { describe, it, before, after } from "node:test";
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

  after(() => {
    if (workdir) {
      fs.rmSync(workdir, { recursive: true, force: true });
    }
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

  it("MCP get_component returns bundled sibling files and registryDependencies, and flushes trailing stdin", () => {
    const res = spawnSync(
      "node",
      [cli, "mcp"],
      {
        cwd: workdir,
        encoding: "utf8",
        timeout: 30000,
        input:
          '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_component","arguments":{"name":"stat-tile"}}}\n' +
          '{"jsonrpc":"2.0","id":2,"method":"ping"}',
      }
    );
    const lines = (res.stdout || "").trim().split("\n").map((l) => JSON.parse(l));
    const byId = new Map(lines.map((m) => [m.id, m]));
    const stat = byId.get(1);
    assert.ok(stat && stat.result && !stat.result.isError, "get_component(stat-tile) succeeded");
    const payload = JSON.parse(stat.result.content[0].text);
    assert.ok(Array.isArray(payload.files) && payload.files.length >= 2, "multi-file component includes sibling files");
    assert.ok(payload.files.some((f) => f.path.endsWith("tilt-card.tsx")), "stat-tile includes tilt-card.tsx");
    assert.ok(Array.isArray(payload.registryDependencies) && payload.registryDependencies.some((d) => d.includes("utils.json")), "get_component includes registryDependencies");
    const ping = byId.get(2);
    assert.ok(ping && ping.result, "trailing JSON-RPC request without newline is flushed on stdin end");
  });

  it("doctor passes on a create-bigbull-app style project importing bigbullui/css", () => {
    const appDir = fs.mkdtempSync(path.join(os.tmpdir(), "bigbullui-doctor-"));
    try {
      fs.mkdirSync(path.join(appDir, "app"), { recursive: true });
      fs.mkdirSync(path.join(appDir, "components", "ui", "lib"), { recursive: true });
      fs.mkdirSync(path.join(appDir, "node_modules", "tailwindcss"), { recursive: true });
      fs.mkdirSync(path.join(appDir, "node_modules", "bigbullui"), { recursive: true });
      fs.writeFileSync(path.join(appDir, "app", "globals.css"), '@import "tailwindcss";\n@import "bigbullui/css";\n');
      fs.writeFileSync(path.join(appDir, "components", "ui", "lib", "utils.ts"), "export const cn = () => '';\n");
      fs.writeFileSync(path.join(appDir, "node_modules", "bigbullui", "bigbullui.css"), "/* tokens */\n");
      const res = spawnSync("node", [cli, "doctor"], { cwd: appDir, encoding: "utf8", timeout: 15000 });
      assert.equal(res.status, 0, `doctor should exit 0, got stderr=${res.stderr} stdout=${res.stdout}`);
      assert.match(res.stdout, /Healthy/);
    } finally {
      fs.rmSync(appDir, { recursive: true, force: true });
    }
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

  it("supports info, diff, add --dry-run, remove, and bigbullui.json config", () => {
    const projDir = fs.mkdtempSync(path.join(os.tmpdir(), "bigbullui-workflow-"));
    try {
      fs.writeFileSync(
        path.join(projDir, "bigbullui.json"),
        JSON.stringify({ componentsDir: "./src/ui", cssPath: "./styles/bigbullui.css" }, null, 2)
      );

      // info
      const infoOut = execFileSync("node", [cli, "info", "button"], { cwd: projDir, encoding: "utf8", timeout: 20000 });
      assert.match(infoOut, /button/i);

      // add --dry-run creates nothing
      const dryOut = execFileSync("node", [cli, "add", "button", "--dry-run"], { cwd: projDir, encoding: "utf8", timeout: 20000 });
      assert.match(dryOut, /dry run|would/i);
      assert.equal(fs.existsSync(path.join(projDir, "src", "ui", "button.tsx")), false);

      // add respects bigbullui.json componentsDir
      execFileSync("node", [cli, "add", "button"], { cwd: projDir, encoding: "utf8", timeout: 20000 });
      const btnPath = path.join(projDir, "src", "ui", "button.tsx");
      assert.ok(fs.existsSync(btnPath), "bigbullui.json componentsDir should receive button.tsx");

      // diff shows clean then changed after edit
      const cleanDiff = execFileSync("node", [cli, "diff", "button"], { cwd: projDir, encoding: "utf8", timeout: 20000 });
      assert.match(cleanDiff, /up to date|no differences|clean/i);

      fs.appendFileSync(btnPath, "\n// local modification\n");
      const dirtyDiff = execFileSync("node", [cli, "diff", "button"], { cwd: projDir, encoding: "utf8", timeout: 20000 });
      assert.match(dirtyDiff, /local modification/);

      // remove deletes file
      execFileSync("node", [cli, "remove", "button", "--yes"], { cwd: projDir, encoding: "utf8", timeout: 20000 });
      assert.equal(fs.existsSync(btnPath), false);
    } finally {
      fs.rmSync(projDir, { recursive: true, force: true });
    }
  });

  it("rejects untrusted BIGBULLUI_REGISTRY_BASE hosts via SSRF allowlist", () => {
    const isolatedDir = fs.mkdtempSync(path.join(os.tmpdir(), "bigbullui-ssrf-"));
    try {
      const isolatedCli = path.join(isolatedDir, "cli.js");
      fs.copyFileSync(cli, isolatedCli);
      const res = spawnSync("node", [isolatedCli, "add", "button", "--dir", "./components/ui"], {
        cwd: isolatedDir,
        encoding: "utf8",
        env: { ...process.env, BIGBULLUI_REGISTRY_BASE: "https://evil.example.com" },
        timeout: 15000,
      });
      assert.notEqual(res.status, 0, "untrusted registry origin must fail");
      assert.match(res.stderr + res.stdout, /allowlist|disallowed host|ssrf/i);
    } finally {
      fs.rmSync(isolatedDir, { recursive: true, force: true });
    }
  });

  it("mcp exposes get_block, get_props, resources, and prompts", () => {
    const mcp = path.join(rootDir, "bin", "mcp.js");
    const reqs = [
      { jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "get_block", arguments: { name: "auth-login" } } },
      { jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "get_props", arguments: { name: "button" } } },
      { jsonrpc: "2.0", id: 3, method: "resources/list" },
      { jsonrpc: "2.0", id: 4, method: "resources/read", params: { uri: "bigbullui://catalog" } },
      { jsonrpc: "2.0", id: 5, method: "prompts/list" },
      { jsonrpc: "2.0", id: 6, method: "prompts/get", params: { name: "build-page", arguments: { feature: "login form" } } },
    ]
      .map((r) => JSON.stringify(r))
      .join("\n") + "\n";

    const res = spawnSync("node", [mcp], { input: reqs, encoding: "utf8", timeout: 15000 });
    assert.equal(res.status, 0, res.stderr);
    const msgs = new Map(res.stdout.trim().split("\n").map((l) => JSON.parse(l)).map((m) => [m.id, m]));

    assert.ok(!msgs.get(1)?.result?.isError && msgs.get(1)?.result?.content?.[0]?.text?.includes("auth-login"), "get_block succeeds");
    assert.ok(!msgs.get(2)?.result?.isError && msgs.get(2)?.result?.content?.[0]?.text?.includes("variant"), "get_props returns button props");
    assert.ok(Array.isArray(msgs.get(3)?.result?.resources) && msgs.get(3).result.resources.length >= 2, "resources/list returns catalog + theme");
    assert.ok(msgs.get(4)?.result?.contents?.[0]?.text?.includes("button"), "resources/read returns catalog content");
    assert.ok(Array.isArray(msgs.get(5)?.result?.prompts) && msgs.get(5).result.prompts.length >= 1, "prompts/list returns prompts");
    assert.ok(Array.isArray(msgs.get(6)?.result?.messages) && msgs.get(6).result.messages.length >= 1, "prompts/get returns prompt messages");
  });
});
