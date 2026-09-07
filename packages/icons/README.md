# bigbullicons

Hand-drawn Ticket Stub stroke icons. Zero dependencies, MIT licensed.

```bash
npm install bigbullicons
```

```tsx
import { StampIcon } from "bigbullicons";

export function Example() {
  return <StampIcon name="ticket" size={20} />;
}
```

24 original icons: home, components, blocks, showcase, install, design, agents, contribute, dashboard, app, auth, system, marketing, content, operations, storefront, service, pages, theme, ticket, stub, perforation, stamp, gate.

Props: `name`, `size` (default 20), `animated` (stroke draw-in, default true, respects `prefers-reduced-motion`).
