# Contributing to bigbullui

Thanks for helping improve [bigbullui](https://bigbullui.vercel.app). This project is an open-source React + Tailwind CSS v4 component library. Everyone can contribute: plugins, components, docs, bug reports.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## Ways to contribute

- Report bugs or suggest components via [GitHub Issues](https://github.com/F0Rextasy/bigbullui/issues)
- Fix bugs or improve docs with a pull request
- Add new components (see below)
- Improve accessibility, performance, or copy on existing components
- Update agent reference docs when adding components (see below)

## Agent kit (AI assistants)

Reference files for coding agents live in the repo root:

| File | Purpose |
|---|---|
| `SKILL.md` | Install paths, component rules, theming |
| `DESIGN.md` | Full design system (tokens, type, motion) |
| `AGENTS.md` | Repo conventions, verification commands |

When you add a component, keep these files accurate. The rule set is short: dependency-free imports, typed props, keyboard accessible, documented.

## Local development

Requirements: **Node.js 20+**, **npm**

```bash
git clone https://github.com/F0Rextasy/bigbullui.git
cd bigbullui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful commands

```bash
npm run dev        # start docs site
npm run build      # production build of the docs site
npm run build:lib  # build the npm package (tsup ESM+CJS+d.ts into dist/)
npm run lint       # eslint
npx tsc --noEmit   # TypeScript check (must be clean)
```

## Adding a component

1. Create your file under `src/components/ui/` (e.g. `src/components/ui/my-widget.tsx`).
   Import ONLY `react` and `./lib/utils` — no motion, radix, lucide, cva, or any other package. This rule is absolute.
2. Follow the Ticket Stub language: mono uppercase micro labels, dashed borders, squarish radius, stamp-red emphasis, `focus-visible:ring-2` on everything interactive, `motion-reduce` fallbacks on animations.
3. Export the component plus its props type, add it to `src/index.ts` (barrel).
4. Register it in `src/lib/registry-site.ts` (name, title, one-line description, category).
5. Add a live preview in `src/components/site/component-preview.tsx`, a usage snippet and props rows in `app/docs/[slug]/page.tsx`.
6. Run `npx tsc --noEmit` and `npm run build` — both must pass before opening a PR.

## Pull request guidelines

- Keep changes focused — one component or one fix per PR when possible
- Match existing code style (TypeScript, Tailwind, `cn()` helper)
- Use `"use client"` only when the component needs client features
- Write English UI copy, no raw apostrophes in JSX text
- Do not commit secrets, lockfiles for other managers, or editor configs
- Never publish to npm from a PR — releases are cut by maintainers
- New components must ship with usage snippet + props rows, or the props-coverage floor check fails the build

## Content direction

- The Ticket Stub look (cream paper, ink, stamp red, dashed borders, mono micro labels) is a general design language — spread it to everyday surfaces (dashboards, forms, marketing), not arcade or gambling themes.
- Do not propose new casino, betting, lottery, or slot-machine components. Existing ones stay for compatibility, but nothing new in that lane.

## Concurrent editing protocol

Multiple agents or humans may edit this tree at the same time. Shared files are append-only coordination points:

- Shared files: `src/index.ts`, `src/lib/registry-site.ts`, `src/components/site/component-preview.tsx`, wave preview files, `README.md`, `bin/cli.js`.
- Always `git pull --rebase` before pushing. If a rebase touches a shared file you also edited, re-append your entries at the tail — never resolve by accepting only one side.
- Append new entries; never reformat or reorder unrelated lines in shared files.
- Before editing a shared file, check `git status` and recent `git log` for in-flight work on the same region.
- Run `node --test tests/integrity.test.mjs` after touching shared files — it catches lost barrel, registry, and preview entries immediately.

## Project structure

| Path | Purpose |
|---|---|
| `src/components/ui/` | Copy-paste components (the library itself) |
| `src/components/site/` | Docs-site-only components (previews, nav, search) |
| `src/lib/registry-site.ts` | Component metadata (single source of truth) |
| `src/index.ts` | npm package barrel exports |
| `bigbullui.css` | Design tokens (`:root` + `.dark`, `@theme inline`, keyframes) |
| `app/` | Docs site (landing, `/docs`, component pages) |
| `SKILL.md` / `DESIGN.md` / `AGENTS.md` | Agent kit |

## Questions

Open a [GitHub Issue](https://github.com/F0Rextasy/bigbullui/issues) — bugs, ideas, and component requests are all welcome.

## Deprecation policy

- Registry entries carry an optional `status`: `stable` (default), `experimental`, or `deprecated`.
- `experimental` means the API may still change; use freely, pin versions if it matters.
- `deprecated` means: do not use in new code. The entry stays for two minor versions with a migration note in `src/data/changelog.json`, then it is removed (barrel, registry, preview, props docs go together).
- Never remove a component in a patch release.
