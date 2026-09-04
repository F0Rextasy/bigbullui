<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# bigbullui conventions

Zero-dependency React 19 + Tailwind CSS 4 component library with Ticket Stub identity. MIT licensed.

## Hard rules
- `src/components/ui/*` files may import ONLY `react` and `./lib/utils`. Verify: grep for `from "` in that dir — nothing else may appear. No motion, radix, lucide, cva, clsx, tailwind-merge, next-themes, shiki in component sources.
- Never use `as any`, `@ts-ignore`, `@ts-expect-error`.
- No raw apostrophes in JSX text (ESLint react/no-unescaped-entities fails the build).
- Never commit, push, or publish (npm) without an explicit user request.
- Design tokens live in `bigbullui.css` (`:root` + `.dark`, `@theme inline`, keyframes). The docs site consumes them via `app/globals.css` import. Components use ONLY semantic Tailwind tokens (bg-primary, text-muted-foreground, border-border...) — no hard-coded hex in component sources.

## Identity (Ticket Stub)
- Light: cream paper `#F6F0E0`, ink `#17130C`, stamp red `#BC3A28`. Dark ("night stub"): `#16120B` bg, cream `#F3EAD3` text, `#E0573D` ring.
- Language: mono uppercase micro labels, dashed borders (border-2 border-dashed), squarish radius, double-frame surfaces (solid outer border + inner dashed outline), stamp-red emphasis, focus-visible:ring-2 ring-ring everywhere interactive, motion-reduce fallbacks.

## Verify
- `npx tsc --noEmit` (must be clean)
- `npm run build` (docs site, static export of all routes)
- `npm run build:lib` (tsup ESM+CJS+d.ts into dist/)
