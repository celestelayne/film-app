# React / Vite Slice Starter

A starter for building a small, local-only React apps, built one vertical slice at a time, with AI-assisted development.

## What This Starter Is For
Use this starter when building applications that need:

**Reference application:** TBD

**What you'll learn:**
- **Vertical slice delivery.** Ship one user capability at a time, each with a written contract (`intent`, `spec`, `plan`) before any code.
- **Feature-first folders, thin shell.** `src/features/<domain>/` owns its types, data, components, and view rules; `App.tsx` stays small.
- **Pure view rules + derived visible lists.** Search / filter / sort live as pure functions in one file. The visible list is derived from a single source dataset plus the current choices — never a stored filtered copy.
- **AI-assisted development with guardrails.** `AGENTS.md` and the `new-slice` skill keep Claude Code inside the project's rules — specs before code, no scope creep.
- **State placement by lifespan.** URL for shareable choices (search, filter, sort), browser storage for preferences (grid/list), component state for transient UI (selection).
- **An interface quality bar every slice meets.** Keyboard-reachable, visible focus, 44×44 hit targets, respects `prefers-reduced-motion`, works at 320px, no color-only signals, contrast at WCAG AA.
- **Empty, loading, and error states by design.** Each slice spec names them before any code is written.

## Technology Stack

| Concern     | Technology     |
| :---------- | :---------- |
| Framework     | React 19     |
| Language     | TypeScript 6     |
| Build tool     | Vite 8     |
| Styling     | Tailwind CSS 4 (via @tailwindcss/vite)      |
| Unit testing     | Vitest 5     |
| Linting     | ESLint 10 (with typescript-eslint)      |
| AI development     | Claude Code (via AGENTS.md + new-slice skill)      |
| Database     | None — local-only, read-only      |
| Validation     | None installed     |
| End-to-end testing     | None installed     |
| CI     | GitHub Actions     |

Versions are recorded in the lockfile and project configuration.

## Prerequisites

- Node.js 22+ (CI pins 22; Vite 8 also runs on 20.19+)
- npm 10+ (ships with Node 22)
- Git
- Claude Code, _if using the AI-assisted workflow_

## Project use cases
Intended for a local-only, read-only app that browses a list of things with filterable categories, sortable numbers or dates, and searchable text. Examples:

| Project         | Properties | Why it fits |
| :-- | :-- | :-- |
| Reading list   | Title, author, genre, status (want / reading / read), rating, year. | The classic — everyone understands it instantly. |
| Film watchlist | Same shape plus runtime, which makes a nice "under 2 hours" filter. | What the current `AGENTS.md` is pre-written for. |
| Exhibition log | Artist, venue, medium, city, dates, status (want to go / went). | Good for date-based filters like "on now" or "closing soon". |

## Quick Start

### 1. Create your repository

Use this repository as a GitHub template, or clone it locally.

### 2. Install dependencies

```bash
npm ci
```

### 3. Configure your environment

Copy the provided example environment file, if one is required, and configure the documented variables.

Never commit secrets.

### 4. Initialize required services

[Database migration, local storage, worker setup, or not applicable.]

### 5. Start development

```bash
npm run dev
```

1. Confirm the token specimen loads at the dev URL. Light/dark should auto-switch with your OS theme.
2. Update the project name in `package.json` and the page title in `index.html`.
3. Rewrite the "About" section of `AGENTS.md` for your project (2–3 sentences: what it is, who it's for, what it is NOT).
4. Adjust token values in `src/index.css` for your palette. Don't add new names yet — tokens earn their way in.

### 6. Verify the installation

```bash
npm run typecheck
npm run test
npm run lint
```

## Project Structure

```markdown
​​template-react-vite/
├── .github/
│   └── workflows/
├── .claude/
│   └── skills/
├── src/
│   ├── app/                  # Application entrypoints
│   ├── features/             # Domain features
│   ├── components/ui/        # Shared UI components
│   └── lib/                  # Shared infrastructure
├── docs/
│   ├── architecture.md
│   ├── conventions/
│   └── slices/
├── AGENTS.md
├── CLAUDE.md
└── README.md
```

## How to build with this starter
This starter uses a repeatable development process:

```
Define → Plan → Approve → Implement → Verify → Review → Merge
```

### Step 1. Choose a vertical slice

Define one complete user capability.

**Example:** "A user can create a record and retrieve it after refreshing the page."

Avoid beginning with a large feature list or a collection of disconnected components.

### Step 2. Create the specification

In Claude Code, run the `new-slice` skill:

```
/new-slice <slice-name>
```

Describe the user job, expected behavior, edge cases, and acceptance criteria. The skill drafts `intent.md`, `spec.md`, and `plan.md` under `docs/slices/<slice-name>/` — no code is written in this step.

Review and approve the specification and implementation plan before proceeding.

### Step 3. Implement the approved slice

Create a feature branch using Git, then ask Claude to implement the approved slice:

> Implement the approved `<slice-name>` slice using `docs/slices/<slice-name>/spec.md` and `plan.md`. Follow `AGENTS.md` conventions. Run `typecheck`, `test`, and `lint` and report the results.

Claude should follow the approved specification, architecture conventions, and existing project patterns.

On the first slice, this also means replacing the token specimen in `App.tsx` with real UI.

### Step 4. Run verification

```bash
npm run typecheck
npm run test
npm run lint
```

After the three checks pass, walk:

- Every item in the spec's "Done means" checklist.
- The Interface quality standards in `AGENTS.md` (contrast, focus, hit targets, reduced motion, empty / loading / error states, 320px, non-colour signals).

Fix failures before requesting review.

### Step 5. Review the implementation

Ask Claude to review the implementation against the approved contract:

> Review the `<slice-name>` implementation against `docs/slices/<slice-name>/spec.md` and `AGENTS.md`. Identify missing acceptance criteria, accessibility issues, architecture violations, and any behavior introduced ahead of the planned slice order.

The review is advisory; independently inspect important changes.

### Step 6. Open a GitHub pull request

Include:

- What changed and why
- Acceptance criteria addressed
- Tests performed and results
- Screenshots or recordings for UI changes
- Known limitations and risks
- Wait for required CI checks and human review before merging.

### Step 7. Repeat

Build the next vertical slice using the same workflow.

## Claude Code Configuration

### CLAUDE.md

Contains essential project instructions, verification commands, and links to architecture conventions.

### Workflow skills

- `new-slice` — Drafts a slice contract (`intent.md`, `spec.md`, `plan.md`) under `docs/slices/<name>/`. Writes no code.

Implementation and review are done through direct prompts, not slash-command skills. See the "How to build" steps above.

### Specialist skills

Use specialist guidance when a feature requires it, such as accessibility, security, performance, or platform-specific expertise.

Do not install additional skills without a demonstrated need.

## Architecture and Conventions

Read:

- `docs/architecture.md`
- `docs/conventions/`
- [Template-specific architecture documentation]

Important invariants:

- [Invariant 1]
- [Invariant 2]
- [Invariant 3]

## Verification

| Command     | Purpose     |
| :---------- | :---------- |
| `npm run dev`       | Start the local dev server     |
| `npm run typecheck` | TypeScript validation          |
| `npm run lint`      | Static code checks             |
| `npm run test`      | Unit and component tests       |
| `npm run build`     | Production build               |

## First Vertical Slice Template

**Recommended slice:** [Slice name]

**User job:** [Job story]

**Acceptance criteria:**

- [Criterion 1]
- [Criterion 2]
- [Criterion 3]
- [Failure/recovery criterion]

**Validation:** [How to prove the feature works]

## Suggested slice order
These are the slices the "About" line implies, in a sensible build order. Each is small enough to spec cleanly and extends the previous one's pattern. (Reword freely for a reading list or exhibition log — the shape is the same.)

1. **`films-list`** — render all films as a list. Creates the `Film` type and starter data in `src/features/films/data/films.ts`, and replaces the token specimen in `App.tsx`. Nothing to search against until this exists.
2. **`search-films`** — text filter over title. State in the URL (`?q=`). Introduces `view-rules.ts` and the `matches(q)` predicate.
3. **`filter-films`** — by genre (and maybe runtime). State in the URL (`?genre=`). Extends `view-rules.ts`.
4. **`sort-films`** — by title, year, runtime. State in the URL (`?sort=`). Completes the `search → filter → sort` pipeline from guardrail #2.
5. **`grid-list-toggle`** — switch between views. State in browser storage per guardrail #4.
6. **`select-film`** — film detail. State in the component per guardrail #4. Modal or drawer; not a route.

Each slice follows the same shape: a *choice* lives in URL / storage / component, a *pure rule* in `view-rules.ts` consumes it, and the visible list is derived — never stored.


## Known Limitations

- [Limitation 1]
- [Limitation 2]
- [Features deliberately excluded]

## Troubleshooting

**Installation fails:** [Document supported versions and recovery steps.]
**Tests fail:** [Explain required services and test setup.]
**Claude does not recognize a skill:** [Explain how to verify project skill discovery.]
**CI differs from local results:** [Explain environment and version checks.]

## Further Reading

### Claude Code

- [Claude Code Quick Start](https://code.claude.com/docs/en/quickstart)
- [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- [Creating and using the `new-slice` skill](https://code.claude.com/docs/en/skills)
- [Claude Code Settings](https://code.claude.com/docs/en/settings)
- [Best practices for Claude](https://code.claude.com/docs/en/best-practices)

### Frontend Architecture
- [React 19 Documentation](https://react.dev/)
- [Vitest 5 documentation](https://vitest.dev/)
- [Vite Getting Started](https://vite.dev/guide/)
- [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- [Window:localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)

### Project Documentation
- [AGENTS.md]() - Architecture guardrails, slice order, and verification requirements
- [First Vertical Slice]() - Worked example: `films-list`
- [Slice Specifications]() - Approved requirements and plans for each slice

## License