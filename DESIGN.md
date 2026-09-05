# bigbullui design system

Ticket Stub identity: interfaces that feel like well-printed admission tickets — warm paper, ink lines, stamp-red marks. Light theme is a cream stub; dark theme is a night stub, not an inverted copy.

## Tokens

All tokens live in `bigbullui.css` as CSS variables (`:root` + `.dark`), mapped to Tailwind utilities via `@theme inline`. Components must use ONLY semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`) — never hard-coded hex in component sources.

| Role | Light | Dark |
|---|---|---|
| Background | `#F6F0E0` cream paper | `#16120B` night stub |
| Foreground | `#17130C` ink | `#F3EAD3` cream text |
| Accent | `#BC3A28` stamp red | `#E0573D` bright stamp |
| Borders | warm tan, often dashed | warm charcoal, often dashed |

## Typography

- **Sans:** Inter Tight. Headings weight 600 with tight tracking (H1 ≈ `-0.04em`, line-height ≈ `0.96`).
- **Mono:** JetBrains Mono. Micro labels, codes, readouts, eyebrows.
- **Voice:** mono uppercase micro labels (`text-[11px] uppercase tracking-[0.15em]`), sentence-case body text, English UI copy.

## Motion

Small, tactile, spring-eased transitions (`hover:scale-[1.02]`, `active:scale-[0.97]`, 150–300ms). Entrance keyframes (`fade-in-up`, `fade-in`, `scale-in`) live in `bigbullui.css`. Every animation has a `motion-reduce` fallback that disables it.

## Dark mode

Class strategy: `.dark` on `<html>`, wired with Tailwind `@custom-variant dark`. The docs site toggles it with a tiny localStorage-backed provider plus a head inline script against flash-of-wrong-theme. Never use `prefers-color-scheme` media queries for theming.

## Component anatomy

- One file per component under `src/components/ui/`, self-contained.
- `React.forwardRef` for focusable elements, `displayName` set.
- Variants as plain `Record` maps (no cva package), merged with the local `cn()` helper.
- WAI-ARIA patterns: roles, `aria-checked` / `aria-expanded` / `aria-selected`, roving tabindex where applicable, focus trap + Escape in dialogs, visible focus rings everywhere.
- Borders do thematic work: `border-2 border-dashed` edges, double frames (solid outer + inner dashed outline) on surfaces like cards and dialogs.

## Do / Do not

- Do keep every component usable in both themes without prop changes.
- Do keep copy short, uppercase only for micro labels.
- Do not add runtime dependencies — React + Tailwind + inline SVG only.
- Do not use emoji in UI chrome.
