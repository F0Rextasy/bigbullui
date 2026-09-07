#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- CLI runs on plain Node, require() is intentional */

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

  let allFiles = ["accordion","achievement-toast","action-buttons","action-sheet","activity-calendar","activity-feed","activity-v2","add-to-cart-button","address-form","admin-shell","agenda-list","agent-artifact-card","airmail-letter","alert","alert-dialog","anchor-nav","announcement-bar","api-key-card","api-tester","app-shell","area-chart","article-card","aspect-ratio","audio-mini","audio-player","audio-recorder","audio-toggle","audio-waveform","audit-log","audit-timeline","autocomplete","avatar","avatar-group","avatar-upload","back-link","backstage-pass","badge","badge-list","badge-printer","badge-printer-template","badge-ribbon","bar-chart","barcode","base64-tool","battle-pass-track","bento-grid","billing-panel","bio-card","board-checklist","boarding-pass","boarding-pass-print","booking-calendar","boss-bar","bottom-sheet","box-plot","breadcrumb","breadcrumb-dropdown","bubble-chart","budget-progress","bug-report","bulk-actions","bullet-chart","button","button-group","calendar","calendar-heatmap","callout","candlestick-chart","card","cargo-shipping-label","carousel","cart-badge","cart-drawer","cassette-tape","centered-card","changelog-entry","changelog-list","char-counter","chat-bubble","chat-thread","chat-window","checkbox","checkbox-card","checkbox-group","checkout-summary","chord-diagram","citation-bubble","clan-card","clock-picker","coach-mark","coat-check-tag","code-block","code-editor","code-tabs","collapsible","color-contrast","color-palette-picker","color-picker","color-token-table","column-toggle","combo-buttons","combo-counter","combobox","combobox-v2","command-k-root","command-palette","comment-thread","compare-table","composed-chart","conditional-fields","confetti-burst","confirm-dialog","connection-status","consent-checkbox","console-panel","container","context-menu","control-chart","cookie-banner","cookie-prefs","copy-button","copy-chip","countdown","countdown-start","countdown-v2","country-select","countup","coupon","coupon-field","credit-card","credit-card-form","credit-card-input","cron-builder","cron-humanizer","crosshair-picker","crypto-ticker","csv-importer","csv-mapper","cta-section","currency-display","currency-select","d-pad","daily-rewards","damage-vignette","danger-zone","data-grid","data-table","date-picker","date-range-picker","date-time-picker","delete-account","density-plot","density-toggle","deploy-timeline","description-list","devices-list","dialog","dialogue-box","diff-editor","diff-viewer","digest-preview","divider-with-text","dm-thread","dock","dockable-panels","docs-prop-playground","docs-stackblitz-button","donut-chart","donut-multi","drag-sort","drawer","drawer-nav","dropdown-menu","dropdown-menu-v2","dual-slider","duration-input","email-input","emoji-picker","empty","empty-col-span","empty-offline","empty-search","env-editor","env-switcher","envelope","error-500","error-page","event-card","exchange-rate","export-menu","fab","faq","feature-flag-panel","feature-grid","feature-vote","feed-masonry","feedback-vote","feedback-widget","field","field-array","figure","file-dropzone","file-image-preview","file-input","file-tree","file-upload-list","filter-builder","filters-drawer","fireworks","flight-timeline-card","flip-card","flip-clock","flyout-menu","flyout-v2","follower-list","footer","footer-minimal","footer-nav","forgot-password","form-builder","form-field","form-progress","form-validation","friend-list","funnel-chart","gacha-pull","gallery-grid","gallery-lightbox","gantt-lite","gauge","gift-card","gift-message","glossary-list","heading","health-bar","heatmap","hero","hero-split","highlight-text","histogram","history-nav","holy-grail","horizon-chart","hotkey-recorder","hover-card","html-preview","icicle-chart","id-card","image-carousel","image-compare","image-crop","import-review","inbox-list","infinite-scroll","inline-edit","inline-multiselect","input","input-group","input-mask-phone","input-otp","install-prompt","installment-picker","inventory-grid","invite-modal","invite-team","invoice","item","item-slot","joystick","json-editor","json-formatter","json-inspector","json-viewer","jumbotron","jwt-decoder","kanban-lite","kanban-v2","kbd","keyboard-nav-helper","keyboard-shortcuts","keypad","kill-feed","kpi-strip","label","language-select","lanyard","leaderboard","library-due-date-card","lightbox","like-button","line-chart","link-card","list","listbox","live-badge","live-clock","load-more","loading-button","loading-dots","loading-overlay","log-viewer","login-form","logo-cloud","logo-marquee","loot-box","lorem-typer","low-hp-pulse","luggage-tag","magic-link","mailbox","maintenance-banner","maintenance-page","mana-bar","markdown-editor","markdown-preview","marquee","marquee-bulbs","masked-currency","masked-input","masonry-columns","master-detail","match-ticker","matchmaking-lobby","matrix-chart","medal-display","media-controls","media-embed","media-object","mega-menu","megaphone","mention-highlight","mention-input","mention-list","menubar","meter","metric-card","migration-banner","milestone-chart","mini-month","mobile-menu","model-picker","month-picker","multi-select","navbar","navigation-menu","neon-sign","network-graph","newsletter-box","nfc-badge","notification-center","notification-feed","now-serving","nps-survey","number-input","offline-banner","offline-queue","onboarding-checklist","onboarding-pager","order-card","order-tracking","org-chart","org-tree-v2","otp-v2","otp-verify","page-header","page-tabs","pager-dots","pagination","pagination-v2","parking-ticket-meter","passkey-button","passport","passport-id-card","passport-stamp-grid","password-input","password-strength","path-breadcrumb","pause-menu","payment-methods","permission-denied","permissions-matrix","phone-input","pie-interactive","pin-input","ping-indicator","pivot-lite","playlist","podcast-player","poll","poll-results","popover","post-card","poster-card","postmark","price-compare","price-tag","pricing-calculator","pricing-slider","pricing-table","print-invoice","printable-invoice","printable-ticket","product-card","profile-settings","progress","progress-circle","prompt-box","prompt-diff-compare","prompt-history","prompt-history-drawer","prompt-input","pull-refresh","punch-clock","push-permission","qq-plot","qr-code","qr-reader","quest-list","quest-tracker","queue-ticket","queued-jobs","quick-actions","quiz-card","quote","quote-wall","radar-chart","radial-bar","radio-cards","radio-group","radio-tile","range-calendar","rank-list","rate-limit-note","rating","reaction-bar","receipt","receipt-printer","recent-searches","recipe-card","recurrence-picker","refund-card","regex-tester","regex-visualizer","register-form","replay-controls","resizable","resource-scheduler","respawn-timer","responsive-nav","result","reveal","rich-text-editor","roadmap-board","role-badge","route-loader","row-expand","rsvp-card","sample-data","sankey-chart","save-indicator","saved-searches","scatter-plot","score-keeper","score-popup","scoreboard","scratch-card","screenshot-frame","scroll-area","scroll-shadow","scroll-spy-nav","scroll-spy-v2","scroll-top","search-bar","search-command","search-filter-bar","seasonal-pumpkin","seasonal-snow","seat-map","section-heading","security-score","segmented-switch","select","select-v2","sensitivity-slider","separator","serial-input","session-list","settings-section","settings-sheet","share-menu","sheet","shift-planner","shipping-options","shop-grid","shortcut-recorder","sidebar","sidebar-layout","sidebar-v2","signature-line","signature-pad","sitemap-list","size-picker","skeleton","skeleton-v2","skip-link","slider","slider-range-label","slider-ticks","smart-search-bar","snippet-card","social-proof-toast","spark-bars","spark-line-group","sparkline","speed-dial","spinner","split-bill-calculator","split-button","split-flap","split-screen","split-view","spotlight","spotlight-card","spreadsheet-lite","sso-row","stack","stacked-bar","stamp-card","stamp-field","stamp-seal","star","star-rating-input","stat-tile","stats-band","stats-overview","status-dot","status-page","stepper","stepper-v2","steps","sticky-bar","sticky-footer","sticky-split","stock-status","stopwatch","stopwatch-v2","storage-donut","story-ring","story-viewer","stream-graph","streaming-text","subscription-card","suggestion-chips","sunburst-chart","swipe-actions","switch","switch-card","sync-status","tabbar","tabbar-v2","table","table-empty-col","table-summary","tabs","tag-input","task-list","team-frames","team-grid","team-members","terminal","testimonial","testimonial-carousel","text","text-diff","textarea","textarea-autosize","theme-preset-picker","theme-stamping-machine","theme-toggle","thinking-block","thumbnail-strip","ticket-card","ticket-deck-dnd","ticket-fold","ticket-stub-v2","ticket-validator","tilt-card","time-ago","time-input","time-range-picker","timeline","timeline-gantt","timeline-vertical-v2","timezone-select","toast","toc","toggle","toggle-group","token-counter","tooltip","tour","tournament-bracket","train-departure-board","transfer-list","tree-nav","tree-select","tree-table","treemap-chart","trend-badge","trending-chips","trophy-shelf","truncate","turnstile-gate","tutorial-highlight","two-column-list","two-factor","typewriter","typing-indicator","update-toast","upgrade-prompt","upload-progress","usage-meter","usage-quota-ring","user-card","user-table","variant-picker","version-badge","video-frame","video-list","video-player","video-thumbnail","vinyl-record","violin-chart","virtual-card-flipper","virtual-list","voice-chat-visualizer","voice-indicator","voice-message","voice-note-list","volume-slider","waitlist-queue-card","wall-of-love","wallet-card","warranty-certificate","waterfall-chart","watermark","wax-seal","webhook-list","webhook-log","wishlist-button","wizard","word-cloud","world-map","wristband","xp-bar","year-picker","zoom-image"];
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
      "textarea", "ticket-stub", "toast", "toggle", "tooltip",
      "thinking-block", "prompt-input", "streaming-text", "token-counter",
      "prompt-history-drawer", "model-picker", "feedback-vote",
      "agent-artifact-card", "prompt-diff-compare", "voice-chat-visualizer",
      "citation-bubble", "printable-ticket", "printable-invoice",
      "boarding-pass-print", "badge-printer-template", "audio-toggle"
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
