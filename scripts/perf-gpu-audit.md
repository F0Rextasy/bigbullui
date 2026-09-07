# Perf GPU audit note

Run `node scripts/calc-sizes.mjs` to flag ui files over the 12kb budget.

## GPU-heavy classes to avoid in component sources

- `animate-ping`, `animate-pulse`, `animate-spin`, `animate-bounce` on large surfaces: keep to small dots and badges only.
- `blur-*`, `backdrop-blur-*`: never on full-page overlays; prefer solid `bg-black/40` scrims.
- `shadow-lg`, `shadow-2xs`: fine on cards; avoid animating box-shadow (triggers paint).
- `transition-all`: prefer `transition-colors` or `transition-transform` so only compositor properties animate.
- Always pair animations with `motion-reduce:transition-none` and `motion-reduce:animate-none` fallbacks.

## Skeleton min-h rule

Every skeleton and loading placeholder must set an explicit `min-h-*` class (for example `min-h-24`)
matching the content it replaces, so async swaps never shift layout.
