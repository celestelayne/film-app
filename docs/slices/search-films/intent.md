# search-films: intent

## User job
When my watchlist is long, I want to type part of a film's title and see only the matching films, so I can find what I'm looking for without scrolling.

## Entry point
The watchlist page at `/`, via a search field above the film list. The search text lives in the URL as `?q=`, so a URL with a query (shared, bookmarked, or reloaded) opens already filtered.

## What success looks like
- Typing in the search field narrows the list to films whose title contains the text, ignoring letter case, and clearing the field restores every film.
- Reloading the page, or opening the same URL, shows the same filtered list; the browser back/forward buttons and the URL stay consistent with what is on screen.
- The number of matching films is shown and announced to assistive technology; a query with no matches shows a clear "no results" state that is distinct from the empty-dataset state.

## Out of scope
- Genre filtering (`filter-films`), sorting (`sort-films`), grid/list switching (`grid-list-toggle`), film selection (`select-film`).
- Searching fields other than title (director, actors, description, genres).
- Fuzzy matching, ranking, highlighting of matched text, search history or suggestions.
- Any change to the film dataset, which stays the single source (guardrail 1).

## Open questions
- None.
