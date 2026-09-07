# bigbullui rules for AI editors

Copy this file into your project as `AGENTS.md` or link it from your editor config
so generated components match the bigbullui Ticket Stub system.

## Hard rules

- `src/components/ui/*` files may import ONLY `react` and `./lib/utils`.
- Never use `as any`, `@ts-ignore`, or `@ts-expect-error`.
- No raw apostrophes in JSX text.
- Design tokens live in `bigbullui.css` (`:root` + `.dark`). Components use ONLY
  semantic Tailwind tokens (`bg-primary`, `text-muted-foreground`, `border-border`).
- Never hard-code hex colors in component sources.

## Ticket Stub identity

- Light paper `#F6F0E0`, ink `#17130C`, stamp red `#BC3A28`.
- Mono uppercase micro labels, dashed borders, squarish radius.
- Double-frame surfaces: solid outer border plus inner dashed outline.
- `focus-visible:ring-2 ring-ring` on everything interactive.
- `motion-reduce` fallbacks on every animation.

## Verify

- `npx tsc --noEmit` must be clean.
- New components need registry, index, and preview wiring.
- Demo text in English.
