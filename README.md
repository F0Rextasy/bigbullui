
<div align="center">
  <img src="https://ui.bigbullapp.com/logo.svg" alt="bigbullui logo" width="96" />
</div>

# bigbullui

> 660 tactile, copy-paste React 19 + Tailwind CSS 4 components you own. Zero external dependencies. Open source, MIT licensed.

[![npm version](https://badge.fury.io/js/bigbullui.svg)](https://www.npmjs.com/package/bigbullui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/F0Rextasy/bigbullui/blob/main/LICENSE)
[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-success.svg)](https://github.com/F0Rextasy/bigbullui)
[![CI](https://github.com/F0Rextasy/bigbullui/actions/workflows/ci.yml/badge.svg)](https://github.com/F0Rextasy/bigbullui/actions/workflows/ci.yml)
[![publint](https://img.shields.io/badge/publint-clean-success.svg)](https://publint.dev)
[![attw](https://img.shields.io/badge/attw-type--safe-success.svg)](https://arethetypeswrong.github.io)

## Features

- **Zero 3rd-Party Dependencies** — UI files import only React plus small in-tree helpers (`cn`, `hooks`, `focus-trap`) and sibling components. No Radix or Lucide bloat.
- **Code You Own** — Run the CLI or copy source files directly into your codebase. No black-box npm lock-in.
- **Tailwind CSS v4 Native** — Driven entirely by CSS variables and `@theme inline` with warm cream paper and night stub themes.
- **Accessible by Default** — Full WAI-ARIA support, keyboard roving tabindex, focus rings, and `prefers-reduced-motion` fallbacks.
- **660 Crafted Components** — From foundational form controls and data tables to rich charts and retro interactive widgets.

## Quick Start (CLI — Recommended)

Initialize bigbullui in your project:

```bash
npx bigbullui init
```

Add any component directly to your project:

```bash
npx bigbullui add button card dialog metric-card
```

Works with the shadcn CLI too — every component is published as registry JSON:

```bash
npx shadcn@latest add https://ui.bigbullapp.com/r/button.json
# Full page blocks work too (block source + its components bundled):
npx shadcn@latest add https://ui.bigbullapp.com/r/admin-overview.json
```

Works with AI coding assistants via MCP (zero backend — runs locally):

```bash
claude mcp add bigbullui -- npx -y bigbullui mcp
```

Use immediately in your views:

```tsx
import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Get Started</Button>;
}
```

---

### Alternative: All-in-One npm Package

```bash
npm install bigbullui
```

Add the design tokens to your global CSS:

```css
@import "tailwindcss";
@import "bigbullui/css";
/* Optional: Windows High Contrast / forced-colors support */
/* @import "bigbullui/high-contrast.css"; */
```

Import and use:

```tsx
import { Button, Card, MetricCard } from "bigbullui";
```

### Companion: bigbullicons (1099 Ticket Stub stroke icons)

```bash
npm install bigbullicons
```

```tsx
import { StampIcon } from "bigbullicons";

export function Example() {
  return <StampIcon name="ticket" size={20} />;
}
```

Browse every icon with live animated previews at [ui.bigbullapp.com/icons](https://ui.bigbullapp.com/icons) — or pull a single icon into any project with `npx bigbullui add icon-ticket`.

### Manual Copy-Paste Alternative

No install needed. Copy files from [`src/components/ui/`](https://github.com/F0Rextasy/bigbullui/tree/main/src/components/ui) (plus the `cn` helper at `src/components/ui/lib/utils.ts`) into your project, copy the token CSS from [`bigbullui.css`](https://github.com/F0Rextasy/bigbullui/blob/main/bigbullui.css) — done.

## Components

<details open>
<summary><strong>Catalog Summary (660 Components)</strong> — browse full index at <a href="https://ui.bigbullapp.com/docs">ui.bigbullapp.com/docs</a></summary>

| Group | Count | Highlights |
|---|---:|---|
| **Form & Pickers** — inputs, pickers, toggles and controls | 135 | [`button`](https://ui.bigbullapp.com/docs/button), [`input`](https://ui.bigbullapp.com/docs/input), [`textarea`](https://ui.bigbullapp.com/docs/textarea), [`checkbox`](https://ui.bigbullapp.com/docs/checkbox), [`switch`](https://ui.bigbullapp.com/docs/switch), [`radio-group`](https://ui.bigbullapp.com/docs/radio-group) |
| **Ticket Stub & Display** — surfaces, badges, charts and data views | 381 | [`mention-input`](https://ui.bigbullapp.com/docs/mention-input), [`transfer-list`](https://ui.bigbullapp.com/docs/transfer-list), [`theme-toggle`](https://ui.bigbullapp.com/docs/theme-toggle), [`seat-map`](https://ui.bigbullapp.com/docs/seat-map), [`keypad`](https://ui.bigbullapp.com/docs/keypad), [`ticket-card`](https://ui.bigbullapp.com/docs/ticket-card) |
| **Feedback** — notices, alerts and status indicators | 68 | [`badge`](https://ui.bigbullapp.com/docs/badge), [`progress`](https://ui.bigbullapp.com/docs/progress), [`alert`](https://ui.bigbullapp.com/docs/alert), [`tooltip`](https://ui.bigbullapp.com/docs/tooltip), [`dialog`](https://ui.bigbullapp.com/docs/dialog), [`toast`](https://ui.bigbullapp.com/docs/toast) |
| **Navigation** — command bars, tabs, sidebars and wayfinding | 76 | [`kbd`](https://ui.bigbullapp.com/docs/kbd), [`separator`](https://ui.bigbullapp.com/docs/separator), [`section-heading`](https://ui.bigbullapp.com/docs/section-heading), [`sticky-bar`](https://ui.bigbullapp.com/docs/sticky-bar), [`resizable`](https://ui.bigbullapp.com/docs/resizable), [`scroll-area`](https://ui.bigbullapp.com/docs/scroll-area) |

Full catalog: [Component Docs](https://ui.bigbullapp.com/docs) · [Page Blocks](https://ui.bigbullapp.com/blocks) · [Icons](https://ui.bigbullapp.com/icons) · [llms-full.txt](https://ui.bigbullapp.com/llms-full.txt)
</details>

## Theming

Design tokens live in [`bigbullui.css`](https://github.com/F0Rextasy/bigbullui/blob/main/bigbullui.css). Override any `--background`, `--foreground`, `--accent` and the whole library follows. Dark mode is a single `.dark` class on `<html>`.

## Accessibility

WAI-ARIA patterns throughout: roving tabindex in Tabs and Radio groups, focus trap with Escape handling in Dialog and Sheet, `aria-checked` / `aria-expanded` live states, visible focus rings, and `prefers-reduced-motion` respected by every animation.

## Contributing

Issues and pull requests are welcome. Please keep components dependency-free (`react` + `./lib/utils` only), typed, keyboard accessible, and documented with a docs page entry.

## License

MIT © 2026 F0Rextasy. See [LICENSE](https://github.com/F0Rextasy/bigbullui/blob/main/LICENSE).

## Links

- Documentation: https://ui.bigbullapp.com
- npm: https://www.npmjs.com/package/bigbullui
- Issues: https://github.com/F0Rextasy/bigbullui/issues
