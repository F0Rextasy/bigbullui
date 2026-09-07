# RTL logical classes audit

Prefer logical properties over physical ones so ticket layouts mirror correctly in RTL locales.

## Replace

- `ml-*` / `mr-*` with `ms-*` / `me-*`
- `pl-*` / `pr-*` with `ps-*` / `pe-*`
- `text-left` / `text-right` with `text-start` / `text-end`
- `left-*` / `right-*` with `start-*` / `end-*`
- `border-l` / `border-r` with `border-s` / `border-e`
- `rounded-l-*` / `rounded-r-*` with `rounded-s-*` / `rounded-e-*`

## Keep physical only for

- Barcode stripes, perforation edges, and stamp rotations that must stay fixed regardless of direction.
- Media transport icons (prev/next) that map to playback order, not reading order.

## Verification

Search `src/components/ui` for `ml-|mr-|pl-|pr-|text-left|text-right|left-|right-` and convert matches
that affect reading order. Ticket serials and codes stay LTR via `dir="ltr"`.
