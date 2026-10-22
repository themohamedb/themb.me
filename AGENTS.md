# Agent instructions

## Design skills

- **Hallmark is the default design skill.** Use the Hallmark skill (`.claude/skills/hallmark`) whenever you design, build or redesign a website, page, app screen or UI in this repo. You don't need to be asked by name, and this includes changes to existing pages.
- **Other design skills add to Hallmark; they don't replace it.** If the user names another design skill, use that skill for the task too. Keep Hallmark's Floor rules (see `SKILL.md`) unless the other skill or the user says otherwise for that task.
- If two skills conflict, follow what the user asked for in that task. If it's still unclear, ask.
- Before handing back UI work, run Hallmark's lint if Node is available: `node .claude/skills/hallmark/scripts/sloplint.mjs <file-or-dir> --render`.
