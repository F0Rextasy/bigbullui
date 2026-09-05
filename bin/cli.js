#!/usr/bin/env node

/**
 * bigbullui CLI
 * Zero-dependency CLI to copy, manage, and inspect bigbullui components.
 * Works offline (when installed) and online (via npx / GitHub raw fallback).
 */

const fs = require("node:fs");
const path = require("node:path");
const https = require("node:https");

// ANSI color helpers
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  cream: "\x1b[38;2;246;240;224m",
  stamp: "\x1b[38;2;188;58;40m",
};

const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/F0Rextasy/bigbullui/main";

const UTILS_CONTENT = `export type ClassValue = string | number | boolean | null | undefined;

/** Minimal class merger: truthy values joined by space. */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
`;

function printBanner() {
  console.log("");
  console.log(`  ${c.stamp}┌──────────────────────────────────────────────┐${c.reset}`);
  console.log(`  ${c.stamp}│${c.reset}  ${c.bold}🎫 bigbullui${c.reset} ${c.dim}— Ticket Stub Component CLI${c.reset}  ${c.stamp}│${c.reset}`);
  console.log(`  ${c.stamp}│${c.reset}  ${c.dim}React 19 + Tailwind CSS 4 • Zero-deps${c.reset}       ${c.stamp}│${c.reset}`);
  console.log(`  ${c.stamp}└──────────────────────────────────────────────┘${c.reset}`);
  console.log("");
}

function printHelp() {
  printBanner();
  console.log(`  ${c.bold}USAGE${c.reset}`);
  console.log(`    ${c.cyan}npx bigbullui${c.reset} <command> [options]\n`);
  console.log(`  ${c.bold}COMMANDS${c.reset}`);
  console.log(`    ${c.green}add${c.reset} <...components>    Add one or more components to your project`);
  console.log(`    ${c.green}list${c.reset} [filter]          List available components (optional search filter)`);
  console.log(`    ${c.green}init${c.reset}                   Initialize bigbullui utils and tokens in your project`);
  console.log(`    ${c.green}tokens${c.reset}                 Export bigbullui.css design tokens locally`);
  console.log(`    ${c.green}help${c.reset}                   Show this help message\n`);
  console.log(`  ${c.bold}OPTIONS${c.reset}`);
  console.log(`    ${c.yellow}-d, --dir${c.reset} <path>       Target directory for components (default: auto-detected)`);
  console.log(`    ${c.yellow}-f, --force${c.reset}            Overwrite existing files without asking`);
  console.log(`    ${c.yellow}--all${c.reset}                  Add all components into your project\n`);
  console.log(`  ${c.bold}EXAMPLES${c.reset}`);
  console.log(`    ${c.dim}# Add a button and badge${c.reset}`);
  console.log(`    npx bigbullui add button badge\n`);
  console.log(`    ${c.dim}# List all chart components${c.reset}`);
  console.log(`    npx bigbullui list chart\n`);
  console.log(`    ${c.dim}# Add ticket stub to a custom directory${c.reset}`);
  console.log(`    npx bigbullui add ticket-stub --dir ./components/ui\n`);
}

function detectTargetDir(customDir) {
  const cwd = process.cwd();
  if (customDir) {
    return path.resolve(cwd, customDir);
  }

  // Check common directory layouts
  const candidates = [
    path.join(cwd, "src", "components", "ui"),
    path.join(cwd, "components", "ui"),
    path.join(cwd, "src", "ui"),
    path.join(cwd, "components"),
  ];

  for (const dir of candidates) {
    if (fs.existsSync(dir)) {
      return dir;
    }
  }

  // Default to src/components/ui if src exists, otherwise components/ui
  if (fs.existsSync(path.join(cwd, "src"))) {
    return path.join(cwd, "src", "components", "ui");
  }
  return path.join(cwd, "components", "ui");
}

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchUrl(res.headers.location).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch ${url} (HTTP ${res.statusCode})`));
          return;
        }
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

function getLocalPackageUiDir() {
  // Check if CLI is running from inside bigbullui repo or installed package
  const possiblePaths = [
    path.resolve(__dirname, "..", "src", "components", "ui"),
    path.resolve(__dirname, "src", "components", "ui"),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function getComponentContent(slug) {
  const localUiDir = getLocalPackageUiDir();
  if (localUiDir) {
    const localFile = path.join(localUiDir, `${slug}.tsx`);
    if (fs.existsSync(localFile)) {
      return fs.readFileSync(localFile, "utf8");
    }
  }

  // Fallback to GitHub raw
  const remoteUrl = `${GITHUB_RAW_BASE}/src/components/ui/${slug}.tsx`;
  return await fetchUrl(remoteUrl);
}

function ensureUtils(targetDir) {
  const utilsDir = path.join(targetDir, "lib");
  const utilsFile = path.join(utilsDir, "utils.ts");
  if (!fs.existsSync(utilsFile)) {
    fs.mkdirSync(utilsDir, { recursive: true });
    fs.writeFileSync(utilsFile, UTILS_CONTENT, "utf8");
    console.log(`  ${c.green}✓${c.reset} Created utility helper: ${c.dim}${path.relative(process.cwd(), utilsFile)}${c.reset}`);
  }
}

async function handleAdd(args) {
  const flags = [];
  const slugs = [];
  let customDir = null;
  let force = false;
  let addAll = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-d" || arg === "--dir") {
      customDir = args[++i];
    } else if (arg === "-f" || arg === "--force") {
      force = true;
    } else if (arg === "--all") {
      addAll = true;
    } else if (arg.startsWith("-")) {
      flags.push(arg);
    } else {
      slugs.push(arg.replace(/\.tsx$/, ""));
    }
  }

  if (slugs.length === 0 && !addAll) {
    console.error(`  ${c.red}Error:${c.reset} Please specify at least one component to add.`);
    console.log(`  ${c.dim}Example: npx bigbullui add button badge card${c.reset}`);
    process.exit(1);
  }

  const targetDir = detectTargetDir(customDir);
  fs.mkdirSync(targetDir, { recursive: true });

  ensureUtils(targetDir);

  const localUiDir = getLocalPackageUiDir();
  let componentsToAdd = slugs;

  if (addAll) {
    if (localUiDir) {
      componentsToAdd = fs
        .readdirSync(localUiDir)
        .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
        .map((f) => f.replace(/\.tsx$/, ""));
    } else {
      console.error(`  ${c.red}Error:${c.reset} --all requires bigbullui to be installed locally.`);
      process.exit(1);
    }
  }

  console.log(`  Adding components into ${c.cyan}${path.relative(process.cwd(), targetDir)}${c.reset}...\n`);

  let addedCount = 0;
  let skippedCount = 0;

  for (const slug of componentsToAdd) {
    const targetPath = path.join(targetDir, `${slug}.tsx`);
    if (fs.existsSync(targetPath) && !force) {
      console.log(`  ${c.yellow}↷${c.reset} Skipped ${c.bold}${slug}${c.reset} (already exists, use -f to overwrite)`);
      skippedCount++;
      continue;
    }

    try {
      const content = await getComponentContent(slug);
      fs.writeFileSync(targetPath, content, "utf8");
      console.log(`  ${c.green}✓${c.reset} Added ${c.bold}${slug}${c.reset}`);
      addedCount++;

      // Check for sibling imports like "./ticket-card" and notify if needed
      const siblingRegex = /from\s+["']\.\/([a-z0-9-]+)["']/g;
      let match;
      const dependencies = [];
      while ((match = siblingRegex.exec(content)) !== null) {
        if (match[1] !== "lib" && match[1] !== "utils") {
          dependencies.push(match[1]);
        }
      }

      for (const dep of dependencies) {
        const depPath = path.join(targetDir, `${dep}.tsx`);
        if (!fs.existsSync(depPath)) {
          try {
            const depContent = await getComponentContent(dep);
            fs.writeFileSync(depPath, depContent, "utf8");
            console.log(`    ${c.dim}└─ Automatically included required dependency:${c.reset} ${c.cyan}${dep}${c.reset}`);
          } catch {
            // Sibling not critical or not found
          }
        }
      }
    } catch (err) {
      console.error(`  ${c.red}✗${c.reset} Failed to add ${c.bold}${slug}${c.reset}: ${err.message}`);
    }
  }

  console.log(`\n  ${c.bold}Done!${c.reset} ${c.green}${addedCount} added${c.reset}${skippedCount > 0 ? `, ${c.yellow}${skippedCount} skipped${c.reset}` : ""}.`);
  console.log(`  ${c.dim}Import from:${c.reset} ${path.relative(process.cwd(), targetDir).replace(/\\/g, "/")}\n`);
}

function handleList(args) {
  const filter = (args[0] || "").toLowerCase();
  const localUiDir = getLocalPackageUiDir();

  let allFiles = [];
  if (localUiDir) {
    allFiles = fs
      .readdirSync(localUiDir)
      .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
      .map((f) => f.replace(/\.tsx$/, ""));
  } else {
    allFiles = [
      "accordion", "alert", "alert-dialog", "aspect-ratio", "avatar", "badge",
      "barcode", "boarding-pass", "bullet-chart", "button", "calendar",
      "callout", "card", "carousel", "checkbox", "code-block", "combobox",
      "context-menu", "copy-button", "dialog", "drawer", "dropdown-menu",
      "form", "input", "menubar", "pagination", "popover", "progress",
      "radio-group", "scroll-area", "select", "separator", "sheet", "skeleton",
      "slider", "split-flap", "stamp-card", "switch", "table", "tabs",
      "textarea", "ticket-stub", "toast", "toggle", "tooltip"
    ];
  }

  const matches = allFiles.filter((slug) => slug.includes(filter));

  printBanner();
  console.log(`  ${c.bold}AVAILABLE COMPONENTS${c.reset} (${matches.length}${filter ? ` matching "${filter}"` : ""}):\n`);

  const cols = 3;
  for (let i = 0; i < matches.length; i += cols) {
    const row = matches.slice(i, i + cols).map((name) => {
      return `  • ${c.cyan}${name.padEnd(26)}${c.reset}`;
    });
    console.log(row.join(""));
  }

  console.log(`\n  ${c.dim}Run ${c.yellow}npx bigbullui add <name>${c.dim} to install any component.${c.reset}\n`);
}

function handleInit() {
  printBanner();
  const cwd = process.cwd();
  const targetDir = detectTargetDir();
  ensureUtils(targetDir);

  const cssSourcePath = path.resolve(__dirname, "..", "bigbullui.css");
  let cssTarget = path.join(cwd, "bigbullui.css");

  if (fs.existsSync(cssSourcePath) && !fs.existsSync(cssTarget)) {
    fs.copyFileSync(cssSourcePath, cssTarget);
    console.log(`  ${c.green}✓${c.reset} Copied ${c.bold}bigbullui.css${c.reset} to project root.`);
  }

  console.log(`\n  ${c.bold}🎉 bigbullui initialized!${c.reset}\n`);
  console.log(`  ${c.bold}Next Steps:${c.reset}`);
  console.log(`  1. In your global CSS (e.g. ${c.cyan}app/globals.css${c.reset} or ${c.cyan}src/index.css${c.reset}):`);
  console.log(`     ${c.dim}@import "tailwindcss";${c.reset}`);
  console.log(`     ${c.yellow}@import "bigbullui/css";${c.reset} ${c.dim}(or @import "./bigbullui.css";)${c.reset}\n`);
  console.log(`  2. Add your first component:`);
  console.log(`     ${c.green}npx bigbullui add button badge card${c.reset}\n`);
}

function handleTokens() {
  const cssSourcePath = path.resolve(__dirname, "..", "bigbullui.css");
  if (fs.existsSync(cssSourcePath)) {
    const cssTarget = path.join(process.cwd(), "bigbullui.css");
    fs.copyFileSync(cssSourcePath, cssTarget);
    console.log(`  ${c.green}✓${c.reset} Generated ${c.bold}bigbullui.css${c.reset} in current directory.`);
  } else {
    console.error(`  ${c.red}Error:${c.reset} Could not locate bigbullui.css.`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "add":
      await handleAdd(args.slice(1));
      break;
    case "list":
    case "ls":
      handleList(args.slice(1));
      break;
    case "init":
      handleInit();
      break;
    case "tokens":
      handleTokens();
      break;
    case "-h":
    case "--help":
    case "help":
    case undefined:
      printHelp();
      break;
    default:
      // If someone runs `npx bigbullui button badge`, treat it as `add`
      if (!command.startsWith("-")) {
        await handleAdd(args);
      } else {
        printHelp();
      }
      break;
  }
}

main().catch((err) => {
  console.error(`\n  ${c.red}CLI Error:${c.reset} ${err.message}\n`);
  process.exit(1);
});
