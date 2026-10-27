# films-list: spec

## User-visible behavior
1. On load the page shows a heading and a list containing one item per film in the local dataset, in dataset order.
2. Each item shows the film title and whichever optional metadata the film has: year, runtime, genres, director, actors, description.
3. Optional fields a film lacks are omitted from that item; no "N/A", "Unknown" or empty labels.
4. Refreshing the page shows the same films. No network request is made for film data.
5. If the dataset is empty, the list is replaced by a message saying there are no films in the watchlist.
6. No search, filter, sort, view toggle or selection controls appear.

## Inputs
- Local dataset: static module `src/features/films/data/films.ts`, exporting `Film[]`.
- No URL, browser storage or component state is read.

## Data shape
`Film` (decided; the type is inferred from the zod schema, so schema and type cannot drift):
- `id: string` (required, unique, used as React key)
- `title: string` (required, non-empty)
- `year?: number` (integer)
- `runtimeMinutes?: number` (positive integer)
- `genres?: string[]`
- `director?: string`
- `actors?: string[]`
- `description?: string` (plot summary)

Optional string fields, when present, are non-empty; optional arrays, when present, are non-empty. A film that has "no actors" omits the field rather than supplying `[]`.

No derived values. No poster images in this slice.

## View rules
List only: a single-column, semantic list (`ul`/`li`). No grid. `view-rules.ts` is not created (introduced by `search-films`).

## Failure
- Empty dataset: empty-state message (behavior 5).
- Film missing optional fields: field omitted (behavior 3).
- Film failing the zod schema (missing `id` or `title`, wrong type, duplicate `id`): validated once at the loading boundary in `films.ts` (guardrail 5). Invalid data throws at load time (see Decisions).
- Very long titles wrap; they must not cause horizontal scroll.
- No URL or storage failure modes exist in this slice.

## Done means
- [ ] AC-01: Every film in the dataset renders.
- [ ] AC-02: Each film shows its title and its available metadata.
- [ ] AC-03: Readable from 320px up with no horizontal scroll at 320px, tablet and desktop.
- [ ] AC-04: Films with missing optional metadata (including actors and description) render with no placeholder text, broken layout or runtime error.
- [ ] Long description and long actor lists wrap and stay readable at 320px.
- [ ] AC-05: An empty dataset shows the empty state.
- [ ] AC-06: Page has an `h1`; films are in a semantic list; the list is announced as a list with the right item count by a screen reader.
- [ ] AC-07: Films appear after refresh with no network request for film data.
- [ ] AC-08: No search, filter, sort, toggle, selection or edit controls exist; no URL or storage code was added.
- [ ] Meets AGENTS.md interface quality: AA contrast in light and dark, visible focus on anything focusable, reduced-motion respected, color never the only signal, theme tokens only.
- [ ] `npm run typecheck`, `npm run lint`, `npm run test` pass; results reported.
- [ ] Empty-dataset, missing-metadata and invalid-data behavior verified.

## Decisions
- Dataset: 8 real films; 3 of them each omit a different optional field. Every film has `id` and `title`.
- Invalid starter data: validation runs once when `films.ts` is first imported; if any entry fails the schema or an `id` is duplicated, it throws an error naming the entry. The app does not start with bad data.
- `description` is shown in full, not clamped.

## Open questions
- Empty-state wording and display format for runtime (e.g. "142 min"), genres and actors. Proposal: "No films in your watchlist yet." and comma-separated text.
