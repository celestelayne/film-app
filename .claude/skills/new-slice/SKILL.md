---
name: new-slice
description: Draft the contract for a new slice — intent, spec, plan — before any code is written. Use when the user wants to start, scope, or plan a new slice of the film app. Reads AGENTS.md and existing slice specs to flag shared-file coupling. Writes no source code.
---

# new-slice

Produce the contract that governs a slice. The output is three files under `docs/slices/<name>/`. No code.

## When to trigger

The user asks to start, scope, or plan a new slice. Phrases like "new slice for search", "let's spec filter", "plan the detail view".

## Steps

1. Read `AGENTS.md` for project rules.
2. List existing slices by reading every `docs/slices/*/spec.md`. If `docs/slices/` does not exist, this is the first slice.
3. Agree on a short kebab-case slice name with the user (e.g. `search`, `grid-list-toggle`). Confirm the name before writing anything.
4. Create `docs/slices/<name>/` and split `.claude/skills/new-slice/contract-template.md` into `intent.md`, `spec.md`, `plan.md`.
5. Fill each section from the user's description. For anything you don't know, write a bullet under that file's "Open questions" rather than guessing.
6. In `plan.md` under "Shared-file changes", list every file outside `docs/slices/<name>/` the slice will touch, and cross-reference any existing slice that also touches those files.
7. Stop. Hand back to the user for review.

## Boundaries

- No source code, no tests, no dependency changes.
- Do not edit `AGENTS.md`, other slices, or anything under `src/`.
- If the slice needs a new library, add it as an open question — don't install it.
- If the user asks you to also implement, decline and point them at the finished contract for a separate build step.

## Done

The three files exist, every section has either an answer or an "Open question" bullet, and the user has signed off.
