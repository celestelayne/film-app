# search-films: spec

## User-visible behavior
1. Above the film list there is a labelled search field. With no `?q=` in the URL it is empty and every film is shown.
2. As the user types, the list immediately narrows to films whose title contains the typed text, ignoring letter case. Films keep their dataset order.
3. The URL's `q` parameter follows the field (`?q=mad`) about a quarter of a second after the user stops typing. Clearing the field removes `q` from the URL.
4. Opening or reloading a URL with `?q=mad` shows the field pre-filled with `mad` and the list already filtered.
5. A result count is always shown (for example "8 films", "2 films", "1 film") and updates as the user types. Changes to the count are announced politely to screen readers, but not on first page load (guardrail 8).
6. If no film matches, the list is replaced by a no-results message that includes the search text (for example `No films match "xyz".`) and a "Clear search" button. This is separate from the empty-dataset message ("No films in your watchlist yet."), which is unchanged.
7. Leading and trailing spaces in the query are ignored for matching. A query of only spaces behaves like no query.
8. No other controls from future slices appear.

## Inputs
- URL query parameter `q` (string): the search text. Owned by the URL (guardrail 4); read on load and written as the user types.
- The film dataset `films` from `data/films.ts`: read only, never copied, filtered in place, or sorted (guardrails 1, 2).
- Component state: the text in the search field (a draft), initialised from `q` on load and re-synced from the URL on back/forward navigation. The list and count follow the draft immediately; the URL is a debounced mirror of it.

## Data shape
Reads `Film.title` only. No new fields and no derived values stored on films. The visible list is derived on each render from `films` and the current `q` (guardrail 2). Search is the first step of the search, filter, sort order, so later slices apply to the search result.

## View rules
List view only (grid arrives with `grid-list-toggle`). The same list renders whether filtered or not. `view-rules.ts` is created in this slice with one pure function that decides whether a film's title matches a query. It has no React, URL or DOM dependency (guardrail 3).

## Failure
- No matches: no-results state (behavior 6); the count reads "0 films".
- Empty dataset: unchanged empty state; the search field and count are hidden (see Decisions).
- `?q=` with an empty value, or only whitespace: treated as no query (all films shown).
- Repeated `?q=a&q=b`: the first value is used.
- Very long `q`: truncated to 100 characters before use so the field and URL cannot grow without bound.
- Regex or special characters (for example `?q=.*`, `?q=(`): treated as plain text, never as a pattern; they match literally or not at all and never throw.
- Malformed percent-encoding (for example `?q=%E0%A4%A`): does not crash; falls back to a safe value.
- Unrelated URL parameters: preserved when `q` is updated, so later slices can add `genre` and `sort` without this slice discarding them.
- If the browser refuses or throttles the URL update (for example Safari's limit on history updates), typing and filtering keep working from the draft and the URL catches up on a later write.
- Invalid values never crash the interface; they fall back to "no query" (guardrail 5).

## Done means
- [x] AC-01: With no `q`, all films are shown and the field is empty. (`FilmBrowser.test.tsx`, `App.test.tsx`; browser: 8 films, empty field)
- [x] AC-02: Typing narrows the list to films whose title contains the text, ignoring case and accents, in dataset order. (unit tests in `view-rules.test.ts`; component tests; browser: `mad` gives Mad Max)
- [x] AC-03: The URL's `q` matches the field while typing; clearing the field removes `q`. (component tests with fake timers and browser: `?q=mad` appears after a pause, cleared back to no `q`)
- [x] AC-04: Loading a URL with `?q=...` shows the field pre-filled and the list already filtered. (`App.test.tsx` and `FilmBrowser.test.tsx`; browser: `?q=PARA`)
- [ ] AC-05: The result count is visible, correct, and announced to screen readers when it changes. (count shown and correct in tests and browser, in a `role="status"` region; **not** yet checked with a real screen reader)
- [x] AC-06: A query with no matches shows the no-results state with a working "Clear search" button, distinct from the empty-dataset state. (tests; browser: no-results text, "Clear search" via keyboard, focus returns to the field)
- [x] AC-07: Whitespace-only, empty, repeated, over-long, special-character and malformed `q` values fall back safely with no crash. (`search-query.test.ts`, `FilmBrowser.test.tsx`; browser: malformed and repeated `q`, 100-char limit, no console errors)
- [x] AC-08: The source dataset is not mutated or copied into stored state; the matching rule is a pure function in `view-rules.ts` with its own unit tests. (`matchesTitle` is pure, tested in `view-rules.test.ts`; frozen films array in tests; no stored copy of the dataset)
- [x] AC-09: Unrelated URL parameters survive a change to `q`. (tests; browser: `?genre=drama` kept while typing and clearing)
- [x] AC-10: The search field has a visible label (not placeholder only), is reachable by keyboard with a visible focus ring, and is at least 44px tall. (visible label; focus ring 2px; input and button 44px tall measured; input border 5.86:1 light; Tab reaches the Clear button)
- [ ] AC-11: Works from 320px up with no horizontal scroll, in light and dark mode, with AA contrast. (checked: 320px dark with no horizontal scroll, desktop light, input border contrast in light; **not** checked: 320px light, tablet, dark contrast numbers)
- [x] AC-12: films-list behavior is unchanged when there is no query (all its tests still pass). (existing `FilmList` and `App` tests pass unchanged)
- [x] No future-slice controls (genre, sort, view toggle, selection). (browser)
- [x] `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build` pass; results reported. (all pass: 46 tests)

## Decisions
- Matching: case-insensitive "contains" on the title, with accent folding (`amelie` matches `Amélie`). Covered by a unit test even though no current title needs it.
- History: the URL is updated with `history.replaceState`, so the back button does not step through each keystroke, and the existing `history.state` and hash are preserved. The page also syncs the field from the URL on `popstate`, dropping any pending write.
- The URL write is debounced by 250 ms (revised from "every keystroke, no debounce" after review: it avoids browser limits on history updates). The field, list and count update immediately from local state. A pending write is flushed if the component unmounts.
- Maximum query length: 100 characters; longer values are truncated.
- The result count is always shown, including with no query ("8 films"). Screen readers are told only about changes, not on first page load.
- The no-results state includes a single "Clear search" button (44px hit target) that clears the field.
- With an empty dataset the search field and count are hidden; only the empty-dataset message shows.
- The field is `type="search"` with no custom clear control inside it.

## Open questions
- None.
