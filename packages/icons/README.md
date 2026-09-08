# bigbullicons

Hand-drawn Ticket Stub stroke icons. Zero dependencies, MIT licensed.

## Install

```bash
npm install bigbullicons
```

## Use

```tsx
import { StampIcon } from "bigbullicons";

export function Example() {
  return <StampIcon name="ticket" size={20} />;
}
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | union of 1023 names | required | Icon to render |
| `size` | number | 20 | Width and height in px |
| `animated` | boolean | true | Master switch for motion |
| `animation` | `"draw" \| "pulse" \| "spin" \| "none"` | `"draw"` | Motion character; every icon supports animated and static rendering. Honors `prefers-reduced-motion`. |

## Catalog (1023 icons)

| Category | Icons | Examples |
|---|---|---|
| Essentials | 24 | `ticket`, `stamp`, `gate`, `stub`, `perforation` |
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
