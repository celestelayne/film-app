# About

A local-only, read-only film watchlist built with React, Vite, and TypeScript.

One person can browse, search, filter, sort, select, and switch between grid and list views.

No accounts, server, database, external API, or film editing.

Build the application incrementally through vertical slices. Each slice introduces one complete user capability without implementing future slices prematurely.

## Slices (build in this order, one at a time)

Each slice introduces one user capability and builds on the previous slice. Do not implement behavior belonging to a future slice.

| Order| Slice         | Capability      | State Ownership |
| :--- | :------------ | :-------------- | :-------------- |
| 1    | films-list  | Render all films from local data in a responsive grid, including missing-data and empty states as a read-only list.     | Statis local data |
| 2    | search-films  | Search by film title. Introduce view-rules.ts and a pure title-matching predicate.      | URL?q= |
| 3    | filter-films  | Filter by genre and combine filtering with the existing search.      | URL?genre= |
| 4    | sort-films  | Sort films predictably without mutating the source dataset.      | URL?sort= |
| 5    | grid-list-toggle  | Switch between grid and list views without changing the visible results. Remember the choice across visits.      | browser storage |
| 6    | select-film  | Select a film to inspect its details in a modal or drawer, without navigating to another route.      | React component state |

Each slice lives in `docs/slices/<name>/` as:
- `intent.md` — User job, problem, and scope, 
- `spec.md` - Observable behavior, acceptance criteria, states, and edge cases, 
- `plan.md` - Implementation approach, affected files, and verification. 

New slices are drafted with the `new-slice` skill, which uses `.claude/skills/new-slice/contract-template.md`.

Before implementing a slice:
1. Read the slice's its intent.md, spec.md, and plan.md.
2. Confirm the slice is approved and its prerequisites exist.
3. Implement only the approved scope.
4. Verify the slice against its specification.
5. Complete review before beginning the next slice.

If code and spec disagree, stop and ask. Never silently reinterpret the specification or build ahead.

## Slice Loop

Repeat for every slice:
```
Define → Specify → Plan → Approve → Implement → Verify → Review → Merge → Repeat
```

1. Use the new-slice skill to draft `intent.md`, `spec.md`, and `plan.md` in `docs/slices/<name>/`. The skill uses `.claude/skills/new-slice/contract-template.md`.
2. Review and approve the specification and plan before implementation.
3. Create a feature branch.
4. Implement only the approved slice.
5. Run automated checks and inspect the interface.
6. Review the result against the specification.
7. Open a pull request and complete required checks.
8. Merge after approval, then begin the next slice after the current one is complete.

Do not treat a passing test suite as proof that the interface meets its specification.

## Commands

```bash
npm run lint
npm run typecheck
npm run test
npm run dev
```
If any script does not exist, report that fact. Do not silently add a new tool or dependency in order to make it exist.

## Where things live

```text
template-react-vite/
├── AGENTS.md
├── CLAUDE.md
├── docs/
│   └── slices/
│       └── <name>/             # intent, spec, plan for each slice
│           ├── intent.md
│           ├── spec.md
│           └── plan.md
├── .claude/                    # Claude settings and skills
│   ├── settings.json           # permissions and config (commit)
│   └── skills/
│       └── new-slice/
│           ├── SKILL.md
│           └── contract-template.md
└── src/
    ├── main.tsx
    ├── App.tsx                 # near-empty shell
    ├── index.css               # theme tokens (@theme block)
    └── features/               # created by the first slice
        └── films/
            ├── data/
            │   └── films.ts
            ├── components/
            ├── types.ts
            └── view-rules.ts   # pure search/filter/sort (born with the first slice that needs it)
```

This is the intended structure as the application evolves, not a requirement to create every file immediately.
- `App.tsx` remains a thin application shell.
- `films.ts` contains the local source dataset.
- `types.ts` defines film data contracts.
- `components/` contains film-specific presentation and interaction components.
- `view-rules.ts` contains pure search, filter, and sort functions once those capabilities are introduced.

Create files and abstractions only when a slice needs them.

## Architecture guardrails
1. **One source dataset.** The local film collection is the source of truth. Never store a separately synchronized filtered or sorted copy
2. **Derived visible films.** Calculate visible films from the source collection and current choices. As capabilities are added, apply rules in this order: search → filter → sort.
3. **Pure view rules.** Keep search, filter, and sort functions pure and outside React components. Introduce view-rules.ts with the first slice that needs it.
4. **Explicit state ownership.**
  - Search, filter, and sort choices live in URL query parameters once introduced.
  - Film selection lives in React component state.
  - Grid/list preference lives in browser storage, introduced by the `grid-list-toggle` slice.
  - Do not introduce URL or storage infrastructure before the corresponding slice.
5. **Validate external boundaries.** Validate local starter data at its loading boundary and validate URL and browser-storage values when those features are introduced. Invalid values fall back to safe defaults rather than crashing the interface.
6. **No premature abstractions.** Prefer straightforward components and functions. Extract reusable abstractions only after genuine repetition or a clear architectural need.
7. **Use theme tokens.** Use established theme tokens for colors, spacing, typography, radii, and other shared visual values. Do not introduce arbitrary styling values without justification.
8. **Accessible interactions.** Keyboard interaction works, focus is visible, and changes to result counts are announced appropriately when search or filtering is introduced.
9. **No unnecessary dependencies.** Use React, browser APIs, and existing project tooling unless a new dependency solves a demonstrated problem and is approved.
10. **Read-only means read-only.** Do not implement adding, editing, deleting, or otherwise changing film records.

## Interface quality
Every slice must meet the applicable criteria before it is considered done:
1. Contrast is at least WCAG AA (4.5:1 body text, 3:1 UI and large text).
2. Every interactive element is reachable by keyboard with a visible focus ring.
3. Hit targets are at least 44×44 CSS pixels on touch.
4. Motion respects `prefers-reduced-motion` and defaults to a single duration + easing.
5. Empty, loading, and error states are designed, not accidents.
6. Layout works from 320px up. No horizontal scroll on mobile.
7. Color is never the only signal (pair with icon, text, or shape).

## Verifying your work
Before declaring that a task is done:
1. Run typecheck, test and lint. Report the actual command results and relevant output. Never claim a check passed unless it ran successfully.
2. Open the application and inspect the changed interface at mobile and desktop widths, in every view implemented so far.
3. Verify keyboard interaction and visible focus behavior.
4. Walk through every item in the slice specification's **Done means** section and explain how it was checked.
5. Test relevant edge cases, including empty data, missing metadata, invalid URL values, or invalid stored preferences when applicable.
6. Check that existing completed slices still behave correctly.
7. Report any checks that could not be run, including the reason.

## Never
- Read `.env` files or expose secrets.
- Edit or weaken a test solely to make it pass.
- Add a library without asking
- Add accounts, a server,  or external API.
- Add ways to create, edit, or delete films.
- Implement future slices before approval.
- Change another slice's behavior without identifying the impact and obtaining approval.
- Introduce a global state library for state that React can manage locally.
- Claim that unrun tests or manual checks passed.

## When Claude gets something wrong twice

When the same correction comes up twice in review, add a dated rule below using:

```
YYYY-MM-DD — rule
```

Only add rules supported by repeated, observed problems. Avoid turning one-off preferences into permanent architecture constraints.

The guardrails above describe established project decisions. This section is where new rules earn their place.

### Learned rules

<!-- Add dated rules here as repeated issues are identified. -->