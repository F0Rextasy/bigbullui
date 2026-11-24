# Changelog

## 1.4.1

- Shipped server-safe static named icon exports alongside client-marked `bigbullicons/dynamic` (`StampIcon`) in minified ESM/CJS bundles.
- Hardened dynamic icon lookup (`Object.hasOwn`), SSR/JSDOM `window.matchMedia`, and SVG `getTotalLength()` fallback handling.

## 1.4.0

- Marked static named icon exports server-safe for React Server Components while keeping `bigbullicons/dynamic` (`StampIcon`) client-marked.
- Added prototype-safe lookup (`Object.hasOwn`), JSDOM `window.matchMedia`, and Firefox SVG `getTotalLength()` guards.
- Enabled bundle minification in `tsup` and aligned `engines.node` to `>=20`.
