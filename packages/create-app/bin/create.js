#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- scaffolder runs on plain Node, require() is intentional */
/* Zero-dependency scaffolder: copies template/, names it, optionally installs. */

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name === "_gitignore" ? ".gitignore" : entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

function sanitizePackageName(rawPath) {
  const base = path.basename(rawPath).toLowerCase();
  const cleaned = base
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/^[^a-z0-9]+/, "")
    .replace(/-+/g, "-");
  return cleaned || "my-bigbull-app";
}

function detectPackageManager() {
  const ua = process.env.npm_config_user_agent || "";
  if (ua.startsWith("pnpm/")) return "pnpm";
  if (ua.startsWith("yarn/")) return "yarn";
  if (ua.startsWith("bun/")) return "bun";
  return "npm";
}

function printUsage() {
  console.log("Usage: npx create-bigbull-app <project-name | .> [--no-install] [--help] [--version]");
}

function main() {
  const rawArgs = process.argv.slice(2);
  if (rawArgs.includes("--help") || rawArgs.includes("-h")) {
    printUsage();
    process.exit(0);
  }
  if (rawArgs.includes("--version") || rawArgs.includes("-v")) {
    const { version } = require("../package.json");
    console.log(version);
    process.exit(0);
  }

  const noInstall = rawArgs.includes("--no-install");
  const positional = rawArgs.filter((a) => !a.startsWith("-"));
  const name = positional[0];
  if (!name) {
    printUsage();
    process.exit(1);
  }

  const dest = path.resolve(process.cwd(), name);
  if (fs.existsSync(dest)) {
    const entries = fs.readdirSync(dest).filter((e) => e !== ".git");
    if (name !== "." || entries.length > 0) {
      console.error(`Error: directory "${name}" already exists and is not empty.`);
      process.exit(1);
    }
  }

  copyDir(path.join(__dirname, "..", "template"), dest);

  const pkgPath = path.join(dest, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.name = sanitizePackageName(dest);
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

  const pm = detectPackageManager();
  console.log(`\n  Created ${name} with bigbullui + Tailwind CSS v4.\n`);
  if (!noInstall) {
    console.log(`  Installing dependencies with ${pm}...\n`);
    const pmArgs = pm === "npm" ? ["install", "--no-audit", "--no-fund"] : ["install"];
    const r =
      process.platform === "win32"
        ? spawnSync(process.env.ComSpec || "cmd.exe", ["/d", "/s", "/c", `${pm} ${pmArgs.join(" ")}`], {
            cwd: dest,
            stdio: "inherit",
          })
        : spawnSync(pm, pmArgs, { cwd: dest, stdio: "inherit" });
    if (r.status !== 0) {
      console.error(`\n  Install failed — run \`${pm} install\` inside the project manually.`);
      process.exit(r.status || 1);
    }
  }
  const cdStep = name === "." ? "" : `    cd ${name}\n`;
  console.log(`\n  Next steps:\n${cdStep}    ${pm} run dev\n`);
}

main();
