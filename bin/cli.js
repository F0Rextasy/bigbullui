#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- CLI runs on plain Node, require() is intentional */
/**
 * bigbullui CLI
 * Zero-dependency CLI to copy, manage, and inspect bigbullui components.
 * Bare "npx bigbullui" runs against the local repo checkout (offline-capable);
 * npm installs fetch component sources from GitHub raw / the registry site.
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

let PACKAGE_VERSION = "1.6.1";
try {
  PACKAGE_VERSION = require("../package.json").version || PACKAGE_VERSION;
} catch {
  // unreachable package.json keeps fallback version
}
const GITHUB_RAW_TAG =
  `https://raw.githubusercontent.com/F0Rextasy/bigbullui/v${PACKAGE_VERSION}`;
const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/F0Rextasy/bigbullui/main";

const REGISTRY_ICON_BASE = "https://ui.bigbullapp.com/r/icons";
// Catalog-registered lib helpers shipped as plain .ts (kept in sync by generate-registry-json.mjs).
const LIB_FILES = ["focus-trap","hooks","use-ticket-audio"];
// Page blocks index (kept in sync by generate-registry-json.mjs).
const BLOCK_FILES = ["admin-academy","admin-analytics","admin-crm","admin-ecommerce","admin-finance","admin-hr","admin-logistics","admin-marketing","admin-overview","admin-saas","admin-support","app-bookmarks","app-calendar","app-chat","app-contacts","app-files","app-invoices","app-kanban","app-mail","app-notes","app-player","app-tasks","app-users","auth-2fa","auth-forgot","auth-login","auth-register","auth-reset","auth-verify","block-car-rental","block-clinic","block-conference","block-contact","block-course","block-customer-portal","block-dev-api-keys","block-event-landing","block-event-ticketing","block-gallery","block-gym","block-hotel","block-job-board","block-live-chat","block-newsletter","block-pet-adoption","block-portfolio","block-real-estate","block-restaurant","block-stats","block-team","block-timeline","block-user-profile-dossier","form-wizard","landing-cta","landing-features","landing-footer","landing-hero","landing-heroes-2","landing-logos","landing-testimonials","page-404","page-about","page-article","page-blog","page-careers","page-cart","page-checkout","page-contact","page-empty","page-faq","page-order-success","page-pricing","page-product","page-storefront","settings-account"];

function isLibSlug(slug) {
  return LIB_FILES.includes(slug);
}

function installedFileFor(baseDir, slug) {
  return isLibSlug(slug) ? path.join(baseDir, "lib", `${slug}.ts`) : path.join(baseDir, `${slug}.tsx`);
}

const UTILS_CONTENT = [
  'export type ClassValue = string | number | boolean | null | undefined;',
  '',
  'const SPACING_DIRS: Record<string, string[]> = {',
  '  p: ["p", "px", "py", "pt", "pr", "pb", "pl", "ps", "pe"],',
  '  px: ["px", "pl", "pr", "ps", "pe"],',
  '  py: ["py", "pt", "pb"],',
  '  m: ["m", "mx", "my", "mt", "mr", "mb", "ml", "ms", "me"],',
  '  mx: ["mx", "ml", "mr", "ms", "me"],',
  '  my: ["my", "mt", "mb"],',
  '};',
  '',
  'const DISPLAY_SET = new Set([',
  '  "block", "inline-block", "inline", "flex", "inline-flex",',
  '  "grid", "inline-grid", "table", "inline-table", "hidden", "contents",',
  ']);',
  '',
  'const POSITION_SET = new Set(["static", "fixed", "absolute", "relative", "sticky"]);',
  'const TEXT_ALIGN_SET = new Set(["left", "center", "right", "justify", "start", "end"]);',
  'const TEXT_SIZE_SET = new Set(["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]);',
  'const FONT_WEIGHT_SET = new Set(["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"]);',
  'const BORDER_STYLE_SET = new Set(["solid", "dashed", "dotted", "double", "hidden", "none"]);',
  'const SHADOW_SIZE_SET = new Set(["2xs", "xs", "sm", "md", "lg", "xl", "2xl", "inner", "none"]);',
  'const ROUNDED_SIZE_SET = new Set(["none", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"]);',
  'const BG_NON_COLOR = /^(?:none|gradient-|linear-|radial-|conic-|clip-|origin-|repeat|no-repeat|cover$|contain$|auto$|center$|top$|bottom$|left$|right$|fixed$|local$|scroll$)/;',
  '',
  'function splitVariant(token: string): [string, string] {',
  '  let depth = 0;',
  '  let lastColon = -1;',
  '  for (let i = 0; i < token.length; i++) {',
  '    const ch = token[i];',
  '    if (ch === "[") depth++;',
  '    else if (ch === "]" && depth > 0) depth--;',
  '    else if (ch === ":" && depth === 0) lastColon = i;',
  '  }',
  '  return lastColon === -1 ? ["", token] : [token.slice(0, lastColon + 1), token.slice(lastColon + 1)];',
  '}',
  '',
  'function getConflictKeys(rawBase: string): string[] {',
  '  const base = rawBase.startsWith("!") ? rawBase.slice(1) : rawBase;',
  '  const negStripped = base.startsWith("-") ? base.slice(1) : base;',
  '',
  '  if (DISPLAY_SET.has(base)) return ["display"];',
  '  if (POSITION_SET.has(base)) return ["position"];',
  '  if (base === "visible" || base === "invisible" || base === "collapse") return ["visibility"];',
  '',
  '  const sp = negStripped.match(/^(p|px|py|pt|pr|pb|pl|ps|pe|m|mx|my|mt|mr|mb|ml|ms|me)-/);',
  '  if (sp) {',
  '    const key = sp[1];',
  '    return SPACING_DIRS[key] ?? [key];',
  '  }',
  '',
  '  if (/^size-/.test(base)) return ["size", "w", "h"];',
  '  if (/^w-/.test(base)) return ["w"];',
  '  if (/^h-/.test(base)) return ["h"];',
  '  if (/^(min-w|max-w|min-h|max-h)-/.test(base)) return [base.slice(0, 5)];',
  '  if (/^gap-/.test(base)) {',
  '    if (base.startsWith("gap-x-")) return ["gap-x"];',
  '    if (base.startsWith("gap-y-")) return ["gap-y"];',
  '    return ["gap", "gap-x", "gap-y"];',
  '  }',
  '  if (/^-?z-/.test(base)) return ["z"];',
  '  if (/^opacity-/.test(base)) return ["opacity"];',
  '  if (/^cursor-/.test(base)) return ["cursor"];',
  '  if (/^pointer-events-/.test(base)) return ["pointer-events"];',
  '  if (/^select-/.test(base)) return ["select"];',
  '  if (/^leading-/.test(base)) return ["leading"];',
  '  if (/^tracking-/.test(base)) return ["tracking"];',
  '  if (/^overflow-(x|y)-/.test(base)) return [`overflow-${base[9]}`];',
  '  if (/^overflow-/.test(base)) return ["overflow", "overflow-x", "overflow-y"];',
  '',
  '  if (base === "shadow" || (base.startsWith("shadow-") && SHADOW_SIZE_SET.has(base.slice(7)))) {',
  '    return ["shadow"];',
  '  }',
  '',
  '  if (base === "rounded" || (base.startsWith("rounded-") && (ROUNDED_SIZE_SET.has(base.slice(8)) || base.slice(8).startsWith("[")))) {',
  '    return ["rounded"];',
  '  }',
  '',
  '  if (base === "border" || /^border-(0|2|4|8|\\[[^\\]#]+(?:px|rem|em)\\])$/.test(base)) {',
  '    return ["border-w"];',
  '  }',
  '  if (/^border-(t|r|b|l|x|y|s|e)(?:-(?:0|2|4|8|\\[[^\\]#]+\\]))?$/.test(base)) {',
  '    return [`border-w-${base[7]}`];',
  '  }',
  '  if (base.startsWith("border-") && BORDER_STYLE_SET.has(base.slice(7))) {',
  '    return ["border-style"];',
  '  }',
  '  if (base.startsWith("border-")) {',
  '    return ["border-color"];',
  '  }',
  '',
  '  if (base.startsWith("text-")) {',
  '    const rest = base.slice(5);',
  '    if (TEXT_ALIGN_SET.has(rest)) return ["text-align"];',
  '    if (TEXT_SIZE_SET.has(rest) || /^\\[(?:length:|[\\d.]+(?:px|rem|em|vw|vh|%))/.test(rest)) {',
  '      return ["text-size"];',
  '    }',
  '    if (rest === "wrap" || rest === "nowrap" || rest === "balance" || rest === "pretty") {',
  '      return ["text-wrap"];',
  '    }',
  '    return ["text-color"];',
  '  }',
  '',
  '  if (base.startsWith("font-")) {',
  '    const rest = base.slice(5);',
  '    if (rest === "sans" || rest === "serif" || rest === "mono") return ["font-family"];',
  '    if (FONT_WEIGHT_SET.has(rest)) return ["font-weight"];',
  '  }',
  '',
  '  if (base.startsWith("bg-") && !BG_NON_COLOR.test(base.slice(3))) {',
  '    return ["bg"];',
  '  }',
  '',
  '  if (base === "transition" || /^transition-/.test(base)) return ["transition"];',
  '  if (/^duration-/.test(base)) return ["duration"];',
  '  if (/^animate-/.test(base)) return ["animate"];',
  '',
  '  return [];',
  '}',
  '',
  '/** Class merger with zero-dependency Tailwind utility conflict resolution (last class wins). */',
  'export function cn(...inputs: ClassValue[]): string {',
  '  const tokens: string[] = [];',
  '  for (const input of inputs) {',
  '    if (typeof input === "string" || typeof input === "number") {',
  '      const str = String(input).trim();',
  '      if (!str) continue;',
  '      for (const part of str.split(/\\s+/)) {',
  '        if (part) tokens.push(part);',
  '      }',
  '    }',
  '  }',
  '  if (tokens.length <= 1) return tokens.join(" ");',
  '',
  '  const kept: string[] = [];',
  '  const seen = new Map<string, number>();',
  '',
  '  for (let i = tokens.length - 1; i >= 0; i--) {',
  '    const token = tokens[i];',
  '    const [variant, base] = splitVariant(token);',
  '    const groups = getConflictKeys(base);',
  '    if (groups.length === 0) {',
  '      kept.push(token);',
  '      continue;',
  '    }',
  '    const primary = `${variant}${groups[0]}`;',
  '    if (seen.has(primary)) continue;',
  '    for (const g of groups) {',
  '      seen.set(`${variant}${g}`, 1);',
  '    }',
  '    kept.push(token);',
  '  }',
  '',
  '  return kept.reverse().join(" ");',
  '}',
  '',
  '/** Returns true only for safe link schemes (http/https/mailto/tel/relative paths/hashes). */',
  'export function isSafeUrl(url: string): boolean {',
  '  const trimmed = url.trim();',
  '  if (!trimmed) return false;',
  '  if (trimmed.startsWith("//")) return false;',
  '  return /^(https?:\\/\\/|mailto:|tel:|\\/|#)/i.test(trimmed);',
  '}',
  '',
  '/** Escapes special regular expression metacharacters in untrusted literal strings. */',
  'export function escapeRegExp(value: string): string {',
  '  return value.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&");',
  '}',
].join('\n');

function stripPackageSourceDirective(css) {
  return css.replace(/^@source\s+["']\.\/dist["'];\r?\n?/gm, "");
}

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
  console.log(`    ${c.green}update${c.reset} [components]     Check installed components against the registry (use -f to apply)`);
  console.log(`    ${c.green}doctor${c.reset}                 Diagnose setup: deps, tokens, utils, dark mode`);
  console.log(`    ${c.green}list${c.reset} [filter]          List components (or pass --blocks / --icons)`);
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

const FETCH_TIMEOUT_MS = 15000;

function fetchUrl(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirects >= 5) {
          res.destroy();
          reject(new Error(`Too many redirects fetching ${url}`));
          return;
        }
        fetchUrl(new URL(res.headers.location, url).href, redirects + 1).then(resolve, reject);
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        res.destroy();
        reject(new Error(`Failed to fetch ${url} (HTTP ${res.statusCode})`));
        return;
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        res.destroy();
        resolve(data);
      });
      res.on("error", reject);
    });
    req.setTimeout(FETCH_TIMEOUT_MS, () => req.destroy(new Error(`Timed out fetching ${url}`)));
    req.on("error", reject);
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

async function fetchGithubRaw(relPath) {
  try {
    return await fetchUrl(`${GITHUB_RAW_TAG}/${relPath}`);
  } catch {
    return await fetchUrl(`${GITHUB_RAW_BASE}/${relPath}`);
  }
}

async function getComponentContent(slug) {
  // Blocks live in src/components/blocks and import ui files via "../ui/x";
  // the CLI installs everything flat, so rewrite those to sibling "./x".
  const blockRewrite = (src) => src.replace(/(["'])\.\.\/ui\//g, "$1./");
  const localUiDir = getLocalPackageUiDir();
  if (localUiDir) {
    const localFile = installedFileFor(localUiDir, slug);
    if (fs.existsSync(localFile)) {
      return fs.readFileSync(localFile, "utf8");
    }
  }
  const repoBlock = path.resolve(__dirname, "..", "src", "components", "blocks", `${slug}.tsx`);
  if (fs.existsSync(repoBlock)) {
    return blockRewrite(fs.readFileSync(repoBlock, "utf8"));
  }

  // Fallback to GitHub raw (version tag first, main branch fallback)
  const remoteRel = isLibSlug(slug)
    ? `src/components/ui/lib/${slug}.ts`
    : `src/components/ui/${slug}.tsx`;
  try {
    return await fetchGithubRaw(remoteRel);
  } catch (err) {
    try {
      return blockRewrite(await fetchGithubRaw(`src/components/blocks/${slug}.tsx`));
    } catch {
      throw err;
    }
  }
}

async function getIconContent(slug) {
  const iconName = slug.startsWith("icon-") ? slug.slice("icon-".length) : slug;
  const localCandidates = [
    path.resolve(__dirname, "..", "public", "r", "icons", `${iconName}.json`),
    path.resolve(__dirname, "..", "public", "r", "icons", `${slug}.json`),
  ];
  for (const p of localCandidates) {
    if (fs.existsSync(p)) {
      try {
        const reg = JSON.parse(fs.readFileSync(p, "utf8"));
        const content = reg && reg.files && reg.files[0] && reg.files[0].content;
        if (typeof content === "string" && content.length > 0) {
          return content;
        }
      } catch {
        // Corrupt local file: fall through to remote fetch
      }
    }
  }

  const remoteUrl = `${REGISTRY_ICON_BASE}/${iconName}.json`;
  const offlineMessage = `Could not fetch "${slug}" from ${remoteUrl}`;
  let raw;
  try {
    raw = await fetchUrl(remoteUrl);
  } catch (err) {
    throw new Error(`${offlineMessage} (${err && err.message ? err.message : "unknown error"}).`);
  }
  try {
    const reg = JSON.parse(raw);
    const content = reg && reg.files && reg.files[0] && reg.files[0].content;
    if (typeof content !== "string" || content.length === 0) {
      throw new Error("empty");
    }
    return content;
  } catch (err) {
    throw new Error(`Could not parse the icon registry for "${slug}" from ${remoteUrl} (${err.message}).`);
  }
}

// Temp file + rename: a crash mid-write never leaves a truncated file behind.
function writeFileAtomic(filePath, data) {
  const tmp = `${filePath}.tmp-${process.pid}`;
  fs.writeFileSync(tmp, data, "utf8");
  fs.renameSync(tmp, filePath);
}

// One resolver for both component files and icon/lib files.
async function getLatest(slug) {
  return slug.startsWith("icon-") ? getIconContent(slug) : getComponentContent(slug);
}

function getLatestUtilsContent() {
  const localUtils = path.resolve(__dirname, "..", "src", "components", "ui", "lib", "utils.ts");
  if (fs.existsSync(localUtils)) {
    return fs.readFileSync(localUtils, "utf8");
  }
  return UTILS_CONTENT;
}

function ensureUtils(targetDir, force = false) {
  const utilsDir = path.join(targetDir, "lib");
  const utilsFile = path.join(utilsDir, "utils.ts");
  const desired = getLatestUtilsContent();
  if (!fs.existsSync(utilsFile)) {
    fs.mkdirSync(utilsDir, { recursive: true });
    writeFileAtomic(utilsFile, desired);
    console.log(`  ${c.green}✓${c.reset} Created utility helper: ${c.dim}${path.relative(process.cwd(), utilsFile)}${c.reset}`);
  } else if (force && fs.readFileSync(utilsFile, "utf8") !== desired) {
    writeFileAtomic(utilsFile, desired);
    console.log(`  ${c.green}✓${c.reset} Updated utility helper: ${c.dim}${path.relative(process.cwd(), utilsFile)}${c.reset}`);
  }
}

function getAllKnownSlugs() {
  const localUiDir = getLocalPackageUiDir();
  let allFiles = ["accordion","achievement-toast","action-buttons","action-sheet","activity-calendar","activity-feed","activity-v2","add-to-cart-button","address-form","admin-shell","agenda-list","agent-artifact-card","airmail-letter","alert","alert-dialog","anchor-nav","announcement-bar","api-key-card","api-tester","app-shell","area-chart","article-card","aspect-ratio","audio-mini","audio-player","audio-recorder","audio-toggle","audio-waveform","audit-log","audit-timeline","autocomplete","avatar","avatar-group","avatar-upload","back-link","backstage-pass","badge","badge-list","badge-printer","badge-printer-template","badge-ribbon","bar-chart","barcode","base64-tool","battle-pass-track","bento-grid","billing-panel","bio-card","board-checklist","boarding-pass","boarding-pass-print","booking-calendar","boss-bar","bottom-sheet","box-plot","breadcrumb","breadcrumb-dropdown","bubble-chart","budget-progress","bug-report","bulk-actions","bullet-chart","button","button-group","calendar","calendar-heatmap","callout","candlestick-chart","card","cargo-shipping-label","carousel","cart-badge","cart-drawer","cassette-tape","centered-card","changelog-entry","changelog-list","char-counter","chat-bubble","chat-thread","chat-window","checkbox","checkbox-card","checkbox-group","checkout-summary","chord-diagram","citation-bubble","clan-card","clock-picker","coach-mark","coat-check-tag","code-block","code-editor","code-tabs","collapsible","color-contrast","color-palette-picker","color-picker","color-token-table","column-toggle","combo-buttons","combo-counter","combobox","combobox-v2","command-k-root","command-palette","comment-thread","compare-table","composed-chart","conditional-fields","confetti-burst","confirm-dialog","connection-status","consent-checkbox","console-panel","container","context-menu","control-chart","cookie-banner","cookie-prefs","copy-button","copy-chip","countdown","countdown-start","countdown-v2","country-select","countup","coupon","coupon-field","credit-card","credit-card-form","credit-card-input","cron-builder","cron-humanizer","crosshair-picker","crypto-ticker","csv-importer","csv-mapper","cta-section","currency-display","currency-select","d-pad","daily-rewards","damage-vignette","danger-zone","data-grid","data-table","date-picker","date-range-picker","date-time-picker","delete-account","density-plot","density-toggle","deploy-timeline","description-list","devices-list","dialog","dialogue-box","diff-editor","diff-viewer","digest-preview","divider-with-text","dm-thread","dock","dockable-panels","docs-prop-playground","docs-stackblitz-button","donut-chart","donut-multi","drag-sort","drawer","drawer-nav","dropdown-menu","dropdown-menu-v2","dual-slider","duration-input","email-input","emoji-picker","empty","empty-col-span","empty-offline","empty-search","env-editor","env-switcher","envelope","error-500","error-page","event-card","exchange-rate","export-menu","fab","faq","feature-flag-panel","feature-grid","feature-vote","feed-masonry","feedback-vote","feedback-widget","field","field-array","figure","file-dropzone","file-image-preview","file-input","file-tree","file-upload-list","filter-builder","filters-drawer","fireworks","flight-timeline-card","flip-card","flip-clock","flyout-menu","flyout-v2","focus-trap","follower-list","footer","footer-minimal","footer-nav","forgot-password","form-builder","form-field","form-progress","form-validation","friend-list","funnel-chart","gacha-pull","gallery-grid","gallery-lightbox","gantt-lite","gauge","gift-card","gift-message","glossary-list","heading","health-bar","heatmap","hero","hero-split","highlight-text","histogram","history-nav","holy-grail","hooks","horizon-chart","hotkey-recorder","hover-card","html-preview","icicle-chart","id-card","image-carousel","image-compare","image-crop","import-review","inbox-list","infinite-scroll","inline-edit","inline-multiselect","input","input-group","input-mask-phone","input-otp","install-prompt","installment-picker","inventory-grid","invite-modal","invite-team","invoice","item","item-slot","joystick","json-editor","json-formatter","json-inspector","json-viewer","jumbotron","jwt-decoder","kanban-lite","kanban-v2","kbd","keyboard-nav-helper","keyboard-shortcuts","keypad","kill-feed","kpi-strip","label","language-select","lanyard","leaderboard","library-due-date-card","lightbox","like-button","line-chart","link-card","list","listbox","live-badge","live-clock","load-more","loading-button","loading-dots","loading-overlay","log-viewer","login-form","logo-cloud","logo-marquee","loot-box","lorem-typer","low-hp-pulse","luggage-tag","magic-link","mailbox","maintenance-banner","maintenance-page","mana-bar","markdown-editor","markdown-preview","marquee","marquee-bulbs","masked-currency","masked-input","masonry-columns","master-detail","match-ticker","matchmaking-lobby","matrix-chart","medal-display","media-controls","media-embed","media-object","mega-menu","megaphone","mention-highlight","mention-input","mention-list","menubar","meter","metric-card","migration-banner","milestone-chart","mini-month","mobile-menu","model-picker","month-picker","multi-select","navbar","navigation-menu","neon-sign","network-graph","newsletter-box","nfc-badge","notification-center","notification-feed","now-serving","nps-survey","number-input","offline-banner","offline-queue","onboarding-checklist","onboarding-pager","order-card","order-tracking","org-chart","org-tree-v2","otp-v2","otp-verify","page-header","page-tabs","pager-dots","pagination","pagination-v2","parking-ticket-meter","passkey-button","passport","passport-id-card","passport-stamp-grid","password-input","password-strength","path-breadcrumb","pause-menu","payment-methods","permission-denied","permissions-matrix","phone-input","pie-interactive","pin-input","ping-indicator","pivot-lite","playlist","podcast-player","poll","poll-results","popover","post-card","poster-card","postmark","price-compare","price-tag","pricing-calculator","pricing-slider","pricing-table","print-invoice","printable-invoice","printable-ticket","product-card","profile-settings","progress","progress-circle","prompt-box","prompt-diff-compare","prompt-history","prompt-history-drawer","prompt-input","pull-refresh","punch-clock","push-permission","qq-plot","qr-code","qr-reader","quest-list","quest-tracker","queue-ticket","queued-jobs","quick-actions","quiz-card","quote","quote-wall","radar-chart","radial-bar","radio-cards","radio-group","radio-tile","range-calendar","rank-list","rate-limit-note","rating","reaction-bar","receipt","receipt-printer","recent-searches","recipe-card","recurrence-picker","refund-card","regex-tester","regex-visualizer","register-form","replay-controls","resizable","resource-scheduler","respawn-timer","responsive-nav","result","reveal","rich-text-editor","roadmap-board","role-badge","route-loader","row-expand","rsvp-card","sample-data","sankey-chart","save-indicator","saved-searches","scatter-plot","score-keeper","score-popup","scoreboard","scratch-card","screenshot-frame","scroll-area","scroll-shadow","scroll-spy-nav","scroll-spy-v2","scroll-top","search-bar","search-command","search-filter-bar","seasonal-pumpkin","seasonal-snow","seat-map","section-heading","security-score","segmented-switch","select","select-v2","sensitivity-slider","separator","serial-input","session-list","settings-section","settings-sheet","share-menu","sheet","shift-planner","shipping-options","shop-grid","shortcut-recorder","sidebar","sidebar-layout","sidebar-v2","signature-line","signature-pad","sitemap-list","size-picker","skeleton","skeleton-v2","skip-link","slider","slider-range-label","slider-ticks","smart-search-bar","snippet-card","social-proof-toast","spark-bars","spark-line-group","sparkline","speed-dial","spinner","split-bill-calculator","split-button","split-flap","split-screen","split-view","spotlight","spotlight-card","spreadsheet-lite","sso-row","stack","stacked-bar","stamp-card","stamp-field","stamp-seal","star","star-rating-input","stat-tile","stats-band","stats-overview","status-dot","status-page","stepper","stepper-v2","steps","sticky-bar","sticky-footer","sticky-split","stock-status","stopwatch","stopwatch-v2","storage-donut","story-ring","story-viewer","stream-graph","streaming-text","subscription-card","suggestion-chips","sunburst-chart","swipe-actions","switch","switch-card","sync-status","tabbar","tabbar-v2","table","table-empty-col","table-summary","tabs","tag-input","task-list","team-frames","team-grid","team-members","terminal","testimonial","testimonial-carousel","text","text-diff","textarea","textarea-autosize","theme-preset-picker","theme-stamping-machine","theme-toggle","thinking-block","thumbnail-strip","ticket-card","ticket-deck-dnd","ticket-fold","ticket-stub-v2","ticket-validator","tilt-card","time-ago","time-input","time-range-picker","timeline","timeline-gantt","timeline-vertical-v2","timezone-select","toast","toc","toggle","toggle-group","token-counter","tooltip","tour","tournament-bracket","train-departure-board","transfer-list","tree-nav","tree-select","tree-table","treemap-chart","trend-badge","trending-chips","trophy-shelf","truncate","turnstile-gate","tutorial-highlight","two-column-list","two-factor","typewriter","typing-indicator","update-toast","upgrade-prompt","upload-progress","usage-meter","usage-quota-ring","use-ticket-audio","user-card","user-table","variant-picker","version-badge","video-frame","video-list","video-player","video-thumbnail","vinyl-record","violin-chart","virtual-card-flipper","virtual-list","voice-chat-visualizer","voice-indicator","voice-message","voice-note-list","volume-slider","waitlist-queue-card","wall-of-love","wallet-card","warranty-certificate","waterfall-chart","watermark","wax-seal","webhook-list","webhook-log","wishlist-button","wizard","word-cloud","world-map","wristband","xp-bar","year-picker","zoom-image"];
  if (localUiDir) {
    allFiles = fs
      .readdirSync(localUiDir)
      .filter((f) => f.endsWith(".tsx") && !f.endsWith(".test.tsx"))
      .map((f) => f.replace(/\.tsx$/, ""));
    const repoLib = path.join(localUiDir, "lib");
    if (fs.existsSync(repoLib)) {
      allFiles.push(...fs.readdirSync(repoLib).filter((f) => f.endsWith(".ts") && f !== "utils.ts").map((f) => f.replace(/\.ts$/, "")));
    }
  }
  return allFiles;
}

function extractLocalDeps(content) {
  const depRegex = /from\s+["']\.(?:\/(lib))?\/([a-z0-9][a-z0-9-]*)["']/g;
  const dependencies = [];
  let match;
  while ((match = depRegex.exec(content)) !== null) {
    if (match[1]) {
      if (isLibSlug(match[2])) dependencies.push(match[2]);
      continue;
    }
    if (match[2] !== "utils") dependencies.push(match[2]);
  }
  return dependencies;
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
      if (customDir === undefined) {
        console.error(`  ${c.red}Error:${c.reset} --dir requires a path argument.`);
        process.exit(1);
      }
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
  if (flags.length > 0) {
    console.log(`  ${c.yellow}!${c.reset} Ignoring unknown flag(s): ${flags.join(", ")}`);
  }

  if (slugs.length === 0 && !addAll) {
    console.error(`  ${c.red}Error:${c.reset} Please specify at least one component to add.`);
    console.log(`  ${c.dim}Example: npx bigbullui add button badge card${c.reset}`);
    process.exit(1);
  }
  for (const slug of slugs) {
    if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
      console.error(`  ${c.red}Error:${c.reset} Invalid component name: ${JSON.stringify(slug)}`);
      process.exitCode = 1;
      return;
    }
  }

  const targetDir = detectTargetDir(customDir);
  fs.mkdirSync(targetDir, { recursive: true });

  ensureUtils(targetDir, force);

  const componentsToAdd = addAll ? getAllKnownSlugs() : slugs;

  console.log(`  Adding components into ${c.cyan}${path.relative(process.cwd(), targetDir)}${c.reset}...\n`);

  let addedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  const refreshedDeps = new Set();

  for (const slug of componentsToAdd) {
    const targetPath = installedFileFor(targetDir, slug);
    if (fs.existsSync(targetPath) && !force) {
      console.log(`  ${c.yellow}↷${c.reset} Skipped ${c.bold}${slug}${c.reset} (already exists, use -f to overwrite)`);
      skippedCount++;
      continue;
    }

    if (slug.startsWith("icon-")) {
      try {
        const content = await getIconContent(slug);
        writeFileAtomic(targetPath, content);
        console.log(`  ${c.green}✓${c.reset} Added ${c.bold}${slug}${c.reset}`);
        addedCount++;
      } catch (err) {
        console.error(`  ${c.red}✗${c.reset} Failed to add ${c.bold}${slug}${c.reset}: ${err.message}`);
        failedCount++;
      }
      continue;
    }

    try {
      const content = await getComponentContent(slug);
      writeFileAtomic(targetPath, content);
      console.log(`  ${c.green}✓${c.reset} Added ${c.bold}${slug}${c.reset}`);
      addedCount++;

      // Detect sibling and lib helper imports ("./ticket-card", "./lib/hooks")
      // transitively (BFS) so multi-hop dependencies also compile on their own.
      const queue = extractLocalDeps(content);
      const visited = new Set([slug, ...queue]);
      while (queue.length > 0) {
        const dep = queue.shift();
        const depPath = installedFileFor(targetDir, dep);
        const alreadyExists = fs.existsSync(depPath);
        if (alreadyExists && (!force || refreshedDeps.has(dep))) continue;
        try {
          const depContent = await getComponentContent(dep);
          writeFileAtomic(depPath, depContent);
          refreshedDeps.add(dep);
          console.log(`    ${c.dim}└─ ${alreadyExists ? "Updated" : "Auto-installed"} dependency:${c.reset} ${c.cyan}${dep}${c.reset}`);
          for (const nested of extractLocalDeps(depContent)) {
            if (!visited.has(nested)) {
              visited.add(nested);
              queue.push(nested);
            }
          }
        } catch {
          console.error(`    ${c.yellow}└─ Could not install dependency ${c.bold}${dep}${c.reset}${c.yellow} — install manually: npx bigbullui add ${dep}${c.reset}`);
        }
      }

    } catch (err) {
      console.error(`  ${c.red}✗${c.reset} Failed to add ${c.bold}${slug}${c.reset}: ${err.message}`);
      if (err.message.includes("(HTTP 404)")) {
        console.error(`  ${c.dim}  Unknown name? Run ${c.reset}npx bigbullui list${c.dim} to see available components.${c.reset}`);
      }
      failedCount++;
    }
  }

  console.log(`\n  ${c.bold}Done!${c.reset} ${c.green}${addedCount} added${c.reset}${skippedCount > 0 ? `, ${c.yellow}${skippedCount} skipped${c.reset}` : ""}.`);
  if (failedCount > 0) {
    console.error(`  ${c.red}${failedCount} component(s) failed to add.${c.reset}`);
    process.exitCode = 1;
  }
  console.log(`  ${c.dim}Enjoying bigbullui? Star us:${c.reset} https://github.com/F0Rextasy/bigbullui`);
  console.log(`  ${c.dim}Import from:${c.reset} ${path.relative(process.cwd(), targetDir).replace(/\\/g, "/")}\n`);
}

async function handleList(args) {
  const showBlocks = args.includes("--blocks");
  const showIcons = args.includes("--icons");
  const filter = (args.find((a) => !a.startsWith("-")) || "").toLowerCase();

  let title = "AVAILABLE COMPONENTS";
  let sourceList;
  let installHint = "npx bigbullui add <name>";

  if (showBlocks) {
    title = "AVAILABLE BLOCKS";
    const localBlocksDir = path.resolve(__dirname, "..", "src", "components", "blocks");
    if (fs.existsSync(localBlocksDir)) {
      sourceList = fs.readdirSync(localBlocksDir).filter((f) => f.endsWith(".tsx")).map((f) => f.replace(/\.tsx$/, "")).sort();
    } else if (BLOCK_FILES.length > 0) {
      sourceList = [...BLOCK_FILES];
    } else {
      const idx = JSON.parse(await fetchUrl("https://ui.bigbullapp.com/blocks.json"));
      sourceList = idx.blocks || [];
    }
  } else if (showIcons) {
    title = "AVAILABLE ICONS";
    installHint = "npx bigbullui add icon-<name>";
    const localIcons = path.resolve(__dirname, "..", "public", "icons.json");
    if (fs.existsSync(localIcons)) {
      sourceList = JSON.parse(fs.readFileSync(localIcons, "utf8")).icons || [];
    } else {
      sourceList = JSON.parse(await fetchUrl("https://ui.bigbullapp.com/icons.json")).icons || [];
    }
  } else {
    sourceList = getAllKnownSlugs();
  }

  const matches = sourceList.filter((slug) => slug.toLowerCase().includes(filter));

  printBanner();
  console.log(`  ${c.bold}${title}${c.reset} (${matches.length}${filter ? ` matching "${filter}"` : ""}):\n`);

  const cols = 3;
  for (let i = 0; i < matches.length; i += cols) {
    const row = matches.slice(i, i + cols).map((name) => {
      return `  • ${c.cyan}${name.padEnd(26)}${c.reset}`;
    });
    console.log(row.join(""));
  }

  console.log(`\n  ${c.dim}Run ${c.yellow}${installHint}${c.dim} to install any item.${c.reset}\n`);
}

function handleInit() {
  printBanner();
  const cwd = process.cwd();
  const targetDir = detectTargetDir();
  ensureUtils(targetDir);

  const cssSourcePath = path.resolve(__dirname, "..", "bigbullui.css");
  let cssTarget = path.join(cwd, "bigbullui.css");

  if (fs.existsSync(cssSourcePath) && !fs.existsSync(cssTarget)) {
    fs.writeFileSync(cssTarget, stripPackageSourceDirective(fs.readFileSync(cssSourcePath, "utf8")), "utf8");
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

function handleTokens(args = []) {
  const force = args.includes("-f") || args.includes("--force");
  const cssSourcePath = path.resolve(__dirname, "..", "bigbullui.css");
  if (!fs.existsSync(cssSourcePath)) {
    console.error(`  ${c.red}Error:${c.reset} Could not locate bigbullui.css.`);
    return;
  }
  const cssTarget = path.join(process.cwd(), "bigbullui.css");
  if (fs.existsSync(cssTarget) && !force) {
    console.log(`  ${c.yellow}↷${c.reset} bigbullui.css already exists (use ${c.bold}-f${c.reset} to overwrite).`);
    return;
  }
  fs.writeFileSync(cssTarget, stripPackageSourceDirective(fs.readFileSync(cssSourcePath, "utf8")), "utf8");
  console.log(`  ${c.green}✓${c.reset} Generated ${c.bold}bigbullui.css${c.reset} in current directory.`);
}

async function handleUpdate(args) {
  let customDir = null;
  let force = false;
  const slugs = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "-d" || arg === "--dir") {
      customDir = args[++i];
      if (customDir === undefined) {
        console.error(`  ${c.red}Error:${c.reset} --dir requires a path argument.`);
        process.exit(1);
      }
    }
    else if (arg === "-f" || arg === "--force") force = true;
    else if (!arg.startsWith("-")) {
      const s = arg.replace(/\.tsx$/, "");
      if (!/^[a-z0-9][a-z0-9-]*$/.test(s)) {
        console.error(`  ${c.red}Error:${c.reset} Invalid component name: ${JSON.stringify(s)}`);
        process.exit(1);
      }
      slugs.push(s);
    }
  }
  const targetDir = detectTargetDir(customDir);
  if (!fs.existsSync(targetDir)) {
    console.error(`  ${c.red}Error:${c.reset} No components installed yet (looked in ${path.relative(process.cwd(), targetDir)}). Run ${c.green}npx bigbullui add button${c.reset} first.`);
    process.exit(1);
  }
  let local = fs.readdirSync(targetDir).filter((f) => f.endsWith(".tsx")).map((f) => f.replace(/\.tsx$/, ""));
  const projLibDir = path.join(targetDir, "lib");
  if (fs.existsSync(projLibDir)) {
    local.push(...fs.readdirSync(projLibDir).filter((f) => f.endsWith(".ts") && f !== "utils.ts").map((f) => f.replace(/\.ts$/, "")));
  }
  if (slugs.length > 0) {
    for (const s of slugs) {
      if (!local.includes(s)) console.log(`  ${c.yellow}!${c.reset} ${c.bold}${s}${c.reset} is not installed here — skipping.`);
    }
    local = local.filter((s) => slugs.includes(s));
  }
  if (local.length === 0) {
    console.log(`  Nothing to check.`);
    return;
  }
  console.log(`  Checking ${local.length} installed component(s)...\n`);
  // Fetch every latest source once, then write: a network failure mid-apply
  // must never leave the project half-updated.
  const latestMap = new Map();
  const outdated = [];
  for (const slug of local) {
    let latest;
    try {
      latest = await getLatest(slug);
    } catch (err) {
      console.error(`  ${c.red}✗${c.reset} Could not check ${c.bold}${slug}${c.reset}: ${err.message}. Skipping.`);
      continue;
    }
    latestMap.set(slug, latest);
    const current = fs.readFileSync(installedFileFor(targetDir, slug), "utf8");
    if (current !== latest) outdated.push(slug);
  }
  const cssSource = path.resolve(__dirname, "..", "bigbullui.css");
  const cssLocal = path.join(process.cwd(), "bigbullui.css");
  let cssStale = false;
  let cssDesired = null;
  if (fs.existsSync(cssLocal)) {
    const rawCss = fs.existsSync(cssSource)
      ? fs.readFileSync(cssSource, "utf8")
      : await fetchGithubRaw("bigbullui.css").catch(() => null);
    if (rawCss !== null) {
      cssDesired = stripPackageSourceDirective(rawCss);
      cssStale = fs.readFileSync(cssLocal, "utf8") !== cssDesired;
    }
  }
  const utilsFile = path.join(targetDir, "lib", "utils.ts");
  const utilsDesired = getLatestUtilsContent();
  const utilsStale = fs.existsSync(utilsFile) && fs.readFileSync(utilsFile, "utf8") !== utilsDesired;
  if (outdated.length === 0 && !cssStale && !utilsStale) {
    console.log(`  ${c.green}✓${c.reset} Everything is up to date.`);
    return;
  }
  for (const slug of outdated) console.log(`  ${c.yellow}●${c.reset} ${c.bold}${slug}${c.reset} has updates.`);
  if (utilsStale) console.log(`  ${c.yellow}●${c.reset} ${c.bold}lib/utils.ts${c.reset} has updates.`);
  if (cssStale) console.log(`  ${c.yellow}●${c.reset} ${c.bold}bigbullui.css${c.reset} has updates.`);
  console.log("");
  if (!force) {
    console.log(`  Run with ${c.yellow}-f${c.reset} to apply, or update one piece: ${c.green}npx bigbullui add <name> -f${c.reset}\n`);
    return;
  }
  let failed = 0;
  for (const slug of outdated) {
    try {
      writeFileAtomic(installedFileFor(targetDir, slug), latestMap.get(slug));
      console.log(`  ${c.green}✓${c.reset} Updated ${c.bold}${slug}${c.reset}`);
    } catch (err) {
      failed += 1;
      console.error(`  ${c.red}✗${c.reset} Failed to update ${c.bold}${slug}${c.reset}: ${err.message}`);
    }
  }
  if (utilsStale) {
    try {
      writeFileAtomic(utilsFile, utilsDesired);
      console.log(`  ${c.green}✓${c.reset} Updated ${c.bold}lib/utils.ts${c.reset}`);
    } catch (err) {
      failed += 1;
      console.error(`  ${c.red}✗${c.reset} Failed to update ${c.bold}lib/utils.ts${c.reset}: ${err.message}`);
    }
  }
  if (cssStale && cssDesired !== null) {
    try {
      writeFileAtomic(cssLocal, cssDesired);
      console.log(`  ${c.green}✓${c.reset} Updated ${c.bold}bigbullui.css${c.reset}`);
    } catch (err) {
      failed += 1;
      console.error(`  ${c.red}✗${c.reset} Failed to update ${c.bold}bigbullui.css${c.reset}: ${err.message}`);
    }
  }
  if (failed > 0) {
    console.error(`  ${c.red}${failed} file(s) failed to update.${c.reset}`);
    process.exitCode = 1;
  }
  console.log("");
}

function handleDoctor() {
  printBanner();
  const cwd = process.cwd();
  const checks = [];
  const major = Number(process.versions.node.split(".")[0]);
  checks.push({ label: `Node ${process.versions.node} (>= 20)`, ok: major >= 20, hint: "Install Node.js 20 or newer." });
  const hasTailwind = fs.existsSync(path.join(cwd, "node_modules", "tailwindcss"));
  checks.push({ label: "tailwindcss installed", ok: hasTailwind, hint: "Run npm install -D tailwindcss @tailwindcss/postcss." });
  const hasCss = fs.existsSync(path.join(cwd, "bigbullui.css"));
  checks.push({ label: "bigbullui.css in project root", ok: hasCss, hint: "Run npx bigbullui tokens." });
  const cssFiles = ["app/globals.css", "src/index.css", "src/globals.css", "styles/globals.css"]
    .map((p) => path.join(cwd, p))
    .filter((p) => fs.existsSync(p));
  const wired = cssFiles.some((p) => {
    const t = fs.readFileSync(p, "utf8");
    return t.includes("bigbullui/css") || t.includes("bigbullui.css");
  });
  checks.push({ label: "tokens imported in global CSS", ok: wired, hint: 'Add @import "bigbullui/css"; after tailwindcss.' });
  const targetDir = detectTargetDir();
  const hasUtils = fs.existsSync(path.join(targetDir, "lib", "utils.ts")) || fs.existsSync(path.join(targetDir, "utils.ts"));
  checks.push({ label: "cn() utils present", ok: hasUtils, hint: "Run npx bigbullui init." });
  let failed = 0;
  for (const check of checks) {
    if (check.ok) console.log(`  ${c.green}✓${c.reset} ${check.label}`);
    else {
      failed += 1;
      console.log(`  ${c.red}✗${c.reset} ${check.label}\n    ${c.dim}${check.hint}${c.reset}`);
    }
  }
  console.log("");
  if (failed > 0) {
    console.log(`  ${failed} check(s) need attention.\n`);
    process.exitCode = 1;
  } else {
    console.log(`  ${c.bold}Healthy. Happy stamping.${c.reset}\n`);
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
      await handleList(args.slice(1));
      break;
    case "init":
      handleInit();
      break;
    case "tokens":
      handleTokens(args.slice(1));
      break;
    case "update":
      await handleUpdate(args.slice(1));
      break;
    case "doctor":
      handleDoctor();
      break;
    case "-v":
    case "--version":
      console.log(require("../package.json").version);
      break;
    case "mcp":
      require("./mcp.js");
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
