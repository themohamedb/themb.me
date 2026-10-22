# Agent instructions

## Design skills

- **Hallmark is the default design skill.** Use the Hallmark skill (`.claude/skills/hallmark`) whenever you design, build or redesign a website, page, app screen or UI in this repo. You don't need to be asked by name, and this includes changes to existing pages.
- **Other design skills add to Hallmark; they don't replace it.** If the user names another design skill, use that skill for the task too. Keep Hallmark's Floor rules (see `SKILL.md`) unless the other skill or the user says otherwise for that task.
- If two skills conflict, follow what the user asked for in that task. If it's still unclear, ask.
- Before handing back UI work, run Hallmark's lint if Node is available: `node .claude/skills/hallmark/scripts/sloplint.mjs <file-or-dir> --render`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
