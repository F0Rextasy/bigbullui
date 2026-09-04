# bigbullui

Animated React components you own. No shadcn, no MUI, no Radix underneath —
just React, Tailwind, and SVG.

## Install

```bash
npm install bigbullui
```

Add the design tokens to your CSS (Tailwind CSS v4 required):

```css
@import "tailwindcss";
@import "bigbullui/css";
```

## Use

```tsx
import { CometButton, Dialog, DialogHeader, DialogTitle } from "bigbullui";

export function Example() {
  return <CometButton variant="accent">Get started</CometButton>;
}
```

## Components

| Component | Import |
|---|---|
| Button | `import { Button } from "bigbullui"` |
| Input | `import { Input } from "bigbullui"` |
| Card | `import { Card, ... } from "bigbullui"` |
| Badge | `import { Badge } from "bigbullui"` |
| Accordion | `import { Accordion, ... } from "bigbullui"` |
| Dialog | `import { Dialog, ... } from "bigbullui"` |
| Tabs | `import { Tabs, ... } from "bigbullui"` |
| Tooltip | `import { Tooltip } from "bigbullui"` |
| Comet Button | `import { CometButton } from "bigbullui"` |

Dark mode: toggle the `dark` class on `<html>` — tokens switch automatically.
Respects `prefers-reduced-motion` out of the box.

## Copy-paste

Prefer owning the source? Every component is a single self-contained file
(only `react` + a tiny `cn` helper). Copy any file from
`src/components/ui/` into your project — no install needed.

## License

MIT © 2026 bigbullui
