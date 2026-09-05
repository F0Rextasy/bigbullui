# bigbullui skill

Use bigbullui components in any React + Tailwind CSS v4 project. Open source, MIT licensed.

## Install (npm)

```bash
npm install bigbullui
```

Add the design tokens to your CSS:

```css
@import "tailwindcss";
@import "bigbullui/css";
```

Use any component:

```tsx
import { Button, Dialog, DialogHeader, DialogTitle } from "bigbullui";

export function Example() {
  return <Button>Admit one</Button>;
}
```

## Install (copy-paste)

No install needed. Copy files from `src/components/ui/` (plus the `cn` helper at `src/components/ui/lib/utils.ts`) into your project, keeping the structure. Copy the token CSS from `bigbullui.css` (`:root`, `.dark`, `@theme inline`, `@keyframes`) into your stylesheet.

## Components

Full catalog lives in `src/lib/registry-site.ts` (source of truth) and on the docs site, grouped across 9 categories (Ticket Stub & Retro, Core Form & Inputs, Pickers & Selectors, Charts & Visualization, Data Display & Tables, Feedback & Overlays, Navigation & Menus, Editors & DevTools, Media & Interactive) — 460+ self-contained components (imports only `react` + `./lib/utils`).

## Rules for generated code

- Dark mode: toggle the `dark` class on `<html>`; tokens switch automatically.
- Ticket Stub language: mono uppercase micro labels, dashed borders, squarish radius, stamp-red (`--color-accent-strong`) emphasis.
- Accessibility is built in: WAI-ARIA roles, roving tabindex in Tabs/RadioGroup, focus trap + Esc in Dialog, `aria-checked`/`aria-expanded` states, `prefers-reduced-motion` respected. Preserve these attributes when customizing.
- Fully typed props; check the Props table on each docs page.

## License

MIT © 2026 bigbullui. Copy the code, own it — no attribution required.
