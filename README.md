# PI Superpowers

A model-agnostic structured development workflow for [PI](https://pi.dev/) and other coding agents. Ported from [obra/superpowers](https://github.com/obra/superpowers) by Jesse Vincent.

## What It Does

Superpowers enforces a disciplined workflow: **brainstorm → plan → execute → review → verify**. Instead of jumping from task to code, your agent steps back, asks what you're really trying to do, creates a detailed plan, then executes it with verification at every step.

Works with **all models** — not just Claude. The skills use generic tool references (read, bash, subagent, edit, write) that work across PI, Claude Code, Cursor, Codex, and OpenCode.

## Installation

### As a PI package (recommended — single install, auto-triggers)

```bash
pi install git:github.com/cdias900/pi-superpowers
```

This installs the extension (auto-triggers on every conversation) and all 14 skills.

### As individual skills (manual)

Copy the skill directories from `skills/` into your agent's skills directory (e.g. `~/.pi/agent/skills/`, `~/.claude/skills/`, or `~/.agents/skills/`).

## Skills Included

| Skill | Purpose |
|---|---|
| `superpowers` | Master orchestrator — decides which workflow to use |
| `superpowers-brainstorming` | Socratic design refinement before implementation |
| `superpowers-writing-plans` | Break specs into bite-sized TDD tasks |
| `superpowers-subagent-dev` | Fresh subagent per task + 2-stage review |
| `superpowers-executing-plans` | Sequential plan execution (no-subagent fallback) |
| `superpowers-tdd` | RED-GREEN-REFACTOR with Iron Law enforcement |
| `superpowers-debugging` | 4-phase systematic root cause analysis |
| `superpowers-verify` | Evidence-before-claims gate |
| `superpowers-parallel-agents` | Dispatch independent tasks concurrently |
| `superpowers-code-review` | Reviewer subagent dispatch |
| `superpowers-receiving-review` | Technical evaluation of feedback |
| `superpowers-git-worktrees` | Isolated workspace setup |
| `superpowers-finish-branch` | Branch completion workflow |
| `superpowers-writing-skills` | TDD for skill documentation |

## The Workflow

1. **Brainstorming** — Explores your idea through questions, proposes 2-3 approaches, presents design in sections for approval
2. **Writing Plans** — Turns approved designs into granular TDD tasks with exact file paths, code, and verification steps
3. **Execution** — Dispatches fresh subagents per task (or executes sequentially), with spec compliance and code quality review after each
4. **Verification** — Enforces "evidence before claims" — no success without running the actual commands

## Auto-Triggering

When installed as a PI package, the extension injects superpowers orchestrator instructions into every conversation automatically. The agent checks for relevant skills before taking action — no manual invocation needed.

You can still use skills directly: `/skill:superpowers-brainstorming`, `/skill:superpowers-debugging`, etc.

## Backward Compatibility

If you have existing docs referencing `superpowers:brainstorming` or `superpowers:executing-plans` (Claude Code format), the orchestrator includes a mapping table so agents translate them automatically.

## Credits

Based on [Superpowers](https://github.com/obra/superpowers) by Jesse Vincent ([@obra](https://github.com/obra)). Licensed under MIT.

This is a community port — not affiliated with or endorsed by the original project.
