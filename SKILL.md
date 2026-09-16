---
name: bigbullui
description: Build and customize React interfaces with the independent bigbullui component library and Tailwind CSS v4. Use when installing bigbullui, choosing components, applying Ticket Stub design tokens, or preserving accessible interaction and dark mode in bigbullui projects.
license: MIT
---

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

Browse https://ui.bigbullapp.com/docs for the component catalog. Read the chosen component's Props and Usage sections before writing code; do not invent exports or props. In a library checkout, `src/lib/registry-site.ts` is the catalog source. These repository paths are not files installed with this skill.

## Rules for generated code

- Dark mode: toggle the `dark` class on `<html>`; tokens switch automatically.
- Ticket Stub language: mono uppercase micro labels, dashed borders, squarish radius, stamp-red (`--color-accent-strong`) emphasis.
- Accessibility is built in: WAI-ARIA roles, roving tabindex in Tabs/RadioGroup, focus trap + Esc in Dialog, `aria-checked`/`aria-expanded` states, `prefers-reduced-motion` respected. Preserve these attributes when customizing.
- Fully typed props; check the Props table on each docs page.

## Workflow

1. Inspect the application's framework, React version, Tailwind version and existing global CSS. Use the project's existing package manager; do not replace its configuration or upgrade dependencies without approval.
2. Prefer the npm installation above for package consumers. Use copy-paste only when the user wants to own local component source; retrieve it from the library repository or component documentation, not from this skill directory.
3. Choose the smallest set of components needed. Check their documented exports and props, then add semantic-token styling that fits the existing page.
4. If this is a React Server Components application, place event handlers and state in a client component. Do not mark unrelated server modules as client components.
5. Run the application's type checker and build. Exercise the changed UI in light and dark mode, keyboard focus and reduced-motion mode. Report any verification you cannot perform.

## License

MIT © 2026 bigbullui. Copy the code, own it — no attribution required.
