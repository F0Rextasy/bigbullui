# bigbullicons

Hand-drawn Ticket Stub stroke icons. Zero dependencies, MIT licensed.

## Install

```bash
npm install bigbullicons
```

## Use

```tsx
import { TicketIcon } from "bigbullicons";

export function Example() {
  return <TicketIcon size={20} />;
}
```

Or load icons dynamically by string name via `bigbullicons/dynamic`:

```tsx
import { StampIcon } from "bigbullicons/dynamic";

export function DynamicExample({ name }: { name: "ticket" | "stamp" }) {
  return <StampIcon name={name} size={20} />;
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | number | 20 | Width and height in px |
| `animated` | boolean | true | Master switch for motion (named icons render statically unless animated on `StampIcon`) |
| `animation` | `"draw" \| "pulse" \| "spin" \| "none"` | `"draw"` | Motion character on `StampIcon`; honors `prefers-reduced-motion`. |
| `name` (`StampIcon` only) | union of 1099 names | required | Icon to render dynamically by string name |

## Catalog (1099 icons)

| Category | Icons | Examples |
|---|---|---|
| Essentials | 100 | `ticket`, `stamp`, `gate`, `stub`, `perforation` |
| Arrows & Direction | 200 | `arrow-up`, `chevron-down`, `undo`, `expand` |
| Media & Playback | 200 | `play`, `pause`, `volume-high`, `microphone` |
| Files & Office | 200 | `file-text`, `folder`, `printer`, `lock` |
| Commerce & Shopping | 199 | `cart`, `price-tag`, `receipt`, `wallet` |
| Weather & Nature | 200 | `sun`, `cloud-rain`, `mountain`, `tree` |

Browse and copy every icon with live animated previews at [ui.bigbullapp.com/icons](https://ui.bigbullapp.com/icons). Each icon also has its own page (`/icons/<name>`) with Draw / Pulse / Spin / Static switcher, replay, and install snippet — or pull a single icon into any project:

```bash
npx bigbullui add icon-ticket
```

## License

MIT © 2026 F0Rextasy. All paths hand-drawn for this package.
