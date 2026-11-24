# Changelog

## 1.4.0

- Marked static named icon exports server-safe for React Server Components while keeping `bigbullicons/dynamic` (`StampIcon`) client-marked.
- Added prototype-safe lookup (`Object.hasOwn`), JSDOM `window.matchMedia`, and Firefox SVG `getTotalLength()` guards.
- Enabled bundle minification in `tsup` and aligned `engines.node` to `>=20`.
