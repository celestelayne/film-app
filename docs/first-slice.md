# First Vertical Slice: Films List

**Slice:** `films-list`  
**Starter:** `template-react-vite`  
**Stack:** React, Vite, TypeScript  
**Application:** Read-only film watchlist

## Purpose

This walkthrough demonstrates how to build the first complete user-facing capability using the starter's Claude Code workflow, architecture conventions, and automated verification.

By the end, a user should be able to open the application and browse a predefined collection of films presented as a readable, responsive list.

This slice establishes the `Film` type, local starter dataset, and first film-list interface. It replaces the initial token specimen in `App.tsx`.

This is a worked example, not an implementation already included in the starter.

The goal is to verify that the development workflow works from specification through implementation, testing, review, and pull request.

## 1. Prerequisites

Before starting:

- Install dependencies as described in `README.md`.
- Confirm the Vite development server starts successfully.
- Confirm the baseline TypeScript, lint, and test commands pass.
- Open the repository in Claude Code.
- Read `AGENTS.md` and the relevant project conventions.

Run:

```bash
npm run typecheck
npm run lint
npm run test
npm run dev
```

If a command is unavailable, report it. Do not install additional tooling without approval.

Do not proceed with an unexplained failing baseline.

## 2. Define the User Job

**Job story**

When I open my watchlist, I want to see the films in my collection so I can scan what is available to watch.

### In scope

- Define a typed `Film` data model.
- Create a small, representative local film dataset.
- Render every film as an item in a readable list.
- Display the film title and available metadata.
- Use a responsive layout that works on mobile and desktop.
- Handle missing optional metadata gracefully.
- Display a meaningful empty state when the dataset contains no films.
- Replace the starter's token specimen with the film-list interface.

### Out of scope

- Searching films
- Filtering by genre or runtime
- Sorting films
- Switching between grid and list layouts
- Selecting films or opening a detail panel
- Adding, editing, or deleting films
- URL query state
- Browser storage
- Accounts, databases, servers, or external APIs

These belong to later slices or are explicitly excluded from the application.

## 3. Define Acceptance Criteria

Use stable identifiers so requirements can be traced through implementation, tests, and review.

| ID | Acceptance criterion |
|---|---|
| AC-01 | The application renders every film from the local starter dataset. |
| AC-02 | Each film displays its title and the available metadata defined by the specification. |
| AC-03 | The list is readable and responsive from 320px upward, without unintended horizontal scrolling. |
| AC-04 | Missing optional metadata does not produce broken layouts, misleading placeholders, or runtime errors. |
| AC-05 | An empty dataset displays a meaningful empty state instead of an unexplained blank screen. |
| AC-06 | The film list uses semantic HTML and is understandable with assistive technology. |
| AC-07 | The application displays the same source dataset after refreshing the page, without requiring a server or network request for film data. |
| AC-08 | No controls or behavior from future slices are introduced. |

### Interface quality requirements

The implementation must also satisfy applicable `AGENTS.md` requirements:

- WCAG AA contrast
- Appropriate semantic structure
- Readable typography
- Theme tokens rather than arbitrary styling values
- Responsive layout
- Accessible handling of images and missing metadata
- No unnecessary motion or dependencies

Do not add interaction controls merely to demonstrate accessibility. This first slice is read-only.

## 4. Create the Slice Specification

Open Claude Code and run:

```text
/new-slice films-list
```

Provide the user job, scope, and acceptance criteria above.

Ask Claude to inspect the existing project before proposing implementation details.

The `new-slice` skill should use:

```text
.claude/skills/new-slice/contract-template.md
```

The expected artifacts are:

```text
docs/slices/films-list/
├── intent.md
├── spec.md
└── plan.md
```

These documents have distinct responsibilities:

- `intent.md` defines the user problem, motivation, and scope.
- `spec.md` defines observable behavior, acceptance criteria, interface states, and edge cases.
- `plan.md` defines the implementation approach, files, and verification strategy.

### Approval checkpoint

Before implementing, confirm:

- The user job is clear.
- The film data model contains only fields needed by the approved scope.
- The starter dataset is defined and representative.
- The default presentation is a list, not a grid.
- The empty and missing-data states are specified.
- The proposed file structure follows existing project conventions.
- The test plan covers all acceptance criteria.
- No future-slice behavior is included.

**Do not begin implementation until the specification and plan are approved.**

If the existing code conflicts with the specification, stop and ask rather than silently changing either.

## 5. Create a Feature Branch

```bash
git switch -c feat/films-list
```

Use the repository's normal GitHub branch and pull-request workflow.

Keep this branch focused on the `films-list` slice.

## 6. Implement the Slice

Use Claude Code to implement the approved specification and plan.

Because this starter currently defines `new-slice` as its native skill, do not assume an `/implement-slice` command exists.

You can provide Claude with this task prompt:

> Implement the approved `films-list` slice using `docs/slices/films-list/spec.md` and `docs/slices/films-list/plan.md`. Follow `AGENTS.md` and existing project conventions. Do not implement search, filter, sort, grid switching, or selection. Run the documented checks and report their results.

### Expected project structure

```text
src/
├── main.tsx
├── App.tsx
├── index.css
└── features/
    └── films/
        ├── data/
        │   └── films.ts
        ├── components/
        │   └── FilmList.tsx
        └── types.ts
```

Matches the nested structure in `AGENTS.md`. `view-rules.ts` is intentionally absent — it is introduced by the next slice, `search-films`, when a pure predicate is actually needed.

### Implementation responsibilities

**Film data**

Define the `Film` type and local starter data in:

```text
src/features/films/films.ts
```

Use TypeScript to express required and optional fields clearly.

Choose a small dataset with enough variation to exercise the interface, including optional missing metadata where relevant.

Do not fetch film data from an API.

**Film list**

Create a focused component that accepts film data through props and renders the collection.

Use semantic list markup and stable identifiers for React keys.

Handle empty collections and missing optional fields explicitly.

**Application shell**

Update `App.tsx` to render the film-list experience in place of the token specimen.

Keep `App.tsx` small. Avoid embedding the entire film presentation directly in the application shell.

**Styling**

Use the existing Tailwind theme tokens and conventions in `index.css`.

The list must work from 320px upward without unintended horizontal scrolling.

**State**

This slice does not require React interaction state.

The collection is static local data. Do not introduce URL state, browser storage, a state-management library, or a derived-data pipeline prematurely.

**View rules**

Do not create `view-rules.ts` yet.

That file is introduced in the next slice, `search-films`, when a pure title-matching rule is actually needed.

## 7. Verify the Implementation

Run the documented checks:

```bash
npm run typecheck
npm run test
npm run lint
```

If a script is missing or fails, report the result rather than silently changing the toolchain.

### Required test coverage

| Test | Acceptance criteria |
|---|---|
| Renders all supplied films | AC-01 |
| Renders titles and specified metadata | AC-02 |
| Handles missing optional metadata | AC-04 |
| Displays an empty state for an empty collection | AC-05 |
| Uses appropriate semantic list structure | AC-06 |
| Does not require network data to render films | AC-07 |

Responsive behavior and the absence of future-slice controls should also be verified manually.

Where useful, component tests should render `FilmList` with different datasets rather than depending exclusively on the starter fixture.

Tests should verify observable behavior, not incidental implementation details.

Do not modify tests merely to make an incorrect implementation pass.

## 8. Review the Slice

Review the implementation against:

```text
docs/slices/films-list/intent.md
docs/slices/films-list/spec.md
docs/slices/films-list/plan.md
AGENTS.md
```

You can ask Claude:

> Review the `films-list` implementation against its approved specification and `AGENTS.md`. Identify missing acceptance criteria, accessibility issues, architecture violations, unnecessary abstractions, and behavior introduced ahead of the planned slice order. Report findings without silently changing the specification.

### Review checklist

- The implementation matches the approved specification.
- The `Film` type represents the local data correctly.
- The full dataset renders without unintended omissions.
- The list is semantic and accessible.
- Missing metadata and empty data are handled.
- The layout is responsive.
- Styling uses established theme tokens.
- `App.tsx` remains a thin shell.
- No unnecessary dependencies or state-management patterns were added.
- No search, filter, sort, grid toggle, or selection behavior was introduced.
- Tests meaningfully cover the acceptance criteria.

Resolve significant findings before opening the pull request.

## 9. Manual Acceptance Test

Start the application:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

### Content

- [ ] All films from the starter dataset appear.
- [ ] Each film displays its title and specified metadata.
- [ ] Missing optional metadata does not break the interface.
- [ ] The film collection remains visible after refreshing.

### Layout

- [ ] The list works at 320px width.
- [ ] The list works at tablet and desktop widths.
- [ ] No unintended horizontal scrolling occurs.
- [ ] Text remains readable and content is not clipped.
- [ ] The interface uses established theme tokens.

### Accessibility

- [ ] The page has an appropriate heading structure.
- [ ] The film collection uses semantic list markup.
- [ ] Poster images, if present, have appropriate alternative-text treatment.
- [ ] Text and relevant visual elements meet contrast requirements.
- [ ] The interface remains understandable without relying on color alone.

### Edge cases

- [ ] An empty dataset produces the specified empty state.
- [ ] Missing optional metadata produces the specified fallback behavior.
- [ ] No runtime errors occur for the approved dataset.

### Scope

- [ ] There is no search input.
- [ ] There are no filter or sort controls.
- [ ] There is no grid/list toggle.
- [ ] There is no film selection or detail modal.
- [ ] There is no film editing or persistence infrastructure.

Record any issues and correct them before declaring the slice complete.

## 10. Open a Pull Request

Create a pull request against the main branch.

Include:

**Summary:** Implement the read-only Films List vertical slice.

**Acceptance criteria:** AC-01 through AC-08.

**Verification:** Report actual results from TypeScript, lint, tests, and manual checks. Identify anything not run.

**UI evidence:** Include screenshots showing mobile and desktop layouts.

**Known limitations:** Search, filter, sort, view switching, and selection are intentionally deferred.

Wait for required GitHub Actions checks, complete human review, and merge after approval.

## 11. What You Should Have Learned

This slice demonstrates:

- Turning a user job into a bounded feature specification
- Using Claude Code to draft a slice contract before implementation
- Establishing a typed domain model with TypeScript
- Rendering local data through React components and props
- Organizing code by feature
- Building a responsive, accessible read-only interface
- Handling empty and incomplete data
- Testing observable UI behavior
- Keeping implementation scope aligned with the approved slice
- Reviewing AI-generated code before merging

The goal is not simply to display an array of films. It is to prove that the starter's architecture, development workflow, and verification process work together without unnecessary infrastructure.

## 12. Next Slice

**Next:** `search-films`

Add a text search that filters films by title.

This slice will introduce:

- A controlled search input
- Search state in the URL using `?q=`
- A pure title-matching predicate in `view-rules.ts`
- A visible list derived from the full film dataset and the current search query
- A result count and no-results state
- Validation and safe defaults for URL input

The source film dataset must remain unchanged.

### Remaining slice order

1. `search-films` — Title search, URL state, pure matching rule
2. `filter-films` — Genre filtering combined with search
3. `sort-films` — Title, year, and runtime sorting
4. `grid-list-toggle` — Grid/list presentation with browser-storage preference
5. `select-film` — Film details in a modal or drawer, with component-owned selection state

Each slice extends the existing `films` feature while preserving the behavior of completed slices.

**Do not implement these capabilities during `films-list`.**