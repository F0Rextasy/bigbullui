<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# bigbullui conventions

Open-source React 19 + Tailwind CSS 4 component library. Components import only `react` + `./lib/utils`. MIT licensed.
Agent kit: `SKILL.md` (usage), `DESIGN.md` (design system), `CONTRIBUTING.md` (how to add components).

## Hard rules
- `src/components/ui/*` files may import ONLY `react` and `./lib/utils`. Verify: grep for `from "` in that dir — nothing else may appear. No motion, radix, lucide, cva, clsx, tailwind-merge, next-themes, shiki in component sources.
- Never use `as any`, `@ts-ignore`, `@ts-expect-error`.
- No raw apostrophes in JSX text (ESLint react/no-unescaped-entities fails the build).
- Never commit, push, or publish (npm) without an explicit user request.
- Commit titles are ALWAYS in English, past tense ("Added X", "Fixed Y"); never imperative, never Turkish.
- Design tokens live in `bigbullui.css` (`:root` + `.dark`, `@theme inline`, keyframes). The docs site consumes them via `app/globals.css` import. Components use ONLY semantic Tailwind tokens (bg-primary, text-muted-foreground, border-border...) — no hard-coded hex in component sources.

## Identity (Ticket Stub)
- Light: cream paper `#F6F0E0`, ink `#17130C`, stamp red `#BC3A28`. Dark ("night stub"): `#16120B` bg, cream `#F3EAD3` text, `#E0573D` ring.
- Language: mono uppercase micro labels, dashed borders (border-2 border-dashed), squarish radius, double-frame surfaces (solid outer border + inner dashed outline), stamp-red emphasis, focus-visible:ring-2 ring-ring everywhere interactive, motion-reduce fallbacks.

## Verify
- `npx tsc --noEmit` (must be clean)
- `npm run build` (docs site, static export of all routes)
- `npm run build:lib` (tsup ESM+CJS+d.ts into dist/)

## Agent skills

### Issue tracker

GitHub Issues in `F0Rextasy/bigbullui`, via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `.agents/skills/antislop/SKILL.md` (core) and then the skill for the task:
- UI / visual: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `.agents/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later, run `npx skills@latest update -p`.
<!-- antislop:end -->
