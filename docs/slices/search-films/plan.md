# search-films: plan

## Files to add
- `src/features/films/view-rules.ts`: pure `matchesTitle(film, query)` (and the query normalization it needs), no React or DOM.
- `src/features/films/view-rules.test.ts`: unit tests for matching, case, whitespace, accents (if approved), special characters, empty query.
- `src/features/films/search-query.ts`: reads and writes the `q` URL parameter; validates and clamps the raw value (first value, trimmed length limit, safe fallback), preserves other parameters. Boundary code kept apart from the pure matching rule.
- `src/features/films/search-query.test.ts`: tests for parsing and writing (empty, whitespace, repeated, long, malformed, other params preserved).
- `src/features/films/components/SearchField.tsx`: labelled search input, 44px target, focus ring.
- `src/features/films/components/SearchStatus.tsx`: result count in a polite live region, and the no-results message with its "Clear search" button.
- `src/features/films/components/SearchField.test.tsx` and `SearchStatus.test.tsx`: behavior tests via Testing Library.

## Files to change
- `src/App.tsx`: owned by `films-list`. Reads `q` from the URL, derives the visible films from `films` and `q`, renders the search field, count/no-results, and `FilmList`. Must stay a thin shell, so URL read/write logic lives in `search-query.ts`.
- `src/App.test.tsx`: owned by `films-list`. Add cases for a pre-filled `?q=`, typing, and no results. The existing "renders every film" case must still pass unchanged (AC-12).
- `docs/slices/search-films/*` (these files).

`src/features/films/components/FilmList.tsx` should not need to change: it receives the already-derived list, and its empty state still means "dataset is empty". The no-results message is rendered by the new status component, not by `FilmList`, so the two messages cannot be confused. (If that split proves awkward, change `FilmList` and list it here before building.)

## Shared-file changes
- `src/App.tsx`: touched by `films-list` (renders the list) and by this slice. Later slices (`filter-films`, `sort-films`, `grid-list-toggle`, `select-film`) will edit it as well. Keeping URL logic in `search-query.ts` and derivation in `view-rules.ts` keeps those edits small.
- `src/App.test.tsx`: touched by `films-list` and this slice; later slices will extend it.
- `src/features/films/view-rules.ts`: new here; `filter-films` and `sort-films` will add to it. Keep one pure function per rule and apply them in the fixed order search, filter, sort (guardrail 2).
- `search-query.ts` will need to grow for `genre` and `sort`. This slice should not build a general URL framework (guardrail 6); it should only avoid discarding other parameters. Flag for `filter-films`: decide then whether the three parameters share one helper.
- `src/index.css`, `package.json`, `vite.config.ts`, CI: no change planned.

## Sequence
1. `view-rules.ts` with `matchesTitle` and its unit tests (red, green).
2. `search-query.ts` read and clamp (`q` to a safe string) with tests; then write with other-parameter preservation.
3. A running UI first: `SearchField` wired in `App.tsx` that filters the list from the URL value.
4. Count in a live region, then the no-results state with "Clear search", and hiding the field for an empty dataset.
5. `replaceState` history behavior and `popstate` sync.
6. Component and `App` tests for AC-01 to AC-07 and AC-09.
7. Verify: typecheck, lint, test, build; browser at 320px and desktop in light and dark; keyboard and focus ring; screen-reader announcement check; every item in Done means; confirm films-list tests still pass.

## Decisions
- No new dependency. Interaction tests use `fireEvent` from `@testing-library/react`; revisit `@testing-library/user-event` only if that proves inadequate, and ask first.
- URL state uses `window.location`, `URLSearchParams` and `history.replaceState`. No router library.
- The URL read/write and the derivation of visible films live in a short hook in `search-query.ts`, called from `App.tsx`, so `App.tsx` stays thin.

## Open questions
- None.
